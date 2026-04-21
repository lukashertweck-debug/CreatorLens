import type { ProfileData, SocialPost } from "@/types/analysis";

const PLATFORM_ACTORS: Record<string, string> = {
  instagram: "apify/instagram-scraper",
  tiktok: "clockworks/free-tiktok-scraper",
  twitter: "quacker/twitter-scraper",
  facebook: "apify/facebook-pages-scraper",
};

function normaliseInstagramPost(raw: Record<string, unknown>): SocialPost {
  const caption = (raw.caption as string) ?? "";
  const hashtags = caption.match(/#\w+/g) ?? (raw.hashtags as string[]) ?? [];
  return {
    id: (raw.id as string) ?? (raw.shortCode as string) ?? String(Math.random()),
    caption,
    likes: (raw.likesCount as number) ?? 0,
    comments: (raw.commentsCount as number) ?? 0,
    views: (raw.videoViewCount as number) ?? undefined,
    date: (raw.timestamp as string) ?? new Date().toISOString(),
    type: (raw.type as string)?.toLowerCase().includes("video") ? "reel"
      : (raw.type as string)?.toLowerCase().includes("sidecar") ? "carousel"
      : "image",
    hashtags: Array.isArray(hashtags) ? hashtags.slice(0, 10) : [],
    url: (raw.url as string) ?? undefined,
  };
}

function normaliseTikTokPost(raw: Record<string, unknown>): SocialPost {
  const desc = (raw.text as string) ?? (raw.desc as string) ?? "";
  return {
    id: (raw.id as string) ?? String(Math.random()),
    caption: desc,
    likes: (raw.diggCount as number) ?? (raw.likes as number) ?? 0,
    comments: (raw.commentCount as number) ?? 0,
    views: (raw.playCount as number) ?? undefined,
    shares: (raw.shareCount as number) ?? undefined,
    date: raw.createTime
      ? new Date((raw.createTime as number) * 1000).toISOString()
      : new Date().toISOString(),
    type: "video",
    hashtags: desc.match(/#\w+/g) ?? [],
    url: (raw.webVideoUrl as string) ?? undefined,
  };
}

function normaliseTwitterPost(raw: Record<string, unknown>): SocialPost {
  const text = (raw.full_text as string) ?? (raw.text as string) ?? "";
  return {
    id: (raw.id_str as string) ?? String(Math.random()),
    caption: text,
    likes: (raw.favorite_count as number) ?? 0,
    comments: (raw.reply_count as number) ?? 0,
    views: (raw.view_count as number) ?? undefined,
    shares: (raw.retweet_count as number) ?? undefined,
    date: (raw.created_at as string) ?? new Date().toISOString(),
    type: text.length > 280 ? "thread" : "tweet",
    hashtags: ((raw.entities as Record<string, unknown>)?.hashtags as Array<{ text: string }>)
      ?.map((h) => `#${h.text}`) ?? text.match(/#\w+/g) ?? [],
    url: undefined,
  };
}

function normaliseFacebookPost(raw: Record<string, unknown>): SocialPost {
  return {
    id: (raw.id as string) ?? String(Math.random()),
    caption: (raw.text as string) ?? "",
    likes: (raw.likes as number) ?? 0,
    comments: (raw.comments as number) ?? 0,
    views: (raw.videoViews as number) ?? undefined,
    date: (raw.time as string) ?? new Date().toISOString(),
    type: raw.videoUrl ? "video" : "image",
    hashtags: ((raw.text as string) ?? "").match(/#\w+/g) ?? [],
    url: (raw.url as string) ?? undefined,
  };
}

async function fetchWithApify(
  platform: string,
  handle: string
): Promise<ProfileData | null> {
  const token = process.env.APIFY_API_TOKEN;
  if (!token) return null;

  // Dynamic import to avoid module-level crash if not installed
  let ApifyClient: typeof import("apify-client").ApifyClient;
  try {
    ApifyClient = (await import("apify-client")).ApifyClient;
  } catch {
    return null;
  }

  const client = new ApifyClient({ token });
  const actorId = PLATFORM_ACTORS[platform.toLowerCase()];
  if (!actorId) return null;

  const cleanHandle = handle.replace(/^@/, "");

  const inputByPlatform: Record<string, Record<string, unknown>> = {
    instagram: {
      directUrls: [`https://www.instagram.com/${cleanHandle}/`],
      resultsType: "posts",
      resultsLimit: 25,
      addParentData: false,
    },
    tiktok: {
      profiles: [`https://www.tiktok.com/@${cleanHandle}`],
      resultsPerPage: 25,
      shouldDownloadVideos: false,
      shouldDownloadCovers: false,
    },
    twitter: {
      searchTerms: [`from:${cleanHandle}`],
      maxItems: 50,
      addUserInfo: true,
    },
    facebook: {
      startUrls: [{ url: `https://www.facebook.com/${cleanHandle}` }],
      maxPosts: 25,
    },
  };

  try {
    const run = await client.actor(actorId).call(inputByPlatform[platform.toLowerCase()]);
    const { items } = await client.dataset(run.defaultDatasetId).listItems({ limit: 30 });

    const normalisers: Record<string, (r: Record<string, unknown>) => SocialPost> = {
      instagram: normaliseInstagramPost,
      tiktok: normaliseTikTokPost,
      twitter: normaliseTwitterPost,
      facebook: normaliseFacebookPost,
    };

    const normalise = normalisers[platform.toLowerCase()] ?? normaliseInstagramPost;
    const posts = (items as Array<Record<string, unknown>>).map(normalise).filter((p) => p.caption);

    // Try to grab follower count from first item
    const first = items[0] as Record<string, unknown>;
    const followers =
      (first?.followersCount as number) ??
      (first?.followers_count as number) ??
      (first?.authorMeta as Record<string, unknown>)?.fans as number ??
      undefined;

    return { handle: cleanHandle, platform, followers, posts };
  } catch (err) {
    console.error(`Apify fetch failed for ${platform}/@${cleanHandle}:`, err);
    return null;
  }
}

export async function fetchProfile(
  platform: string,
  handle: string
): Promise<ProfileData | null> {
  return fetchWithApify(platform, handle);
}

export function formatPostsForPrompt(profile: ProfileData): string {
  if (!profile.posts.length) return "No posts available.";

  return profile.posts
    .slice(0, 20)
    .map(
      (p, i) =>
        `Post ${i + 1} [${p.type.toUpperCase()}] (${new Date(p.date).toLocaleDateString("en-GB")})
Caption: "${p.caption.slice(0, 280).replace(/\n/g, " ")}"
Engagement: ${p.likes} likes, ${p.comments} comments${p.views ? `, ${p.views.toLocaleString()} views` : ""}
Hashtags: ${p.hashtags.slice(0, 8).join(" ") || "none"}`
    )
    .join("\n\n");
}
