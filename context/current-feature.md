# Current Feature

Stats & Sidebar (Real Data)

## Status

Not Started

## Goals

- Display the dashboard stats from database data, keeping the current design and layout
- Show the system item types in the sidebar with their icons, linking to `/items/[typename]`
- Show the user's real collections from the database in the sidebar
- Add a "View all collections" link under the sidebar collections list that goes to `/collections`
- Keep the star icons for favorite collections; for recent collections, show a colored circle based on the most-used item type in each collection
- Add the needed database functions to `src/lib/db/items.ts` (use `src/lib/db/collections.ts` as a reference)

## Notes

- Spec: @context/features/stats-sidebar-spec.md
- The stats cards already read from the database (previous feature); confirm nothing still comes from `src/lib/mock-data.ts`
- `src/lib/db/items.ts` already exists; extend it rather than recreating it
- The sidebar currently uses `src/lib/mock-data.ts` and `sortByRecentActivity` from `src/lib/dashboard.ts`; replace those with database queries
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
- Dashboard items from the database: `src/lib/db/items.ts` (pinned items, recent items, item stats) and `src/types/item.ts`, item cards use their item type for the icon and border color and show tags, pinned section renders nothing when empty, recent items ordered by `lastUsedAt` then `createdAt`, item stats from Prisma, pinned and recent items streamed with Suspense; mock item helpers removed from `src/lib/dashboard.ts` (sidebar still uses mock data) (commit `8aa60d1`)
