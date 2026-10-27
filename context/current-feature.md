# Current Feature

Prisma + Neon PostgreSQL Setup

## Status

Completed

## Goals

- Set up Prisma 7 ORM with Neon PostgreSQL (serverless)
- Create the initial schema from the data models in @context/project-overview.md (this will evolve)
- Include NextAuth models (Account, Session, VerificationToken)
- Add appropriate indexes and cascade deletes
- Create the initial migration with `prisma migrate dev` (never `db push`)

## Notes

- Spec: @context/features/database-spec.md
- Use Prisma 7, which has breaking changes. Read the upgrade guide first: https://www.prisma.io/docs/orm/more/upgrade-guides/upgrading-versions/upgrading-to-prisma-7
- Setup guide: https://www.prisma.io/docs/getting-started/prisma-orm/quickstart/prisma-postgres
- `DATABASE_URL` points to the Neon development branch; a separate production branch exists. Always create migrations and never push directly unless specified.
- Database standards: @context/coding-standards.md

## History

- Project setup and boilerplate cleanup
- Initial Next.js 16 + Tailwind CSS v4 setup (commit `e45f925`), pushed to `origin/main`
- Security upgrade: Next.js 16.4.0 → 16.4.2 (commit `92729cf`)
- Dashboard UI Phase 1: shadcn/ui setup, `/dashboard` route and layout, dark mode by default, top bar with search and new item button, sidebar/main placeholders
- Dashboard UI Phase 2: collapsible sidebar with toggle in the top bar, mobile drawer (shadcn Sheet), item type links to `/items/[type]`, favorite and recent collections, user avatar area
- Dashboard UI Phase 3: main area with stats cards, recent collections, pinned items, and 10 most recent items (commit `8c7a375`)
- Prisma + Neon PostgreSQL setup: Prisma 7.10.1 with the Neon driver adapter, initial schema with Auth.js models, indexes and cascade deletes, initial migration `20261027001053_init` applied to the dev branch, `scripts/test-db.ts` connection test, `db:studio` script
