import { Navbar } from "../components/landing/Navbar";
import { Hero } from "../components/landing/Hero";
import { Features } from "../components/landing/feature/Features";

export default function Welcome() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 font-sans text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <Navbar />
      <Hero />
      <Features />
    </div>
  );
}
