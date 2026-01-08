import { Plus } from "lucide-react";
import { EventCard } from "../components/EventCard";
import { useEventTypes } from "../hooks/useEventTypes";
import { useEventActions } from "../hooks/useEventActions";
import { CreateEventModal } from "../components/CreateEventModal";
import { useState } from "react";

export default function Dashboard() {
  const {
    events,
    loading,
    error,
    toggleEventStatus,
    createEventType,
    deleteEventType,
  } = useEventTypes();
  const { copyEventLink } = useEventActions();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-light text-gray-800 dark:text-white">
          Event Types
        </h1>

        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white px-4 py-2 rounded-full flex items-center gap-2 transition"
        >
          <Plus className="w-4 h-4" /> Create Event Type
        </button>
      </div>
      {error && (
        <div className="text-red-500 dark:text-red-400 text-center p-10">
          {error}
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <EventCard
            key={event.id}
            event={event}
            onCopy={copyEventLink}
            onToggle={toggleEventStatus}
            onDelete={deleteEventType}
          />
        ))}
        {loading && (
          <div className="p-10 text-center text-gray-500 dark:text-gray-400">
            Loading your events...
          </div>
        )}
      </div>
      <CreateEventModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={createEventType}
      />
    </div>
  );
}
