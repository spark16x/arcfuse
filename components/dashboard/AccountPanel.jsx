"use client";

import { useEffect, useState } from "react";
import { signOut } from "next-auth/react";
import {
  User,
  Mail,
  ShieldCheck,
  Link2,
  LogOut,
  RefreshCw,
  CheckCircle2,
  Clock,
  Github,
  MessageSquare,
} from "lucide-react";
import { cn } from "@/lib/utils";

/* ── tiny helper ─────────────────────────────────────────────── */
function Field({ label, value, mono = false }) {
  return (
    <div className="space-y-1">
      <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
        {label}
      </p>
      <p
        className={cn(
          "text-sm text-foreground font-semibold break-all",
          mono && "font-mono text-xs"
        )}
      >
        {value || <span className="text-muted-foreground italic">—</span>}
      </p>
    </div>
  );
}

/* ── provider badge ──────────────────────────────────────────── */
const PROVIDER_META = {
  github: {
    label: "GitHub",
    Icon: Github,
    color: "#e6edf3",
    bg: "rgba(36,41,47,0.9)",
  },
  discord: {
    label: "Discord",
    Icon: MessageSquare,
    color: "#5865F2",
    bg: "rgba(88,101,242,0.12)",
  },
};

function ProviderBadge({ provider }) {
  const meta = PROVIDER_META[provider] ?? {
    label: provider,
    Icon: Link2,
    color: "#00BFFF",
    bg: "rgba(0,191,255,0.1)",
  };
  const { label, Icon, color, bg } = meta;
  return (
    <div
      className="flex items-center gap-2 px-3 py-2 rounded-xl border border-glass-border text-xs font-bold"
      style={{ background: bg, color }}
    >
      <Icon className="w-4 h-4 shrink-0" style={{ color }} />
      {label}
      <CheckCircle2 className="w-3.5 h-3.5 ml-auto opacity-80" />
    </div>
  );
}

