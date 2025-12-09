import { Plus } from "lucide-react";
import { EventCard } from "../components/EventCard";
import { useEventTypes } from "../hooks/useEventTypes";
import { useEventActions } from "../hooks/useEventActions";

export default function Dashboard() {
  const { events, loading, error, toggleEventStatus } = useEventTypes();
  const { copyEventLink } = useEventActions();

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-light text-gray-800">Event Types</h1>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full flex items-center gap-2 transition">
          <Plus className="w-4 h-4" /> Create Event Type
        </button>
      </div>
      {error && <div className="text-red-500 text-center p-10">{error}</div>}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <EventCard
            key={event.id}
            event={event}
            onCopy={copyEventLink}
            onToggle={(id: number) => toggleEventStatus(id, event.is_active)}
          />
        ))}
        {loading && (
          <div className="p-10 text-center text-gray-500">
            Loading your events...
          </div>
        )}
      </div>
    </div>
  );
}
