// Dashboard data helpers over the mock data. Collections now come from the database (src/lib/db/collections.ts).

import { items, itemTypes, type Collection, type Item, type ItemType } from "@/lib/mock-data";
import type { CollectionStats } from "@/types/collection";

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

export function getPinnedItems(): Item[] {
  return items.filter((item) => item.isPinned);
}

export function getRecentItems(limit: number): Item[] {
  return items
    .filter((item) => item.lastUsedAt)
    .sort((a, b) => Date.parse(b.lastUsedAt!) - Date.parse(a.lastUsedAt!))
    .slice(0, limit);
}

export interface ItemStats {
  items: number;
  favoriteItems: number;
}

export type DashboardStats = ItemStats & CollectionStats;

export function getItemStats(): ItemStats {
  return {
    items: items.length,
    favoriteItems: items.filter((item) => item.isFavorite).length,
  };
}
