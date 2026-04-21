export const ADMIN_EMAILS = [
  "admin@creatorlens.io",
  "lukas@hertweck.de",
  "founder@creatorlens.io",
  "lukashertweck@icloud.com",
];

export const PLANS = {
  starter: {
    name: "Starter",
    price: "€9",
    description: "5 analyses/month · 2 competitors",
  },
  pro: {
    name: "Pro",
    price: "€29",
    description: "Unlimited · All platforms · Calendar",
  },
  agency: {
    name: "Agency",
    price: "€79",
    description: "10 accounts · White-label · API",
  },
} as const;

export type PlanKey = keyof typeof PLANS;
