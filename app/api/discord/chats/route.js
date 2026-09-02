import { auth } from "@/auth";

const DISCORD_API = "https://discord.com/api/v10";

export async function GET() {
  try {
    const session = await auth();

    if (!session?.accessToken || session?.provider !== "discord") {
      return Response.json({ error: "Discord not connected", chats: [] }, { status: 401 });
    }

    // Fetch guilds the user belongs to via their OAuth token
    const res = await fetch(`${DISCORD_API}/users/@me/guilds`, {
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
      },
      cache: "no-store",
    });

    if (!res.ok) {
      const err = await res.text();
      console.error("Discord guilds error:", err);
      return Response.json({ error: "Failed to fetch guilds", chats: [] }, { status: res.status });
    }

    const guilds = await res.json();

    // For each guild, try to fetch channels using the Bot token (bot must be in the server)
    const botToken = process.env.DISCORD_BOT_TOKEN;
    const discordChats = [];

    await Promise.all(
      guilds.slice(0, 10).map(async (guild) => {
        try {
          const chRes = await fetch(`${DISCORD_API}/guilds/${guild.id}/channels`, {
            headers: { Authorization: `Bot ${botToken}` },
            cache: "no-store",
          });
          const channels = chRes.ok ? await chRes.json() : [];
          const textChannels = Array.isArray(channels)
            ? channels.filter((c) => c.type === 0) // type 0 = GUILD_TEXT
            : [];

          for (const ch of textChannels.slice(0, 5)) {
            discordChats.push({
              id: ch.id,
              channelId: ch.id,
              name: `#${ch.name}`,
              guildName: guild.name,
              guildId: guild.id,
              avatar: guild.icon
                ? `https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png`
                : `https://i.pravatar.cc/40?u=${guild.id}`,
              platform: 'discord',
              messages: [],
            });
          }
        } catch {
          // Ignore
        }
      })
    );

    return Response.json({ chats: discordChats });
  } catch (err) {
    console.error("Discord chats route error:", err);
    return Response.json({ error: String(err), chats: [] }, { status: 500 });
  }
}
