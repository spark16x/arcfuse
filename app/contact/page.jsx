import Link from 'next/link';

export const metadata = {
  title: "Contact Us - Arcfuse",
  description: "Get in touch with Arcfuse. We are here to help.",
};

export default function Contact() {
  return (
    <div className="max-w-4xl mx-auto py-20 px-6 min-h-[calc(100vh-200px)]">
      <h1 className="text-4xl font-black mb-4 text-on-surface">Contact Us</h1>
      <p className="text-on-surface-variant text-lg mb-12">
        We'd love to hear from you. Please reach out to us using the contact details below.
      </p>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-surface-container p-8 rounded-3xl border border-outline-variant/30 flex flex-col items-start hover:bg-surface-container-high transition-all">
          <div className="bg-primary/10 p-4 rounded-2xl mb-6">
            <span className="material-symbols-outlined text-primary text-3xl">email</span>
          </div>
          <h2 className="text-2xl font-bold mb-4 text-on-surface">Email Us</h2>
          <div className="space-y-4 w-full">
            <a href="mailto:arcfuse.dev@gmail.com" className="flex items-center justify-between p-4 rounded-xl border border-outline-variant/30 hover:border-primary/50 hover:bg-primary/5 transition-all group">
              <span className="text-on-surface font-medium group-hover:text-primary transition-colors">arcfuse.dev@gmail.com</span>
              <span className="material-symbols-outlined text-on-surface-variant group-hover:text-primary transition-colors">arrow_forward</span>
            </a>
            <a href="mailto:spark2009971@gmail.com" className="flex items-center justify-between p-4 rounded-xl border border-outline-variant/30 hover:border-primary/50 hover:bg-primary/5 transition-all group">
              <span className="text-on-surface font-medium group-hover:text-primary transition-colors">spark2009971@gmail.com</span>
              <span className="material-symbols-outlined text-on-surface-variant group-hover:text-primary transition-colors">arrow_forward</span>
            </a>
          </div>
        </div>

        <div className="bg-surface-container p-8 rounded-3xl border border-outline-variant/30 flex flex-col items-start hover:bg-surface-container-high transition-all">
          <div className="bg-primary/10 p-4 rounded-2xl mb-6">
            <span className="material-symbols-outlined text-primary text-3xl">call</span>
          </div>
          <h2 className="text-2xl font-bold mb-4 text-on-surface">Call Us</h2>
          <div className="w-full">
            <a href="tel:+917982750957" className="flex items-center justify-between p-4 rounded-xl border border-outline-variant/30 hover:border-primary/50 hover:bg-primary/5 transition-all group">
              <span className="text-on-surface font-medium group-hover:text-primary transition-colors">+91 7982750957</span>
              <span className="material-symbols-outlined text-on-surface-variant group-hover:text-primary transition-colors">arrow_forward</span>
            </a>
          </div>
          <p className="text-sm text-on-surface-variant mt-6">
            Available Monday to Friday, 9am - 6pm (IST)
          </p>
        </div>
      </div>

      <div className="mt-16 text-center">
        <Link href="/" className="inline-flex items-center gap-2 text-primary hover:text-primary-container font-medium transition-colors group">
          <span className="material-symbols-outlined group-hover:-translate-x-1 transition-transform">arrow_back</span>
          Back to Home
        </Link>
      </div>
    </div>
  );
}
