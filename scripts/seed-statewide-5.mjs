// Fifth batch — libraries and shelters filling out thinner counties.
// Usage: npm run seed:statewide5

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
    // source: https://sussexcountylibrary.org/volunteer/
    slug: "sussex-county-library-teen-volunteers",
    org_name: "Sussex County Library System — Teen Volunteers",
    description:
      "Teen volunteering across all six Sussex County Library branches: the Main Library in Frankford, Dennis Branch in Newton, Dorothy Henry Branch in Vernon, Franklin Branch, Louise Childs Branch in Stanhope, and Sussex-Wantage Branch in Wantage. Teens help most heavily with the summer reading program.\n\nOpen to ages 14 to 17. Everyone under 18 needs a signed Parental Consent Form. Review the volunteer policy, complete the volunteer interest application, and submit the consent form — both are downloadable from the library's volunteer page.",
    address: "125 Morris Turnpike",
    city: "Frankford",
    county: "Sussex",
    cause_areas: ["Libraries"],
    minimum_age: 14,
    hour_eligible: true,
    currently_accepting: true,
    urgent_need: false,
    contact_name: "",
    contact_email: "",
    contact_phone: "",
    signup_url: "https://sussexcountylibrary.org/volunteer/",
  },
  {
    // source: https://mmtlibrary.org/teens/teen-volunteers/
    slug: "morristown-morris-township-library-teen-volunteers",
    org_name: "Morristown & Morris Township Library — Teen Volunteers",
    description:
      "Teen volunteering at the Morristown and Morris Township Library, open to teens aged 13 to 18, or students in grades 7 through 12.\n\nFill out the online application on the library's teen volunteers page. If you cannot complete it online, stop by the Children's Department desk and use one of their computers. The Teen Librarian contacts applicants as opportunities come up, in the order applications were received.",
    address: "1 Miller Road",
    city: "Morristown",
    county: "Morris",
    cause_areas: ["Libraries"],
    minimum_age: 13,
    hour_eligible: true,
    currently_accepting: true,
    urgent_need: false,
    contact_name: "Teen Librarian",
    contact_email: "",
    contact_phone: "",
    signup_url: "https://mmtlibrary.org/teens/teen-volunteers/",
  },
  {
    // source: https://waynetownship.com/health-home-page/animal-shelter-main/animal-shelter-volunteer/
    slug: "wayne-animal-shelter",
    org_name: "Wayne Animal Shelter",
    description:
      "The municipal animal shelter in Wayne. Volunteer roles include shelter and foster care giver, adoption counselor, adoption follow-up counselor, fundraising and publicity, and office and clerical support — so there are options whether or not you want hands-on animal work.\n\nComplete the volunteer application and submit it in person at the shelter. The shelter does not publish a minimum volunteer age, so ask when you drop off your application.",
    address: "201 Pompton Plains Crossroads (Jackson Avenue Extension)",
    city: "Wayne",
    county: "Passaic",
    cause_areas: ["Animals"],
    minimum_age: 14,
    hour_eligible: true,
    currently_accepting: true,
    urgent_need: false,
    contact_name: "",
    contact_email: "",
    contact_phone: "",
    signup_url:
      "https://waynetownship.com/health-home-page/animal-shelter-main/animal-shelter-volunteer/",
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
