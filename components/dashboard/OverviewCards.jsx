import { stats } from "@/lib/mock-data";
import { ArrowUpRight, TrendingUp, Users, MessageCircle, Share2, Activity, Bell, Smartphone, Target } from "lucide-react";
import { cn } from "@/lib/utils";

const metrics = [
  { label: "Connected Apps", value: stats.connectedApps, change: "+2", trend: "up", icon: Smartphone },
  { label: "Alerts Today", value: stats.notificationsToday, change: "+12%", trend: "up", icon: Bell },
  { label: "Active Sessions", value: stats.activeSessions, change: "Stable", trend: "up", icon: Activity },
  { label: "Productivity", value: stats.productivityScore, change: "+5%", trend: "up", icon: Target },
];

export function OverviewCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {metrics.map((metric, index) => {
        const isPositive = metric.trend === "up";
        const Icon = metric.icon || TrendingUp;

        return (
          <div
            key={metric.label}
            className="group glass-panel rounded-2xl p-6 relative overflow-hidden transition-all hover:-translate-y-1 hover:shadow-soft hover:border-primary/30"
          >
            {/* Subtle background glow on hover */}
            <div className="absolute -inset-px bg-gradient-to-br from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl -z-10 blur-xl"></div>

            <div className="flex items-start justify-between mb-4">
              <div className="w-10 h-10 rounded-xl bg-surface-200 border border-glass-border flex items-center justify-center text-muted-foreground group-hover:text-primary group-hover:bg-primary/10 transition-colors">
                <Icon className="w-5 h-5" />
              </div>
              <div
                className={cn(
                  "flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-md border",
                  isPositive
                    ? "text-green-400 bg-green-400/10 border-green-400/20"
                    : "text-red-400 bg-red-400/10 border-red-400/20"
                )}
              >
                {isPositive && <ArrowUpRight className="w-3 h-3" />}
                {metric.change}
              </div>
            </div>

            <div>
              <p className="text-3xl font-black tracking-tight text-foreground mb-1 group-hover:glow-text transition-all duration-300">
                {metric.value}
              </p>
              <h3 className="text-sm font-medium text-muted-foreground">
                {metric.label}
              </h3>
            </div>

            {/* Decorative bottom line */}
            <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
          </div>
        );
      })}
    </div>
  );
}
