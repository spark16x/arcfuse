import Link from "next/link";
import Image from "next/image";

export default function LandingPage() {
  return (
    <>
      {/* TopNavBar */}
      <nav className="fixed top-0 w-full z-50 bg-[#041329]/80 backdrop-blur-xl shadow-2xl shadow-black/50">
        <div className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto w-full">
          <div className="text-2xl font-bold tracking-tighter bg-gradient-to-br from-blue-200 to-blue-500 bg-clip-text text-transparent">
            Arcfuse
          </div>
          <div className="hidden md:flex items-center gap-8 font-['Inter'] text-sm font-medium tracking-tight">
            <Link href="#" className="text-blue-400 font-semibold transition-all duration-300">Features</Link>
            <Link href="#" className="text-slate-400 hover:text-slate-100 hover:bg-white/5 rounded-lg transition-all duration-300 px-3 py-2">Solutions</Link>
            <Link href="#" className="text-slate-400 hover:text-slate-100 hover:bg-white/5 rounded-lg transition-all duration-300 px-3 py-2">Resources</Link>
            <Link href="#" className="text-slate-400 hover:text-slate-100 hover:bg-white/5 rounded-lg transition-all duration-300 px-3 py-2">Pricing</Link>
          </div>
          <div className="flex items-center gap-4">
            <button className="hidden sm:block text-slate-400 hover:text-slate-100 font-medium text-sm px-4 py-2 transition-all">
              Sign In
            </button>
            <button className="bg-gradient-to-br from-primary to-primary-container text-on-primary px-5 py-2.5 rounded-lg text-sm font-bold active:scale-95 duration-200 transition-all shadow-lg shadow-primary/20">
              Get Started
            </button>
          </div>
        </div>
        <div className="bg-gradient-to-b from-[#112036] to-transparent h-[1px] opacity-20"></div>
      </nav>

      <main>
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl -z-10 pointer-events-none">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 blur-[120px] rounded-full"></div>
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-secondary-container/10 blur-[120px] rounded-full"></div>
          </div>
          <div className="max-w-7xl mx-auto px-6 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary-container/10 text-secondary text-xs font-bold tracking-widest uppercase mb-8 border border-secondary-container/20">
              <span className="flex h-2 w-2 rounded-full bg-secondary-container animate-pulse"></span>
              Now in Private Beta
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter mb-6 leading-[1.1]">
              Unify all your social platforms <br className="hidden md:block" />
              <span className="bg-gradient-to-r from-primary via-secondary-container to-primary bg-clip-text text-transparent">
                in one powerful space.
              </span>
            </h1>
            <p className="text-on-surface-variant text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
              Stop tab-switching. Manage Discord, X, Slack, and more through a high-performance command center designed for modern workflows.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
              <button className="w-full sm:w-auto bg-gradient-to-br from-primary to-primary-container text-on-primary px-8 py-4 rounded-xl text-base font-bold shadow-xl shadow-primary/25 active:scale-95 transition-all">
                Get Started Free
              </button>
              <button className="w-full sm:w-auto px-8 py-4 rounded-xl text-base font-bold border border-outline-variant/30 text-primary hover:bg-surface-container transition-all flex items-center justify-center gap-2">
                <span className="material-symbols-outlined">play_circle</span>
                View Demo
              </button>
            </div>

            {/* Sleek Abstract Tech Dashboard Preview */}
            <div className="relative max-w-5xl mx-auto group">
              <div className="absolute -inset-1 bg-gradient-to-b from-primary/20 to-transparent rounded-2xl blur-lg opacity-50"></div>
              <div className="relative bg-surface-container rounded-2xl overflow-hidden shadow-2xl border border-outline-variant/10">
                {/* Note: In a real Next.js app with next/image, remote domains need to be configured. Using img for now to match the HTML directly. */}
                <img
                  alt="Dashboard Preview"
                  className="w-full h-auto opacity-90 group-hover:scale-[1.02] transition-transform duration-700"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAYVlu0BzNwXRP7oni5mpW96ZmEA2I7rxDUiEmwf4_hVuc8OX-1Xcl6iMgW8mxGjb-4eT0j62J2Y6sbIB1LM7mzs9iGVdbuaKAa1yu-vtSK22UBtZYvp17599kFOXGFU9q_t5BtvuT9R6hAt8u6ZgBvrh5verFkIyqHQdu6YjvhPvMWIH2swBZBSpSkid43jFA0Z0zZbADz-Ww1pSquH6SxFPyzqcIn8ZDzwJ_EC5PMJ3dHHrdLUlIzQpwQ9HFHJEOo-0-Q3lqMuiM"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Bento Grid */}
        <section className="py-24 bg-surface-container-low relative">
          <div className="max-w-7xl mx-auto px-6">
            <div className="mb-16 text-center">
              <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-on-surface mb-4">
                Command your ecosystem
              </h2>
              <p className="text-on-surface-variant max-w-xl mx-auto">
                Everything you need to stay on top of your digital presence across every platform.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              {/* Multi-platform integration */}
              <div className="md:col-span-8 bg-surface-container p-8 rounded-xl border border-outline-variant/10 hover:bg-surface-container-high transition-all group">
                <div className="flex flex-col md:flex-row gap-8 items-center">
                  <div className="flex-1">
                    <div className="w-12 h-12 bg-primary/10 text-primary rounded-lg flex items-center justify-center mb-6">
                      <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>hub</span>
                    </div>
                    <h3 className="text-2xl font-bold mb-3 text-on-surface">Multi-platform Integration</h3>
                    <p className="text-on-surface-variant">
                      Seamlessly connect Discord, X, LinkedIn, and Slack. Our native connectors ensure high-fidelity data syncing without latency.
                    </p>
                  </div>
                  <div className="w-full md:w-1/2 flex justify-center items-center gap-4 py-8">
                    <div className="w-16 h-16 rounded-2xl bg-surface-container-highest flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                      <span className="material-symbols-outlined text-3xl">alternate_email</span>
                    </div>
                    <div className="w-16 h-16 rounded-2xl bg-surface-container-highest flex items-center justify-center text-secondary group-hover:scale-110 transition-transform delay-75">
                      <span className="material-symbols-outlined text-3xl">forum</span>
                    </div>
                    <div className="w-16 h-16 rounded-2xl bg-surface-container-highest flex items-center justify-center text-tertiary group-hover:scale-110 transition-transform delay-150">
                      <span className="material-symbols-outlined text-3xl">groups</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Unified Dashboard */}
              <div className="md:col-span-4 bg-surface-container p-8 rounded-xl border border-outline-variant/10 hover:bg-surface-container-high transition-all">
                <div className="w-12 h-12 bg-secondary/10 text-secondary rounded-lg flex items-center justify-center mb-6">
                  <span className="material-symbols-outlined text-3xl">dashboard_customize</span>
                </div>
                <h3 className="text-2xl font-bold mb-3 text-on-surface">Unified Dashboard</h3>
                <p className="text-on-surface-variant">
                  A single feed of truth. Filter, sort, and search across all channels simultaneously.
                </p>
              </div>

              {/* Real-time Updates */}
              <div className="md:col-span-5 bg-surface-container p-8 rounded-xl border border-outline-variant/10 hover:bg-surface-container-high transition-all">
                <div className="w-12 h-12 bg-tertiary/10 text-tertiary rounded-lg flex items-center justify-center mb-6">
                  <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>bolt</span>
                </div>
                <h3 className="text-2xl font-bold mb-3 text-on-surface">Real-time Updates</h3>
                <p className="text-on-surface-variant">
                  Low-latency notifications ensure you never miss a critical mention or message. Instant sync across all devices.
                </p>
              </div>

              {/* Clean UI */}
              <div className="md:col-span-7 bg-surface-container p-8 rounded-xl border border-outline-variant/10 hover:bg-surface-container-high transition-all overflow-hidden relative">
                <div className="flex gap-8">
                  <div className="flex-1">
                    <div className="w-12 h-12 bg-primary/10 text-primary rounded-lg flex items-center justify-center mb-6">
                      <span className="material-symbols-outlined text-3xl">auto_awesome</span>
                    </div>
                    <h3 className="text-2xl font-bold mb-3 text-on-surface">Clean UI</h3>
                    <p className="text-on-surface-variant">
                      Focus on content with our distraction-free, editorial-grade interface designed for long-term productivity.
                    </p>
                  </div>
                  <div className="absolute -right-4 -bottom-4 w-48 h-48 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-full blur-3xl"></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-24 max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-sm font-bold tracking-[0.2em] text-secondary uppercase mb-4">The Workflow</h2>
            <h3 className="text-3xl md:text-5xl font-black text-on-surface">Designed for simplicity</h3>
          </div>
          <div className="relative flex flex-col md:flex-row justify-between gap-12 md:gap-4">
            {/* Connector Line */}
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-outline-variant/20 to-transparent -z-10"></div>

            {/* Step 1 */}
            <div className="flex-1 text-center group">
              <div className="w-16 h-16 rounded-full bg-surface-container border border-outline-variant/20 flex items-center justify-center mx-auto mb-8 relative z-10 group-hover:border-primary/50 transition-all">
                <span className="text-primary font-bold">01</span>
              </div>
              <h4 className="text-xl font-bold mb-4">Connect Accounts</h4>
              <p className="text-on-surface-variant text-sm px-4">Integrate your social ecosystem in minutes with our secure OAuth flow.</p>
            </div>

            {/* Step 2 */}
            <div className="flex-1 text-center group">
              <div className="w-16 h-16 rounded-full bg-surface-container border border-outline-variant/20 flex items-center justify-center mx-auto mb-8 relative z-10 group-hover:border-secondary-container/50 transition-all">
                <span className="text-secondary-container font-bold">02</span>
              </div>
              <h4 className="text-xl font-bold mb-4">View Everything</h4>
              <p className="text-on-surface-variant text-sm px-4">Experience all your feeds curated in a single, high-fidelity visual stream.</p>
            </div>

            {/* Step 3 */}
            <div className="flex-1 text-center group">
              <div className="w-16 h-16 rounded-full bg-surface-container border border-outline-variant/20 flex items-center justify-center mx-auto mb-8 relative z-10 group-hover:border-tertiary/50 transition-all">
                <span className="text-tertiary font-bold">03</span>
              </div>
              <h4 className="text-xl font-bold mb-4">Manage Effortlessly</h4>
              <p className="text-on-surface-variant text-sm px-4">Reply, react, and organize content without ever leaving the Arcfuse space.</p>
            </div>
          </div>
        </section>

        {/* Preview Section */}
        <section className="py-24 bg-surface-dim overflow-hidden">
          <div className="max-w-7xl mx-auto px-6">
            <div className="bg-surface-container-high rounded-[2rem] p-8 md:p-16 border border-outline-variant/10 shadow-2xl relative">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-6 py-2 bg-primary rounded-full text-on-primary font-bold text-sm tracking-wide">
                Live Dashboard Preview
              </div>
              <div className="grid lg:grid-cols-12 gap-12 items-center">
                <div className="lg:col-span-5">
                  <h2 className="text-4xl md:text-5xl font-black text-on-surface leading-tight mb-8">
                    One feed. <br />Infinite focus.
                  </h2>
                  <ul className="space-y-6">
                    <li className="flex items-start gap-4">
                      <span className="material-symbols-outlined text-secondary-container">check_circle</span>
                      <div>
                        <h5 className="font-bold text-lg mb-1">Global Search</h5>
                        <p className="text-on-surface-variant text-sm">Find messages across Discord and Slack instantly.</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-4">
                      <span className="material-symbols-outlined text-secondary-container">check_circle</span>
                      <div>
                        <h5 className="font-bold text-lg mb-1">Smart Sorting</h5>
                        <p className="text-on-surface-variant text-sm">AI-driven prioritization surfaces what matters most.</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-4">
                      <span className="material-symbols-outlined text-secondary-container">check_circle</span>
                      <div>
                        <h5 className="font-bold text-lg mb-1">Theme Customization</h5>
                        <p className="text-on-surface-variant text-sm">Tailor your workspace to your visual preference.</p>
                      </div>
                    </li>
                  </ul>
                </div>
                <div className="lg:col-span-7">
                  <div className="glass-panel p-4 rounded-2xl border border-white/5 relative overflow-hidden group">
                    <div className="flex items-center gap-2 mb-6 px-2">
                      <div className="w-3 h-3 rounded-full bg-red-400/50"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-400/50"></div>
                      <div className="w-3 h-3 rounded-full bg-green-400/50"></div>
                    </div>
                    <div className="space-y-4">
                      <div className="bg-surface-container-highest/50 p-4 rounded-xl flex gap-4 border border-white/5">
                        <div className="w-10 h-10 rounded-full bg-primary/20 shrink-0"></div>
                        <div className="flex-1 space-y-2">
                          <div className="h-3 w-24 bg-primary/20 rounded-full"></div>
                          <div className="h-2 w-full bg-on-surface-variant/10 rounded-full"></div>
                          <div className="h-2 w-3/4 bg-on-surface-variant/10 rounded-full"></div>
                        </div>
                      </div>
                      <div className="bg-surface-container-highest/50 p-4 rounded-xl flex gap-4 border border-white/5 scale-[1.05] shadow-xl">
                        <div className="w-10 h-10 rounded-full bg-secondary-container/20 shrink-0"></div>
                        <div className="flex-1 space-y-2">
                          <div className="h-3 w-32 bg-secondary-container/20 rounded-full"></div>
                          <div className="h-2 w-full bg-on-surface-variant/10 rounded-full"></div>
                        </div>
                      </div>
                      <div className="bg-surface-container-highest/50 p-4 rounded-xl flex gap-4 border border-white/5">
                        <div className="w-10 h-10 rounded-full bg-tertiary/20 shrink-0"></div>
                        <div className="flex-1 space-y-2">
                          <div className="h-3 w-28 bg-tertiary/20 rounded-full"></div>
                          <div className="h-2 w-full bg-on-surface-variant/10 rounded-full"></div>
                        </div>
                      </div>
                    </div>
                    <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-primary/10 blur-[80px] -z-10 group-hover:bg-primary/20 transition-all"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section className="py-24 bg-surface-container-low relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-sm font-bold tracking-[0.2em] text-secondary uppercase mb-4">Pricing Plans</h2>
              <h3 className="text-3xl md:text-5xl font-black text-on-surface mb-6">Simple, transparent pricing</h3>
              <p className="text-on-surface-variant max-w-2xl mx-auto">
                Choose the plan that fits your workflow. Scale up as you grow your digital presence.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8 items-stretch">
              {/* Starter Plan */}
              <div className="bg-surface-container p-8 rounded-3xl border border-outline-variant/10 flex flex-col hover:bg-surface-container-high transition-all">
                <div className="mb-8">
                  <h4 className="text-xl font-bold text-on-surface mb-2">Starter</h4>
                  <p className="text-on-surface-variant text-sm">For individuals getting started.</p>
                </div>
                <div className="mb-8 flex items-baseline gap-1">
                  <span className="text-4xl font-black text-on-surface">$0</span>
                  <span className="text-on-surface-variant text-sm font-medium">/ forever</span>
                </div>
                <ul className="space-y-4 mb-10 flex-1">
                  <li className="flex items-center gap-3 text-sm text-on-surface-variant">
                    <span className="material-symbols-outlined text-primary text-xl">check_circle</span>
                    2 platforms included
                  </li>
                  <li className="flex items-center gap-3 text-sm text-on-surface-variant">
                    <span className="material-symbols-outlined text-primary text-xl">check_circle</span>
                    Basic analytics
                  </li>
                  <li className="flex items-center gap-3 text-sm text-on-surface-variant">
                    <span className="material-symbols-outlined text-primary text-xl">check_circle</span>
                    Community support
                  </li>
                </ul>
                <button className="w-full py-4 rounded-xl border border-outline-variant/30 text-on-surface font-bold hover:bg-white/5 transition-all">
                  Get Started
                </button>
              </div>

              {/* Pro Plan */}
              <div className="bg-surface-container p-8 rounded-3xl border-2 border-primary/50 flex flex-col relative shadow-2xl shadow-primary/10 hover:bg-surface-container-high transition-all scale-105 z-10">
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary px-4 py-1 rounded-full text-on-primary text-xs font-bold uppercase tracking-wider">
                  Most Popular
                </div>
                <div className="mb-8">
                  <h4 className="text-xl font-bold text-on-surface mb-2">Pro</h4>
                  <p className="text-on-surface-variant text-sm">For creators and power users.</p>
                </div>
                <div className="mb-8 flex items-baseline gap-1">
                  <span className="text-4xl font-black text-on-surface">$19</span>
                  <span className="text-on-surface-variant text-sm font-medium">/ month</span>
                </div>
                <ul className="space-y-4 mb-10 flex-1">
                  <li className="flex items-center gap-3 text-sm text-on-surface">
                    <span className="material-symbols-outlined text-primary text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                    5 platforms included
                  </li>
                  <li className="flex items-center gap-3 text-sm text-on-surface">
                    <span className="material-symbols-outlined text-primary text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                    Advanced analytics
                  </li>
                  <li className="flex items-center gap-3 text-sm text-on-surface">
                    <span className="material-symbols-outlined text-primary text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                    Priority support
                  </li>
                  <li className="flex items-center gap-3 text-sm text-on-surface">
                    <span className="material-symbols-outlined text-primary text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                    Custom themes
                  </li>
                </ul>
                <button className="w-full py-4 rounded-xl bg-gradient-to-br from-primary to-primary-container text-on-primary font-bold shadow-xl shadow-primary/20 active:scale-95 transition-all">
                  Get Started
                </button>
              </div>

              {/* Enterprise Plan */}
              <div className="bg-surface-container p-8 rounded-3xl border border-outline-variant/10 flex flex-col hover:bg-surface-container-high transition-all">
                <div className="mb-8">
                  <h4 className="text-xl font-bold text-on-surface mb-2">Enterprise</h4>
                  <p className="text-on-surface-variant text-sm">For professional teams.</p>
                </div>
                <div className="mb-8 flex items-baseline gap-1">
                  <span className="text-4xl font-black text-on-surface">Custom</span>
                </div>
                <ul className="space-y-4 mb-10 flex-1">
                  <li className="flex items-center gap-3 text-sm text-on-surface-variant">
                    <span className="material-symbols-outlined text-primary text-xl">check_circle</span>
                    Unlimited platforms
                  </li>
                  <li className="flex items-center gap-3 text-sm text-on-surface-variant">
                    <span className="material-symbols-outlined text-primary text-xl">check_circle</span>
                    Dedicated account manager
                  </li>
                  <li className="flex items-center gap-3 text-sm text-on-surface-variant">
                    <span className="material-symbols-outlined text-primary text-xl">check_circle</span>
                    API access
                  </li>
                  <li className="flex items-center gap-3 text-sm text-on-surface-variant">
                    <span className="material-symbols-outlined text-primary text-xl">check_circle</span>
                    White-labeling
                  </li>
                </ul>
                <button className="w-full py-4 rounded-xl border border-outline-variant/30 text-on-surface font-bold hover:bg-white/5 transition-all">
                  Contact Sales
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-surface to-surface-container-lowest -z-10"></div>
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-4xl md:text-6xl font-black mb-8 tracking-tighter">Start using Arcfuse today</h2>
            <p className="text-on-surface-variant text-lg mb-12 max-w-xl mx-auto">
              Join 10,000+ professionals who have unified their social digital workflow. No credit card required to start.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <button className="w-full sm:w-auto bg-gradient-to-br from-primary to-primary-container text-on-primary px-10 py-5 rounded-2xl text-lg font-bold shadow-2xl shadow-primary/30 active:scale-95 transition-all">
                Sign Up Now
              </button>
              <Link href="#" className="text-on-surface font-semibold flex items-center justify-center gap-2 group">
                Talk to Sales
                <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-[#041329] w-full py-20 px-8 border-t border-blue-900/20">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-12">
          <div className="flex flex-col gap-4">
            <div className="text-xl font-black text-slate-200">Arcfuse</div>
            <div className="text-xs text-slate-500 font-['Inter'] uppercase tracking-widest font-semibold">
              © 2024 Arcfuse Inc. All rights reserved.
            </div>
          </div>
          <nav className="flex flex-wrap gap-8 font-['Inter'] text-xs text-slate-500 uppercase tracking-widest font-semibold">
            <Link href="/privacy-policy" className="hover:text-slate-300 hover:underline transition-all">Privacy Policy</Link>
            <Link href="/terms-of-service" className="hover:text-slate-300 hover:underline transition-all">Terms of Service</Link>
            <Link href="#" className="hover:text-slate-300 hover:underline transition-all">Security</Link>
            <Link href="#" className="hover:text-slate-300 hover:underline transition-all">Status</Link>
            <Link href="#" className="hover:text-slate-300 hover:underline transition-all">Contact</Link>
          </nav>
          <div className="flex gap-6 items-center">
            <Link href="#" className="text-slate-500 hover:text-blue-400 transition-colors">
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.84 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"></path>
              </svg>
            </Link>
            <Link href="#" className="text-slate-500 hover:text-blue-400 transition-colors">
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.292c0-6.627-5.373-12-12-12"></path>
              </svg>
            </Link>
          </div>
        </div>
      </footer>
    </>
  );
}
