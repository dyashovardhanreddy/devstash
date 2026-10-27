import { Pin, Star } from "lucide-react";

import { ItemTypeIcon } from "@/components/dashboard/ItemTypeIcon";
import { Badge } from "@/components/ui/badge";
import type { DashboardItem } from "@/types/item";

const DATE_FORMAT = new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", timeZone: "UTC" });

export function ItemCard({ item }: { item: DashboardItem }) {
  const { type } = item;

  return (
    <div
      className="flex gap-4 rounded-xl border border-l-4 border-border bg-card p-4 transition-colors hover:bg-muted/50"
      style={{ borderLeftColor: type.color }}
    >
      <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-muted">
        <ItemTypeIcon icon={type.icon} className="size-5" style={{ color: type.color }} />
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <h3 className="truncate font-medium">{item.title}</h3>
          {item.isPinned && <Pin className="size-3.5 shrink-0 text-muted-foreground" />}
          {item.isFavorite && <Star className="size-3.5 shrink-0 fill-yellow-400 text-yellow-400" />}
          <time dateTime={item.createdAt.toISOString()} className="ml-auto shrink-0 text-xs text-muted-foreground">
            {DATE_FORMAT.format(item.createdAt)}
          </time>
        </div>
        {item.description && <p className="truncate text-sm text-muted-foreground">{item.description}</p>}
        {item.tags.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1.5">
            {item.tags.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
