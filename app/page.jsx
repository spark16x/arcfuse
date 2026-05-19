import { TopNavBar } from "@/components/landing/top-nav-bar";
import { HeroSection } from "@/components/landing/hero-section";
import { FeaturesSection } from "@/components/landing/features-section";
import { HowItWorksSection } from "@/components/landing/how-it-works-section";
import { PreviewSection } from "@/components/landing/preview-section";
import { OpenSourceSection } from "@/components/landing/open-source-section";
import { CTASection } from "@/components/landing/cta-section";
import { ProductHuntBadge } from "@/components/landing/product-hunt-badge";
import { Footer } from "@/components/landing/footer";

export default function LandingPage() {
  return (
    <>
      <TopNavBar />
      <main>
        <HeroSection />
        <FeaturesSection />
        <HowItWorksSection />
        <PreviewSection />
        <OpenSourceSection />
        <CTASection />
        <ProductHuntBadge />
      </main>
      <Footer />
    </>
  );
}
