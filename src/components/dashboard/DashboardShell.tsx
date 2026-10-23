"use client";

import { useState, type ReactNode } from "react";
import { cn } from "cn";

import { Sidebar } from "@/components/dashboard/Sidebar";
import { TopBar } from "@/components/dashboard/TopBar";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";

// Matches Tailwind's `md` breakpoint, where the sidebar stops being a drawer.
const DESKTOP_QUERY = "(min-width: 48rem)";

export function DashboardShell({ children }: { children: ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  function toggleSidebar() {
    if (window.matchMedia(DESKTOP_QUERY).matches) {
      setCollapsed(!collapsed);
    } else {
      setMobileOpen(!mobileOpen);
    }
  }

  return (
    <div className="flex h-screen">
      <aside
        className={cn(
          "hidden shrink-0 border-r border-sidebar-border transition-[width] duration-200 md:block",
          collapsed ? "w-16" : "w-64",
        )}
      >
        <Sidebar collapsed={collapsed} />
      </aside>

      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetContent side="left" className="w-72 gap-0 p-0 md:hidden" showCloseButton={false}>
          <SheetTitle className="sr-only">Navigation</SheetTitle>
          <Sidebar onNavigate={() => setMobileOpen(false)} />
        </SheetContent>
      </Sheet>

      <div className="flex min-w-0 flex-1 flex-col">
        <TopBar onToggleSidebar={toggleSidebar} />
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
}
