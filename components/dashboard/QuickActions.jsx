import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { MessageSquarePlus, PenSquare, CheckSquare, RefreshCcw } from "lucide-react";

export function QuickActions() {
  const actions = [
    { label: "Send Message", icon: MessageSquarePlus, color: "text-blue-500", bg: "bg-blue-500/10 hover:bg-blue-500/20" },
    { label: "Post Update", icon: PenSquare, color: "text-purple-500", bg: "bg-purple-500/10 hover:bg-purple-500/20" },
    { label: "Create Task", icon: CheckSquare, color: "text-green-500", bg: "bg-green-500/10 hover:bg-green-500/20" },
    { label: "Sync Apps", icon: RefreshCcw, color: "text-orange-500", bg: "bg-orange-500/10 hover:bg-orange-500/20" },
  ];

  return (
    <Card className="bg-surface-container/30 border-border/50">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-bold">Quick Actions</CardTitle>
      </CardHeader>
      <CardContent className="px-4 pb-4">
        <div className="grid grid-cols-2 gap-3">
          {actions.map((action, i) => (
            <button key={i} className={`flex flex-col items-center justify-center gap-2 p-4 rounded-xl border border-border/30 transition-colors ${action.bg}`}>
              <action.icon className={`w-5 h-5 ${action.color}`} />
              <span className="text-xs font-medium text-on-surface">{action.label}</span>
            </button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
