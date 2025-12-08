import { Globe } from "lucide-react";
import { GoogleLoginButton } from "../GoogleLoginButton";

export const Hero = () => {
  return (
    <div className="max-w-7xl mx-auto px-6 py-20 lg:py-32 grid lg:grid-cols-2 gap-12 items-center">
      <div className="space-y-8 animate-in slide-in-from-left-8 duration-700 fade-in">
        <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight text-gray-900 dark:text-white leading-[1.1]">
          Easy scheduling <br />
          <span className="text-blue-600 dark:text-blue-500">ahead.</span>
        </h1>
        <p className="text-xl text-gray-500 dark:text-gray-400 max-w-lg leading-relaxed">
          Kalendly is your hub for scheduling meetings professionally and
          efficiently, eliminating the hassle of back-and-forth emails.
        </p>

        <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm max-w-md">
          <p className="font-semibold mb-4 text-gray-700 dark:text-gray-200">
            Get started for free
          </p>
          <GoogleLoginButton text="Sign up with Google" />
          <p className="text-xs text-center text-gray-400 dark:text-gray-500 mt-3">
            No credit card required.
          </p>
        </div>
      </div>
      <HeroVisual />
    </div>
  );
};

const HeroVisual = () => (
  <div className="relative animate-in slide-in-from-right-8 duration-700 fade-in hidden lg:block">
    <div className="absolute -z-10 top-0 right-0 w-3/4 h-3/4 bg-blue-100 dark:bg-blue-900/30 rounded-full blur-3xl opacity-50"></div>

    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 p-6 -rotate-2 hover:rotate-0 transition-transform duration-500">
      <div className="flex items-center gap-4 mb-6 border-b border-gray-100 dark:border-gray-700 pb-4">
        <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
          MA
        </div>
        <div>
          <h3 className="font-bold text-lg text-gray-900 dark:text-white">
            Meir A
          </h3>
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            30 Minute Meeting
          </p>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-2 mb-4">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div
            key={i}
            className="h-10 bg-blue-50 dark:bg-gray-700 rounded border border-blue-100 dark:border-gray-600"
          ></div>
        ))}
        <div className="h-10 bg-blue-600 rounded shadow text-white flex items-center justify-center font-bold text-sm">
          09:30
        </div>
        {[1, 2].map((i) => (
          <div
            key={i}
            className="h-10 bg-blue-50 dark:bg-gray-700 rounded border border-blue-100 dark:border-gray-600"
          ></div>
        ))}
      </div>
      <div className="flex gap-2 text-xs text-gray-400">
        <Globe className="w-4 h-4" /> Almaty Time
      </div>
    </div>
  </div>
);
