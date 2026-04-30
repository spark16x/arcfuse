import { stats } from "@/lib/mock-data";
import { Card, CardContent } from "@/components/ui/card";
import { Cable, BellRing, MonitorPlay, Zap } from "lucide-react";

export function OverviewCards() {
  const items = [
    { label: "Connected Apps", value: stats.connectedApps, icon: Cable, color: "text-blue-500", bg: "bg-blue-500/10" },
    { label: "Notifications Today", value: stats.notificationsToday, icon: BellRing, color: "text-purple-500", bg: "bg-purple-500/10" },
    { label: "Active Sessions", value: stats.activeSessions, icon: MonitorPlay, color: "text-green-500", bg: "bg-green-500/10" },
    { label: "Productivity Score", value: `${stats.productivityScore}%`, icon: Zap, color: "text-orange-500", bg: "bg-orange-500/10" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {items.map((item, i) => (
        <Card key={i} className="bg-surface-container/50 border-border/50 hover:bg-surface-container transition-colors">
          <CardContent className="p-6 flex items-center gap-4">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${item.bg}`}>
              <item.icon className={`w-6 h-6 ${item.color}`} />
            </div>
            <div>
              <p className="text-sm font-medium text-on-surface-variant">{item.label}</p>
              <h3 className="text-2xl font-bold text-on-surface">{item.value}</h3>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
