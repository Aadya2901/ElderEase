import Hero from "../components/landing/Landing-Hero";
import Features from "../components/landing/Landing-Features";
import Navbar from "../components/landing/Landing-Navbar";
import Footer from "../components/landing/Landing-Footer";
import CTA from "../components/landing/Landing-CTA";
import Impact from "../components/landing/Landing-Impact";
import HowItWorks from "../components/landing/Landing-HowItWorks";
import ProblemSolution from "../components/landing/Landing-ProblemSolution";
import Caregivers from "../components/landing/Landing-Caregivers";

export default function Landing() {
  return (
    <div>
      <Navbar />
      <Hero />
      <ProblemSolution />
      <Features />
      <HowItWorks />
      <Caregivers />
      <Impact />
      <CTA />
      <Footer />

    </div>
  );
}