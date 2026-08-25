// Essex County listings, researched from each organization's own website.
// Each entry records the page it came from so the data can be re-checked.
//
// These are inserted with status = 'pending'. A human should confirm details
// (ideally by phone) before approving them — the "last verified" date on a
// live listing is a promise to students.
//
// Usage: npm run seed:essex

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
    // source: https://toniskitchen.org/volunteer/
    slug: "tonis-kitchen-montclair",
    org_name: "Toni's Kitchen",
    description:
      "A food ministry of St. Luke's Episcopal Church serving Montclair. Volunteers help with food prep, serving meals, packing healthy food bags, and assisting at Toni's Closet. Shifts run during the week and on weekends, and regular shifts are open to high school students and adults.\n\nWalk-in volunteers are not accepted — register through the volunteer portal and pick a shift first.",
    address: "73 South Fullerton Avenue (enter through the Union Street parking lot)",
    city: "Montclair",
    cause_areas: ["Food & Hunger"],
    minimum_age: 14,
    hour_eligible: true,
    currently_accepting: true,
    urgent_need: false,
    contact_name: "",
    contact_email: "hello@toniskitchen.org",
    contact_phone: "973-932-0768",
    signup_url: "https://www.volgistics.com/appform/1018862460",
  },
  {
    // source: https://greaternewark.org/volunteer/
    slug: "greater-newark-conservancy",
    org_name: "Greater Newark Conservancy",
    description:
      "Urban farming and environmental education in Newark. Volunteers join seasonal farm and garden workdays, prep and maintain community garden plots, pack and distribute CSA boxes, and help at markets, festivals, and family days.\n\nNo gardening experience is necessary — staff train you on site. Monthly open volunteer days run at the Urban Environmental Center, Court Street Farm, and Hawthorne Avenue Farm starting in April.",
    address: "32 Prince Street",
    city: "Newark",
    cause_areas: ["Environment", "Food & Hunger"],
    minimum_age: 14,
    hour_eligible: true,
    currently_accepting: true,
    urgent_need: false,
    contact_name: "",
    contact_email: "info@greaternewark.org",
    contact_phone: "973-642-4646",
    signup_url: "https://greaternewark.org/volunteer/",
  },
  {
    // source: https://www.npl.org/about-the-library/volunteer/
    slug: "newark-public-library",
    org_name: "Newark Public Library",
    description:
      "Volunteers support the Main Library and neighborhood branches as homework helpers, literacy and computer tutors, English conversation partners for new Americans, activity assistants, and event help.\n\nTeens can earn up to 18 community service hours over the summer by helping students in grades K-3 practice their reading. Contact the Development Department to set up an appointment.",
    address: "5 Washington Street",
    city: "Newark",
    cause_areas: ["Libraries", "Tutoring & Education"],
    minimum_age: 14,
    hour_eligible: true,
    currently_accepting: true,
    urgent_need: false,
    contact_name: "Development Department",
    contact_email: "development@npl.org",
    contact_phone: "973-733-7731",
    signup_url: "https://www.npl.org/about-the-library/volunteer/",
  },
  {
    // source: https://www.habitatnewark.org/volunteer/individual-volunteering/
    slug: "habitat-for-humanity-greater-newark",
    org_name: "Habitat for Humanity of Greater Newark",
    description:
      "Help build and repair homes alongside a construction foreman and site supervisor — painting, framing, insulating, hanging sheetrock, installing flooring, and landscaping. The minimum commitment is a single day, and you pick your dates from the volunteer calendar.\n\nVolunteers aged 16 and 17 may not use power tools and must be accompanied by an adult. A parental consent form is required for anyone under 18.",
    address: "445 Route 46",
    city: "Fairfield",
    cause_areas: ["Housing & Homelessness", "Community Events"],
    minimum_age: 16,
    hour_eligible: true,
    currently_accepting: true,
    urgent_need: false,
    contact_name: "",
    contact_email: "info@habitatnewark.org",
    contact_phone: "973-840-7442",
    signup_url:
      "https://habitatnewark.app.neoncrm.com/np/clients/habitatnewark/publicaccess/eventCalendarBig.jsp",
  },
  {
    // source: https://www.rwjbh.org/clara-maass-medical-center/volunteer/
    slug: "clara-maass-medical-center-belleville",
    org_name: "Clara Maass Medical Center",
    description:
      "Teen volunteers at this Belleville hospital answer phones, assemble patient information folders, escort patients to and from physical and occupational therapy, guide same-day procedure patients to their areas, and act as a liaison between the recovery room and the family waiting room. Volunteers can also support seniors through the Hospital Elder Life Program.\n\nMost volunteers give at least 3 to 4 hours a week. You complete a teen application along with health and background screening forms, then interview with Volunteer Services.",
    address: "1 Clara Maass Drive",
    city: "Belleville",
    cause_areas: ["Hospitals & Health", "Seniors"],
    minimum_age: 15,
    hour_eligible: true,
    currently_accepting: true,
    urgent_need: false,
    contact_name: "Volunteer Services Department",
    contact_email: "Tania.Manago@rwjbh.org",
    contact_phone: "973-450-2150",
    signup_url: "https://www.rwjbh.org/clara-maass-medical-center/volunteer/",
  },
  {
    // source: https://www.jerseycares.org/youth-service
    slug: "jersey-cares-teen-service-events",
    org_name: "Jersey Cares — Teen Service Events",
    description:
      "Teen service events for ages 14 to 18 at the Jersey Cares office in Livingston. Volunteers complete a creative component, pack a kit that is donated to a local nonprofit partner, and take part in a round-table discussion about the project's impact.\n\nJersey Cares also runs volunteer projects across New Jersey year-round through their opportunity calendar, many of which are open to ages 12 and up with adult supervision.",
    address: "",
    city: "Livingston",
    cause_areas: ["Community Events"],
    minimum_age: 14,
    hour_eligible: true,
    currently_accepting: true,
    urgent_need: false,
    contact_name: "",
    contact_email: "info@jerseycares.org",
    contact_phone: "",
    signup_url: "https://www.jerseycares.org/youth-service",
  },
  {
    // source: https://www.bplnj.org/teen-volunteer-program
    slug: "bloomfield-public-library-teen-volunteers",
    org_name: "Bloomfield Public Library — Teen Volunteers",
    description:
      "Teen volunteers straighten shelves, pack materials being sent to other libraries, and provide computer assistance to patrons. Open to students in grade 9 and up.\n\nVolunteers must be Bloomfield residents. You complete an application and meet with the Volunteer Services director before being accepted, and a parent or guardian signs a consent form. The program is popular — if no openings exist you can still apply and be kept on file.",
    address: "90 Broad Street",
    city: "Bloomfield",
    cause_areas: ["Libraries"],
    minimum_age: 14,
    hour_eligible: true,
    currently_accepting: true,
    urgent_need: false,
    contact_name: "",
    contact_email: "reference@bplnj.org",
    contact_phone: "973-566-6200",
    signup_url: "https://www.bplnj.org/teen-volunteer-program",
  },
  {
    // source: https://ahscares.org/newark/ and https://ahscares.org/volunteer-portal/
    slug: "associated-humane-societies-newark",
    org_name: "Associated Humane Societies — Newark Shelter",
    description:
      "Newark's animal shelter on Evergreen Avenue. Volunteering on the shelter floor with the animals requires you to be 18 or older, but there is a junior volunteer track for those 17 and under that does not involve handling animals directly.\n\nCall or email first to ask which junior roles are currently open before filling out an application.",
    address: "124 Evergreen Avenue",
    city: "Newark",
    cause_areas: ["Animals"],
    minimum_age: 14,
    hour_eligible: true,
    currently_accepting: true,
    urgent_need: false,
    contact_name: "",
    contact_email: "newark@ahsppz.org",
    contact_phone: "973-824-7080",
    signup_url: "https://ahscares.org/volunteer-portal/",
  },
  {
    // source: https://montclairlibrary.org/teens/teen-volunteer-opportunities/
    // Application currently CLOSED -> currently_accepting: false
    slug: "montclair-public-library-teen-volunteers",
    org_name: "Montclair Public Library — Teen Volunteers",
    description:
      "Teen volunteers help at the Main Library and the Bellevue Avenue branch. The library also runs monthly volunteer sessions from 4 to 6 p.m. that are open to teens across the Montclair area, and a Teen Volunteer Book Lists project that earns volunteer credit.\n\nOpen to students in grades 7 through 12 who live or attend school in Montclair. The general Teen Volunteer Application and the Teen Advisory Board are both currently closed, but the monthly sessions and book list project still offer hours — email Youth Services to ask what is open.",
    address: "50 South Fullerton Avenue",
    city: "Montclair",
    cause_areas: ["Libraries"],
    minimum_age: 12,
    hour_eligible: true,
    currently_accepting: false,
    urgent_need: false,
    contact_name: "Youth Services",
    contact_email: "youthservices@montclairlibrary.org",
    contact_phone: "",
    signup_url: "https://montclairlibrary.org/teens/teen-volunteer-opportunities/",
  },
];

const env = loadEnv();
const supabase = createClient(env.SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY, {
  auth: { persistSession: false },
});

const rows = LISTINGS.map((l) => ({
  ...l,
  county: "Essex",
  edit_token: randomBytes(24).toString("base64url"),
  status: "pending",
  last_verified_at: new Date().toISOString(),
}));

const { data, error } = await supabase
  .from("listings")
  .upsert(rows, { onConflict: "slug" })
  .select("org_name,status");

if (error) {
  console.error("Import failed:", error.message);
  process.exit(1);
}
console.log(`Imported ${data.length} Essex County listings as PENDING:`);
data.forEach((r) => console.log(`  ${r.status}  ${r.org_name}`));
