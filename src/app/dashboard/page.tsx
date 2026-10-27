import { Suspense, type ReactNode } from "react";
import Link from "next/link";
import { Clock, Pin } from "lucide-react";

import { CollectionCard } from "@/components/dashboard/CollectionCard";
import { ItemCard } from "@/components/dashboard/ItemCard";
import { StatsCards } from "@/components/dashboard/StatsCards";
import { getCollectionStats, getRecentCollections } from "@/lib/db/collections";
import { getItemStats, getPinnedItems, getRecentItems } from "@/lib/db/items";
import { getCurrentUserId } from "@/lib/db/users";

const RECENT_COLLECTIONS_LIMIT = 6;
const RECENT_ITEMS_LIMIT = 10;

export default function DashboardPage() {
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

      <Suspense fallback={null}>
        <PinnedItems />
      </Suspense>

      <Suspense fallback={<SkeletonList count={RECENT_ITEMS_LIMIT} />}>
        <RecentItems />
      </Suspense>
    </div>
  );
}

async function DashboardStats() {
  const userId = await getCurrentUserId();
  const [itemStats, collectionStats] = await Promise.all([getItemStats(userId), getCollectionStats(userId)]);

  return <StatsCards stats={{ ...itemStats, ...collectionStats }} />;
}

async function PinnedItems() {
  const userId = await getCurrentUserId();
  const items = await getPinnedItems(userId);

  if (items.length === 0) return null;

  return (
    <ItemSection title="Pinned" icon={<Pin className="size-4" />}>
      {items.map((item) => (
        <ItemCard key={item.id} item={item} />
      ))}
    </ItemSection>
  );
}

async function RecentItems() {
  const userId = await getCurrentUserId();
  const items = await getRecentItems(userId, RECENT_ITEMS_LIMIT);

  return (
    <ItemSection title="Recent" icon={<Clock className="size-4" />}>
      {items.length === 0 ? (
        <p className="text-sm text-muted-foreground">No items yet.</p>
      ) : (
        items.map((item) => <ItemCard key={item.id} item={item} />)
      )}
    </ItemSection>
  );
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

function SkeletonList({ count }: { count: number }) {
  return (
    <div className="flex flex-col gap-3">
      {Array.from({ length: count }, (_, i) => (
        <div key={i} className="h-22 animate-pulse rounded-xl border border-border bg-card" />
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
