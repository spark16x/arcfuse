import { useState } from "react";
import { X, MessageSquare, Server, Check } from "lucide-react";
import { cn } from "@/lib/utils";

export function DiscordConnectModal({ isOpen, onClose, onConnect }) {
  const [guildName, setGuildName] = useState("Spark's server");
  const [selectedChannels, setSelectedChannels] = useState(["general", "dev-log"]);
  
  if (!isOpen) return null;

  const handleToggleChannel = (ch) => {
    if (selectedChannels.includes(ch)) {
      if (selectedChannels.length > 1) {
        setSelectedChannels(prev => prev.filter(c => c !== ch));
      }
    } else {
      setSelectedChannels(prev => [...prev, ch]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const mockGuildId = "1125052227384512592";
    const mockChannelIds = selectedChannels.map(() => "ch_" + Math.random().toString(36).substr(2, 9));
    onConnect(guildName, selectedChannels, mockGuildId, mockChannelIds);
  };

  const channelOptions = ["general", "dev-log", "announcements", "marketing", "random"];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose}></div>

      {/* Modal Content */}
      <div className="relative w-full max-w-md overflow-hidden rounded-3xl border border-glass-border glass-panel-heavy p-6 shadow-2xl animate-in zoom-in-95 duration-200 bg-surface-100/95 text-foreground">
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-surface-200 text-muted-foreground hover:text-foreground transition-all active:scale-95"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-[#5865F2] flex items-center justify-center shadow-[0_0_15px_rgba(88,101,242,0.3)]">
            <MessageSquare className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="font-extrabold text-lg text-foreground">Connect Discord Server</h3>
            <p className="text-xs text-muted-foreground">Link your community guild channels to Arcfuse</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Guild Name Input */}
          <div className="space-y-1.5">
            <label className="text-[10px] uppercase tracking-wider text-muted-foreground font-extrabold flex items-center gap-1.5">
              <Server className="w-3.5 h-3.5 text-primary" /> Discord Server Name
            </label>
            <input
              type="text"
              required
              value={guildName}
              onChange={(e) => setGuildName(e.target.value)}
              placeholder="e.g. Spark's server"
              className="w-full px-4 py-3 rounded-xl bg-surface-200 border border-glass-border focus:border-primary/50 focus:ring-1 focus:ring-primary/20 text-sm font-semibold outline-none transition-all"
            />
          </div>

          {/* Channels Selection */}
          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-wider text-muted-foreground font-extrabold">
              Select Sync Channels
            </label>
            <div className="grid grid-cols-2 gap-2">
              {channelOptions.map((ch) => {
                const isSelected = selectedChannels.includes(ch);
                return (
                  <button
                    key={ch}
                    type="button"
                    onClick={() => handleToggleChannel(ch)}
                    className={cn(
                      "flex items-center justify-between px-3 py-2.5 rounded-xl border text-xs font-bold transition-all text-left",
                      isSelected 
                        ? "bg-[#5865F2]/10 border-[#5865F2]/30 text-[#5865F2]" 
                        : "bg-surface-200 border-glass-border hover:bg-surface-300 text-muted-foreground hover:text-foreground"
                    )}
                  >
                    <span>#{ch}</span>
                    {isSelected && <Check className="w-3.5 h-3.5" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 rounded-xl border border-glass-border font-bold text-xs hover:bg-surface-200 transition-all active:scale-95"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-grow py-3 rounded-xl bg-[#5865F2] hover:bg-[#4752c4] text-white font-bold text-xs shadow-lg transition-all active:scale-95 flex items-center justify-center gap-1.5"
            >
              <span>Sync Server</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
