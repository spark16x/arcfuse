import { activityTimeline } from "@/lib/mock-data";

export function ActivityTimeline() {
  return (
    <div className="glass-panel-heavy rounded-3xl p-6 border border-glass-border">
      <h3 className="text-lg font-bold text-foreground mb-6">Recent Events</h3>

      <div className="space-y-6 relative before:absolute before:inset-0 before:ml-2.5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-primary/50 before:via-glass-border before:to-transparent">
        {activityTimeline.slice(0, 4).map((activity, index) => (
          <div key={activity.id} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
            {/* Timeline Dot */}
            <div className="flex items-center justify-center w-5 h-5 rounded-full border-2 border-primary bg-surface-100 shadow-glow-primary shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 group-hover:scale-125 transition-transform">
                <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
            </div>

            {/* Content Box */}
            <div className="w-[calc(100%-2.5rem)] md:w-[calc(50%-1.5rem)] p-3 rounded-xl bg-surface-100/50 border border-glass-border group-hover:border-primary/30 transition-colors">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-bold text-foreground truncate">{activity.action}</span>
              </div>
              <p className="text-[10px] text-muted-foreground">{activity.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
