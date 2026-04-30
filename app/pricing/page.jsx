import Link from "next/link";

export default function PricingPage() {
  return (
    <>
      {/* TopNavBar */}
      <nav className="fixed top-0 w-full z-50 bg-[#041329]/80 backdrop-blur-xl shadow-2xl shadow-black/50">
        <div className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto w-full">
          <Link href="/" className="text-2xl font-bold tracking-tighter bg-gradient-to-br from-blue-200 to-blue-500 bg-clip-text text-transparent">
            Arcfuse
          </Link>
          <div className="hidden md:flex items-center gap-8 font-['Inter'] text-sm font-medium tracking-tight">
            <Link href="/" className="text-slate-400 hover:text-slate-100 hover:bg-white/5 rounded-lg transition-all duration-300 px-3 py-2">Features</Link>
            <Link href="/solutions" className="text-slate-400 hover:text-slate-100 hover:bg-white/5 rounded-lg transition-all duration-300 px-3 py-2">Solutions</Link>
            <Link href="/resources" className="text-slate-400 hover:text-slate-100 hover:bg-white/5 rounded-lg transition-all duration-300 px-3 py-2">Resources</Link>
            <Link href="/pricing" className="text-blue-400 font-semibold transition-all duration-300">Pricing</Link>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/login" className="hidden sm:block text-slate-400 hover:text-slate-100 font-medium text-sm px-4 py-2 transition-all">
              Sign In
            </Link>
            <Link href="/signup" className="bg-gradient-to-br from-primary to-primary-container text-on-primary px-5 py-2.5 rounded-lg text-sm font-bold active:scale-95 duration-200 transition-all shadow-lg shadow-primary/20">
              Get Started
            </Link>
          </div>
        </div>
        <div className="bg-gradient-to-b from-[#112036] to-transparent h-[1px] opacity-20"></div>
      </nav>

      <main className="pt-32 pb-20 min-h-[calc(100vh-200px)]">
        {/* Pricing Section */}
        <section className="py-24 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h1 className="text-sm font-bold tracking-[0.2em] text-secondary uppercase mb-4">Pricing Plans</h1>
              <h2 className="text-4xl md:text-6xl font-black text-on-surface mb-6">Simple, transparent pricing</h2>
              <p className="text-on-surface-variant text-lg max-w-2xl mx-auto">
                Choose the plan that fits your workflow. Scale up as you grow your digital presence.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8 items-stretch mt-12">
              {/* Starter Plan */}
              <div className="bg-surface-container p-8 rounded-3xl border border-outline-variant/10 flex flex-col hover:bg-surface-container-high transition-all">
                <div className="mb-8">
                  <h4 className="text-xl font-bold text-on-surface mb-2">Starter</h4>
                  <p className="text-on-surface-variant text-sm">For individuals getting started.</p>
                </div>
                <div className="mb-8 flex items-baseline gap-1">
                  <span className="text-5xl font-black text-on-surface">$0</span>
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
                <Link href="/signup" className="w-full py-4 rounded-xl border border-outline-variant/30 text-on-surface font-bold hover:bg-white/5 transition-all block text-center">
                  Get Started
                </Link>
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
                  <span className="text-5xl font-black text-on-surface">$19</span>
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
                <Link href="/signup" className="w-full py-4 rounded-xl bg-gradient-to-br from-primary to-primary-container text-on-primary font-bold shadow-xl shadow-primary/20 active:scale-95 transition-all block text-center">
                  Get Started
                </Link>
              </div>

              {/* Enterprise Plan */}
              <div className="bg-surface-container p-8 rounded-3xl border border-outline-variant/10 flex flex-col hover:bg-surface-container-high transition-all">
                <div className="mb-8">
                  <h4 className="text-xl font-bold text-on-surface mb-2">Enterprise</h4>
                  <p className="text-on-surface-variant text-sm">For professional teams.</p>
                </div>
                <div className="mb-8 flex items-baseline gap-1">
                  <span className="text-5xl font-black text-on-surface">Custom</span>
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
                <Link href="/signup" className="w-full py-4 rounded-xl border border-outline-variant/30 text-on-surface font-bold hover:bg-white/5 transition-all block text-center">
                  Contact Sales
                </Link>
              </div>
            </div>

            {/* FAQ Section */}
            <div className="mt-32 max-w-3xl mx-auto">
              <h3 className="text-3xl font-bold text-center mb-12 text-on-surface">Frequently Asked Questions</h3>
              <div className="space-y-6">
                <div className="bg-surface-container rounded-2xl p-6 border border-outline-variant/10">
                  <h4 className="text-lg font-bold text-on-surface mb-2">Can I switch plans later?</h4>
                  <p className="text-on-surface-variant">Absolutely. You can upgrade or downgrade your plan at any time. Prorated charges will be applied automatically.</p>
                </div>
                <div className="bg-surface-container rounded-2xl p-6 border border-outline-variant/10">
                  <h4 className="text-lg font-bold text-on-surface mb-2">What payment methods do you accept?</h4>
                  <p className="text-on-surface-variant">We accept all major credit cards, PayPal, and wire transfers for annual enterprise plans.</p>
                </div>
                <div className="bg-surface-container rounded-2xl p-6 border border-outline-variant/10">
                  <h4 className="text-lg font-bold text-on-surface mb-2">Is there a free trial for the Pro plan?</h4>
                  <p className="text-on-surface-variant">Yes, we offer a 14-day free trial for the Pro plan so you can experience all premium features before committing.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-[#041329] w-full py-20 px-8 border-t border-blue-900/20 mt-auto">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-12">
          <div className="flex flex-col gap-4">
            <Link href="/" className="text-xl font-black text-slate-200">Arcfuse</Link>
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
