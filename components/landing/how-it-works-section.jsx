export function HowItWorksSection() {
  return (
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
  );
}