/* ── main component ──────────────────────────────────────────── */
export function AccountPanel() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchSession = async () => {
    try {
      const res = await fetch("/api/auth/session");
      const data = res.ok ? await res.json() : null;
      setSession(data?.user ? data : null);
    } catch {
      setSession(null);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchSession();
  }, []);

  const handleRefresh = () => {
    setRefreshing(true);
    fetchSession();
  };

  const user = session?.user ?? null;
  /* Auth.js surfaces the provider on the token → session callback we set up */
  const provider = session?.provider ?? null;

  /* Derive linked providers list from known integrations if available */
  const linkedProviders = provider ? [provider] : [];

  /* Format expiry if present */
  const expires = session?.expires
    ? new Date(session.expires).toLocaleString(undefined, {
        dateStyle: "medium",
        timeStyle: "short",
      })
    : null;

  return (
    <div className="space-y-6 max-w-3xl">
      {/* Page header */}
      <div className="flex items-end justify-between">
        <div>
          <h2 className="text-3xl font-extrabold tracking-tight">My Account</h2>
          <p className="text-muted-foreground text-sm mt-1">
            View your authenticated session details and linked OAuth providers.
          </p>
        </div>
        <button
          onClick={handleRefresh}
          disabled={refreshing}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-surface-200 border border-glass-border text-xs font-bold text-muted-foreground hover:text-foreground hover:bg-surface-300 transition-all active:scale-95 disabled:opacity-50"
          aria-label="Refresh session"
        >
          <RefreshCw className={cn("w-3.5 h-3.5", refreshing && "animate-spin")} />
          Refresh
        </button>
      </div>

      {loading ? (
        /* Skeleton */
        <div className="glass-panel-heavy rounded-3xl border border-glass-border p-8 space-y-4 animate-pulse">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="space-y-2">
              <div className="h-2 w-24 bg-surface-300 rounded-full" />
              <div className="h-4 w-48 bg-surface-200 rounded-full" />
            </div>
          ))}
        </div>
      ) : !user ? (
        /* No session */
        <div className="glass-panel-heavy rounded-3xl border border-glass-border p-12 flex flex-col items-center gap-4 text-center">
          <div className="w-16 h-16 rounded-2xl bg-destructive/10 text-destructive border border-destructive/20 flex items-center justify-center">
            <User className="w-7 h-7" />
          </div>
          <div>
            <p className="font-bold text-foreground">No active session</p>
            <p className="text-xs text-muted-foreground mt-1">
              Sign in to view your account details.
            </p>
          </div>
          <button
            onClick={() => (window.location.href = "/login")}
            className="px-6 py-2.5 rounded-xl bg-primary text-black font-bold text-xs hover:bg-primary-hover active:scale-95 transition-all shadow-glow-primary"
          >
            Go to Sign In
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Profile card */}
          <div className="glass-panel-heavy rounded-3xl border border-glass-border p-6 flex flex-col sm:flex-row items-center sm:items-start gap-6">
            {/* Avatar */}
            <div className="relative shrink-0">
              {user.image ? (
                <img
                  src={user.image}
                  alt={user.name ?? "Avatar"}
                  className="w-24 h-24 rounded-2xl object-cover ring-2 ring-primary/30 shadow-glow-primary"
                />
              ) : (
                <div className="w-24 h-24 rounded-2xl bg-primary/10 flex items-center justify-center ring-2 ring-primary/20">
                  <User className="w-10 h-10 text-primary" />
                </div>
              )}
              <span className="absolute -bottom-2 -right-2 w-6 h-6 rounded-full bg-green-500 ring-2 ring-surface-100 flex items-center justify-center">
                <CheckCircle2 className="w-3.5 h-3.5 text-white" />
              </span>
            </div>

            {/* Name / email */}
            <div className="flex-1 min-w-0 space-y-1 text-center sm:text-left">
              <h3 className="text-xl font-extrabold text-foreground truncate">
                {user.name ?? "Unknown User"}
              </h3>
              <p className="text-sm text-muted-foreground flex items-center justify-center sm:justify-start gap-1.5">
                <Mail className="w-4 h-4 shrink-0 text-primary" />
                {user.email ?? "No email on record"}
              </p>
              <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-500 text-[10px] font-extrabold uppercase tracking-wider">
                <ShieldCheck className="w-3 h-3" />
                Authenticated
              </div>
            </div>
          </div>

          {/* Details grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="glass-panel-heavy rounded-2xl border border-glass-border p-5 space-y-5">
              <p className="text-xs font-black text-foreground uppercase tracking-wider flex items-center gap-2">
                <User className="w-4 h-4 text-primary" /> Identity
              </p>
              <Field label="Display Name" value={user.name} />
              <Field label="Email Address" value={user.email} />
              <Field label="User ID" value={user.id} mono />
            </div>

            <div className="glass-panel-heavy rounded-2xl border border-glass-border p-5 space-y-5">
              <p className="text-xs font-black text-foreground uppercase tracking-wider flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-primary" /> Session
              </p>
              {expires && (
                <div className="space-y-1">
                  <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                    Session Expires
                  </p>
                  <p className="text-sm text-foreground font-semibold flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-primary shrink-0" />
                    {expires}
                  </p>
                </div>
              )}
              <div className="space-y-1">
                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                  Auth Strategy
                </p>
                <p className="text-sm text-foreground font-semibold">JWT (stateless)</p>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                  Status
                </p>
                <p className="text-sm text-green-500 font-bold flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-green-500 inline-block animate-pulse" />
                  Active
                </p>
              </div>
            </div>
          </div>

          {/* Linked OAuth providers */}
          <div className="glass-panel-heavy rounded-2xl border border-glass-border p-5 space-y-4">
            <p className="text-xs font-black text-foreground uppercase tracking-wider flex items-center gap-2">
              <Link2 className="w-4 h-4 text-primary" /> Linked OAuth Providers
            </p>
            {linkedProviders.length > 0 ? (
              <div className="flex flex-wrap gap-3">
                {linkedProviders.map((p) => (
                  <ProviderBadge key={p} provider={p} />
                ))}
              </div>
            ) : (
              <p className="text-xs text-muted-foreground">
                Provider info not available in current session token.
              </p>
            )}
          </div>

          {/* Danger zone */}
          <div className="glass-panel-heavy rounded-2xl border border-destructive/20 p-5 space-y-4 bg-destructive/5">
            <p className="text-xs font-black text-destructive uppercase tracking-wider">
              Danger Zone
            </p>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <p className="text-sm font-bold text-foreground">Sign out of Arcfuse</p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Ends your current session and redirects you to the login page.
                </p>
              </div>
              <button
                onClick={() => signOut({ redirectTo: "/login" })}
                className="flex items-center gap-2 shrink-0 px-5 py-2.5 rounded-xl bg-destructive/10 text-destructive border border-destructive/20 font-bold text-xs hover:bg-destructive hover:text-white active:scale-95 transition-all"
              >
                <LogOut className="w-4 h-4" />
                Sign Out
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
