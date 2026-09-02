// Hospital junior/teen volunteer programs statewide. These are one of the
// most reliable sources of structured teen volunteering in New Jersey.
// Addresses are omitted where the volunteer office location was not stated.
//
// Usage: npm run seed:hospitals

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
    // source: https://www.atlanticare.org/volunteer
    slug: "atlanticare-junior-volunteers",
    org_name: "AtlantiCare — Junior Volunteers",
    description:
      "AtlantiCare's junior volunteer program takes students aged 13 to 17 — one of the lower age minimums for hospital volunteering in the state. Junior volunteers work as greeters, help with clerical tasks, and assist with patient activities.\n\nAtlantiCare runs several campuses across Atlantic County. Contact the volunteer office to ask which locations have openings and what the current application cycle looks like.",
    address: "",
    city: "Atlantic City",
    county: "Atlantic",
    cause_areas: ["Hospitals & Health"],
    minimum_age: 13,
    hour_eligible: true,
    currently_accepting: true,
    urgent_need: false,
    contact_name: "Cigi Serrano",
    contact_email: "cserrano@atlanticare.org",
    contact_phone: "609-652-3499",
    signup_url: "https://www.atlanticare.org/volunteer/apply_now",
  },
  {
    // source: https://www.inspirahealthnetwork.org/volunteering-inspira-health
    slug: "inspira-health-vineland-volunteers",
    org_name: "Inspira Health — Vineland",
    description:
      "Volunteering at Inspira's Vineland medical center. Volunteers must be at least 15 years old.\n\nApply through the Volgistics volunteer portal linked from Inspira's volunteering page, then contact the Vineland volunteer coordinator. Inspira is one of the few hospital systems with a real presence in Cumberland and Salem counties, so it is worth calling even if the portal shows nothing open.",
    address: "",
    city: "Vineland",
    county: "Cumberland",
    cause_areas: ["Hospitals & Health"],
    minimum_age: 15,
    hour_eligible: true,
    currently_accepting: true,
    urgent_need: false,
    contact_name: "Lori Wright",
    contact_email: "",
    contact_phone: "856-641-7738",
    signup_url: "https://www.inspirahealthnetwork.org/volunteering-inspira-health",
  },
  {
    // source: https://www.inspirahealthnetwork.org/volunteering-inspira-health
    slug: "inspira-health-mullica-hill-volunteers",
    org_name: "Inspira Health — Mullica Hill",
    description:
      "Volunteering at Inspira's Mullica Hill medical center, which also coordinates volunteers for the Woodbury location. Volunteers must be at least 15 years old.\n\nApply through the Volgistics volunteer portal linked from Inspira's volunteering page, then contact the volunteer coordinator for Mullica Hill, Elmer, and Woodbury.",
    address: "",
    city: "Mullica Hill",
    county: "Gloucester",
    cause_areas: ["Hospitals & Health"],
    minimum_age: 15,
    hour_eligible: true,
    currently_accepting: true,
    urgent_need: false,
    contact_name: "Jenine Seserko",
    contact_email: "",
    contact_phone: "856-508-2117",
    signup_url: "https://www.inspirahealthnetwork.org/volunteering-inspira-health",
  },
  {
    // source: https://www.inspirahealthnetwork.org/volunteering-inspira-health
    slug: "inspira-health-elmer-volunteers",
    org_name: "Inspira Health — Elmer",
    description:
      "Volunteering at Inspira's Elmer medical center in Salem County. Volunteers must be at least 15 years old.\n\nSalem County has very few organizations running formal teen volunteer programs, so this is one of the more structured options available locally. Apply through the Volgistics portal linked from Inspira's volunteering page and call the coordinator to confirm openings.",
    address: "",
    city: "Elmer",
    county: "Salem",
    cause_areas: ["Hospitals & Health"],
    minimum_age: 15,
    hour_eligible: true,
    currently_accepting: true,
    urgent_need: false,
    contact_name: "Jenine Seserko",
    contact_email: "",
    contact_phone: "856-508-2117",
    signup_url: "https://www.inspirahealthnetwork.org/volunteering-inspira-health",
  },
  {
    // source: capitalhealth.org/.../junior-volunteer-programs
    slug: "capital-health-junior-volunteers",
    org_name: "Capital Health — Junior Volunteers",
    description:
      "Junior volunteering for students aged 15 and older, in three formats: a seven-week summer program in July and August, twelve-week seasonal programs, and a year-round program running September through June.\n\nThe summer program requires a minimum commitment of 56 hours. All volunteers must provide immunization records — MMR, chickenpox, tuberculosis screening, hepatitis B, and a flu shot where applicable. Apply through the online volunteer portal.",
    address: "",
    city: "Trenton",
    county: "Mercer",
    cause_areas: ["Hospitals & Health"],
    minimum_age: 15,
    hour_eligible: true,
    currently_accepting: true,
    urgent_need: false,
    contact_name: "Volunteer Services",
    contact_email: "",
    contact_phone: "609-303-4023",
    signup_url:
      "https://www.capitalhealth.org/patients-visitors/volunteers-and-other-services/become-volunteer/junior-volunteer-programs",
  },
  {
    // source: rwjbh.org/rwj-university-hospital-new-brunswick/.../teen-volunteers/
    slug: "rwjuh-new-brunswick-teen-volunteers",
    org_name: "Robert Wood Johnson University Hospital — Teen Volunteers, New Brunswick",
    description:
      "Teen volunteers greet and direct visitors and support patients on nursing floors. Open to ages 15 to 18 who have completed ninth grade.\n\nShifts run weekday evenings — 4 to 6pm for ages 15 and up, 6 to 8pm for 16 and up — plus mornings, afternoons, and evenings seven days a week. The commitment is substantial: a minimum of 100 hours of service per year, ideally 2 to 3 hours weekly.\n\nRequirements include medical clearance with TB screening, immunization verification, a free urine drug screen, and full vaccination. To start, email the Volunteer Director with your name, high school, and current grade.",
    address: "1 Robert Wood Johnson Place",
    city: "New Brunswick",
    county: "Middlesex",
    cause_areas: ["Hospitals & Health"],
    minimum_age: 15,
    hour_eligible: true,
    currently_accepting: true,
    urgent_need: false,
    contact_name: "Jacob Persily, Volunteer Director",
    contact_email: "Jacob.Persily@rwjbh.org",
    contact_phone: "732-937-8507",
    signup_url:
      "https://www.rwjbh.org/rwj-university-hospital-new-brunswick/volunteer-opportunities-at-rwjuh/teen-volunteers/",
  },
  {
    // source: rwjbh.org/rwj-university-hospital-hamilton/.../teen-volunteers/
    // Applications CLOSED until February 2027 -> currently_accepting: false
    slug: "rwj-hamilton-teen-volunteers",
    org_name: "RWJ University Hospital Hamilton — Teen Volunteers",
    description:
      "A seven-week summer program for students aged 16 and older in grades 10 through 12, running early July through late August. Volunteers commit to two four-hour weekday shifts for the duration.\n\nThe application process runs interest form, interview, full application with references and medical clearance, online orientation, then in-person orientation. Uniform and full vaccination are required, and mobile devices are not allowed during shifts.\n\nApplications are currently closed. The hospital asks applicants to check back in February 2027 for the summer 2027 program. Note that they do not offer internships or shadowing, and will not send applications at a parent's request — the student must apply.",
    address: "1 Hamilton Health Place",
    city: "Hamilton",
    county: "Mercer",
    cause_areas: ["Hospitals & Health"],
    minimum_age: 16,
    hour_eligible: true,
    currently_accepting: false,
    urgent_need: false,
    contact_name: "",
    contact_email: "",
    contact_phone: "609-586-7900",
    signup_url:
      "https://www.rwjbh.org/rwj-university-hospital-hamilton/volunteer-opportunities-at-rwjuh-hamilton/teen-volunteers/",
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
