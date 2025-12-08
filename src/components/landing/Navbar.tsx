import { Calendar } from "lucide-react";
import { GoogleLoginButton } from "../GoogleLoginButton";
import { ThemeToggle } from "../ThemeToggle";

export const Navbar = () => {
  return (
    <nav className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
      <div className="flex items-center gap-2 text-blue-600 dark:text-blue-500 font-bold text-2xl">
        <Calendar className="w-8 h-8" />
        <span>Kalendly</span>
      </div>
      <div className="flex gap-4 items-center">
        <ThemeToggle />

        <div className="hidden md:flex gap-6 items-center">
          <a
            href="#features"
            className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white font-medium"
          >
            Features
          </a>
          <a
            href="#pricing"
            className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white font-medium"
          >
            Pricing
          </a>
          <div className="w-32">
            <GoogleLoginButton text="Log In" />
          </div>
        </div>
      </div>
    </nav>
  );
};
