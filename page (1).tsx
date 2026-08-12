import { redirect } from "next/navigation";

/**
 * Phase 2 will check for a logged-in Supabase session here and send
 * signed-out visitors to /login instead. For now (no auth yet) this
 * just opens the dashboard preview.
 */
export default function RootPage() {
  redirect("/dashboard");
}
