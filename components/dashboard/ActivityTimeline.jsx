import { activityTimeline } from "@/lib/mock-data";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export function ActivityTimeline() {
  return (
    <Card className="bg-surface-container/30 border-border/50 h-full">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-bold">Activity Log</CardTitle>
      </CardHeader>
      <CardContent className="px-6 pb-6">
        <div className="relative border-l-2 border-surface-container-high ml-3 space-y-6">
          {activityTimeline.map((item, i) => (
            <div key={item.id} className="relative pl-6">
              <div className="absolute -left-[11px] top-0 w-5 h-5 rounded-full bg-surface-container-high border-2 border-background flex items-center justify-center text-primary">
                <span className="material-symbols-outlined text-[10px]">{item.icon}</span>
              </div>
              <div className="flex flex-col gap-1">
                <p className="text-sm font-medium text-on-surface">{item.action}</p>
                <span className="text-xs text-on-surface-variant font-medium">{item.time}</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
