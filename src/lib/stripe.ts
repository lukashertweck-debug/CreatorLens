import Stripe from "stripe";
import { PLANS, type PlanKey } from "./constants";

export { PLANS, type PlanKey };

let _stripe: Stripe | null = null;

export function getStripe(): Stripe {
  if (!_stripe) {
    if (!process.env.STRIPE_SECRET_KEY) {
      throw new Error("STRIPE_SECRET_KEY is not set");
    }
    _stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: "2026-03-25.dahlia",
    });
  }
  return _stripe;
}

export const STRIPE_PRICE_IDS: Record<PlanKey, string> = {
  starter: process.env.STRIPE_STARTER_PRICE_ID ?? "",
  pro: process.env.STRIPE_PRO_PRICE_ID ?? "",
  agency: process.env.STRIPE_AGENCY_PRICE_ID ?? "",
};
