import { cn } from "@/lib/utils";
import Link from "next/link";
import { mockUser } from "@/lib/mock-data";
import { LayoutDashboard, Cable, ActivitySquare, MessageSquare, Settings } from "lucide-react";

export function Sidebar({ className }) {
  const navItems = [
    { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard, active: true },
    { label: "Integrations", href: "#", icon: Cable, active: false },
    { label: "Activity", href: "#", icon: ActivitySquare, active: false },
    { label: "Messages", href: "#", icon: MessageSquare, active: false },
    { label: "Settings", href: "#", icon: Settings, active: false },
  ];

  return (
    <aside className={cn("flex flex-col h-screen border-r border-border bg-surface-container/30 backdrop-blur-xl w-64 p-4", className)}>
      <div className="flex items-center gap-2 px-2 py-4 mb-6">
        <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
          <span className="text-on-primary font-bold text-xl leading-none">A</span>
        </div>
        <span className="font-bold text-xl tracking-tight text-on-surface">Arcfuse</span>
      </div>

      <nav className="flex-1 space-y-1">
        {navItems.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className={cn(
              "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors group",
              item.active
                ? "bg-primary/10 text-primary"
                : "text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface"
            )}
          >
            <item.icon className="w-5 h-5" />
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="mt-auto pt-4 border-t border-border">
        <div className="flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-surface-container-high transition-colors cursor-pointer">
          <img src={mockUser.avatar} alt="Avatar" className="w-10 h-10 rounded-full bg-surface-variant" />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-on-surface truncate">{mockUser.name}</p>
            <p className="text-xs text-on-surface-variant flex items-center gap-1.5 truncate">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block shrink-0"></span>
              {mockUser.status}
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}
