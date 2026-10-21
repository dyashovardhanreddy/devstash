# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md


## Context

Read the following to get the full context of the project:

- @context/project-overview.md
- @context/coding-standards.md
- @context/ai-interaction.md
- @context/current-feature.md

## Commands

- `npm run dev` — dev server at http://localhost:3000
- `npm run build` — production build
- `npm run start` — serve the production build
- `npm run lint` — ESLint (flat config in `eslint.config.mjs`, using `eslint-config-next` core-web-vitals + typescript)
- `npx tsc --noEmit` — type check

No test framework is set up yet.

## Stack

- Next.js 16.4 (App Router, `src/app/`), React 19.3, TypeScript (strict), Tailwind CSS v4.
- Next.js 16 differs from older versions. Check the bundled docs in `node_modules/next/dist/docs/` (`01-app/` for the App Router) before using Next.js APIs.
- Import alias: `@/*` → `src/*`.
- Route/layout prop types come from Next's generated global helpers (e.g. `LayoutProps<"/">` in `src/app/layout.tsx`), produced into `.next/types` by `next dev` / `next build`.

## Configuration notes

- `next.config.ts` enables `cacheComponents` and `partialPrefetching`. Data fetching and caching follow the Cache Components model, not the older `fetch`/route-segment caching. See `01-app/03-api-reference/05-config/01-next-config-js/cacheComponents.md` and `01-app/02-guides/adopting-partial-prefetching.md` in the bundled docs.
- Tailwind v4 is wired through a Turbopack loader rule (`@tailwindcss/turbopack` for `*.css` in `next.config.ts`). There is no `postcss.config` or `tailwind.config` file. Theme customization goes in CSS via `@theme`.
- `src/app/globals.css` contains only `@import "tailwindcss";`. `layout.tsx` loads Geist fonts as CSS variables (`--font-geist-sans`, `--font-geist-mono`), but they are not mapped to Tailwind's `font-sans`/`font-mono`.
