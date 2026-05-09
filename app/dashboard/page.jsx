"use client";

import { Sidebar } from "@/components/dashboard/Sidebar";
import { TopBar } from "@/components/dashboard/TopBar";
import { OverviewCards } from "@/components/dashboard/OverviewCards";
import { UnifiedFeed } from "@/components/dashboard/UnifiedFeed";
import { IntegrationsPanel } from "@/components/dashboard/IntegrationsPanel";
import { QuickActions } from "@/components/dashboard/QuickActions";
import { ActivityTimeline } from "@/components/dashboard/ActivityTimeline";
import { mockUser } from "@/lib/mock-data";

export default function DashboardPage() {
  return (
    <div className="flex h-screen bg-background overflow-hidden selection:bg-primary/20 text-foreground">
      <Sidebar className="hidden md:flex shrink-0 z-40" />

      <div className="flex-1 flex flex-col h-screen overflow-hidden relative">
        <TopBar />

        <main className="flex-1 overflow-y-auto p-4 md:p-8 lg:p-10 custom-scrollbar relative z-10">
          <div className="max-w-[1400px] mx-auto space-y-8">

            <header className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <h1 className="text-4xl font-extrabold tracking-tight text-foreground mb-2 flex items-center gap-3">
                  Welcome back, {mockUser.name} <span className="animate-float inline-block">✨</span>
                </h1>
                <p className="text-muted-foreground text-lg">
                  Here's what's happening across your connected platforms today.
                </p>
              </div>
              <div className="flex items-center gap-3">
                 <button className="px-4 py-2 rounded-full bg-surface-200 border border-glass-border text-sm font-medium hover:bg-surface-300 transition-colors">
                    Customize
                 </button>
                 <button className="px-4 py-2 rounded-full bg-primary/10 text-primary border border-primary/20 text-sm font-medium hover:bg-primary/20 hover:shadow-glow-primary transition-all duration-300">
                    Generate Report
                 </button>
              </div>
            </header>

            <OverviewCards />

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
              <div className="xl:col-span-2 space-y-8">
                <UnifiedFeed />
              </div>

              <div className="space-y-8">
                <IntegrationsPanel />
                <QuickActions />
                <ActivityTimeline />
              </div>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
}
