import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-[#041329] w-full py-20 px-8 border-t border-blue-900/20">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-12">
        <div className="flex flex-col gap-4">
          <div className="text-xl font-black text-slate-200">Arcfuse</div>
          <div className="text-xs text-slate-500 font-['Inter'] uppercase tracking-widest font-semibold">
            © 2024 Arcfuse Inc. All rights reserved.
          </div>
        </div>
        <nav className="flex flex-wrap gap-8 font-['Inter'] text-xs text-slate-500 uppercase tracking-widest font-semibold">
          <Link href="/privacy-policy" className="hover:text-slate-300 hover:underline transition-all">Privacy Policy</Link>
          <Link href="/terms-of-service" className="hover:text-slate-300 hover:underline transition-all">Terms of Service</Link>
          <Link href="#" className="hover:text-slate-300 hover:underline transition-all">Security</Link>
          <Link href="#" className="hover:text-slate-300 hover:underline transition-all">Status</Link>
          <Link href="/contact" className="hover:text-slate-300 hover:underline transition-all">Contact</Link>
        </nav>
        <div className="flex gap-6 items-center">
          <Link href="#" className="text-slate-500 hover:text-blue-400 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 rounded-sm" aria-label="Twitter">
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.84 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"></path>
            </svg>
          </Link>
          <Link href="#" className="text-slate-500 hover:text-blue-400 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 rounded-sm" aria-label="GitHub">
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.292c0-6.627-5.373-12-12-12"></path>
            </svg>
          </Link>
        </div>
      </div>
    </footer>
  );
}
