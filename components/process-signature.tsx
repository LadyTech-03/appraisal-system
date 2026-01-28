type ProcessOptions = {
  // Output scaling: shrink huge photos for speed and stability
  maxSide?: number; // e.g. 1600

  // How aggressively to treat "ink" as foreground after normalization
  // Higher = stricter (removes more noise but may thin faint ink)
  inkStrength?: number; // 0.8–1.6 typical

  // Extra cleanup
  despeckle?: boolean;
};

export const processSignature = async (
  file: File,
  opts: ProcessOptions = {}
): Promise<Blob> => {
  const {
    maxSide = 1600,
    inkStrength = 1.15,
    despeckle = true,
  } = opts;

  const img = await loadImageFromFile(file);

  // Draw to canvas (optionally downscale)
  const { canvas, ctx, width, height } = drawToCanvas(img, maxSide);

  // 1) Get pixels
  const imageData = ctx.getImageData(0, 0, width, height);
  const data = imageData.data;

  // 2) Convert to grayscale (luma)
  const gray = new Float32Array(width * height);
  for (let i = 0, p = 0; i < data.length; i += 4, p++) {
    const r = data[i], g = data[i + 1], b = data[i + 2];
    // ITU-R BT.709 luma
    gray[p] = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  }

  // 3) Estimate background using a large blur (fast box blur)
  // Think of this as "what the paper looks like" including lighting/shadows
  const bg = boxBlur(gray, width, height, Math.max(8, Math.floor(Math.min(width, height) / 40)));

  // 4) Normalize: remove lighting by dividing foreground by background
  // normalized ~ 0 (dark ink) to 255 (clean background)
  const norm = new Float32Array(width * height);
  for (let i = 0; i < norm.length; i++) {
    const b = Math.max(bg[i], 1); // avoid division by 0
    // Scale to 0..255-ish
    norm[i] = clamp((gray[i] / b) * 255, 0, 255);
  }

  // 5) Adaptive threshold (local): produce a "ink mask"
  // We compute a local mean and compare pixel against it
  const radius = Math.max(6, Math.floor(Math.min(width, height) / 120));
  const localMean = boxBlur(norm, width, height, radius);

  // inkMask: 1 = ink, 0 = background
  const inkMask = new Uint8Array(width * height);
  for (let i = 0; i < inkMask.length; i++) {
    // If pixel is sufficiently darker than its local neighborhood, it's ink
    const delta = localMean[i] - norm[i];
    // Scale decision boundary by inkStrength
    inkMask[i] = delta > (12 * inkStrength) ? 1 : 0;
  }

    // 6) Cleanup: remove isolated specks, close small gaps
    let cleaned: Uint8Array = inkMask;

    if (despeckle) {
    cleaned = morphOpen(cleaned, width, height);  // remove tiny noise
    cleaned = morphClose(cleaned, width, height); // reconnect strokes a bit
    }

  // 7) Build alpha matte and write back RGBA
  // Keep original color but set alpha based on mask and "ink darkness"
  const out = ctx.createImageData(width, height);
  const outData = out.data;

  for (let i = 0, p = 0; i < outData.length; i += 4, p++) {
    if (!cleaned[p]) {
      outData[i] = 0;
      outData[i + 1] = 0;
      outData[i + 2] = 0;
      outData[i + 3] = 0;
      continue;
    }

    // Use normalized darkness to make nicer edges:
    // darker => more opaque
    const darkness = clamp(255 - norm[p], 0, 255);
    const alpha = clamp(darkness * 1.2, 0, 255);

    outData[i] = data[i];       // original R
    outData[i + 1] = data[i+1]; // original G
    outData[i + 2] = data[i+2]; // original B
    outData[i + 3] = alpha;
  }

  ctx.putImageData(out, 0, 0);

  // 8) Export PNG
  const blob = await canvasToPngBlob(canvas);
  return blob;
};

// ---------- helpers ----------

