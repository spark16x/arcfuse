'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Step3() {
  const [workspaceName, setWorkspaceName] = useState('');
  const [workspaceUrl, setWorkspaceUrl] = useState('');
  const [isClient, setIsClient] = useState(false);
  const [userImage, setUserImage] = useState(null);
  const [userSession, setUserSession] = useState(null);

  useEffect(() => {
    setIsClient(true);
    const fetchSession = async () => {
      try {
        const res = await fetch('/api/auth/session');
        const session = res.ok ? await res.json() : null;
        if (session?.user) {
          setUserSession(session.user);
          if (session.user.image) {
            setUserImage(session.user.image);
          }
          if (session.user.name && !workspaceName) {
            setWorkspaceName(session.user.name + "'s Workspace");
            const slug = session.user.name.toLowerCase().replace(/[^a-z0-9-]/g, '-');
            setWorkspaceUrl(slug);
          } else if (session.user.email && !workspaceName) {
            const emailSlug = session.user.email.split('@')[0];
            setWorkspaceName(emailSlug + "'s Workspace");
            setWorkspaceUrl(emailSlug);
          }
        }
      } catch (e) {
        console.error("Error fetching session:", e);
      }
    };
    fetchSession();
  }, []);

  const avatarColors = [
    { bg: '#e2dfff', text: '#1e00a9' },
    { bg: '#dce2f7', text: '#2b3242' },
    { bg: '#fee2e2', text: '#991b1b' },
    { bg: '#dcfce7', text: '#166534' },
    { bg: '#fef9c3', text: '#854d0e' },
    { bg: '#fae8ff', text: '#86198f' }
  ];

  const displayUrl = workspaceUrl.trim()
    ? workspaceUrl.toLowerCase().replace(/[^a-z0-9-]/g, '-')
    : 'workspace';

  const displayName = workspaceName.trim() || 'New Workspace';
  const firstChar = displayName.charAt(0).toUpperCase();
  const charCode = firstChar.charCodeAt(0);
  const colorPair = avatarColors[charCode % avatarColors.length];

  const handleCreateWorkspace = async (e) => {
    e.preventDefault();
    
    const userId = userSession?.id || userSession?.email || "mock-user-id";
    const selectedRole = typeof window !== 'undefined' ? localStorage.getItem('onboarding_role') : null;
    const finalAvatar = userImage || colorPair.bg;

    const newSettings = {
      user_id: userId,
      name: displayName,
      email: userSession?.email || 'user@example.com',
      slug: displayUrl,
      avatar: finalAvatar,
      role: selectedRole,
      description: document.getElementById('ws-desc')?.value || '',
      created_at: new Date().toISOString()
    };

    // Save to window.__inMemoryDb
    if (typeof window !== 'undefined') {
      if (!window.__inMemoryDb) {
        window.__inMemoryDb = {};
      }
      if (!window.__inMemoryDb.workspace_settings) {
        window.__inMemoryDb.workspace_settings = [];
      }
      
      const list = window.__inMemoryDb.workspace_settings;
      const idx = list.findIndex(item => item.user_id === userId);
      if (idx > -1) {
        list[idx] = { ...list[idx], ...newSettings };
      } else {
        list.push(newSettings);
      }

      // Also persist to localStorage
      localStorage.setItem(`workspace_settings_${userId}`, JSON.stringify(newSettings));
    }

    window.location.href = '/onboarding/step-4';
  };

  return (
    <div className="bg-surface text-on-surface min-h-screen flex flex-col font-['Geist',_sans-serif]">
      <nav className="fixed top-0 w-full z-50 bg-surface/80 backdrop-blur-md border-b border-outline-variant/50 shadow-sm">
        <div className="flex justify-between items-center h-16 px-margin-mobile md:px-margin-desktop max-w-[1280px] mx-auto">
          <div className="font-headline-md text-headline-md font-bold text-primary">Arcfuse</div>
          <div className="hidden md:flex gap-md items-center">
            <span className="font-body-sm text-body-sm text-on-surface-variant hover:text-primary cursor-pointer transition-colors duration-200">Platform</span>
            <span className="font-body-sm text-body-sm text-on-surface-variant hover:text-primary cursor-pointer transition-colors duration-200">Resources</span>
            <span className="font-body-sm text-body-sm text-on-surface-variant hover:text-primary cursor-pointer transition-colors duration-200">Solutions</span>
          </div>
          <div className="flex gap-sm">
            <button className="font-label-md text-label-md px-md py-xs rounded-lg text-primary hover:bg-primary/5 transition-colors">Login</button>
            <button className="font-label-md text-label-md px-md py-xs rounded-lg bg-primary-container text-on-primary hover:opacity-90 transition-opacity shadow-sm">Sign Up</button>
          </div>
        </div>
      </nav>

      <main className="flex-grow pt-xl px-margin-mobile md:px-margin-desktop max-w-[1280px] mx-auto w-full flex flex-col items-center">
        <div className="w-full mt-lg mb-xl">
          <div className="flex justify-between items-end mb-sm">
            <div>
              <h1 className="font-display-lg text-display-lg text-on-surface">Create your workspace</h1>
              <p className="font-body-md text-body-md text-on-surface-variant mt-xs">Let&apos;s set up the digital home for your team&apos;s projects.</p>
            </div>
            <div className="text-right">
              <div className="font-label-md text-label-md text-primary font-bold mb-xs">Step 3 of 4</div>
              <div className="w-32 h-2 bg-surface-container rounded-full overflow-hidden">
                <div className="w-3/4 h-full bg-primary-container transition-all duration-500"></div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-xl mt-lg">
            <div className="lg:col-span-7 flex flex-col gap-lg">
              <section className="bg-surface-container-lowest border border-outline-variant rounded-xl p-md shadow-sm">
                <div className="flex flex-col gap-md">
                  <div className="flex flex-col gap-xs">
                    <label className="font-label-md text-label-md font-semibold text-on-surface" htmlFor="ws-name">Workspace Name</label>
                    <input
                      className="w-full bg-surface border border-outline-variant rounded-lg p-sm font-body-sm text-body-sm focus:border-primary focus:ring-1 focus:ring-primary/20 outline-none transition-all"
                      id="ws-name"
                      value={workspaceName}
                      onChange={(e) => setWorkspaceName(e.target.value)}
                      placeholder="e.g. Design Systems HQ"
                      type="text"
                    />
                  </div>
                  <div className="flex flex-col gap-xs">
                    <label className="font-label-md text-label-md font-semibold text-on-surface" htmlFor="ws-url">Workspace URL</label>
                    <div className="relative flex items-center">
                      <span className="absolute left-sm font-body-sm text-body-sm text-outline">arcfuse.app/</span>
                      <input
                        className="w-full bg-surface border border-outline-variant rounded-lg p-sm pl-[96px] font-body-sm text-body-sm focus:border-primary focus:ring-1 focus:ring-primary/20 outline-none transition-all"
                        id="ws-url"
                        value={workspaceUrl}
                        onChange={(e) => setWorkspaceUrl(e.target.value)}
                        onKeyDown={(e) => e.key === ' ' && e.preventDefault()}
                        placeholder="my-awesome-team"
                        type="text"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-xs">
                    <label className="font-label-md text-label-md font-semibold text-on-surface" htmlFor="ws-desc">Description (Optional)</label>
                    <textarea
                      className="w-full bg-surface border border-outline-variant rounded-lg p-sm font-body-sm text-body-sm focus:border-primary focus:ring-1 focus:ring-primary/20 outline-none transition-all resize-none"
                      id="ws-desc"
                      placeholder="Describe what your workspace is for..."
                      rows={3}
                    ></textarea>
                  </div>
                </div>
              </section>
              <div className="flex justify-between items-center">
                <Link href="/onboarding/step-2" className="font-label-md text-label-md px-lg py-sm rounded-lg border border-outline-variant text-on-surface-variant hover:bg-surface-container transition-colors">
                  Back
                </Link>
                <button
                  onClick={handleCreateWorkspace}
                  className="font-label-md text-label-md px-lg py-sm rounded-lg bg-primary text-on-primary font-bold shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
                >
                  Create Workspace
                </button>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="sticky top-24">
                <p className="font-label-md text-label-md font-semibold text-outline mb-md uppercase tracking-wider">Preview</p>
                <div
                  className={`relative overflow-hidden bg-surface-container-lowest border border-outline-variant rounded-xl p-lg shadow-xl transition-all ${isClient ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}
                  style={{
                    transitionDuration: '600ms',
                    transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)'
                  }}
                  id="preview-card"
                >
                  <div className="flex flex-col items-center text-center gap-md relative z-10">
                    {userImage ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={userImage}
                        alt="Workspace Avatar"
                        className="w-24 h-24 rounded-full object-cover shadow-inner"
                      />
                    ) : (
                      <div
                        className="w-24 h-24 rounded-full flex items-center justify-center text-headline-lg font-bold shadow-inner transition-colors duration-500"
                        style={{ backgroundColor: colorPair.bg, color: colorPair.text }}
                      >
                        {firstChar}
                      </div>
                    )}
                    <div>
                      <h3 className="font-headline-md text-headline-md text-on-surface">{displayName}</h3>
                      <p className="font-code-sm text-code-sm text-primary mt-xs">arcfuse.app/{displayUrl}</p>
                    </div>
                    <div className="w-full h-[1px] bg-outline-variant/30 my-sm"></div>
                    <div className="w-full flex flex-col gap-sm">
                      <div className="h-4 bg-surface-container rounded-full w-full opacity-60"></div>
                      <div className="h-4 bg-surface-container rounded-full w-3/4 opacity-60"></div>
                    </div>
                  </div>
                  <div className="absolute -bottom-12 -right-12 w-32 h-32 bg-primary/5 rounded-full blur-3xl"></div>
                  <div className="absolute -top-12 -left-12 w-32 h-32 bg-secondary/5 rounded-full blur-3xl"></div>
                </div>
                <div className="mt-lg p-md bg-surface-container-low border border-outline-variant/30 rounded-lg flex gap-sm items-start">
                  <span className="material-symbols-outlined text-primary">info</span>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">Your workspace URL is permanent and will be used to invite team members. Choose carefully!</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="w-full py-md mt-xl border-t border-outline-variant bg-surface">
        <div className="flex flex-col md:flex-row justify-between items-center px-margin-desktop max-w-[1280px] mx-auto gap-sm">
          <div className="font-label-md text-label-md font-semibold text-on-surface">Arcfuse Inc.</div>
          <div className="flex gap-md">
            <span className="font-body-sm text-body-sm text-secondary hover:text-primary cursor-pointer transition-colors">Privacy Policy</span>
            <span className="font-body-sm text-body-sm text-secondary hover:text-primary cursor-pointer transition-colors">Terms of Service</span>
            <span className="font-body-sm text-body-sm text-secondary hover:text-primary cursor-pointer transition-colors">Help Center</span>
          </div>
          <div className="font-body-sm text-body-sm text-secondary">© 2024 Arcfuse Inc. All rights reserved.</div>
        </div>
      </footer>
    </div>
  );
}
