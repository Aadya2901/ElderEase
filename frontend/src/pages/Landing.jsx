import HeroSection from "../components/landing/HeroSection";
import Navbar from "../components/landing/Navbar";
import FeaturesSection from "../components/landing/FeaturesSection";
import HowItWorksSection from "../components/landing/HowItWorksSection";


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