import { NextResponse } from "next/server";

import { createClient } from "@/lib/supabase/server";

/**
 * Every confirmation/reset email points here. Supabase appends a `code`
 * we exchange for a real session, then we send the user on to wherever
 * they were headed (?next=...), defaulting to the dashboard.
 */
export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/dashboard";

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      return NextResponse.redirect(`${origin}${next}`);
    }
  }

  return NextResponse.redirect(
    `${origin}/login?error=We couldn't verify that link. Please try again.`
  );
}
