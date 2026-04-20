export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return <div style={{ display: "flex", minHeight: "100vh" }}>{children}</div>;
}
