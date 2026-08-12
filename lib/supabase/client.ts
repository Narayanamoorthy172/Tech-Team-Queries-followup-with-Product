import { createBrowserClient } from "@supabase/ssr";

/**
 * Supabase client for use in the browser (Client Components).
 * Reads the two PUBLIC environment variables — these are safe to expose
 * to the browser because Row Level Security (see the SQL migration)
 * is what actually protects your data, not secrecy of these values.
 */
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
