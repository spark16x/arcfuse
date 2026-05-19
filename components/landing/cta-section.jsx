import Link from "next/link";

export function CTASection() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-surface to-surface-container-lowest -z-10"></div>
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-4xl md:text-6xl font-black mb-8 tracking-tighter">Start using Arcfuse today</h2>
        <p className="text-on-surface-variant text-lg mb-12 max-w-xl mx-auto">
          Join 10,000+ professionals who have unified their social digital workflow. No credit card required to start.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <Link href="/signup" className="w-full sm:w-auto bg-gradient-to-br from-primary to-primary-container text-on-primary px-10 py-5 rounded-2xl text-lg font-bold shadow-2xl shadow-primary/30 active:scale-95 transition-all inline-flex items-center justify-center">
            Sign Up Now
          </Link>
          <Link href="#" className="text-on-surface font-semibold flex items-center justify-center gap-2 group">
            Talk to Sales
            <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
