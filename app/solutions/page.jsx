import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

export const metadata = {
  title: "Solutions | Arcfuse",
  description: "Discover how Arcfuse solves problems for different teams and workflows.",
};

export default function SolutionsPage() {
  return (
    <div className="min-h-screen pt-24 pb-12 px-6 max-w-7xl mx-auto">
      <nav className="fixed top-0 left-0 w-full z-50 bg-[#041329]/80 backdrop-blur-xl shadow-2xl shadow-black/50">
        <div className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto w-full">
          <Link href="/" className="text-2xl font-bold tracking-tighter bg-gradient-to-br from-blue-200 to-blue-500 bg-clip-text text-transparent">
            Arcfuse
          </Link>
          <div className="hidden md:flex items-center gap-8 font-['Inter'] text-sm font-medium tracking-tight">
            <Link href="/#features" className="text-slate-400 hover:text-slate-100 hover:bg-white/5 rounded-lg transition-all duration-300 px-3 py-2">Features</Link>
            <Link href="/solutions" className="text-blue-400 font-semibold transition-all duration-300">Solutions</Link>
            <Link href="/resources" className="text-slate-400 hover:text-slate-100 hover:bg-white/5 rounded-lg transition-all duration-300 px-3 py-2">Resources</Link>
            <Link href="/pricing" className="text-slate-400 hover:text-slate-100 hover:bg-white/5 rounded-lg transition-all duration-300 px-3 py-2">Pricing</Link>
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

      <div className="mt-16 text-center max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-black tracking-tighter mb-6 bg-gradient-to-r from-primary via-secondary-container to-primary bg-clip-text text-transparent">
          Solutions for Every Workflow
        </h1>
        <p className="text-on-surface-variant text-lg mb-12">
          Whether you're a community manager, developer, or marketer, Arcfuse streamlines your social operations.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
        {/* Solution 1 */}
        <div className="bg-surface/50 border border-surface-variant rounded-2xl p-8 hover:bg-surface transition-all duration-300">
          <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
            <span className="material-symbols-outlined text-primary text-2xl">groups</span>
          </div>
          <h3 className="text-xl font-bold mb-4">Community Managers</h3>
          <p className="text-on-surface-variant mb-6 text-sm">
            Monitor and engage with your community across Discord, Telegram, and X from a single unified inbox.
          </p>
          <ul className="space-y-3">
            {['Unified inbox', 'Automated moderation', 'Cross-platform analytics'].map((feature, i) => (
              <li key={i} className="flex items-center gap-2 text-sm text-on-surface-variant">
                <CheckCircle2 className="w-4 h-4 text-primary" />
                {feature}
              </li>
            ))}
          </ul>
        </div>

        {/* Solution 2 */}
        <div className="bg-surface/50 border border-surface-variant rounded-2xl p-8 hover:bg-surface transition-all duration-300">
          <div className="w-12 h-12 bg-secondary-container/10 rounded-xl flex items-center justify-center mb-6">
            <span className="material-symbols-outlined text-secondary-container text-2xl">campaign</span>
          </div>
          <h3 className="text-xl font-bold mb-4">Marketing Teams</h3>
          <p className="text-on-surface-variant mb-6 text-sm">
            Schedule posts, track sentiment, and analyze campaign performance across all social channels simultaneously.
          </p>
          <ul className="space-y-3">
            {['Multi-platform scheduling', 'Sentiment analysis', 'Campaign tracking'].map((feature, i) => (
              <li key={i} className="flex items-center gap-2 text-sm text-on-surface-variant">
                <CheckCircle2 className="w-4 h-4 text-secondary-container" />
                {feature}
              </li>
            ))}
          </ul>
        </div>

        {/* Solution 3 */}
        <div className="bg-surface/50 border border-surface-variant rounded-2xl p-8 hover:bg-surface transition-all duration-300">
          <div className="w-12 h-12 bg-tertiary/10 rounded-xl flex items-center justify-center mb-6">
            <span className="material-symbols-outlined text-tertiary text-2xl">code</span>
          </div>
          <h3 className="text-xl font-bold mb-4">Developers</h3>
          <p className="text-on-surface-variant mb-6 text-sm">
            Integrate custom bots, webhooks, and automate social workflows using our robust API and SDKs.
          </p>
          <ul className="space-y-3">
            {['REST API & Webhooks', 'Custom integrations', 'Bot management'].map((feature, i) => (
              <li key={i} className="flex items-center gap-2 text-sm text-on-surface-variant">
                <CheckCircle2 className="w-4 h-4 text-tertiary" />
                {feature}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-20 text-center">
        <Link href="/signup" className="inline-flex items-center gap-2 bg-gradient-to-br from-primary to-primary-container text-on-primary px-8 py-4 rounded-xl font-bold hover:scale-105 transition-transform duration-200">
          Start building your workflow
          <span className="material-symbols-outlined text-sm">arrow_forward</span>
        </Link>
      </div>
    </div>
  );
}
