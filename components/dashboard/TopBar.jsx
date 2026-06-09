import { Bell, Menu, X, Check } from "lucide-react";
import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Sidebar } from "@/components/dashboard/Sidebar";

import { mockUser } from "@/lib/mock-data";

export function TopBar({ 
  notifications = [], 
  onMarkAllRead, 
  onClearNotifications, 
  onOpenAI, 
  activeView, 
  setActiveView, 
  onOpenSearch 
}) {
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const unreadCount = notifications.filter(n => n.unread).length;

  return (
    <header className="h-16 border-b border-glass-border glass-panel shrink-0 flex items-center justify-between px-4 md:px-8 z-30 sticky top-0">
      <div className="flex items-center gap-4 flex-1">

        {/* Mobile menu button */}
        <Sheet>
          <SheetTrigger asChild>
            <button
              className="md:hidden w-10 h-10 rounded-full flex items-center justify-center text-muted-foreground hover:bg-surface-200 hover:text-foreground transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              aria-label="Open mobile menu"
            >
              <Menu className="w-5 h-5" />
            </button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 w-72 border-r-glass-border">
            <Sidebar 
              className="w-full border-r-0 h-full" 
              isMobile={true} 
              activeView={activeView}
              setActiveView={setActiveView}
              onOpenSearch={onOpenSearch}
              onOpenAI={onOpenAI}
            />
          </SheetContent>
        </Sheet>
      </div>

      <div className="flex items-center gap-4">
        {/* Notifications Dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
            className="w-10 h-10 rounded-full flex items-center justify-center text-muted-foreground hover:bg-surface-200 hover:text-foreground transition-all relative group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            aria-label="View notifications"
          >
            <Bell className="w-5 h-5 group-hover:animate-pulse-glow" />
            {unreadCount > 0 && (
              <span className="absolute top-2 right-2 w-4 h-4 rounded-full bg-primary flex items-center justify-center text-[9px] font-black text-black ring-2 ring-surface-100">
                {unreadCount}
              </span>
            )}
          </button>

          {isNotificationsOpen && (
            <div className="absolute right-0 mt-3 w-80 glass-panel-heavy rounded-2xl p-4 border border-glass-border shadow-2xl z-50 animate-in fade-in slide-in-from-top-2 duration-200">
              <div className="flex items-center justify-between pb-3 border-b border-glass-border mb-3">
                <span className="font-bold text-sm text-foreground">Notifications</span>
                <div className="flex gap-2">
                  {unreadCount > 0 && (
                    <button 
                      onClick={() => onMarkAllRead?.()} 
                      className="text-[10px] text-primary font-bold hover:underline flex items-center gap-0.5"
                    >
                      <Check className="w-3 h-3" /> Mark Read
                    </button>
                  )}
                  <button 
                    onClick={() => { onClearNotifications?.(); setIsNotificationsOpen(false); }} 
                    className="text-[10px] text-muted-foreground hover:text-destructive font-bold flex items-center gap-0.5"
                  >
                    <X className="w-3 h-3" /> Clear
                  </button>
                </div>
              </div>

              <div className="space-y-2 max-h-60 overflow-y-auto custom-scrollbar">
                {notifications.length === 0 ? (
                  <p className="text-xs text-muted-foreground text-center py-4">No recent notifications</p>
                ) : (
                  notifications.map(item => (
                    <div 
                      key={item.id} 
                      className={cn(
                        "p-2.5 rounded-lg border transition-all text-left",
                        item.unread 
                          ? "bg-primary/5 border-primary/20 hover:bg-primary/10" 
                          : "bg-surface-100/50 border-glass-border hover:bg-surface-200/50"
                      )}
                    >
                      <div className="flex items-center justify-between mb-0.5">
                        <span className="font-bold text-xs text-foreground truncate">{item.title}</span>
                        <span className="text-[9px] text-muted-foreground whitespace-nowrap">{item.time}</span>
                      </div>
                      <p className="text-[11px] text-muted-foreground leading-normal">{item.desc}</p>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        <div className="h-6 w-px bg-glass-border mx-1"></div>

        <button
          onClick={() => setActiveView?.('settings')}
          className="flex items-center gap-2 hover:opacity-80 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-lg p-1"
          aria-label="User profile menu"
        >
          <div className="text-right hidden sm:block">
            <p className="text-sm font-semibold text-foreground leading-none mb-1">{mockUser.name}</p>
            <p className="text-[10px] text-primary uppercase tracking-wider font-bold">Workspace Admin</p>
          </div>
          <img src={mockUser.avatar} alt="Avatar" className="w-8 h-8 rounded-full border border-glass-border" />
        </button>
      </div>
    </header>
  );
}
