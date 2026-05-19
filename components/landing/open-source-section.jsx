export function OpenSourceSection() {
  return (
    <section className="py-24 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-black mb-6 text-on-surface">100% Free & Open Source</h2>
          <p className="text-xl text-on-surface-variant max-w-2xl mx-auto">
            Arcfuse is built by the community, for the community. Use it forever without paying a dime.
          </p>
        </div>
        <div className="flex flex-col md:flex-row items-center justify-center gap-8">
          <div className="bg-surface-container p-8 rounded-3xl border border-primary/20 flex flex-col items-center text-center max-w-sm hover:border-primary/50 transition-all">
            <span className="material-symbols-outlined text-primary text-5xl mb-4">code</span>
            <h3 className="text-xl font-bold text-on-surface mb-2">Apache 2.0 Licensed</h3>
            <p className="text-on-surface-variant mb-6">Modify, distribute, and use it commercially without restrictions.</p>
            <a href="https://github.com/spark16x/arcfuse" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-primary font-bold hover:underline">
              View on GitHub <span className="material-symbols-outlined text-sm">open_in_new</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
