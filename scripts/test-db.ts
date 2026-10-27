import "dotenv/config";
import { prisma } from "../src/lib/prisma";

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
}

main()
  .catch((error: unknown) => {
    console.error("✘ Database test failed:");
    console.error(error instanceof Error ? error.message : error);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());
