import { Calendar, CheckCircle2, Globe } from "lucide-react";

export const Features = () => {
  return (
    <div
      id="features"
      className="bg-gray-50 dark:bg-gray-950 py-24 border-t border-gray-100 dark:border-gray-800"
    >
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-center text-3xl font-bold mb-16 text-gray-900 dark:text-white">
          How it works
        </h2>

        <div className="grid md:grid-cols-3 gap-10">
          <FeatureCard
            icon={
              <Calendar className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            }
            title="Create Event"
            desc="Connect your Google calendar and define your event types with custom rules."
          />
          <FeatureCard
            icon={
              <Globe className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            }
            title="Share Link"
            desc="Share your booking link via email or embed it on your website."
          />
          <FeatureCard
            icon={
              <CheckCircle2 className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            }
            title="Get Booked"
            desc="They pick a time and the event is added to your calendar instantly."
          />
        </div>
      </div>
    </div>
  );
};

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
    <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 hover:shadow-md transition">
      <div className="w-12 h-12 bg-blue-50 dark:bg-gray-800 rounded-xl flex items-center justify-center mb-6">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">
        {title}
      </h3>
      <p className="text-gray-500 dark:text-gray-400 leading-relaxed">{desc}</p>
    </div>
  );
}
