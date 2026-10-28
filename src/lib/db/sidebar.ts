import { getSidebarCollections } from "@/lib/db/collections";
import { getSystemItemTypes } from "@/lib/db/items";
import { getCurrentUserId } from "@/lib/db/users";
import type { SidebarData } from "@/types/sidebar";

const SIDEBAR_RECENT_COLLECTIONS_LIMIT = 5;

export async function getSidebarData(): Promise<SidebarData> {
  const userId = await getCurrentUserId();
  const [itemTypes, collections] = await Promise.all([
    getSystemItemTypes(userId),
    getSidebarCollections(userId, SIDEBAR_RECENT_COLLECTIONS_LIMIT),
  ]);
  return { itemTypes, collections };
}
