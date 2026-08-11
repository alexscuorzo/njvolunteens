import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ListingForm from "@/components/ListingForm";
import { formatVerifiedDate, getListingByToken, isDbConfigured } from "@/lib/listings";

export const metadata: Metadata = {
  title: "Edit your listing",
  robots: { index: false, follow: false },
};

export default async function EditListingPage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;
  if (!isDbConfigured()) notFound();
  const listing = await getListingByToken(token);
  if (!listing) notFound();

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-stone-900">Edit: {listing.org_name}</h1>
      <p className="mt-2 text-stone-600 text-sm">
        Last verified {formatVerifiedDate(listing.last_verified_at)}
        {listing.status === "pending" && " · Pending review — not public yet"}
        {listing.status === "archived" && " · Archived — not currently public"}
        . Saving changes updates your &quot;last verified&quot; date, which helps
        students trust that your info is current.
      </p>
      <div className="mt-6 bg-white border border-stone-200 rounded-xl p-6">
        <ListingForm
          mode="edit"
          token={token}
          initial={{
            org_name: listing.org_name,
            description: listing.description,
            address: listing.address ?? "",
            city: listing.city ?? "",
            county: listing.county,
            cause_areas: listing.cause_areas,
            minimum_age: listing.minimum_age,
            hour_eligible: listing.hour_eligible,
            currently_accepting: listing.currently_accepting,
            urgent_need: listing.urgent_need,
            contact_name: listing.contact_name ?? "",
            contact_email: listing.contact_email,
            contact_phone: listing.contact_phone ?? "",
            signup_url: listing.signup_url ?? "",
          }}
        />
      </div>
    </div>
  );
}
