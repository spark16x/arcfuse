import { auth } from "@/auth";

const DISCORD_API = "https://discord.com/api/v10";

export async function GET() {
  try {
    const session = await auth();

    if (!session?.accessToken || session?.provider !== "discord") {
      return Response.json({ error: "Discord not connected", guilds: [] }, { status: 401 });
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
      return Response.json({ error: "Failed to fetch guilds", guilds: [] }, { status: res.status });
    }

    const guilds = await res.json();

    // For each guild, try to fetch channels using the Bot token (bot must be in the server)
    const botToken = process.env.DISCORD_BOT_TOKEN;
    const guildsWithChannels = await Promise.all(
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
          return { ...guild, channels: textChannels };
        } catch {
          return { ...guild, channels: [] };
        }
      })
    );

    return Response.json({ guilds: guildsWithChannels });
  } catch (err) {
    console.error("Discord guilds route error:", err);
    return Response.json({ error: String(err), guilds: [] }, { status: 500 });
  }
}
