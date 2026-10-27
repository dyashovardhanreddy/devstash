import { Suspense, type ReactNode } from "react";
import Link from "next/link";
import { Clock, Pin } from "lucide-react";

import { CollectionCard } from "@/components/dashboard/CollectionCard";
import { ItemCard } from "@/components/dashboard/ItemCard";
import { StatsCards } from "@/components/dashboard/StatsCards";
import { getItemStats, getPinnedItems, getRecentItems } from "@/lib/dashboard";
import { getCollectionStats, getRecentCollections } from "@/lib/db/collections";
import { getCurrentUserId } from "@/lib/db/users";

const RECENT_COLLECTIONS_LIMIT = 6;
const RECENT_ITEMS_LIMIT = 10;

export default function DashboardPage() {
  const pinnedItems = getPinnedItems();
  const recentItems = getRecentItems(RECENT_ITEMS_LIMIT);

  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-8">
      <div>
        <h1 className="text-3xl font-semibold">Dashboard</h1>
        <p className="mt-1 text-muted-foreground">Your developer knowledge hub</p>
      </div>

      <Suspense fallback={<SkeletonGrid count={4} className="grid-cols-2 lg:grid-cols-4" cardClassName="h-22" />}>
        <DashboardStats />
      </Suspense>

      <section>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold">Collections</h2>
          <Link href="/collections" className="text-sm text-muted-foreground hover:text-foreground">
            View all
          </Link>
        </div>
        <Suspense
          fallback={
            <SkeletonGrid
              count={RECENT_COLLECTIONS_LIMIT}
              className="sm:grid-cols-2 xl:grid-cols-3"
              cardClassName="h-38"
            />
          }
        >
          <RecentCollections />
        </Suspense>
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

async function DashboardStats() {
  const userId = await getCurrentUserId();
  const collectionStats = await getCollectionStats(userId);

  return <StatsCards stats={{ ...getItemStats(), ...collectionStats }} />;
}

async function RecentCollections() {
  const userId = await getCurrentUserId();
  const collections = await getRecentCollections(userId, RECENT_COLLECTIONS_LIMIT);

  if (collections.length === 0) {
    return <p className="text-sm text-muted-foreground">No collections yet.</p>;
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {collections.map((collection) => (
        <CollectionCard key={collection.id} collection={collection} />
      ))}
    </div>
  );
}

interface SkeletonGridProps {
  count: number;
  className: string;
  cardClassName: string;
}

function SkeletonGrid({ count, className, cardClassName }: SkeletonGridProps) {
  return (
    <div className={`grid gap-4 ${className}`}>
      {Array.from({ length: count }, (_, i) => (
        <div key={i} className={`animate-pulse rounded-xl border border-border bg-card ${cardClassName}`} />
      ))}
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
