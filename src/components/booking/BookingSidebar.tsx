import { format, parseISO } from "date-fns";
import {
  Clock,
  Globe,
  Calendar as CalIcon,
  ChevronLeft,
  User,
} from "lucide-react";

interface BookingSidebarProps {
  slug: string;
  hostName: string;
  name: string;
  duration: number;
  selectedSlot: { start: string; end: string } | null;
  showBackButton: boolean;
  onBack: () => void;
  isLoading: boolean;
}

export const BookingSidebar = ({
  hostName,
  name,
  duration,
  selectedSlot,
  showBackButton,
  isLoading,
  onBack,
}: BookingSidebarProps) => {
  const formatTime = (isoString: string) =>
    format(parseISO(isoString), "HH:mm");

  return (
    <div className="md:w-1/3 bg-white dark:bg-gray-800 p-8 border-r border-gray-200 dark:border-gray-700">
      {showBackButton && (
        <button
          onClick={onBack}
          className="mb-6 w-10 h-10 rounded-full border border-gray-200 dark:border-gray-700 flex items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-700"
        >
          <ChevronLeft className="w-5 h-5 text-blue-600" />
        </button>
      )}

      <h4 className="text-gray-500 font-medium mb-2 flex items-center gap-2">
        <User className="w-4 h-4" />{" "}
        {!isLoading ? (
          hostName
        ) : (
          <span className="h-4 w-32 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></span>
        )}
      </h4>

      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 capitalize">
        {!isLoading ? (
          name
        ) : (
          <span className="inline-block h-9 w-48 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></span>
        )}
      </h1>

      <div className="space-y-4 text-gray-600 dark:text-gray-400">
        <div className="flex items-center gap-3">
          <Clock className="w-5 h-5 text-gray-400 dark:text-gray-500" />
          {!isLoading ? (
            <span>{duration} min</span>
          ) : (
            <span className="h-5 w-16 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></span>
          )}
        </div>

        {selectedSlot && (
          <div className="flex items-center gap-3 text-green-600 font-semibold animate-in fade-in slide-in-from-left-2">
            <CalIcon className="w-5 h-5" />
            <span>
              {format(parseISO(selectedSlot.start), "EEEE, MMMM d, yyyy")}
              <br />
              {formatTime(selectedSlot.start)} - {formatTime(selectedSlot.end)}
            </span>
          </div>
        )}

        <div className="flex items-center gap-3">
          <Globe className="w-5 h-5 text-gray-400 dark:text-gray-500" />
          <span>Asia/Almaty</span>
        </div>
      </div>
    </div>
  );
};
