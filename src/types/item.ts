import type { CollectionItemType } from "@/types/collection";

export interface DashboardItem {
  id: string;
  title: string;
  description: string | null;
  isFavorite: boolean;
  isPinned: boolean;
  createdAt: Date;
  tags: string[];
  type: CollectionItemType;
}

export interface ItemStats {
  items: number;
  favoriteItems: number;
}
