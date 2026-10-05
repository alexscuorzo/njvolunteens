import type { MetadataRoute } from "next";
import { NJ_COUNTIES, CAUSE_AREAS, CANONICAL_SITE_URL } from "@/lib/constants";
import { getSupabase } from "@/lib/supabase";
import { isDbConfigured } from "@/lib/listings";

// Refresh hourly so newly approved listings get into the sitemap without a
// redeploy.
export const revalidate = 3600;

const SITE = CANONICAL_SITE_URL;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: SITE, lastModified: now, changeFrequency: "daily", priority: 1 },
    { url: `${SITE}/browse`, lastModified: now, changeFrequency: "daily", priority: 0.9 },
    { url: `${SITE}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE}/resources`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    {
      url: `${SITE}/list-your-organization`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];

  // Filtered browse pages. These are the long-tail search targets — someone
  // googling "volunteer opportunities in Monmouth County NJ" should land here.
  const countyPages: MetadataRoute.Sitemap = NJ_COUNTIES.map((county) => ({
    url: `${SITE}/browse?county=${encodeURIComponent(county)}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const causePages: MetadataRoute.Sitemap = CAUSE_AREAS.map((cause) => ({
    url: `${SITE}/browse?cause=${encodeURIComponent(cause)}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  // Individual listings. Only approved ones — pending and archived listings
  // are not public, and /edit/[token] pages must never be indexed.
  let listingPages: MetadataRoute.Sitemap = [];
  if (isDbConfigured()) {
    try {
      const { data, error } = await getSupabase()
        .from("listings")
        .select("slug,updated_at,last_verified_at")
        .eq("status", "approved");
      if (!error && data) {
        listingPages = data.map((l) => ({
          url: `${SITE}/listing/${l.slug}`,
          lastModified: new Date(l.updated_at ?? l.last_verified_at ?? now),
          changeFrequency: "weekly" as const,
          priority: 0.6,
        }));
      }
    } catch (err) {
      // A sitemap missing its listings is better than a failed build.
      console.error("Sitemap: could not load listings:", err);
    }
  }

  return [...staticPages, ...countyPages, ...causePages, ...listingPages];
}
