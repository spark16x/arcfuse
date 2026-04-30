import { Search, Bell, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function TopBar() {
  return (
    <header className="h-16 border-b border-border bg-background/80 backdrop-blur-md sticky top-0 z-30 flex items-center justify-between px-6">
      <div className="flex-1 flex items-center">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant" />
          <Input
            type="search"
            placeholder="Search across apps... (Cmd+K)"
            className="w-full pl-10 bg-surface-container-low border-none focus-visible:ring-1 focus-visible:ring-primary/50 text-sm"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="text-on-surface-variant hover:text-on-surface relative rounded-full">
          <Bell className="w-5 h-5" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full"></span>
        </Button>
        <Button className="gap-2 rounded-full shadow-lg shadow-primary/20">
          <Plus className="w-4 h-4" />
          Add Integration
        </Button>
      </div>
    </header>
  );
}
