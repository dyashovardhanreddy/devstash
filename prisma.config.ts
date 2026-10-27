import "dotenv/config";
import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    // The CLI (migrations) needs Neon's direct, non-pooled connection.
    // Not using env() so `prisma generate` works without a database URL.
    url: process.env.DATABASE_URL_UNPOOLED,
  },
});
