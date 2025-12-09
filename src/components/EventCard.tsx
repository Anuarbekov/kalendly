import { memo } from "react";
import { Link } from "react-router-dom";
import { Clock, Copy, ExternalLink, MapPin, Trash2 } from "lucide-react";
import type { EventCardProps } from "../types";

export const EventCard = memo(
  ({ event, onCopy, onToggle, onDelete }: EventCardProps) => {
    return (
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-all group relative flex flex-col h-full">
        <div
          className={`h-1.5 w-full rounded-t-lg transition-colors ${
            event.is_active ? "bg-purple-600" : "bg-gray-300"
          }`}
        />

        <div className="p-6 flex-1 flex flex-col">
          <div className="flex justify-between items-start mb-2 gap-4">
            <h3 className="text-lg font-bold text-gray-900 leading-tight">
              {event.name}
            </h3>
            <span className="shrink-0 bg-gray-100 text-gray-600 text-xs font-medium px-2 py-1 rounded-full flex items-center gap-1">
              <Clock className="w-3 h-3" /> {event.duration_minutes} min
            </span>
          </div>

          <Link
            to={`/event/${event.slug}`}
            target="_blank"
            rel="noreferrer"
            className="text-gray-500 hover:text-blue-600 text-sm mb-4 flex items-center gap-1 transition-colors"
          >
            View Booking Page <ExternalLink className="w-3 h-3" />
          </Link>

          <p className="text-gray-500 text-sm mt-auto flex items-center gap-2">
            <MapPin className="w-3 h-3" /> {event.location_type}
          </p>
        </div>
        <div className="border-t border-gray-100 p-4 flex justify-between items-center bg-gray-50 rounded-b-lg">
          <button
            onClick={() => onCopy(event.slug)}
            className="text-blue-600 text-sm font-medium flex items-center gap-2 hover:bg-blue-50 px-2 py-1.5 rounded transition-colors"
          >
            <Copy className="w-4 h-4" />{" "}
            <span className="hidden sm:inline">Copy Link</span>
          </button>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                if (
                  window.confirm(
                    "Are you sure you want to delete this event type?"
                  )
                ) {
                  onDelete(event.id);
                }
              }}
              className="text-gray-400 hover:text-red-600 p-1.5 rounded-md hover:bg-red-50 transition-colors"
              title="Delete Event Type"
            >
              <Trash2 className="w-4 h-4" />
            </button>

            <div className="h-4 w-px bg-gray-300"></div>

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
  }
);
