import { unifiedFeed } from "@/lib/mock-data";
import { Twitter, Linkedin, Github, MessageSquare, Heart, Repeat2, ExternalLink, Slack, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { memo, useState } from "react";

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

// ⚡ Bolt Optimization:
// Wrapped the UnifiedFeed component in React.memo().
// It imports its data directly and receives no props, making it a pure presentation component.
// Without memo, it would re-render its list every time DashboardPage updates.
// Expected Impact: Prevents O(N) map operations from running unnecessarily, significantly reducing main thread blocking during parent updates.
export const UnifiedFeed = memo(function UnifiedFeed({ feedItems = [], onLike, onComment, onRepost }) {
  const [filterPlatform, setFilterPlatform] = useState('all');
  const [isFilterDropdownOpen, setIsFilterDropdownOpen] = useState(false);

  const filteredFeed = filterPlatform === 'all'
    ? feedItems
    : feedItems.filter(item => item.platform === filterPlatform);

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
        
        {/* Filter Dropdown */}
        <div className="relative">
          <button 
            onClick={() => setIsFilterDropdownOpen(!isFilterDropdownOpen)}
            className="text-xs text-primary font-bold hover:text-primary-hover flex items-center gap-1 transition-colors bg-primary/10 border border-primary/20 px-3 py-2 rounded-full capitalize"
          >
            Filter: {filterPlatform === 'all' ? 'All Platforms' : filterPlatform} <span className="material-symbols-outlined text-sm">tune</span>
          </button>
          
          {isFilterDropdownOpen && (
            <div className="absolute right-0 mt-2 w-40 glass-panel-heavy rounded-xl p-2 border border-glass-border shadow-xl z-50 animate-in fade-in slide-in-from-top-1 duration-150">
              {['all', 'x', 'linkedin', 'slack', 'discord', 'github'].map(p => (
                <button
                  key={p}
                  onClick={() => { setFilterPlatform(p); setIsFilterDropdownOpen(false); }}
                  className={cn(
                    "w-full text-left px-3 py-1.5 rounded-lg text-xs font-semibold hover:bg-surface-200 capitalize",
                    filterPlatform === p ? "text-primary bg-primary/10" : "text-muted-foreground"
                  )}
                >
                  {p === 'all' ? 'All Platforms' : p === 'x' ? 'X (Twitter)' : p}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="space-y-4 flex-1">
        {filteredFeed.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-10 border border-dashed border-glass-border rounded-2xl">
            No updates on this platform filter
          </p>
        ) : (
          filteredFeed.map((activity, index) => {
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

                    {activity.comments && activity.comments.length > 0 && (
                      <div className="mt-3 pl-3 border-l-2 border-primary/20 space-y-2 mb-3">
                        {activity.comments.map((c, i) => (
                          <div key={i} className="text-xs">
                            <span className="font-bold text-foreground mr-1">{c.user}:</span>
                            <span className="text-muted-foreground">{c.text}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    <div className="flex items-center gap-4 text-xs font-medium text-muted-foreground mt-4 pt-4 border-t border-glass-border">
                      <button
                        onClick={() => onLike?.(activity.id)}
                        className={cn(
                          "flex items-center gap-1.5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded px-1 py-0.5",
                          activity.liked ? "text-red-500" : "hover:text-primary"
                        )}
                        aria-label={`Like from ${activity.user}`}
                      >
                        <Heart className={cn("w-4 h-4", activity.liked && "fill-red-500 text-red-500")} />
                        <span>{activity.likes}</span>
                      </button>
                      <button
                        onClick={() => onComment?.(activity.id)}
                        className="flex items-center gap-1.5 hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded px-1 py-0.5"
                        aria-label={`Comment on post from ${activity.user}`}
                      >
                        <MessageSquare className="w-4 h-4" />
                        <span>{activity.commentsCount}</span>
                      </button>
                      <button
                        onClick={() => onRepost?.(activity.id)}
                        className={cn(
                          "flex items-center gap-1.5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded px-1 py-0.5",
                          activity.reposted ? "text-green-500" : "hover:text-primary"
                        )}
                        aria-label={`Repost post from ${activity.user}`}
                      >
                        <Repeat2 className="w-4 h-4" />
                        <span>{activity.repostsCount}</span>
                      </button>
                      <button
                        className="ml-auto opacity-0 group-hover:opacity-100 focus-visible:opacity-100 flex items-center gap-1 hover:text-foreground transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded px-2 py-0.5"
                        aria-label={`Open post from ${activity.user}`}
                      >
                        Open <ExternalLink className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      <button className="w-full mt-6 py-3 rounded-xl border border-glass-border text-sm font-semibold text-foreground hover:bg-surface-200 transition-colors">
        Load More Activity
      </button>
    </div>
  );
});
