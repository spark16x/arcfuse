import Link from "next/link";

export default function Contact() {
  return (
    <div className="max-w-4xl mx-auto py-20 px-6">
      <h1 className="text-4xl font-black mb-8 text-on-surface">Contact Us</h1>
      <div className="prose prose-slate dark:prose-invert">
        <p className="text-on-surface-variant mb-8">
          We&apos;d love to hear from you. Please fill out the form below or reach out to us directly.
        </p>

        <form className="flex flex-col gap-6 max-w-lg">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-on-surface mb-2">Name</label>
            <input
              type="text"
              id="name"
              className="w-full px-4 py-3 rounded-lg bg-surface-variant/50 border border-outline/20 text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
              placeholder="Your name"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-on-surface mb-2">Email</label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-3 rounded-lg bg-surface-variant/50 border border-outline/20 text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium text-on-surface mb-2">Message</label>
            <textarea
              id="message"
              rows="5"
              className="w-full px-4 py-3 rounded-lg bg-surface-variant/50 border border-outline/20 text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all resize-none"
              placeholder="How can we help?"
            ></textarea>
          </div>

          <button
            type="button"
            className="bg-gradient-to-br from-primary to-primary-container text-on-primary px-6 py-3 rounded-lg font-bold shadow-lg shadow-primary/20 active:scale-95 transition-all w-fit"
          >
            Send Message
          </button>
        </form>

        <div className="mt-16 pt-8 border-t border-outline/10">
          <Link href="/" className="text-primary hover:underline flex items-center gap-2">
            <span className="material-symbols-outlined text-sm">arrow_back</span>
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
