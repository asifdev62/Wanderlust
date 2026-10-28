<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Repository Notes

Single Next.js 16 App Router app (React 19, Turbopack). All source lives under `src/`; there is no monorepo and no test suite. The app is a frontend only: destination, booking, and auth data come from a separately run Express + MongoDB API expected at `http://localhost:5000` (sibling checkout `../wanderlast_server`, not in this repo).

## Commands

- `npm run dev` — Turbopack dev server at http://localhost:3000.
- `npm run lint` — ESLint flat config (`next lint` no longer exists).
- `npx tsc --noEmit` — typecheck; no npm script exists.
- `npm run build` — Turbopack + TypeScript, but **not** ESLint. Verify lint → typecheck → build.
- There is no test runner or single-test command.

One baseline gotcha when verifying: `next-env.d.ts` is gitignored and imports generated route types from `.next/dev/types`, so on a fresh clone run `npm run dev`/`build` before trusting `tsc`. `LayoutProps`/`PageProps` globals only exist after generation.

## Next 16 configuration

`next.config.ts` differs from the defaults you may expect:

- `cacheComponents: false` and `partialPrefetching: false`. There is no Cache Components build error to work around; do not restructure data fetching around `<Suspense>` + `'use cache'` or add `export const instant`.
- `reactCompiler: true`. No need to add `useMemo`/`useCallback` purely for render performance.
- A custom Turbopack rule sends every `*.css` through `@tailwindcss/turbopack`; leave it in place.
- `images.remotePatterns` already allows any HTTPS host plus HTTP `localhost`/`127.0.0.1`, so new Mongo-hosted image URLs need no config change.
- Turbopack is the default for dev and build — never add `--turbopack` or a webpack config.
- `params`, `searchParams`, `cookies()`, and `headers()` are async; always await them.

## Auth (better-auth)

- Server config: `src/lib/auth.ts` — email/password only, MongoDB adapter, database name hardcoded to `wanderlast`. Client: `src/lib/auth-client.ts`. Route handler: `src/app/api/auth/[...all]/route.tsx` (note the `.tsx` extension).
- Sessions: `authClient.useSession()` in client components, `auth.api.getSession({ headers: await headers() })` in server components.
- The login page renders a Google button calling `authClient.signIn.social`, but `socialProviders` is commented out in `auth.ts`, so that path is not functional. Don't "fix" it by inventing credentials.
- `.env` (gitignored) needs `MONGODB_URL`, `BETTER_AUTH_SECRET`, and `BETTER_AUTH_URL`; `auth.ts` throws on a missing `MONGODB_URL`.
- Navbar links to `/admin`, which has no route.

## API and data

- Server components fetch the Express API directly with `cache: "no-store"` and `AbortSignal.timeout(10000)`, then normalize through `normalizeDestination` (`src/lib/destinations.ts`), which accepts both a bare record and `{ result: ... }` and coerces `price` to a string.
- Use the exported URL helpers (`API_BASE_URL`, `DESTINATIONS_API_URL`, `ADD_DESTINATION_API_URL`, `getDestinationUrl` in `src/lib/destinations.ts`; `getMyBookingsUrl` in `src/lib/bookings.ts`). Base URL comes from `NEXT_PUBLIC_API_BASE_URL`, default `http://localhost:5000`.
- `GET /my-bookings/:email` returns destination-shaped documents: `destinationName`/`imageUrl`, `price` as a string, and no `status` field. `normalizeBooking` handles both key styles and defaults status to `confirmed`; card keys include the index because a booking reuses the destination `_id`.
- One exception still hardcodes the API host: `src/components/booking/booking-panel.tsx` (`POST /bookings`).
- Real endpoints in use: `GET /destination`, `GET /destination/:id`, `POST /add-destination`, `PATCH /destination/:id`, `DELETE /destination/:id`, `POST /bookings`, `GET /my-bookings/:email`, `DELETE /bookings/:id?email=`. Booking deletion matches both string and ObjectId `_id` values because `POST /bookings` currently copies the destination's string `_id`. `README.md` is partly stale: it says there is no delete endpoint, but the UI issues `DELETE`.

## Duplicate and dead files

- `src/app/destinations/EditDestinationDialog.tsx` (capital E) is unused; the live file is `edit-destination-dialog.tsx`. Both exist on this case-sensitive checkout — never create case-only renames or a third copy.
- `src/components/booking/DeleteDestinationDialog.tsx` duplicates `src/app/destinations/delete-destination-dialog.tsx`; only the latter is imported.

## UI and styling

- Tailwind v4; no `tailwind.config.*`. Tokens live in `src/app/globals.css` (`@theme inline` plus `:root`/`.dark`). Brand colors are `--color-brand` (#15a1bf) and `--color-brand-dark`; use `bg-brand`/`text-brand` rather than raw hex (some auth pages still hardcode `#12A1C2`).
- Add shadcn components with `npx shadcn@latest add <component>`. `components.json` uses style `base-nova`, so primitives are **Base UI**, not Radix: `Select`'s `onValueChange` receives `string | null`, accepts an `items` prop and `alignItemWithTrigger` on content, and state styling uses `data-open`/`data-closed`/`data-placeholder` instead of Radix's `data-state`. Don't paste Radix examples.
- Import `cn` from `@/lib/utils` (a re-export of the `cn` package). Do not add `clsx` or `tailwind-merge`.
- Use the `@/*` alias (`@/*` → `src/*`). Fonts: Josefin Sans is loaded in `src/app/layout.tsx` and wired to `--font-sans`; no serif font is configured.
