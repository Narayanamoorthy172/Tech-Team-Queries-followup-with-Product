"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Bell, Search, User } from "lucide-react";
import { toast } from "sonner";

import { MobileNav } from "@/components/layout/mobile-nav";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { createClient } from "@/lib/supabase/client";

/**
 * Top bar shown on every authenticated page.
 * Search is wired up to /requests?q= in a later phase (Search/Filter).
 * Notifications become fully functional once follow-up tracking
 * (Phase 5) exists.
 */
export function Topbar({ userEmail }: { userEmail?: string }) {
  const router = useRouter();
  const [loggingOut, setLoggingOut] = useState(false);

  async function handleLogout() {
    setLoggingOut(true);
    const supabase = createClient();
    const { error } = await supabase.auth.signOut();
    setLoggingOut(false);
    if (error) {
      toast.error("Couldn't log out. Please try again.");
      return;
    }
    router.push("/login");
    router.refresh();
  }

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-3 border-b border-border bg-background/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <MobileNav />

      <form
        action="/requests"
        className="relative hidden flex-1 max-w-sm items-center sm:flex"
      >
        <Search className="pointer-events-none absolute left-2.5 size-4 text-muted-foreground" />
        <Input
          name="q"
          placeholder="Search requests, emails, tags…"
          className="pl-8"
        />
      </form>

      <div className="ml-auto flex items-center gap-1">
        <Button variant="ghost" size="icon" className="relative" asChild>
          <Link href="/follow-ups" aria-label="Notifications">
            <Bell className="size-5" />
          </Link>
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="gap-2 px-2">
              <Avatar className="size-7">
                <AvatarFallback>
                  <User className="size-4" />
                </AvatarFallback>
              </Avatar>
              <span className="hidden max-w-[10rem] truncate text-sm sm:inline">
                {userEmail ?? "Account"}
              </span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel className="truncate">
              {userEmail ?? "Signed in"}
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/settings">Settings</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              variant="destructive"
              disabled={loggingOut}
              onSelect={(e) => {
                e.preventDefault();
                handleLogout();
              }}
            >
              {loggingOut ? "Logging out…" : "Log out"}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
