import { fetchProfile } from "@/lib/social/fetcher";
import { analyseProfile } from "@/lib/analysis";
import type { AnalysisInput } from "@/types/analysis";

export const maxDuration = 120;

function send(controller: ReadableStreamDefaultController, event: string, data: unknown) {
  const line = `data: ${JSON.stringify({ event, ...( typeof data === "object" ? data : { message: data }) })}\n\n`;
  controller.enqueue(new TextEncoder().encode(line));
}

export async function POST(request: Request) {
  const body: AnalysisInput = await request.json();
  const { platform, handle, niche, competitors, manualPosts } = body;

  if (!platform || !handle) {
    return new Response(JSON.stringify({ error: "platform and handle are required" }), { status: 400 });
  }

  const stream = new ReadableStream({
    async start(controller) {
      try {
        // Step 1: fetch posts
        send(controller, "progress", { step: "fetching", message: `Fetching posts from ${platform}…` });

        let profile = await fetchProfile(platform, handle);

        if (!profile || profile.posts.length === 0) {
          // Fall back to manual posts if provided
          if (manualPosts) {
            send(controller, "progress", { step: "manual", message: "Using manually provided posts…" });
            profile = {
              handle: handle.replace(/^@/, ""),
              platform,
              posts: manualPosts.split("\n\n").filter(Boolean).map((text, i) => ({
                id: String(i),
                caption: text,
                likes: 0,
                comments: 0,
                date: new Date().toISOString(),
                type: "image" as const,
                hashtags: text.match(/#\w+/g) ?? [],
              })),
            };
          } else {
            send(controller, "progress", { step: "inferred", message: "No live data — running AI inference…" });
            profile = { handle: handle.replace(/^@/, ""), platform, posts: [] };
          }
        }

        // Step 2: analyse
        send(controller, "progress", { step: "analyzing", message: "Running AI content analysis…" });

        const result = await analyseProfile(profile, competitors ?? [], niche);

        send(controller, "complete", {
          step: "complete",
          result,
          handle: profile.handle,
          platform,
          followers: profile.followers,
        });
      } catch (err) {
        send(controller, "error", { message: err instanceof Error ? err.message : "Analysis failed" });
      } finally {
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}
