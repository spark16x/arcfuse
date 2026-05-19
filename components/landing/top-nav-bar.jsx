import Link from "next/link";

export function TopNavBar() {
  return (
    <nav className="fixed top-0 w-full z-50 bg-[#041329]/80 backdrop-blur-xl shadow-2xl shadow-black/50">
      <div className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto w-full">
        <div className="text-2xl font-bold tracking-tighter bg-gradient-to-br from-blue-200 to-blue-500 bg-clip-text text-transparent">
          Arcfuse
        </div>
        <div className="hidden md:flex items-center gap-8 font-['Inter'] text-sm font-medium tracking-tight">
          <Link href="#" className="text-blue-400 font-semibold transition-all duration-300">Features</Link>
          <Link href="/solutions" className="text-slate-400 hover:text-slate-100 hover:bg-white/5 rounded-lg transition-all duration-300 px-3 py-2">Solutions</Link>
          <Link href="/resources" className="text-slate-400 hover:text-slate-100 hover:bg-white/5 rounded-lg transition-all duration-300 px-3 py-2">Resources</Link>
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
  );
}
