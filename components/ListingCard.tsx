import Link from "next/link";
import type { Listing } from "@/lib/types";
import { formatVerifiedDate } from "@/lib/listings";

export function HourEligibilityBadge({ eligible }: { eligible: boolean }) {
  return eligible ? (
    <span className="inline-flex items-center rounded-full bg-emerald-100 text-emerald-800 px-2.5 py-0.5 text-xs font-medium">
      ✓ Counts for service hours
    </span>
  ) : (
    <span className="inline-flex items-center rounded-full bg-amber-100 text-amber-800 px-2.5 py-0.5 text-xs font-medium">
      Civic engagement — not hour-eligible
    </span>
  );
}

export default function ListingCard({ listing }: { listing: Listing }) {
  return (
    <Link
      href={`/listing/${listing.slug}`}
      className="block bg-white border border-stone-200 rounded-xl p-4 hover:border-emerald-500 hover:shadow-sm transition"
    >
      <div className="flex flex-wrap items-center gap-2">
        {listing.urgent_need && (
          <span className="inline-flex items-center rounded-full bg-red-100 text-red-700 px-2.5 py-0.5 text-xs font-semibold">
            Urgent need
          </span>
        )}
        <HourEligibilityBadge eligible={listing.hour_eligible} />
        {!listing.currently_accepting && (
          <span className="inline-flex items-center rounded-full bg-stone-100 text-stone-600 px-2.5 py-0.5 text-xs font-medium">
            Not currently accepting
          </span>
        )}
      </div>
      <h3 className="mt-2 font-semibold text-stone-900">{listing.org_name}</h3>
      <p className="mt-1 text-sm text-stone-600 line-clamp-2">{listing.description}</p>
      <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-stone-500">
        <span>
          {listing.city ? `${listing.city}, ` : ""}
          {listing.county} County
        </span>
        <span>Ages {listing.minimum_age}+</span>
        <span>{listing.cause_areas.join(" · ")}</span>
        <span className="text-emerald-700">
          Verified {formatVerifiedDate(listing.last_verified_at)}
        </span>
      </div>
    </Link>
  );
}
