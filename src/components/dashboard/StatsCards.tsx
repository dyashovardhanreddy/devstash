import { Folder, FolderHeart, Layers, Star, type LucideIcon } from "lucide-react";

import type { CollectionStats } from "@/types/collection";
import type { ItemStats } from "@/types/item";

type DashboardStats = ItemStats & CollectionStats;

interface StatCard {
  label: string;
  value: number;
  icon: LucideIcon;
}

export function StatsCards({ stats }: { stats: DashboardStats }) {
  const cards: StatCard[] = [
    { label: "Items", value: stats.items, icon: Layers },
    { label: "Collections", value: stats.collections, icon: Folder },
    { label: "Favorite Items", value: stats.favoriteItems, icon: Star },
    { label: "Favorite Collections", value: stats.favoriteCollections, icon: FolderHeart },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {cards.map(({ label, value, icon: Icon }) => (
        <div key={label} className="rounded-xl border border-border bg-card p-4">
          <div className="flex items-center justify-between text-muted-foreground">
            <span className="text-sm">{label}</span>
            <Icon className="size-4" />
          </div>
          <p className="mt-2 text-2xl font-semibold">{value}</p>
        </div>
      ))}
    </div>
  );
}
