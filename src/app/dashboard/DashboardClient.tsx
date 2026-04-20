"use client";

import { useState } from "react";
import Sidebar from "@/components/dashboard/Sidebar";
import MetricCards from "@/components/dashboard/MetricCards";
import QuickAnalyze from "@/components/dashboard/QuickAnalyze";
import RecentAnalyses from "@/components/dashboard/RecentAnalyses";
import CompetitorOverview from "@/components/dashboard/CompetitorOverview";
import TopicChecklist from "@/components/dashboard/TopicChecklist";
import Paywall from "@/components/dashboard/Paywall";
import NewAnalysisModal from "@/components/dashboard/NewAnalysisModal";

interface Props {
  userEmail: string;
  plan: string;
  isAdmin: boolean;
  needsPaywall: boolean;
}

export default function DashboardClient({ userEmail, plan, isAdmin, needsPaywall }: Props) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      {needsPaywall && <Paywall />}

      <Sidebar userEmail={userEmail} plan={plan} isAdmin={isAdmin} activePage="dashboard" />

      <div
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "2rem 2.5rem",
          maxWidth: "calc(100vw - var(--sidebar-w))",
          animation: "fadein 0.4s ease both",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "2rem" }}>
          <div style={{ fontFamily: "var(--serif)", fontSize: 28, fontWeight: 900, letterSpacing: "-1px" }}>
            Dashboard
          </div>
          <button
            onClick={() => setShowModal(true)}
            style={{
              background: "var(--ink)",
              color: "var(--bg)",
              border: "none",
              borderRadius: 8,
              padding: "10px 18px",
              fontSize: 13,
              fontWeight: 500,
              fontFamily: "var(--sans)",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: 6,
            }}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M7 1v12M1 7h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            New analysis
          </button>
        </div>

        <MetricCards />
        <QuickAnalyze onNewAnalysis={() => setShowModal(true)} />

        <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: "1.5rem" }} className="grid-cols-1 lg:grid-cols-[1fr_340px]">
          <div>
            <RecentAnalyses />
            <CompetitorOverview />
          </div>
          <TopicChecklist />
        </div>
      </div>

      {showModal && <NewAnalysisModal onClose={() => setShowModal(false)} />}
    </>
  );
}
