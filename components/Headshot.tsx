"use client";

import { useState } from "react";

/**
 * Shows /headshot.jpg once that file exists in /public. Until then it falls
 * back to a neutral monogram, so the page never renders a broken image.
 * To use a real photo: drop a square image at public/headshot.jpg.
 */
export default function Headshot({
  initials = "AS",
  alt = "Founder of NJVolunteens.org",
}: {
  initials?: string;
  alt?: string;
}) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        aria-hidden="true"
        className="h-28 w-28 sm:h-32 sm:w-32 shrink-0 rounded-full bg-emerald-100 border border-emerald-200 flex items-center justify-center"
      >
        <span className="text-2xl font-bold text-emerald-700">{initials}</span>
      </div>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/headshot.jpg"
      alt={alt}
      onError={() => setFailed(true)}
      className="h-28 w-28 sm:h-32 sm:w-32 shrink-0 rounded-full object-cover border border-stone-200"
    />
  );
}
