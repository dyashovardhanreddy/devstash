import type { ReactNode } from "react";
import Link from "next/link";
import { Clock, Pin } from "lucide-react";

import { CollectionCard } from "@/components/dashboard/CollectionCard";
import { ItemCard } from "@/components/dashboard/ItemCard";
import { StatsCards } from "@/components/dashboard/StatsCards";
import { getDashboardStats, getPinnedItems, getRecentCollections, getRecentItems } from "@/lib/dashboard";

const RECENT_COLLECTIONS_LIMIT = 6;
const RECENT_ITEMS_LIMIT = 10;

export default function DashboardPage() {
  const recentCollections = getRecentCollections(RECENT_COLLECTIONS_LIMIT);
  const pinnedItems = getPinnedItems();
  const recentItems = getRecentItems(RECENT_ITEMS_LIMIT);

  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-8">
      <div>
        <h1 className="text-3xl font-semibold">Dashboard</h1>
        <p className="mt-1 text-muted-foreground">Your developer knowledge hub</p>
      </div>

      <StatsCards stats={getDashboardStats()} />

      <section>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold">Collections</h2>
          <Link href="/collections" className="text-sm text-muted-foreground hover:text-foreground">
            View all
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {recentCollections.map((collection) => (
            <CollectionCard key={collection.id} collection={collection} />
          ))}
        </div>
      </section>

      {pinnedItems.length > 0 && (
        <ItemSection title="Pinned" icon={<Pin className="size-4" />}>
          {pinnedItems.map((item) => (
            <ItemCard key={item.id} item={item} />
          ))}
        </ItemSection>
      )}

      <ItemSection title="Recent" icon={<Clock className="size-4" />}>
        {recentItems.map((item) => (
          <ItemCard key={item.id} item={item} />
        ))}
      </ItemSection>
    </div>
  );
}

interface ItemSectionProps {
  title: string;
  icon: ReactNode;
  children: ReactNode;
}

function ItemSection({ title, icon, children }: ItemSectionProps) {
  return (
    <section>
      <h2 className="mb-4 flex items-center gap-2 text-muted-foreground">
        {icon}
        {title}
      </h2>
      <div className="flex flex-col gap-3">{children}</div>
    </section>
  );
}
