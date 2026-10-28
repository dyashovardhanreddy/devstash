import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { getSidebarData } from "@/lib/db/sidebar";

export default function DashboardLayout({ children }: LayoutProps<"/dashboard">) {
  // Not awaited: the client sidebar reads it with `use()` and streams in behind its own Suspense boundary.
  return <DashboardShell sidebarData={getSidebarData()}>{children}</DashboardShell>;
}
