import "dotenv/config";
import bcrypt from "bcryptjs";
import { prisma } from "../src/lib/prisma";

const DEMO_EMAIL = "demo@devstash.io";
const DEMO_PASSWORD = "12345678";

const EXPECTED_SYSTEM_TYPES = ["snippet", "prompt", "command", "note", "file", "image", "link"];

const EXPECTED_COLLECTIONS: Record<string, number> = {
  "React Patterns": 3,
  "AI Workflows": 3,
  DevOps: 4,
  "Terminal Commands": 4,
  "Design Resources": 4,
};

interface ServerInfo {
  database: string;
  user: string;
  version: string;
}

interface Migration {
  migration_name: string;
  finished_at: Date | null;
}

async function main() {
  const [info] = await prisma.$queryRaw<ServerInfo[]>`
    SELECT current_database()::text AS database,
           current_user::text AS user,
           version() AS version
  `;
  console.log("✔ Connected");
  console.log(`  Database: ${info.database}`);
  console.log(`  User:     ${info.user}`);
  console.log(`  Server:   ${info.version.split(" on ")[0]}`);

  const migrations = await prisma.$queryRaw<Migration[]>`
    SELECT migration_name, finished_at
    FROM _prisma_migrations
    ORDER BY started_at
  `;
  console.log(`\n✔ Migrations (${migrations.length})`);
  for (const m of migrations) {
    console.log(`  ${m.finished_at ? "applied" : "PENDING"}  ${m.migration_name}`);
  }

  const counts = {
    users: await prisma.user.count(),
    itemTypes: await prisma.itemType.count(),
    items: await prisma.item.count(),
    collections: await prisma.collection.count(),
    tags: await prisma.tag.count(),
  };
  console.log("\n✔ Row counts");
  console.table(counts);

  await checkSystemTypes();
  await checkDemoData();
}

function assert(condition: unknown, message: string): asserts condition {
  if (!condition) throw new Error(message);
}

async function checkSystemTypes() {
  const types = await prisma.itemType.findMany({
    where: { userId: null, isSystem: true },
    orderBy: { name: "asc" },
  });
  const names = types.map((t) => t.name);
  for (const name of EXPECTED_SYSTEM_TYPES) {
    assert(names.includes(name), `Missing system item type "${name}"`);
  }

  console.log(`\n✔ System item types (${types.length})`);
  console.table(types.map(({ name, slug, icon, color }) => ({ name, slug, icon, color })));
}

async function checkDemoData() {
  const user = await prisma.user.findUnique({
    where: { email: DEMO_EMAIL },
    include: {
      collections: {
        orderBy: { createdAt: "asc" },
        include: {
          defaultType: true,
          items: { include: { item: { include: { itemType: true } } } },
        },
      },
    },
  });
  assert(user, `Demo user ${DEMO_EMAIL} not found. Run \`npm run db:seed\`.`);
  assert(user.password, "Demo user has no password hash");
  assert(await bcrypt.compare(DEMO_PASSWORD, user.password), "Demo password does not match hash");
  assert(user.emailVerified, "Demo user email is not verified");

  console.log(`\n✔ Demo user`);
  console.log(`  ${user.name} <${user.email}>  isPro: ${user.isPro}  password: verified`);

  console.log(`\n✔ Collections (${user.collections.length})`);
  for (const collection of user.collections) {
    const expected = EXPECTED_COLLECTIONS[collection.name];
    assert(expected !== undefined, `Unexpected collection "${collection.name}"`);
    assert(
      collection.items.length === expected,
      `"${collection.name}" has ${collection.items.length} items, expected ${expected}`,
    );

    console.log(`  ${collection.name} (${collection.items.length}, default: ${collection.defaultType?.name})`);
    for (const { item } of collection.items) {
      checkItemContent(item.title, item.itemType.name, item.contentType, item.content, item.url);
      const detail = item.url ?? `${item.content?.split("\n").length} lines`;
      console.log(`    [${item.itemType.name}] ${item.title} — ${detail}`);
    }
  }
  for (const name of Object.keys(EXPECTED_COLLECTIONS)) {
    assert(user.collections.some((c) => c.name === name), `Missing collection "${name}"`);
  }

  console.log("\n✔ Demo data fetched and verified");
}

function checkItemContent(
  title: string,
  type: string,
  contentType: string,
  content: string | null,
  url: string | null,
) {
  if (type === "link") {
    assert(contentType === "URL" && url, `Link "${title}" is missing a URL`);
  } else {
    assert(contentType === "TEXT" && content, `Item "${title}" is missing text content`);
  }
}

main()
  .catch((error: unknown) => {
    console.error("✘ Database test failed:");
    console.error(error instanceof Error ? error.message : error);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());
