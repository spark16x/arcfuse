"use client";

import { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { DiscordConnectModal } from '@/components/dashboard/DiscordConnectModal';
import { inMemoryDb } from '@/lib/db-store';

function Step4Content() {
  const searchParams = useSearchParams();

  const [connections, setConnections] = useState({
    discord: false,
    github: false,
    reddit: false,
    telegram: false
  });

  // GitHub-specific state
  const [githubUser, setGithubUser] = useState(null); // { username, avatar_url, name }
  const [githubLoading, setGithubLoading] = useState(false);
  const [githubError, setGithubError] = useState(null);

  // Discord-specific state
  const [discordUser, setDiscordUser] = useState(null); // { username, global_name, avatar_url, discord_id }
  const [discordLoading, setDiscordLoading] = useState(false);
  const [discordError, setDiscordError] = useState(null);

  const [discordModalOpen, setDiscordModalOpen] = useState(false);

  // Fetch integrations from localStorage
  const fetchIntegrations = async () => {
    try {
      const data = inMemoryDb.integrations || [];
      const newConns = { discord: false, github: false, reddit: false, telegram: false };
      let ghUser = null;
      let dcUser = null;
      data.forEach(item => {
        if (item.status === 'connected') {
          newConns[item.provider || item.id] = true;
          if ((item.provider === 'github' || item.id === 'github') && item.settings) {
            ghUser = {
              username: item.settings.github_username,
              avatar_url: item.settings.avatar_url,
              name: item.settings.name,
            };
          }
          if ((item.provider === 'discord' || item.id === 'discord') && item.settings) {
            dcUser = {
              username: item.settings.discord_username,
              global_name: item.settings.discord_global_name,
              avatar_url: item.settings.avatar_url,
              discord_id: item.settings.discord_id,
            };
          }
        }
      });
      setConnections(prev => ({ ...prev, ...newConns }));
      setGithubUser(ghUser);
      setDiscordUser(dcUser);
    } catch (err) {
      console.error("Error fetching integrations:", err);
    }
  };

  useEffect(() => {
    fetchIntegrations();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Handle mock GitHub redirect status if any
  useEffect(() => {
    const githubStatus = searchParams.get('github');
    if (githubStatus === 'connected') {
      fetchIntegrations();
    } else if (githubStatus === 'error') {
      const errMsg = searchParams.get('error') || 'Unknown error during GitHub connection.';
      setGithubError(decodeURIComponent(errMsg));
    } else if (githubStatus === 'denied') {
      setGithubError('You denied access to GitHub. Please try again.');
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  // Handle mock Discord redirect status if any
  useEffect(() => {
    const discordStatus = searchParams.get('discord');
    if (discordStatus === 'connected') {
      fetchIntegrations().then(() => {
        setDiscordModalOpen(true);
      });
    } else if (discordStatus === 'error') {
      const errMsg = searchParams.get('error') || 'Unknown error during Discord connection.';
      setDiscordError(decodeURIComponent(errMsg));
    } else if (discordStatus === 'denied') {
      setDiscordError('You denied access to Discord. Please try again.');
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  // Simulate GitHub OAuth connection locally
  const handleGithubConnect = () => {
    setGithubLoading(true);
    setGithubError(null);
    setTimeout(() => {
      if (!inMemoryDb.integrations) inMemoryDb.integrations = [];
      const data = inMemoryDb.integrations;

      const newIntegration = {
        id: 'github',
        provider: 'github',
        status: 'connected',
        settings: {
          github_username: 'spark16x',
          avatar_url: 'https://i.pravatar.cc/150?u=github',
          name: 'Spark'
        }
      };

      const index = data.findIndex(i => i.provider === 'github' || i.id === 'github');
      if (index > -1) data[index] = { ...data[index], ...newIntegration };
      else data.push(newIntegration);

      if (!inMemoryDb.activity_timeline) inMemoryDb.activity_timeline = [];
      const timeline = inMemoryDb.activity_timeline;
      timeline.unshift({
        id: Date.now(),
        action: 'Connected GitHub as "spark16x"',
        time: 'Just now',
        icon: 'code'
      });

      setConnections(prev => ({ ...prev, github: true }));
      setGithubUser({
        username: 'spark16x',
        avatar_url: 'https://i.pravatar.cc/150?u=github',
        name: 'Spark'
      });
      setGithubLoading(false);
    }, 1000);
  };

  const handleGithubDisconnect = async () => {
    try {
      if (!inMemoryDb.integrations) inMemoryDb.integrations = [];
      const data = inMemoryDb.integrations;

      const index = data.findIndex(i => i.provider === 'github' || i.id === 'github');
      if (index > -1) {
        data[index].status = 'disconnected';
        data[index].settings = {};
      }

      if (!inMemoryDb.activity_timeline) inMemoryDb.activity_timeline = [];
      const timeline = inMemoryDb.activity_timeline;
      timeline.unshift({
        id: Date.now(),
        action: 'Disconnected GitHub integration',
        time: 'Just now',
        icon: 'link_off'
      });

      setConnections(prev => ({ ...prev, github: false }));
      setGithubUser(null);
    } catch (err) {
      console.error("Failed to disconnect GitHub:", err);
    }
  };

  // Simulate Discord OAuth flow
  const handleDiscordOAuth = () => {
    setDiscordLoading(true);
    setDiscordError(null);
    setTimeout(() => {
      setDiscordLoading(false);
      setDiscordModalOpen(true);
    }, 1000);
  };

  const handleDiscordConnect = async (guildName, channels, guildId, channelIds) => {
    try {
      setDiscordModalOpen(false);

      if (!inMemoryDb.integrations) inMemoryDb.integrations = [];
      const data = inMemoryDb.integrations;

      const newIntegration = {
        id: 'discord',
        provider: 'discord',
        status: 'connected',
        settings: {
          discord_username: 'spark_user',
          discord_global_name: 'Spark User',
          avatar_url: 'https://i.pravatar.cc/150?u=discord',
          discord_id: guildId,
          guild: guildName,
          channels: channels,
          channel_ids: channelIds
        }
      };

      const index = data.findIndex(i => i.provider === 'discord' || i.id === 'discord');
      if (index > -1) data[index] = { ...data[index], ...newIntegration };
      else data.push(newIntegration);

      if (!inMemoryDb.activity_timeline) inMemoryDb.activity_timeline = [];
      const timeline = inMemoryDb.activity_timeline;
      timeline.unshift({
        id: Date.now(),
        action: `Connected Discord server "${guildName}" (synced channels: ${channels.map(c => '#' + c).join(', ')})`,
        time: 'Just now',
        icon: 'chat'
      });

      if (!inMemoryDb.unified_feed) inMemoryDb.unified_feed = [];
      const feed = inMemoryDb.unified_feed;

      const seedMessages = [
        {
          id: Date.now(),
          platform: "discord",
          platform_icon: "chat",
          user_name: "Sophia Patel",
          avatar: "https://i.pravatar.cc/150?u=sophia",
          content: `Hey team! Just synced our Discord server. Channel #${channels[0] || 'general'} is successfully linked to Arcfuse.`,
          timestamp: "Just now",
          type: "message",
          color: "#5865F2",
          likes: 3,
          comments_count: 0,
          reposts_count: 0,
          liked: false,
          reposted: false,
          comments: []
        },
        {
          id: Date.now() + 1,
          platform: "discord",
          platform_icon: "chat",
          user_name: "Alex Chen",
          avatar: "https://i.pravatar.cc/150?u=alex",
          content: `Awesome. Now we can review the mobile layouts in #${channels[1] || 'dev-log'} directly from our workspace feed.`,
          timestamp: "1 min ago",
          type: "message",
          color: "#5865F2",
          likes: 6,
          comments_count: 1,
          reposts_count: 0,
          liked: false,
          reposted: false,
          comments: []
        }
      ];

      feed.unshift(...seedMessages);

      setConnections(prev => ({ ...prev, discord: true }));
      setDiscordUser({
        username: 'spark_user',
        global_name: 'Spark User',
        avatar_url: 'https://i.pravatar.cc/150?u=discord',
        discord_id: guildId
      });
    } catch (err) {
      console.error("Failed to complete Discord integration flow:", err);
    }
  };

  const handleDisconnect = async (provider) => {
    try {
      if (!inMemoryDb.integrations) inMemoryDb.integrations = [];
      const data = inMemoryDb.integrations;

      const index = data.findIndex(i => i.provider === provider || i.id === provider);
      if (index > -1) {
        data[index].status = 'disconnected';
        data[index].settings = {};
      }

      if (!inMemoryDb.activity_timeline) inMemoryDb.activity_timeline = [];
      const timeline = inMemoryDb.activity_timeline;
      timeline.unshift({
        id: Date.now(),
        action: `Disconnected from ${provider}`,
        time: 'Just now',
        icon: 'link_off'
      });

      setConnections(prev => ({ ...prev, [provider]: false }));
      if (provider === 'discord') setDiscordUser(null);
      if (provider === 'github') setGithubUser(null);
    } catch (err) {
      console.error("Failed to disconnect integration:", err);
    }
  };

  return (
    <div className="min-h-screen flex flex-col text-on-surface bg-[#fcf8ff] font-['Geist',_sans-serif]">
      {/* Top Navigation */}
      <header className="fixed top-0 w-full z-50 bg-surface/80 backdrop-blur-md border-b border-outline-variant/50">
        <div className="flex justify-between items-center h-16 px-margin-mobile md:px-margin-desktop max-w-[1280px] mx-auto">
          <div className="font-headline-md text-headline-md font-bold text-primary">Arcfuse</div>
          <div className="flex items-center gap-sm">
            <span className="font-label-md text-label-md text-secondary uppercase tracking-widest">Step 4 of 4</span>
            <div className="w-24 h-1.5 bg-surface-container rounded-full overflow-hidden">
              <div className="h-full bg-primary-container w-full"></div>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-grow pt-32 pb-xl px-margin-mobile md:px-margin-desktop max-w-[960px] mx-auto w-full">
        {/* Header Section */}
        <section className="mb-xl text-center">
          <h1 className="font-display-lg text-display-lg text-on-surface mb-sm">Bring your tools together</h1>
          <p className="font-body-lg text-body-lg text-secondary max-w-2xl mx-auto">
            Connect Arcfuse with the platforms you use daily to automate workflows, sync data, and centralize your communication.
          </p>
        </section>

        {/* Bento-style Integration Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-md">

          {/* ── GitHub Card ──────────────────────────────────────────────── */}
          <div className="bg-surface-container-lowest border border-outline-variant p-md rounded-xl flex flex-col justify-between relative overflow-hidden transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_12px_24px_-10px_rgba(30,0,169,0.08)]">
            {connections.github && (
              <div className="absolute top-0 right-0 p-sm">
                <div className="flex items-center gap-xs bg-emerald-50 text-emerald-700 px-base py-xs rounded-full border border-emerald-100 animate-in fade-in duration-200">
                  <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                  <span className="font-label-md text-label-md">Connected</span>
                </div>
              </div>
            )}

            <div>
              {/* Logo row + connected user pill */}
              <div className="flex items-center gap-sm mb-md">
                <div className="w-12 h-12 rounded-lg bg-on-surface flex items-center justify-center flex-shrink-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    alt="GitHub Logo"
                    className="w-7 h-7 invert"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDIjl9zx9yucM_5FDwV2JJeMH41gAtq5g7v7yI7NJb2nu3ZeYiNEpmZb29cEOj8A7-nIOmeCapffYP9aJ8GI8JQ0ml1WN78Qyii7wfbkFuYCNH8hTeuHK0k01Xa_VzPZ1IAHuD2pwxMurEglYefTZ8owJWhg8-HRw6k_rw1wjmpWMxKzr9HQHJvfUqjDFGAD-94tMN1jEQKphW5qsO7AkKAh9ToYYPavBJXasehCo8hHpX1qR-kybqeIeIY9UL7jfbNBrsYD265sno"
                  />
                </div>

                {/* Connected GitHub user pill */}
                {connections.github && githubUser?.username && (
                  <div className="flex items-center gap-xs bg-surface-container px-sm py-xs rounded-full border border-outline-variant animate-in fade-in duration-300">
                    {githubUser.avatar_url && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={githubUser.avatar_url}
                        alt={githubUser.username}
                        className="w-5 h-5 rounded-full"
                      />
                    )}
                    <span className="font-label-sm text-label-sm text-on-surface-variant">@{githubUser.username}</span>
                  </div>
                )}
              </div>

              <h3 className="font-headline-md text-headline-md mb-xs">GitHub</h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant mb-lg">
                Sync pull requests, track repository issues, and automate your CI/CD deployments directly within Arcfuse.
              </p>

              {/* Error state */}
              {githubError && (
                <div className="flex items-start gap-xs bg-red-50 border border-red-100 rounded-lg px-sm py-xs mb-md">
                  <span className="material-symbols-outlined text-[16px] text-red-600 flex-shrink-0 mt-0.5">error</span>
                  <p className="font-body-sm text-body-sm text-red-700">{githubError}</p>
                </div>
              )}
            </div>

            {/* Action button */}
            {connections.github ? (
              <button
                id="github-disconnect-btn"
                onClick={handleGithubDisconnect}
                className="w-full py-sm px-md rounded-lg border border-destructive/20 text-destructive bg-destructive/5 hover:bg-destructive hover:text-white transition-all duration-200 cursor-pointer font-label-md text-label-md active:scale-[0.98]"
              >
                Disconnect GitHub
              </button>
            ) : (
              <button
                id="github-connect-btn"
                onClick={handleGithubConnect}
                disabled={githubLoading}
                className="w-full py-sm px-md rounded-lg bg-on-surface text-surface font-label-md text-label-md hover:opacity-85 transition-all cursor-pointer shadow-sm active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-xs"
              >
                {githubLoading ? (
                  <>
                    <span className="material-symbols-outlined text-[18px] animate-spin">progress_activity</span>
                    Connecting GitHub…
                  </>
                ) : (
                  <>
                    <span className="material-symbols-outlined text-[18px]">link</span>
                    Connect GitHub
                  </>
                )}
              </button>
            )}
          </div>

          {/* ── Discord Card ─────────────────────────────────────────────── */}
          <div className="bg-surface-container-lowest border border-outline-variant p-md rounded-xl flex flex-col justify-between relative overflow-hidden transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_12px_24px_-10px_rgba(30,0,169,0.08)]">
            {connections.discord && (
              <div className="absolute top-0 right-0 p-sm">
                <div className="flex items-center gap-xs bg-emerald-50 text-emerald-700 px-base py-xs rounded-full border border-emerald-100 animate-in fade-in duration-200">
                  <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                  <span className="font-label-md text-label-md">Connected</span>
                </div>
              </div>
            )}
            <div>
              {/* Logo row + connected user pill */}
              <div className="flex items-center gap-sm mb-md">
                <div className="w-12 h-12 rounded-lg bg-[#5865F2] flex items-center justify-center flex-shrink-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img alt="Discord Logo" className="w-7 h-7 invert" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD2LscewxgaKiJVHTnih5GSGQFADS0u35i1aaSp_C1cYJQCEWMQMkxIpjoINy3572k-U9nfYOIJbxfKK2DbajHwtDLK3lWXkNzr9Ru9ddNCrYXnp9fODFrLEjuJW5KgSk7rTwOV4ldMD46kTmmiKvC90jMZ9gDQ3glskJYsf3WrhstmDZ4L8kYGxj1aXtlys1IiaMKTs3zfHDJddwiiM0Gmlc0WjVvlb7qkVhUZHoTmmU5UEI68BQ6gW56wn_1lnEGGzdJ2b1s3Mgo"/>
                </div>

                {/* Connected Discord user pill */}
                {connections.discord && discordUser?.username && (
                  <div className="flex items-center gap-xs bg-surface-container px-sm py-xs rounded-full border border-outline-variant animate-in fade-in duration-300">
                    {discordUser.avatar_url ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={discordUser.avatar_url}
                        alt={discordUser.username}
                        className="w-5 h-5 rounded-full"
                      />
                    ) : (
                      <div className="w-5 h-5 rounded-full bg-[#5865F2] flex items-center justify-center text-white text-[9px] font-bold">
                        {discordUser.username.substring(0, 2).toUpperCase()}
                      </div>
                    )}
                    <span className="font-label-sm text-label-sm text-on-surface-variant">
                      {discordUser.global_name || discordUser.username}
                    </span>
                  </div>
                )}
              </div>

              <h3 className="font-headline-md text-headline-md mb-xs">Discord</h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant mb-lg">
                Receive real-time notifications in your channels and bridge community conversations into your workspace.
              </p>

              {/* Error state */}
              {discordError && (
                <div className="flex items-start gap-xs bg-red-50 border border-red-100 rounded-lg px-sm py-xs mb-md">
                  <span className="material-symbols-outlined text-[16px] text-red-600 flex-shrink-0 mt-0.5">error</span>
                  <p className="font-body-sm text-body-sm text-red-700">{discordError}</p>
                </div>
              )}
            </div>

            {connections.discord ? (
              <div className="flex flex-col gap-xs">
                <button
                  id="discord-configure-btn"
                  onClick={() => setDiscordModalOpen(true)}
                  className="w-full py-sm px-md rounded-lg bg-[#5865F2]/10 text-[#5865F2] border border-[#5865F2]/20 font-label-md text-label-md hover:bg-[#5865F2]/20 transition-all duration-200 cursor-pointer active:scale-[0.98]"
                >
                  Configure Channels
                </button>
                <button
                  id="discord-disconnect-btn"
                  onClick={() => handleDisconnect('discord')}
                  className="w-full py-sm px-md rounded-lg border border-destructive/20 text-destructive bg-destructive/5 hover:bg-destructive hover:text-white transition-all duration-200 cursor-pointer font-label-md text-label-md active:scale-[0.98]"
                >
                  Disconnect
                </button>
              </div>
            ) : (
              <button
                id="discord-connect-btn"
                onClick={handleDiscordOAuth}
                disabled={discordLoading}
                className="w-full py-sm px-md rounded-lg bg-[#5865F2] text-white font-label-md text-label-md hover:opacity-90 transition-all cursor-pointer shadow-sm active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-xs"
              >
                {discordLoading ? (
                  <>
                    <span className="material-symbols-outlined text-[18px] animate-spin">progress_activity</span>
                    Connecting Discord…
                  </>
                ) : (
                  <>
                    <span className="material-symbols-outlined text-[18px]">link</span>
                    Connect Discord
                  </>
                )}
              </button>
            )}
          </div>

          {/* ── Reddit Card ──────────────────────────────────────────────── */}
          <div className="bg-surface-container-lowest border border-outline-variant p-md rounded-xl flex flex-col justify-between transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_12px_24px_-10px_rgba(30,0,169,0.08)]">
            <div>
              <div className="w-12 h-12 rounded-lg bg-[#FF4500] flex items-center justify-center mb-md">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img alt="Reddit Logo" className="w-7 h-7 invert" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDwLg-asXRsx8tWlNm6ZRWrqF56lXh_hNfEzxBLyTFnX75jCf9yOaQTCOPal5Rdl5_GBuHa26uYaU8ReQ2ZcK78aIgMUHbvJTSfNQrduVmv6Aotbgq4ZpA8dATapyYmCWS4VUUUXktAU3Qrc4B1j9TL8wosM-DmWX7egTXoKbXHgWn0o2v3O8qQNDwkNpMdDHaHs9d_VyZZYgbUQHIgtF79yd-d3RgcFrIvn8IgIn4t-rZhvCs-eHZldWtF3UBvHab5vPKGazYlWZ0"/>
              </div>
              <h3 className="font-headline-md text-headline-md mb-xs">Reddit</h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant mb-lg">
                Monitor subreddit mentions, track industry trends, and engage with relevant threads from your dashboard.
              </p>
            </div>
            <button className="w-full py-sm px-md rounded-lg bg-primary/20 text-primary-container font-label-md text-label-md cursor-not-allowed opacity-50">
              Unavailable
            </button>
          </div>

          {/* ── Telegram Card ────────────────────────────────────────────── */}
          <div className="bg-surface-container-lowest border border-outline-variant p-md rounded-xl flex flex-col justify-between transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_12px_24px_-10px_rgba(30,0,169,0.08)]">
            <div>
              <div className="w-12 h-12 rounded-lg bg-[#0088CC] flex items-center justify-center mb-md">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img alt="Telegram Logo" className="w-7 h-7 invert" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA38iZnmfncMnD-whyU2z2ttb7UodIhrj3Hj0N1642C_A_mKPOJESqApSmNRaW_lv27-hZPs5W1PTJP4gND08vL56lAYj09xGEKD-Af3Lnu-asjLcW-5BXwrvUsuio_xaw63-ZyeoSgguuiHYEX0R0byISUpgZ12fXTLRknAYb_RjgpbOa_0DSnqz2AopMKyEyk6qofabPCy3_PcqQ_Y7buDjVwrRKgECblw669uo9vjrWx8gsniq0bZ8jgfzaEvOhpjBiRjcziEec"/>
              </div>
              <h3 className="font-headline-md text-headline-md mb-xs">Telegram</h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant mb-lg">
                Integrate bots, manage group alerts, and sync secure messaging threads with your project management flow.
              </p>
            </div>
            <button className="w-full py-sm px-md rounded-lg bg-primary/20 text-primary-container font-label-md text-label-md cursor-not-allowed opacity-50">
              Unavailable
            </button>
          </div>
        </div>

        {/* Action Footer Section */}
        <div className="mt-xl flex flex-col items-center gap-md">
          <Link href="/onboarding/success" className="group relative flex items-center justify-center gap-sm bg-primary-container text-on-primary px-xl py-md rounded-full font-label-md text-label-md hover:scale-[1.02] transition-transform shadow-lg overflow-hidden">
            <span className="relative z-10">Finish Setup</span>
            <span className="material-symbols-outlined relative z-10 group-hover:translate-x-1 transition-transform">arrow_forward</span>
            <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          </Link>
          <Link href="/onboarding/success" className="font-label-md text-label-md text-secondary hover:text-primary transition-colors cursor-pointer">
            Skip for now
          </Link>
        </div>
      </main>

      {/* Branding Footer */}
      <footer className="w-full py-md border-t border-outline-variant bg-surface">
        <div className="flex flex-col md:flex-row justify-between items-center px-margin-mobile md:px-margin-desktop max-w-[1280px] mx-auto gap-sm">
          <div className="font-label-md text-label-md font-semibold text-on-surface">Arcfuse</div>
          <div className="flex gap-md">
            <span className="font-body-sm text-body-sm text-secondary hover:text-primary cursor-pointer transition-colors">Privacy Policy</span>
            <span className="font-body-sm text-body-sm text-secondary hover:text-primary cursor-pointer transition-colors">Terms of Service</span>
            <span className="font-body-sm text-body-sm text-secondary hover:text-primary cursor-pointer transition-colors">Help Center</span>
          </div>
          <p className="font-body-sm text-body-sm text-secondary">© 2024 Arcfuse Inc. All rights reserved.</p>
        </div>
      </footer>

      {/* Discord Sync Modal */}
      <DiscordConnectModal
        isOpen={discordModalOpen}
        onClose={() => setDiscordModalOpen(false)}
        onConnect={handleDiscordConnect}
      />
    </div>
  );
}

export default function Step4() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-[#fcf8ff]">
        <div className="flex flex-col items-center gap-4">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#0078FF] border-t-transparent"></div>
          <p className="text-sm font-medium text-muted-foreground">Loading onboarding tools...</p>
        </div>
      </div>
    }>
      <Step4Content />
    </Suspense>
  );
}
