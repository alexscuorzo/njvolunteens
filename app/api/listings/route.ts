import { randomBytes } from "crypto";
import { NextRequest, NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";
import { parseListingInput, slugify } from "@/lib/validate";

// Simple in-memory rate limit: 5 submissions per IP per hour. Resets on
// server restart, which is acceptable for a spam speed bump.
const submissions = new Map<string, number[]>();
const WINDOW_MS = 60 * 60 * 1000;
const MAX_PER_WINDOW = 5;

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (submissions.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  if (recent.length >= MAX_PER_WINDOW) return true;
  recent.push(now);
  submissions.set(ip, recent);
  return false;
}

export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  // Honeypot: real users never see this field. Pretend success for bots.
  if ((body as Record<string, unknown>)?.website) {
    return NextResponse.json({ ok: true });
  }

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (rateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many submissions from this connection. Please try again later." },
      { status: 429 }
    );
  }

  const parsed = parseListingInput(body);
  if ("error" in parsed) {
    return NextResponse.json({ error: parsed.error }, { status: 400 });
  }

  const supabase = getSupabase();
  const edit_token = randomBytes(24).toString("base64url");
  const baseSlug = slugify(parsed.input.org_name) || "organization";

  // Retry with a random suffix if the slug is already taken.
  for (let attempt = 0; attempt < 3; attempt++) {
    const slug =
      attempt === 0 ? baseSlug : `${baseSlug}-${randomBytes(2).toString("hex")}`;
    const { error } = await supabase
      .from("listings")
      .insert({ ...parsed.input, slug, edit_token, status: "pending" });

    if (!error) {
      const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
      return NextResponse.json({ ok: true, editUrl: `${siteUrl}/edit/${edit_token}` });
    }
    if (error.code !== "23505") {
      console.error("Listing insert failed:", error);
      return NextResponse.json(
        { error: "Something went wrong saving your listing. Please try again." },
        { status: 500 }
      );
    }
  }

  return NextResponse.json(
    { error: "Something went wrong saving your listing. Please try again." },
    { status: 500 }
  );
}
