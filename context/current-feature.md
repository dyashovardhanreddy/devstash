# Current Feature

Dashboard Collections (Real Data)

## Status

In Progress

## Goals

- Replace the mock collection data in the dashboard main area with real data from the Neon database via Prisma
- Create `src/lib/db/collections.ts` with the collection data fetching functions
- Fetch collections directly in the server component (no client-side fetching)
- Keep showing the 6 most recent collection cards with the current design
- Derive each collection card's border color from the item type used most in that collection
- Show small icons for every item type in a collection
- Update the collection stats display to use real counts

## Notes

- Spec: @context/features/dashboard-collections-spec.md
- Collection data currently comes from `src/lib/mock-data.ts`; replace that usage for collections only
- Do not wire up the items below the collections yet; that comes in a later feature
- Keep the existing layout and design; `context/screenshots/dashboard-ui-main.png` is a reference if needed
- Always scope queries by `userId` (use the seeded demo user until auth is in place)

## History

- Project setup and boilerplate cleanup
- Initial Next.js 16 + Tailwind CSS v4 setup (commit `e45f925`), pushed to `origin/main`
- Security upgrade: Next.js 16.4.0 → 16.4.2 (commit `92729cf`)
- Dashboard UI Phase 1: shadcn/ui setup, `/dashboard` route and layout, dark mode by default, top bar with search and new item button, sidebar/main placeholders
- Dashboard UI Phase 2: collapsible sidebar with toggle in the top bar, mobile drawer (shadcn Sheet), item type links to `/items/[type]`, favorite and recent collections, user avatar area
- Dashboard UI Phase 3: main area with stats cards, recent collections, pinned items, and 10 most recent items (commit `8c7a375`)
- Prisma + Neon PostgreSQL setup: Prisma 7.10.1 with the Neon driver adapter, initial schema with Auth.js models, indexes and cascade deletes, initial migration `20261027001053_init` applied to the dev branch, `scripts/test-db.ts` connection test, `db:studio` script
- Database seed script: `prisma/seed.ts` seeds 7 system item types, demo user `demo@devstash.io` (bcryptjs, 12 rounds), and 5 collections with 18 items; re-runnable via `npm run db:seed`; `scripts/test-db.ts` verifies the seeded demo data (commit `2602d56`)
