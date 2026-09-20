import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About",
  description:
    "Why NJVolunteens.org exists: a New Jersey high school student built it after sending countless cold emails that never got answered.",
};

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-2xl sm:text-3xl font-bold text-stone-900">
        Why this site exists
      </h1>

      <div className="mt-6 bg-white border border-stone-200 rounded-xl p-6 sm:p-8">
        <div className="space-y-5 text-stone-700 leading-relaxed">
          <p className="text-lg text-stone-800">
            Service matters to me. I&apos;ve been in the same boat as thousands
            of high school students, sending out countless cold emails and never
            getting a response. I saw a need and decided to fix it.
          </p>

          <p>
            I&apos;ve volunteered for both nonprofits and political campaigns. My
            peers kept asking me how I found this stuff and figured it out. A lot
            of students in New Jersey have service requirements, and some are
            interested in civic volunteering, but they don&apos;t know where to
            start. Meanwhile every nonprofit and every campaign is always looking
            for volunteers.
          </p>

          <p className="text-stone-900 font-medium">
            Two groups looking for each other with nowhere to meet.
          </p>

          <p>
            So I built NJVolunteens.org, a one stop shop where students can
            search by location and type of volunteering opportunity, and
            organizations can post what they need.
          </p>
        </div>

        <blockquote className="mt-6 border-l-4 border-emerald-500 pl-4 sm:pl-5">
          <p className="text-lg sm:text-xl font-semibold text-emerald-800">
            I created a volunteering Tinder.
          </p>
          <p className="mt-1 text-stone-600">
            Easier for students to find opportunities, easier for organizations
            to find volunteers, all in one place.
          </p>
        </blockquote>
      </div>

      <div className="mt-6 grid sm:grid-cols-2 gap-4">
        <Link
          href="/browse"
          className="bg-emerald-600 text-white font-semibold px-6 py-4 rounded-xl text-center hover:bg-emerald-700"
        >
          Find an opportunity →
        </Link>
        <Link
          href="/list-your-organization"
          className="bg-white border border-stone-200 text-stone-800 font-semibold px-6 py-4 rounded-xl text-center hover:border-emerald-500 hover:text-emerald-700"
        >
          List your organization — free
        </Link>
      </div>

      <div className="mt-6 bg-white border border-stone-200 rounded-xl p-6">
        <h2 className="font-semibold text-stone-900">How listings stay honest</h2>
        <p className="mt-2 text-sm text-stone-600 leading-relaxed">
          Every listing shows the minimum age, whether the hours count toward
          school service requirements, and the date it was last verified.
          Organizations keep their own listings current through a private edit
          link — no account needed.
        </p>
        <p className="mt-2 text-sm text-stone-600 leading-relaxed">
          Civic and political volunteering is listed here too, clearly tagged,
          because most NJ districts do not count it toward service hours and you
          deserve to know that before you show up.{" "}
          <Link href="/resources" className="text-emerald-700 underline">
            How hour verification works
          </Link>
        </p>
      </div>

      <p className="mt-6 text-sm text-stone-500">
        Know an organization that should be listed?{" "}
        <Link href="/list-your-organization" className="text-emerald-700 underline">
          Send them here
        </Link>{" "}
        — listing is free and takes a few minutes.
      </p>
    </div>
  );
}
