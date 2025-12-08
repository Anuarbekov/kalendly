import { Calendar } from "lucide-react";
import { GoogleLoginButton } from "../GoogleLoginButton";

export const Navbar = () => {
  return (
    <nav className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
      <div className="flex items-center gap-2 text-blue-600 font-bold text-2xl">
        <Calendar className="w-8 h-8" />
        <span>Kalendly</span>
      </div>
      <div className="hidden md:flex gap-6 items-center">
        <a href="#features" className="text-gray-600 hover:text-gray-900 font-medium">
          Features
        </a>
        <a href="#pricing" className="text-gray-600 hover:text-gray-900 font-medium">
          Pricing
        </a>
        <div className="w-32">
          <GoogleLoginButton text="Log In" />
        </div>
      </div>
    </nav>
  );
};