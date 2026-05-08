"use client";

import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { createClient } from "@/utils/supabase/client";

export function UnifiedFeed() {
  const [filter, setFilter] = useState("all");
  const [feed, setFeed] = useState([]);
  const supabase = createClient();
  const tabs = ["all", "discord", "x", "slack", "github"];

  useEffect(() => {
    const fetchFeed = async () => {
      const { data, error } = await supabase
        .from("unified_feed")
        .select("*")
        .order("id", { ascending: false });

      if (data && !error) {
        setFeed(data);
      }
    };

    fetchFeed();

    const channel = supabase
      .channel("unified_feed_changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "unified_feed" },
        (payload) => {
          if (payload.eventType === "INSERT") {
            setFeed((current) => [payload.new, ...current]);
          } else if (payload.eventType === "DELETE") {
            setFeed((current) => current.filter((item) => item.id !== payload.old.id));
          } else if (payload.eventType === "UPDATE") {
            setFeed((current) =>
              current.map((item) => (item.id === payload.new.id ? payload.new : item))
            );
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase]);

  const filteredFeed = filter === "all"
    ? feed
    : feed.filter(item => item.platform === filter);

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
                <img src={item.avatar} alt={item.user_name} className="w-10 h-10 rounded-full bg-surface-variant" />
                <div
                  className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center border-2 border-background"
                  style={{ backgroundColor: item.color }}
                >
                  <span className="material-symbols-outlined text-[10px] text-white leading-none">{item.platform_icon}</span>
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="text-sm font-semibold text-on-surface">{item.user_name}</h4>
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
