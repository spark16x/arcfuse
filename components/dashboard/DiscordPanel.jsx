import { useState, useEffect } from "react";
import {
  MessageSquare,
  Server,
  Hash,
  Webhook,
  Loader2,
  Play,
  CheckCircle2,
  RefreshCw,
  ExternalLink,
  Shield
} from "lucide-react";
import { cn } from "@/lib/utils";
import { inMemoryDb } from "@/lib/db-store";

export function DiscordPanel({ showToast, onAddLog, onAddAlert }) {
  const [integration, setIntegration] = useState(null);
  const [channels, setChannels] = useState([]);
  const [activeTab, setActiveTab] = useState("channels"); // channels, webhooks
  const [isLoading, setIsLoading] = useState(true);
  const [isTriggeringWebhook, setIsTriggeringWebhook] = useState(false);
  const [webhookStatus, setWebhookStatus] = useState("Inactive (Setup Required)");

  const fetchDiscordDetails = async () => {
    setIsLoading(true);
    try {
      const data = inMemoryDb.integrations || [];
      const discordConn = data.find(item => item.provider === 'discord' || item.id === 'discord');
      if (discordConn && discordConn.status === 'connected') {
        setIntegration(discordConn);
        if (discordConn.settings?.channels) {
          setChannels(discordConn.settings.channels);
        }
      } else if (discordConn && discordConn.status === 'disconnected') {
        setIntegration(null);
        setChannels([]);
      } else {
        // Fallback default integration if none set yet
        const defaultConn = {
          provider: 'discord',
          status: 'connected',
          settings: {
            guild: "Spark's server",
            guild_id: "1125052227384512592",
            channels: ["general", "dev-log"]
          }
        };
        setIntegration(defaultConn);
        setChannels(defaultConn.settings.channels);
      }
    } catch (err) {
      console.error("Failed to load Discord integration:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDiscordDetails();
  }, []);

  const triggerMockWebhook = async (type) => {
    setIsTriggeringWebhook(true);
    try {
      let payload = {};
      const guildName = integration?.settings?.guild || "Spark's server";
      const channelName = channels[0] || "general";

      if (type === "sophia") {
        payload = {
          content: "Hey team! I just finished reviewing the layout PR. Looks super clean! 🚀",
          author: {
            id: "2345678901",
            username: "sophiapatel",
            global_name: "Sophia Patel",
            avatar: "a_avatar1"
          },
          channel_name: channelName,
          guild_name: guildName
        };
      } else if (type === "alex") {
        payload = {
          content: "Does anyone have the credentials for the staging database? Getting connection timeout errors.",
          author: {
            id: "1234567890",
            username: "alexchen",
            global_name: "Alex Chen",
            avatar: "a_avatar2"
          },
          channel_name: channelName,
          guild_name: guildName
        };
      } else if (type === "system") {
        payload = {
          content: "Deployment build #1024 completed successfully. Deployed to production environment in 1m 45s.",
          author: {
            id: "1501062344917127199",
            username: "Arcfuse Bot",
            global_name: "Arcfuse System Bot",
            avatar: null
          },
          channel_name: "dev-log",
          guild_name: guildName
        };
      }

      const res = await fetch("/api/webhooks/discord", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        setWebhookStatus("Active (Receiving Events)");
        showToast(`Simulated Discord Webhook event triggered successfully! Check your Feed/Timeline.`, "success");
        onAddLog?.();
        onAddAlert?.();
      } else {
        throw new Error("Webhook trigger returned error code");
      }
    } catch (err) {
      console.error("Failed to trigger mock webhook:", err);
      showToast("Failed to trigger simulated webhook", "error");
    } finally {
      setIsTriggeringWebhook(false);
    }
  };

  const isLinked = integration?.status === 'connected';

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-extrabold tracking-tight flex items-center gap-3">
          <MessageSquare className="w-8 h-8 text-[#5865F2]" /> Discord Control Center
        </h2>
        <p className="text-muted-foreground text-sm mt-1">
          Monitor your Discord server connections, view synchronized channels, and configure webhook delivery.
        </p>
      </div>

      {/* Connection Status Banner */}
      <div className={cn(
        "glass-panel-heavy rounded-3xl p-6 border transition-all duration-300 relative overflow-hidden bg-surface-100/30",
        isLinked 
          ? "bg-[#5865F2]/5 border-[#5865F2]/20" 
          : "bg-yellow-500/5 border-yellow-500/20"
      )}>
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#5865F2]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 opacity-30"></div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-1.5 flex-1">
            <div className="flex items-center gap-2">
              <span className={cn(
                "w-2.5 h-2.5 rounded-full animate-pulse",
                isLinked ? "bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]" : "bg-yellow-500"
              )}></span>
              <h3 className="font-extrabold text-sm text-foreground">
                {isLinked ? `Connected to ${integration.settings?.guild || "Discord Server"}` : "Discord Disconnected"}
              </h3>
            </div>
            <p className="text-xs text-muted-foreground max-w-2xl leading-relaxed">
              {isLinked 
                ? `Your workspace is currently synced with the server "${integration.settings?.guild}". Arcfuse bot has read/write credentials for channels.`
                : "Your Discord bot integration is currently inactive. Connect your Discord account to begin syncing."}
            </p>
          </div>

          <div className="shrink-0">
            <button
              onClick={fetchDiscordDetails}
              className="p-2.5 rounded-xl bg-surface-200 border border-glass-border hover:bg-surface-300 transition-all active:scale-95"
              title="Refresh Connection Info"
            >
              <RefreshCw className="w-4 h-4 text-muted-foreground" />
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[calc(100vh-14rem)] min-h-[500px]">
        {/* Left Column: Server Status */}
        <div className="lg:col-span-1 border border-glass-border rounded-3xl bg-surface-100/30 flex flex-col overflow-hidden">
          <div className="p-4 border-b border-glass-border bg-surface-100/50">
            <h3 className="font-bold text-xs uppercase tracking-wider text-muted-foreground flex items-center gap-2">
              <Server className="w-3.5 h-3.5 text-[#5865F2]" /> Server details
            </h3>
          </div>

          <div className="flex-1 p-4 space-y-4">
            {isLoading ? (
              <div className="py-12 flex flex-col items-center justify-center space-y-2 text-muted-foreground">
                <Loader2 className="w-6 h-6 animate-spin text-[#5865F2]" />
                <span className="text-[10px]">Loading details...</span>
              </div>
            ) : !isLinked ? (
              <p className="text-xs text-muted-foreground text-center py-8">No server connected yet.</p>
            ) : (
              <div className="space-y-4">
                <div className="space-y-1">
                  <label className="text-[9px] uppercase tracking-wider text-muted-foreground font-extrabold">Server Name</label>
                  <div className="text-sm font-bold text-foreground">{integration.settings?.guild || "Spark's server"}</div>
                </div>

                <div className="space-y-1">
                  <label className="text-[9px] uppercase tracking-wider text-muted-foreground font-extrabold">Server ID</label>
                  <div className="text-xs font-mono text-muted-foreground">{integration.settings?.guild_id || "1125052227384512592"}</div>
                </div>

                <div className="space-y-1">
                  <label className="text-[9px] uppercase tracking-wider text-muted-foreground font-extrabold">Active Bot Scopes</label>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {["identify", "guilds", "bot", "messages.read"].map((scope, i) => (
                      <span key={i} className="px-2 py-0.5 bg-surface-300 rounded text-[9px] font-bold text-foreground border border-glass-border">
                        {scope}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Dynamic Panel */}
        <div className="lg:col-span-3 border border-glass-border rounded-3xl bg-surface-100/30 flex flex-col overflow-hidden">
          {/* Tabs */}
          <div className="px-6 border-b border-glass-border flex bg-surface-100/20">
            {[
              { id: "channels", label: "Synced Channels" },
              { id: "webhooks", label: "Webhooks Settings" }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "px-4 py-3 text-xs font-bold border-b-2 transition-all relative top-[1px]",
                  activeTab === tab.id
                    ? "border-[#5865F2] text-[#5865F2]"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Panel Content */}
          <div className="flex-1 overflow-y-auto custom-scrollbar p-6">
            {isLoading ? (
              <div className="h-48 flex flex-col items-center justify-center space-y-2 text-muted-foreground">
                <Loader2 className="w-8 h-8 animate-spin text-[#5865F2]" />
                <span className="text-xs">Syncing with Discord Gateway...</span>
              </div>
            ) : (
              <>
                {/* Synced Channels Tab */}
                {activeTab === "channels" && (
                  <div className="space-y-4">
                    <h4 className="text-xs font-bold text-foreground">Synchronized channel streams</h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      Arcfuse reads and processes new message updates from the following Discord channels:
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
                      {channels.map((ch, idx) => (
                        <div key={idx} className="p-4 rounded-2xl bg-surface-100 border border-glass-border flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Hash className="w-4 h-4 text-primary" />
                            <span className="text-xs font-bold text-foreground">#{ch}</span>
                          </div>
                          <span className="px-2 py-0.5 bg-green-500/10 text-green-500 border border-green-500/20 rounded-full text-[9px] font-extrabold uppercase tracking-wider">
                            Active Sync
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Webhooks Tab */}
                {activeTab === "webhooks" && (
                  <div className="space-y-6">
                    <div className="bg-surface-100 p-6 rounded-2xl border border-glass-border space-y-4">
                      <h4 className="text-sm font-bold text-foreground flex items-center gap-2">
                        <Webhook className="w-4 h-4 text-[#5865F2]" /> Webhook Integration Settings
                      </h4>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="text-[9px] uppercase tracking-wider text-muted-foreground font-extrabold">Webhook Status</label>
                          <div className="flex items-center gap-1.5">
                            <span className={cn(
                              "w-2.5 h-2.5 rounded-full animate-pulse",
                              webhookStatus.includes("Active") ? "bg-green-500" : "bg-yellow-500"
                            )}></span>
                            <span className="text-xs font-bold text-foreground">{webhookStatus}</span>
                          </div>
                        </div>

                        <div className="space-y-1">
                          <label className="text-[9px] uppercase tracking-wider text-muted-foreground font-extrabold">Payload URL</label>
                          <div className="bg-surface-200 border border-glass-border px-3 py-2 rounded-xl text-[10px] font-mono text-foreground select-all truncate">
                            {typeof window !== "undefined" ? `${window.location.origin}/api/webhooks/discord` : "/api/webhooks/discord"}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h4 className="text-xs font-bold text-foreground flex items-center gap-1">
                        <Shield className="w-3.5 h-3.5 text-primary" /> Setup instruction:
                      </h4>
                      <ol className="text-xs text-muted-foreground list-decimal pl-4 space-y-2 leading-relaxed">
                        <li>Go to your Discord Server settings and open the **Integrations** tab.</li>
                        <li>Select **Webhooks** and click **Create Webhook**.</li>
                        <li>Give it a name (e.g. `Arcfuse Sync`) and select the channel to sync.</li>
                        <li>Paste the **Payload URL** above into the **Webhook URL** field in Discord.</li>
                        <li>Click **Save Changes** to complete setup. Real-time message updates will now automatically stream into your inbox!</li>
                      </ol>
                    </div>

                    {/* Local Sandbox Webhook Testing */}
                    <div className="bg-[#5865F2]/5 border border-[#5865F2]/20 p-6 rounded-2xl space-y-4">
                      <div className="space-y-1">
                        <h4 className="text-xs font-extrabold text-[#5865F2] uppercase tracking-wider flex items-center gap-1.5">
                          <Play className="w-3.5 h-3.5 fill-[#5865F2]" /> Local Sandbox Webhook Testing
                        </h4>
                        <p className="text-[11px] text-muted-foreground leading-relaxed">
                          Since you are running Arcfuse on `localhost`, Discord cannot send real HTTP posts to your local server without a tunnel. 
                          Use the buttons below to trigger simulated Discord webhook events directly to your endpoint to verify the real-time activity stream ingestion!
                        </p>
                      </div>

                      <div className="flex flex-wrap gap-3">
                        <button
                          onClick={() => triggerMockWebhook("sophia")}
                          disabled={isTriggeringWebhook}
                          className="px-4 py-2.5 rounded-xl bg-surface-200 border border-glass-border hover:bg-surface-300 font-bold text-[11px] text-foreground transition-all flex items-center gap-1.5 active:scale-95 disabled:opacity-50"
                        >
                          {isTriggeringWebhook ? <Loader2 className="w-3 h-3 animate-spin" /> : <Play className="w-3 h-3 fill-foreground" />}
                          Sophia Patel Message
                        </button>
                        
                        <button
                          onClick={() => triggerMockWebhook("alex")}
                          disabled={isTriggeringWebhook}
                          className="px-4 py-2.5 rounded-xl bg-surface-200 border border-glass-border hover:bg-surface-300 font-bold text-[11px] text-foreground transition-all flex items-center gap-1.5 active:scale-95 disabled:opacity-50"
                        >
                          {isTriggeringWebhook ? <Loader2 className="w-3 h-3 animate-spin" /> : <Play className="w-3 h-3 fill-foreground" />}
                          Alex Chen Message
                        </button>

                        <button
                          onClick={() => triggerMockWebhook("system")}
                          disabled={isTriggeringWebhook}
                          className="px-4 py-2.5 rounded-xl bg-surface-200 border border-glass-border hover:bg-surface-300 font-bold text-[11px] text-foreground transition-all flex items-center gap-1.5 active:scale-95 disabled:opacity-50"
                        >
                          {isTriggeringWebhook ? <Loader2 className="w-3 h-3 animate-spin" /> : <Play className="w-3 h-3 fill-foreground" />}
                          Arcfuse System Bot
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
