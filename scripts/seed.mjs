// Seeds sample listings and verifies the database connection.
// Usage: npm run seed
//
// Safe to re-run: rows are matched on `slug`, so existing sample rows are
// updated rather than duplicated.

import { createClient } from "@supabase/supabase-js";
import { randomBytes } from "node:crypto";
import { readFileSync } from "node:fs";

function loadEnv() {
  let raw;
  try {
    raw = readFileSync(new URL("../.env.local", import.meta.url), "utf8");
  } catch {
    console.error("Missing .env.local — copy .env.local.example and fill it in.");
    process.exit(1);
  }
  const env = {};
  for (const line of raw.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    env[trimmed.slice(0, eq)] = trimmed.slice(eq + 1);
  }
  return env;
}

const SAMPLES = [
  {
    slug: "sample-monmouth-county-animal-shelter",
    org_name: "[Sample] Monmouth County Animal Shelter",
    description:
      "Help socialize cats and dogs, clean kennels, and assist at weekend adoption events. Training provided on your first visit. Flexible weekend shifts.",
    city: "Eatontown",
    county: "Monmouth",
    cause_areas: ["Animals"],
    minimum_age: 16,
    hour_eligible: true,
    currently_accepting: true,
    urgent_need: false,
    contact_name: "Shelter Volunteer Coordinator",
    contact_email: "volunteer@example.org",
    signup_url: "https://example.org/volunteer",
  },
  {
    slug: "sample-jersey-shore-beach-cleanup-crew",
    org_name: "[Sample] Jersey Shore Beach Cleanup Crew",
    description:
      "Monthly beach sweeps in Asbury Park and Belmar. We log every piece of litter for statewide ocean advocacy data. Show up, grab a bucket, make a difference.",
    city: "Asbury Park",
    county: "Monmouth",
    cause_areas: ["Environment", "Community Events"],
    minimum_age: 13,
    hour_eligible: true,
    currently_accepting: true,
    urgent_need: true,
    contact_name: "Cleanup Lead",
    contact_email: "cleanup@example.org",
    signup_url: "https://example.org/signup",
  },
  {
    slug: "sample-newark-public-library-homework-helpers",
    org_name: "[Sample] Newark Public Library Homework Helpers",
    description:
      "Tutor elementary school students in reading and math after school, Tuesdays and Thursdays 3:30-5:30. Great fit if you are patient and like working with kids.",
    city: "Newark",
    county: "Essex",
    cause_areas: ["Tutoring & Education", "Libraries"],
    minimum_age: 15,
    hour_eligible: true,
    currently_accepting: true,
    urgent_need: false,
    contact_email: "tutoring@example.org",
  },
  {
    slug: "sample-bergen-senior-center-friendly-visitors",
    org_name: "[Sample] Bergen Senior Center Friendly Visitors",
    description:
      "Spend an hour a week playing board games, reading aloud, or just chatting with seniors. Consistent weekly commitment matters more than total hours here.",
    city: "Hackensack",
    county: "Bergen",
    cause_areas: ["Seniors"],
    minimum_age: 14,
    hour_eligible: true,
    currently_accepting: false,
    urgent_need: false,
    contact_email: "visitors@example.org",
  },
  {
    slug: "sample-camden-food-bank-weekend-sort",
    org_name: "[Sample] Camden Food Bank Weekend Sort",
    description:
      "Sort and pack donated food every Saturday morning. High-energy warehouse environment, closed-toe shoes required. Groups from school clubs welcome.",
    city: "Camden",
    county: "Camden",
    cause_areas: ["Food & Hunger"],
    minimum_age: 14,
    hour_eligible: true,
    currently_accepting: true,
    urgent_need: true,
    contact_email: "sort@example.org",
    signup_url: "https://example.org/saturday",
  },
  {
    slug: "sample-nj-youth-voter-registration-project",
    org_name: "[Sample] NJ Youth Voter Registration Project",
    description:
      "Join phone banks and canvasses encouraging young New Jerseyans to register to vote ahead of the fall election. Learn real campaign organizing skills.",
    city: "New Brunswick",
    county: "Middlesex",
    cause_areas: ["Civic & Government"],
    minimum_age: 16,
    hour_eligible: false,
    currently_accepting: true,
    urgent_need: false,
    contact_email: "organize@example.org",
    signup_url: "https://example.org/join",
  },
  {
    slug: "sample-morristown-hospital-junior-volunteers",
    org_name: "[Sample] Morristown Hospital Junior Volunteers",
    description:
      "Escort visitors, deliver flowers and mail to patient rooms, and help at information desks. Requires a short orientation and health screening. Summer program fills fast.",
    city: "Morristown",
    county: "Morris",
    cause_areas: ["Hospitals & Health"],
    minimum_age: 15,
    hour_eligible: true,
    currently_accepting: true,
    urgent_need: false,
    contact_email: "juniors@example.org",
  },
];

const env = loadEnv();
if (!env.SUPABASE_URL || !env.SUPABASE_SERVICE_ROLE_KEY) {
  console.error("SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY missing from .env.local");
  process.exit(1);
}

const supabase = createClient(env.SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY, {
  auth: { persistSession: false },
});

const probe = await supabase.from("listings").select("id", { count: "exact", head: true });
if (probe.error) {
  console.error(`\nCould not reach the listings table.\n  ${probe.error.message}\n`);
  console.error("Check that the project is running at " + env.SUPABASE_URL);
  console.error("and that supabase/schema.sql has been run in the SQL Editor.\n");
  process.exit(1);
}
console.log(`Connected. listings table currently holds ${probe.count} row(s).`);

const rows = SAMPLES.map((s) => ({
  ...s,
  edit_token: randomBytes(24).toString("base64url"),
  status: "approved",
  last_verified_at: new Date().toISOString(),
}));

const { error } = await supabase.from("listings").upsert(rows, { onConflict: "slug" });
if (error) {
  console.error("Seed failed:", error.message);
  process.exit(1);
}

console.log(`Seeded ${rows.length} sample listings.`);
console.log("\nEdit links for the sample rows (for testing the edit flow):");
for (const row of rows) {
  const site = env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  console.log(`  ${row.org_name}\n    ${site}/edit/${row.edit_token}`);
}
