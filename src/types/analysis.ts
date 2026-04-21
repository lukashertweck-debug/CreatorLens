export interface SocialPost {
  id: string;
  caption: string;
  likes: number;
  comments: number;
  views?: number;
  shares?: number;
  date: string;
  type: "video" | "image" | "carousel" | "reel" | "tweet" | "thread" | "short";
  hashtags: string[];
  url?: string;
}

export interface ProfileData {
  handle: string;
  platform: string;
  followers?: number;
  bio?: string;
  posts: SocialPost[];
}

export interface AnalysisInput {
  platform: string;
  handle: string;
  niche?: string;
  manualPosts?: string;
  competitors: string[];
}

export interface ContentCalendarItem {
  week: number;
  topic: string;
  format: string;
  hook: string;
  rationale: string;
  priority: "high" | "medium" | "low";
}

export interface ImprovementItem {
  issue: string;
  action: string;
}

export interface CompetitorGap {
  competitor: string;
  gap: string;
  opportunity: string;
}

export interface ScoreBreakdown {
  postingConsistency: number;
  hookStrength: number;
  nicheDepth: number;
  engagementRate: number;
  contentVariety: number;
}

export interface ContentAnalysis {
  score: number;
  scoreBreakdown: ScoreBreakdown;
  summary: string;
  strengths: string[];
  improvements: ImprovementItem[];
  competitorGaps: CompetitorGap[];
  contentCalendar: ContentCalendarItem[];
  recommendedPostingFrequency: string;
  topHashtags: string[];
  dataSource: "scraped" | "manual" | "ai-inferred";
}

export interface SavedAnalysis {
  id: string;
  platform: string;
  handle: string;
  niche?: string;
  score: number;
  result: ContentAnalysis;
  createdAt: string;
}
