# Client Authentication Integration

This document describes how the frontend authenticates with the TVET Appraisal backend.

## Environment

- `NEXT_PUBLIC_API_URL` – Base URL of the backend (e.g. `http://localhost:5000/api`).

## Axios Client

- Defined in `lib/api.ts`.
- Adds JSON headers and request timeout.
- Adds `Authorization: Bearer <token>` header if a token is set via `setAuthToken`.
- Triggers a shared `unauthorizedHandler` on 401 responses.
- `parseApiError` converts backend errors (`{ message, errors }`) to a consistent client shape.

## Auth Store (`lib/store.ts`)

- Persists `token` using Zustand `persist` middleware (`auth-storage`).
- Exposes actions:
  - `login(emailOrEmployeeId, password)` – POST `/auth/login`, stores token, fetches user profile.
  - `register` – POST `/auth/register` with provided details.
  - `logout` – POST `/auth/logout` (best-effort), clears token and auth state.
  - `bootstrap` – If a token exists, hits `/auth/me` to rehydrate session.
  - `clearError` – Resets auth error state.
- On login/bootstrap success, the authenticated user is injected into `useAppStore` via `setUsersFromServer()`.
- On 401 responses, the shared handler triggers `logout()` to purge the session.

## Components

- `/app/login/page.tsx`
  - Uses auth store to submit login form.
  - Displays API and form errors via `Alert`.
  - Redirects to `/dashboard` on success.

- `/app/register/page.tsx`
  - Submits to `/auth/register`.
  - Redirects to `/login` after success.
  - Uses store `roles` array for the role dropdown.

- `/app/page.tsx`
  - Boots the session on load (`bootstrap`).
  - Shows a spinner until bootstrap finishes.
  - Redirects to `/dashboard` or `/login` based on auth state.

- `/app/layout.tsx`
  - Renders `<BootstrapSession />` which triggers session bootstrap when the app mounts.

## Token Handling

- Tokens are stored in Zustand (persisted in `localStorage`).
- `setAuthToken` keeps Axios aligned with the current token.
- TODO: evaluate moving to HttpOnly cookies for stronger security once backend supports it.

## Error Handling

- `parseApiError` surfaces validation errors and messages from the backend.
- Components display both API and form errors.
- `useAuthStore.error` holds the latest API error message.

## Future Enhancements

- Replace localStorage token with secure cookie + refresh token flow.
- Migrate static roles to backend-driven enumeration.
- Add retry logic for transient network failures.

