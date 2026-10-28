import "dotenv/config";
import bcrypt from "bcryptjs";
import { prisma } from "../src/lib/prisma";
import { ContentType } from "../src/generated/prisma/enums";

export const SYSTEM_ITEM_TYPES = [
  { name: "snippet", slug: "snippets", icon: "Code", color: "#3b82f6" },
  { name: "prompt", slug: "prompts", icon: "Sparkles", color: "#8b5cf6" },
  { name: "command", slug: "commands", icon: "Terminal", color: "#f97316" },
  { name: "note", slug: "notes", icon: "StickyNote", color: "#fde047" },
  { name: "file", slug: "files", icon: "File", color: "#6b7280" },
  { name: "image", slug: "images", icon: "Image", color: "#ec4899" },
  { name: "link", slug: "links", icon: "Link", color: "#10b981" },
] as const;

type SystemTypeName = (typeof SYSTEM_ITEM_TYPES)[number]["name"];

interface SeedItem {
  type: SystemTypeName;
  title: string;
  description: string;
  content?: string;
  language?: string;
  url?: string;
  isPinned?: boolean;
  isFavorite?: boolean;
}

interface SeedCollection {
  name: string;
  description: string;
  defaultType: SystemTypeName;
  isFavorite?: boolean;
  items: SeedItem[];
}

const DEMO_USER = {
  email: "demo@devstash.io",
  name: "Demo User",
  password: "12345678",
};

const COLLECTIONS: SeedCollection[] = [
  {
    name: "React Patterns",
    description: "Reusable React patterns and hooks",
    defaultType: "snippet",
    isFavorite: true,
    items: [
      {
        type: "snippet",
        title: "useDebounce and useLocalStorage hooks",
        description: "Debounce a changing value and persist state to localStorage",
        language: "typescript",
        isPinned: true,
        isFavorite: true,
        content: `import { useEffect, useState } from "react";

export function useDebounce<T>(value: T, delay = 300): T {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debounced;
}

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(() => {
    if (typeof window === "undefined") return initialValue;
    const stored = window.localStorage.getItem(key);
    return stored ? (JSON.parse(stored) as T) : initialValue;
  });

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue] as const;
}`,
      },
      {
        type: "snippet",
        title: "Compound component with context",
        description: "Tabs built as a compound component sharing state via context",
        language: "typescript",
        content: `import { createContext, useContext, useState, type ReactNode } from "react";

interface TabsContextValue {
  active: string;
  setActive: (id: string) => void;
}

const TabsContext = createContext<TabsContextValue | null>(null);

function useTabs() {
  const ctx = useContext(TabsContext);
  if (!ctx) throw new Error("Tabs components must be used inside <Tabs>");
  return ctx;
}

export function Tabs({ defaultValue, children }: { defaultValue: string; children: ReactNode }) {
  const [active, setActive] = useState(defaultValue);
  return <TabsContext.Provider value={{ active, setActive }}>{children}</TabsContext.Provider>;
}

Tabs.Trigger = function Trigger({ value, children }: { value: string; children: ReactNode }) {
  const { active, setActive } = useTabs();
  return (
    <button aria-selected={active === value} onClick={() => setActive(value)}>
      {children}
    </button>
  );
};

Tabs.Panel = function Panel({ value, children }: { value: string; children: ReactNode }) {
  const { active } = useTabs();
  return active === value ? <div>{children}</div> : null;
};`,
      },
      {
        type: "snippet",
        title: "cn and formatRelativeTime utilities",
        description: "Class name merging and human-friendly relative dates",
        language: "typescript",
        content: `import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });

export function formatRelativeTime(date: Date): string {
  const seconds = Math.round((date.getTime() - Date.now()) / 1000);
  const units: [Intl.RelativeTimeFormatUnit, number][] = [
    ["year", 31536000],
    ["month", 2592000],
    ["day", 86400],
    ["hour", 3600],
    ["minute", 60],
  ];

  for (const [unit, size] of units) {
    if (Math.abs(seconds) >= size) return rtf.format(Math.round(seconds / size), unit);
  }
  return rtf.format(seconds, "second");
}`,
      },
    ],
  },
  {
    name: "AI Workflows",
    description: "AI prompts and workflow automations",
    defaultType: "prompt",
    isFavorite: true,
    items: [
      {
        type: "prompt",
        title: "Code review",
        description: "Thorough review focused on bugs, security, and readability",
        isPinned: true,
        content: `You are a senior engineer reviewing a pull request.

Review the code below and report:
1. Bugs and logic errors (with the exact line and a failing scenario)
2. Security issues (input validation, auth checks, injection)
3. Performance problems (unnecessary work, N+1 queries, re-renders)
4. Readability and naming improvements

Rank findings by severity. Skip style nits that a linter would catch.

\`\`\`
{{code}}
\`\`\``,
      },
      {
        type: "prompt",
        title: "Documentation generator",
        description: "Generate clear docs for a module or function",
        content: `Write documentation for the following code.

Include:
- A one-paragraph overview of what it does and when to use it
- Parameters and return values with types
- At least one realistic usage example
- Edge cases and errors the caller should know about

Write for a developer who is new to this codebase. Use Markdown.

\`\`\`
{{code}}
\`\`\``,
      },
      {
        type: "prompt",
        title: "Refactoring assistant",
        description: "Refactor code without changing behavior",
        content: `Refactor the code below to improve readability and maintainability.

Constraints:
- Do not change external behavior or public APIs
- Keep functions under 50 lines where possible
- Prefer clear names over comments
- Remove duplication, but don't introduce abstractions that are used only once

Return the refactored code, then a short bullet list explaining each change.

\`\`\`
{{code}}
\`\`\``,
      },
    ],
  },
  {
    name: "DevOps",
    description: "Infrastructure and deployment resources",
    defaultType: "link",
    items: [
      {
        type: "snippet",
        title: "Next.js multi-stage Dockerfile",
        description: "Small production image using Next.js standalone output",
        language: "dockerfile",
        content: `FROM node:22-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

FROM node:22-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public
EXPOSE 3000
CMD ["node", "server.js"]`,
      },
      {
        type: "command",
        title: "Deploy with migrations",
        description: "Apply pending Prisma migrations, then build and start",
        language: "bash",
        isPinned: true,
        content: `npx prisma migrate deploy && npm run build && npm run start`,
      },
      {
        type: "link",
        title: "Docker documentation",
        description: "Official Docker docs and Dockerfile reference",
        url: "https://docs.docker.com/",
      },
      {
        type: "link",
        title: "GitHub Actions documentation",
        description: "Workflows, runners, and CI/CD with GitHub Actions",
        url: "https://docs.github.com/en/actions",
      },
    ],
  },
  {
    name: "Terminal Commands",
    description: "Useful shell commands for everyday development",
    defaultType: "command",
    isFavorite: true,
    items: [
      {
        type: "command",
        title: "Undo last commit, keep changes",
        description: "Move HEAD back one commit and keep changes staged",
        language: "bash",
        isFavorite: true,
        content: `git reset --soft HEAD~1`,
      },
      {
        type: "command",
        title: "Clean up Docker resources",
        description: "Remove stopped containers, unused networks, images, and build cache",
        language: "bash",
        content: `docker system prune -a --volumes`,
      },
      {
        type: "command",
        title: "Kill process on a port",
        description: "Find and stop whatever is listening on port 3000",
        language: "bash",
        content: `lsof -ti :3000 | xargs kill -9`,
      },
      {
        type: "command",
        title: "Check outdated packages",
        description: "List outdated npm dependencies and update within semver ranges",
        language: "bash",
        content: `npm outdated && npm update`,
      },
    ],
  },
  {
    name: "Design Resources",
    description: "UI/UX resources and references",
    defaultType: "link",
    items: [
      {
        type: "link",
        title: "Tailwind CSS documentation",
        description: "Utility classes and v4 theme configuration",
        url: "https://tailwindcss.com/docs",
      },
      {
        type: "link",
        title: "shadcn/ui",
        description: "Accessible components you copy into your project",
        url: "https://ui.shadcn.com",
      },
      {
        type: "link",
        title: "Material Design 3",
        description: "Google's open-source design system",
        url: "https://m3.material.io",
      },
      {
        type: "link",
        title: "Lucide icons",
        description: "Open-source icon library used across DevStash",
        url: "https://lucide.dev/icons",
      },
    ],
  },
];

