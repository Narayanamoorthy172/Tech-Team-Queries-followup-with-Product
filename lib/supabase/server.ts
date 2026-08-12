import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";

/**
 * Supabase client for use on the server: Server Components, Server
 * Actions, and Route Handlers. It reads/writes the session via cookies,
 * so the user stays logged in across page loads without any client-side
 * token storage.
 *
 * Note: Server Components can only *read* cookies, not write them — if
 * this client tries to refresh a session from inside a plain page/layout,
 * the `setAll` call below is wrapped in a try/catch for exactly that
 * reason. The proxy (proxy.ts) is what actually keeps sessions fresh.
 */
export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // Called from a Server Component — safe to ignore because
            // proxy.ts refreshes the session on every request anyway.
          }
        },
      },
    }
  );
}
