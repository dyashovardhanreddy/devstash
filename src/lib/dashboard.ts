// Dashboard data helpers over the mock data. Replace with Prisma queries once the database is in place.

import { collections, items, itemTypes, type Collection, type Item, type ItemType } from "@/lib/mock-data";

const itemTypesById = new Map(itemTypes.map((type) => [type.id, type]));

export function getItemType(id: string): ItemType | undefined {
  return itemTypesById.get(id);
}

function getCollectionItems(collection: Collection): Item[] {
  return items.filter((item) => item.collectionIds.includes(collection.id));
}

// Most recent lastUsedAt among a collection's items, until collections track their own activity.
export function getCollectionLastUsedAt(collection: Collection): number {
  return getCollectionItems(collection).reduce(
    (latest, item) => (item.lastUsedAt ? Math.max(latest, Date.parse(item.lastUsedAt)) : latest),
    0,
  );
}

export function sortByRecentActivity(list: Collection[]): Collection[] {
  return [...list].sort((a, b) => getCollectionLastUsedAt(b) - getCollectionLastUsedAt(a));
}

// Types present in a collection, most common first. Falls back to the default type when empty.
export function getCollectionTypes(collection: Collection): ItemType[] {
  const counts = new Map<string, number>();
  for (const item of getCollectionItems(collection)) {
    counts.set(item.itemTypeId, (counts.get(item.itemTypeId) ?? 0) + 1);
  }
  if (counts.size === 0) counts.set(collection.defaultTypeId, 1);

  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1])
    .map(([id]) => getItemType(id))
    .filter((type): type is ItemType => type !== undefined);
}

export function getRecentCollections(limit: number): Collection[] {
  return sortByRecentActivity(collections).slice(0, limit);
}

export function getPinnedItems(): Item[] {
  return items.filter((item) => item.isPinned);
}

export function getRecentItems(limit: number): Item[] {
  return items
    .filter((item) => item.lastUsedAt)
    .sort((a, b) => Date.parse(b.lastUsedAt!) - Date.parse(a.lastUsedAt!))
    .slice(0, limit);
}

export interface DashboardStats {
  items: number;
  collections: number;
  favoriteItems: number;
  favoriteCollections: number;
}

export function getDashboardStats(): DashboardStats {
  return {
    items: items.length,
    collections: collections.length,
    favoriteItems: items.filter((item) => item.isFavorite).length,
    favoriteCollections: collections.filter((collection) => collection.isFavorite).length,
  };
}
