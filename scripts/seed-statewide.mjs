// Statewide listings beyond Essex, researched from each organization's own
// volunteer page. Source URL recorded per entry.
//
// Inserted as status='pending' for human review. Where an organization does
// not publish a minimum age, the description says so explicitly and the
// minimum_age field is a conservative placeholder that needs a phone call.
//
// Usage: npm run seed:statewide

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
    // source: https://www.winter4kids.org/volunteer/  (+ winter4kids.org/contact/)
    slug: "winter4kids-vernon",
    org_name: "Winter4Kids",
    description:
      "A nonprofit at the National Winter Activity Center in Vernon that gives kids who would never otherwise get the chance access to alpine skiing, snowboarding, Nordic skiing, and biathlon. Volunteers work across facility operations, programming, and coaching.\n\nFirst Tracks Instructors deliver the on-snow curriculum, setting up outdoor \"classrooms\" and leading children through games and activities while teaching technique. Anyone in an on-snow role must be a fully experienced skier or rider and bring their own equipment; there are also off-snow roles.\n\nWinter4Kids does not publish a minimum volunteer age — call or email before applying to confirm you are eligible.",
    address: "44 Breakneck Road",
    city: "Vernon",
    county: "Sussex",
    cause_areas: ["Sports & Recreation", "Community Events"],
    minimum_age: 14,
    hour_eligible: true,
    currently_accepting: true,
    urgent_need: false,
    contact_name: "",
    contact_email: "information@winter4kids.org",
    contact_phone: "973-846-8250",
    signup_url: "https://winter4kids.isolvedhire.com/jobs/1792256",
  },
  {
    // source: https://cfbnj.org/volunteer/
    slug: "community-foodbank-nj-hillside",
    org_name: "Community FoodBank of New Jersey — Hillside",
    description:
      "New Jersey's largest food bank. At the Hillside warehouse volunteers sort and repack donated food, assemble emergency food boxes, package bulk products, and help with office tasks.\n\nAll volunteers must be 12 or older. Volunteers aged 12 to 15 must be accompanied by a parent, guardian, or chaperone. Shifts must be booked in advance through the volunteer portal — walk-ins are not accepted, and every person needs their own registration slot.",
    address: "31 Evans Terminal",
    city: "Hillside",
    county: "Union",
    cause_areas: ["Food & Hunger"],
    minimum_age: 12,
    hour_eligible: true,
    currently_accepting: true,
    urgent_need: false,
    contact_name: "",
    contact_email: "volunteer@cfbnj.org",
    contact_phone: "908-355-3663",
    signup_url: "https://cfbnj.volunteerhub.com/vv2/",
  },
  {
    // source: https://cfbnj.org/volunteer/
    slug: "community-foodbank-nj-garfield",
    org_name: "Community FoodBank of New Jersey — Garfield",
    description:
      "The Garfield location of New Jersey's largest food bank. Volunteers help with shelving and checkout support at the community food pantry here, rather than the warehouse sorting done in Hillside.\n\nAll volunteers must be 12 or older, and volunteers aged 12 to 15 must be accompanied by a parent, guardian, or chaperone. Book a shift in advance through the volunteer portal — walk-ins are not accepted.",
    address: "",
    city: "Garfield",
    county: "Bergen",
    cause_areas: ["Food & Hunger"],
    minimum_age: 12,
    hour_eligible: true,
    currently_accepting: true,
    urgent_need: false,
    contact_name: "",
    contact_email: "jgoordman@cfbnj.org",
    contact_phone: "973-245-9579",
    signup_url: "https://cfbnj.volunteerhub.com/vv2/",
  },
  {
    // source: https://cfbnj.org/volunteer/
    slug: "community-foodbank-nj-egg-harbor",
    org_name: "Community FoodBank of New Jersey — Egg Harbor Township",
    description:
      "The southern New Jersey branch of the state's largest food bank. Volunteers here focus on pantry assistance and stocking shelves for families collecting food.\n\nAll volunteers must be 12 or older, and volunteers aged 12 to 15 must be accompanied by a parent, guardian, or chaperone. Shifts are booked in advance through the volunteer portal — walk-ins are not accepted.",
    address: "",
    city: "Egg Harbor Township",
    county: "Atlantic",
    cause_areas: ["Food & Hunger"],
    minimum_age: 12,
    hour_eligible: true,
    currently_accepting: true,
    urgent_need: false,
    contact_name: "",
    contact_email: "volunteereht@cfbnj.org",
    contact_phone: "609-383-8843",
    signup_url: "https://cfbnj.volunteerhub.com/vv2/",
  },
  {
    // source: https://uplnj.org/volunteer-opportunities-teens/
    slug: "union-public-library-volunteens",
    org_name: "Union Public Library — VolunTeens",
    description:
      "The Union Public Library's teen volunteering program. Teens support library services including shelving, children's programs, and community events, in a structured and social environment.\n\nOpen only to teens entering 7th through 12th grade who live in or attend school in the Township of Union. Orientations run quarterly — January, April, late June/early July, and late September/early October. Submit the VolunTeens Interest Form and you will be emailed the next orientation date. The volunteer year runs from late June through mid-June.",
    address: "1980 Morris Avenue",
    city: "Union",
    county: "Union",
    cause_areas: ["Libraries"],
    minimum_age: 12,
    hour_eligible: true,
    currently_accepting: true,
    urgent_need: false,
    contact_name: "",
    contact_email: "teens@uplnj.org",
    contact_phone: "908-851-5450",
    signup_url: "https://uplnj.org/volunteer-opportunities-teens/",
  },
  {
    // source: https://www.glenrocklibrary.org/teen-volunteers
    slug: "glen-rock-public-library-teen-volunteers",
    org_name: "Glen Rock Public Library — Teen Volunteers",
    description:
      "Teen volunteers here take on book reviewing and blogging, shelf reading, and homework tutoring, plus a Summer Volunteer Program and the Teen Advisory Board.\n\nOpen to Glen Rock students in grades 6 through 12. Complete the GRPL Teen Volunteer Application, then sign up for the specific activities you want.",
    address: "315 Rock Road",
    city: "Glen Rock",
    county: "Bergen",
    cause_areas: ["Libraries", "Tutoring & Education"],
    minimum_age: 11,
    hour_eligible: true,
    currently_accepting: true,
    urgent_need: false,
    contact_name: "Kristen Rasczyk, Teen Librarian",
    contact_email: "kristen.rasczyk@glenrock.bccls.org",
    contact_phone: "",
    signup_url: "https://www.glenrocklibrary.org/teen-volunteers",
  },
  {
    // source: https://njshelter.org/ (+ Jersey Cares partner listing)
    slug: "mt-pleasant-animal-shelter-east-hanover",
    org_name: "Mt. Pleasant Animal Shelter",
    description:
      "A no-kill animal shelter in East Hanover with one of the few volunteer programs in the state that takes volunteers well under 16. Roles include cat companion, shelter helper, kennel attendant, dog walker, and outreach assistant.\n\nThe shelter runs a Junior Volunteer track for younger teens alongside regular volunteering for ages 16 and up; some roles require a parent or guardian to accompany you. Call or email to confirm which roles are open to your age before applying.",
    address: "194 Route 10 West",
    city: "East Hanover",
    county: "Morris",
    cause_areas: ["Animals"],
    minimum_age: 13,
    hour_eligible: true,
    currently_accepting: true,
    urgent_need: false,
    contact_name: "",
    contact_email: "info@njshelter.org",
    contact_phone: "973-386-0590",
    signup_url: "https://njshelter.org/",
  },
  {
    // source: https://www.awanj.org/volunteer/
    slug: "animal-welfare-association-voorhees",
    org_name: "Animal Welfare Association",
    description:
      "A Voorhees animal shelter where volunteers walk dogs, socialize cats and small animals, build enrichment toys, help with animal care, and staff community outreach events, pet food pantries, and pet therapy programs.\n\nRegular volunteering starts at age 16. There is also a Jr. Volunteer program for ages 12 to 15, where a parent or legal guardian must be present at all times. Fill in the adult or junior application through their volunteer portal — the coordinator contacts applicants within two weeks to schedule orientation.",
    address: "509 Centennial Boulevard",
    city: "Voorhees",
    county: "Camden",
    cause_areas: ["Animals"],
    minimum_age: 12,
    hour_eligible: true,
    currently_accepting: true,
    urgent_need: false,
    contact_name: "",
    contact_email: "volunteers@awanj.org",
    contact_phone: "856-424-2288",
    signup_url: "https://www.awanj.org/volunteer/",
  },
  {
    // source: https://hclibrary.us/teens/volunteer
    slug: "hunterdon-county-library-teen-volunteers",
    org_name: "Hunterdon County Library — Teen Volunteers",
    description:
      "Four different ways to volunteer, for ages 13 to 18. Regular volunteers hold a weekly one-hour shift at Headquarters in Flemington or the North County Branch in Clinton, maintaining the space and prepping materials for programs.\n\nReading Buddies pairs you with a K-3 student over four weeks to practice reading. The Teen Advisory Board meets monthly during the school year to lead programs and build displays. Special event volunteers help with check-in, craft tables, setup, and cleanup.\n\nApplications for school-year shifts run September 8 through October 2.",
    address: "314 State Route 12, Building 3",
    city: "Flemington",
    county: "Hunterdon",
    cause_areas: ["Libraries", "Tutoring & Education"],
    minimum_age: 13,
    hour_eligible: true,
    currently_accepting: true,
    urgent_need: false,
    contact_name: "Jordan Hutchins",
    contact_email: "jhutchins@hclibrary.us",
    contact_phone: "",
    signup_url: "https://hclibrary.us/teens/volunteerapplication",
  },
  {
    // source: https://www.gcls.org/teen-space/
    slug: "gloucester-county-library-teen-volunteers",
    org_name: "Gloucester County Library System — Teen Volunteers",
    description:
      "Teen volunteering across six branches: Clayton, Glassboro, Greenwich Township, Logan Township, Mullica Hill, and Swedesboro. Open to ages 12 to 17, with a minimum ten-hour commitment and a regular schedule.\n\nPick up a teen volunteer application at the Circulation Desk of your local branch and return it there. Staff then contact you to schedule new volunteer training before you start booking hours.",
    address: "",
    city: "Mullica Hill",
    county: "Gloucester",
    cause_areas: ["Libraries"],
    minimum_age: 12,
    hour_eligible: true,
    currently_accepting: true,
    urgent_need: false,
    contact_name: "Teen Librarian",
    contact_email: "ssmith@gcls.org",
    contact_phone: "",
    signup_url: "https://www.gcls.org/teen-space/",
  },
  {
    // source: https://www.hamiltonymca.org/about-us/youth-volunteer-connection
    slug: "hamilton-ymca-youth-volunteer-connection",
    org_name: "Hamilton Area YMCA — Youth Volunteer Connection",
    description:
      "A Mercer County clearinghouse that gathers volunteer opportunities for youth aged 13 to 17 into one place, so you can search rather than cold-calling organizations one at a time.\n\nListed partners include the YMCA itself, West Windsor Arts Council, Farmers Against Hunger, Habitat for Humanity, the NJ State Museum, and Robert Wood Johnson University Hospital. Each opportunity links through to the host organization's own application.",
    address: "",
    city: "Hamilton",
    county: "Mercer",
    cause_areas: ["Community Events"],
    minimum_age: 13,
    hour_eligible: true,
    currently_accepting: true,
    urgent_need: false,
    contact_name: "Jill Makkay, Executive Director",
    contact_email: "jmakkay@hamiltonymca.org",
    contact_phone: "609-581-9622",
    signup_url: "https://www.hamiltonymca.org/about-us/youth-volunteer-connection",
  },
];

const env = loadEnv();
const supabase = createClient(env.SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY, {
  auth: { persistSession: false },
});

const rows = LISTINGS.map((l) => ({
  ...l,
  edit_token: randomBytes(24).toString("base64url"),
  status: "pending",
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
console.log(`Imported ${data.length} listings as PENDING:`);
data.forEach((r) => console.log(`  ${r.county.padEnd(11)} ${r.org_name}`));
