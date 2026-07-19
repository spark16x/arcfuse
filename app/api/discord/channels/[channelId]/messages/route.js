import { auth } from "@/auth";

const DISCORD_API = "https://discord.com/api/v10";
const BOT_TOKEN = process.env.DISCORD_BOT_TOKEN;

// In-memory webhook cache: channelId → webhookUrl
// Resets on server restart (which is fine for dev; use a DB/KV store in production)
const webhookCache = new Map();

// ─── helpers ──────────────────────────────────────────────────────────────────

/**
 * Returns a webhook URL for the given channel.
 * Re-uses an existing one created by this app, or creates a new one.
 */
async function getOrCreateWebhook(channelId) {
  if (webhookCache.has(channelId)) return webhookCache.get(channelId);

  // List existing webhooks on the channel
  const listRes = await fetch(`${DISCORD_API}/channels/${channelId}/webhooks`, {
    headers: { Authorization: `Bot ${BOT_TOKEN}` },
  });

  if (listRes.ok) {
    const hooks = await listRes.json();
    // Look for one we created (named "Arcfuse")
    const ours = Array.isArray(hooks) && hooks.find((h) => h.name === "Arcfuse");
    if (ours) {
      const url = `${DISCORD_API}/webhooks/${ours.id}/${ours.token}`;
      webhookCache.set(channelId, url);
      return url;
    }
  }

  // Create a new webhook
  const createRes = await fetch(`${DISCORD_API}/channels/${channelId}/webhooks`, {
    method: "POST",
    headers: {
      Authorization: `Bot ${BOT_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name: "Arcfuse" }),
  });

  if (!createRes.ok) {
    const err = await createRes.text();
    throw new Error(`Failed to create webhook: ${err}`);
  }

  const hook = await createRes.json();
  const url = `${DISCORD_API}/webhooks/${hook.id}/${hook.token}`;
  webhookCache.set(channelId, url);
  return url;
}

/**
 * Fetch the user's Discord profile (username + avatar) using their OAuth access token.
 */
async function getDiscordProfile(accessToken) {
  try {
    const res = await fetch(`${DISCORD_API}/users/@me`, {
      headers: { Authorization: `Bearer ${accessToken}` },
      cache: "no-store",
    });
    if (res.ok) return await res.json();
  } catch { /* fall through */ }
  return null;
}

// ─── GET — fetch channel history ──────────────────────────────────────────────

export async function GET(request, { params }) {
  try {
    const session = await auth();
    if (!session) {
      return Response.json({ error: "Unauthenticated", messages: [] }, { status: 401 });
    }

    const { channelId } = await params;

    // Get the Discord user ID of the logged-in user so we can mark their messages as "me"
    let currentDiscordUserId = null;
    if (session.accessToken && session.provider === "discord") {
      const profile = await getDiscordProfile(session.accessToken);
      currentDiscordUserId = profile?.id ?? null;
    }

    const res = await fetch(
      `${DISCORD_API}/channels/${channelId}/messages?limit=50`,
      {
        headers: { Authorization: `Bot ${BOT_TOKEN}` },
        cache: "no-store",
      }
    );

    if (!res.ok) {
      const err = await res.text();
      console.error(`Discord messages error for channel ${channelId}:`, err);
      return Response.json(
        { error: "Failed to fetch messages", messages: [] },
        { status: res.status }
      );
    }

    const raw = await res.json();
    if (!Array.isArray(raw)) return Response.json({ messages: [] });

    const messages = raw.reverse().map((m) => {
      // A webhook message whose username matches the user's Discord global name
      // should also be treated as "me" (sent via Arcfuse on their behalf)
      const isMe =
        (currentDiscordUserId && m.author?.id === currentDiscordUserId) ||
        // webhook sent via Arcfuse on behalf of this session user
        (m.webhook_id && m.author?.username === session.user?.name);

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
        attachments: m.attachments || [],
      };
    });

    return Response.json({ messages });
  } catch (err) {
    console.error("Discord messages route error:", err);
    return Response.json({ error: String(err), messages: [] }, { status: 500 });
  }
}

// ─── POST — send a message as the user ────────────────────────────────────────

export async function POST(request, { params }) {
  try {
    const session = await auth();
    if (!session) {
      return Response.json({ error: "Unauthenticated" }, { status: 401 });
    }

    const { channelId } = await params;
    const { content } = await request.json();

    // Resolve the user's real Discord username + avatar
    let username = session.user?.name ?? "Arcfuse User";
    let avatarUrl = session.user?.image ?? null;

    if (session.accessToken && session.provider === "discord") {
      const profile = await getDiscordProfile(session.accessToken);
      if (profile) {
        username = profile.global_name || profile.username || username;
        avatarUrl = profile.avatar
          ? `https://cdn.discordapp.com/avatars/${profile.id}/${profile.avatar}.png`
          : avatarUrl;
      }
    }

    // Get (or create) a webhook for this channel so we can impersonate the user
    const webhookUrl = await getOrCreateWebhook(channelId);

    // Execute the webhook with the user's name + avatar
    const res = await fetch(`${webhookUrl}?wait=true`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        content,
        username,
        avatar_url: avatarUrl,
        allowed_mentions: { parse: [] }, // suppress unwanted @mentions
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      console.error("Webhook execute error:", err);
      return Response.json({ error: err }, { status: res.status });
    }

    const sent = await res.json();
    return Response.json({
      ok: true,
      id: sent.id,
      sentAs: { username, avatarUrl },
    });
  } catch (err) {
    console.error("Discord send error:", err);
    return Response.json({ error: String(err) }, { status: 500 });
  }
}
