import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, Layout, Link as LinkIcon, Shield, Smartphone } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-grow pt-16">
        {/* Hero Section */}
        <section className="relative overflow-hidden py-24 sm:py-32 lg:pb-32 xl:pb-36 bg-background">
          <div className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]">
            <div className="relative left-1/2 -z-10 aspect-[1155/678] w-[36.125rem] max-w-none -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-20 sm:left-[calc(50%-40rem)] sm:w-[72.1875rem]"></div>
          </div>

          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl mb-6">
                Unify all your social platforms in <span className="text-primary">one powerful space</span>.
              </h1>
              <p className="mt-6 text-lg leading-8 text-muted-foreground mb-10">
                Arcfuse is the ultimate command center for your digital presence. Manage, schedule, and analyze your content across all networks from a single, intuitive dashboard.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/signup" passHref>
                  <Button size="lg" className="w-full sm:w-auto text-lg px-8">
                    Get Started Free <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="#features" passHref>
                  <Button variant="outline" size="lg" className="w-full sm:w-auto text-lg px-8">
                    Explore Features
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          <div className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]">
             <div className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-20 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"></div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-24 bg-muted/50">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">Everything you need to grow</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Stop jumping between tabs. Arcfuse provides a seamless experience for modern creators and social media managers.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Feature 1 */}
              <div className="bg-background rounded-2xl p-8 border border-border shadow-sm hover:shadow-md transition-shadow">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-6">
                  <Layout className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Unified Dashboard</h3>
                <p className="text-muted-foreground">View all your streams, messages, and notifications in one highly customizable workspace.</p>
              </div>

              {/* Feature 2 */}
              <div className="bg-background rounded-2xl p-8 border border-border shadow-sm hover:shadow-md transition-shadow">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-6">
                  <LinkIcon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">One-Click Cross-Posting</h3>
                <p className="text-muted-foreground">Publish your content to Twitter, LinkedIn, Instagram, and more with a single click.</p>
              </div>

              {/* Feature 3 */}
              <div className="bg-background rounded-2xl p-8 border border-border shadow-sm hover:shadow-md transition-shadow">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-6">
                  <Smartphone className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Mobile Optimized</h3>
                <p className="text-muted-foreground">Manage your empire on the go. Our mobile experience is as powerful as our desktop app.</p>
              </div>

              {/* Feature 4 */}
              <div className="bg-background rounded-2xl p-8 border border-border shadow-sm hover:shadow-md transition-shadow">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-6">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Enterprise Security</h3>
                <p className="text-muted-foreground">Bank-level encryption ensures your accounts and data are always protected.</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-background py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <img src="/icons/icon-192x192.png" alt="Arcfuse Logo" className="w-8 h-8 grayscale opacity-70" />
              <span className="text-lg font-bold tracking-tight text-muted-foreground">Arcfuse</span>
            </div>
            <div className="flex gap-8 text-sm text-muted-foreground">
              <Link href="#" className="hover:text-foreground transition-colors">Privacy Policy</Link>
              <Link href="#" className="hover:text-foreground transition-colors">Terms of Service</Link>
              <Link href="#" className="hover:text-foreground transition-colors">Contact Support</Link>
            </div>
          </div>
          <div className="mt-8 text-center text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Arcfuse Inc. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
