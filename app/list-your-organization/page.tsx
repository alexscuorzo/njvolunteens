import type { Metadata } from "next";
import ListingForm from "@/components/ListingForm";

export const metadata: Metadata = {
  title: "List your organization",
};

export default function ListYourOrganizationPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-stone-900">List your organization</h1>
      <p className="mt-2 text-stone-600">
        Free, no account needed. Fill this out and you&apos;ll get a private
        edit link to keep your listing current. New listings are reviewed
        before going live.
      </p>
      <div className="mt-6 bg-white border border-stone-200 rounded-xl p-6">
        <ListingForm mode="create" />
      </div>
    </div>
  );
}
