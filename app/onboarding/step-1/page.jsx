'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function Step1() {
  useEffect(() => {
    const checkUserOnboarded = async () => {
      try {
        const res = await fetch('/api/auth/session');
        const session = res.ok ? await res.json() : null;
        if (session?.user) {
          const userId = session.user.id || session.user.email || "mock-user-id";
          const inMemoryDb = typeof window !== 'undefined' ? window.__inMemoryDb : null;
          const workspaceSettings = inMemoryDb?.workspace_settings || [];
          
          // Also check localStorage
          const localSettings = typeof window !== 'undefined' ? localStorage.getItem(`workspace_settings_${userId}`) : null;
          
          if (workspaceSettings.some(item => item.user_id === userId) || localSettings) {
            console.log("User already onboarded, redirecting to dashboard.");
            window.location.href = '/dashboard';
          }
        }
      } catch (err) {
        console.error("Error checking workspace settings:", err);
      }
    };
    checkUserOnboarded();
  }, []);
  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden bg-white text-[#151c27] font-['Geist',_sans-serif]">
      {/* Header */}
      <header className="fixed top-0 w-full z-50 bg-surface/80 backdrop-blur-md border-b border-outline-variant/50 shadow-sm h-16 px-margin-mobile md:px-margin-desktop">
        <div className="max-w-[1280px] mx-auto flex justify-between items-center h-full">
          <div className="flex items-center gap-base">
            <div className="w-8 h-8 bg-primary rounded flex items-center justify-center">
              <span className="material-symbols-outlined text-white text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>bolt</span>
            </div>
            <span className="font-headline-md text-headline-md font-bold text-primary">Arcfuse</span>
          </div>
          <div className="flex items-center gap-sm">
            <div className="hidden md:flex flex-col items-end mr-sm">
              <span className="font-label-md text-label-md text-secondary uppercase tracking-wider">Setup Progress</span>
              <span className="font-body-sm text-body-sm font-semibold text-primary">Step 1 of 4</span>
            </div>
            <div className="w-24 h-1.5 bg-surface-container rounded-full overflow-hidden">
              <div className="w-1/4 h-full bg-primary rounded-full"></div>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-grow pt-32 pb-xl px-margin-mobile md:px-margin-desktop">
        <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-xl items-center">
          {/* Left Content: Welcome & Auth */}
          <div className="lg:col-span-5 flex flex-col gap-lg order-2 lg:order-1">
            <div className="space-y-sm">
              <h1 className="font-display-lg text-display-lg text-on-surface">Welcome to Arcfuse</h1>
              <p className="font-body-lg text-body-lg text-secondary max-w-md">Connect your communities, projects, and collaborators in one workspace.</p>
            </div>
            <div className="space-y-md w-full max-w-sm">
              <Link href="/onboarding/step-2" className="w-full h-14 bg-primary text-white font-label-md text-label-md rounded-xl hover:opacity-90 transition-all flex items-center justify-center gap-sm shadow-lg shadow-primary/20">
                Continue
                <span className="material-symbols-outlined">arrow_forward</span>
              </Link>
              <div className="relative flex py-xs items-center">
                <div className="flex-grow border-t border-outline-variant"></div>
                <span className="flex-shrink mx-base font-label-md text-label-md text-outline">OR CONTINUE WITH</span>
                <div className="flex-grow border-t border-outline-variant"></div>
              </div>
              <div className="grid grid-cols-2 gap-sm">
                <button className="flex items-center justify-center gap-sm h-12 border border-outline-variant rounded-xl font-label-md text-label-md text-on-surface hover:bg-surface-container transition-colors">
                  <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>account_circle</span>
                  Google
                </button>
                <button className="flex items-center justify-center gap-sm h-12 border border-outline-variant rounded-xl font-label-md text-label-md text-on-surface hover:bg-surface-container transition-colors">
                  <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>terminal</span>
                  GitHub
                </button>
              </div>
            </div>
            <p className="font-body-sm text-body-sm text-secondary">
              By continuing, you agree to our
              <a className="text-primary font-medium hover:underline ml-1" href="#">Terms of Service</a> and
              <a className="text-primary font-medium hover:underline ml-1" href="#">Privacy Policy</a>.
            </p>
          </div>

          {/* Right Content: Asymmetric Illustration / Bento */}
          <div className="lg:col-span-7 order-1 lg:order-2">
            <div className="relative w-full aspect-square md:aspect-video lg:aspect-square flex items-center justify-center">
              {/* Background Decorative Elements */}
              <div className="absolute inset-0 bg-primary/5 rounded-full blur-3xl scale-90"></div>
              {/* Product Illustration Layers */}
              <div className="relative w-full h-full max-w-[500px]">
                {/* AI Connector Card */}
                <div className="absolute top-[10%] left-[25%] w-[50%] p-md bg-white/70 backdrop-blur-md border border-outline-variant rounded-xl shadow-xl z-20 animate-float">
                  <div className="flex items-center gap-sm mb-sm">
                    <div className="w-8 h-8 rounded-full bg-primary-container/10 flex items-center justify-center">
                      <span className="material-symbols-outlined text-primary-container text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>psychology</span>
                    </div>
                    <span className="font-label-md text-label-md font-semibold text-on-surface">AI Intelligence</span>
                  </div>
                  <div className="space-y-xs">
                    <div className="h-2 w-full bg-surface-container-highest rounded-full"></div>
                    <div className="h-2 w-[80%] bg-surface-container-highest rounded-full"></div>
                    <div className="h-2 w-[60%] bg-primary-container/30 rounded-full"></div>
                  </div>
                </div>
                {/* GitHub Card */}
                <div className="absolute bottom-[20%] left-[5%] w-[45%] p-md bg-white border border-outline-variant rounded-xl shadow-lg z-10 animate-float" style={{ animationDelay: "1s" }}>
                  <div className="flex items-center gap-sm mb-sm">
                    <div className="w-8 h-8 rounded-full bg-on-background flex items-center justify-center">
                      <span className="material-symbols-outlined text-white text-[18px]">code</span>
                    </div>
                    <span className="font-label-md text-label-md font-semibold text-on-surface">GitHub Sync</span>
                  </div>
                  <div className="flex gap-xs">
                    <div className="w-6 h-6 rounded bg-surface-container"></div>
                    <div className="w-6 h-6 rounded bg-surface-container"></div>
                    <div className="w-6 h-6 rounded bg-surface-container"></div>
                    <div className="w-6 h-6 rounded bg-primary/20"></div>
                  </div>
                </div>
                {/* Discord Card */}
                <div className="absolute bottom-[10%] right-[10%] w-[45%] p-md bg-white border border-outline-variant rounded-xl shadow-lg z-10 animate-float" style={{ animationDelay: "2s" }}>
                  <div className="flex items-center gap-sm mb-sm">
                    <div className="w-8 h-8 rounded-full bg-[#5865F2] flex items-center justify-center">
                      <span className="material-symbols-outlined text-white text-[18px]">forum</span>
                    </div>
                    <span className="font-label-md text-label-md font-semibold text-on-surface">Community</span>
                  </div>
                  <div className="flex -space-x-2">
                    <div className="w-8 h-8 rounded-full border-2 border-white bg-surface-container"></div>
                    <div className="w-8 h-8 rounded-full border-2 border-white bg-secondary-container"></div>
                    <div className="w-8 h-8 rounded-full border-2 border-white bg-primary-fixed"></div>
                  </div>
                </div>
                {/* Central "Arc" Node */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-primary rounded-full flex items-center justify-center shadow-2xl z-30 shadow-primary/40">
                  <span className="material-symbols-outlined text-white text-[48px]" style={{ fontVariationSettings: "'FILL' 1" }}>hub</span>
                  {/* Pulsing lines connecting to other cards */}
                  <svg className="absolute inset-0 w-full h-full scale-[5]" fill="none" viewBox="0 0 100 100">
                    <path className="text-primary/20" d="M 50 50 L 10 20" stroke="currentColor" strokeDasharray="2 2" strokeWidth="0.5"></path>
                    <path className="text-primary/20" d="M 50 50 L 90 20" stroke="currentColor" strokeDasharray="2 2" strokeWidth="0.5"></path>
                    <path className="text-primary/20" d="M 50 50 L 50 90" stroke="currentColor" strokeDasharray="2 2" strokeWidth="0.5"></path>
                  </svg>
                </div>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img alt="Network visualization" className="absolute inset-0 w-full h-full object-contain mix-blend-overlay opacity-30 pointer-events-none" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAAtlv42or_GYdKMaKon2FcizkIQghzPke5AdM8luKwQjPJZOUyZ8rYjS3GGx1kJDWBd6ISVgnrJtjcyuWALuThe49dVrRv8oH7TZjtL9-t2KunX5rxprqQBmiDx5nTM5kQJYFuPziaa3Iz-7YHno3GxwyZly97_FXYkD4SFBKtgUWNAxxuPsn3SCKtaSMBPTWcXHLysOF96fXxZsM901CFKRdu2tBT4IiDzevXpg3-ysKq1ePy-hVOJkOq_jA4rLbEpVwVaVv8HN8"/>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full py-md border-t border-outline-variant bg-surface">
        <div className="max-w-[1280px] mx-auto px-margin-mobile md:px-margin-desktop flex flex-col md:flex-row justify-between items-center gap-sm">
          <span className="font-label-md text-label-md font-semibold text-on-surface">Arcfuse</span>
          <div className="flex gap-md">
            <a className="font-body-sm text-body-sm text-secondary hover:text-primary transition-colors" href="#">Privacy Policy</a>
            <a className="font-body-sm text-body-sm text-secondary hover:text-primary transition-colors" href="#">Terms of Service</a>
            <a className="font-body-sm text-body-sm text-secondary hover:text-primary transition-colors" href="#">Help Center</a>
          </div>
          <span className="font-body-sm text-body-sm text-secondary">© 2024 Arcfuse Inc. All rights reserved.</span>
        </div>
      </footer>
    </div>
  );
}
