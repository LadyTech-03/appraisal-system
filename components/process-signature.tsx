type ProcessOptions = {
  // Output scaling: shrink huge photos for speed and stability
  maxSide?: number; // e.g. 1600

  // How aggressively to treat "ink" as foreground after normalization
  // Higher = stricter (removes more noise but may thin faint ink)
  inkStrength?: number; // 0.8–1.6 typical

  // Extra cleanup
  despeckle?: boolean;

    // Minimum size for connected components to keep
    minComponentSize?: number; // e.g. 50
    // Whether to perform morphological closing to reconnect strokes
    doClose?: boolean;
    deltaBase?: number;
};

export async function processSignature(file: File, opts: ProcessOptions = {}): Promise<Blob> {
  const {
    maxSide = 1600,
    inkStrength = 0.95,
    deltaBase = 8,
    minComponentSize = 50,
    doClose = true,
  } = opts;

  const img = await loadImageFromFile(file);
  const { canvas, ctx, width, height } = drawToCanvas(img, maxSide);

  const imageData = ctx.getImageData(0, 0, width, height);
  const data = imageData.data;

  // 1) grayscale
  const gray = new Float32Array(width * height);
  for (let i = 0, p = 0; i < data.length; i += 4, p++) {
    const r = data[i], g = data[i + 1], b = data[i + 2];
    gray[p] = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  }

  // 2) estimate background (large blur)
  const bgRadius = Math.max(10, Math.floor(Math.min(width, height) / 35));
  const bg = boxBlur(gray, width, height, bgRadius);

  // 3) normalize to reduce lighting/background color effects
  const norm = new Float32Array(width * height);
  for (let i = 0; i < norm.length; i++) {
    const b = Math.max(bg[i], 1);
    norm[i] = clamp((gray[i] / b) * 255, 0, 255);
  }

  // 4) adaptive threshold: compare to local mean
  const localRadius = Math.max(6, Math.floor(Math.min(width, height) / 120));
  const localMean = boxBlur(norm, width, height, localRadius);

  const inkMask = new Uint8Array(width * height);
  for (let i = 0; i < inkMask.length; i++) {
    const delta = localMean[i] - norm[i]; // positive => darker than neighborhood
    inkMask[i] = delta > (deltaBase * inkStrength) ? 1 : 0;
  }

  // 5) remove specks without eroding real strokes
  let cleaned: Uint8Array = removeSmallComponents(inkMask, width, height, minComponentSize);

  // 6) optional close to reconnect strokes (safe vs opening)
  if (doClose) cleaned = morphClose(cleaned, width, height);

  // 7) output: keep original RGB but set alpha from darkness for smooth edges
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

    const darkness = clamp(255 - norm[p], 0, 255); // darker = more opaque
    const alpha = clamp(darkness * 1.35, 0, 255);

    outData[i] = data[i];
    outData[i + 1] = data[i + 1];
    outData[i + 2] = data[i + 2];
    outData[i + 3] = alpha;
  }

  ctx.putImageData(out, 0, 0);

  return canvasToPngBlob(canvas);
}

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
 * Fast box blur (separable).
 */
function boxBlur(src: Float32Array, w: number, h: number, radius: number): Float32Array {
  if (radius <= 0) return src.slice();

  const tmp = new Float32Array(w * h);
  const dst = new Float32Array(w * h);
  const windowSize = radius * 2 + 1;

  // horizontal
  for (let y = 0; y < h; y++) {
    const row = y * w;
    let sum = 0;

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

  // vertical
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

/**
 * Remove tiny isolated blobs (specks) without eroding thin strokes.
 * This is usually safer than morphological opening for signatures.
 */
function removeSmallComponents(mask: Uint8Array, w: number, h: number, minSize: number): Uint8Array {
  const out = new Uint8Array(mask); // copy
  const visited = new Uint8Array(mask.length);
  const stack: number[] = [];

  // 8-neighborhood
  const offsets = [-1, 1, -w, w, -w - 1, -w + 1, w - 1, w + 1];

  for (let i = 0; i < out.length; i++) {
    if (!out[i] || visited[i]) continue;

    let count = 0;
    const pixels: number[] = [];

    stack.push(i);
    visited[i] = 1;

    while (stack.length) {
      const p = stack.pop()!;
      pixels.push(p);
      count++;

      const x = p % w;
      const y = (p / w) | 0;

      for (const off of offsets) {
        const np = p + off;
        if (np < 0 || np >= out.length) continue;

        const nx = np % w;
        const ny = (np / w) | 0;

        // prevent wrap across rows
        if (Math.abs(nx - x) > 1 || Math.abs(ny - y) > 1) continue;

        if (!visited[np] && out[np]) {
          visited[np] = 1;
          stack.push(np);
        }
      }
    }

    if (count < minSize) {
      for (const p of pixels) out[p] = 0;
    }
  }

  return out;
}

// Morph close = dilate then erode (reconnect strokes a bit)
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
          if (mask[i + dy * w + dx] === 0) {
            ok = 0;
            break;
          }
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
          if (mask[i + dy * w + dx] === 1) {
            ok = 1;
            break;
          }
        }
        if (ok) break;
      }
      out[i] = ok;
    }
  }
  return out;
}