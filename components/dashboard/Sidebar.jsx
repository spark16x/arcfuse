import { cn } from "@/lib/utils";
import Link from "next/link";
import { mockUser } from "@/lib/mock-data";
import {
  LayoutDashboard,
  Cable,
  ActivitySquare,
  MessageSquare,
  Settings,
  LogOut,
  Sparkles,
  Search
} from "lucide-react";

export function Sidebar({ className }) {
  const navItems = [
    { label: "Overview", href: "/dashboard", icon: LayoutDashboard, active: true },
    { label: "Integrations", href: "#", icon: Cable, active: false },
    { label: "Activity", href: "#", icon: ActivitySquare, active: false },
    { label: "Messages", href: "#", icon: MessageSquare, active: false },
  ];

  const secondaryNavItems = [
    { label: "Settings", href: "#", icon: Settings, active: false },
  ];

  return (
    <aside className={cn("flex flex-col h-screen glass-panel-heavy border-r-0 border-r border-glass-border w-72 p-4 pt-6 transition-all", className)}>

      {/* Brand */}
      <div className="flex items-center gap-3 px-3 mb-8 cursor-pointer group">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary-hover flex items-center justify-center shadow-glow-primary group-hover:shadow-glow-primary-lg transition-all duration-300 relative overflow-hidden">
          <div className="absolute inset-0 bg-white/20 blur-md transform translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
          <span className="text-black font-black text-2xl leading-none relative z-10 tracking-tighter">A</span>
        </div>
        <div>
           <span className="font-extrabold text-2xl tracking-tight text-foreground">Arcfuse</span>
           <div className="text-[10px] uppercase tracking-widest text-primary font-bold opacity-80 mt-[-2px]">Pro Workspace</div>
        </div>
      </div>

      {/* Search Bar - Linear style */}
      <div className="px-3 mb-6">
        <button className="w-full flex items-center gap-2 px-3 py-2.5 rounded-lg bg-surface-200 border border-glass-border text-muted-foreground hover:bg-surface-300 hover:text-foreground transition-all text-sm group">
          <Search className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity" />
          <span className="flex-1 text-left">Search...</span>
          <kbd className="hidden sm:inline-flex h-5 items-center gap-1 rounded border border-glass-border bg-surface-100 px-1.5 font-mono text-[10px] font-medium opacity-100">
            <span className="text-xs">⌘</span>K
          </kbd>
        </button>
      </div>

      {/* Primary Navigation */}
      <div className="px-2 mb-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Menu</div>
      <nav className="flex-1 space-y-1">
        {navItems.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className={cn(
              "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all group relative overflow-hidden",
              item.active
                ? "text-primary bg-primary/10 shadow-glass-inset"
                : "text-muted-foreground hover:bg-surface-200 hover:text-foreground"
            )}
          >
            {item.active && (
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-1/2 bg-primary rounded-r-full shadow-glow-primary"></div>
            )}
            <item.icon className={cn("w-5 h-5 transition-colors", item.active ? "text-primary" : "text-muted-foreground group-hover:text-foreground")} />
            {item.label}
          </Link>
        ))}

        {/* AI Assistant Callout */}
        <div className="mt-8 mb-4 px-3 py-4 rounded-xl bg-gradient-to-b from-surface-200 to-surface-100 border border-glass-border relative overflow-hidden group cursor-pointer hover:border-primary/30 transition-colors">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-primary/20 transition-colors"></div>
            <div className="flex items-center gap-2 mb-2 relative z-10">
                <Sparkles className="w-4 h-4 text-primary animate-pulse" />
                <span className="text-sm font-bold text-foreground">Ask AI</span>
            </div>
            <p className="text-xs text-muted-foreground relative z-10">Summarize recent mentions or draft a reply.</p>
        </div>
      </nav>

      {/* Secondary Navigation */}
      <div className="mb-4 space-y-1">
        {secondaryNavItems.map((item) => (
           <Link
             key={item.label}
             href={item.href}
             className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors text-muted-foreground hover:bg-surface-200 hover:text-foreground group"
           >
             <item.icon className="w-5 h-5 text-muted-foreground group-hover:text-foreground" />
             {item.label}
           </Link>
        ))}
      </div>

      {/* User Profile */}
      <div className="mt-auto pt-4 border-t border-glass-border flex flex-col gap-2">
        <div className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-surface-200 transition-colors cursor-pointer border border-transparent hover:border-glass-border group">
          <div className="relative">
            <img src={mockUser.avatar} alt="Avatar" className="w-9 h-9 rounded-full object-cover ring-2 ring-transparent group-hover:ring-primary/50 transition-all" />
            <div className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-green-500 ring-2 ring-surface-100"></div>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-foreground truncate">{mockUser.name}</p>
            <p className="text-xs text-muted-foreground truncate">{mockUser.email || 'Pro Plan'}</p>
          </div>
        </div>
        <form action="/auth/logout" method="post">
          <button className="flex items-center gap-3 w-full px-3 py-2 rounded-lg text-sm font-medium transition-colors text-muted-foreground hover:bg-destructive/10 hover:text-destructive group">
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </form>
      </div>
    </aside>
  );
}
