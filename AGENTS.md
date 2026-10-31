<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Repository Notes

Single Next.js 16 App Router app (React 19, Turbopack). All source lives under `src/`; there is no monorepo and no test suite. The app is a frontend only: destination, booking, and auth data come from a separately run Express + MongoDB API. The backend base URL comes from `NEXT_PUBLIC_API_URL` in `.env.local`/deployment env; a local checkout (`../wanderlast_server`, not in this repo) can be used by setting it to `http://localhost:5000`. Node 22+.

## Commands

- `npm run dev` — Turbopack dev server at http://localhost:3000.
- `npm run lint` — ESLint flat config (`next lint` no longer exists).
- `npx tsc --noEmit` — typecheck; no npm script exists.
- `npm run build` — Turbopack + TypeScript, but **not** ESLint. Verify lint → typecheck → build.
- `npm run start` — serve the production build.
- There is no test runner or single-test command.
- Known baseline: lint reports one unused `SiOpencode` import in `src/lib/destinations.ts`; lint, `tsc`, and build otherwise pass.

One baseline gotcha when verifying: `next-env.d.ts` is gitignored and imports generated route types from `.next/dev/types`, so on a fresh clone run `npm run dev`/`build` before trusting `tsc`. `LayoutProps`/`PageProps` globals only exist after generation.

## Next 16 configuration

`next.config.ts` differs from the defaults you may expect:

- `cacheComponents: false` and `partialPrefetching: false`. There is no Cache Components build error to work around; do not restructure data fetching around `<Suspense>` + `'use cache'` or add `export const instant`.
- `reactCompiler: true`. No need to add `useMemo`/`useCallback` purely for render performance.
- A custom Turbopack rule sends every `*.css` through `@tailwindcss/turbopack`; leave it in place.
- `images.remotePatterns` already allows any HTTPS host plus HTTP `localhost`/`127.0.0.1`, so new Mongo-hosted image URLs need no config change.
- Turbopack is the default for dev and build — never add `--turbopack` or a webpack config.
- `params`, `searchParams`, `cookies()`, and `headers()` are async; always await them.

## Routing and auth

Route directories use inconsistent casing: `/myBooking`, `/userprofile`, `/signUp`, `/login`, `/add-destination`, `/destinations`, `/destinations/[id]`. Match the existing names in links; don't rename them.

- `src/proxy.ts` is the Next 16 replacement for `middleware.ts`. It checks the better-auth session and redirects unauthenticated requests to `/signUp` for `['/add-destination', '/myBooking', '/destinations/:path']`. `/destinations` (the list) is not matched; `/destinations/[id]` is.
- Server config: `src/lib/auth.ts` — email/password, MongoDB adapter, database name hardcoded to `wanderlast`, JWT plugin plus session cookie cache. Client: `src/lib/auth-client.ts` (also registers `jwtClient`). Route handler: `src/app/api/auth/[...all]/route.tsx` (note the `.tsx` extension).
- Sessions: `authClient.useSession()` in client components, `auth.api.getSession({ headers: await headers() })` in server components.
- JWT forwarding: client mutations call `getTokenFromClient()` (`authClient.token()`) and send `Authorization: Bearer ${token}`; server fetches use `getTokenFromServer()` (`auth.api.getToken`). The server helper's export is spelled `getTokenFromServer`.
- The user model has extra `location` and `nationality` fields (`user.additionalFields` in `auth.ts`). `auth-client.ts` infers them with `inferAdditionalFields<typeof auth>()`; keep the server fields and client inference in sync when adding more.
- The login and signup pages render Google buttons calling `authClient.signIn.social`, but `socialProviders` is commented out in `auth.ts`, so that path is not functional. Don't "fix" it by inventing credentials.
- `.env` (gitignored) needs `MONGODB_URL`, `BETTER_AUTH_SECRET`, and `BETTER_AUTH_URL`; startup fails without a valid `MONGODB_URL`.

## API and data

- Server components fetch the Express API directly with `cache: "no-store"` and `AbortSignal.timeout(10000)`, then normalize through `normalizeDestination` (`src/lib/destinations.ts`), which coerces `price` to a string. The list page requires a bare array; the detail page also unwraps `{ result: ... }`.
- Use the centralized `API_BASE_URL` from `src/lib/api.ts` (read from `NEXT_PUBLIC_API_URL`, trailing slashes stripped) and the URL helpers (`DESTINATIONS_API_URL`, `ADD_DESTINATION_API_URL`, `getDestinationUrl` in `src/lib/destinations.ts`; `getMyBookingsUrl` in `src/lib/bookings.ts`). `src/lib/destinations.ts` re-exports `API_BASE_URL` for existing call sites.
- Auth headers are inconsistent: destination create/edit/delete and booking cancellation attach a Bearer token, while `POST /bookings` and `GET /my-bookings/:email` do not. Check the companion server before assuming an endpoint is public.
- `GET /my-bookings/:email` returns destination-shaped documents: `destinationName`/`imageUrl`, `price` as a string, and no `status` field. `normalizeBooking` handles both key styles and defaults status to `confirmed`; card keys include the index because a booking reuses the destination `_id`.
- Real endpoints in use: `GET /destination`, `GET /destination/:id`, `POST /add-destination`, `PATCH /destination/:id`, `DELETE /destination/:id`, `POST /bookings`, `GET /my-bookings/:email`, `DELETE /bookings/:id?email=`. Booking deletion matches both string and ObjectId `_id` values because `POST /bookings` currently copies the destination's string `_id`. `README.md` is partly stale: it says there is no delete endpoint and omits bookings/auth.

## Duplicate and dead files

- `src/app/destinations/EditDestinationDialog.tsx` (capital E) is unused; the live file is `edit-destination-dialog.tsx`. Both exist on this case-sensitive checkout — never create case-only renames or a third copy.
- `src/components/booking/DeleteDestinationDialog.tsx` duplicates `src/app/destinations/delete-destination-dialog.tsx`; only the latter is imported.

## UI and styling

- Tailwind v4; no `tailwind.config.*`. Tokens live in `src/app/globals.css` (`@theme inline` plus `:root`/`.dark`). Brand colors are `--color-brand` (#15a1bf) and `--color-brand-dark`; use `bg-brand`/`text-brand` rather than raw hex (some auth pages still hardcode `#12A1C2`).
- Add shadcn components with `npx shadcn@latest add <component>`. `components.json` uses style `base-nova`, so primitives are **Base UI**, not Radix: `Select`'s `onValueChange` receives `string | null`, accepts an `items` prop and `alignItemWithTrigger` on content, and state styling uses `data-open`/`data-closed`/`data-placeholder` instead of Radix's `data-state`. Don't paste Radix examples.
- Import `cn` from `@/lib/utils` (a re-export of the `cn` package). Do not add `clsx` or `tailwind-merge`.
- Toasts use `sonner`; `<Toaster position="top-right" ... />` is already mounted in `src/app/layout.tsx`, so call `toast.success`/`toast.error` directly instead of adding a second toaster or another toast library.
- Use the `@/*` alias (`@/*` → `src/*`). Josefin Sans is loaded in `src/app/layout.tsx` and wired to `--font-sans`.
