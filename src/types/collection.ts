export interface CollectionItemType {
  id: string;
  name: string;
  icon: string;
  color: string;
}

export interface DashboardCollection {
  id: string;
  name: string;
  description: string | null;
  isFavorite: boolean;
  itemCount: number;
  // Item types in the collection, most used first. Falls back to the default type when empty.
  types: CollectionItemType[];
}

export interface CollectionStats {
  collections: number;
  favoriteCollections: number;
}
