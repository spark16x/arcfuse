import { useState, useEffect } from "react";
import { X, MessageSquare, Server, Check, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export function DiscordConnectModal({ isOpen, onClose, onConnect }) {
  const [guilds, setGuilds] = useState([]);
  const [selectedGuildId, setSelectedGuildId] = useState("");
  const [selectedChannels, setSelectedChannels] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isOpen) {
      setIsLoading(true);
      fetch('/api/discord/guilds')
        .then(res => res.json())
        .then(data => {
          if (data.guilds) {
            setGuilds(data.guilds);
            if (data.guilds.length > 0) {
              setSelectedGuildId(data.guilds[0].id);
              // Auto-select first channel if available
              if (data.guilds[0].channels?.length > 0) {
                 setSelectedChannels([data.guilds[0].channels[0].id]);
              }
            }
          }
          if (data.error) setError(data.error);
        })
        .catch(err => {
          console.error(err);
          setError("Failed to fetch Discord servers.");
        })
        .finally(() => setIsLoading(false));
    } else {
      // Reset state on close
      setGuilds([]);
      setSelectedGuildId("");
      setSelectedChannels([]);
      setError(null);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const selectedGuild = guilds.find(g => g.id === selectedGuildId);
  const availableChannels = selectedGuild?.channels || [];

  const handleGuildChange = (e) => {
    const newGuildId = e.target.value;
    setSelectedGuildId(newGuildId);
    const newGuild = guilds.find(g => g.id === newGuildId);
    if (newGuild?.channels?.length > 0) {
      setSelectedChannels([newGuild.channels[0].id]);
    } else {
      setSelectedChannels([]);
    }
  };

  const handleToggleChannel = (channelId) => {
    if (selectedChannels.includes(channelId)) {
      if (selectedChannels.length > 1) {
        setSelectedChannels(prev => prev.filter(id => id !== channelId));
      }
    } else {
      setSelectedChannels(prev => [...prev, channelId]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedGuild) return;

    // Map selected channel IDs to names for UI purposes
    const channelNames = selectedChannels.map(id => {
      const ch = availableChannels.find(c => c.id === id);
      return ch ? ch.name : id;
    });

    onConnect(selectedGuild.name, channelNames, selectedGuild.id, selectedChannels);
  };

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

        {isLoading ? (
          <div className="flex justify-center py-8">
            <Loader2 className="w-8 h-8 animate-spin text-[#5865F2]" />
          </div>
        ) : error ? (
          <div className="p-4 bg-red-500/10 border border-red-500/30 text-red-500 rounded-xl text-sm mb-4">
            {error}
          </div>
        ) : guilds.length === 0 ? (
           <div className="p-4 bg-yellow-500/10 border border-yellow-500/30 text-yellow-500 rounded-xl text-sm mb-4">
            No Discord servers found where the Arcfuse bot is installed and you have access.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Guild Name Input */}
            <div className="space-y-1.5">
              <label className="text-[10px] uppercase tracking-wider text-muted-foreground font-extrabold flex items-center gap-1.5">
                <Server className="w-3.5 h-3.5 text-primary" /> Discord Server Name
              </label>
              <select
                required
                value={selectedGuildId}
                onChange={handleGuildChange}
                className="w-full px-4 py-3 rounded-xl bg-surface-200 border border-glass-border focus:border-primary/50 focus:ring-1 focus:ring-primary/20 text-sm font-semibold outline-none transition-all appearance-none"
              >
                {guilds.map((g) => (
                  <option key={g.id} value={g.id}>
                    {g.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Channels Selection */}
            {availableChannels.length > 0 && (
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-wider text-muted-foreground font-extrabold">
                  Select Sync Channels
                </label>
                <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto custom-scrollbar p-1">
                  {availableChannels.map((ch) => {
                    const isSelected = selectedChannels.includes(ch.id);
                    return (
                      <button
                        key={ch.id}
                        type="button"
                        onClick={() => handleToggleChannel(ch.id)}
                        className={cn(
                          "flex items-center justify-between px-3 py-2.5 rounded-xl border text-xs font-bold transition-all text-left truncate",
                          isSelected
                            ? "bg-[#5865F2]/10 border-[#5865F2]/30 text-[#5865F2]"
                            : "bg-surface-200 border-glass-border hover:bg-surface-300 text-muted-foreground hover:text-foreground"
                        )}
                        title={`#${ch.name}`}
                      >
                        <span className="truncate">#{ch.name}</span>
                        {isSelected && <Check className="w-3.5 h-3.5 shrink-0" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
            {availableChannels.length === 0 && (
               <div className="text-xs text-muted-foreground italic">No accessible text channels found in this server.</div>
            )}

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
                disabled={selectedChannels.length === 0}
                className="flex-grow py-3 rounded-xl bg-[#5865F2] hover:bg-[#4752c4] disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold text-xs shadow-lg transition-all active:scale-95 flex items-center justify-center gap-1.5"
              >
                <span>Sync Server</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
