import { useState, useEffect } from "react";
import { 
  GitFork, 
  Star, 
  GitPullRequest, 
  CircleAlert, 
  CheckCircle2, 
  Webhook, 
  Loader2, 
  Search, 
  ExternalLink, 
  RefreshCw, 
  Play,
  Github
} from "lucide-react";
import { cn } from "@/lib/utils";
import { inMemoryDb } from "@/lib/db-store";

export function GitHubPanel({ showToast, onAddLog, onAddAlert }) {
  const [repos, setRepos] = useState([]);
  const [selectedRepo, setSelectedRepo] = useState(null);
  const [issues, setIssues] = useState([]);
  const [pulls, setPulls] = useState([]);
  const [activeTab, setActiveTab] = useState("issues"); // issues, pulls, webhooks
  
  const [isLoadingRepos, setIsLoadingRepos] = useState(true);
  const [isLoadingDetails, setIsLoadingDetails] = useState(false);
  const [issueQuery, setIssueQuery] = useState("");
  const [pullQuery, setPullQuery] = useState("");

  const [webhookStatus, setWebhookStatus] = useState("Inactive (Setup Required)");
  const [isTriggeringWebhook, setIsTriggeringWebhook] = useState(false);

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [tokenInput, setTokenInput] = useState("");
  const [isSavingToken, setIsSavingToken] = useState(false);

  // Fetch repositories on mount
  const fetchRepos = async () => {
    setIsLoadingRepos(true);
    try {
      const res = await fetch("/api/github/repos");
      if (res.ok) {
        const data = await res.json();
        setRepos(data.repos || []);
        setIsAuthenticated(data.authenticated || false);
        if (data.repos && data.repos.length > 0) {
          setSelectedRepo(data.repos[0]);
        } else {
          setSelectedRepo(null);
        }
      }
    } catch (err) {
      console.error("Failed to load GitHub repos:", err);
      showToast("Failed to load GitHub repositories", "error");
    } finally {
      setIsLoadingRepos(false);
    }
  };

  useEffect(() => {
    fetchRepos();
  }, []);

  const handleSaveToken = async (e) => {
    e.preventDefault();
    if (!tokenInput.trim()) return;
    setIsSavingToken(true);
    try {
      if (!inMemoryDb.integrations) inMemoryDb.integrations = [];
      const integrations = inMemoryDb.integrations;
      const idx = integrations.findIndex(item => item.provider === 'github' || item.id === 'github');
      const updatedItem = {
        id: 'github',
        provider: 'github',
        status: 'connected',
        settings: { github_username: "pratham", avatar_url: "https://i.pravatar.cc/150?u=pratham", name: "Pratham", token: tokenInput.trim() },
        updated_at: new Date().toISOString()
      };
      if (idx > -1) {
        integrations[idx] = { ...integrations[idx], ...updatedItem };
      } else {
        integrations.push(updatedItem);
      }
      
      showToast("GitHub token saved successfully!", "success");
      setTokenInput("");
      onAddLog?.();
      onAddAlert?.();
      
      // Reload repos
      await fetchRepos();
    } catch (err) {
      console.error("Failed to save token:", err);
      showToast("Failed to save GitHub token: " + err.message, "error");
    } finally {
      setIsSavingToken(false);
    }
  };

  const handleDisconnect = async () => {
    setIsSavingToken(true);
    try {
      if (!inMemoryDb.integrations) inMemoryDb.integrations = [];
      const integrations = inMemoryDb.integrations;
      const idx = integrations.findIndex(item => item.provider === 'github' || item.id === 'github');
      const updatedItem = {
        id: 'github',
        provider: 'github',
        status: 'disconnected',
        settings: {},
        updated_at: new Date().toISOString()
      };
      if (idx > -1) {
        integrations[idx] = { ...integrations[idx], ...updatedItem };
      } else {
        integrations.push(updatedItem);
      }

      showToast("GitHub integration disconnected and token removed.", "success");
      onAddLog?.();
      onAddAlert?.();
      
      // Reload repos
      await fetchRepos();
    } catch (err) {
      console.error("Failed to disconnect:", err);
      showToast("Failed to disconnect GitHub integration", "error");
    } finally {
      setIsSavingToken(false);
    }
  };

  // Fetch details (issues & pulls) when selected repo changes
  useEffect(() => {
    if (!selectedRepo) return;

    const fetchRepoDetails = async () => {
      setIsLoadingDetails(true);
      try {
        // Fetch Issues
        const issuesRes = await fetch(`/api/github/issues?repo=${selectedRepo.full_name}`);
        if (issuesRes.ok) {
          const issuesData = await issuesRes.json();
          setIssues(issuesData.issues || []);
          if (issuesData.authenticated !== undefined) {
            setIsAuthenticated(issuesData.authenticated);
          }
        }

        // Fetch PRs
        const pullsRes = await fetch(`/api/github/pulls?repo=${selectedRepo.full_name}`);
        if (pullsRes.ok) {
          const pullsData = await pullsRes.json();
          setPulls(pullsData.pulls || []);
          if (pullsData.authenticated !== undefined) {
            setIsAuthenticated(pullsData.authenticated);
          }
        }
      } catch (err) {
        console.error("Failed to fetch repository details:", err);
        showToast("Error retrieving repository issues & PRs", "error");
      } finally {
        setIsLoadingDetails(false);
      }
    };

    fetchRepoDetails();
  }, [selectedRepo]);

  // Handle simulating a webhook payload locally
  const triggerMockWebhook = async (type) => {
    setIsTriggeringWebhook(true);
    try {
      let payload = {};
      const repoName = selectedRepo?.name || "arcfuse";
      const repoFullName = selectedRepo?.full_name || "acme/arcfuse";

      if (type === "push") {
        payload = {
          ref: "refs/heads/main",
          sender: { login: "sophiapatel", avatar_url: "https://i.pravatar.cc/150?u=sophia" },
          head_commit: { message: "refactor: optimize rendering pipeline for unified inbox feeds" },
          repository: { name: repoName, full_name: repoFullName }
        };
      } else if (type === "issue") {
        payload = {
          action: "opened",
          issue: { number: 45, title: "Feature request: Dark mode toggle in account settings", state: "open" },
          sender: { login: "alexchen", avatar_url: "https://i.pravatar.cc/150?u=alex" },
          repository: { name: repoName, full_name: repoFullName }
        };
      } else if (type === "pr") {
        payload = {
          action: "closed",
          pull_request: { number: 38, title: "Feat: Implement customizable Slack channels connection settings", state: "closed", merged: true, base: { ref: "main" } },
          sender: { login: "alexchen", avatar_url: "https://i.pravatar.cc/150?u=alex" },
          repository: { name: repoName, full_name: repoFullName }
        };
      }

      const res = await fetch("/api/webhooks/github", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-github-event": type === "push" ? "push" : type === "issue" ? "issues" : "pull_request"
        },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        setWebhookStatus("Active (Receiving Events)");
        showToast(`Simulated GitHub Webhook event (${type.toUpperCase()}) triggered! Check your Feed/Timeline.`, "success");
        
        // Dynamically invoke reload indicators
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

  const filteredIssues = issues.filter(issue => 
    issue.title.toLowerCase().includes(issueQuery.toLowerCase()) ||
    issue.number.toString().includes(issueQuery)
  );

  const filteredPulls = pulls.filter(pr => 
    pr.title.toLowerCase().includes(pullQuery.toLowerCase()) ||
    pr.number.toString().includes(pullQuery)
  );

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-extrabold tracking-tight flex items-center gap-3">
          <Github className="w-8 h-8 text-primary" /> GitHub Hub
        </h2>
        <p className="text-muted-foreground text-sm mt-1">
          Monitor your GitHub repositories, inspect open issues and pull requests, and configure webhooks.
        </p>
      </div>

      {/* Premium Integration Status / Token Input Banner */}
      <div className={cn(
        "glass-panel-heavy rounded-3xl p-6 border transition-all duration-300 relative overflow-hidden bg-surface-100/30",
        isAuthenticated 
          ? "bg-green-500/5 border-green-500/20" 
          : "bg-primary/5 border-primary/20"
      )}>
        {/* Decorative background gradients */}
        <div className={cn(
          "absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 opacity-30",
          isAuthenticated ? "bg-green-500" : "bg-primary"
        )}></div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-1.5 flex-1">
            <div className="flex items-center gap-2">
              <span className={cn(
                "w-2.5 h-2.5 rounded-full animate-pulse",
                isAuthenticated ? "bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]" : "bg-yellow-500"
              )}></span>
              <h3 className="font-extrabold text-sm text-foreground">
                {isAuthenticated ? "Live GitHub Connection Active" : "Using Live GitHub Demo Mode"}
              </h3>
            </div>
            <p className="text-xs text-muted-foreground max-w-2xl leading-relaxed">
              {isAuthenticated 
                ? "Arcfuse is successfully connected to your real GitHub account. Live repositories, issues, and pull requests are synchronized."
                : "Currently showing static fallback demo data. Provide a GitHub Personal Access Token (PAT) with 'repo' scope to sync your actual repositories and project workflows."}
            </p>
          </div>

          <div className="shrink-0 flex items-center gap-3">
            {isAuthenticated ? (
              <button
                onClick={handleDisconnect}
                disabled={isSavingToken}
                className="px-4 py-2.5 rounded-xl bg-destructive/10 text-destructive border border-destructive/20 text-xs font-bold hover:bg-destructive hover:text-white transition-all duration-200 active:scale-95 disabled:opacity-50"
              >
                {isSavingToken ? "Disconnecting..." : "Disconnect Live API"}
              </button>
            ) : (
              <form onSubmit={handleSaveToken} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                <input
                  type="password"
                  placeholder="Paste GitHub PAT (e.g. ghp_...)"
                  value={tokenInput}
                  onChange={(e) => setTokenInput(e.target.value)}
                  className="bg-surface-200 border border-glass-border rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-primary text-foreground w-full sm:w-64"
                  required
                />
                <button
                  type="submit"
                  disabled={isSavingToken || !tokenInput}
                  className="px-4 py-2.5 rounded-xl bg-primary text-black font-bold text-xs hover:bg-primary-hover active:scale-95 transition-all shadow-glow-primary hover:shadow-glow-primary-lg disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {isSavingToken && <Loader2 className="w-3 h-3 animate-spin" />}
                  Connect Live API
                </button>
              </form>
            )}
          </div>
        </div>
      </div>


      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[calc(100vh-14rem)] min-h-[500px]">
        {/* Left Column: Repository Selector */}
        <div className="lg:col-span-1 border border-glass-border rounded-3xl bg-surface-100/30 flex flex-col overflow-hidden">
          <div className="p-4 border-b border-glass-border flex items-center justify-between bg-surface-100/50">
            <h3 className="font-bold text-xs uppercase tracking-wider text-muted-foreground">Repositories</h3>
            <button 
              onClick={fetchRepos}
              className="p-1 rounded-md text-muted-foreground hover:bg-surface-200 hover:text-foreground transition-all"
              title="Refresh repository list"
            >
              <RefreshCw className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto custom-scrollbar p-2 space-y-1">
            {isLoadingRepos ? (
              <div className="py-12 flex flex-col items-center justify-center space-y-2 text-muted-foreground">
                <Loader2 className="w-6 h-6 animate-spin text-primary" />
                <span className="text-[10px]">Loading repos...</span>
              </div>
            ) : repos.length === 0 ? (
              <p className="text-xs text-muted-foreground text-center py-8">No repositories found</p>
            ) : (
              repos.map(r => (
                <button
                  key={r.id}
                  onClick={() => setSelectedRepo(r)}
                  className={cn(
                    "w-full flex flex-col p-3 rounded-xl transition-all text-left border relative group",
                    selectedRepo?.id === r.id
                      ? "bg-primary/10 border-primary/20"
                      : "hover:bg-surface-200/50 border-transparent"
                  )}
                >
                  <span className="text-xs font-bold text-foreground truncate group-hover:text-primary transition-colors">
                    {r.name}
                  </span>
                  <p className="text-[10px] text-muted-foreground line-clamp-2 mt-1 leading-normal">
                    {r.description}
                  </p>
                  <div className="flex items-center gap-3 mt-2 text-[9px] text-muted-foreground">
                    <span className="flex items-center gap-0.5"><Star className="w-2.5 h-2.5 text-primary" /> {r.stargazers_count}</span>
                    <span className="flex items-center gap-0.5"><GitFork className="w-2.5 h-2.5" /> {r.forks_count}</span>
                    <span className="px-1.5 py-0.5 bg-surface-300 rounded text-foreground font-medium">{r.language}</span>
                  </div>
                </button>
              ))
            )}
          </div>
        </div>

        {/* Right Column: Repository Detail Viewer */}
        <div className="lg:col-span-3 border border-glass-border rounded-3xl bg-surface-100/30 flex flex-col overflow-hidden">
          {selectedRepo ? (
            <>
              {/* Header Info */}
              <div className="p-6 border-b border-glass-border bg-surface-100/50 flex flex-col md:flex-row justify-between md:items-center gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-extrabold text-lg text-foreground">{selectedRepo.full_name}</h3>
                    <a 
                      href={selectedRepo.html_url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-primary transition-colors"
                      title="Open on GitHub"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                  <p className="text-xs text-muted-foreground">{selectedRepo.description}</p>
                </div>

                <div className="flex flex-wrap gap-2 text-xs">
                  <span className="flex items-center gap-1 bg-surface-200 px-3 py-1.5 rounded-xl border border-glass-border font-medium text-foreground">
                    <Star className="w-3.5 h-3.5 text-primary" /> {selectedRepo.stargazers_count} Stars
                  </span>
                  <span className="flex items-center gap-1 bg-surface-200 px-3 py-1.5 rounded-xl border border-glass-border font-medium text-foreground">
                    <GitFork className="w-3.5 h-3.5" /> {selectedRepo.forks_count} Forks
                  </span>
                  <span className="flex items-center gap-1 bg-surface-200 px-3 py-1.5 rounded-xl border border-glass-border font-medium text-foreground">
                    <CircleAlert className="w-3.5 h-3.5 text-yellow-500" /> {selectedRepo.open_issues_count} Open Issues
                  </span>
                </div>
              </div>

              {/* Tab Selector */}
              <div className="px-6 border-b border-glass-border flex bg-surface-100/20">
                {[
                  { id: "issues", label: "Issues" },
                  { id: "pulls", label: "Pull Requests" },
                  { id: "webhooks", label: "Webhooks" }
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={cn(
                      "px-4 py-3 text-xs font-bold border-b-2 transition-all relative top-[1px]",
                      activeTab === tab.id
                        ? "border-primary text-primary"
                        : "border-transparent text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Tab Panel Content */}
              <div className="flex-1 overflow-y-auto custom-scrollbar p-6">
                {isLoadingDetails ? (
                  <div className="h-48 flex flex-col items-center justify-center space-y-2 text-muted-foreground">
                    <Loader2 className="w-8 h-8 animate-spin text-primary" />
                    <span className="text-xs">Loading repository history...</span>
                  </div>
                ) : (
                  <>
                    {/* Issues Tab */}
                    {activeTab === "issues" && (
                      <div className="space-y-4">
                        <div className="relative">
                          <Search className="w-4 h-4 text-muted-foreground absolute left-3.5 top-3" />
                          <input
                            type="text"
                            placeholder="Search issues by title or number..."
                            value={issueQuery}
                            onChange={e => setIssueQuery(e.target.value)}
                            className="w-full bg-surface-200 border border-glass-border rounded-xl pl-10 pr-4 py-2.5 text-xs focus:outline-none focus:border-primary text-foreground"
                          />
                        </div>

                        <div className="space-y-2">
                          {filteredIssues.length === 0 ? (
                            <p className="text-xs text-muted-foreground text-center py-8">No issues found</p>
                          ) : (
                            filteredIssues.map(issue => (
                              <div 
                                key={issue.id}
                                className="p-4 rounded-2xl bg-surface-100 border border-glass-border hover:border-primary/25 transition-all flex justify-between items-start gap-4 group"
                              >
                                <div className="space-y-1.5">
                                  <div className="flex items-center flex-wrap gap-2">
                                    <span className={cn(
                                      "px-2 py-0.5 rounded-full text-[9px] font-extrabold uppercase border tracking-wider",
                                      issue.state === "open"
                                        ? "bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
                                        : "bg-green-500/10 text-green-500 border-green-500/20"
                                    )}>
                                      {issue.state}
                                    </span>
                                    <span className="text-[10px] text-muted-foreground font-semibold">#{issue.number}</span>
                                    <span className="text-[10px] text-muted-foreground">by @{issue.user.login}</span>
                                  </div>
                                  <h4 className="text-xs font-bold text-foreground group-hover:text-primary transition-colors leading-relaxed">
                                    {issue.title}
                                  </h4>
                                  <div className="flex flex-wrap gap-1.5 mt-1">
                                    {issue.labels.map((l, i) => (
                                      <span 
                                        key={i} 
                                        className="px-2 py-0.5 rounded text-[8px] font-bold"
                                        style={{ backgroundColor: `#${l.color}15`, color: `#${l.color}` }}
                                      >
                                        {l.name}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                                <div className="text-right flex flex-col justify-between items-end h-full">
                                  <a 
                                    href={issue.html_url} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="p-1.5 rounded-lg border border-glass-border bg-surface-200 text-muted-foreground hover:text-primary transition-colors"
                                  >
                                    <ExternalLink className="w-3.5 h-3.5" />
                                  </a>
                                  <span className="text-[9px] text-muted-foreground mt-4">
                                    {new Date(issue.created_at).toLocaleDateString([], { month: "short", day: "numeric" })}
                                  </span>
                                </div>
                              </div>
                            ))
                          )}
                        </div>
                      </div>
                    )}

                    {/* PRs Tab */}
                    {activeTab === "pulls" && (
                      <div className="space-y-4">
                        <div className="relative">
                          <Search className="w-4 h-4 text-muted-foreground absolute left-3.5 top-3" />
                          <input
                            type="text"
                            placeholder="Search PRs by title or number..."
                            value={pullQuery}
                            onChange={e => setPullQuery(e.target.value)}
                            className="w-full bg-surface-200 border border-glass-border rounded-xl pl-10 pr-4 py-2.5 text-xs focus:outline-none focus:border-primary text-foreground"
                          />
                        </div>

                        <div className="space-y-2">
                          {filteredPulls.length === 0 ? (
                            <p className="text-xs text-muted-foreground text-center py-8">No pull requests found</p>
                          ) : (
                            filteredPulls.map(pr => (
                              <div 
                                key={pr.id}
                                className="p-4 rounded-2xl bg-surface-100 border border-glass-border hover:border-primary/25 transition-all flex justify-between items-start gap-4 group"
                              >
                                <div className="space-y-1.5">
                                  <div className="flex items-center flex-wrap gap-2">
                                    <span className={cn(
                                      "px-2 py-0.5 rounded-full text-[9px] font-extrabold uppercase border tracking-wider",
                                      pr.state === "open"
                                        ? pr.draft 
                                          ? "bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
                                          : "bg-purple-500/10 text-purple-500 border-purple-500/20"
                                        : pr.merged_at
                                          ? "bg-green-500/10 text-green-500 border-green-500/20"
                                          : "bg-red-500/10 text-red-500 border-red-500/20"
                                    )}>
                                      {pr.state === "open" ? (pr.draft ? "draft" : "open") : (pr.merged_at ? "merged" : "closed")}
                                    </span>
                                    <span className="text-[10px] text-muted-foreground font-semibold">#{pr.number}</span>
                                    <span className="text-[10px] text-muted-foreground">by @{pr.user.login}</span>
                                  </div>
                                  <h4 className="text-xs font-bold text-foreground group-hover:text-primary transition-colors leading-relaxed">
                                    {pr.title}
                                  </h4>
                                  <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground mt-1">
                                    <span className="px-1.5 py-0.5 bg-surface-300 rounded font-mono text-[9px]">{pr.base?.ref}</span>
                                    <span>&larr;</span>
                                    <span className="px-1.5 py-0.5 bg-surface-300 rounded font-mono text-[9px]">{pr.head?.ref}</span>
                                  </div>
                                </div>
                                <div className="text-right flex flex-col justify-between items-end h-full">
                                  <a 
                                    href={pr.html_url} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="p-1.5 rounded-lg border border-glass-border bg-surface-200 text-muted-foreground hover:text-primary transition-colors"
                                  >
                                    <ExternalLink className="w-3.5 h-3.5" />
                                  </a>
                                  <span className="text-[9px] text-muted-foreground mt-4">
                                    {new Date(pr.created_at).toLocaleDateString([], { month: "short", day: "numeric" })}
                                  </span>
                                </div>
                              </div>
                            ))
                          )}
                        </div>
                      </div>
                    )}

                    {/* Webhooks Tab */}
                    {activeTab === "webhooks" && (
                      <div className="space-y-6">
                        <div className="bg-surface-100 p-6 rounded-2xl border border-glass-border space-y-4">
                          <h4 className="text-sm font-bold text-foreground flex items-center gap-2">
                            <Webhook className="w-4 h-4 text-primary" /> Webhook Integration Settings
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
                                {typeof window !== "undefined" ? `${window.location.origin}/api/webhooks/github` : "/api/webhooks/github"}
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-3">
                          <h4 className="text-xs font-bold text-foreground">How to configure webhooks on GitHub:</h4>
                          <ol className="text-xs text-muted-foreground list-decimal pl-4 space-y-2 leading-relaxed">
                            <li>Go to your GitHub repository and open the **Settings** tab.</li>
                            <li>Select **Webhooks** from the left sidebar and click **Add webhook**.</li>
                            <li>Paste the **Payload URL** above into the configuration field.</li>
                            <li>Set the **Content type** to `application/json`.</li>
                            <li>Choose **Let me select individual events** and select: **Pushes**, **Issues**, and **Pull requests**.</li>
                            <li>Click **Add webhook** to save the settings.</li>
                          </ol>
                        </div>

                        {/* Direct testing block */}
                        <div className="bg-primary/5 border border-primary/20 p-6 rounded-2xl space-y-4">
                          <div className="space-y-1">
                            <h4 className="text-xs font-extrabold text-primary uppercase tracking-wider flex items-center gap-1.5">
                              <Play className="w-3.5 h-3.5 fill-primary" /> Local Sandbox Webhook Testing
                            </h4>
                            <p className="text-[11px] text-muted-foreground leading-relaxed">
                              Since you are running Arcfuse on `localhost`, GitHub cannot send real HTTP posts to your local server without a tunnel (like ngrok). 
                              Use the buttons below to trigger simulated GitHub webhook events directly to your endpoint to verify the real-time activity stream ingestion!
                            </p>
                          </div>

                          <div className="flex flex-wrap gap-3">
                            <button
                              onClick={() => triggerMockWebhook("push")}
                              disabled={isTriggeringWebhook}
                              className="px-4 py-2.5 rounded-xl bg-surface-200 border border-glass-border hover:bg-surface-300 font-bold text-[11px] text-foreground transition-all flex items-center gap-1.5 active:scale-95 disabled:opacity-50"
                            >
                              {isTriggeringWebhook ? <Loader2 className="w-3 h-3 animate-spin" /> : <Play className="w-3 h-3 fill-foreground" />}
                              Simulate Push Commits
                            </button>
                            
                            <button
                              onClick={() => triggerMockWebhook("issue")}
                              disabled={isTriggeringWebhook}
                              className="px-4 py-2.5 rounded-xl bg-surface-200 border border-glass-border hover:bg-surface-300 font-bold text-[11px] text-foreground transition-all flex items-center gap-1.5 active:scale-95 disabled:opacity-50"
                            >
                              {isTriggeringWebhook ? <Loader2 className="w-3 h-3 animate-spin" /> : <Play className="w-3 h-3 fill-foreground" />}
                              Simulate Issue Opened
                            </button>

                            <button
                              onClick={() => triggerMockWebhook("pr")}
                              disabled={isTriggeringWebhook}
                              className="px-4 py-2.5 rounded-xl bg-surface-200 border border-glass-border hover:bg-surface-300 font-bold text-[11px] text-foreground transition-all flex items-center gap-1.5 active:scale-95 disabled:opacity-50"
                            >
                              {isTriggeringWebhook ? <Loader2 className="w-3 h-3 animate-spin" /> : <Play className="w-3 h-3 fill-foreground" />}
                              Simulate PR Merged
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-muted-foreground p-8">
              <Github className="w-12 h-12 mb-3 opacity-30" />
              <p className="text-sm">Select a repository to view issues and pull requests</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
