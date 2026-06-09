import { Link2, Plus, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

const getShortName = (id) => {
  if (id === 'x') return 'X';
  if (id === 'linkedin') return 'in';
  if (id === 'github') return 'gh';
  if (id === 'slack') return 'sl';
  if (id === 'figma') return 'fg';
  if (id === 'notion') return 'nt';
  return id.substring(0, 2);
};

export function IntegrationsPanel({ connections = [], onToggleConnection, setActiveView }) {
  // Render connected apps first
  const displayServices = [...connections]
    .sort((a, b) => (b.status === 'connected' ? 1 : 0) - (a.status === 'connected' ? 1 : 0))
    .slice(0, 4);

  return (
    <div className="glass-panel-heavy rounded-3xl p-6 border border-glass-border relative overflow-hidden group">
      {/* Decorative gradient blob */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>

      <div className="flex items-center justify-between mb-6 relative z-10">
        <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
          <Link2 className="w-5 h-5 text-primary" />
          Connections
        </h3>
        <button 
          onClick={() => setActiveView?.('integrations')}
          className="w-8 h-8 rounded-full bg-surface-200 flex items-center justify-center text-muted-foreground hover:bg-primary/20 hover:text-primary transition-colors"
          title="Manage Integrations"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>

      <div className="space-y-3 relative z-10">
        {displayServices.map((service) => (
          <div key={service.id} className="flex items-center justify-between p-3 rounded-xl bg-surface-100 border border-glass-border hover:border-primary/30 transition-colors">
            <div className="flex items-center gap-3">
              <div 
                className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs uppercase" 
                style={{ backgroundColor: `${service.color}15`, color: service.color }}
              >
                {getShortName(service.id)}
              </div>
              <span className="text-sm font-medium text-foreground">{service.name}</span>
            </div>

            <button 
              onClick={() => onToggleConnection?.(service.id)}
              className="flex items-center gap-2 hover:opacity-85 transition-opacity px-2 py-1 rounded hover:bg-surface-200"
              title={service.status === 'connected' ? 'Disconnect' : 'Connect'}
            >
              {service.status === "syncing" && (
                 <Sparkles className="w-3 h-3 text-primary animate-pulse" />
              )}
              <span className={cn(
                "w-2.5 h-2.5 rounded-full transition-all duration-300",
                service.status === "connected" 
                  ? "bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]" 
                  : "bg-surface-300 border border-muted"
              )}></span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
