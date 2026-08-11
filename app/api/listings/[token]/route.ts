import { NextRequest, NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";
import { parseListingInput } from "@/lib/validate";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ token: string }> }
) {
  const { token } = await params;

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const parsed = parseListingInput(body);
  if ("error" in parsed) {
    return NextResponse.json({ error: parsed.error }, { status: 400 });
  }

  const supabase = getSupabase();
  const now = new Date().toISOString();
  const { data, error } = await supabase
    .from("listings")
    .update({ ...parsed.input, last_verified_at: now, updated_at: now })
    .eq("edit_token", token)
    .select("id")
    .maybeSingle();

  if (error) {
    console.error("Listing update failed:", error);
    return NextResponse.json(
      { error: "Something went wrong saving your changes. Please try again." },
      { status: 500 }
    );
  }
  if (!data) {
    return NextResponse.json({ error: "This edit link is not valid." }, { status: 404 });
  }

  return NextResponse.json({ ok: true });
}
