import { PenSquare, Send, Zap } from "lucide-react";

export function QuickActions() {
  return (
    <div className="glass-panel-heavy rounded-3xl p-6 border border-glass-border">
      <h3 className="text-lg font-bold text-foreground mb-6 flex items-center gap-2">
        <Zap className="w-5 h-5 text-primary" />
        Quick Actions
      </h3>

      <div className="grid grid-cols-2 gap-3">
        <button className="flex flex-col items-center justify-center p-4 rounded-2xl bg-surface-100 border border-glass-border hover:bg-primary/10 hover:border-primary/30 transition-all group">
          <div className="w-10 h-10 rounded-full bg-surface-200 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
             <PenSquare className="w-5 h-5 text-primary" />
          </div>
          <span className="text-xs font-semibold text-foreground">Compose</span>
        </button>

        <button className="flex flex-col items-center justify-center p-4 rounded-2xl bg-surface-100 border border-glass-border hover:bg-primary/10 hover:border-primary/30 transition-all group">
          <div className="w-10 h-10 rounded-full bg-surface-200 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
             <Send className="w-5 h-5 text-primary" />
          </div>
          <span className="text-xs font-semibold text-foreground">Schedule</span>
        </button>
      </div>

      {/* AI Smart Suggestion */}
      <div className="mt-4 p-4 rounded-2xl bg-gradient-to-br from-primary/10 to-transparent border border-primary/20">
         <p className="text-xs font-medium text-primary mb-2 flex items-center gap-1">
            <span className="material-symbols-outlined text-sm">auto_awesome</span>
            AI Suggestion
         </p>
         <p className="text-sm text-foreground mb-3 leading-snug">"Best time to post on LinkedIn today is 2:00 PM EST."</p>
         <button className="text-xs font-bold bg-primary text-black px-3 py-1.5 rounded-lg hover:bg-primary-hover w-full transition-colors">
            Schedule Draft
         </button>
      </div>
    </div>
  );
}
