import { NextResponse } from "next/server";
import type { SavedAnalysis } from "@/types/analysis";

async function getSupabase() {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) return null;
  const { createServerClient } = await import("@supabase/ssr");
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY,
    { cookies: { getAll: () => [], setAll: () => {} } }
  );
}

export async function POST(request: Request) {
  const body: Omit<SavedAnalysis, "id" | "createdAt"> = await request.json();
  const supabase = await getSupabase();

  if (!supabase) {
    // No DB configured — return a fake saved ID for preview mode
    return NextResponse.json({ id: `local-${Date.now()}`, ...body, createdAt: new Date().toISOString() });
  }

  const { data, error } = await supabase
    .from("analyses")
    .insert({
      platform: body.platform,
      handle: body.handle,
      niche: body.niche ?? null,
      score: body.score,
      result: body.result,
    })
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function GET() {
  const supabase = await getSupabase();
  if (!supabase) return NextResponse.json([]);

  const { data, error } = await supabase
    .from("analyses")
    .select("id, platform, handle, niche, score, created_at")
    .order("created_at", { ascending: false })
    .limit(20);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data ?? []);
}
