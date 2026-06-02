'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function Success() {
  useEffect(() => {
    // Micro-interaction: Confetti Effect on Load
    const createConfetti = () => {
      const colors = ['#1e00a9', '#4f46e5', '#c3c0ff', '#ffffff'];
      for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'fixed z-[100] pointer-events-none';
        const size = Math.random() * 8 + 4;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        particle.style.left = `${Math.random() * 100}vw`;
        particle.style.top = '-20px';
        particle.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
        particle.style.transform = `rotate(${Math.random() * 360}deg)`;

        document.body.appendChild(particle);

        const duration = Math.random() * 3 + 2;
        const horizontalMovement = (Math.random() - 0.5) * 200;

        particle.animate([
            { transform: `translateY(0) rotate(0deg)`, opacity: 1 },
            { transform: `translateY(110vh) translateX(${horizontalMovement}px) rotate(${Math.random() * 720}deg)`, opacity: 0 }
        ], {
            duration: duration * 1000,
            easing: 'cubic-bezier(0,.4,.4,1)'
        }).onfinish = () => particle.remove();
      }
    };

    const timeoutId = setTimeout(createConfetti, 500);

    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <div className="text-on-surface bg-[#fcf8ff] font-['Geist',_sans-serif] overflow-x-hidden">
      {/* TopNavBar */}
      <header className="fixed top-0 w-full z-50 bg-surface/80 dark:bg-surface-container-highest/80 backdrop-blur-md border-b border-outline-variant/50 shadow-sm h-16">
        <div className="flex justify-between items-center h-full px-margin-mobile md:px-margin-desktop max-w-[1280px] mx-auto">
          <div className="font-headline-md text-headline-md font-bold text-primary dark:text-on-primary-fixed">Arcfuse</div>
          <div className="hidden md:flex gap-md items-center">
            <span className="font-body-sm text-body-sm text-on-surface-variant font-medium hover:text-primary transition-colors duration-200 cursor-pointer">Platform</span>
            <span className="font-body-sm text-body-sm text-on-surface-variant font-medium hover:text-primary transition-colors duration-200 cursor-pointer">Resources</span>
            <span className="font-body-sm text-body-sm text-on-surface-variant font-medium hover:text-primary transition-colors duration-200 cursor-pointer">Solutions</span>
          </div>
          <div className="flex gap-sm items-center">
            <button className="font-body-sm text-body-sm text-secondary px-4 py-2 hover:text-primary transition-colors cursor-pointer">Login</button>
            <button className="font-body-sm text-body-sm bg-primary text-on-primary px-4 py-2 rounded-lg font-bold cursor-pointer active:opacity-70 transition-all">Sign Up</button>
          </div>
        </div>
      </header>

      <main className="pt-24 pb-xl px-margin-mobile md:px-margin-desktop max-w-[1280px] mx-auto min-h-screen">
        {/* Hero Section */}
        <section className="flex flex-col items-center text-center mb-xl">
          <div className="relative w-full max-w-lg mb-md">
            <div className="absolute inset-0 bg-primary/5 rounded-full blur-3xl -z-10 animate-pulse"></div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img alt="Success" className="w-full h-64 object-contain mx-auto" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBd7WgVB730Ugtp1Dr44xqStTflsTU_CLpYJj7VnHmbjlnPAVN88fHiKFYyUdC2OTg-p5A1DE1oxQE8Fz6XNCzwKlr7nsXCsoFQHq2uisd6_YEJkUO8RMkeyVLPxztrflXdVVarpEySI_SQazpTqS5asxFyo0Q0uSmFgoY_IjAviQxJAh8lVFTNYo2nzZ8EFK8XRA9xodGCuymz97wI6qz6B2Z1rdF-4_4kaiDAIJfbPZnUq1uWWSITqN7k749kNaUtuOkpEmmEEhQ"/>
          </div>
          <h1 className="font-display-lg text-display-lg text-primary mb-xs">Your Workspace is Ready</h1>
          <p className="font-body-lg text-body-lg text-secondary mb-lg max-w-2xl">Start collaborating with your community and unleash the power of integrated development environments.</p>
          <div className="flex flex-col sm:flex-row gap-md justify-center w-full max-w-md">
            <Link href="/dashboard" className="flex-1 bg-primary text-on-primary font-label-md text-label-md py-4 rounded-xl shadow-lg hover:-translate-y-0.5 transition-all cursor-pointer flex items-center justify-center">
              Go to Dashboard
            </Link>
            <button className="flex-1 bg-secondary-container text-primary font-label-md text-label-md py-4 rounded-xl border border-outline-variant hover:bg-surface-variant transition-all cursor-pointer">
              Invite Team
            </button>
          </div>
        </section>

        {/* Live Workspace Preview */}
        <section className="relative">
          <div className="flex items-center gap-sm mb-md">
            <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>preview</span>
            <h2 className="font-headline-md text-headline-md">Live Workspace Preview</h2>
          </div>

          {/* Bento Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
            {/* Activity Feed Card */}
            <div className="md:col-span-4 bg-white/70 backdrop-blur-md border border-outline-variant/50 p-md rounded-xl flex flex-col gap-md shadow-sm hover:border-primary/50 transition-colors">
              <div className="flex justify-between items-center">
                <span className="font-label-md text-label-md text-primary font-bold">Activity Feed</span>
                <span className="material-symbols-outlined text-on-surface-variant">history</span>
              </div>
              <div className="space-y-sm">
                <div className="flex gap-sm p-sm bg-surface rounded-lg border border-outline-variant/30">
                  <div className="w-8 h-8 rounded-full bg-primary-container/20 flex items-center justify-center text-primary">
                    <span className="material-symbols-outlined text-[16px]">person</span>
                  </div>
                  <div>
                    <p className="font-body-sm text-body-sm font-semibold">Sarah updated the Main Branch</p>
                    <p className="font-body-sm text-body-sm text-on-surface-variant text-[12px]">2 minutes ago</p>
                  </div>
                </div>
                <div className="flex gap-sm p-sm bg-surface rounded-lg border border-outline-variant/30">
                  <div className="w-8 h-8 rounded-full bg-tertiary-fixed/40 flex items-center justify-center text-tertiary">
                    <span className="material-symbols-outlined text-[16px]">terminal</span>
                  </div>
                  <div>
                    <p className="font-body-sm text-body-sm font-semibold">Build #422 completed</p>
                    <p className="font-body-sm text-body-sm text-on-surface-variant text-[12px]">15 minutes ago</p>
                  </div>
                </div>
                <div className="flex gap-sm p-sm bg-surface rounded-lg border border-outline-variant/30">
                  <div className="w-8 h-8 rounded-full bg-error-container/40 flex items-center justify-center text-error">
                    <span className="material-symbols-outlined text-[16px]">bug_report</span>
                  </div>
                  <div>
                    <p className="font-body-sm text-body-sm font-semibold">New issue: Login latency</p>
                    <p className="font-body-sm text-body-sm text-on-surface-variant text-[12px]">1 hour ago</p>
                  </div>
                </div>
              </div>
            </div>

            {/* AI Summary Card */}
            <div className="md:col-span-8 bg-white/70 backdrop-blur-md border border-outline-variant/50 rounded-xl overflow-hidden flex flex-col shadow-sm hover:border-primary/50 transition-colors">
              <div className="bg-primary p-md flex justify-between items-center">
                <div className="flex items-center gap-sm">
                  <span className="material-symbols-outlined text-on-primary">auto_awesome</span>
                  <span className="font-label-md text-label-md text-on-primary">Arcfuse AI Summary</span>
                </div>
                <span className="px-2 py-1 bg-on-primary/20 text-on-primary text-[10px] rounded uppercase font-bold tracking-widest">Real-time</span>
              </div>
              <div className="p-md flex-1">
                <div className="font-code-sm text-code-sm text-secondary bg-surface-container p-md rounded-lg border border-outline-variant mb-md">
                  &gt; Analyzing recent commits... <br/>
                  &gt; 4 new components detected. <br/>
                  &gt; Suggesting peer review for &apos;Auth.v2&apos;.
                </div>
                <p className="font-body-md text-body-md text-on-surface leading-relaxed">
                  Welcome to Arcfuse. Your team has been active in <span className="text-primary font-bold">Project Phoenix</span>. Sarah has finalized the API documentation, and the current build is stable at v0.8.4. You have 3 pending invites to the <span className="text-primary font-bold">General</span> channel.
                </p>
              </div>
              <div className="px-md pb-md flex gap-sm">
                <span className="px-3 py-1 bg-primary/10 text-primary text-[12px] font-semibold rounded-full border border-primary/20">#development</span>
                <span className="px-3 py-1 bg-primary/10 text-primary text-[12px] font-semibold rounded-full border border-primary/20">#onboarding</span>
              </div>
            </div>

            {/* Projects Snippets */}
            <div className="md:col-span-12 grid grid-cols-1 sm:grid-cols-3 gap-gutter mt-sm">
              <div className="bg-white/70 backdrop-blur-md border border-outline-variant/50 shadow-sm p-md rounded-xl hover:border-primary/50 transition-colors cursor-pointer group">
                <div className="w-10 h-10 bg-surface-container rounded-lg flex items-center justify-center mb-sm group-hover:bg-primary/10 transition-colors">
                  <span className="material-symbols-outlined text-primary">source</span>
                </div>
                <h4 className="font-label-md text-label-md font-bold mb-xs">Core Library</h4>
                <p className="font-body-sm text-body-sm text-on-surface-variant mb-md">Shared utility functions and hooks.</p>
                <div className="h-2 w-full bg-surface-variant rounded-full overflow-hidden">
                  <div className="h-full bg-primary w-[75%]"></div>
                </div>
              </div>
              <div className="bg-white/70 backdrop-blur-md border border-outline-variant/50 shadow-sm p-md rounded-xl hover:border-primary/50 transition-colors cursor-pointer group">
                <div className="w-10 h-10 bg-surface-container rounded-lg flex items-center justify-center mb-sm group-hover:bg-primary/10 transition-colors">
                  <span className="material-symbols-outlined text-primary">dashboard</span>
                </div>
                <h4 className="font-label-md text-label-md font-bold mb-xs">Client Portal</h4>
                <p className="font-body-sm text-body-sm text-on-surface-variant mb-md">User-facing interface and billing.</p>
                <div className="h-2 w-full bg-surface-variant rounded-full overflow-hidden">
                  <div className="h-full bg-primary w-[40%]"></div>
                </div>
              </div>
              <div className="bg-white/70 backdrop-blur-md border border-outline-variant/50 shadow-sm p-md rounded-xl hover:border-primary/50 transition-colors cursor-pointer group">
                <div className="w-10 h-10 bg-surface-container rounded-lg flex items-center justify-center mb-sm group-hover:bg-primary/10 transition-colors">
                  <span className="material-symbols-outlined text-primary">database</span>
                </div>
                <h4 className="font-label-md text-label-md font-bold mb-xs">Analytics Engine</h4>
                <p className="font-body-sm text-body-sm text-on-surface-variant mb-md">Data processing and visualizations.</p>
                <div className="h-2 w-full bg-surface-variant rounded-full overflow-hidden">
                  <div className="h-full bg-primary w-[90%]"></div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full py-md bg-surface dark:bg-on-background border-t border-outline-variant mt-xl">
        <div className="flex flex-col md:flex-row justify-between items-center px-margin-mobile md:px-margin-desktop max-w-[1280px] mx-auto gap-sm">
          <div className="font-label-md text-label-md font-semibold text-on-surface">Arcfuse</div>
          <div className="flex flex-wrap justify-center gap-md">
            <span className="font-body-sm text-body-sm text-secondary hover:text-primary transition-colors duration-150 cursor-pointer">Privacy Policy</span>
            <span className="font-body-sm text-body-sm text-secondary hover:text-primary transition-colors duration-150 cursor-pointer">Terms of Service</span>
            <span className="font-body-sm text-body-sm text-secondary hover:text-primary transition-colors duration-150 cursor-pointer">Help Center</span>
            <span className="font-body-sm text-body-sm text-secondary hover:text-primary transition-colors duration-150 cursor-pointer">Status</span>
          </div>
          <div className="font-body-sm text-body-sm text-secondary dark:text-secondary-fixed-dim">© 2024 Arcfuse Inc. All rights reserved.</div>
        </div>
      </footer>
    </div>
  );
}
