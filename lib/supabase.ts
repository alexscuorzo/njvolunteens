import { createClient } from "@supabase/supabase-js";

// Server-only client. The service role key bypasses row-level security,
// so this module must never be imported from a client component.
export function getSupabase() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    throw new Error(
      "Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY. Copy .env.local.example to .env.local and fill in your Supabase project values."
    );
  }
  return createClient(url, key, { auth: { persistSession: false } });
}
