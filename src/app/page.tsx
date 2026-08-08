import { DashboardContent } from "@/components/dashboard/dashboard-content";
import { Header } from "@/components/dashboard/header";
import { Sidebar } from "@/components/dashboard/sidebar";
import { StatsCards } from "@/components/dashboard/stats-cards";

export default function Home() {
  return (
    <div className="flex min-h-screen bg-muted/20">
      <Sidebar />

      <div className="flex min-w-0 flex-1 flex-col">
        <Header />

        <main className="flex-1 space-y-6 p-4 md:p-8">
          <div>
            <p className="text-sm text-muted-foreground">
              Saturday, August 8, 2026
            </p>
            <h2 className="mt-1 text-2xl font-semibold tracking-tight">
              Your workspace at a glance
            </h2>
          </div>

          <StatsCards />

          <DashboardContent />
        </main>
      </div>
    </div>
  );
}