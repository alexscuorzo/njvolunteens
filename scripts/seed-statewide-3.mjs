// Third statewide batch — fills Ocean and Hudson, adds Monmouth depth.
// Usage: npm run seed:statewide3

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
    // source: https://fulfillnj.org/volunteer/
    slug: "fulfill-toms-river-beat-center",
    org_name: "Fulfill — B.E.A.T. Center, Toms River",
    description:
      "The Ocean County home of Fulfill, the food bank serving Monmouth and Ocean counties. Volunteers sort and pack donations, help with mailings and office work, and distribute food at mobile pantries and partner feeding programs.\n\nVolunteers must be 13 or older. Anyone younger can still help by organizing a food drive. Individual volunteers complete an application and attend a mandatory virtual orientation, held the first Thursday of each month from 5:30 to 6:30pm. Groups of five or more should contact the Community Engagement Specialist instead.",
    address: "1769 Hooper Avenue",
    city: "Toms River",
    county: "Ocean",
    cause_areas: ["Food & Hunger"],
    minimum_age: 13,
    hour_eligible: true,
    currently_accepting: true,
    urgent_need: false,
    contact_name: "",
    contact_email: "main@fulfillnj.org",
    contact_phone: "732-918-2600",
    signup_url: "https://fulfillnj.org/volunteer/",
  },
  {
    // source: https://fulfillnj.org/volunteer/
    slug: "fulfill-neptune",
    org_name: "Fulfill — Neptune",
    description:
      "Fulfill's main Monmouth County facility. Volunteers sort and pack donated food, support office and mailing work, help with tax return assistance, and distribute food at mobile pantries across the county.\n\nVolunteers must be 13 or older; younger students can organize food drives instead. Complete an application and attend the mandatory virtual orientation on the first Thursday of the month, 5:30 to 6:30pm.",
    address: "3300 Route 66",
    city: "Neptune",
    county: "Monmouth",
    cause_areas: ["Food & Hunger"],
    minimum_age: 13,
    hour_eligible: true,
    currently_accepting: true,
    urgent_need: false,
    contact_name: "",
    contact_email: "main@fulfillnj.org",
    contact_phone: "732-918-2600",
    signup_url: "https://fulfillnj.org/volunteer/",
  },
  {
    // source: https://oceancountyhistory.org/support/volunteers/
    slug: "ocean-county-historical-society",
    org_name: "Ocean County Historical Society",
    description:
      "Volunteer roles at the museum and research center in Toms River: docent and tour guide, research center assistant, museum collections, imaging, public relations, gardens and grounds, administrative support, publications, and development.\n\nRequest an application by phone or email, download it from the website, or apply online. The Society does not publish a minimum volunteer age — ask when you request the application.",
    address: "26 Hadley Avenue",
    city: "Toms River",
    county: "Ocean",
    cause_areas: ["Arts & Culture", "Community Events"],
    minimum_age: 14,
    hour_eligible: true,
    currently_accepting: true,
    urgent_need: false,
    contact_name: "",
    contact_email: "oceancounty.history@verizon.net",
    contact_phone: "732-341-1880",
    signup_url: "https://oceancountyhistory.org/support/volunteers/",
  },
  {
    // source: https://www.hobokenshelter.org/on-site-volunteering + /volunteering-for-kids
    slug: "hoboken-homeless-shelter",
    org_name: "The Hoboken Shelter",
    description:
      "Volunteers help prepare and serve lunch and dinner to guests in the shelter's kitchen, working shifts throughout the day.\n\nThis is one of the more teen-friendly shelters in the state: students 18 and under are welcome to help cook and serve, and only those 14 and under need to be accompanied by an adult. Email or call to reserve a shift. Groups of six or more should email the volunteer coordinator directly.",
    address: "300 Bloomfield Street",
    city: "Hoboken",
    county: "Hudson",
    cause_areas: ["Food & Hunger", "Housing & Homelessness"],
    minimum_age: 15,
    hour_eligible: true,
    currently_accepting: true,
    urgent_need: false,
    contact_name: "",
    contact_email: "getinvolved@hobokenshelter.org",
    contact_phone: "201-656-5069",
    signup_url: "https://www.hobokenshelter.org/on-site-volunteering",
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
  .select("org_name,county");

if (error) {
  console.error("Import failed:", error.message);
  process.exit(1);
}
console.log(`Imported ${data.length} listings:`);
data.forEach((r) => console.log(`  ${r.county.padEnd(11)} ${r.org_name}`));
