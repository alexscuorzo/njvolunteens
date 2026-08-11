export type ListingStatus = "pending" | "approved" | "archived";

export interface Listing {
  id: string;
  slug: string;
  org_name: string;
  description: string;
  address: string | null;
  city: string | null;
  county: string;
  cause_areas: string[];
  minimum_age: number;
  hour_eligible: boolean;
  currently_accepting: boolean;
  urgent_need: boolean;
  contact_name: string | null;
  contact_email: string;
  contact_phone: string | null;
  signup_url: string | null;
  edit_token: string;
  status: ListingStatus;
  last_verified_at: string;
  created_at: string;
  updated_at: string;
}

/** Fields an organization fills in when submitting or editing a listing. */
export interface ListingInput {
  org_name: string;
  description: string;
  address: string;
  city: string;
  county: string;
  cause_areas: string[];
  minimum_age: number;
  hour_eligible: boolean;
  currently_accepting: boolean;
  urgent_need: boolean;
  contact_name: string;
  contact_email: string;
  contact_phone: string;
  signup_url: string;
}
