"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Shows /headshot.jpg once that file exists in /public, and falls back to a
 * monogram until then, so the page never renders a broken image.
 *
 * To use a real photo: drop a square image at public/headshot.jpg.
 *
 * The onError handler alone is not enough — when the file is missing, the
 * browser fires the error before React hydrates and the event is lost. The
 * effect re-checks naturalWidth on mount to catch that case.
 */
export default function Headshot({
  initials = "AS",
  alt = "Founder of NJVolunteens.org",
}: {
  initials?: string;
  alt?: string;
}) {
  const [failed, setFailed] = useState(false);
  const ref = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const img = ref.current;
    if (img && img.complete && img.naturalWidth === 0) setFailed(true);
  }, []);

  const box = "h-28 w-28 sm:h-32 sm:w-32 shrink-0 rounded-full";

  if (failed) {
    return (
      <div
        aria-hidden="true"
        className={`${box} bg-emerald-100 border border-emerald-200 flex items-center justify-center`}
      >
        <span className="text-2xl font-bold text-emerald-700">{initials}</span>
      </div>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      ref={ref}
      src="/headshot.jpg"
      alt={alt}
      onError={() => setFailed(true)}
      className={`${box} object-cover border border-stone-200 bg-stone-50`}
    />
  );
}
