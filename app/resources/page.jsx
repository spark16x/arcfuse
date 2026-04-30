import Link from "next/link";

export const metadata = {
  title: "Resources | Arcfuse",
  description: "Guides, tutorials, and API documentation for Arcfuse.",
};

export default function ResourcesPage() {
  return (
    <div className="min-h-screen pt-24 pb-12 px-6 max-w-7xl mx-auto">
      <nav className="fixed top-0 left-0 w-full z-50 bg-[#041329]/80 backdrop-blur-xl shadow-2xl shadow-black/50">
        <div className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto w-full">
          <Link href="/" className="text-2xl font-bold tracking-tighter bg-gradient-to-br from-blue-200 to-blue-500 bg-clip-text text-transparent">
            Arcfuse
          </Link>
          <div className="hidden md:flex items-center gap-8 font-['Inter'] text-sm font-medium tracking-tight">
            <Link href="/#features" className="text-slate-400 hover:text-slate-100 hover:bg-white/5 rounded-lg transition-all duration-300 px-3 py-2">Features</Link>
            <Link href="/solutions" className="text-slate-400 hover:text-slate-100 hover:bg-white/5 rounded-lg transition-all duration-300 px-3 py-2">Solutions</Link>
            <Link href="/resources" className="text-blue-400 font-semibold transition-all duration-300">Resources</Link>
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

      <div className="mt-16 text-center max-w-3xl mx-auto mb-16">
        <h1 className="text-4xl md:text-5xl font-black tracking-tighter mb-6 bg-gradient-to-r from-primary via-secondary-container to-primary bg-clip-text text-transparent">
          Learn & Grow with Arcfuse
        </h1>
        <p className="text-on-surface-variant text-lg">
          Everything you need to master cross-platform social management, from quick start guides to deep-dive API references.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Guides & Tutorials */}
        <div className="bg-surface/30 border border-surface-variant rounded-3xl p-8 hover:bg-surface/50 transition-colors">
          <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-6">
            <span className="material-symbols-outlined text-primary text-3xl">menu_book</span>
          </div>
          <h2 className="text-2xl font-bold mb-4">Guides & Tutorials</h2>
          <p className="text-on-surface-variant mb-8">Step-by-step instructions to set up your workspace, connect platforms, and build automated workflows.</p>

          <div className="space-y-4">
            {[
              { title: "Getting Started with Arcfuse", time: "5 min read" },
              { title: "Connecting Discord and Slack", time: "8 min read" },
              { title: "Setting up automated moderation rules", time: "12 min read" },
            ].map((article, i) => (
              <Link href="#" key={i} className="block group bg-surface/50 p-4 rounded-xl border border-surface-variant/50 hover:border-primary/50 transition-colors">
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold group-hover:text-primary transition-colors">{article.title}</h3>
                  <span className="material-symbols-outlined text-on-surface-variant group-hover:translate-x-1 transition-transform">arrow_forward</span>
                </div>
                <p className="text-xs text-on-surface-variant mt-2">{article.time}</p>
              </Link>
            ))}
          </div>
          <Link href="#" className="inline-block mt-6 text-primary font-medium hover:underline">View all guides →</Link>
        </div>

        {/* Developer Docs */}
        <div className="bg-surface/30 border border-surface-variant rounded-3xl p-8 hover:bg-surface/50 transition-colors">
          <div className="w-14 h-14 bg-secondary-container/10 rounded-2xl flex items-center justify-center mb-6">
            <span className="material-symbols-outlined text-secondary-container text-3xl">api</span>
          </div>
          <h2 className="text-2xl font-bold mb-4">Developer Documentation</h2>
          <p className="text-on-surface-variant mb-8">Comprehensive API references, SDKs, and integration guides for building on top of Arcfuse.</p>

          <div className="space-y-4">
             {[
              { title: "REST API Reference", type: "Documentation" },
              { title: "Node.js SDK Guide", type: "SDK" },
              { title: "Handling Webhooks", type: "Tutorial" },
            ].map((doc, i) => (
              <Link href="#" key={i} className="block group bg-surface/50 p-4 rounded-xl border border-surface-variant/50 hover:border-secondary-container/50 transition-colors">
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold group-hover:text-secondary-container transition-colors">{doc.title}</h3>
                  <span className="material-symbols-outlined text-on-surface-variant group-hover:translate-x-1 transition-transform">arrow_forward</span>
                </div>
                <span className="inline-block mt-2 text-xs px-2 py-1 bg-surface-variant/50 rounded-md text-on-surface-variant">{doc.type}</span>
              </Link>
            ))}
          </div>
          <Link href="#" className="inline-block mt-6 text-secondary-container font-medium hover:underline">Go to API Docs →</Link>
        </div>
      </div>
    </div>
  );
}
