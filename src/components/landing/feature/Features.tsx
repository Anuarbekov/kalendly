import { Calendar, CheckCircle2, Globe } from "lucide-react";
import { FeatureCard } from "./FeatureCard";

export const Features = () => {
  return (
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
  );
};
