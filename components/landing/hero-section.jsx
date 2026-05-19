import Link from "next/link";

export function HeroSection() {
  return (
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
          <Link href="/signup" className="w-full sm:w-auto bg-gradient-to-br from-primary to-primary-container text-on-primary px-8 py-4 rounded-xl text-base font-bold shadow-xl shadow-primary/25 active:scale-95 transition-all inline-flex items-center justify-center">
            Get Started Free
          </Link>
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
  );
}
