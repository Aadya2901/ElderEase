import Hero from "../components/landing/Hero";
import Navbar from "../components/landing/Navbar";
import Features from "../components/landing/Features";
import HowItWorks from "../components/landing/HowItWorks";
import ProblemSolution from "../components/landing/ProblemSolution";
import Caregivers from "../components/landing/Caregivers";
import Impact from "../components/landing/Impact";
import CTA from "../components/landing/CTA";
import Footer from "../components/landing/Footer";

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