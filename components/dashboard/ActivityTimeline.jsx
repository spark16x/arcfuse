"use client";

import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { createClient } from "@/utils/supabase/client";

export function ActivityTimeline() {
  const [timeline, setTimeline] = useState([]);
  const supabase = createClient();

  useEffect(() => {
    const fetchTimeline = async () => {
      const { data, error } = await supabase
        .from("activity_timeline")
        .select("*")
        .order("id", { ascending: false });

      if (data && !error) {
        setTimeline(data);
      }
    };

    fetchTimeline();

    const channel = supabase
      .channel("activity_timeline_changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "activity_timeline" },
        (payload) => {
          if (payload.eventType === "INSERT") {
            setTimeline((current) => [payload.new, ...current]);
          } else if (payload.eventType === "DELETE") {
            setTimeline((current) => current.filter((item) => item.id !== payload.old.id));
          } else if (payload.eventType === "UPDATE") {
            setTimeline((current) =>
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

  return (
    <Card className="bg-surface-container/30 border-border/50 h-full">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-bold">Activity Log</CardTitle>
      </CardHeader>
      <CardContent className="px-6 pb-6">
        <div className="relative border-l-2 border-surface-container-high ml-3 space-y-6">
          {timeline.map((item, i) => (
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
