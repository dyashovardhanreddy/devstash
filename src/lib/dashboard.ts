// Sidebar helpers over the mock data. The dashboard main area reads from the database (src/lib/db/).

import { items, type Collection, type Item } from "@/lib/mock-data";

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
