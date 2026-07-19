"use client";

import { useState, useEffect, useRef, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Sidebar } from "@/components/dashboard/Sidebar";
import { TopBar } from "@/components/dashboard/TopBar";
import { OverviewCards } from "@/components/dashboard/OverviewCards";
import { UnifiedFeed } from "@/components/dashboard/UnifiedFeed";
import { IntegrationsPanel } from "@/components/dashboard/IntegrationsPanel";
import { QuickActions } from "@/components/dashboard/QuickActions";
import { ActivityTimeline } from "@/components/dashboard/ActivityTimeline";
import { DiscordConnectModal } from "@/components/dashboard/DiscordConnectModal";
import { GitHubPanel } from "@/components/dashboard/GitHubPanel";
import { DiscordPanel } from "@/components/dashboard/DiscordPanel";
import { AccountPanel } from "@/components/dashboard/AccountPanel";
import { mockUser, stats, integrations, unifiedFeed, activityTimeline } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import { inMemoryDb } from "@/lib/db-store";

class MockDatabaseClient {
  auth = {
    getUser: async () => {
      try {
        const sessionRes = await fetch('/api/auth/session');
        const session = sessionRes.ok ? await sessionRes.json() : null;
        if (session?.user) {
          return { data: { user: { id: session.user.id || session.user.email || "mock-user-id", email: session.user.email, name: session.user.name, image: session.user.image } }, error: null };
        }
      } catch (e) {}
      return { data: { user: { id: "mock-user-id", email: "pratham@arcfuse.com", name: "Pratham", image: "https://i.pravatar.cc/150?u=pratham" } }, error: null };
    }
  };

  from(table) {
    return {
      select: function() {
        let data = inMemoryDb[table] || [];

        const chain = {
          order: function() {
            data = [...data].sort((a, b) => (b.id || 0) - (a.id || 0));
            return this;
          },
          eq: function(field, val) {
            data = data.filter(item => item[field] === val);
            if (table === 'workspace_settings' && data.length === 0 && field === 'user_id' && typeof window !== 'undefined') {
              const local = localStorage.getItem('workspace_settings_' + val);
              if (local) {
                try {
                  const parsed = JSON.parse(local);
                  data = [parsed];
                  if (!inMemoryDb.workspace_settings) inMemoryDb.workspace_settings = [];
                  inMemoryDb.workspace_settings.push(parsed);
                } catch (e) {}
              }
            }
            return this;
          },
          maybeSingle: function() {
            return Promise.resolve({ data: data[0] || null, error: null });
          },
          then: function(cb) {
            return Promise.resolve({ data, error: null }).then(cb);
          }
        };
        chain.then = function(onfulfilled) {
          return Promise.resolve({ data, error: null }).then(onfulfilled);
        };
        return chain;
      },
      
      insert: async function(item) {
        try {
          if (!inMemoryDb[table]) inMemoryDb[table] = [];
          const list = inMemoryDb[table];
          const items = Array.isArray(item) ? item : [item];
          list.unshift(...items);
          return { data: items, error: null };
        } catch (e) {
          return { data: null, error: e };
        }
      },

      update: function(fields) {
        return {
          eq: function(field, val) {
            try {
              if (!inMemoryDb[table]) inMemoryDb[table] = [];
              const list = inMemoryDb[table];
              const idx = list.findIndex(item => item[field] === val);
              let updatedItem;
              if (idx > -1) {
                list[idx] = { ...list[idx], ...fields };
                updatedItem = list[idx];
              } else {
                updatedItem = { [field]: val, ...fields };
                list.push(updatedItem);
              }
              if (table === 'workspace_settings' && field === 'user_id' && typeof window !== 'undefined') {
                localStorage.setItem('workspace_settings_' + val, JSON.stringify(updatedItem));
              }
              return Promise.resolve({ data: list, error: null });
            } catch (e) {
              return Promise.resolve({ data: null, error: e });
            }
          }
        };
      },

      upsert: async function(fields) {
        try {
          if (!inMemoryDb[table]) inMemoryDb[table] = [];
          const list = inMemoryDb[table];
          const idx = list.findIndex(item => item.provider === fields.provider || item.id === fields.provider);
          if (idx > -1) {
            list[idx] = { ...list[idx], ...fields };
          } else {
            list.push(fields);
          }
          return { data: list, error: null };
        } catch (e) {
          return { data: null, error: e };
        }
      }
    };
  }
}

import {
  Sparkles,
  X,
  Send,
  Check,
  PenSquare,
  Cable,
  Settings,
  Search,
  Save,
  ChevronRight,
  TrendingUp,
  ArrowUpRight,
  Camera
} from "lucide-react";

