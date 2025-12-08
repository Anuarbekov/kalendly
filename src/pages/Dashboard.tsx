import { useCallback, useEffect, useState } from "react";
import { api } from "../lib/api";
import { Plus } from "lucide-react";
import { EventCard } from "../components/EventCard";
export interface EventType {
  id: number;
  name: string;
  slug: string;
  duration_minutes: number;
  is_active: boolean;
  location_type: string;
  location_value?: string;
}

export default function Dashboard() {
  const [events, setEvents] = useState<EventType[]>([]);
  const [loading, setLoading] = useState(true);

  const handleCopyLink = useCallback((slug: string) => {
    const link = `${window.location.origin}/event/${slug}`;
    navigator.clipboard.writeText(link);
    alert("Link copied to clipboard!");
  }, []);

  const handleToggleActive = useCallback(
    async (id: number, currentStatus: boolean) => {
      setEvents(
        events.map((e) =>
          e.id === id ? { ...e, is_active: !currentStatus } : e
        )
      );

      try {
      } catch (err) {
        console.error("Failed to update status");
        setEvents(
          events.map((e) =>
            e.id === id ? { ...e, is_active: currentStatus } : e
          )
        );
      }
    },
    []
  );

  useEffect(() => {
    const fetchEventTypes = async () => {
      try {
        const response = await api.get<EventType[]>("/event-types/");
        setEvents(response.data);
      } catch (error) {
        console.error("Failed to load event types", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEventTypes();
  }, []);

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-light text-gray-800">Event Types</h1>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full flex items-center gap-2 transition">
          <Plus className="w-4 h-4" /> Create Event Type
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <EventCard
            key={event.id}
            event={event}
            onCopy={handleCopyLink}
            onToggle={handleToggleActive}
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
