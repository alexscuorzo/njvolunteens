"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { NJ_COUNTIES, CAUSE_AREAS } from "@/lib/constants";

const AGE_OPTIONS = [13, 14, 15, 16, 17, 18];

export default function FilterBar() {
  const router = useRouter();
  const searchParams = useSearchParams();

  function setParam(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.push(`/browse?${params.toString()}`);
  }

  const selectClass =
    "w-full rounded-lg border border-stone-300 bg-white px-3 py-2 text-sm text-stone-800 focus:border-emerald-500 focus:outline-none";

  return (
    <div className="bg-white border border-stone-200 rounded-xl p-4">
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        <label className="block">
          <span className="text-xs font-medium text-stone-500">County</span>
          <select
            className={selectClass}
            value={searchParams.get("county") ?? ""}
            onChange={(e) => setParam("county", e.target.value)}
          >
            <option value="">All counties</option>
            {NJ_COUNTIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className="text-xs font-medium text-stone-500">Cause</span>
          <select
            className={selectClass}
            value={searchParams.get("cause") ?? ""}
            onChange={(e) => setParam("cause", e.target.value)}
          >
            <option value="">All causes</option>
            {CAUSE_AREAS.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </label>
        <label className="block col-span-2 sm:col-span-1">
          <span className="text-xs font-medium text-stone-500">Your age</span>
          <select
            className={selectClass}
            value={searchParams.get("age") ?? ""}
            onChange={(e) => setParam("age", e.target.value)}
          >
            <option value="">Any age</option>
            {AGE_OPTIONS.map((a) => (
              <option key={a} value={a}>
                I&apos;m {a}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div className="mt-3 flex flex-wrap gap-x-6 gap-y-2 text-sm text-stone-700">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            className="accent-emerald-600 h-4 w-4"
            checked={searchParams.get("hours") === "1"}
            onChange={(e) => setParam("hours", e.target.checked ? "1" : "")}
          />
          Counts for service hours
        </label>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            className="accent-emerald-600 h-4 w-4"
            checked={searchParams.get("accepting") === "1"}
            onChange={(e) => setParam("accepting", e.target.checked ? "1" : "")}
          />
          Currently accepting volunteers
        </label>
      </div>
    </div>
  );
}
