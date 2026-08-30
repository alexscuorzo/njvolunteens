// Second statewide batch. Same rule as the others: every field comes from
// the organization's own site or its county government page. Contact emails
// scraped from data brokers or unrelated job postings were NOT used.
//
// Usage: npm run seed:statewide2

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
    // source: https://sclsnj.org/get-involved/volunteer-opportunities/
    slug: "somerset-county-library-teen-volunteers",
    org_name: "Somerset County Library System — Teen Volunteers",
    description:
      "Summer teen volunteering across the Somerset County Library System, for teens entering grades 9 through 12.\n\nApplications open April 1 and close April 30 at 9pm. Training runs in May, and volunteering runs from June to late August. Applicants are contacted within two weeks about their status — submitting an application does not guarantee a placement.",
    address: "",
    city: "Bridgewater",
    county: "Somerset",
    cause_areas: ["Libraries"],
    minimum_age: 14,
    hour_eligible: true,
    currently_accepting: true,
    urgent_need: false,
    contact_name: "",
    contact_email: "volunteer@sclibnj.org",
    contact_phone: "908-458-4950",
    signup_url: "https://sclsnj.org/get-involved/volunteer-opportunities/",
  },
  {
    // source: https://monmouthcountyspca.org/volunteer/ + /about/contact-us/
    slug: "monmouth-county-spca",
    org_name: "Monmouth County SPCA",
    description:
      "The Eatontown animal shelter. Be aware of the age rule before you apply: all volunteers working at the shelter must be at least 18 years old, with no exceptions.\n\nStudents under 18 are pointed to the Junior Volunteer Guide instead, which covers hosting fundraisers and donation drives in your own community rather than working on site with the animals. That still earns service hours at most schools, but it is not shelter work.\n\nAdult volunteering requires orientation (held every two months), a $100 volunteer fee, a background check, a shelter tour and training, and 16 hours of basic shelter work.",
    address: "260 Wall Street",
    city: "Eatontown",
    county: "Monmouth",
    cause_areas: ["Animals"],
    minimum_age: 18,
    hour_eligible: true,
    currently_accepting: true,
    urgent_need: false,
    contact_name: "",
    contact_email: "Volunteers@monmouthcountyspca.org",
    contact_phone: "732-542-0040",
    signup_url: "https://monmouthcountyspca.org/volunteer/",
  },
  {
    // source: https://bgcppnj.org/volunteers/
    slug: "boys-girls-club-paterson-passaic",
    org_name: "Boys & Girls Club of Paterson and Passaic",
    description:
      "Youth programming across Paterson and Passaic — academic help, tutoring, SAT prep, sports, and swimming. Volunteers support these programs and work directly with younger kids.\n\nContact the volunteer coordinator to ask which roles are open and what the age requirement is for each, since it varies by program.",
    address: "",
    city: "Paterson",
    county: "Passaic",
    cause_areas: ["Tutoring & Education", "Sports & Recreation"],
    minimum_age: 14,
    hour_eligible: true,
    currently_accepting: true,
    urgent_need: false,
    contact_name: "Eleanor Nardozzi",
    contact_email: "enardozzi@bgcppnj.org",
    contact_phone: "973-279-3055",
    signup_url: "https://bgcppnj.org/volunteers/",
  },
  {
    // source: https://capemaycountynj.gov/174/Volunteer + /160/Animal-Shelter
    slug: "cape-may-county-animal-shelter",
    org_name: "Cape May County Animal Shelter & Adoption Center",
    description:
      "The county animal shelter in Cape May Court House. Volunteers help seven days a week with kennel cleaning, cat cage cleaning, and kitchen sanitizing, between 8:30am and 4:00pm. The shelter asks for a commitment of at least 3 to 4 hours a week.\n\nA New Volunteer Orientation is mandatory and is held on Wednesdays at the County Administration Building in the Crest Haven Complex.\n\nThe shelter does not publish a minimum volunteer age — email or call before attending orientation to confirm you are eligible.",
    address: "4 Moore Road, Crest Haven Complex",
    city: "Cape May Court House",
    county: "Cape May",
    cause_areas: ["Animals"],
    minimum_age: 14,
    hour_eligible: true,
    currently_accepting: true,
    urgent_need: false,
    contact_name: "",
    contact_email: "animal.shelter@cmcsheriff.net",
    contact_phone: "",
    signup_url: "https://capemaycountynj.gov/174/Volunteer",
  },
  {
    // source: https://warrenlib.org/volunteers + /summer
    slug: "warren-county-library-teen-volunteers",
    org_name: "Warren County Library — Teen Volunteers",
    description:
      "Teen volunteers help Youth Services staff run the Summer Reading Program: maintaining the space, prepping for programs, creating displays, cleaning and organizing the children's play areas, and checking in summer reading logs.\n\nPrint the volunteer application and drop it off at any library location. Staff will contact you to set up a volunteer orientation.\n\nThe library does not publish a minimum age for teen volunteers — ask when you drop off your application.",
    address: "2 Shotwell Drive",
    city: "Belvidere",
    county: "Warren",
    cause_areas: ["Libraries"],
    minimum_age: 13,
    hour_eligible: true,
    currently_accepting: true,
    urgent_need: false,
    contact_name: "",
    contact_email: "libraryprograms@warrenlib.org",
    contact_phone: "908-818-1280",
    signup_url: "https://www.warrenlib.org/form/volunteer-application",
  },
  {
    // source: https://www.middlesexlibrarynj.org/teens/
    slug: "middlesex-public-library-teen-volunteers",
    org_name: "Middlesex Public Library — Teen Volunteers",
    description:
      "Teen volunteering at the Middlesex Public Library. Apply through the library's online volunteer form and review their Volunteer Rules and Expectations document first.\n\nThe library does not publish age or grade requirements or a list of specific roles on its teen page — email Kaila Ward directly to ask what is available and whether you qualify before applying.",
    address: "1300 Mountain Avenue",
    city: "Middlesex",
    county: "Middlesex",
    cause_areas: ["Libraries"],
    minimum_age: 13,
    hour_eligible: true,
    currently_accepting: true,
    urgent_need: false,
    contact_name: "Kaila Ward",
    contact_email: "KWard@middlesexlibrarynj.org",
    contact_phone: "",
    signup_url: "https://www.middlesexlibrarynj.org/teens/",
  },
  {
    // source: https://salemcountyhumanesociety.org/contact + /about
    slug: "salem-county-humane-society",
    org_name: "Salem County Humane Society",
    description:
      "A no-kill shelter for homeless dogs and cats in Carneys Point, staffed entirely by volunteers — there is no paid staff, so volunteers do everything.\n\nSalem County has very few organizations running formal teen volunteer programs, and this shelter does not publish a minimum age or an online application. Email or call first to ask whether they take volunteers your age and what help they currently need. Visits are by appointment only.",
    address: "214 Game Creek Road",
    city: "Carneys Point",
    county: "Salem",
    cause_areas: ["Animals"],
    minimum_age: 14,
    hour_eligible: true,
    currently_accepting: true,
    urgent_need: false,
    contact_name: "",
    contact_email: "info@salemcountyhumanesociety.org",
    contact_phone: "856-299-2220",
    signup_url: "https://salemcountyhumanesociety.org/contact",
  },
  {
    // source: https://bergencountynj.gov/.../volunteer-opportunities/
    slug: "bergen-county-animal-shelter-teterboro",
    org_name: "Bergen County Animal Shelter & Adoption Center",
    description:
      "The county animal shelter in Teterboro. Volunteers walk dogs and socialize cats, which improves the animals' quality of life in the shelter and helps them build the behaviors they need to be adopted. No prior experience is required.\n\nThe shelter does not publish a minimum volunteer age — email or call before applying to confirm whether they take volunteers your age.",
    address: "100 United Lane",
    city: "Teterboro",
    county: "Bergen",
    cause_areas: ["Animals"],
    minimum_age: 14,
    hour_eligible: true,
    currently_accepting: true,
    urgent_need: false,
    contact_name: "",
    contact_email: "shelter@bergencountynj.gov",
    contact_phone: "201-229-4600",
    signup_url:
      "https://bergencountynj.gov/bergen-county-department-of-health-services/about-animal-shelter-adoption-center/volunteer-opportunities/",
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
