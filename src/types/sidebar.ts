import type { SidebarCollections } from "@/types/collection";
import type { SidebarItemType } from "@/types/item";

export interface SidebarData {
  itemTypes: SidebarItemType[];
  collections: SidebarCollections;
}
