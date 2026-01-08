import { memo } from "react";
import { Link } from "react-router-dom";
import {
  CalendarDays,
  Clock,
  Copy,
  ExternalLink,
  MapPin,
  Trash2,
} from "lucide-react";
import type { EventCardProps } from "../types";

export const EventCard = memo(
  ({ event, onCopy, onToggle, onDelete }: EventCardProps) => {
    return (
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm hover:shadow-md transition-all group relative flex flex-col h-full">
        <div
          className={`h-1.5 w-full rounded-t-lg transition-colors ${
            event.is_active
              ? "bg-purple-600 dark:bg-purple-500"
              : "bg-gray-300 dark:bg-gray-600"
          }`}
        />

        <div className="p-6 flex-1 flex flex-col">
          <div className="flex justify-between items-start mb-2 gap-4">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white leading-tight">
              {event.name}
            </h3>
            <span className="shrink-0 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs font-medium px-2 py-1 rounded-full flex items-center gap-1">
              <Clock className="w-3 h-3" /> {event.duration_minutes} min
            </span>
          </div>

          {event.is_active ? (
            <Link
              to={`/event/${event.slug}`}
              target="_blank"
              rel="noreferrer"
              className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 text-sm mb-4 flex items-center gap-1 transition-colors"
            >
              View Booking Page <ExternalLink className="w-3 h-3" />
            </Link>
          ) : (
            <div className="text-gray-400 dark:text-gray-600 text-sm mb-4 flex items-center gap-1 cursor-not-allowed">
              View Booking Page <ExternalLink className="w-3 h-3" />
            </div>
          )}

          <p className="text-gray-500 dark:text-gray-400 text-sm mt-auto flex items-center gap-2">
            <MapPin className="w-3 h-3" /> {event.location_type}
          </p>
        </div>
        <div className="border-t border-gray-100 dark:border-gray-700 p-4 flex justify-between items-center bg-gray-50 dark:bg-gray-900/50 rounded-b-lg">
          {event.is_active ? (
            <button
              onClick={() => onCopy(event.slug)}
              className="text-blue-600 dark:text-blue-400 text-sm font-medium flex items-center gap-2 hover:bg-blue-50 dark:hover:bg-blue-900/30 px-2 py-1.5 rounded transition-colors"
            >
              <Copy className="w-4 h-4" />{" "}
              <span className="hidden sm:inline">Copy Link</span>
            </button>
          ) : (
            <button
              disabled
              className="text-gray-400 dark:text-gray-600 text-sm font-medium flex items-center gap-2 px-2 py-1.5 rounded transition-colors cursor-not-allowed opacity-50"
            >
              <Copy className="w-4 h-4" />{" "}
              <span className="hidden sm:inline">Copy Link</span>
            </button>
          )}

          <div className="flex items-center gap-3">
            {event.is_active ? (
              <Link
                to={`/availability?eventId=${event.id}`}
                className="text-purple-600 dark:text-purple-400 text-sm font-medium flex items-center gap-2 hover:bg-purple-50 dark:hover:bg-purple-900/30 px-2 py-1.5 rounded transition-colors"
              >
                <CalendarDays className="w-4 h-4" />
                <span className="hidden sm:inline">Availability</span>
              </Link>
            ) : (
              <div className="text-gray-400 dark:text-gray-600 text-sm font-medium flex items-center gap-2 px-2 py-1.5 rounded transition-colors cursor-not-allowed opacity-50">
                <CalendarDays className="w-4 h-4" />
                <span className="hidden sm:inline">Availability</span>
              </div>
            )}

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
              className="text-gray-400 dark:text-gray-500 hover:text-red-600 dark:hover:text-red-400 p-1.5 rounded-md hover:bg-red-50 dark:hover:bg-red-900/30 transition-colors"
              title="Delete Event Type"
            >
              <Trash2 className="w-4 h-4" />
            </button>

            <div className="h-4 w-px bg-gray-300 dark:bg-gray-600"></div>

            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={event.is_active}
                onChange={() => onToggle(event.id, event.is_active)}
                className="sr-only peer"
              />
              <div className="w-9 h-5 bg-gray-200 dark:bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-gray-300 dark:after:border-gray-600 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-green-500 dark:peer-checked:bg-green-600"></div>
            </label>
          </div>
        </div>
      </div>
    );
  }
);
