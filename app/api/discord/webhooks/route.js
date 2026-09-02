import { auth } from "@/auth";

const DISCORD_API = "https://discord.com/api/v10";
const BOT_TOKEN = process.env.DISCORD_BOT_TOKEN;

export async function POST(request) {
  try {
    const session = await auth();

    if (!session?.accessToken || session?.provider !== "discord") {
      return Response.json({ error: "Discord not connected" }, { status: 401 });
    }

    const body = await request.json();
    const { guildName, channels, guildId, channelIds } = body;

    // Ideally, we'd store this configuration in a database associated with the user.
    // For MVP, we simply echo back the settings as "saved".

    return Response.json({
      ok: true,
      settings: {
        guild: guildName,
        guild_id: guildId,
        channels: channels,
        channel_ids: channelIds
      }
    });
  } catch (err) {
    console.error("Discord webhooks route error:", err);
    return Response.json({ error: String(err) }, { status: 500 });
  }
}
