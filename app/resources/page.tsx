import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "How NJ schools verify volunteer hours",
};

export default function ResourcesPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-stone-900">
        How NJ schools verify volunteer hours
      </h1>

      <div className="mt-6 space-y-6 text-stone-700">
        <section className="bg-white border border-stone-200 rounded-xl p-6">
          <h2 className="font-semibold text-stone-900">The short version</h2>
          <p className="mt-2 text-sm leading-relaxed">
            New Jersey doesn&apos;t have one statewide rule — each school
            district (and often each honor society or club) sets its own
            community service requirements. But the verification process is
            similar almost everywhere: you track your hours, and an adult
            supervisor at the organization signs off on them.
          </p>
        </section>

        <section className="bg-white border border-stone-200 rounded-xl p-6">
          <h2 className="font-semibold text-stone-900">What verification usually looks like</h2>
          <ol className="mt-2 text-sm leading-relaxed list-decimal pl-5 space-y-2">
            <li>
              <strong>Get the form first.</strong> Ask your school counselor,
              advisor, or club sponsor for the official service-hour form
              before you start volunteering.
            </li>
            <li>
              <strong>Log your hours as you go.</strong> Date, time in/out, and
              what you did. Don&apos;t reconstruct it from memory in June.
            </li>
            <li>
              <strong>Get a supervisor signature.</strong> The person signing
              must be an adult at the organization — not a parent, and not
              another student.
            </li>
            <li>
              <strong>Submit by your school&apos;s deadline.</strong> Many
              schools require forms within weeks of the service, not at the
              end of the year.
            </li>
          </ol>
        </section>

        <section className="bg-amber-50 border border-amber-200 rounded-xl p-6">
          <h2 className="font-semibold text-amber-900">
            Why political volunteering usually doesn&apos;t count
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-amber-900">
            Most NJ districts follow guidelines that exclude{" "}
            <strong>partisan political activity</strong> — campaign work,
            canvassing for a candidate, or advocacy for one side of an issue —
            from community service hours. The reasoning: service hours are
            meant to be nonpartisan community benefit.
          </p>
          <p className="mt-2 text-sm leading-relaxed text-amber-900">
            That work is still valuable civic engagement — it looks great on
            college applications and teaches you how government actually works.
            That&apos;s why we list it, clearly tagged{" "}
            <em>&quot;Civic engagement — not hour-eligible&quot;</em>, so you can
            choose it with your eyes open. Nonpartisan civic work (like helping
            at a library voter-registration drive or a town cleanup organized by
            your municipality) often <em>does</em> count — when in doubt, ask
            your counselor <strong>before</strong> you volunteer.
          </p>
        </section>

        <section className="bg-white border border-stone-200 rounded-xl p-6">
          <h2 className="font-semibold text-stone-900">Rules of thumb</h2>
          <ul className="mt-2 text-sm leading-relaxed list-disc pl-5 space-y-1">
            <li>Court-ordered service and paid work never count.</li>
            <li>Helping family, or service during class time, usually doesn&apos;t count.</li>
            <li>Religious organizations: worship activities generally don&apos;t count, but their community programs (food pantries, tutoring) usually do.</li>
            <li>When in doubt, your school counselor&apos;s answer is the one that matters — districts differ.</li>
          </ul>
        </section>

        <p className="text-sm text-stone-500">
          Ready to find something?{" "}
          <Link href="/browse?hours=1" className="text-emerald-700 underline">
            Browse hour-eligible opportunities
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