function DashboardContent() {
  const db = new MockDatabaseClient();

  // Navigation & Sub-views State
  const [activeView, setActiveView] = useState('overview');
  const [discordModalOpen, setDiscordModalOpen] = useState(false);
  const [oauthProviders, setOauthProviders] = useState([]);
  const searchParams = useSearchParams();

  useEffect(() => {
    const loadData = async () => {
      try {
        // Get the real authenticated user
        const { data: { user }, error: authError } = await db.auth.getUser();

        if (authError || !user) {
          console.log("No authenticated user session found, falling back to mock user profile.");
          return;
        }

        // Fetch OAuth provider from session
        try {
          const sessionRes = await fetch('/api/auth/session');
          if (sessionRes.ok) {
            const sessionData = await sessionRes.json();
            if (sessionData?.provider) {
              setOauthProviders([sessionData.provider]);
            }
          }
        } catch (e) { /* session fetch is best-effort */ }

        // Fetch settings for this user
        let { data: settingsData, error: settingsError } = await db
          .from('workspace_settings')
          .select('*')
          .eq('user_id', user.id)
          .maybeSingle();

        // If settings don't exist for the user, redirect to onboarding
        if (!settingsData || settingsError) {
          console.log("No workspace settings found, redirecting to onboarding.");
          window.location.href = '/onboarding';
          return;
        }

        if (settingsData) {
          setUserProfile({
            name: settingsData.name,
            email: settingsData.email,
            slug: settingsData.slug,
            avatar: settingsData.avatar
          });
          // Mutate the mockUser object fields so mock components reference the new authenticated details correctly
          mockUser.name = settingsData.name;
          mockUser.email = settingsData.email;
          mockUser.avatar = settingsData.avatar;
        }

        // 2. Fetch activity timeline
        const { data: timelineData, error: timelineError } = await db
          .from('activity_timeline')
          .select('*')
          .order('id', { ascending: false });

        if (!timelineError && timelineData) {
          setEvents(timelineData);
        }

        // 3. Fetch unified feed
        const { data: feedData, error: feedError } = await db
          .from('unified_feed')
          .select('*')
          .order('id', { ascending: false });

        if (!feedError && feedData) {
          const mappedFeed = feedData.map(item => ({
            id: item.id,
            platform: item.platform,
            platformIcon: item.platform_icon,
            user: item.user_name,
            avatar: item.avatar,
            content: item.content,
            timestamp: item.timestamp,
            type: item.type,
            color: item.color,
            likes: item.likes || 0,
            commentsCount: item.comments_count || 0,
            repostsCount: item.reposts_count || 0,
            liked: item.liked || false,
            reposted: item.reposted || false,
            comments: item.comments || []
          }));
          setFeedItems(mappedFeed);
        }
        // 4. Fetch integration statuses
        const { data: integrationsData, error: integrationsError } = await db
          .from('integrations')
          .select('*');

        if (!integrationsError && integrationsData) {
          setConnections(prev => prev.map(app => {
            const dbApp = integrationsData.find(i => i.provider === app.id);
            if (dbApp) {
              return {
                ...app,
                status: dbApp.status,
                settings: dbApp.settings || {}
              };
            }
            return app;
          }));
        }

        // 5. Fetch Discord guilds + channels and convert to chats
        try {
          const guildsRes = await fetch('/api/discord/guilds');
          if (guildsRes.ok) {
            const { guilds } = await guildsRes.json();
            if (Array.isArray(guilds) && guilds.length > 0) {
              const discordChats = [];
              for (const guild of guilds) {
                const textChannels = guild.channels || [];
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
                    messages: [], // loaded on demand
                  });
                }
              }
              if (discordChats.length > 0) {
                setChats(prev => {
                  const nonDiscord = prev.filter(c => c.platform !== 'discord');
                  return [...discordChats, ...nonDiscord];
                });
                setSelectedChatId(discordChats[0].id);
              }
            }
          }
        } catch (err) {
          console.error('Failed to fetch Discord guilds:', err);
        }
      } catch (err) {
        console.error("Error loading data from Database:", err);
      }
    };

    loadData();
  }, []);

  // Shared Data States
  const [connections, setConnections] = useState(
    integrations.map(c => ({
      ...c,
      status: c.status === 'connected' ? 'connected' : 'disconnected'
    }))
  );

  const [feedItems, setFeedItems] = useState(
    unifiedFeed.map(item => {
      const stableIdHash = Math.abs(String(item.id).split('').reduce((a, b) => a + b.charCodeAt(0), 0));
      return {
        ...item,
        likes: (stableIdHash * 7) % 20,
        commentsCount: (stableIdHash * 3) % 5,
        repostsCount: (stableIdHash * 5) % 10,
        liked: false,
        reposted: false,
        comments: [],
      };
    })
  );

  const [events, setEvents] = useState(activityTimeline);

  const [notifications, setNotifications] = useState([
    { id: 1, title: 'New mention on Twitter', desc: 'Pratham mentioned you in a tweet', time: '10m ago', unread: true },
    { id: 2, title: 'GitHub PR Merged', desc: 'PR #42 successfully merged to main', time: '3h ago', unread: true },
    { id: 3, title: 'Discord integration alert', desc: 'Discord is syncing activity logs', time: '5h ago', unread: false },
  ]);

  // Overlays & UI States
  const [toast, setToast] = useState(null);
  const [isComposerOpen, setIsComposerOpen] = useState(false);
  const [composerTab, setComposerTab] = useState('publish'); // 'publish' or 'schedule'
  const [composerContent, setComposerContent] = useState('');
  const [composerSelectedPlatforms, setComposerSelectedPlatforms] = useState(['x']);

  const [isAIChatOpen, setIsAIChatOpen] = useState(false);
  const [aiInput, setAiInput] = useState('');
  const [isAITyping, setIsAITyping] = useState(false);
  const [aiMessages, setAiMessages] = useState([
    { sender: 'ai', text: `Hi ${mockUser.name}! I can help you summarize recent mentions, draft cross-platform posts, or schedule content. What can I do for you today?` }
  ]);

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Settings State
  const [userProfile, setUserProfile] = useState({
    name: mockUser.name,
    email: mockUser.email,
    slug: 'acme-studio',
    avatar: mockUser.avatar
  });

  // Messages / Chat Sub-Page State
  const [chats, setChats] = useState([
    {
      id: 'alex', name: 'Alex Chen', avatar: 'https://i.pravatar.cc/150?u=alex', platform: 'discord', messages: [
        { sender: 'them', senderName: 'Alex Chen', avatar: 'https://i.pravatar.cc/150?u=alex', text: 'Hey, can you review the latest Figma designs for the mobile app?', time: '10:14 AM' },
        { sender: 'me', senderName: 'Me', avatar: '', text: 'Sure! Let me take a look at the prototype link.', time: '10:16 AM' },
        { sender: 'them', senderName: 'Alex Chen', avatar: 'https://i.pravatar.cc/150?u=alex', text: 'Awesome, thanks! Let me know if you see any layout alignment issues.', time: '10:17 AM' }
      ]
    },
    {
      id: 'sarah', name: 'Sarah Jenkins', avatar: 'https://i.pravatar.cc/150?u=sarah', platform: 'slack', messages: [
        { sender: 'them', senderName: 'Sarah Jenkins', avatar: 'https://i.pravatar.cc/150?u=sarah', text: 'Deployment to production was successful. No errors reported.', time: '9:30 AM' },
        { sender: 'me', senderName: 'Me', avatar: '', text: 'Great work! Did the database migrations run smoothly?', time: '9:32 AM' },
        { sender: 'them', senderName: 'Sarah Jenkins', avatar: 'https://i.pravatar.cc/150?u=sarah', text: 'Yes, migrations completed in 240ms with zero conflicts.', time: '9:35 AM' }
      ]
    }
  ]);
  const [selectedChatId, setSelectedChatId] = useState('alex');
  const [messageInput, setMessageInput] = useState('');
  const [loadingMessages, setLoadingMessages] = useState(false);

  // Ref for auto-scrolling to the latest message
  const messagesEndRef = useRef(null);

  // Scroll to bottom whenever messages change or chat is switched
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chats, selectedChatId]);

  // Helpers
  const showToast = (message, type = 'success') => {
    setToast({ message, type });
  };

  // Handle ?github=connected / ?github=error after OAuth redirect back to dashboard
  useEffect(() => {
    const githubStatus = searchParams.get('github');
    if (githubStatus === 'connected') {
      db.from('integrations').select('*').then(({ data }) => {
        if (data) {
          setConnections(prev => prev.map(app => {
            const dbApp = data.find(i => i.provider === app.id);
            if (dbApp) return { ...app, status: dbApp.status, settings: dbApp.settings || {} };
            return app;
          }));
        }
      });
      showToast('GitHub connected successfully! 🎉', 'success');
    } else if (githubStatus === 'error') {
      const errMsg = searchParams.get('error') || 'GitHub connection failed';
      showToast(`GitHub: ${decodeURIComponent(errMsg)}`, 'error');
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 3500);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  // Handle Command Palette Keyboard shortcut
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Load history + subscribe to live Discord messages via SSE
  useEffect(() => {
    const activeChat = chats.find(c => c.id === selectedChatId);
    if (!activeChat || activeChat.platform !== 'discord' || !activeChat.channelId) return;

    let eventSource = null;
    let cancelled = false;

    const startStream = (afterId) => {
      if (cancelled) return;
      const url = afterId
        ? `/api/discord/channels/${activeChat.channelId}/stream?after=${afterId}`
        : `/api/discord/channels/${activeChat.channelId}/stream`;

      eventSource = new EventSource(url);

      eventSource.addEventListener('messages', (e) => {
        try {
          const { messages: newMsgs } = JSON.parse(e.data);
          if (!newMsgs?.length) return;
          setChats(prev => prev.map(c => {
            if (c.id !== activeChat.id) return c;
            // Deduplicate by id
            const existingIds = new Set(c.messages.map(m => m.id));
            const fresh = newMsgs.filter(m => !existingIds.has(m.id));
            if (!fresh.length) return c;
            return { ...c, messages: [...c.messages, ...fresh] };
          }));
        } catch (err) {
          console.error('SSE parse error:', err);
        }
      });

      eventSource.addEventListener('error', () => {
        eventSource?.close();
        // Reconnect after 3 s on transient errors
        if (!cancelled) setTimeout(() => startStream(null), 3000);
      });
    };

    // Phase 1: load history
    if (activeChat.messages.length === 0) {
      setLoadingMessages(true);
      fetch(`/api/discord/channels/${activeChat.channelId}/messages`)
        .then(r => r.ok ? r.json() : { messages: [] })
        .then(({ messages: history }) => {
          if (cancelled) return;
          setChats(prev => prev.map(c =>
            c.id === selectedChatId ? { ...c, messages: history || [] } : c
          ));
          // Phase 2: open live stream starting after the last loaded message
          const lastId = history?.length ? history[history.length - 1].id : null;
          startStream(lastId);
        })
        .catch(err => console.error('Failed to load channel messages:', err))
        .finally(() => setLoadingMessages(false));
    } else {
      // History already loaded — go straight to live stream
      const lastId = activeChat.messages[activeChat.messages.length - 1].id;
      startStream(lastId);
    }

    return () => {
      cancelled = true;
      eventSource?.close();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedChatId]);


  const handleDiscordConnect = async (guildName, channels, guildId, channelIds) => {
    try {
      setDiscordModalOpen(false);
      const res = await fetch('/api/discord/webhooks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ guildName, channels, guildId, channelIds })
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || 'Failed to setup Discord channels & webhooks');
      }

      const resData = await res.json();
      const updatedSettings = resData.settings;

      const newLog = {
        id: Date.now(),
        action: `Connected Discord server "${guildName}" (synced channels: ${channels.map(c => '#' + c).join(', ')})`,
        time: 'Just now',
        icon: 'chat'
      };
      setEvents(e => [newLog, ...e]);
      await db.from('activity_timeline').insert(newLog);

      const newAlert = {
        id: Date.now(),
        title: 'Platform Added',
        desc: `Your account is now linked with Discord (${guildName})`,
        time: 'Just now',
        unread: true
      };
      setNotifications(n => [newAlert, ...n]);

      setConnections(prev => prev.map(c => c.id === 'discord' ? { ...c, status: 'connected', settings: updatedSettings } : c));

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

      const mappedSeed = seedMessages.map(item => ({
        id: item.id,
        platform: item.platform,
        platformIcon: item.platform_icon,
        user: item.user_name,
        avatar: item.avatar,
        content: item.content,
        timestamp: item.timestamp,
        type: item.type,
        color: item.color,
        likes: item.likes,
        commentsCount: item.comments_count,
        repostsCount: item.reposts_count,
        liked: item.liked,
        reposted: item.reposted,
        comments: item.comments
      }));
      setFeedItems(prev => [...mappedSeed, ...prev]);

      await db.from('unified_feed').insert(seedMessages);

      // Fetch and load the actual/mock Discord chats and messages after connecting
      try {
        const chatsRes = await fetch('/api/discord/chats');
        if (chatsRes.ok) {
          const chatsData = await chatsRes.json();
          if (chatsData.chats && chatsData.chats.length > 0) {
            setChats(prev => {
              const nonDiscord = prev.filter(c => c.platform !== 'discord');
              return [...chatsData.chats, ...nonDiscord];
            });
            setSelectedChatId(chatsData.chats[0].id);
          }
        }
      } catch (err) {
        console.error("Failed to fetch Discord chats after connection:", err);
      }

      showToast(`Discord is now connected!`, 'success');
    } catch (err) {
      console.error("Failed to complete Discord integration:", err);
      showToast(`Failed to link Discord!`, 'error');
    }
  };

  const toggleConnection = async (id) => {
    const app = connections.find(c => c.id === id);
    if (!app) return;

    // Discord: open modal to connect
    if (id === 'discord' && app.status !== 'connected') {
      setDiscordModalOpen(true);
      return;
    }

    // GitHub: redirect to OAuth flow to connect; handle disconnect by clearing token
    if (id === 'github') {
      if (app.status !== 'connected') {
        // Redirect to our GitHub OAuth route — it will come back to /dashboard?github=connected
        window.location.href = '/api/github/connect?redirect=/dashboard';
        return;
      } else {
        // Disconnect: clear token from DB
        try {
          await db.from('integrations').upsert({
            provider: 'github',
            status: 'disconnected',
            settings: {},
            updated_at: new Date().toISOString()
          }, { onConflict: 'provider' });
          setConnections(prev => prev.map(c => c.id === 'github' ? { ...c, status: 'disconnected', settings: {} } : c));
          const newLog = { id: Date.now(), action: 'Disconnected GitHub integration', time: 'Just now', icon: 'link_off' };
          setEvents(e => [newLog, ...e]);
          await db.from('activity_timeline').insert(newLog);
          showToast('GitHub disconnected', 'success');
        } catch (err) {
          console.error('Failed to disconnect GitHub:', err);
        }
        return;
      }
    }

    const isConnected = app.status === 'connected';
    const newStatus = isConnected ? 'disconnected' : 'connected';

    setConnections(prev => prev.map(c => c.id === id ? { ...c, status: newStatus } : c));

    try {
      await db.from('integrations').upsert({
        provider: id,
        status: newStatus,
        settings: {},
        updated_at: new Date().toISOString()
      }, { onConflict: 'provider' });
    } catch (err) {
      console.error(`Failed to update integration ${id} status in Database:`, err);
    }

    const newLog = {
      id: Date.now(),
      action: `${isConnected ? 'Disconnected from' : 'Connected to'} ${app.name}`,
      time: 'Just now',
      icon: app.icon || 'link'
    };
    setEvents(e => [newLog, ...e]);

    try {
      await db.from('activity_timeline').insert(newLog);
    } catch (error) {
      console.error("Failed to insert timeline log in Database:", error);
    }

    const newAlert = {
      id: Date.now(),
      title: `Platform ${isConnected ? 'Removed' : 'Added'}`,
      desc: `Your account is now ${isConnected ? 'unlinked' : 'linked'} with ${app.name}`,
      time: 'Just now',
      unread: true
    };
    setNotifications(n => [newAlert, ...n]);

    showToast(`${app.name} is now ${newStatus}!`, 'success');
  };

  const handleLike = async (id) => {
    let targetItem = null;
    setFeedItems(prev => prev.map(item => {
      if (item.id === id) {
        const liked = !item.liked;
        targetItem = {
          ...item,
          liked,
          likes: liked ? item.likes + 1 : item.likes - 1
        };
        return targetItem;
      }
      return item;
    }));

    if (targetItem) {
      try {
        await db
          .from('unified_feed')
          .update({
            liked: targetItem.liked,
            likes: targetItem.likes
          })
          .eq('id', id);
      } catch (err) {
        console.error("Failed to save like update to Database:", err);
      }
    }
  };

  const handleRepost = async (id) => {
    let targetItem = null;
    setFeedItems(prev => prev.map(item => {
      if (item.id === id) {
        const reposted = !item.reposted;
        targetItem = {
          ...item,
          reposted,
          repostsCount: reposted ? item.repostsCount + 1 : item.repostsCount - 1
        };
        return targetItem;
      }
      return item;
    }));
    showToast('Post successfully reposted!', 'success');

    if (targetItem) {
      try {
        await db
          .from('unified_feed')
          .update({
            reposted: targetItem.reposted,
            reposts_count: targetItem.repostsCount
          })
          .eq('id', id);
      } catch (err) {
        console.error("Failed to save repost update to Database:", err);
      }
    }
  };

  const handleComment = async (id) => {
    const commentText = prompt('Enter your comment:');
    if (!commentText || !commentText.trim()) return;

    let targetItem = null;
    setFeedItems(prev => prev.map(item => {
      if (item.id === id) {
        targetItem = {
          ...item,
          commentsCount: item.commentsCount + 1,
          comments: [...(item.comments || []), { user: mockUser.name, text: commentText, time: 'Just now' }]
        };
        return targetItem;
      }
      return item;
    }));
    showToast('Comment published!', 'success');

    if (targetItem) {
      try {
        await db
          .from('unified_feed')
          .update({
            comments: targetItem.comments,
            comments_count: targetItem.commentsCount
          })
          .eq('id', id);
      } catch (err) {
        console.error("Failed to save comment to Database:", err);
      }
    }
  };

  const publishComposerPost = async () => {
    if (!composerContent.trim()) {
      showToast('Post content cannot be empty!', 'error');
      return;
    }

    const isScheduling = composerTab === 'schedule';

    // Log Activity
    const newLog = {
      id: Date.now(),
      action: isScheduling
        ? `Scheduled post for ${composerSelectedPlatforms.join(', ').toUpperCase()}`
        : `Published new post to ${composerSelectedPlatforms.join(', ').toUpperCase()}`,
      time: 'Just now',
      icon: 'post'
    };
    setEvents(e => [newLog, ...e]);

    try {
      await db.from('activity_timeline').insert(newLog);
    } catch (err) {
      console.error("Failed to insert timeline log in Database:", err);
    }

    if (!isScheduling) {
      // Append to Feed Items
      composerSelectedPlatforms.forEach(async (platform, idx) => {
        const newFeed = {
          id: Date.now() + idx,
          platform: platform,
          platformIcon: 'chat',
          user: userProfile.name,
          avatar: userProfile.avatar,
          content: composerContent,
          timestamp: 'Just now',
          type: 'post',
          color: '#4F46E5',
          likes: 0,
          commentsCount: 0,
          repostsCount: 0,
          liked: false,
          reposted: false,
          comments: []
        };
        setFeedItems(prev => [newFeed, ...prev]);

        try {
          await db.from('unified_feed').insert({
            id: newFeed.id,
            platform: newFeed.platform,
            platform_icon: newFeed.platformIcon,
            user_name: newFeed.user,
            avatar: newFeed.avatar,
            content: newFeed.content,
            timestamp: newFeed.timestamp,
            type: newFeed.type,
            color: newFeed.color,
            likes: 0,
            comments_count: 0,
            reposts_count: 0,
            liked: false,
            reposted: false,
            comments: []
          });
        } catch (err) {
          console.error("Failed to insert new post in Database:", err);
        }
      });
    }

    showToast(isScheduling ? 'Post scheduled successfully!' : 'Post published successfully!', 'success');
    setComposerContent('');
    setIsComposerOpen(false);
  };

  const submitAIPrompt = (directPrompt) => {
    const query = directPrompt || aiInput;
    if (!query.trim()) return;

    const userMsg = { sender: 'me', text: query };
    setAiMessages(prev => [...prev, userMsg]);
    setAiInput('');
    setIsAITyping(true);

    setTimeout(() => {
      let reply = "I'm sorry, I don't have enough data to compute that yet.";

      const q = query.toLowerCase();
      if (q.includes('mention') || q.includes('summarize')) {
        reply = `Here is a summary of active social feedback:\n1. Alex Chen asked for a Figma mobile design review on Discord.\n2. Pratham mentioned your handle in a tweet on X regarding SaaS layout productivity.`;
      } else if (q.includes('draft') || q.includes('x post')) {
        reply = `Here is a drafted update for X:\n"Excited to showcase the upcoming developer metrics on Arcfuse! 🚀 Clean API connections and unified streams are making workflows look slick. #OpenSource #DevTools"`;
      } else if (q.includes('stats') || q.includes('apps')) {
        const count = connections.filter(c => c.status === 'connected').length;
        reply = `You currently have ${count} connected social applications. Your productivity rating is at 92%.`;
      }

      setAiMessages(prev => [...prev, { sender: 'ai', text: reply }]);
      setIsAITyping(false);
    }, 1200);
  };

  const submitMessageReply = async () => {
    if (!messageInput.trim()) return;

    // Capture input text before resetting state
    const textToSend = messageInput;
    setMessageInput('');

    setChats(prev => prev.map(c => {
      if (c.id === selectedChatId) {
        return {
          ...c,
          messages: [...c.messages, {
            sender: 'me',
            senderName: userProfile.name || 'Me',
            avatar: userProfile.avatar || '',
            text: textToSend,
            time: 'Just now'
          }]
        };
      }
      return c;
    }));

    // Add to Feed Stream as a mock sent message log
    const selectedChat = chats.find(c => c.id === selectedChatId);
    const newFeed = {
      id: Date.now(),
      platform: selectedChat?.platform || 'slack',
      platformIcon: 'chat',
      user: mockUser.name,
      avatar: mockUser.avatar,
      content: `Replied to ${selectedChat?.name} in #${selectedChat?.platform === 'discord' ? 'general' : 'engineering'}: "${textToSend}"`,
      timestamp: 'Just now',
      type: 'message',
      likes: 0,
      commentsCount: 0,
      repostsCount: 0,
      liked: false,
      reposted: false
    };
    setFeedItems(prev => [newFeed, ...prev]);

    // Add Timeline Log
    const newLog = {
      id: Date.now(),
      action: `Replied to ${selectedChat?.name} on ${selectedChat?.platform === 'discord' ? 'Discord' : 'Slack'}`,
      time: 'Just now',
      icon: 'chat'
    };
    setEvents(e => [newLog, ...e]);

    try {
      await db.from('activity_timeline').insert(newLog);
      await db.from('unified_feed').insert({
        id: newFeed.id,
        platform: newFeed.platform,
        platform_icon: newFeed.platformIcon,
        user_name: newFeed.user,
        avatar: newFeed.avatar,
        content: newFeed.content,
        timestamp: newFeed.timestamp,
        type: newFeed.type,
        color: newFeed.platform === 'discord' ? '#5865F2' : '#E01E5A',
        likes: 0,
        comments_count: 0,
        reposts_count: 0,
        liked: false,
        reposted: false,
        comments: []
      });
    } catch (err) {
      console.error("Failed to insert reply log in Database:", err);
    }

    // Send message to Discord if integrated
    if (selectedChat?.platform === 'discord' && selectedChat?.channelId) {
      try {
        await fetch(`/api/discord/channels/${selectedChat.channelId}/messages`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ content: textToSend })
        });
      } catch (err) {
        console.error("Failed to send message to Discord:", err);
      }
    }

    showToast('Reply sent!', 'success');
  };

  const saveSettings = async () => {
    try {
      const { data: { user } } = await db.auth.getUser();
      if (!user) {
        showToast('No user session found to update settings!', 'error');
        return;
      }

      mockUser.name = userProfile.name;
      mockUser.email = userProfile.email;
      mockUser.avatar = userProfile.avatar;

      const { error } = await db
        .from('workspace_settings')
        .update({
          name: userProfile.name,
          email: userProfile.email,
          slug: userProfile.slug,
          avatar: userProfile.avatar,
          updated_at: new Date().toISOString()
        })
        .eq('user_id', user.id);

      if (error) {
        showToast('Error saving settings to database: ' + error.message, 'error');
      } else {
        showToast('Workspace settings saved successfully!', 'success');
      }
    } catch (err) {
      console.error("Failed to update settings in Database:", err);
      showToast('Workspace settings saved successfully!', 'success');
    }
  };

  // Toggle dynamic Composer tab selections
  const toggleComposerPlatform = (id) => {
    if (composerSelectedPlatforms.includes(id)) {
      if (composerSelectedPlatforms.length > 1) {
        setComposerSelectedPlatforms(prev => prev.filter(p => p !== id));
      }
    } else {
      setComposerSelectedPlatforms(prev => [...prev, id]);
    }
  };

  const activeChat = chats.find(c => c.id === selectedChatId);
  const connectedCount = connections.filter(c => c.status === 'connected').length;
  const unreadAlerts = notifications.filter(n => n.unread).length;

  return (
    <div className="flex h-screen bg-background overflow-hidden selection:bg-primary/20 text-foreground">
      {/* Sidebar Navigation */}
      <Sidebar
        className="hidden md:flex shrink-0 z-40"
        activeView={activeView}
        setActiveView={setActiveView}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenAI={() => setIsAIChatOpen(true)}
        user={userProfile}
      />

      <div className="flex-1 flex flex-col h-screen overflow-hidden relative">
        {/* Header Navigation */}
        <TopBar
          notifications={notifications}
          onMarkAllRead={() => setNotifications(prev => prev.map(n => ({ ...n, unread: false })))}
          onClearNotifications={() => setNotifications([])}
          onOpenAI={() => setIsAIChatOpen(true)}
          activeView={activeView}
          setActiveView={setActiveView}
          onOpenSearch={() => setIsSearchOpen(true)}
          user={userProfile}
        />

        <main className="flex-1 overflow-y-auto p-4 md:p-8 lg:p-10 custom-scrollbar relative z-10">
          <div className="max-w-[1400px] mx-auto space-y-8">

            {activeView === 'overview' && (
              <>
                <header className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
                  <div>
                    <h1 className="text-4xl font-extrabold tracking-tight text-foreground mb-2 flex items-center gap-3">
                      Welcome back, {userProfile.name} <span className="animate-float inline-block">✨</span>
                    </h1>
                    <p className="text-muted-foreground text-lg">
                      Here&apos;s what&apos;s happening across your connected platforms today.
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setActiveView('settings')}
                      className="px-4 py-2 rounded-full bg-surface-200 border border-glass-border text-sm font-medium hover:bg-surface-300 transition-colors"
                    >
                      Customize
                    </button>
                    <button
                      onClick={() => showToast('Generating analytics breakdown...', 'info')}
                      className="px-4 py-2 rounded-full bg-primary/10 text-primary border border-primary/20 text-sm font-medium hover:bg-primary/20 hover:shadow-glow-primary transition-all duration-300"
                    >
                      Generate Report
                    </button>
                  </div>
                </header>

                <OverviewCards
                  connectionsCount={connectedCount}
                  notificationsCount={unreadAlerts}
                />

                <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                  <div className="xl:col-span-2 space-y-8">
                    <UnifiedFeed
                      feedItems={feedItems}
                      onLike={handleLike}
                      onComment={handleComment}
                      onRepost={handleRepost}
                    />
                  </div>

                  <div className="space-y-8">
                    <IntegrationsPanel
                      connections={connections}
                      onToggleConnection={toggleConnection}
                      setActiveView={setActiveView}
                    />
                    <QuickActions
                      onCompose={() => { setComposerTab('publish'); setIsComposerOpen(true); }}
                      onSchedule={() => { setComposerTab('schedule'); setIsComposerOpen(true); }}
                      onScheduleDraft={async () => {
                        const newLog = {
                          id: Date.now(),
                          action: "Scheduled suggested LinkedIn post draft",
                          time: "Scheduled for 2:00 PM EST",
                          icon: "post"
                        };
                        setEvents(e => [newLog, ...e]);
                        showToast('AI recommendation drafted and scheduled!', 'success');
                        try {
                          await db.from('activity_timeline').insert(newLog);
                        } catch (err) {
                          console.error("Failed to insert timeline log in Database:", err);
                        }
                      }}
                    />
                    <ActivityTimeline events={events} />
                  </div>
                </div>
              </>
            )}

            {/* Detailed Integrations Panel View */}
            {activeView === 'integrations' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-3xl font-extrabold tracking-tight">App Connections</h2>
                  <p className="text-muted-foreground text-sm mt-1">Manage external platform links and sync activities directly into your stream.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                  {connections.map(app => {
                    const isOAuthProvider = oauthProviders.includes(app.id);
                    return (
                      <div
                        key={app.id}
                        className={cn(
                          "glass-panel-heavy p-6 rounded-2xl border flex flex-col justify-between transition-all group",
                          isOAuthProvider
                            ? "border-primary/40 shadow-glow-primary relative overflow-hidden"
                            : "border-glass-border hover:border-primary/30"
                        )}
                      >
                        {/* OAuth glow strip */}
                        {isOAuthProvider && (
                          <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent" />
                        )}

                        <div>
                          <div className="flex items-center justify-between mb-4">
                            <div
                              className="w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg uppercase"
                              style={{ backgroundColor: `${app.color}15`, color: app.color }}
                            >
                              {app.name.substring(0, 2)}
                            </div>
                            <div className="flex items-center gap-2">
                              {isOAuthProvider && (
                                <span className="flex items-center gap-1 px-2.5 py-1 rounded-full text-[9px] font-extrabold border uppercase tracking-wider bg-primary/10 text-primary border-primary/30">
                                  <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse inline-block" />
                                  OAuth
                                </span>
                              )}
                              <span className={cn(
                                "px-3 py-1 rounded-full text-[10px] font-extrabold border uppercase tracking-wider",
                                app.status === 'connected'
                                  ? 'bg-green-500/10 text-green-500 border-green-500/20'
                                  : 'bg-surface-300 text-muted-foreground border-glass-border'
                              )}>
                                {app.status === 'connected' ? 'Linked' : 'Offline'}
                              </span>
                            </div>
                          </div>
                          <h3 className="font-extrabold text-lg text-foreground mb-1">{app.name}</h3>
                          {isOAuthProvider && (
                            <p className="text-[10px] text-primary font-bold mb-1 flex items-center gap-1">
                              <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>verified_user</span>
                              Signed in via {app.name} OAuth
                            </p>
                          )}
                          <p className="text-xs text-muted-foreground leading-relaxed">
                            {app.id === 'x' && "Sync, schedule, and read posts/tweets and analytic threads."}
                            {app.id === 'linkedin' && "Publish professional updates, articles, and sync profile metrics."}
                            {app.id === 'github' && "Track open issues, pull requests, and commit logs directly in your stream."}
                            {app.id === 'discord' && "Track messages, servers, and channel activities in your stream."}
                            {app.id === 'slack' && "Forward notifications and synchronize chat channel messages."}
                            {app.id === 'figma' && "Pull comments, share design revisions, and preview team canvases."}
                            {app.id === 'notion' && "Sync product databases, project wikis, and document roadmaps."}
                          </p>
                        </div>
                        <button
                          onClick={() => toggleConnection(app.id)}
                          disabled={isOAuthProvider}
                          title={isOAuthProvider ? `Cannot unlink — this is your OAuth sign-in provider` : undefined}
                          className={cn(
                            "w-full mt-6 py-2.5 rounded-xl text-xs font-bold transition-all active:scale-95",
                            isOAuthProvider
                              ? 'bg-primary/10 text-primary border border-primary/20 cursor-not-allowed opacity-70'
                              : app.status === 'connected'
                                ? 'bg-destructive/10 text-destructive border border-destructive/20 hover:bg-destructive hover:text-white'
                                : 'bg-primary text-black hover:bg-primary-hover shadow-glow-primary hover:shadow-glow-primary-lg'
                          )}
                        >
                          {isOAuthProvider ? '🔐 Auth Provider — Protected' : app.status === 'connected' ? 'Unlink Platform' : 'Connect Account'}
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Detailed Activity Timeline View */}
            {activeView === 'activity' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-3xl font-extrabold tracking-tight">Audit Log</h2>
                  <p className="text-muted-foreground text-sm mt-1">Audit log of workspace, connection, and social schedule activities.</p>
                </div>
                <div className="glass-panel-heavy rounded-3xl p-6 border border-glass-border space-y-4 max-w-4xl mt-6">
                  {events.map((event) => (
                    <div key={event.id} className="flex items-center justify-between p-4 rounded-xl bg-surface-100 border border-glass-border hover:border-primary/20 transition-all">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                          <span className="material-symbols-outlined text-lg">
                            {event.icon === 'tag' && 'tag'}
                            {event.icon === 'code' && 'code'}
                            {event.icon === 'person_add' && 'person_add'}
                            {event.icon === 'call_end' && 'call_end'}
                            {event.icon === 'cloud_done' && 'cloud_done'}
                            {event.icon === 'post' && 'post'}
                            {event.icon !== 'tag' && event.icon !== 'code' && event.icon !== 'person_add' && event.icon !== 'call_end' && event.icon !== 'cloud_done' && event.icon !== 'post' && 'history'}
                          </span>
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-foreground">{event.action}</p>
                          <p className="text-xs text-muted-foreground mt-0.5">{event.time}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Detailed Unified Inbox Messages View */}
            {activeView === 'messages' && (
              <div className="space-y-6 h-[calc(100vh-12rem)] flex flex-col">
                <div>
                  <h2 className="text-3xl font-extrabold tracking-tight">Unified Inbox</h2>
                  <p className="text-muted-foreground text-sm mt-1">Read and reply to direct messages and comments across connected channels.</p>
                </div>

                <div className="flex-1 flex gap-6 overflow-hidden mt-6 border border-glass-border rounded-3xl bg-surface-100/30">
                  {/* Left Column: Chat List */}
                  <div className="w-80 border-r border-glass-border flex flex-col bg-surface-100/50">
                    <div className="p-4 border-b border-glass-border">
                      <h3 className="font-bold text-sm text-foreground">Conversations</h3>
                    </div>
                    <div className="flex-1 overflow-y-auto custom-scrollbar p-2 space-y-1">
                      {chats.map(chat => (
                        <button
                          key={chat.id}
                          onClick={() => setSelectedChatId(chat.id)}
                          className={cn(
                            "w-full flex items-center gap-3 p-3 rounded-xl transition-all text-left relative",
                            chat.id === selectedChatId
                              ? "bg-primary/10 border border-primary/20"
                              : "hover:bg-surface-200 border border-transparent"
                          )}
                        >
                          <img src={chat.avatar} alt={chat.name} className="w-10 h-10 rounded-full object-cover border border-glass-border" />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-bold text-foreground truncate">{chat.name}</span>
                              <span className="text-[9px] text-muted-foreground uppercase shrink-0 ml-1">
                                {chat.platform}
                              </span>
                            </div>
                            {chat.guildName && (
                              <p className="text-[10px] text-primary font-semibold truncate">{chat.guildName}</p>
                            )}
                            <p className="text-[11px] text-muted-foreground truncate mt-0.5">
                              {chat.messages[chat.messages.length - 1]?.text || 'No messages yet'}
                            </p>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Right Column: Chat Window */}
                  <div className="flex-1 flex flex-col bg-surface-100/20">
                    {activeChat ? (
                      <>
                        {/* Chat Header */}
                        <div className="p-4 border-b border-glass-border flex items-center justify-between bg-surface-100/50">
                          <div className="flex items-center gap-3">
                            <img src={activeChat.avatar} alt={activeChat.name} className="w-9 h-9 rounded-full object-cover" />
                            <div>
                              <h4 className="text-xs font-bold text-foreground">{activeChat.name}</h4>
                              <p className="text-[9px] text-primary uppercase tracking-wider font-extrabold mt-0.5">
                                {activeChat.platform} channel {activeChat.guildName && `• ${activeChat.guildName}`}
                              </p>
                            </div>
                          </div>
                          {activeChat.platform === 'discord' && activeChat.channelId && (
                            <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-500 text-[9px] font-extrabold uppercase tracking-wider">
                              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse inline-block" />
                              Live
                            </span>
                          )}
                        </div>


                        {connections.find(c => c.id === activeChat.platform)?.status !== 'connected' && activeChat.platform !== 'internal' ? (
                          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center space-y-4 bg-surface-100/5 backdrop-blur-sm">
                            <div className="w-12 h-12 rounded-2xl bg-destructive/10 text-destructive flex items-center justify-center border border-destructive/20 shadow-md">
                              <span className="material-symbols-outlined text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>link_off</span>
                            </div>
                            <div className="space-y-1">
                              <h4 className="text-sm font-bold text-foreground">Connection Offline</h4>
                              <p className="text-xs text-muted-foreground max-w-xs leading-relaxed font-medium">
                                Arcfuse is disconnected from {activeChat.platform === 'discord' ? 'Discord' : activeChat.platform}.
                                Please link this platform in your connections panel to view and reply to messages.
                              </p>
                            </div>
                            <button
                              onClick={() => {
                                if (activeChat.platform === 'discord') {
                                  setDiscordModalOpen(true);
                                } else {
                                  setActiveView('integrations');
                                }
                              }}
                              className="px-5 py-2.5 rounded-xl bg-primary text-black font-bold text-xs hover:bg-primary-hover active:scale-95 transition-all shadow-md shadow-primary/15"
                            >
                              Connect {activeChat.platform === 'discord' ? 'Discord' : activeChat.platform.toUpperCase()}
                            </button>
                          </div>
                        ) : loadingMessages ? (
                          <div className="flex-1 flex flex-col items-center justify-center gap-3 text-muted-foreground">
                            <div className="w-7 h-7 rounded-full border-2 border-primary border-t-transparent animate-spin" />
                            <p className="text-xs">Loading messages…</p>
                          </div>
                        ) : (
                          <>
                            {/* Chat Messages */}
                            <div className="flex-1 p-4 overflow-y-auto custom-scrollbar space-y-4">
                              {activeChat.messages.length === 0 ? (
                                <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground gap-2">
                                  <span className="material-symbols-outlined text-3xl opacity-30">chat_bubble_outline</span>
                                  <p className="text-xs">No messages in this channel yet.</p>
                                </div>
                              ) : activeChat.messages.map((msg, i) => {
                                const isMe = msg.sender === 'me';
                                const authorName = isMe ? (msg.senderName || userProfile.name || 'Me') : (msg.senderName || activeChat.name);
                                const authorAvatar = isMe
                                  ? (msg.avatar || userProfile.avatar || 'https://i.pravatar.cc/150?u=me')
                                  : (msg.avatar || activeChat.avatar);

                                return (
                                  <div
                                    key={msg.id || i}
                                    className={cn(
                                      "flex items-end gap-2.5 max-w-[80%] text-xs",
                                      isMe ? "ml-auto flex-row-reverse" : "mr-auto"
                                    )}
                                  >
                                    <img
                                      src={authorAvatar}
                                      alt={authorName}
                                      className="w-7 h-7 rounded-full object-cover border border-glass-border shrink-0"
                                    />
                                    <div className={cn("flex flex-col gap-0.5", isMe ? "items-end" : "items-start")}>
                                      <span className="text-[10px] font-semibold text-muted-foreground px-1">
                                        {authorName}
                                      </span>
                                      <div
                                        className={cn(
                                          "px-3.5 py-2.5 rounded-2xl leading-relaxed shadow-sm max-w-xs",
                                          isMe
                                            ? "bg-primary text-black font-medium rounded-br-sm"
                                            : "bg-surface-200 border border-glass-border text-foreground rounded-bl-sm"
                                        )}
                                      >
                                        <p className="break-words whitespace-pre-wrap text-xs">{msg.text}</p>
                                        <span className={cn(
                                          "block text-[8px] opacity-50 mt-1",
                                          isMe ? "text-right" : "text-left"
                                        )}>{msg.time}</span>
                                      </div>
                                    </div>
                                  </div>
                                );
                              })}
                              {/* Scroll anchor */}
                              <div ref={messagesEndRef} />
                            </div>

                            {/* Chat Input */}
                            <div className="p-4 border-t border-glass-border flex gap-3 bg-surface-100/50">
                              <input
                                type="text"
                                placeholder="Type a message..."
                                value={messageInput}
                                onChange={e => setMessageInput(e.target.value)}
                                onKeyDown={e => e.key === 'Enter' && submitMessageReply()}
                                className="flex-1 bg-surface-200 border border-glass-border rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-primary text-foreground"
                              />
                              <button
                                onClick={submitMessageReply}
                                className="px-4 py-2 rounded-xl bg-primary text-black font-bold text-xs flex items-center justify-center hover:bg-primary-hover active:scale-95 transition-all"
                              >
                                Send
                              </button>
                            </div>
                          </>
                        )}
                      </>
                    ) : (
                      <div className="flex-1 flex flex-col items-center justify-center text-muted-foreground p-8">
                        <p className="text-sm">Select a discussion to start messaging</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {activeView === 'github' && (
              <GitHubPanel
                showToast={showToast}
                onAddLog={async () => {
                  const { data: timelineData } = await db
                    .from('activity_timeline')
                    .select('*')
                    .order('id', { ascending: false });
                  if (timelineData) setEvents(timelineData);

                  // Refresh connections status
                  const { data: integrationsData } = await db
                    .from('integrations')
                    .select('*');
                  if (integrationsData) {
                    setConnections(prev => prev.map(app => {
                      const dbApp = integrationsData.find(i => i.provider === app.id);
                      if (dbApp) {
                        return {
                          ...app,
                          status: dbApp.status,
                          settings: dbApp.settings || {}
                        };
                      }
                      return app;
                    }));
                  }
                }}
                onAddAlert={async () => {
                  const { data: feedData } = await db
                    .from('unified_feed')
                    .select('*')
                    .order('id', { ascending: false });
                  if (feedData) {
                    const mappedFeed = feedData.map(item => ({
                      id: item.id,
                      platform: item.platform,
                      platformIcon: item.platform_icon,
                      user: item.user_name,
                      avatar: item.avatar,
                      content: item.content,
                      timestamp: item.timestamp,
                      type: item.type,
                      color: item.color,
                      likes: item.likes,
                      commentsCount: item.comments_count,
                      repostsCount: item.reposts_count,
                      liked: item.liked,
                      reposted: item.reposted,
                      comments: item.comments
                    }));
                    setFeedItems(mappedFeed);
                  }
                }}
              />
            )}

            {activeView === 'discord' && (
              <DiscordPanel
                showToast={showToast}
                onAddLog={async () => {
                  const { data: timelineData } = await db
                    .from('activity_timeline')
                    .select('*')
                    .order('id', { ascending: false });
                  if (timelineData) setEvents(timelineData);

                  // Refresh connections status
                  const { data: integrationsData } = await db
                    .from('integrations')
                    .select('*');
                  if (integrationsData) {
                    setConnections(prev => prev.map(app => {
                      const dbApp = integrationsData.find(i => i.provider === app.id);
                      if (dbApp) {
                        return {
                          ...app,
                          status: dbApp.status,
                          settings: dbApp.settings || {}
                        };
                      }
                      return app;
                    }));
                  }
                }}
                onAddAlert={async () => {
                  const { data: feedData } = await db
                    .from('unified_feed')
                    .select('*')
                    .order('id', { ascending: false });
                  if (feedData) {
                    const mappedFeed = feedData.map(item => ({
                      id: item.id,
                      platform: item.platform,
                      platformIcon: item.platform_icon,
                      user: item.user_name,
                      avatar: item.avatar,
                      content: item.content,
                      timestamp: item.timestamp,
                      type: item.type,
                      color: item.color,
                      likes: item.likes,
                      commentsCount: item.comments_count,
                      repostsCount: item.reposts_count,
                      liked: item.liked,
                      reposted: item.reposted,
                      comments: item.comments
                    }));
                    setFeedItems(mappedFeed);
                  }
                }}
              />
            )}

            {/* Account Sub-View */}
            {activeView === 'account' && (
              <AccountPanel />
            )}

            {/* Settings Sub-View */}
            {activeView === 'settings' && (
              <div className="space-y-6 max-w-5xl">
                <div>
                  <h2 className="text-3xl font-extrabold tracking-tight">Workspace Settings</h2>
                  <p className="text-muted-foreground text-sm mt-1">Configure profile details and customize settings preferences.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-6">
                  {/* Left Column: Avatar Settings */}
                  <div className="lg:col-span-4 space-y-6">
                    <div className="glass-panel-heavy p-6 rounded-3xl border border-glass-border flex flex-col items-center text-center space-y-6">
                      <h3 className="text-sm font-bold text-foreground uppercase tracking-wider self-start">Workspace Avatar</h3>

                      <div className="relative group w-32 h-32 rounded-full overflow-hidden border-2 border-primary/20 shadow-lg hover:border-primary transition-all duration-300">
                        <img
                          src={userProfile.avatar}
                          alt="Avatar Preview"
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center text-white cursor-pointer">
                          <Camera className="w-6 h-6 mb-1 text-primary animate-pulse" />
                          <span className="text-[10px] font-bold uppercase tracking-wider">Change Profile</span>
                        </div>
                      </div>

                      <div className="w-full space-y-4">
                        <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block text-left">Curated Presets</label>
                        <div className="flex justify-center gap-2 flex-wrap">
                          {[
                            'https://i.pravatar.cc/150?u=pratham',
                            'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&h=150&q=80',
                            'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80',
                            'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&h=150&q=80',
                            'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&h=150&q=80'
                          ].map((presetUrl, idx) => (
                            <button
                              key={idx}
                              onClick={() => setUserProfile(prev => ({ ...prev, avatar: presetUrl }))}
                              className={cn(
                                "w-10 h-10 rounded-full overflow-hidden border transition-all active:scale-95",
                                userProfile.avatar === presetUrl ? "border-primary ring-2 ring-primary/20 scale-105" : "border-glass-border hover:border-primary/50"
                              )}
                            >
                              <img src={presetUrl} alt={`Preset ${idx + 1}`} className="w-full h-full object-cover" />
                            </button>
                          ))}
                        </div>

                        <div className="space-y-2 text-left pt-2">
                          <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Custom Image URL</label>
                          <input
                            type="text"
                            value={userProfile.avatar}
                            onChange={e => setUserProfile(prev => ({ ...prev, avatar: e.target.value }))}
                            placeholder="Paste image URL..."
                            className="w-full bg-surface-200 border border-glass-border rounded-xl p-2.5 text-xs focus:outline-none focus:border-primary transition-colors text-foreground font-medium"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Settings Inputs */}
                  <div className="lg:col-span-8">
                    <div className="glass-panel-heavy p-6 rounded-3xl border border-glass-border space-y-6">
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-foreground uppercase tracking-wider">Admin Display Name</label>
                        <input
                          type="text"
                          value={userProfile.name}
                          onChange={e => setUserProfile(prev => ({ ...prev, name: e.target.value }))}
                          className="w-full bg-surface-200 border border-glass-border rounded-xl p-3 text-sm focus:outline-none focus:border-primary transition-colors text-foreground font-semibold"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-foreground uppercase tracking-wider">Primary Email Address</label>
                        <input
                          type="email"
                          value={userProfile.email}
                          onChange={e => setUserProfile(prev => ({ ...prev, email: e.target.value }))}
                          className="w-full bg-surface-200 border border-glass-border rounded-xl p-3 text-sm focus:outline-none focus:border-primary transition-colors text-foreground font-semibold"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-foreground uppercase tracking-wider">Workspace Prefix Slug</label>
                        <div className="flex items-center bg-surface-200 border border-glass-border rounded-xl px-3 focus-within:border-primary transition-colors">
                          <span className="text-muted-foreground mr-1 text-xs font-bold">arcfuse.app/</span>
                          <input
                            type="text"
                            value={userProfile.slug}
                            onChange={e => setUserProfile(prev => ({ ...prev, slug: e.target.value }))}
                            className="w-full bg-transparent py-3 text-sm focus:outline-none text-foreground font-semibold"
                          />
                        </div>
                      </div>

                      <button
                        onClick={saveSettings}
                        className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-primary text-black font-bold hover:bg-primary-hover active:scale-95 transition-all text-xs shadow-glow-primary"
                      >
                        <Save className="w-4 h-4" /> Save Workspace Settings
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

          </div>
        </main>
      </div>

      {/* Spotlight Command Palette (⌘K) */}
      {isSearchOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-start justify-center pt-24 px-4">
          <div className="bg-surface-100 border border-glass-border w-full max-w-xl rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center border-b border-glass-border px-4 py-3">
              <Search className="w-5 h-5 text-muted-foreground mr-2" />
              <input
                type="text"
                placeholder="Search stream or type commands..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full bg-transparent border-none outline-none text-foreground text-sm"
                autoFocus
              />
              <button
                onClick={() => setIsSearchOpen(false)}
                className="text-muted-foreground hover:text-foreground text-[10px] font-extrabold px-2 py-1 rounded bg-surface-200"
              >
                ESC
              </button>
            </div>

            <div className="p-2 max-h-80 overflow-y-auto custom-scrollbar space-y-4">
              {/* Commands Section */}
              <div>
                <span className="text-[10px] text-muted-foreground font-black tracking-wider uppercase px-3">Actions</span>
                <div className="mt-1 space-y-1">
                  {[
                    { name: 'Compose New Post', icon: PenSquare, action: () => { setComposerTab('publish'); setIsComposerOpen(true); setIsSearchOpen(false); } },
                    { name: 'Ask AI Assistant', icon: Sparkles, action: () => { setIsAIChatOpen(true); setIsSearchOpen(false); } },
                    { name: 'View Integrations', icon: Cable, action: () => { setActiveView('integrations'); setIsSearchOpen(false); } },
                    { name: 'Go to Settings', icon: Settings, action: () => { setActiveView('settings'); setIsSearchOpen(false); } },
                  ]
                    .filter(c => c.name.toLowerCase().includes(searchQuery.toLowerCase()))
                    .map(c => (
                      <button
                        key={c.name}
                        onClick={c.action}
                        className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold text-muted-foreground hover:bg-surface-200 hover:text-foreground text-left"
                      >
                        <c.icon className="w-4 h-4 text-primary" />
                        {c.name}
                      </button>
                    ))}
                </div>
              </div>

              {/* Feed Results */}
              {searchQuery && (
                <div>
                  <span className="text-[10px] text-muted-foreground font-black tracking-wider uppercase px-3">Matching Stream Posts</span>
                  <div className="mt-1 space-y-1">
                    {feedItems
                      .filter(item => item.content.toLowerCase().includes(searchQuery.toLowerCase()) || item.user.toLowerCase().includes(searchQuery.toLowerCase()))
                      .slice(0, 5)
                      .map(item => (
                        <button
                          key={item.id}
                          onClick={() => { setActiveView('overview'); setIsSearchOpen(false); }}
                          className="w-full p-3 rounded-xl hover:bg-surface-200 text-left border border-transparent hover:border-glass-border flex flex-col gap-1"
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-foreground truncate pr-3">{item.user}</span>
                            <span className="text-[9px] text-primary font-bold uppercase whitespace-nowrap">{item.platform}</span>
                          </div>
                          <p className="text-xs text-muted-foreground line-clamp-1">{item.content}</p>
                        </button>
                      ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Compose / Schedule Post Modal */}
      {isComposerOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-surface-100 border border-glass-border w-full max-w-lg rounded-3xl shadow-2xl p-6 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-4 border-b border-glass-border mb-4">
              <h3 className="font-extrabold text-lg flex items-center gap-2">
                <PenSquare className="w-5 h-5 text-primary" />
                {composerTab === 'schedule' ? 'Schedule Content' : 'Compose Social Post'}
              </h3>
              <button
                onClick={() => setIsComposerOpen(false)}
                className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-surface-200 text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Tabs selector */}
            <div className="flex rounded-lg bg-surface-200 p-1 mb-4">
              <button
                onClick={() => setComposerTab('publish')}
                className={cn(
                  "flex-1 py-1.5 rounded-md text-xs font-bold transition-all",
                  composerTab === 'publish' ? "bg-surface-100 text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
                )}
              >
                Publish Instantly
              </button>
              <button
                onClick={() => setComposerTab('schedule')}
                className={cn(
                  "flex-1 py-1.5 rounded-md text-xs font-bold transition-all",
                  composerTab === 'schedule' ? "bg-surface-100 text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
                )}
              >
                Schedule Release
              </button>
            </div>

            {/* Target platform chips */}
            <div className="space-y-2 mb-4">
              <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Publish Targets</label>
              <div className="flex flex-wrap gap-2">
                {connections
                  .filter(c => c.status === 'connected')
                  .map(c => {
                    const isSelected = composerSelectedPlatforms.includes(c.id);
                    return (
                      <button
                        key={c.id}
                        onClick={() => toggleComposerPlatform(c.id)}
                        className={cn(
                          "px-3 py-1.5 rounded-full text-xs font-bold border transition-all flex items-center gap-1.5 active:scale-95",
                          isSelected
                            ? "bg-primary/10 border-primary text-primary"
                            : "bg-surface-100 border-glass-border text-muted-foreground hover:border-primary/20"
                        )}
                      >
                        <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: c.color }}></span>
                        {c.name}
                      </button>
                    );
                  })}
              </div>
            </div>

            {/* Content Field */}
            <div className="space-y-2 mb-6">
              <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Content Body</label>
              <textarea
                placeholder="What's happening? Add tags, markdown, and updates..."
                value={composerContent}
                onChange={e => setComposerContent(e.target.value)}
                rows={5}
                className="w-full bg-surface-200 border border-glass-border rounded-2xl p-3 text-sm focus:outline-none focus:border-primary text-foreground resize-none font-medium leading-relaxed"
              />
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setIsComposerOpen(false)}
                className="flex-1 py-3 border border-glass-border hover:bg-surface-200 transition-colors text-xs font-bold rounded-xl"
              >
                Cancel
              </button>
              <button
                onClick={publishComposerPost}
                className="flex-1 py-3 bg-primary text-black hover:bg-primary-hover transition-colors text-xs font-bold rounded-xl active:scale-95 shadow-glow-primary"
              >
                {composerTab === 'schedule' ? 'Confirm Schedule' : 'Publish Stream'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating AI Chat Side Drawer */}
      {isAIChatOpen && (
        <div className="fixed inset-y-0 right-0 w-full sm:w-96 bg-surface-100 border-l border-glass-border shadow-2xl z-50 flex flex-col animate-in slide-in-from-right duration-300">
          <div className="flex items-center justify-between p-4 border-b border-glass-border bg-surface-100/50">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-primary animate-pulse" />
              <span className="font-extrabold text-lg">AI Assistant</span>
            </div>
            <button
              onClick={() => setIsAIChatOpen(false)}
              className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-surface-200 text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 p-4 overflow-y-auto custom-scrollbar space-y-4 bg-surface-100/20">
            {aiMessages.map((msg, idx) => (
              <div
                key={idx}
                className={cn(
                  "p-3 rounded-2xl text-xs max-w-[85%] leading-relaxed shadow-sm",
                  msg.sender === 'me'
                    ? "bg-primary text-black ml-auto font-semibold"
                    : "bg-surface-200 border border-glass-border text-foreground mr-auto"
                )}
              >
                {msg.text.split('\n').map((line, i) => (
                  <p key={i} className={i > 0 ? 'mt-1' : ''}>{line}</p>
                ))}
              </div>
            ))}
            {isAITyping && (
              <div className="bg-surface-200 border border-glass-border text-foreground mr-auto p-3 rounded-2xl text-[10px] max-w-[85%] flex items-center gap-1 shadow-sm">
                <span className="w-1.5 h-1.5 bg-muted-foreground rounded-full animate-bounce"></span>
                <span className="w-1.5 h-1.5 bg-muted-foreground rounded-full animate-bounce delay-100"></span>
                <span className="w-1.5 h-1.5 bg-muted-foreground rounded-full animate-bounce delay-200"></span>
              </div>
            )}
          </div>

          {/* Preset prompts pills */}
          <div className="px-4 py-2.5 flex gap-2 overflow-x-auto custom-scrollbar scrollbar-none whitespace-nowrap shrink-0 border-t border-glass-border/30 bg-surface-100/50">
            {[
              "Summarize mentions",
              "Draft X post",
              "Check stats",
            ].map(pill => (
              <button
                key={pill}
                onClick={() => submitAIPrompt(pill)}
                className="text-[10px] font-bold border border-glass-border bg-surface-200 px-3 py-1.5 rounded-full hover:border-primary/40 transition-colors"
              >
                {pill}
              </button>
            ))}
          </div>

          {/* Chat input block */}
          <div className="p-4 border-t border-glass-border flex gap-2 bg-surface-100/50">
            <input
              type="text"
              placeholder="Ask AI anything..."
              value={aiInput}
              onChange={e => setAiInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && submitAIPrompt()}
              className="flex-1 bg-surface-200 border border-glass-border rounded-xl px-3 py-2.5 text-xs focus:outline-none focus:border-primary text-foreground"
            />
            <button
              onClick={() => submitAIPrompt()}
              className="w-10 h-10 rounded-xl bg-primary text-black flex items-center justify-center hover:bg-primary-hover transition-colors active:scale-95 shadow-glow-primary shrink-0"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Global Toast Alert */}
      {toast && (
        <div className={cn(
          "fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-6 py-4 rounded-xl shadow-2xl border transition-all duration-300 transform translate-y-0 opacity-100 animate-in fade-in slide-in-from-bottom-5",
          toast.type === 'success'
            ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
            : toast.type === 'error'
              ? 'bg-red-50 border-red-200 text-red-800'
              : 'bg-blue-50 border-blue-200 text-blue-800'
        )}>
          <span className="material-symbols-outlined text-lg">
            {toast.type === 'success' ? 'check_circle' : toast.type === 'error' ? 'error' : 'info'}
          </span>
          <span className="text-xs font-bold tracking-tight">{toast.message}</span>
        </div>
      )}

      <DiscordConnectModal
        isOpen={discordModalOpen}
        onClose={() => setDiscordModalOpen(false)}
        onConnect={handleDiscordConnect}
      />
    </div>
  );
}

export default function DashboardPage() {
  return (
    <Suspense fallback={
      <div className="flex h-screen w-screen items-center justify-center bg-[#0A0A0A] text-white">
        <div className="flex flex-col items-center gap-4">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#00BFFF] border-t-transparent"></div>
          <p className="text-sm font-medium text-muted-foreground">Loading workspace...</p>
        </div>
      </div>
    }>
      <DashboardContent />
    </Suspense>
  );
}