async function seedSystemTypes() {
  const typeIds = new Map<SystemTypeName, string>();

  // userId is null for system types, so the [userId, slug] unique can't be used with upsert
  for (const type of SYSTEM_ITEM_TYPES) {
    const existing = await prisma.itemType.findFirst({
      where: { userId: null, slug: type.slug },
    });
    const saved = existing
      ? await prisma.itemType.update({ where: { id: existing.id }, data: { ...type, isSystem: true } })
      : await prisma.itemType.create({ data: { ...type, isSystem: true } });
    typeIds.set(type.name, saved.id);
  }

  return typeIds;
}

async function seedDemoUser() {
  // Deleting cascades to the user's items, collections, and tags
  await prisma.user.deleteMany({ where: { email: DEMO_USER.email } });

  return prisma.user.create({
    data: {
      email: DEMO_USER.email,
      name: DEMO_USER.name,
      password: await bcrypt.hash(DEMO_USER.password, 12),
      isPro: false,
      emailVerified: new Date(),
    },
  });
}

function contentTypeFor(type: SystemTypeName): ContentType {
  if (type === "link") return ContentType.URL;
  if (type === "file" || type === "image") return ContentType.FILE;
  return ContentType.TEXT;
}

async function seedCollections(userId: string, typeIds: Map<SystemTypeName, string>) {
  for (const collection of COLLECTIONS) {
    const created = await prisma.collection.create({
      data: {
        name: collection.name,
        description: collection.description,
        isFavorite: collection.isFavorite,
        userId,
        defaultTypeId: typeIds.get(collection.defaultType),
      },
    });

    for (const item of collection.items) {
      await prisma.item.create({
        data: {
          title: item.title,
          description: item.description,
          contentType: contentTypeFor(item.type),
          content: item.content,
          language: item.language,
          url: item.url,
          isPinned: item.isPinned,
          isFavorite: item.isFavorite,
          userId,
          itemTypeId: typeIds.get(item.type)!,
          collections: { create: { collectionId: created.id } },
        },
      });
    }

    console.log(`  ${collection.name}: ${collection.items.length} items`);
  }
}

async function main() {
  const typeIds = await seedSystemTypes();
  console.log(`✔ System item types (${typeIds.size})`);

  const user = await seedDemoUser();
  console.log(`✔ Demo user (${user.email})`);

  console.log(`✔ Collections (${COLLECTIONS.length})`);
  await seedCollections(user.id, typeIds);
}

main()
  .catch((error: unknown) => {
    console.error("✘ Seed failed:");
    console.error(error instanceof Error ? error.message : error);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());
