import { Calendar, CheckCircle2, Globe } from "lucide-react";
import { GoogleLoginButton } from "../components/GoogleLoginButton";

export default function Welcome() {
  return (
    <div className="min-h-screen bg-white font-sans text-gray-900">
      {/* 1. Navbar */}
      <nav className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
        <div className="flex items-center gap-2 text-blue-600 font-bold text-2xl">
          <Calendar className="w-8 h-8" />
          <span>Kalendly</span>
        </div>
        <div className="hidden md:flex gap-6 items-center">
          <a
            href="#features"
            className="text-gray-600 hover:text-gray-900 font-medium"
          >
            Features
          </a>
          <a
            href="#pricing"
            className="text-gray-600 hover:text-gray-900 font-medium"
          >
            Pricing
          </a>
          <div className="w-32">
            <GoogleLoginButton text="Log In" />
          </div>
        </div>
      </nav>

      {/* 2. Hero Section */}
      <div className="max-w-7xl mx-auto px-6 py-20 lg:py-32 grid lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-8 animate-in slide-in-from-left-8 duration-700 fade-in">
          <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight text-gray-900 leading-[1.1]">
            Easy scheduling <br />
            <span className="text-blue-600">ahead.</span>
          </h1>
          <p className="text-xl text-gray-500 max-w-lg leading-relaxed">
            Kalendly is your hub for scheduling meetings professionally and
            efficiently, eliminating the hassle of back-and-forth emails so you
            can get back to work.
          </p>

          <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 shadow-sm max-w-md">
            <p className="font-semibold mb-4 text-gray-700">
              Get started for free
            </p>
            <GoogleLoginButton text="Sign up with Google" />
            <p className="text-xs text-center text-gray-400 mt-3">
              No credit card required.
            </p>
          </div>
        </div>

        {/* Hero Image / Visual */}
        <div className="relative animate-in slide-in-from-right-8 duration-700 fade-in hidden lg:block">
          <div className="absolute -z-10 top-0 right-0 w-3/4 h-3/4 bg-blue-100 rounded-full blur-3xl opacity-50"></div>
          <div className="bg-white rounded-xl shadow-2xl border border-gray-200 p-6 -rotate-2 hover:rotate-0 transition-transform duration-500">
            <div className="flex items-center gap-4 mb-6 border-b border-gray-100 pb-4">
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                JD
              </div>
              <div>
                <h3 className="font-bold text-lg">John Doe</h3>
                <p className="text-gray-500 text-sm">30 Minute Meeting</p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2 mb-4">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div
                  key={i}
                  className="h-10 bg-blue-50 rounded border border-blue-100"
                ></div>
              ))}
              <div className="h-10 bg-blue-600 rounded shadow text-white flex items-center justify-center font-bold text-sm">
                09:30
              </div>
              {[1, 2].map((i) => (
                <div
                  key={i}
                  className="h-10 bg-blue-50 rounded border border-blue-100"
                ></div>
              ))}
            </div>
            <div className="flex gap-2 text-xs text-gray-400">
              <Globe className="w-4 h-4" /> Almaty Time
            </div>
          </div>
        </div>
      </div>

      {/* 3. Features Grid */}
      <div id="features" className="bg-gray-50 py-24 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-center text-3xl font-bold mb-16">How it works</h2>

          <div className="grid md:grid-cols-3 gap-10">
            <FeatureCard
              icon={<Calendar className="w-6 h-6 text-blue-600" />}
              title="Create Event"
              desc="Connect your Google calendar and define your event types with custom rules."
            />
            <FeatureCard
              icon={<Globe className="w-6 h-6 text-blue-600" />}
              title="Share Link"
              desc="Share your booking link via email or embed it on your website."
            />
            <FeatureCard
              icon={<CheckCircle2 className="w-6 h-6 text-blue-600" />}
              title="Get Booked"
              desc="They pick a time and the event is added to your calendar instantly."
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// Simple internal component for the features
function FeatureCard({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition">
      <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-6">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <p className="text-gray-500 leading-relaxed">{desc}</p>
    </div>
  );
}
