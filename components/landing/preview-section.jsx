export function PreviewSection() {
  return (
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
  );
}
