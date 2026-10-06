import Link from "next/link";
import { NJ_COUNTIES, CAUSE_AREAS } from "@/lib/constants";

export default function HomePage() {
  return (
    <div>
      <section className="relative isolate bg-emerald-800 text-white overflow-hidden">
        {/*
          Photo sits behind the hero. It is a bright image, so the green wash
          and the left-to-right darkening are what keep the white headline
          readable — without them the text disappears into the sky.
        */}
        <img
          src="/hero.jpg"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 -z-20 h-full w-full object-cover"
        />
        {/* Light green tint for brand colour, kept weak so the photo reads. */}
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-emerald-900/40"
        />
        {/* Darkening only where the text sits, so contrast survives without
            flattening the whole image. */}
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-gradient-to-b from-emerald-950/70 via-emerald-950/40 to-transparent sm:bg-gradient-to-r sm:from-emerald-950/80 sm:via-emerald-950/40 sm:to-transparent"
        />
        <div className="relative max-w-5xl mx-auto px-4 py-14 sm:py-20">
          <h1 className="text-3xl sm:text-5xl font-bold max-w-2xl leading-tight [text-shadow:0_2px_16px_rgb(0_0_0_/_0.45)]">
            Volunteer opportunities for NJ high school students
          </h1>
          <p className="mt-4 text-white text-lg max-w-xl [text-shadow:0_1px_10px_rgb(0_0_0_/_0.5)]">
            Find organizations near you that need help — and know up front
            whether the hours count toward your school&apos;s service requirement.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <Link
              href="/browse"
              className="bg-white text-emerald-800 font-semibold px-6 py-3 rounded-lg text-center hover:bg-emerald-50"
            >
              Find opportunities
            </Link>
            <Link
              href="/list-your-organization"
              className="border border-white/70 bg-emerald-950/30 backdrop-blur-sm text-white font-semibold px-6 py-3 rounded-lg text-center hover:bg-emerald-950/50"
            >
              List your organization — free
            </Link>
          </div>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 py-12">
        <h2 className="text-xl font-bold text-stone-800">Browse by county</h2>
        <div className="mt-4 flex flex-wrap gap-2">
          {NJ_COUNTIES.map((county) => (
            <Link
              key={county}
              href={`/browse?county=${encodeURIComponent(county)}`}
              className="bg-white border border-stone-200 rounded-full px-4 py-1.5 text-sm text-stone-700 hover:border-emerald-500 hover:text-emerald-700"
            >
              {county}
            </Link>
          ))}
        </div>

        <h2 className="text-xl font-bold text-stone-800 mt-10">Browse by cause</h2>
        <div className="mt-4 flex flex-wrap gap-2">
          {CAUSE_AREAS.map((cause) => (
            <Link
              key={cause}
              href={`/browse?cause=${encodeURIComponent(cause)}`}
              className="bg-white border border-stone-200 rounded-full px-4 py-1.5 text-sm text-stone-700 hover:border-emerald-500 hover:text-emerald-700"
            >
              {cause}
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-white border-y border-stone-200">
        <div className="max-w-5xl mx-auto px-4 py-12 grid sm:grid-cols-3 gap-8">
          <div>
            <h3 className="font-semibold text-stone-800">Verified &amp; current</h3>
            <p className="mt-1 text-sm text-stone-600">
              Every listing shows when it was last verified, and organizations
              keep their own info up to date.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-stone-800">Hour-eligibility, up front</h3>
            <p className="mt-1 text-sm text-stone-600">
              Listings are clearly tagged when they count for school service
              hours — including civic and political opportunities that
              usually don&apos;t.{" "}
              <Link href="/resources" className="text-emerald-700 underline">
                Learn how verification works.
              </Link>
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-stone-800">Built for teens</h3>
            <p className="mt-1 text-sm text-stone-600">
              Filter by your age, county, and interests. No account needed —
              just find a cause and sign up.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
