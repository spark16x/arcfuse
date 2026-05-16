import { Bell, Search, Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Sidebar } from "@/components/dashboard/Sidebar";

import { mockUser } from "@/lib/mock-data";

export function TopBar() {
  return (
    <header className="h-16 border-b border-glass-border glass-panel shrink-0 flex items-center justify-between px-4 md:px-8 z-30 sticky top-0">
      <div className="flex items-center gap-4 flex-1">

        {/* Mobile menu button */}
        <Sheet>
          <SheetTrigger asChild>
            <button className="md:hidden w-10 h-10 rounded-full flex items-center justify-center text-muted-foreground hover:bg-surface-200 hover:text-foreground transition-all">
              <Menu className="w-5 h-5" />
            </button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 w-72 border-r-glass-border">
            <Sidebar className="w-full border-r-0 h-full" isMobile={true} />
          </SheetContent>
        </Sheet>
      </div>

      <div className="flex items-center gap-4">
        <button className="w-10 h-10 rounded-full flex items-center justify-center text-muted-foreground hover:bg-surface-200 hover:text-foreground transition-all relative group">
          <Bell className="w-5 h-5 group-hover:animate-pulse-glow" />
          <span className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-primary shadow-glow-primary border-2 border-surface-100"></span>
        </button>

        <div className="h-6 w-px bg-glass-border mx-1"></div>

        <button className="flex items-center gap-2 hover:opacity-80 transition-opacity">
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
