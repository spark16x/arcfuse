export const mockUser = {
  name: "Pratham",
  avatar: "https://i.pravatar.cc/150?u=pratham",
  status: "Online",
  email: "pratham@arcfuse.com",
};

export const stats = {
  connectedApps: 8,
  notificationsToday: 24,
  activeSessions: 3,
  productivityScore: 92,
};

export const unifiedFeed = [
  {
    id: 1,
    platform: "discord",
    platformIcon: "chat", // material symbols outlined
    user: "Alex Chen",
    avatar: "https://i.pravatar.cc/150?u=alex",
    content: "Hey, can you review the latest Figma designs for the mobile app?",
    timestamp: "2 mins ago",
    type: "message",
    color: "#5865F2"
  },
  {
    id: 2,
    platform: "x",
    platformIcon: "close", // using X-like generic icon or simple text
    user: "Tech Daily",
    avatar: "https://i.pravatar.cc/150?u=tech",
    content: "Just announced: The new Arcfuse dashboard is redefining productivity. 🚀 #SaaS",
    timestamp: "15 mins ago",
    type: "post",
    color: "#000000"
  },
  {
    id: 3,
    platform: "slack",
    platformIcon: "tag", // hash/slack like
    user: "Sarah Jenkins",
    avatar: "https://i.pravatar.cc/150?u=sarah",
    content: "Deployment to production was successful. No errors reported.",
    timestamp: "1 hour ago",
    type: "update",
    color: "#E01E5A"
  },
  {
    id: 4,
    platform: "github",
    platformIcon: "code",
    user: "DevBot",
    avatar: "https://i.pravatar.cc/150?u=bot",
    content: "Pull request #42 merged into main: 'Update dashboard UI'.",
    timestamp: "3 hours ago",
    type: "commit",
    color: "#2ea043"
  },
  {
    id: 5,
    platform: "discord",
    platformIcon: "chat",
    user: "Gaming Squad",
    avatar: "https://i.pravatar.cc/150?u=game",
    content: "Anyone up for a round of Valorant tonight?",
    timestamp: "5 hours ago",
    type: "message",
    color: "#5865F2"
  }
];

export const integrations = [
  { id: "discord", name: "Discord", icon: "chat", status: "connected", color: "#5865F2" },
  { id: "x", name: "X (Twitter)", icon: "close", status: "connected", color: "#000000" },
  { id: "slack", name: "Slack", icon: "tag", status: "connected", color: "#E01E5A" },
  { id: "github", name: "GitHub", icon: "code", status: "connected", color: "#24292e" },
  { id: "figma", name: "Figma", icon: "draw", status: "disconnected", color: "#F24E1E" },
  { id: "notion", name: "Notion", icon: "description", status: "disconnected", color: "#000000" },
];

export const activityTimeline = [
  { id: 1, action: "New Slack message in #engineering", time: "Just now", icon: "tag" },
  { id: 2, action: "GitHub commit pushed to main", time: "10 mins ago", icon: "code" },
  { id: 3, action: "New follower on X", time: "1 hour ago", icon: "person_add" },
  { id: 4, action: "Discord call ended (45m)", time: "2 hours ago", icon: "call_end" },
  { id: 5, action: "System backup completed", time: "Yesterday", icon: "cloud_done" },
];
