# Current Feature

Database Seed Script

## Status

In Progress

## Goals

- Create `prisma/seed.ts` to populate the database with sample data for development and demos
- Seed a demo user:
  - Email: `demo@devstash.io`, name: `Demo User`
  - Password `12345678`, hashed with bcryptjs (12 rounds)
  - `isPro: false`, `emailVerified`: current date
- Seed the 7 system item types (`isSystem: true`), using Lucide icon names:
  - snippet (`Code`, `#3b82f6`), prompt (`Sparkles`, `#8b5cf6`), command (`Terminal`, `#f97316`), note (`StickyNote`, `#fde047`), file (`File`, `#6b7280`), image (`Image`, `#ec4899`), link (`Link`, `#10b981`)
- Seed collections and their items for the demo user:
  - **React Patterns** (Reusable React patterns and hooks): 3 TypeScript snippets covering custom hooks (useDebounce, useLocalStorage, etc.), component patterns (context providers, compound components), and utility functions
  - **AI Workflows** (AI prompts and workflow automations): 3 prompts for code review, documentation generation, and refactoring assistance
  - **DevOps** (Infrastructure and deployment resources): 1 snippet (Docker, CI/CD config), 1 command (deployment scripts), 2 links (real documentation URLs)
  - **Terminal Commands** (Useful shell commands for everyday development): 4 commands for git operations, Docker, process management, and package manager utilities
  - **Design Resources** (UI/UX resources and references): 4 links (real URLs) for CSS/Tailwind references, component libraries, design systems, and icon libraries

## Notes

- Spec: @context/features/seed-spec.md
- Item type slugs follow the plural form from the System Type Seed in @context/project-overview.md (`snippets`, `prompts`, …)
- Set `contentType` to match the type: `TEXT` for snippet/prompt/command/note, `URL` for link
- Use Prisma 7 seeding config (seed command in `prisma.config.ts`) and the existing Neon driver adapter setup
- Seed only the dev database branch; never modify schema outside migrations

## History

- Project setup and boilerplate cleanup
- Initial Next.js 16 + Tailwind CSS v4 setup (commit `e45f925`), pushed to `origin/main`
- Security upgrade: Next.js 16.4.0 → 16.4.2 (commit `92729cf`)
- Dashboard UI Phase 1: shadcn/ui setup, `/dashboard` route and layout, dark mode by default, top bar with search and new item button, sidebar/main placeholders
- Dashboard UI Phase 2: collapsible sidebar with toggle in the top bar, mobile drawer (shadcn Sheet), item type links to `/items/[type]`, favorite and recent collections, user avatar area
- Dashboard UI Phase 3: main area with stats cards, recent collections, pinned items, and 10 most recent items (commit `8c7a375`)
- Prisma + Neon PostgreSQL setup: Prisma 7.10.1 with the Neon driver adapter, initial schema with Auth.js models, indexes and cascade deletes, initial migration `20261027001053_init` applied to the dev branch, `scripts/test-db.ts` connection test, `db:studio` script
