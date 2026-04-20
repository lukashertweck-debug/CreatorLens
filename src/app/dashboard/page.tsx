import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { ADMIN_EMAILS } from "@/lib/stripe";
import DashboardClient from "./DashboardClient";

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const isAdmin = ADMIN_EMAILS.map(e => e.toLowerCase()).includes(user.email?.toLowerCase() ?? "");

  let plan: string | null = null;
  if (!isAdmin) {
    const { data: profile } = await supabase
      .from("profiles")
      .select("plan")
      .eq("id", user.id)
      .single();
    plan = profile?.plan ?? null;
  }

  return (
    <DashboardClient
      userEmail={user.email ?? ""}
      plan={isAdmin ? "pro" : (plan ?? "")}
      isAdmin={isAdmin}
      needsPaywall={!isAdmin && !plan}
    />
  );
}
