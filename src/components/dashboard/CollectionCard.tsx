import Link from "next/link";
import { Star } from "lucide-react";

import { ItemTypeIcon } from "@/components/dashboard/ItemTypeIcon";
import { getCollectionTypes } from "@/lib/dashboard";
import type { Collection } from "@/lib/mock-data";

export function CollectionCard({ collection }: { collection: Collection }) {
  const types = getCollectionTypes(collection);

  return (
    <Link
      href={`/collections/${collection.id}`}
      className="block rounded-xl border border-l-4 border-border bg-card p-5 transition-colors hover:bg-muted/50"
      style={{ borderLeftColor: types[0]?.color }}
    >
      <div className="flex items-center gap-2">
        <h3 className="truncate font-medium">{collection.name}</h3>
        {collection.isFavorite && <Star className="size-4 shrink-0 fill-yellow-400 text-yellow-400" />}
      </div>
      <p className="text-sm text-muted-foreground">{collection.itemCount} items</p>
      <p className="mt-3 line-clamp-2 text-sm text-muted-foreground">{collection.description}</p>
      <div className="mt-3 flex gap-2">
        {types.map((type) => (
          <ItemTypeIcon key={type.id} icon={type.icon} className="size-4" style={{ color: type.color }} />
        ))}
      </div>
    </Link>
  );
}
