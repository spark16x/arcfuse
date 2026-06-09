"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Home() {
  const [toast, setToast] = useState(null);
  const [votes, setVotes] = useState({
    threads: 845,
    bluesky: 512,
    mastodon: 320,
  });
  const [voted, setVoted] = useState({
    threads: false,
    bluesky: false,
    mastodon: false,
  });

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
  };

  const handleVote = (key, name) => {
    if (voted[key]) {
      setVotes(prev => ({ ...prev, [key]: prev[key] - 1 }));
      setVoted(prev => ({ ...prev, [key]: false }));
      showToast(`Removed vote for ${name}`, 'info');
    } else {
      setVotes(prev => ({ ...prev, [key]: prev[key] + 1 }));
      setVoted(prev => ({ ...prev, [key]: true }));
      showToast(`Voted for ${name}!`, 'success');
    }
  };

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        setToast(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  useEffect(() => {
    // ⚡ Bolt: Use IntersectionObserver to avoid layout thrashing from getBoundingClientRect in a scroll event
    const observer = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
            observer.unobserve(entry.target); // Optional: stop observing once revealed
          }
        });
      },
      { rootMargin: '0px 0px -150px 0px' }
    );

    const reveals = document.querySelectorAll('.reveal');
    reveals.forEach((el) => observer.observe(el));

    // ⚡ Bolt: Cache DOM query and use requestAnimationFrame for scroll events to avoid layout thrashing
    const header = document.querySelector('header');
    let ticking = false;

    const updateHeader = () => {
      if (window.scrollY > 50) {
        header.classList.add('py-2', 'shadow-sm');
        header.classList.remove('py-4');
      } else {
        header.classList.remove('py-2', 'shadow-sm');
        header.classList.add('py-4');
      }
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking && header) {
        window.requestAnimationFrame(updateHeader);
        ticking = true;
      }
    };

    // ⚡ Bolt: use passive: true to not block scrolling
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="bg-white text-on-surface overflow-x-hidden">
      {/* TopNavBar */}
      <header className="fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-outline-variant transition-all duration-300 py-4">
        <nav className="max-w-7xl mx-auto flex justify-between items-center px-gutter">
          <Link href="/" className="flex items-center gap-base hover:opacity-85 transition-opacity">
            <img alt="Arcfuse Logo" className="w-8 h-8 rounded-lg object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAiFo650op9J-PLLPrXKPoQV496QWchDdyF-_zAx-nQaiEdouhqVgJfca4qfnJ-cEKTJA-6mIZmIvEZD2mzqxIxd_8Mlah32M28CxuhhMrt-4X4LWtcyMvUE7sMx0QjXngqnR3qNLZoiJoi2eiB0Hx7uxj92NEv7ZMQCkcJRyb-IWj98dhZS4W-miHrjVlZoiHTeCl-Qy4e7kFC7FpT6V5f_Nz4MsOgvyAhspo1YxqsovNmSCypEYNN730i0Wkruigt8a4k3kUifYI" />
            <span className="font-headline-md text-headline-md font-bold text-on-surface">Arcfuse</span>
          </Link>
          <div className="hidden md:flex gap-lg items-center">
            <Link className="text-secondary hover:text-primary transition-colors font-label-md text-label-md" href="/dashboard">Dashboard</Link>
            <Link className="text-secondary hover:text-primary transition-colors font-label-md text-label-md" href="#platforms">Platforms</Link>
            <Link className="text-secondary hover:text-primary transition-colors font-label-md text-label-md" href="#community">Community</Link>
            <Link className="text-secondary hover:text-primary transition-colors font-label-md text-label-md" href="#contributors">Contributors</Link>
            <Link className="text-secondary hover:text-primary transition-colors font-label-md text-label-md flex items-center gap-xs" href="https://github.com/arcfuse/arcfuse" target="_blank" rel="noopener noreferrer">GitHub <span className="material-symbols-outlined text-[16px]">open_in_new</span></Link>
          </div>
          <div>
            <Link href="/signup" className="inline-block bg-primary-container text-on-primary-container px-6 py-2 rounded-lg font-label-md text-label-md hover:opacity-90 active:scale-95 transition-all text-center">Get Started</Link>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="hero-gradient pt-[140px] pb-xl px-gutter relative overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-xl items-center">
          <div className="reveal">
            <div className="inline-flex items-center gap-xs bg-primary-fixed text-on-primary-fixed-variant px-4 py-1 rounded-full font-label-md text-label-md mb-md">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
              🚀 Open Source • Multi-Platform
            </div>
            <h1 className="font-display-lg text-display-lg mb-md text-on-surface">The Open Source Standard for <span className="text-primary-container">Multi-Platform</span> Social Media</h1>
            <p className="font-body-lg text-body-lg text-secondary mb-lg max-w-[540px]">Schedule, manage, and analyze your social presence across X, Instagram, LinkedIn, and TikTok with a single, community-driven dashboard.</p>
            <div className="flex flex-col sm:flex-row gap-md">
              <Link href="/dashboard" className="bg-primary-container text-on-primary-container px-8 py-4 rounded-lg font-label-md text-label-md flex items-center justify-center gap-sm shadow-lg hover:shadow-xl transition-all">
                Launch Dashboard <span className="material-symbols-outlined">rocket_launch</span>
              </Link>
              <Link href="https://github.com/arcfuse/arcfuse" target="_blank" rel="noopener noreferrer" className="bg-white border border-outline-variant text-on-surface px-8 py-4 rounded-lg font-label-md text-label-md flex items-center justify-center gap-sm hover:bg-surface transition-all">
                View Codebase <span className="material-symbols-outlined">code</span>
              </Link>
            </div>
          </div>
          <div className="relative hidden lg:block reveal" style={{ transitionDelay: '200ms' }}>
            <div className="glass-card p-2 rounded-2xl float-animation relative z-10 shadow-2xl overflow-hidden">
              <img alt="Arcfuse Social Media Dashboard Interface" className="rounded-xl w-full h-auto border border-outline-variant" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBMtc1Pegq2gk9JUnGtS26ilVijFpFD1Pp31CYP6eOHUoQFRn9quuF_5Z94fH5sS5eqsvzRXXAyKjoi3IJOvHwhCgSaYCkW5tdE8SaN1MDVcCtJtWsHwtApwGXRe2AJrI2drwsXJPx7QQJNfNyDpT-JaR65lY3VkF21c87hY12HWy4uVPDZjFFqb73OMidyFK09tlFdiUaFa5K3oONQio_y6q6RrwPkk45h0q1h85KWSiNRBlHy44BhijNRsbzFUpX5OkTtZ5W0eJE" />
            </div>
            <div className="absolute -bottom-10 -left-10 glass-card p-6 rounded-2xl z-20 shadow-xl max-w-[280px]">
              <div className="flex items-center gap-sm mb-sm">
                <div className="w-10 h-10 rounded-full bg-primary-fixed flex items-center justify-center">
                  <span className="material-symbols-outlined text-primary">auto_awesome</span>
                </div>
                <span className="font-label-md text-label-md font-bold">Latest Analytics</span>
              </div>
              <div className="space-y-sm">
                <div className="h-2 w-full bg-surface-container-high rounded"></div>
                <div className="h-2 w-3/4 bg-surface-container-high rounded"></div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-secondary">+12% Growth</span>
                  <div className="flex -space-x-2">
                    <div className="w-6 h-6 rounded-full border-2 border-white bg-slate-200"></div>
                    <div className="w-6 h-6 rounded-full border-2 border-white bg-slate-300"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust / Stats Section */}
      <section id="contributors" className="py-lg bg-surface-container-lowest border-y border-outline-variant">
        <div className="max-w-7xl mx-auto px-gutter">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-lg text-center mb-xl">
            <div className="reveal">
              <p className="font-display-lg text-display-lg text-primary-container">50k+</p>
              <p className="font-label-md text-label-md text-secondary uppercase tracking-widest">Active Accounts</p>
            </div>
            <div className="reveal" style={{ transitionDelay: '100ms' }}>
              <p className="font-display-lg text-display-lg text-primary-container">1.2M</p>
              <p className="font-label-md text-label-md text-secondary uppercase tracking-widest">Posts Scheduled</p>
            </div>
            <div className="reveal" style={{ transitionDelay: '200ms' }}>
              <p className="font-display-lg text-display-lg text-primary-container">500+</p>
              <p className="font-label-md text-label-md text-secondary uppercase tracking-widest">Contributors</p>
            </div>
          </div>
          <div className="marquee-container">
            <div className="marquee-content">
              <div className="flex items-center gap-md">
                <img alt="Contributor" className="w-12 h-12 rounded-full border-2 border-primary-fixed" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD_9wHnDuUQ7A1hba-j6cULwHE6QEYh5Xp8PCQHmu0qQ368-L5mg5zgDA9VUGz-BCZ6lNtlzrw-0yhfckFImc40W7VvprQDqBOrLUDEND0Wi0QIDrgg0KeLq9w0-kGipfkIlf5qTlsUCCbmS4YqZv47I0XavNhT0kcDNBh1qXVJsaZ3Ba2fHNckwQiWmNWKMUKH4a6at1VbuqCV60RUS4HTEeU_DaQ0SIUu972xfouXjx1JttiRPtr-Kl5RAQLhM300YbIwRSEVnNY" />
                <span className="font-label-md text-label-md">Alex Rivera</span>
              </div>
              <div className="flex items-center gap-md">
                <img alt="Contributor" className="w-12 h-12 rounded-full border-2 border-primary-fixed" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBxl9Cx_QcMWPvP_XOzIrnbOkLlRhCeq__iIatqF535dx5yT0h19TVL9mzVIu4ut3MbPaKtCjQE89l4bSy9p9Km8IMHCQQuatlaUz7w9rxhlaUgGEQnZSeeI9u2ozLhswY72JY-CF5bB-RrQCJpx7Z61DmshuMYm1qF5uDR15baZhnHhmCmHzmgNwZMxqE11qGivbK2N59Lg3BHjLwKKNqDnhnNqfqKiHLyln5mRKSjt3GSYfVRqd5-haJbFdCNrHZ07e4t2LcjZd0" />
                <span className="font-label-md text-label-md">Sarah Chen</span>
              </div>
              <div className="flex items-center gap-md">
                <img alt="Contributor" className="w-12 h-12 rounded-full border-2 border-primary-fixed" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDGtODGSYzZmh_BdVfzMoYKeYALbxikRJ7o4zM24lUfx2viCDdk-jHRB_BdbfEdtyjO7xrGRnxSOEgn8ygCGeVdYdJVuFCcgmtVOL7tp1JCoHVefPYT9b7Kf0fPn-E42W9yz5U2DEo0YKmcIVUcIq0XuWeHFaat_aGi6Z70elIWpm0ftKfzy6IP2dD-aEoSOoZDq-jKNjpkoB8ctzDJNswyCxIwT2oV-sHfH28B1belq1AGRQDRF1TKYugg7Fh3CGn8l8jt64W6oiY" />
                <span className="font-label-md text-label-md">Marco V.</span>
              </div>
              <div className="flex items-center gap-md">
                <img alt="Contributor" className="w-12 h-12 rounded-full border-2 border-primary-fixed" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCgV4vIM6UusNcOO5DJcUkmOz95Z_-HCpndSV5RYAm9jFfXOB-juk0WqDLyAWW-1UUCJTDvDBuL1dCb8LphVV5xFfyln3nRRm67vfGrZWZGYccNeiMokSuD49zQBnBIvVVfywH1ILoBS6yr3PFJwK_36Z5RfDXUa1tvB6pZyqdbbJuGQ7rkKwrOYzRKcLzhwofeX0llMt-ABSklhII-Jn_itgxW2NJ0aH4d28_B-frJJhl8C6AsS5IPUFevndmmNhNEH98y4HuBELw" />
                <span className="font-label-md text-label-md">Jameson K.</span>
              </div>
            </div>
            <div aria-hidden="true" className="marquee-content">
              <div className="flex items-center gap-md">
                <img alt="Contributor" className="w-12 h-12 rounded-full border-2 border-primary-fixed" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDaV9MUrAoN9fDIMh4ySNsSpJsLfLrcoSJKZdwRK6OSbQSVOqDaLGUKA7x6aaftjZNMtYTUi25DRer8E8G_z-TZGN6A11widYsT3CUZSqP5cyIx8OKXAejhB4J_VVxY1EWeV2y2z49A5Y09Pgxrmur-ETO5YBdtsdH06kMM2SKuWAu_NOn-GO_t0oxm_t3nlHv9ip3eTSL9kf_NinmFcGbjbHaXBcOVoiPDwaUkpm5XNlH14_14vWvUm8mfWgp7NHkFpPqAUq78K3M" />
                <span className="font-label-md text-label-md">Elena Rodriguez</span>
              </div>
              <div className="flex items-center gap-md">
                <img alt="Contributor" className="w-12 h-12 rounded-full border-2 border-primary-fixed" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD_9wHnDuUQ7A1hba-j6cULwHE6QEYh5Xp8PCQHmu0qQ368-L5mg5zgDA9VUGz-BCZ6lNtlzrw-0yhfckFImc40W7VvprQDqBOrLUDEND0Wi0QIDrgg0KeLq9w0-kGipfkIlf5qTlsUCCbmS4YqZv47I0XavNhT0kcDNBh1qXVJsaZ3Ba2fHNckwQiWmNWKMUKH4a6at1VbuqCV60RUS4HTEeU_DaQ0SIUu972xfouXjx1JttiRPtr-Kl5RAQLhM300YbIwRSEVnNY" />
                <span className="font-label-md text-label-md">Alex Rivera</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Arcfuse Section */}
      <section className="py-xl max-w-7xl mx-auto px-gutter">
        <div className="text-center mb-xl reveal">
          <h2 className="font-headline-lg text-headline-lg mb-sm">Why Arcfuse?</h2>
          <p className="text-secondary font-body-md text-body-md max-w-xl mx-auto">A modern platform built on open principles to help you navigate the complex social media landscape.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-md">
          {/* Feature Card 1 */}
          <div className="p-8 rounded-2xl border border-outline-variant hover:border-primary/50 transition-all group reveal">
            <div className="w-12 h-12 bg-primary-fixed text-primary rounded-lg flex items-center justify-center mb-md group-hover:bg-primary group-hover:text-white transition-colors">
              <span className="material-symbols-outlined">chat</span>
            </div>
            <h3 className="font-headline-md text-headline-md mb-xs">Unified Inbox</h3>
            <p className="text-secondary font-body-sm text-body-sm">Manage all your social conversations and comments in one powerful interface.</p>
          </div>
          {/* Feature Card 2 */}
          <div className="p-8 rounded-2xl border border-outline-variant hover:border-primary/50 transition-all group reveal" style={{ transitionDelay: '100ms' }}>
            <div className="w-12 h-12 bg-primary-fixed text-primary rounded-lg flex items-center justify-center mb-md group-hover:bg-primary group-hover:text-white transition-colors">
              <span className="material-symbols-outlined">code</span>
            </div>
            <h3 className="font-headline-md text-headline-md mb-xs">Open Source</h3>
            <p className="text-secondary font-body-sm text-body-sm">Fully transparent, community-owned, and extensible via plugins.</p>
          </div>
          {/* Feature Card 3 */}
          <div className="p-8 rounded-2xl border border-outline-variant hover:border-primary/50 transition-all group reveal" style={{ transitionDelay: '200ms' }}>
            <div className="w-12 h-12 bg-primary-fixed text-primary rounded-lg flex items-center justify-center mb-md group-hover:bg-primary group-hover:text-white transition-colors">
              <span className="material-symbols-outlined">calendar_month</span>
            </div>
            <h3 className="font-headline-md text-headline-md mb-xs">Post Scheduler</h3>
            <p className="text-secondary font-body-sm text-body-sm">Visual calendar for planning and publishing content across all major platforms.</p>
          </div>
          {/* Feature Card 4 */}
          <div className="p-8 rounded-2xl border border-outline-variant hover:border-primary/50 transition-all group reveal" style={{ transitionDelay: '300ms' }}>
            <div className="w-12 h-12 bg-primary-fixed text-primary rounded-lg flex items-center justify-center mb-md group-hover:bg-primary group-hover:text-white transition-colors">
              <span className="material-symbols-outlined">insights</span>
            </div>
            <h3 className="font-headline-md text-headline-md mb-xs">Analytics</h3>
            <p className="text-secondary font-body-sm text-body-sm">Deep insights into engagement and growth with privacy-first tracking.</p>
          </div>
          {/* Feature Card 5 */}
          <div className="p-8 rounded-2xl border border-outline-variant hover:border-primary/50 transition-all group reveal" style={{ transitionDelay: '400ms' }}>
            <div className="w-12 h-12 bg-primary-fixed text-primary rounded-lg flex items-center justify-center mb-md group-hover:bg-primary group-hover:text-white transition-colors">
              <span className="material-symbols-outlined">hub</span>
            </div>
            <h3 className="font-headline-md text-headline-md mb-xs">Cross-Platform</h3>
            <p className="text-secondary font-body-sm text-body-sm">Native support for X, Instagram, LinkedIn, TikTok, and more.</p>
          </div>
          {/* Feature Card 6 */}
          <div className="p-8 rounded-2xl border border-outline-variant hover:border-primary/50 transition-all group reveal" style={{ transitionDelay: '500ms' }}>
            <div className="w-12 h-12 bg-primary-fixed text-primary rounded-lg flex items-center justify-center mb-md group-hover:bg-primary group-hover:text-white transition-colors">
              <span className="material-symbols-outlined">api</span>
            </div>
            <h3 className="font-headline-md text-headline-md mb-xs">Developer First</h3>
            <p className="text-secondary font-body-sm text-body-sm">Robust API and webhooks for building custom social workflows.</p>
          </div>
        </div>
      </section>

      {/* Open Source Section */}
      <section className="py-xl bg-inverse-surface text-white">
        <div className="max-w-7xl mx-auto px-gutter grid grid-cols-1 lg:grid-cols-2 gap-xl items-center">
          <div className="reveal">
            <div className="inline-flex items-center gap-xs text-primary-fixed mb-md">
              <span className="material-symbols-outlined">terminal</span>
              <span className="font-code-sm text-code-sm">git checkout -b social-integration</span>
            </div>
            <h2 className="font-headline-lg text-headline-lg mb-md">Built by the Community</h2>
            <p className="text-secondary-fixed-dim font-body-md text-body-md mb-lg">Arcfuse isn't just a SaaS; it's a living ecosystem. We believe the tools that manage our social identity should be transparent and community-owned.</p>
            <div className="space-y-md">
              <div className="flex gap-md items-start">
                <div className="w-6 h-6 rounded-full bg-primary-fixed text-primary flex items-center justify-center shrink-0 mt-1">
                  <span className="material-symbols-outlined text-[14px]">check</span>
                </div>
                <div>
                  <h4 className="font-bold">Transparent Roadmap</h4>
                  <p className="text-secondary-fixed-dim text-sm">Vote on new platform integrations and API support directly on GitHub.</p>
                </div>
              </div>
              <div className="flex gap-md items-start">
                <div className="w-6 h-6 rounded-full bg-primary-fixed text-primary flex items-center justify-center shrink-0 mt-1">
                  <span className="material-symbols-outlined text-[14px]">check</span>
                </div>
                <div>
                  <h4 className="font-bold">Plugin Marketplace</h4>
                  <p className="text-secondary-fixed-dim text-sm">Extend the dashboard with community-built automation and analytics modules.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-surface/10 rounded-2xl p-6 border border-white/10 reveal" style={{ transitionDelay: '200ms' }}>
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-headline-md text-headline-md">Integration Requests</h3>
              <span className="text-xs bg-white/20 px-2 py-1 rounded">Active Voting</span>
            </div>
            <div className="space-y-md">
              <div 
                onClick={() => handleVote('threads', 'Threads API Support')}
                className={`p-4 rounded-xl bg-white/5 border flex justify-between items-center transition-all cursor-pointer hover:bg-white/10 ${voted.threads ? 'border-primary-fixed' : 'border-white/10'}`}
              >
                <span className="font-label-md">Threads API Support</span>
                <div className="flex items-center gap-sm">
                  <span className={`material-symbols-outlined ${voted.threads ? 'text-primary-fixed' : 'text-white/60'}`} data-weight={voted.threads ? "fill" : "normal"}>thumb_up</span>
                  <span className={voted.threads ? 'text-primary-fixed font-bold' : ''}>{votes.threads}</span>
                </div>
              </div>
              <div 
                onClick={() => handleVote('bluesky', 'Bluesky Integration')}
                className={`p-4 rounded-xl bg-white/5 border flex justify-between items-center transition-all cursor-pointer hover:bg-white/10 ${voted.bluesky ? 'border-primary-fixed' : 'border-white/10'}`}
              >
                <span className="font-label-md">Bluesky Integration</span>
                <div className="flex items-center gap-sm">
                  <span className={`material-symbols-outlined ${voted.bluesky ? 'text-primary-fixed' : 'text-white/60'}`} data-weight={voted.bluesky ? "fill" : "normal"}>thumb_up</span>
                  <span className={voted.bluesky ? 'text-primary-fixed font-bold' : ''}>{votes.bluesky}</span>
                </div>
              </div>
              <div 
                onClick={() => handleVote('mastodon', 'Mastodon Bridge')}
                className={`p-4 rounded-xl bg-white/5 border flex justify-between items-center transition-all cursor-pointer hover:bg-white/10 ${voted.mastodon ? 'border-primary-fixed' : 'border-white/10'}`}
              >
                <span className="font-label-md">Mastodon Bridge</span>
                <div className="flex items-center gap-sm">
                  <span className={`material-symbols-outlined ${voted.mastodon ? 'text-primary-fixed' : 'text-white/60'}`} data-weight={voted.mastodon ? "fill" : "normal"}>thumb_up</span>
                  <span className={voted.mastodon ? 'text-primary-fixed font-bold' : ''}>{votes.mastodon}</span>
                </div>
              </div>
            </div>
            <button 
              onClick={() => showToast('Full roadmap interface coming soon!', 'info')}
              className="w-full mt-md bg-white text-on-surface py-3 rounded-lg font-bold hover:bg-primary-fixed hover:text-white transition-all active:scale-95"
            >
              View Full Roadmap
            </button>
          </div>
        </div>
      </section>

      {/* Platform Support */}
      <section id="platforms" className="py-xl bg-surface">
        <div className="max-w-7xl mx-auto px-gutter">
          <h2 className="font-headline-lg text-headline-lg mb-xl reveal">Platform Support</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-md">
            <div 
              onClick={() => showToast('Twitter / X integration is active!', 'info')}
              className="glass-card p-6 rounded-2xl flex flex-col items-center text-center hover:shadow-lg transition-all cursor-pointer group reveal active:scale-95"
            >
              <div className="w-14 h-14 rounded-full bg-surface-container flex items-center justify-center mb-md group-hover:bg-primary-fixed transition-colors">
                <span className="material-symbols-outlined text-primary">tag</span>
              </div>
              <span className="font-bold">Twitter / X</span>
            </div>
            <div 
              onClick={() => showToast('Instagram integration is active!', 'info')}
              className="glass-card p-6 rounded-2xl flex flex-col items-center text-center hover:shadow-lg transition-all cursor-pointer group reveal active:scale-95" style={{ transitionDelay: '100ms' }}
            >
              <div className="w-14 h-14 rounded-full bg-surface-container flex items-center justify-center mb-md group-hover:bg-primary-fixed transition-colors">
                <span className="material-symbols-outlined text-primary">camera_alt</span>
              </div>
              <span className="font-bold">Instagram</span>
            </div>
            <div 
              onClick={() => showToast('LinkedIn integration is active!', 'info')}
              className="glass-card p-6 rounded-2xl flex flex-col items-center text-center hover:shadow-lg transition-all cursor-pointer group reveal active:scale-95" style={{ transitionDelay: '200ms' }}
            >
              <div className="w-14 h-14 rounded-full bg-surface-container flex items-center justify-center mb-md group-hover:bg-primary-fixed transition-colors">
                <span className="material-symbols-outlined text-primary">work</span>
              </div>
              <span className="font-bold">LinkedIn</span>
            </div>
            <div 
              onClick={() => showToast('TikTok integration is active!', 'info')}
              className="glass-card p-6 rounded-2xl flex flex-col items-center text-center hover:shadow-lg transition-all cursor-pointer group reveal active:scale-95" style={{ transitionDelay: '300ms' }}
            >
              <div className="w-14 h-14 rounded-full bg-surface-container flex items-center justify-center mb-md group-hover:bg-primary-fixed transition-colors">
                <span className="material-symbols-outlined text-primary">movie</span>
              </div>
              <span className="font-bold">TikTok</span>
            </div>
            <div 
              onClick={() => showToast('YouTube integration is active!', 'info')}
              className="glass-card p-6 rounded-2xl flex flex-col items-center text-center hover:shadow-lg transition-all cursor-pointer group reveal active:scale-95" style={{ transitionDelay: '400ms' }}
            >
              <div className="w-14 h-14 rounded-full bg-surface-container flex items-center justify-center mb-md group-hover:bg-primary-fixed transition-colors">
                <span className="material-symbols-outlined text-primary">play_circle</span>
              </div>
              <span className="font-bold">YouTube</span>
            </div>
            <div 
              onClick={() => showToast('Threads integration is active!', 'info')}
              className="glass-card p-6 rounded-2xl flex flex-col items-center text-center hover:shadow-lg transition-all cursor-pointer group reveal active:scale-95" style={{ transitionDelay: '500ms' }}
            >
              <div className="w-14 h-14 rounded-full bg-surface-container flex items-center justify-center mb-md group-hover:bg-primary-fixed transition-colors">
                <span className="material-symbols-outlined text-primary">alternate_email</span>
              </div>
              <span className="font-bold">Threads</span>
            </div>
          </div>
        </div>
      </section>

      {/* Community Showcase */}
      <section id="community" className="py-xl max-w-7xl mx-auto px-gutter">
        <div className="flex flex-col md:flex-row justify-between items-end mb-xl reveal">
          <div>
            <h2 className="font-headline-lg text-headline-lg mb-sm">Community Showcase</h2>
            <p className="text-secondary font-body-md text-body-md">What's happening right now in the Arcfuse ecosystem.</p>
          </div>
          <button 
            onClick={() => showToast('Loading community activity feed...', 'info')}
            className="mt-md md:mt-0 text-primary font-bold flex items-center gap-xs hover:underline transition-all active:scale-95"
          >
            View all activity <span className="material-symbols-outlined">arrow_forward</span>
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
          <div className="border border-outline-variant rounded-2xl p-6 hover:bg-surface transition-all reveal">
            <div className="flex justify-between items-start mb-md">
              <div className="flex gap-sm items-center">
                <div className="w-10 h-10 rounded-full bg-slate-200 overflow-hidden">
                  <img alt="Profile" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBZF3PpCLnL3-HMRJpIHltbZTCcsZm0YjbvzFzGsgQeHE1_t0bcMl6dSAahI0DL5uMj3SHdsl3dW_kcuDvk6OngQfxI2oyzEpDCQCXwCHDKPrHRRDtZ2lwlI70Kf8ghrK9hYuGS0oNfpDiI83SjGz8DGm4uOLA9ggrWus2rOOUAITPIhREdSu4Pga1YczpfvhYmcWmLFfxtU0FupDLyBaKaN6fV3EN0re1R9WGpWw0PDI7k8A0No7nOn5j22gYrqUXldQH1ZAGWReA" />
                </div>
                <div>
                  <h4 className="font-bold text-sm">Maya Jensen</h4>
                  <p className="text-xs text-secondary">Added a new project</p>
                </div>
              </div>
              <span className="text-xs text-secondary">15m ago</span>
            </div>
            <h3 className="font-headline-md text-headline-md mb-xs">LinkedIn API v2 Integration</h3>
            <p className="text-secondary text-sm mb-md">A seamless connector supporting carousel posts and professional profile analytics. Now available in the core build.</p>
            <div className="flex gap-sm">
              <span className="px-2 py-1 rounded bg-surface-container text-xs text-primary">#SocialMedia</span>
              <span className="px-2 py-1 rounded bg-surface-container text-xs text-primary">#LinkedIn</span>
            </div>
          </div>
          <div className="border border-outline-variant rounded-2xl p-6 hover:bg-surface transition-all reveal" style={{ transitionDelay: '200ms' }}>
            <div className="flex justify-between items-start mb-md">
              <div className="flex gap-sm items-center">
                <div className="w-10 h-10 rounded-full bg-slate-200 overflow-hidden">
                  <img alt="Profile" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC4x8C0uxJSA_wbJelD1E6LwrLm5hCdrMx2HTMclOJYXblxiwXoVU4V06Ts1xKfv3KzJ1dpjZl3q2mhkbtFkxgWAPQxSfL8DIyiHgGMxc9wDNu66Un3b85HUjKNOsgpkDxBwcfwYS2ZxeE8bUR_SuRFOnZrMeIlJOSCy7nf-Y2QDiOD7jmYiSZIJ0mOfkeHQd43Kl9P2ryh4NXnrY62N8SYuVYhyitshiV6DNd3MnEsGHCdxB7Y6rpXHQXST9cwGnGG2KdrH94Hf3s" />
                </div>
                <div>
                  <h4 className="font-bold text-sm">Kevin Thorne</h4>
                  <p className="text-xs text-secondary">Merged Pull Request</p>
                </div>
              </div>
              <span className="text-xs text-secondary">1h ago</span>
            </div>
            <h3 className="font-headline-md text-headline-md mb-xs">Plugin: Auto-Scheduling Engine</h3>
            <p className="text-secondary text-sm mb-md">Optimized publishing queues by 40% with smart delay logic and timezone-aware routing.</p>
            <div className="flex gap-sm">
              <span className="px-2 py-1 rounded bg-surface-container text-xs text-primary">#Scheduling</span>
              <span className="px-2 py-1 rounded bg-surface-container text-xs text-primary">#Plugins</span>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-xl max-w-7xl mx-auto px-gutter reveal">
        <div className="bg-primary-container rounded-3xl p-xl text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -ml-32 -mb-32"></div>
          <div className="relative z-10">
            <h2 className="font-display-lg text-display-lg text-white mb-md">Build the Future of Social Media Management</h2>
            <p className="text-primary-fixed font-body-lg text-body-lg mb-xl max-w-2xl mx-auto">Join thousands of developers building a transparent, open-source alternative for social media automation.</p>
            <div className="flex flex-col sm:flex-row gap-md justify-center">
              <button 
                onClick={() => showToast('Opening Discord invitation...', 'info')}
                className="bg-white text-primary px-8 py-4 rounded-lg font-bold hover:bg-primary-fixed hover:text-white transition-all active:scale-95"
              >
                Join Community
              </button>
              <Link 
                href="https://github.com/arcfuse/arcfuse" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-primary text-white border border-white/20 px-8 py-4 rounded-lg font-bold hover:bg-primary/80 transition-all active:scale-95 inline-flex items-center justify-center text-center"
              >
                Start Contributing
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-surface-container-lowest border-t border-outline-variant py-xl px-gutter mt-xl">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-5 gap-md">
          <div className="col-span-2">
            <div className="flex items-center gap-base mb-md">
              <img alt="Arcfuse Logo" className="w-8 h-8 rounded-lg object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAiFo650op9J-PLLPrXKPoQV496QWchDdyF-_zAx-nQaiEdouhqVgJfca4qfnJ-cEKTJA-6mIZmIvEZD2mzqxIxd_8Mlah32M28CxuhhMrt-4X4LWtcyMvUE7sMx0QjXngqnR3qNLZoiJoi2eiB0Hx7uxj92NEv7ZMQCkcJRyb-IWj98dhZS4W-miHrjVlZoiHTeCl-Qy4e7kFC7FpT6V5f_Nz4MsOgvyAhspo1YxqsovNmSCypEYNN730i0Wkruigt8a4k3kUifYI" />
              <span className="font-headline-md text-headline-md font-bold text-on-surface">Arcfuse</span>
            </div>
            <p className="text-secondary font-body-sm text-body-sm max-w-sm mb-md">The open-source standard for social media management and automation. Forever community-owned.</p>
            <p className="text-secondary font-body-sm text-body-sm">© 2024 Arcfuse Open Source Project. Built by the community.</p>
          </div>
          <div>
            <h4 className="font-label-md text-label-md font-bold mb-md">Product</h4>
            <ul className="space-y-sm text-secondary font-body-sm text-body-sm">
              <li><Link className="hover:text-primary hover:underline transition-all" href="/dashboard">Dashboard</Link></li>
              <li><Link className="hover:text-primary hover:underline transition-all" href="#platforms">Platforms</Link></li>
              <li><Link className="hover:text-primary hover:underline transition-all" href="#platforms">Integrations</Link></li>
              <li><Link className="hover:text-primary hover:underline transition-all" href="/dashboard">Analytics</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-label-md text-label-md font-bold mb-md">Community</h4>
            <ul className="space-y-sm text-secondary font-body-sm text-body-sm text-left">
              <li><Link className="hover:text-primary hover:underline transition-all block w-full text-left" href="#contributors">Contributors</Link></li>
              <li><Link className="hover:text-primary hover:underline transition-all block w-full text-left" href="https://github.com/arcfuse/arcfuse" target="_blank" rel="noopener noreferrer">GitHub Repo</Link></li>
              <li><button onClick={() => showToast('Opening Discord invitation...', 'info')} className="hover:text-primary hover:underline transition-all block w-full text-left">Discord</button></li>
              <li><button onClick={() => showToast('Plugin ecosystem details coming soon!', 'info')} className="hover:text-primary hover:underline transition-all block w-full text-left">Plugins</button></li>
            </ul>
          </div>
          <div>
            <h4 className="font-label-md text-label-md font-bold mb-md">Legal</h4>
            <ul className="space-y-sm text-secondary font-body-sm text-body-sm">
              <li><Link className="hover:text-primary hover:underline transition-all" href="/privacy-policy">Privacy Policy</Link></li>
              <li><Link className="hover:text-primary hover:underline transition-all" href="/terms-of-service">Terms of Service</Link></li>
              <li><Link className="hover:text-primary hover:underline transition-all" href="/privacy-policy">Cookie Policy</Link></li>
            </ul>
          </div>
        </div>
      </footer>

      {/* Toast Notification */}
      {toast && (
        <div className={`fixed bottom-6 right-6 z-50 flex items-center gap-sm px-6 py-4 rounded-xl shadow-2xl border transition-all duration-300 transform translate-y-0 opacity-100 ${
          toast.type === 'success' 
            ? 'bg-emerald-50 border-emerald-200 text-emerald-800' 
            : 'bg-blue-50 border-blue-200 text-blue-800'
        }`}>
          <span className="material-symbols-outlined">
            {toast.type === 'success' ? 'check_circle' : 'info'}
          </span>
          <span className="font-label-md text-label-md font-semibold">{toast.message}</span>
        </div>
      )}
    </div>
  );
}
