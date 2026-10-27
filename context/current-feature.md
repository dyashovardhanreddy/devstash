# Current Feature

Dashboard Items (Real Data)

## Status

In Progress

## Goals

- Replace the mock item data in the dashboard main area with real data from the Neon database via Prisma, for both pinned and recent items
- Create `src/lib/db/items.ts` with the item data fetching functions
- Fetch items directly in the server component (no client-side fetching)
- Derive each item card's icon and border color from its item type
- Keep displaying item type tags and everything else currently shown on the item cards
- If there are no pinned items, render nothing for the pinned section
- Update the stats display to use real item counts

## Notes

- Spec: @context/features/dashboard-items-spec.md
- Item data currently comes from `src/lib/mock-data.ts`; replace that usage for items
- Keep the existing layout and design; `context/screenshots/dashboard-ui-main.png` is a reference if needed
- Always scope queries by `userId` (use the seeded demo user from `src/lib/db/users.ts` until auth is in place)

## History

- Project setup and boilerplate cleanup
- Initial Next.js 16 + Tailwind CSS v4 setup (commit `e45f925`), pushed to `origin/main`
- Security upgrade: Next.js 16.4.0 → 16.4.2 (commit `92729cf`)
- Dashboard UI Phase 1: shadcn/ui setup, `/dashboard` route and layout, dark mode by default, top bar with search and new item button, sidebar/main placeholders
- Dashboard UI Phase 2: collapsible sidebar with toggle in the top bar, mobile drawer (shadcn Sheet), item type links to `/items/[type]`, favorite and recent collections, user avatar area
- Dashboard UI Phase 3: main area with stats cards, recent collections, pinned items, and 10 most recent items (commit `8c7a375`)
- Prisma + Neon PostgreSQL setup: Prisma 7.10.1 with the Neon driver adapter, initial schema with Auth.js models, indexes and cascade deletes, initial migration `20261027001053_init` applied to the dev branch, `scripts/test-db.ts` connection test, `db:studio` script
- Database seed script: `prisma/seed.ts` seeds 7 system item types, demo user `demo@devstash.io` (bcryptjs, 12 rounds), and 5 collections with 18 items; re-runnable via `npm run db:seed`; `scripts/test-db.ts` verifies the seeded demo data (commit `2602d56`)
- Dashboard collections from the database: `src/lib/db/collections.ts` (recent collections, collection stats) and `src/lib/db/users.ts` (demo user as current user until auth), collection cards use the most-used item type for the border color and show icons for all types, collection stats from Prisma, stats and collections streamed with Suspense skeletons; items remain mock data (commit `821a366`)