function loadImageFromFile(file: File): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new window.Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve(img);
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("Failed to load image"));
    };
    img.src = url;
  });
}

function drawToCanvas(img: HTMLImageElement, maxSide: number) {
  const canvas = document.createElement("canvas");

  let width = img.naturalWidth || img.width;
  let height = img.naturalHeight || img.height;

  const scale = Math.min(1, maxSide / Math.max(width, height));
  width = Math.max(1, Math.round(width * scale));
  height = Math.max(1, Math.round(height * scale));

  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  if (!ctx) throw new Error("Failed to get canvas context");

  ctx.drawImage(img, 0, 0, width, height);
  return { canvas, ctx, width, height };
}

function canvasToPngBlob(canvas: HTMLCanvasElement): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (blob) resolve(blob);
      else reject(new Error("Failed to create blob from canvas"));
    }, "image/png");
  });
}

function clamp(x: number, min: number, max: number) {
  return Math.max(min, Math.min(max, x));
}

/**
 * Fast box blur using separable passes (horizontal + vertical).
 * radius controls smoothing strength.
 */
function boxBlur(src: Float32Array, w: number, h: number, radius: number): Float32Array {
  if (radius <= 0) return src.slice();

  const tmp = new Float32Array(w * h);
  const dst = new Float32Array(w * h);
  const windowSize = radius * 2 + 1;

  // Horizontal pass
  for (let y = 0; y < h; y++) {
    let sum = 0;
    const row = y * w;

    for (let x = -radius; x <= radius; x++) {
      const ix = clamp(x, 0, w - 1);
      sum += src[row + ix];
    }

    for (let x = 0; x < w; x++) {
      tmp[row + x] = sum / windowSize;

      const xRemove = clamp(x - radius, 0, w - 1);
      const xAdd = clamp(x + radius + 1, 0, w - 1);
      sum += src[row + xAdd] - src[row + xRemove];
    }
  }

  // Vertical pass
  for (let x = 0; x < w; x++) {
    let sum = 0;

    for (let y = -radius; y <= radius; y++) {
      const iy = clamp(y, 0, h - 1);
      sum += tmp[iy * w + x];
    }

    for (let y = 0; y < h; y++) {
      dst[y * w + x] = sum / windowSize;

      const yRemove = clamp(y - radius, 0, h - 1);
      const yAdd = clamp(y + radius + 1, 0, h - 1);
      sum += tmp[yAdd * w + x] - tmp[yRemove * w + x];
    }
  }

  return dst;
}

// Simple 3x3 morphology on binary mask
function morphOpen(mask: Uint8Array, w: number, h: number): Uint8Array {
  return dilate(erode(mask, w, h), w, h);
}
function morphClose(mask: Uint8Array, w: number, h: number): Uint8Array {
  return erode(dilate(mask, w, h), w, h);
}

function erode(mask: Uint8Array, w: number, h: number): Uint8Array {
  const out = new Uint8Array(mask.length);
  for (let y = 1; y < h - 1; y++) {
    for (let x = 1; x < w - 1; x++) {
      const i = y * w + x;
      let ok = 1;
      for (let dy = -1; dy <= 1; dy++) {
        for (let dx = -1; dx <= 1; dx++) {
          if (mask[i + dy * w + dx] === 0) { ok = 0; break; }
        }
        if (!ok) break;
      }
      out[i] = ok;
    }
  }
  return out;
}

function dilate(mask: Uint8Array, w: number, h: number): Uint8Array {
  const out = new Uint8Array(mask.length);
  for (let y = 1; y < h - 1; y++) {
    for (let x = 1; x < w - 1; x++) {
      const i = y * w + x;
      let ok = 0;
      for (let dy = -1; dy <= 1; dy++) {
        for (let dx = -1; dx <= 1; dx++) {
          if (mask[i + dy * w + dx] === 1) { ok = 1; break; }
        }
        if (ok) break;
      }
      out[i] = ok;
    }
  }
  return out;
}
