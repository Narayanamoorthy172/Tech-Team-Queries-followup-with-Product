import { redirect } from "next/navigation";

import { SettingsForm } from "@/components/settings/settings-form";
import { createClient } from "@/lib/supabase/server";

export default async function SettingsPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name, default_followup_days, timezone, date_format")
    .eq("id", user.id)
    .single();

  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-4">
      <div>
        <h1 className="text-xl font-semibold tracking-tight">Settings</h1>
        <p className="text-sm text-muted-foreground">
          Manage your profile, password, and follow-up preferences.
        </p>
      </div>

      <SettingsForm
        email={user.email ?? ""}
        profile={
          profile ?? {
            full_name: null,
            default_followup_days: 3,
            timezone: "Asia/Kolkata",
            date_format: "DD/MM/YYYY",
          }
        }
      />
    </div>
  );
}
