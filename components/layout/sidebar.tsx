import Link from "next/link";
import { ClipboardList } from "lucide-react";

import { SidebarNav } from "@/components/layout/sidebar-nav";

export function Sidebar() {
  return (
    <aside className="hidden w-64 shrink-0 border-r border-sidebar-border bg-sidebar text-sidebar-foreground md:flex md:flex-col">
      <div className="flex h-14 items-center gap-2 border-b border-sidebar-border px-4">
        <Link href="/dashboard" className="flex items-center gap-2 font-semibold">
          <ClipboardList className="size-5 text-sidebar-primary" />
          <span className="text-sm leading-tight">
            Product Follow-up
            <br />
            Tracker
          </span>
        </Link>
      </div>
      <SidebarNav />
      <div className="border-t border-sidebar-border p-3 text-xs text-muted-foreground">
        MVP v1 · Manual email tracking
      </div>
    </aside>
  );
}
