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
    <div className="flex h-screen bg-background overflow-hidden selection:bg-primary/20">
      <Sidebar className="hidden md:flex shrink-0 z-40" />

      <div className="flex-1 flex flex-col h-screen overflow-hidden relative">
        <TopBar />

        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8 custom-scrollbar relative z-10">
          <div className="max-w-7xl mx-auto space-y-6">

            <header className="mb-8">
              <h1 className="text-3xl font-black tracking-tight text-on-surface mb-2">
                Welcome back, {mockUser.name} 👋
              </h1>
              <p className="text-on-surface-variant">
                Here's what's happening across your connected platforms today.
              </p>
            </header>

            <OverviewCards />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <UnifiedFeed />
              </div>

              <div className="space-y-6">
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
