import { getSupabase } from "./supabase";
import type { Listing } from "./types";

export function isDbConfigured(): boolean {
  return Boolean(process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY);
}

export interface ListingFilters {
  county?: string;
  cause?: string;
  age?: number;
  hourEligible?: boolean;
  acceptingOnly?: boolean;
}

export async function getApprovedListings(filters: ListingFilters): Promise<Listing[]> {
  let query = getSupabase()
    .from("listings")
    .select("*")
    .eq("status", "approved")
    .order("urgent_need", { ascending: false })
    .order("last_verified_at", { ascending: false });

  if (filters.county) query = query.eq("county", filters.county);
  if (filters.cause) query = query.contains("cause_areas", [filters.cause]);
  if (filters.age !== undefined) query = query.lte("minimum_age", filters.age);
  if (filters.hourEligible) query = query.eq("hour_eligible", true);
  if (filters.acceptingOnly) query = query.eq("currently_accepting", true);

  const { data, error } = await query;
  if (error) throw new Error(`Failed to load listings: ${error.message}`);
  return data as Listing[];
}

export async function getListingBySlug(slug: string): Promise<Listing | null> {
  const { data, error } = await getSupabase()
    .from("listings")
    .select("*")
    .eq("slug", slug)
    .eq("status", "approved")
    .maybeSingle();
  if (error) throw new Error(`Failed to load listing: ${error.message}`);
  return data as Listing | null;
}

export async function getListingByToken(token: string): Promise<Listing | null> {
  const { data, error } = await getSupabase()
    .from("listings")
    .select("*")
    .eq("edit_token", token)
    .maybeSingle();
  if (error) throw new Error(`Failed to load listing: ${error.message}`);
  return data as Listing | null;
}

export function formatVerifiedDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}
