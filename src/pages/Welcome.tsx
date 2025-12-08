import { Navbar } from "../components/landing/Navbar";
import { Hero } from "../components/landing/Hero";
import { Features } from "../components/landing/feature/Features";

export default function Welcome() {
  return (
    <div className="min-h-screen bg-white font-sans text-gray-900">
      <Navbar />
      <Hero />
      <Features />
    </div>
  );
}
