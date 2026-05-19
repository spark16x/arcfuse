export function FeaturesSection() {
  return (
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
  );
}
