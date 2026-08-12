"use server";

import { revalidatePath } from "next/cache";

import { createClient } from "@/lib/supabase/server";

export type SettingsActionState = { error?: string; success?: boolean } | null;

export async function updateProfile(
  _prevState: SettingsActionState,
  formData: FormData
): Promise<SettingsActionState> {
  const fullName = String(formData.get("fullName") ?? "").trim();

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: "Your session expired. Please log in again." };

  const { error } = await supabase
    .from("profiles")
    .update({ full_name: fullName || null })
    .eq("id", user.id);

  if (error) {
    return { error: "We couldn't save your profile. Please try again." };
  }

  revalidatePath("/settings");
  return { success: true };
}

export async function updatePreferences(
  _prevState: SettingsActionState,
  formData: FormData
): Promise<SettingsActionState> {
  const defaultFollowupDays = Number(formData.get("defaultFollowupDays"));
  const timezone = String(formData.get("timezone") ?? "Asia/Kolkata");
  const dateFormat = String(formData.get("dateFormat") ?? "DD/MM/YYYY");

  if (!Number.isFinite(defaultFollowupDays) || defaultFollowupDays < 1) {
    return { error: "Default follow-up period must be a positive number of days." };
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: "Your session expired. Please log in again." };

  const { error } = await supabase
    .from("profiles")
    .update({
      default_followup_days: defaultFollowupDays,
      timezone,
      date_format: dateFormat,
    })
    .eq("id", user.id);

  if (error) {
    return { error: "We couldn't save your preferences. Please try again." };
  }

  revalidatePath("/settings");
  return { success: true };
}
