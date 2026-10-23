import { Code, File, Image, Link, Sparkles, StickyNote, Terminal, type LucideIcon } from "lucide-react";

// Maps the Lucide icon name stored on an ItemType to its component.
export const ITEM_TYPE_ICONS: Record<string, LucideIcon> = {
  Code,
  Sparkles,
  StickyNote,
  Terminal,
  Link,
  File,
  Image,
};

export function getItemTypeIcon(name: string): LucideIcon {
  return ITEM_TYPE_ICONS[name] ?? File;
}
