import type { MetadataRoute } from "next";
import { CANONICAL_SITE_URL } from "@/lib/constants";

const SITE = CANONICAL_SITE_URL;

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Organization edit links are private. They are unguessable, but they
      // must never be crawled or indexed if one leaks into a referrer header.
      disallow: ["/edit/", "/api/"],
    },
    sitemap: `${SITE}/sitemap.xml`,
  };
}
