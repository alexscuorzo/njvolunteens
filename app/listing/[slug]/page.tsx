import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { HourEligibilityBadge } from "@/components/ListingCard";
import { formatVerifiedDate, getListingBySlug, isDbConfigured } from "@/lib/listings";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  if (!isDbConfigured()) return {};
  const listing = await getListingBySlug(slug);
  if (!listing) return {};
  return {
    title: `${listing.org_name} — volunteer in ${listing.county} County`,
    description: listing.description.slice(0, 160),
  };
}

export default async function ListingPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!isDbConfigured()) notFound();
  const listing = await getListingBySlug(slug);
  if (!listing) notFound();

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <Link href="/browse" className="text-sm text-emerald-700 hover:underline">
        ← Back to browse
      </Link>

      <div className="mt-4 bg-white border border-stone-200 rounded-xl p-6">
        <div className="flex flex-wrap items-center gap-2">
          {listing.urgent_need && (
            <span className="inline-flex items-center rounded-full bg-red-100 text-red-700 px-2.5 py-0.5 text-xs font-semibold">
              Urgent need
            </span>
          )}
          <HourEligibilityBadge eligible={listing.hour_eligible} />
          <span
            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
              listing.currently_accepting
                ? "bg-emerald-100 text-emerald-800"
                : "bg-stone-100 text-stone-600"
            }`}
          >
            {listing.currently_accepting
              ? "Currently accepting volunteers"
              : "Not currently accepting"}
          </span>
        </div>

        <h1 className="mt-3 text-2xl font-bold text-stone-900">{listing.org_name}</h1>
        <p className="mt-1 text-sm text-stone-500">
          {listing.address ? `${listing.address}, ` : ""}
          {listing.city ? `${listing.city}, ` : ""}
          {listing.county} County · Ages {listing.minimum_age}+
        </p>

        <p className="mt-4 text-stone-700 whitespace-pre-line">{listing.description}</p>

        <div className="mt-4 flex flex-wrap gap-2">
          {listing.cause_areas.map((cause) => (
            <Link
              key={cause}
              href={`/browse?cause=${encodeURIComponent(cause)}`}
              className="bg-stone-100 rounded-full px-3 py-1 text-xs text-stone-600 hover:bg-emerald-100 hover:text-emerald-800"
            >
              {cause}
            </Link>
          ))}
        </div>

        {!listing.hour_eligible && (
          <div className="mt-4 bg-amber-50 border border-amber-200 rounded-lg p-3 text-sm text-amber-900">
            This is a civic engagement opportunity. Most NJ school districts do{" "}
            <strong>not</strong> count political or advocacy volunteering toward
            community service hour requirements.{" "}
            <Link href="/resources" className="underline">
              How hour verification works
            </Link>
          </div>
        )}

        <div className="mt-6 border-t border-stone-100 pt-4">
          {listing.signup_url && (
            <a
              href={listing.signup_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-emerald-600 text-white font-semibold px-5 py-2.5 rounded-lg hover:bg-emerald-700"
            >
              Sign up to volunteer →
            </a>
          )}
          <div className="mt-3 text-sm text-stone-600 space-y-1">
            {listing.contact_name && <p>Contact: {listing.contact_name}</p>}
            <p>
              Email:{" "}
              <a href={`mailto:${listing.contact_email}`} className="text-emerald-700 hover:underline">
                {listing.contact_email}
              </a>
            </p>
            {listing.contact_phone && <p>Phone: {listing.contact_phone}</p>}
          </div>
        </div>

        <p className="mt-6 text-xs text-stone-400">
          Last verified by the organization on {formatVerifiedDate(listing.last_verified_at)}.
          Something out of date?{" "}
          <a
            href={`mailto:hello@njvolunteens.org?subject=Listing issue: ${encodeURIComponent(listing.org_name)}`}
            className="underline"
          >
            Report a problem
          </a>
          .
        </p>
      </div>
    </div>
  );
}
