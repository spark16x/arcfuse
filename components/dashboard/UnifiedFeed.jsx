import { unifiedFeed } from "@/lib/mock-data";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useState } from "react";
import { cn } from "@/lib/utils";

export function UnifiedFeed() {
  const [filter, setFilter] = useState("all");
  const tabs = ["all", "discord", "x", "slack", "github"];

  const filteredFeed = filter === "all"
    ? unifiedFeed
    : unifiedFeed.filter(item => item.platform === filter);

  return (
    <Card className="col-span-full lg:col-span-2 bg-surface-container/30 border-border/50">
      <CardHeader className="flex flex-row items-center justify-between pb-2 border-b border-border/50">
        <CardTitle className="text-lg font-bold">Unified Feed</CardTitle>
        <div className="flex gap-2">
          {tabs.map(tab => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={cn(
                "px-3 py-1.5 text-xs font-medium rounded-full capitalize transition-colors",
                filter === tab
                  ? "bg-primary text-on-primary"
                  : "bg-surface-container-high text-on-surface-variant hover:text-on-surface"
              )}
            >
              {tab}
            </button>
          ))}
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="flex flex-col max-h-[500px] overflow-y-auto custom-scrollbar">
          {filteredFeed.map((item) => (
            <div key={item.id} className="p-4 border-b border-border/50 hover:bg-surface-container-high/50 transition-colors flex gap-4">
              <div className="relative shrink-0">
                <img src={item.avatar} alt={item.user} className="w-10 h-10 rounded-full bg-surface-variant" />
                <div
                  className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center border-2 border-background"
                  style={{ backgroundColor: item.color }}
                >
                  <span className="material-symbols-outlined text-[10px] text-white leading-none">{item.platformIcon}</span>
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="text-sm font-semibold text-on-surface">{item.user}</h4>
                  <span className="text-xs text-on-surface-variant">{item.timestamp}</span>
                </div>
                <p className="text-sm text-on-surface-variant line-clamp-2 leading-relaxed">
                  {item.content}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
