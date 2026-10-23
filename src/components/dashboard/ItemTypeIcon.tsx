import { createElement } from "react";
import type { LucideProps } from "lucide-react";

import { getItemTypeIcon } from "@/lib/item-type-icons";

interface ItemTypeIconProps extends LucideProps {
  icon: string;
}

// Renders the Lucide icon named on an ItemType (e.g. "Code").
export function ItemTypeIcon({ icon, ...props }: ItemTypeIconProps) {
  return createElement(getItemTypeIcon(icon), props);
}
