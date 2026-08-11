import { NJ_COUNTIES, CAUSE_AREAS } from "./constants";
import type { ListingInput } from "./types";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function parseListingInput(body: unknown): { input: ListingInput } | { error: string } {
  if (typeof body !== "object" || body === null) return { error: "Invalid request." };
  const b = body as Record<string, unknown>;

  const str = (key: string) => (typeof b[key] === "string" ? (b[key] as string).trim() : "");

  const org_name = str("org_name");
  const description = str("description");
  const county = str("county");
  const contact_email = str("contact_email");
  const cause_areas = Array.isArray(b.cause_areas)
    ? b.cause_areas.filter(
        (c): c is string => typeof c === "string" && (CAUSE_AREAS as readonly string[]).includes(c)
      )
    : [];
  const minimum_age = Number(b.minimum_age);
  const signup_url = str("signup_url");

  if (org_name.length < 2 || org_name.length > 120)
    return { error: "Organization name is required (2–120 characters)." };
  if (description.length < 30 || description.length > 2000)
    return { error: "Description is required (at least 30 characters) so students know what they'd be doing." };
  if (!(NJ_COUNTIES as readonly string[]).includes(county))
    return { error: "Please choose a New Jersey county." };
  if (cause_areas.length === 0) return { error: "Please choose at least one cause area." };
  if (!EMAIL_RE.test(contact_email)) return { error: "A valid contact email is required." };
  if (!Number.isInteger(minimum_age) || minimum_age < 5 || minimum_age > 21)
    return { error: "Minimum age must be between 5 and 21." };
  if (signup_url && !/^https?:\/\//.test(signup_url))
    return { error: "Sign-up link must start with http:// or https://." };

  return {
    input: {
      org_name,
      description,
      address: str("address"),
      city: str("city"),
      county,
      cause_areas,
      minimum_age,
      hour_eligible: Boolean(b.hour_eligible),
      currently_accepting: Boolean(b.currently_accepting),
      urgent_need: Boolean(b.urgent_need),
      contact_name: str("contact_name"),
      contact_email,
      contact_phone: str("contact_phone"),
      signup_url,
    },
  };
}

export function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);
}
