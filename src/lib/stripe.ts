import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2026-03-25.dahlia",
});

export const PLANS = {
  starter: {
    name: "Starter",
    price: "€9",
    priceId: process.env.STRIPE_STARTER_PRICE_ID!,
    description: "5 analyses/month · 2 competitors",
  },
  pro: {
    name: "Pro",
    price: "€29",
    priceId: process.env.STRIPE_PRO_PRICE_ID!,
    description: "Unlimited · All platforms · Calendar",
  },
  agency: {
    name: "Agency",
    price: "€79",
    priceId: process.env.STRIPE_AGENCY_PRICE_ID!,
    description: "10 accounts · White-label · API",
  },
} as const;

export type PlanKey = keyof typeof PLANS;

export const ADMIN_EMAILS = [
  "admin@creatorlens.io",
  "lukas@hertweck.de",
  "founder@creatorlens.io",
  "lukashertweck@icloud.com",
];
