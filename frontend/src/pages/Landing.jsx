import HeroSection from "../components/landing/HeroSection";
import Navbar from "../components/landing/Navbar";

export default function Landing() {
  return (
    <div>

      <Navbar />
      <HeroSection />
      <ProblemSolutionSection />
      <FeaturesSection />
      <HowItWorksSection />
      <CaregiversSection />
      <ImpactSection />
      <CTASection />
      <Footer />

    </div>
  );
}