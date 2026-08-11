"use client";

import { useState } from "react";
import { NJ_COUNTIES, CAUSE_AREAS } from "@/lib/constants";
import type { ListingInput } from "@/lib/types";

const EMPTY: ListingInput = {
  org_name: "",
  description: "",
  address: "",
  city: "",
  county: "",
  cause_areas: [],
  minimum_age: 14,
  hour_eligible: true,
  currently_accepting: true,
  urgent_need: false,
  contact_name: "",
  contact_email: "",
  contact_phone: "",
  signup_url: "",
};

const inputClass =
  "mt-1 w-full rounded-lg border border-stone-300 bg-white px-3 py-2 text-sm text-stone-800 focus:border-emerald-500 focus:outline-none";
const labelClass = "block text-sm font-medium text-stone-700";

export default function ListingForm({
  mode,
  token,
  initial,
}: {
  mode: "create" | "edit";
  token?: string;
  initial?: Partial<ListingInput>;
}) {
  const [form, setForm] = useState<ListingInput>({ ...EMPTY, ...initial });
  const [honeypot, setHoneypot] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [editUrl, setEditUrl] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  function set<K extends keyof ListingInput>(key: K, value: ListingInput[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function toggleCause(cause: string) {
    setForm((f) => ({
      ...f,
      cause_areas: f.cause_areas.includes(cause)
        ? f.cause_areas.filter((c) => c !== cause)
        : [...f.cause_areas, cause],
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    setSaved(false);
    try {
      const res = await fetch(mode === "create" ? "/api/listings" : `/api/listings/${token}`, {
        method: mode === "create" ? "POST" : "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, website: honeypot }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Something went wrong. Please try again.");
      } else if (mode === "create") {
        setEditUrl(data.editUrl);
      } else {
        setSaved(true);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    } catch {
      setError("Something went wrong. Please check your connection and try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (editUrl) {
    return (
      <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6">
        <h2 className="text-lg font-bold text-emerald-900">Thanks — your listing is in!</h2>
        <p className="mt-2 text-sm text-emerald-900">
          It&apos;s now pending a quick review and will appear on the site once
          approved (usually within a couple of days).
        </p>
        <p className="mt-4 text-sm font-semibold text-emerald-900">
          Save this private edit link — it&apos;s the only way to update your listing later:
        </p>
        <p className="mt-2 bg-white border border-emerald-200 rounded-lg p-3 text-sm break-all font-mono">
          {editUrl}
        </p>
        <p className="mt-3 text-xs text-emerald-800">
          Bookmark it or email it to yourself. Anyone with this link can edit
          your listing, so don&apos;t share it publicly.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {saved && (
        <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 text-sm text-emerald-900">
          Changes saved — your listing&apos;s &quot;last verified&quot; date has
          been updated to today. Thanks for keeping it current!
        </div>
      )}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-sm text-red-800">
          {error}
        </div>
      )}

      <div>
        <label className={labelClass}>
          Organization name *
          <input
            className={inputClass}
            value={form.org_name}
            onChange={(e) => set("org_name", e.target.value)}
            required
            maxLength={120}
          />
        </label>
      </div>

      <div>
        <label className={labelClass}>
          What will volunteers do? *
          <textarea
            className={inputClass}
            rows={4}
            value={form.description}
            onChange={(e) => set("description", e.target.value)}
            required
            minLength={30}
            maxLength={2000}
            placeholder="Describe the volunteer work, typical schedule, and anything students should know."
          />
        </label>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <label className={labelClass}>
          County *
          <select
            className={inputClass}
            value={form.county}
            onChange={(e) => set("county", e.target.value)}
            required
          >
            <option value="">Choose a county…</option>
            {NJ_COUNTIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </label>
        <label className={labelClass}>
          City / town
          <input className={inputClass} value={form.city} onChange={(e) => set("city", e.target.value)} />
        </label>
      </div>

      <div>
        <label className={labelClass}>
          Street address
          <input
            className={inputClass}
            value={form.address}
            onChange={(e) => set("address", e.target.value)}
            placeholder="Optional — where volunteers show up"
          />
        </label>
      </div>

      <fieldset>
        <legend className={labelClass}>Cause areas * (choose all that apply)</legend>
        <div className="mt-2 flex flex-wrap gap-2">
          {CAUSE_AREAS.map((cause) => (
            <button
              type="button"
              key={cause}
              onClick={() => toggleCause(cause)}
              className={`rounded-full px-3 py-1.5 text-sm border ${
                form.cause_areas.includes(cause)
                  ? "bg-emerald-600 text-white border-emerald-600"
                  : "bg-white text-stone-700 border-stone-300 hover:border-emerald-500"
              }`}
            >
              {cause}
            </button>
          ))}
        </div>
      </fieldset>

      <div className="grid sm:grid-cols-2 gap-4">
        <label className={labelClass}>
          Minimum volunteer age *
          <input
            type="number"
            className={inputClass}
            min={5}
            max={21}
            value={form.minimum_age}
            onChange={(e) => set("minimum_age", Number(e.target.value))}
            required
          />
        </label>
        <label className={labelClass}>
          Sign-up link
          <input
            type="url"
            className={inputClass}
            value={form.signup_url}
            onChange={(e) => set("signup_url", e.target.value)}
            placeholder="https://…"
          />
        </label>
      </div>

      <div className="bg-stone-50 border border-stone-200 rounded-lg p-4 space-y-3">
        <label className="flex gap-3 text-sm text-stone-700">
          <input
            type="checkbox"
            className="accent-emerald-600 h-4 w-4 mt-0.5 shrink-0"
            checked={form.hour_eligible}
            onChange={(e) => set("hour_eligible", e.target.checked)}
          />
          <span>
            <strong>Counts for school service hours.</strong> Check this only if
            your organization can sign off on community service hour forms.
            Political campaign and advocacy work usually does <em>not</em> qualify —
            leave unchecked and it will be tagged &quot;civic engagement.&quot;
          </span>
        </label>
        <label className="flex gap-3 text-sm text-stone-700">
          <input
            type="checkbox"
            className="accent-emerald-600 h-4 w-4 mt-0.5 shrink-0"
            checked={form.currently_accepting}
            onChange={(e) => set("currently_accepting", e.target.checked)}
          />
          <span>
            <strong>Currently accepting volunteers.</strong> Uncheck if you&apos;re
            full right now — your listing stays visible but marked accordingly.
          </span>
        </label>
        <label className="flex gap-3 text-sm text-stone-700">
          <input
            type="checkbox"
            className="accent-emerald-600 h-4 w-4 mt-0.5 shrink-0"
            checked={form.urgent_need}
            onChange={(e) => set("urgent_need", e.target.checked)}
          />
          <span>
            <strong>Urgent need.</strong> We&apos;ll highlight your listing —
            use this when you need volunteers right away.
          </span>
        </label>
      </div>

      <div className="grid sm:grid-cols-3 gap-4">
        <label className={labelClass}>
          Contact name
          <input
            className={inputClass}
            value={form.contact_name}
            onChange={(e) => set("contact_name", e.target.value)}
          />
        </label>
        <label className={labelClass}>
          Contact email *
          <input
            type="email"
            className={inputClass}
            value={form.contact_email}
            onChange={(e) => set("contact_email", e.target.value)}
            required
          />
        </label>
        <label className={labelClass}>
          Phone
          <input
            type="tel"
            className={inputClass}
            value={form.contact_phone}
            onChange={(e) => set("contact_phone", e.target.value)}
          />
        </label>
      </div>

      {/* Honeypot — hidden from real users, bots fill it in. */}
      <div className="hidden" aria-hidden="true">
        <label>
          Website
          <input
            tabIndex={-1}
            autoComplete="off"
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
          />
        </label>
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="w-full sm:w-auto bg-emerald-600 text-white font-semibold px-8 py-3 rounded-lg hover:bg-emerald-700 disabled:opacity-50"
      >
        {submitting
          ? "Saving…"
          : mode === "create"
            ? "Submit listing"
            : "Save changes & mark verified"}
      </button>
    </form>
  );
}
