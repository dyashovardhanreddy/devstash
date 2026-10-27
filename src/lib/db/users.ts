import { connection } from "next/server";

import { prisma } from "@/lib/prisma";

const DEMO_USER_EMAIL = "demo@devstash.io";

// Stand-in for the signed-in user until auth is in place.
export async function getCurrentUserId(): Promise<string> {
  // User data is per request; keep it out of prerendering (auth will read cookies here later)
  await connection();

  const user = await prisma.user.findUnique({
    where: { email: DEMO_USER_EMAIL },
    select: { id: true },
  });
  if (!user) {
    throw new Error(`Demo user ${DEMO_USER_EMAIL} not found. Run \`npm run db:seed\`.`);
  }
  return user.id;
}
