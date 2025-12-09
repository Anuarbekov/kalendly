import { Navbar } from "../components/landing/Navbar";
import { Hero } from "../components/landing/Hero";
import { Features } from "../components/landing/feature/Features";
import { useEffect } from "react";

export default function Welcome() {
  useEffect(() => {
    const token = localStorage.getItem("access_token");

    if (token) {
      window.location.href = "/dashboard";
    }
  }, []);
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 font-sans text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <Navbar />
      <Hero />
      <Features />
    </div>
  );
}
