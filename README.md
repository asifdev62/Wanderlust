# Wanderlast

A Next.js App Router travel-destination explorer backed by a small Express + MongoDB API.

## Requirements

- Node.js 22+
- The companion API running at `http://localhost:5000` (`../wanderlast_server`)

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

The API base URL defaults to `http://localhost:5000`. Override it with
`NEXT_PUBLIC_API_BASE_URL` if the Express server runs elsewhere.

## Commands

- `npm run dev` — Turbopack development server.
- `npm run lint` — ESLint (flat config).
- `npx tsc --noEmit` — TypeScript check.
- `npm run build` — production build (Turbopack + TypeScript).
- `npm run start` — serve the production build.

## Routes

- `/` — landing page.
- `/destinations` — filterable destination collection.
- `/destinations/[id]` — destination details and booking panel.
- `/add-destination` — create a travel package (`POST /add-destination`).

## API

The app consumes these Express routes:

- `GET /destination`
- `GET /destination/:id`
- `POST /add-destination`
- `PATCH /destination/:id`

The destination edit dialog updates the selected record through
`PATCH /destination/:id`. There is currently no delete endpoint.

## Project structure

- `src/app` — routes, layouts, and route-level UI.
- `src/components` — shared site components.
- `src/components/ui` — shadcn/ui primitives (Base UI based).
- `src/lib` — API helpers, formatting, and shared types.
