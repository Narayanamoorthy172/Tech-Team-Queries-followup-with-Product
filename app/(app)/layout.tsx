import { redirect } from "next/navigation";

import { AppShell } from "@/components/layout/app-shell";
import { createClient } from "@/lib/supabase/server";

/**
 * Layout for every authenticated page (dashboard, requests, follow-ups,
 * reports, settings). proxy.ts already redirects signed-out visitors
 * before this ever renders — this check is a second, independent line
 * of defense in case a page is ever reached another way.
 */
export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return <AppShell userEmail={user.email}>{children}</AppShell>;
}
