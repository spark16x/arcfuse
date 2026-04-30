import { integrations } from "@/lib/mock-data";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function IntegrationsPanel() {
  return (
    <Card className="col-span-full lg:col-span-1 bg-surface-container/30 border-border/50">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-bold">Integrations</CardTitle>
      </CardHeader>
      <CardContent className="p-4 pt-0 grid grid-cols-2 gap-3">
        {integrations.map((app) => (
          <div key={app.id} className="p-3 rounded-xl border border-border/50 bg-surface-container hover:bg-surface-container-high transition-colors flex flex-col items-center text-center gap-3">
            <div
              className="w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-sm"
              style={{ backgroundColor: app.color }}
            >
              <span className="material-symbols-outlined text-2xl">{app.icon}</span>
            </div>
            <div>
              <p className="text-sm font-semibold text-on-surface">{app.name}</p>
              <p className="text-[10px] uppercase font-bold tracking-wider text-on-surface-variant mt-1">
                {app.status === "connected" ? (
                  <span className="text-green-500">Connected</span>
                ) : (
                  <span>Disconnected</span>
                )}
              </p>
            </div>
            <Button
              variant={app.status === "connected" ? "outline" : "default"}
              size="sm"
              className="w-full text-xs h-8 rounded-lg"
            >
              {app.status === "connected" ? "Manage" : "Connect"}
            </Button>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
