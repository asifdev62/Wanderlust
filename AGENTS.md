<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Repository Notes

Single Next.js App Router app; all source is under `src/` (`src/app` routes, `src/components/ui` shadcn components, `src/lib`). There is no monorepo and no test suite. `README.md` is still create-next-app boilerplate and points at `app/`, which is wrong here.

## Commands

- `npm run dev` — Turbopack dev server at http://localhost:3000.
- `npm run lint` — ESLint flat config; `next lint` no longer exists in Next 16.
- `npx tsc --noEmit` — typecheck (there is no script for this).
- `npm run build` — full production check; runs Turbopack and TypeScript, but not ESLint.

For non-trivial changes, verify with lint, typecheck, then build.

## Next 16 configuration

`next.config.ts` enables `cacheComponents`, `partialPrefetching`, and `reactCompiler`. Consequences:

- With Cache Components on, uncached data read outside `<Suspense>` blocks the build. Wrap it in `<Suspense>` or cache it with `'use cache'`. Keep `params`/`searchParams` reads inside a Suspense-wrapped child so the route's App Shell stays static. `export const instant = false` opts a route out of instant-navigation validation.
- `cookies()`, `headers()`, `params`, and `searchParams` are async — always await them. Synchronous access was removed in Next 16.
- Turbopack is the default for both dev and build; do not add `--turbopack` or introduce a webpack config.
- Before using an unfamiliar Next API, read the version-matched docs in `node_modules/next/dist/docs/`. Start with `01-app/01-getting-started/08-caching.md` and `01-app/02-guides/migrating-to-cache-components.md`.

## UI and styling

- Tailwind v4 is used; there is no `tailwind.config.*`. Theme tokens and CSS variables live in `src/app/globals.css` (`@theme inline` plus `:root`/`.dark`). Add design tokens there.
- Add shadcn components with `npx shadcn@latest add <component>`. `components.json` uses the `base-nova` style, so primitives are built on `@base-ui/react`, not Radix.
- Import `cn` from `@/lib/utils` (a re-export of the `cn` package). Do not add `clsx` or `tailwind-merge`.
- Use the `@/*` import alias (`@/*` maps to `src/*`).
