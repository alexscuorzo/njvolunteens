// Civic and political volunteering. Every entry here is tagged
// hour_eligible: false, which surfaces the amber "Civic engagement — not
// hour-eligible" badge and the explainer on the listing page.
//
// Both major state parties are listed with equal detail. This directory
// serves students across the political spectrum and should not read as
// favoring one side.
//
// Usage: npm run seed:civic

import { createClient } from "@supabase/supabase-js";
import { randomBytes } from "node:crypto";
import { readFileSync } from "node:fs";

function loadEnv() {
  const raw = readFileSync(new URL("../.env.local", import.meta.url), "utf8");
  const env = {};
  for (const line of raw.split("\n")) {
    const t = line.trim();
    if (!t || t.startsWith("#")) continue;
    const eq = t.indexOf("=");
    if (eq === -1) continue;
    env[t.slice(0, eq)] = t.slice(eq + 1);
  }
  return env;
}

const LISTINGS = [
  {
    // source: https://www.mobilize.us/njdsc/ + njdems.org
    slug: "nj-democratic-state-committee",
    org_name: "New Jersey Democratic State Committee",
    description:
      "The state party organization. Volunteer events — canvassing, phone banks, literature drops, and event support — are posted on their Mobilize page, which lets you filter by location and date.\n\nOpportunities run statewide through county Democratic organizations, so there is usually something near you even though the office is in Trenton. Check the Mobilize listings for what is currently scheduled.\n\nThe committee does not publish a minimum volunteer age. Most campaign work accepts high school students, but confirm before signing up for a shift.",
    address: "194-196 West State Street",
    city: "Trenton",
    county: "Mercer",
    cause_areas: ["Civic & Government"],
    minimum_age: 14,
    hour_eligible: false,
    currently_accepting: true,
    urgent_need: false,
    contact_name: "",
    contact_email: "",
    contact_phone: "",
    signup_url: "https://www.mobilize.us/njdsc/",
  },
  {
    // source: https://www.njgop.org/contact/ + /volunteer/
    slug: "new-jersey-republican-party",
    org_name: "New Jersey Republican Party",
    description:
      "The state party organization. Volunteers help with canvassing, phone banks, event staffing, and voter turnout efforts, with a volunteer sign-up form on the party's website.\n\nOpportunities run statewide through county Republican organizations, so there is usually something near you regardless of where you live in New Jersey.\n\nThe party does not publish a minimum volunteer age. Most campaign work accepts high school students, but call or use the sign-up form to confirm before committing to a shift.",
    address: "",
    city: "Trenton",
    county: "Mercer",
    cause_areas: ["Civic & Government"],
    minimum_age: 14,
    hour_eligible: false,
    currently_accepting: true,
    urgent_need: false,
    contact_name: "",
    contact_email: "",
    contact_phone: "609-228-2925",
    signup_url: "https://www.njgop.org/volunteer/",
  },
  {
    // source: https://www.lwvnj.org/
    slug: "league-of-women-voters-new-jersey",
    org_name: "League of Women Voters of New Jersey",
    description:
      "A nonpartisan organization focused on voter registration, voter education, and expanding participation in elections. They run an Activist Training Program and youth-focused work under the banner of energizing young voters, plus a statewide voter hotline.\n\nWorth understanding the hour-eligibility here: because the League is explicitly nonpartisan and does voter services rather than campaigning for candidates, a number of NJ districts do count this kind of work toward service hours — unlike partisan campaign work. We tag it conservatively as civic engagement, but it is genuinely worth asking your counselor before you rule it out.\n\nLocal Leagues operate in many counties, so ask about the chapter nearest you.",
    address: "",
    city: "Trenton",
    county: "Mercer",
    cause_areas: ["Civic & Government"],
    minimum_age: 14,
    hour_eligible: false,
    currently_accepting: true,
    urgent_need: false,
    contact_name: "",
    contact_email: "",
    contact_phone: "609-394-3303",
    signup_url: "https://www.lwvnj.org/",
  },
  {
    // source: https://www.njcitizenaction.org/contact
    slug: "new-jersey-citizen-action",
    org_name: "New Jersey Citizen Action",
    description:
      "A statewide grassroots organization working on social, racial, and economic justice. Their work combines on-the-ground organizing, legislative advocacy, and electoral campaigns, so volunteering here means canvassing, phone banking, and community outreach.\n\nBecause the work includes advocacy and electoral campaigning, most NJ districts will not count these hours toward a community service requirement. It is strong experience for understanding how policy and organizing actually work — just go in knowing the hours may not count.\n\nCall the Newark office to ask what volunteer roles are open and whether they take students your age.",
    address: "625 Broad Street, Suite 270",
    city: "Newark",
    county: "Essex",
    cause_areas: ["Civic & Government"],
    minimum_age: 14,
    hour_eligible: false,
    currently_accepting: true,
    urgent_need: false,
    contact_name: "",
    contact_email: "",
    contact_phone: "973-643-8800",
    signup_url: "https://www.njcitizenaction.org/contact",
  },
];

const env = loadEnv();
const supabase = createClient(env.SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY, {
  auth: { persistSession: false },
});

const rows = LISTINGS.map((l) => ({
  ...l,
  edit_token: randomBytes(24).toString("base64url"),
  status: "approved",
  last_verified_at: new Date().toISOString(),
}));

const { data, error } = await supabase
  .from("listings")
  .upsert(rows, { onConflict: "slug" })
  .select("org_name,county,hour_eligible");

if (error) {
  console.error("Import failed:", error.message);
  process.exit(1);
}
console.log(`Imported ${data.length} civic listings (all hour_eligible: false):`);
data.forEach((r) => console.log(`  ${r.county.padEnd(8)} ${r.org_name}`));
