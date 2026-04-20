import Nav from "@/components/landing/Nav";
import Hero from "@/components/landing/Hero";
import StatsBar from "@/components/landing/StatsBar";
import Features from "@/components/landing/Features";
import HowItWorks from "@/components/landing/HowItWorks";
import Pricing from "@/components/landing/Pricing";
import Testimonials from "@/components/landing/Testimonials";
import CtaSection from "@/components/landing/CtaSection";
import Footer from "@/components/landing/Footer";

export default function LandingPage() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <StatsBar />
        <Features />
        <hr style={{ border: "none", borderTop: "1px solid var(--border)" }} />
        <HowItWorks />
        <hr style={{ border: "none", borderTop: "1px solid var(--border)" }} />
        <Pricing />
        <hr style={{ border: "none", borderTop: "1px solid var(--border)" }} />
        <Testimonials />
        <CtaSection />
      </main>
      <Footer />
    </>
  );
}
