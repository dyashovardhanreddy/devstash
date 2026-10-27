import { prisma } from "@/lib/prisma";
import type { CollectionItemType, CollectionStats, DashboardCollection } from "@/types/collection";

const ITEM_TYPE_SELECT = { id: true, name: true, icon: true, color: true } as const;

// Item types sorted by how many of the collection's items use them, most used first.
function rankItemTypes(types: CollectionItemType[]): CollectionItemType[] {
  const counts = new Map<string, { type: CollectionItemType; count: number }>();
  for (const type of types) {
    const entry = counts.get(type.id);
    counts.set(type.id, { type, count: (entry?.count ?? 0) + 1 });
  }
  return [...counts.values()].sort((a, b) => b.count - a.count).map(({ type }) => type);
}

export async function getRecentCollections(userId: string, limit: number): Promise<DashboardCollection[]> {
  const collections = await prisma.collection.findMany({
    where: { userId },
    orderBy: { updatedAt: "desc" },
    take: limit,
    select: {
      id: true,
      name: true,
      description: true,
      isFavorite: true,
      defaultType: { select: ITEM_TYPE_SELECT },
      items: { select: { item: { select: { itemType: { select: ITEM_TYPE_SELECT } } } } },
    },
  });

  return collections.map(({ items, defaultType, ...collection }) => {
    const types = rankItemTypes(items.map(({ item }) => item.itemType));
    return {
      ...collection,
      itemCount: items.length,
      types: types.length === 0 && defaultType ? [defaultType] : types,
    };
  });
}

export async function getCollectionStats(userId: string): Promise<CollectionStats> {
  const [collections, favoriteCollections] = await Promise.all([
    prisma.collection.count({ where: { userId } }),
    prisma.collection.count({ where: { userId, isFavorite: true } }),
  ]);
  return { collections, favoriteCollections };
}
