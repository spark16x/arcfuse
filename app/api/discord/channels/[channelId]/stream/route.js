import { auth } from "@/auth";

const DISCORD_API = "https://discord.com/api/v10";
const BOT_TOKEN = process.env.DISCORD_BOT_TOKEN;
const POLL_INTERVAL_MS = 2500; // poll Discord every 2.5 seconds

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET(request, { params }) {
  const session = await auth();
  if (!session) {
    return new Response("Unauthorized", { status: 401 });
  }

  const { channelId } = await params;

  // Resolve the current user's Discord user ID + username so we can mark
  // their own messages (including webhook-sent ones) as 'me'
  let currentDiscordUserId = null;
  let currentDiscordUsername = session.user?.name ?? null;
  if (session.accessToken && session.provider === "discord") {
    try {
      const profileRes = await fetch(`${DISCORD_API}/users/@me`, {
        headers: { Authorization: `Bearer ${session.accessToken}` },
        cache: "no-store",
      });
      if (profileRes.ok) {
        const profile = await profileRes.json();
        currentDiscordUserId = profile.id;
        currentDiscordUsername = profile.global_name || profile.username || currentDiscordUsername;
      }
    } catch { /* best-effort */ }
  }

  // Read the client's last known message ID from the query string
  const url = new URL(request.url);
  let lastMessageId = url.searchParams.get("after") || "0";

  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    async start(controller) {
      // Helper to send an SSE event
      const send = (event, data) => {
        try {
          controller.enqueue(
            encoder.encode(`event: ${event}\ndata: ${JSON.stringify(data)}\n\n`)
          );
        } catch {
          // client disconnected
        }
      };

      // Send a "connected" heartbeat so the client knows the stream opened
      send("connected", { channelId });

      let active = true;

      // Abort when the client closes the connection
      request.signal.addEventListener("abort", () => {
        active = false;
        try { controller.close(); } catch { /* already closed */ }
      });

      while (active) {
        try {
          const discordUrl =
            lastMessageId && lastMessageId !== "0"
              ? `${DISCORD_API}/channels/${channelId}/messages?limit=10&after=${lastMessageId}`
              : `${DISCORD_API}/channels/${channelId}/messages?limit=10`;

          const res = await fetch(discordUrl, {
            headers: { Authorization: `Bot ${BOT_TOKEN}` },
            cache: "no-store",
          });

          if (res.ok) {
            const raw = await res.json();
            if (Array.isArray(raw) && raw.length > 0) {
              // Discord returns newest-first; reverse to oldest-first
              const sorted = [...raw].reverse();

              // Only emit messages newer than what we already have
              const newMessages = lastMessageId && lastMessageId !== "0"
                ? sorted.filter((m) => BigInt(m.id) > BigInt(lastMessageId))
                : sorted;

              if (newMessages.length > 0) {
                lastMessageId = newMessages[newMessages.length - 1].id;

                const normalised = newMessages.map((m) => {
                  const isMe =
                    (currentDiscordUserId && m.author?.id === currentDiscordUserId) ||
                    (m.webhook_id && currentDiscordUsername &&
                      m.author?.username === currentDiscordUsername);
                  return {
                    id: m.id,
                    sender: isMe ? "me" : "them",
                    senderName: m.author?.global_name || m.author?.username || "Unknown",
                    avatar: m.author?.avatar
                      ? `https://cdn.discordapp.com/avatars/${m.author.id}/${m.author.avatar}.png`
                      : `https://i.pravatar.cc/40?u=${m.author?.id}`,
                    text: m.content || (m.embeds?.length ? "[Embed]" : "[Attachment]"),
                    time: new Date(m.timestamp).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    }),
                  };
                });

                send("messages", { messages: normalised });
              }
            }
          } else if (res.status === 401 || res.status === 403) {
            // Bot not in channel — stop polling
            send("error", { code: res.status, message: "Bot missing access to this channel." });
            break;
          }
        } catch (err) {
          if (!active) break;
          // Transient network error — just keep polling
          console.error("SSE poll error:", err);
        }

        // Wait before next poll
        await new Promise((r) => setTimeout(r, POLL_INTERVAL_MS));
      }

      try { controller.close(); } catch { /* already closed */ }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
      "X-Accel-Buffering": "no", // disable nginx buffering if behind proxy
    },
  });
}
