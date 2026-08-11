import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import FilterBar from "@/components/FilterBar";
import ListingCard from "@/components/ListingCard";
import { getApprovedListings, isDbConfigured } from "@/lib/listings";
import type { Listing } from "@/lib/types";

export const metadata: Metadata = {
  title: "Browse opportunities",
};

export default async function BrowsePage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const county = typeof params.county === "string" ? params.county : undefined;
  const cause = typeof params.cause === "string" ? params.cause : undefined;
  const age =
    typeof params.age === "string" && !Number.isNaN(Number(params.age))
      ? Number(params.age)
      : undefined;

  let listings: Listing[] = [];
  let state: "ok" | "unconfigured" | "failed" = "ok";
  if (!isDbConfigured()) {
    state = "unconfigured";
  } else {
    try {
      listings = await getApprovedListings({
        county,
        cause,
        age,
        hourEligible: params.hours === "1",
        acceptingOnly: params.accepting === "1",
      });
    } catch (err) {
      console.error("Browse query failed:", err);
      state = "failed";
    }
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-stone-900">
        {county ? `Volunteer opportunities in ${county} County` : "Browse opportunities"}
      </h1>
      <div className="mt-4">
        <Suspense>
          <FilterBar />
        </Suspense>
      </div>

      {state === "unconfigured" ? (
        <div className="mt-8 bg-amber-50 border border-amber-200 rounded-xl p-6 text-amber-900 text-sm">
          The listings database isn&apos;t connected yet. Once Supabase is set
          up (see <code>.env.local.example</code>), listings will appear here.
        </div>
      ) : state === "failed" ? (
        <div className="mt-8 bg-red-50 border border-red-200 rounded-xl p-6 text-red-900 text-sm">
          <p className="font-semibold">We couldn&apos;t load listings right now.</p>
          <p className="mt-1">
            This is a problem on our end, not yours — please try again in a few
            minutes. (Developers: the database is configured but the query
            failed; check the server logs.)
          </p>
        </div>
      ) : listings.length === 0 ? (
        <div className="mt-8 bg-white border border-stone-200 rounded-xl p-8 text-center">
          <p className="text-stone-700 font-medium">No opportunities match those filters yet.</p>
          <p className="mt-1 text-sm text-stone-500">
            Try removing a filter — or if you know an organization that should
            be here,{" "}
            <Link href="/list-your-organization" className="text-emerald-700 underline">
              invite them to list themselves
            </Link>
            .
          </p>
        </div>
      ) : (
        <>
          <p className="mt-6 text-sm text-stone-500">
            {listings.length} {listings.length === 1 ? "opportunity" : "opportunities"}
          </p>
          <div className="mt-3 grid gap-4 sm:grid-cols-2">
            {listings.map((listing) => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
