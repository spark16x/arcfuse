import { unifiedFeed } from "@/lib/mock-data";
import { Twitter, Linkedin, Github, MessageSquare, Heart, Repeat2, ExternalLink, Slack, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const platformIcons = {
  x: Twitter,
  linkedin: Linkedin,
  github: Github,
  slack: Slack,
  discord: MessageCircle,
};

const platformColors = {
  x: "text-[#FAFAFA] bg-[#FAFAFA]/10",
  linkedin: "text-[#0A66C2] bg-[#0A66C2]/10",
  github: "text-[#2ea043] bg-[#2ea043]/10",
  slack: "text-[#E01E5A] bg-[#E01E5A]/10",
  discord: "text-[#5865F2] bg-[#5865F2]/10",
};

export function UnifiedFeed() {
  return (
    <div className="glass-panel-heavy rounded-3xl p-6 md:p-8 flex flex-col h-full">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-foreground flex items-center gap-2">
            Unified Stream
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
          </h2>
          <p className="text-sm text-muted-foreground mt-1">Real-time updates from your connected networks</p>
        </div>
        <button className="text-sm text-primary font-medium hover:text-primary-hover flex items-center gap-1 transition-colors">
          Filter <span className="material-symbols-outlined text-sm">tune</span>
        </button>
      </div>

      <div className="space-y-4 flex-1">
        {unifiedFeed.map((activity, index) => {
          const PlatformIcon = platformIcons[activity.platform] || MessageSquare;
          const platformStyle = platformColors[activity.platform] || "text-muted-foreground bg-surface-200";
          const stableIdHash = Math.abs(String(activity.id).split('').reduce((a, b) => a + b.charCodeAt(0), 0));

          return (
            <div
              key={activity.id}
              className="group p-5 rounded-2xl bg-surface-100/50 border border-glass-border hover:bg-surface-200/50 hover:border-primary/20 transition-all duration-300 relative overflow-hidden"
            >
               {/* Hover Accent Line */}
              <div className="absolute left-0 top-0 w-1 h-full bg-primary opacity-0 group-hover:opacity-100 transition-opacity"></div>

              <div className="flex gap-4">
                <div className="shrink-0">
                  <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center", platformStyle)}>
                    <PlatformIcon className="w-5 h-5" />
                  </div>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-sm font-semibold text-foreground truncate pr-4">
                      {activity.user}
                    </p>
                    <span className="text-xs font-medium text-muted-foreground whitespace-nowrap">
                      {activity.timestamp}
                    </span>
                  </div>

                  <p className="text-sm text-muted-foreground/90 leading-relaxed mb-3">
                    {activity.content}
                  </p>

                  <div className="flex items-center gap-4 text-xs font-medium text-muted-foreground mt-4 pt-4 border-t border-glass-border">
                    {/* Optimization: Used deterministic values based on ID instead of Math.random() to prevent hydration errors and UI jitter */}
                    <button className="flex items-center gap-1.5 hover:text-primary transition-colors">
                      <Heart className="w-4 h-4" />
                      <span>{(stableIdHash * 7) % 20}</span>
                    </button>
                    <button className="flex items-center gap-1.5 hover:text-primary transition-colors">
                      <MessageSquare className="w-4 h-4" />
                      <span>{(stableIdHash * 3) % 5}</span>
                    </button>
                    <button className="flex items-center gap-1.5 hover:text-primary transition-colors">
                      <Repeat2 className="w-4 h-4" />
                      <span>{(stableIdHash * 5) % 10}</span>
                    </button>
                    <button className="ml-auto opacity-0 group-hover:opacity-100 flex items-center gap-1 hover:text-foreground transition-all">
                      Open <ExternalLink className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <button className="w-full mt-6 py-3 rounded-xl border border-glass-border text-sm font-semibold text-foreground hover:bg-surface-200 transition-colors">
        Load More Activity
      </button>
    </div>
  );
}
