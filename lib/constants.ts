export const NJ_COUNTIES = [
  "Atlantic",
  "Bergen",
  "Burlington",
  "Camden",
  "Cape May",
  "Cumberland",
  "Essex",
  "Gloucester",
  "Hudson",
  "Hunterdon",
  "Mercer",
  "Middlesex",
  "Monmouth",
  "Morris",
  "Ocean",
  "Passaic",
  "Salem",
  "Somerset",
  "Sussex",
  "Union",
  "Warren",
] as const;

export const CAUSE_AREAS = [
  "Animals",
  "Arts & Culture",
  "Civic & Government",
  "Community Events",
  "Environment",
  "Food & Hunger",
  "Housing & Homelessness",
  "Hospitals & Health",
  "Libraries",
  "Seniors",
  "Sports & Recreation",
  "Tutoring & Education",
] as const;

export type County = (typeof NJ_COUNTIES)[number];
export type CauseArea = (typeof CAUSE_AREAS)[number];

/**
 * The canonical public address of the site. Used for the sitemap, robots.txt,
 * and metadataBase — these must always point at the real domain regardless of
 * what NEXT_PUBLIC_SITE_URL happens to be set to in a given environment, or
 * Google ends up indexing the netlify.app address instead.
 *
 * NEXT_PUBLIC_SITE_URL is separate: it builds the organization edit links, and
 * needs to be localhost during development.
 */
export const CANONICAL_SITE_URL = "https://njvolunteens.org";
