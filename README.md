# Client Integration Notes

## Environment Variables

- `NEXT_PUBLIC_API_URL` – Base URL for the backend API (e.g., `http://localhost:5000/api`).

## Auth Flow Overview

- Auth requests use Axios client (`lib/api.ts`).
- JWT token stored via Zustand persist middleware (localStorage).
- Session is bootstrapped on app load via `/auth/me`.
- 401 responses trigger automatic logout through shared handler.

## Key Files

- `lib/api.ts` – Axios instance, interceptors, error parser.
- `lib/api/auth.ts` – Auth API helper functions.
- `lib/store.ts` – Zustand stores for auth and app state; integrates with backend.
- `app/login/page.tsx` – Login form, wired to backend.
- `app/register/page.tsx` – Request access/registration form.
- `docs/client-auth.md` – Detailed documentation of the auth integration.

## Commands

- `npm run dev` – Start Next.js dev server.
- `npm run build` – Production build.
- `npm run start` – Start production server.

