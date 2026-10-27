import type { Prisma } from "@/generated/prisma/client";
import { prisma } from "@/lib/prisma";
import type { DashboardItem, ItemStats } from "@/types/item";

const DASHBOARD_ITEM_SELECT = {
  id: true,
  title: true,
  description: true,
  isFavorite: true,
  isPinned: true,
  createdAt: true,
  itemType: { select: { id: true, name: true, icon: true, color: true } },
  tags: { select: { name: true }, orderBy: { name: "asc" } },
} satisfies Prisma.ItemSelect;

type DashboardItemRow = Prisma.ItemGetPayload<{ select: typeof DASHBOARD_ITEM_SELECT }>;

function toDashboardItem({ itemType, tags, ...item }: DashboardItemRow): DashboardItem {
  return { ...item, type: itemType, tags: tags.map((tag) => tag.name) };
}

export async function getPinnedItems(userId: string): Promise<DashboardItem[]> {
  const items = await prisma.item.findMany({
    where: { userId, isPinned: true },
    orderBy: { updatedAt: "desc" },
    select: DASHBOARD_ITEM_SELECT,
  });
  return items.map(toDashboardItem);
}

// Most recently used first; items never used fall back to creation order.
export async function getRecentItems(userId: string, limit: number): Promise<DashboardItem[]> {
  const items = await prisma.item.findMany({
    where: { userId },
    orderBy: [{ lastUsedAt: { sort: "desc", nulls: "last" } }, { createdAt: "desc" }],
    take: limit,
    select: DASHBOARD_ITEM_SELECT,
  });
  return items.map(toDashboardItem);
}

export async function getItemStats(userId: string): Promise<ItemStats> {
  const [items, favoriteItems] = await Promise.all([
    prisma.item.count({ where: { userId } }),
    prisma.item.count({ where: { userId, isFavorite: true } }),
  ]);
  return { items, favoriteItems };
}
