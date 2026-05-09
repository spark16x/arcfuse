import { Link2, Plus, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

const connectedServices = [
  { name: "Twitter", status: "active", icon: "X" },
  { name: "LinkedIn", status: "active", icon: "in" },
  { name: "GitHub", status: "syncing", icon: "gh" },
];

export function IntegrationsPanel() {
  return (
    <div className="glass-panel-heavy rounded-3xl p-6 border border-glass-border relative overflow-hidden group">
      {/* Decorative gradient blob */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>

      <div className="flex items-center justify-between mb-6 relative z-10">
        <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
          <Link2 className="w-5 h-5 text-primary" />
          Connections
        </h3>
        <button className="w-8 h-8 rounded-full bg-surface-200 flex items-center justify-center text-muted-foreground hover:bg-primary/20 hover:text-primary transition-colors">
          <Plus className="w-4 h-4" />
        </button>
      </div>

      <div className="space-y-3 relative z-10">
        {connectedServices.map((service) => (
          <div key={service.name} className="flex items-center justify-between p-3 rounded-xl bg-surface-100 border border-glass-border hover:border-primary/30 transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-surface-300 flex items-center justify-center font-bold text-xs">
                {service.icon}
              </div>
              <span className="text-sm font-medium text-foreground">{service.name}</span>
            </div>

            <div className="flex items-center gap-2">
              {service.status === "syncing" && (
                 <Sparkles className="w-3 h-3 text-primary animate-pulse" />
              )}
              <span className={cn(
                "w-2 h-2 rounded-full",
                service.status === "active" ? "bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]" : "bg-primary animate-pulse shadow-glow-primary"
              )}></span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
