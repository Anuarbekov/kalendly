import { memo } from "react";
import { Link } from "react-router-dom";
import { Clock, Copy, ExternalLink, MapPin } from "lucide-react";
import type { EventCardProps } from "./types";

export const EventCard = memo(({ event, onCopy, onToggle }: EventCardProps) => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow group relative flex flex-col">
      <div
        className={`h-1.5 w-full rounded-t-lg ${
          event.is_active ? "bg-purple-600" : "bg-gray-300"
        }`}
      />

      <div className="p-6 flex-1">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-lg font-bold text-gray-900">{event.name}</h3>
          <span className="text-gray-400 text-sm flex items-center gap-1">
            <Clock className="w-4 h-4" /> {event.duration_minutes}m
          </span>
        </div>

        <p className="text-gray-500 text-sm mb-4 flex items-center gap-2">
          <MapPin className="w-3 h-3" /> {event.location_type}
        </p>

        <Link
          to={`/event/${event.slug}`}
          className="text-blue-600 text-sm hover:underline flex items-center gap-1 mb-6"
        >
          View Booking Page <ExternalLink className="w-3 h-3" />
        </Link>
      </div>

      <div className="border-t border-gray-100 p-4 flex justify-between items-center bg-gray-50 rounded-b-lg">
        <button
          onClick={() => onCopy(event.slug)}
          className="text-blue-600 text-sm font-medium flex items-center gap-2 hover:bg-blue-100 px-2 py-1 rounded transition-colors"
        >
          <Copy className="w-4 h-4" /> Copy Link
        </button>

        <div className="flex items-center gap-2">
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={event.is_active}
              onChange={() => onToggle(event.id, event.is_active)}
              className="sr-only peer"
            />
            <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-green-500"></div>
          </label>
        </div>
      </div>
    </div>
  );
});
