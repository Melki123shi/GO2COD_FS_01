import { createBrowserClient } from "@supabase/ssr";

const SUPABASE_URL = import.meta.env.VITE_SUPABAE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_KEY;

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  throw new Error(
    "Missing Supabase environment variables. Ensure NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY are set."
  );
}

export const supabaseClient = createBrowserClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export const getSupabaseClient = () => supabaseClient;
