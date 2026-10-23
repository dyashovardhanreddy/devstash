"use client";

import { useState, type ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Folder, Layers, Settings, Star } from "lucide-react";
import { cn } from "cn";

import { ItemTypeIcon } from "@/components/dashboard/ItemTypeIcon";
import { Button } from "@/components/ui/button";
import { sortByRecentActivity } from "@/lib/dashboard";
import { collections, currentUser, itemTypes, type Collection } from "@/lib/mock-data";

interface SidebarProps {
  collapsed?: boolean;
  onNavigate?: () => void;
}

const favoriteCollections = collections.filter((collection) => collection.isFavorite);
const recentCollections = sortByRecentActivity(collections.filter((collection) => !collection.isFavorite));

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export function Sidebar({ collapsed = false, onNavigate }: SidebarProps) {
  const pathname = usePathname();

  return (
    <div className="flex h-full flex-col bg-sidebar text-sidebar-foreground">
      <div className={cn("flex h-14 shrink-0 items-center gap-2 px-4", collapsed && "justify-center px-0")}>
        <div className="flex size-8 items-center justify-center rounded-lg bg-linear-to-br from-violet-500 to-blue-500 text-white">
          <Layers className="size-4" />
        </div>
        {!collapsed && <span className="text-lg font-semibold">DevStash</span>}
      </div>

      <nav className="flex-1 overflow-y-auto px-2 py-3">
        <SidebarSection title="Types" collapsed={collapsed}>
          {itemTypes.map((type) => {
            const href = `/items/${type.slug}`;
            return (
              <SidebarLink
                key={type.id}
                href={href}
                label={type.slug}
                active={pathname === href}
                collapsed={collapsed}
                onNavigate={onNavigate}
                icon={<ItemTypeIcon icon={type.icon} className="size-4" style={{ color: type.color }} />}
                trailing={<span className="text-xs text-muted-foreground">{type.itemCount}</span>}
              />
            );
          })}
        </SidebarSection>

        {!collapsed && (
          <>
            <div className="my-3 border-t border-sidebar-border" />
            <SidebarSection title="Collections">
              <SidebarGroupLabel>Favorites</SidebarGroupLabel>
              {favoriteCollections.map((collection) => (
                <CollectionLink
                  key={collection.id}
                  collection={collection}
                  active={pathname === `/collections/${collection.id}`}
                  onNavigate={onNavigate}
                  trailing={<Star className="size-3.5 fill-yellow-400 text-yellow-400" />}
                />
              ))}
              <SidebarGroupLabel>Recent</SidebarGroupLabel>
              {recentCollections.map((collection) => (
                <CollectionLink
                  key={collection.id}
                  collection={collection}
                  active={pathname === `/collections/${collection.id}`}
                  onNavigate={onNavigate}
                  trailing={<span className="text-xs text-muted-foreground">{collection.itemCount}</span>}
                />
              ))}
            </SidebarSection>
          </>
        )}
      </nav>

      <div
        className={cn(
          "flex shrink-0 items-center gap-3 border-t border-sidebar-border p-3",
          collapsed && "justify-center",
        )}
      >
        <div
          className="flex size-8 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-medium"
          title={collapsed ? currentUser.name : undefined}
        >
          {getInitials(currentUser.name)}
        </div>
        {!collapsed && (
          <>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium">{currentUser.name}</p>
              <p className="truncate text-xs text-muted-foreground">{currentUser.email}</p>
            </div>
            <Button variant="ghost" size="icon-sm" aria-label="Settings">
              <Settings />
            </Button>
          </>
        )}
      </div>
    </div>
  );
}

interface SidebarSectionProps {
  title: string;
  collapsed?: boolean;
  children: ReactNode;
}

function SidebarSection({ title, collapsed = false, children }: SidebarSectionProps) {
  const [open, setOpen] = useState(true);

  if (collapsed) {
    return <div className="flex flex-col gap-0.5">{children}</div>;
  }

  return (
    <div>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        className="flex items-center gap-1 px-2 py-1.5 text-xs font-medium text-muted-foreground hover:text-foreground"
      >
        {title}
        <ChevronDown className={cn("size-3.5 transition-transform", !open && "-rotate-90")} />
      </button>
      {open && <div className="mt-1 flex flex-col gap-0.5">{children}</div>}
    </div>
  );
}

function SidebarGroupLabel({ children }: { children: ReactNode }) {
  return (
    <p className="px-2 pt-2 pb-1 text-[0.65rem] font-medium tracking-wider text-muted-foreground uppercase">
      {children}
    </p>
  );
}

interface SidebarLinkProps {
  href: string;
  label: string;
  icon: ReactNode;
  trailing?: ReactNode;
  active: boolean;
  collapsed?: boolean;
  onNavigate?: () => void;
}

function SidebarLink({ href, label, icon, trailing, active, collapsed = false, onNavigate }: SidebarLinkProps) {
  return (
    <Link
      href={href}
      onClick={onNavigate}
      title={collapsed ? label : undefined}
      aria-label={collapsed ? label : undefined}
      className={cn(
        "flex items-center gap-3 rounded-md px-2 py-1.5 text-sm transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
        active && "bg-sidebar-accent text-sidebar-accent-foreground",
        collapsed && "justify-center",
      )}
    >
      {icon}
      {!collapsed && (
        <>
          <span className="flex-1 truncate capitalize">{label}</span>
          {trailing}
        </>
      )}
    </Link>
  );
}

interface CollectionLinkProps {
  collection: Collection;
  trailing: ReactNode;
  active: boolean;
  onNavigate?: () => void;
}

function CollectionLink({ collection, trailing, active, onNavigate }: CollectionLinkProps) {
  return (
    <SidebarLink
      href={`/collections/${collection.id}`}
      label={collection.name}
      icon={<Folder className="size-4 text-muted-foreground" />}
      trailing={trailing}
      active={active}
      onNavigate={onNavigate}
    />
  );
}
