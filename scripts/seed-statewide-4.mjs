// Fourth batch — organizations that publish a phone but no volunteer email.
// contact_email is stored as an empty string (the column is NOT NULL) and the
// listing page hides the email row when it is empty.
//
// Usage: npm run seed:statewide4

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
    // source: https://www.turtlebackzoo.com/join-our-team/
    slug: "turtle-back-zoo-volunteen",
    org_name: "Essex County Turtle Back Zoo — VolunTEEN Program",
    description:
      "VolunTEENs assist camp counselors with the Zoo's summer camp — preparing for daily sessions, helping campers with activities, and keeping groups together and safe on Zoo grounds. It is a good way to learn about the animals while earning hours.\n\nYou must be at least 14, or entering grade 9 in the fall. Freshmen, sophomores, and juniors are welcome. You must commit to at least one full week over the summer, Monday to Friday, 8:30am to 4:30pm each day. The separate Docent program runs its own application cycle and the current class is closed.",
    address: "560 Northfield Avenue",
    city: "West Orange",
    county: "Essex",
    cause_areas: ["Animals", "Community Events"],
    minimum_age: 14,
    hour_eligible: true,
    currently_accepting: true,
    urgent_need: false,
    contact_name: "Volunteer Coordinator",
    contact_email: "",
    contact_phone: "973-731-5800",
    signup_url: "https://www.turtlebackzoo.com/join-our-team/",
  },
  {
    // source: rwjbh.org/cooperman-barnabas-medical-center/.../teen-volunteers/
    slug: "cooperman-barnabas-teen-volunteers",
    org_name: "Cooperman Barnabas Medical Center — Teen Volunteers",
    description:
      "Teen volunteering at the Livingston hospital, open to high school freshmen, sophomores, and juniors aged 15 to 18.\n\nRead this before applying: the program requires a full year commitment or longer, and there are no summer-only placements. If you want summer hours only, this is not the right program. To apply you call the Volunteer Resources Department for a brief phone interview and to be added to the waiting list — allow 2 to 3 business days for a return call.",
    address: "94 Old Short Hills Road",
    city: "Livingston",
    county: "Essex",
    cause_areas: ["Hospitals & Health"],
    minimum_age: 15,
    hour_eligible: true,
    currently_accepting: true,
    urgent_need: false,
    contact_name: "Volunteer Resources Department",
    contact_email: "",
    contact_phone: "973-322-5592",
    signup_url:
      "https://www.rwjbh.org/cooperman-barnabas-medical-center/volunteer-opportunities-at-cooperman-barnabas-me/teen-volunteers/",
  },
  {
    // source: https://bcls.lib.nj.us/teen-volunteering/
    slug: "burlington-county-library-teen-volunteers",
    org_name: "Burlington County Library System — Teen Volunteers",
    description:
      "Teen volunteers help with special events, craft preparation, inventory projects, and shelving. The library frames it as job training — you build customer service experience that transfers to paid work later.\n\nOpen to ages 13 to 17. Apply through the online webform, which asks for your information, a guardian's information, your availability, and references. Applications are currently being accepted at the Cinnaminson, Maple Shade, Pemberton, Pinelands, and Riverton branches only.",
    address: "5 Pioneer Boulevard",
    city: "Westampton",
    county: "Burlington",
    cause_areas: ["Libraries"],
    minimum_age: 13,
    hour_eligible: true,
    currently_accepting: true,
    urgent_need: false,
    contact_name: "",
    contact_email: "",
    contact_phone: "609-267-9660",
    signup_url: "https://bcls.lib.nj.us/teen-volunteering/",
  },
  {
    // source: https://www.virtua.org/About/Volunteer + virtua.vsyslive.com
    slug: "virtua-health-junior-volunteers-mount-holly",
    org_name: "Virtua Health — Junior Volunteers, Mount Holly",
    description:
      "Virtua's Junior Volunteer program is open to students aged 14 to 18. There is a track specifically for students interested in nursing careers, with rotating assignments on patient care floors including the Emergency Department, Critical Care, and Maternal Child Health.\n\nApply through Virtua's volunteer portal. A coordinator reviews the application with you and matches an assignment to your interests, then you attend orientation and receive department training before starting.",
    address: "175 Madison Avenue",
    city: "Mount Holly",
    county: "Burlington",
    cause_areas: ["Hospitals & Health"],
    minimum_age: 14,
    hour_eligible: true,
    currently_accepting: true,
    urgent_need: false,
    contact_name: "Volunteer Services",
    contact_email: "",
    contact_phone: "609-914-7073",
    signup_url: "https://virtua.vsyslive.com/",
  },
  {
    // source: https://theoceancountylibrary.org/teens/volunteers
    slug: "ocean-county-library-teen-volunteers",
    org_name: "Ocean County Library — Teen Volunteers",
    description:
      "Several ways to volunteer, for teens aged 12 to 18. The Teen Advisory Board helps plan library programs and gives input on teen services. Adopt a Shelf keeps a section organized. Teen Book & Media Reviewer means writing reviews of YA books, music, video games, or movies. Virtual volunteering options vary by branch.\n\nThere is also S.A.I.L., a summer program for students entering 8th grade. Apply through the OCL Teen Application on the library's website.",
    address: "101 Washington Street",
    city: "Toms River",
    county: "Ocean",
    cause_areas: ["Libraries"],
    minimum_age: 12,
    hour_eligible: true,
    currently_accepting: true,
    urgent_need: false,
    contact_name: "",
    contact_email: "",
    contact_phone: "732-349-6200",
    signup_url: "https://theoceancountylibrary.org/teens/volunteers",
  },
  {
    // source: https://cclnj.org/
    slug: "cumberland-county-library-teen-volunteers",
    org_name: "Cumberland County Library — Teen Volunteers",
    description:
      "The county library in Bridgeton runs a teen volunteer program with regular teen volunteer meetings.\n\nCumberland County has very few organizations publishing formal teen volunteer programs, so this is one of the more reliable options in the area. The library does not publish age requirements or an online application — call to ask what is available and whether you qualify.",
    address: "800 East Commerce Street",
    city: "Bridgeton",
    county: "Cumberland",
    cause_areas: ["Libraries"],
    minimum_age: 13,
    hour_eligible: true,
    currently_accepting: true,
    urgent_need: false,
    contact_name: "",
    contact_email: "",
    contact_phone: "856-453-2210",
    signup_url: "https://cclnj.org/",
  },
  {
    // source: https://www.bgchc.org/volunteer-with-youth
    slug: "boys-girls-clubs-hudson-county",
    org_name: "Boys & Girls Clubs of Hudson County",
    description:
      "Supports children and teens in grades K through 12 with programming, mentorship, and enrichment. Volunteering can be as simple as reading a book with a kindergartener, talking with a middle schooler about handling peer pressure, or helping a high school senior with a college essay.\n\nYou can help on a one-time basis or regularly, and extra opportunities open up around holidays and special events. The Club does not publish a minimum volunteer age — call to ask which roles are open to your age.",
    address: "225 Morris Boulevard",
    city: "Jersey City",
    county: "Hudson",
    cause_areas: ["Tutoring & Education", "Sports & Recreation"],
    minimum_age: 14,
    hour_eligible: true,
    currently_accepting: true,
    urgent_need: false,
    contact_name: "",
    contact_email: "",
    contact_phone: "201-333-4100",
    signup_url: "https://www.bgchc.org/volunteer-with-youth",
  },
  {
    // source: https://www.franklintwp.org/teens/teen-volunteering/
    slug: "franklin-township-library-teen-action-group",
    org_name: "Franklin Township Public Library — Teen Action Group",
    description:
      "TAG members create social media content, decorate the Young Adult Room, make bookmarks, write letters to seniors and soldiers, help plan programs, and do clerical work like shelf organization.\n\nOpen to students aged 12 to 17 who live in Franklin Township and hold an active juvenile library card. You need acceptance from the Teen Librarian before submitting volunteer work. Applications close for the year and reopen each September — call the Reference Desk to check the current cycle.",
    address: "485 DeMott Lane",
    city: "Somerset",
    county: "Somerset",
    cause_areas: ["Libraries"],
    minimum_age: 12,
    hour_eligible: true,
    currently_accepting: true,
    urgent_need: false,
    contact_name: "Reference Desk (option 3)",
    contact_email: "",
    contact_phone: "732-873-8700",
    signup_url: "https://www.franklintwp.org/teens/teen-volunteering/",
  },
  {
    // source: https://livingstonlibrary.org/teen-volunteer-opportunities/
    slug: "livingston-public-library-teen-volunteers",
    org_name: "Livingston Public Library — Teen Volunteers",
    description:
      "Teen volunteering at the Livingston Public Library, open to students in grades 6 through 12.\n\nThe library does not publish a full list of roles or an online application on its teen page — call the library to ask what is currently available and how to apply.",
    address: "10 Robert H. Harp Drive",
    city: "Livingston",
    county: "Essex",
    cause_areas: ["Libraries"],
    minimum_age: 11,
    hour_eligible: true,
    currently_accepting: true,
    urgent_need: false,
    contact_name: "",
    contact_email: "",
    contact_phone: "973-992-4600",
    signup_url: "https://livingstonlibrary.org/",
  },
  {
    // source: https://www.essexcountynj.org/environmental-center/
    slug: "essex-county-environmental-center",
    org_name: "Essex County Environmental Center",
    description:
      "The county's environmental education center in Roseland, on the Passaic River. Volunteers support environmental education programming, trail and grounds work, and seasonal public events.\n\nThe Center does not publish a minimum volunteer age or a standing application form — call to ask what help they currently need and whether they take volunteers your age.",
    address: "621B Eagle Rock Avenue",
    city: "Roseland",
    county: "Essex",
    cause_areas: ["Environment"],
    minimum_age: 14,
    hour_eligible: true,
    currently_accepting: true,
    urgent_need: false,
    contact_name: "",
    contact_email: "",
    contact_phone: "973-228-8776",
    signup_url: "https://www.essexcountynj.org/environmental-center/",
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
