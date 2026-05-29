"use client";
import Link from "next/link";
import { motion } from "framer-motion";

export default function LandingPage() {
  return (
    <>
      {/* TopNavBar */}
      <nav className="fixed top-0 w-full z-50 glass-nav">
        <div className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto w-full">
          <div className="text-xl font-bold tracking-tight text-text-primary flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">terminal</span>
            Arcfuse
          </div>
          <div className="hidden md:flex items-center gap-6 font-medium text-sm text-text-secondary">
            <Link href="#" className="hover:text-text-primary transition-colors">Features</Link>
            <Link href="https://github.com/spark16x/arcfuse" target="_blank" className="hover:text-text-primary flex items-center gap-1 transition-colors">
              GitHub <span className="material-symbols-outlined text-[16px]">open_in_new</span>
            </Link>
            <Link href="/contributors" className="hover:text-text-primary transition-colors">Contributors</Link>
            <Link href="/community" className="hover:text-text-primary transition-colors">Community</Link>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/login" className="hidden sm:block btn-ghost px-4 py-2 rounded-lg text-sm font-medium">
              Log in
            </Link>
            <Link href="/signup" className="btn-primary px-5 py-2.5 rounded-lg text-sm font-semibold flex items-center gap-2">
              Start Building
            </Link>
          </div>
        </div>
      </nav>

      <main className="pt-32 pb-20">
        {/* Hero Section */}
        <section className="relative overflow-hidden mb-section-desktop">
          <div className="max-w-container-main mx-auto px-6">
            <div className="flex flex-col lg:flex-row items-center gap-16">

              {/* Hero Content */}
              <div className="flex-1 text-left">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-section-bg border border-border text-text-secondary text-xs font-mono mb-6">
                    <span className="flex h-2 w-2 rounded-full bg-success"></span>
                    v0.2.1-beta Live
                  </div>
                  <h1 className="text-display-mobile md:text-display-tablet lg:text-display-desktop text-text-primary mb-6">
                    Open Source AI <br />
                    <span className="text-primary">Discovery Platform</span>
                  </h1>
                  <p className="text-text-secondary text-lg max-w-content-text mb-8">
                    Discover, manage, and build with the best AI tools and developer resources.
                    Built in public, for the community.
                  </p>

                  <div className="flex flex-wrap items-center gap-4 mb-8">
                    <Link href="/signup" className="btn-primary px-6 py-3 rounded-xl text-base font-medium inline-flex items-center gap-2">
                      <span className="material-symbols-outlined">rocket_launch</span>
                      Deploy Now
                    </Link>
                    <Link href="https://github.com/spark16x/arcfuse" target="_blank" className="btn-secondary px-6 py-3 rounded-xl text-base font-medium inline-flex items-center gap-2">
                      <span className="material-symbols-outlined">code</span>
                      Star on GitHub
                    </Link>
                  </div>

                  <div className="flex items-center gap-6 text-sm text-text-muted font-mono">
                    <div className="flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-base">star</span> 2.4k
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-base">fork_right</span> 328
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-base">group</span> 50+ Contributors
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Hero Visuals - Floating Cards */}
              <div className="flex-1 relative w-full h-[500px] hidden lg:block">
                <motion.div
                  className="absolute top-10 right-10 w-80 repo-card p-6 z-20 bg-card-bg"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                        <span className="material-symbols-outlined text-sm">smart_toy</span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-text-primary text-sm">OpenAI Integration</h3>
                        <p className="text-xs text-text-muted font-mono">ID: apx-992</p>
                      </div>
                    </div>
                    <span className="px-2 py-1 bg-success/10 text-success text-xs rounded-full font-medium">Active</span>
                  </div>
                  <div className="space-y-2">
                    <div className="h-2 w-full bg-section-bg rounded-full overflow-hidden">
                      <div className="h-full bg-primary w-[85%] rounded-full"></div>
                    </div>
                    <div className="flex justify-between text-xs text-text-secondary font-mono">
                      <span>API Health</span>
                      <span>85%</span>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  className="absolute top-48 left-0 w-72 repo-card p-5 z-10 bg-card-bg"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  <h4 className="font-semibold text-text-primary text-sm mb-3">Recent Pull Requests</h4>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <span className="material-symbols-outlined text-success text-sm mt-0.5">merge</span>
                      <div>
                        <p className="text-sm text-text-primary">feat: add generic oauth provider</p>
                        <p className="text-xs text-text-muted font-mono">#142 by @spark</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="material-symbols-outlined text-primary text-sm mt-0.5">commit</span>
                      <div>
                        <p className="text-sm text-text-primary">fix: rate limiting on edge</p>
                        <p className="text-xs text-text-muted font-mono">#141 by @jules</p>
                      </div>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  className="absolute bottom-10 right-20 w-64 repo-card p-5 z-30 bg-card-bg"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                >
                  <h4 className="font-semibold text-text-primary text-sm mb-4">Community Stats</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-2xl font-bold text-text-primary font-mono">10k+</p>
                      <p className="text-xs text-text-secondary">Developers</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-primary font-mono">500+</p>
                      <p className="text-xs text-text-secondary">Projects</p>
                    </div>
                  </div>
                </motion.div>

                {/* Decorative background grid */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] -z-10 rounded-3xl mask-image:linear-gradient(to_bottom,white,transparent)"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Feature Cards Section */}
        <section className="py-section-desktop bg-section-bg">
          <div className="max-w-container-main mx-auto px-6">
            <div className="text-center mb-16">
              <div className="flex flex-wrap justify-center gap-3 mb-6">
                <span className="px-3 py-1 bg-white border border-border rounded-full text-xs font-semibold text-text-primary shadow-sm flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[14px]">public</span> Open Source
                </span>
                <span className="px-3 py-1 bg-white border border-border rounded-full text-xs font-semibold text-text-primary shadow-sm flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[14px]">groups</span> Community Driven
                </span>
                <span className="px-3 py-1 bg-white border border-border rounded-full text-xs font-semibold text-text-primary shadow-sm flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[14px]">code_blocks</span> MIT Licensed
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">Built by builders for builders</h2>
              <p className="text-text-secondary max-w-2xl mx-auto">
                Everything you need to discover and integrate AI tools, with full transparency and developer ergonomics.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  title: "Extensible Architecture",
                  desc: "Add your own integrations easily. Our plugin system is designed for speed and flexibility.",
                  icon: "extension"
                },
                {
                  title: "Real-time Analytics",
                  desc: "Monitor your API usage and community growth with perfectly crafted, performant dashboards.",
                  icon: "monitoring"
                },
                {
                  title: "Edge Ready",
                  desc: "Deployed globally on the edge. Fast response times for you and your users.",
                  icon: "bolt"
                }
              ].map((feature, i) => (
                <div key={i} className="repo-card p-8">
                  <div className="w-10 h-10 bg-section-bg border border-border rounded-lg flex items-center justify-center text-text-primary mb-6">
                    <span className="material-symbols-outlined">{feature.icon}</span>
                  </div>
                  <h3 className="text-xl font-semibold text-text-primary mb-3">{feature.title}</h3>
                  <p className="text-text-secondary leading-relaxed">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Community & Open Source Focus */}
        <section className="py-section-desktop">
          <div className="max-w-container-main mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-6">Join the Ecosystem</h2>
            <p className="text-text-secondary text-lg max-w-2xl mx-auto mb-12">
              Arcfuse is maintained by an amazing group of contributors. Dive into the code, submit a PR, or join the discussion.
            </p>

            <div className="repo-card p-8 md:p-12 max-w-4xl mx-auto bg-section-bg">
              <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="text-left flex-1">
                  <h3 className="text-2xl font-semibold text-text-primary mb-2">Ready to contribute?</h3>
                  <p className="text-text-secondary mb-6">Check out our good first issues to get started.</p>
                  <Link href="https://github.com/spark16x/arcfuse/issues" target="_blank" className="btn-primary px-6 py-3 rounded-xl font-medium inline-flex items-center gap-2">
                    View Open Issues <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </Link>
                </div>

                <div className="flex-1 w-full bg-white border border-border rounded-xl p-6">
                  <h4 className="text-sm font-semibold text-text-primary mb-4 flex items-center gap-2">
                    <span className="material-symbols-outlined text-success">fiber_manual_record</span> Live Activity
                  </h4>
                  <div className="space-y-4">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="flex items-start gap-3 pb-3 border-b border-border last:border-0 last:pb-0">
                        <div className="w-8 h-8 rounded-full bg-section-bg border border-border"></div>
                        <div>
                          <p className="text-sm text-text-primary"><span className="font-semibold">User{i}</span> pushed to main</p>
                          <p className="text-xs text-text-muted font-mono">{i}0 mins ago</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-white py-12">
        <div className="max-w-container-main mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2 text-text-primary font-bold">
            <span className="material-symbols-outlined text-primary">terminal</span>
            Arcfuse
          </div>
          <div className="flex items-center gap-6 text-sm text-text-secondary font-medium">
            <Link href="/privacy" className="hover:text-text-primary transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-text-primary transition-colors">Terms</Link>
            <Link href="https://github.com/spark16x/arcfuse" className="hover:text-text-primary transition-colors">GitHub</Link>
          </div>
          <div className="text-sm text-text-muted font-mono">
            © {new Date().getFullYear()} Arcfuse Contributors
          </div>
        </div>
      </footer>
    </>
  );
}
