import { useEffect, useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { CalendarDays, Loader2, Wand2, AlertCircle } from "lucide-react";
import toast from "react-hot-toast";

import { api } from "../lib/api";
import { useEventTypes } from "../hooks/useEventTypes";
import {
  convertScheduleToRules,
  normalizeSchedule,
  useAvailabilitySchedule,
} from "../hooks/useAvailabilitySchedule";

import { AvailabilityDayCard } from "../components/AvailabilityDayCard";
import { SaveAvailabilityButton } from "../components/SaveAvailabilityButton";

export default function Availability() {
  const {
    events,
    loading: eventsLoading,
    error: eventsError,
  } = useEventTypes();
  const [searchParams, setSearchParams] = useSearchParams();

  const {
    schedule,
    setSchedule,
    toggleDay,
    updateSlot,
    addSlot,
    removeSlot,
    applyTemplateToAll,
  } = useAvailabilitySchedule();

  const [fetchingSchedule, setFetchingSchedule] = useState(false);
  const [saving, setSaving] = useState(false);

  const selectedEventId = useMemo(() => {
    const paramId = searchParams.get("eventId");
    if (paramId) return Number(paramId);
    if (events.length > 0) return events[0].id;
    return null;
  }, [searchParams, events]);

  const handleEventChange = (id: string) => {
    setSearchParams({ eventId: id });
  };

  useEffect(() => {
    if (!selectedEventId) return;

    let isMounted = true;
    setFetchingSchedule(true);

    const fetchAvailability = async () => {
      try {
        const { data } = await api.get(`/event-types/${selectedEventId}`);

        if (isMounted) {
          setSchedule(normalizeSchedule(data?.availability_rules));
        }
      } catch (err: any) {
        if (isMounted) {
          console.error(err);
          toast.error("Could not load availability");
          setSchedule(normalizeSchedule([]));
        }
      } finally {
        if (isMounted) {
          setFetchingSchedule(false);
        }
      }
    };

    fetchAvailability();

    return () => {
      isMounted = false;
    };
  }, [selectedEventId, setSchedule]);

  const handleSave = async () => {
    if (!selectedEventId) return toast.error("Select an event type first");

    setSaving(true);
    try {
      const payload = convertScheduleToRules(schedule);
      await api.patch(`/event-types/${selectedEventId}/availability`, payload);
      toast.success("Availability saved successfully");
    } catch (err: any) {
      const msg = err?.response?.data?.detail || "Failed to save settings";
      toast.error(msg);
    } finally {
      setSaving(false);
    }
  };

  if (eventsError) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-red-600 dark:text-red-400">
        <AlertCircle className="w-8 h-8 mb-2" />
        <p>Failed to load event types.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-10">
      <div className="flex flex-col gap-1">
        <h1 className="flex items-center gap-2 text-2xl font-bold text-gray-900 dark:text-white">
          <CalendarDays className="w-6 h-6 text-blue-600 dark:text-blue-500" />
          Availability
        </h1>
        <p className="text-gray-500 dark:text-gray-400">
          Configure your weekly schedule for each event type.
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 flex flex-col md:flex-row gap-4 items-end md:items-center justify-between">
        <div className="w-full md:w-auto">
          <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1.5">
            Event Type
          </label>
          <div className="relative">
            <select
              value={selectedEventId ?? ""}
              onChange={(e) => handleEventChange(e.target.value)}
              className="w-full md:w-72 pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              disabled={eventsLoading || events.length === 0}
            >
              {!eventsLoading && events.length === 0 && (
                <option>No events found</option>
              )}
              {events.map((e) => (
                <option key={e.id} value={e.id}>
                  {e.name} ({e.duration_minutes} min)
                </option>
              ))}
            </select>
            {eventsLoading && (
              <div className="absolute right-8 top-2.5">
                <Loader2 className="w-4 h-4 animate-spin text-gray-400 dark:text-gray-500" />
              </div>
            )}
          </div>
        </div>

        <button
          onClick={() => applyTemplateToAll()}
          disabled={fetchingSchedule}
          className="text-blue-600 dark:text-blue-400 text-sm font-medium hover:bg-blue-50 dark:hover:bg-blue-900/30 px-4 py-2 rounded-lg transition-colors flex items-center gap-2 disabled:opacity-50"
        >
          <Wand2 className="w-4 h-4" />
          Apply 9-5 to all days
        </button>
      </div>

      {fetchingSchedule ? (
        <div className="flex flex-col items-center justify-center py-20 gap-3 text-gray-500 dark:text-gray-400">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600 dark:text-blue-500" />
          <p className="text-sm font-medium">Loading schedule...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {schedule.map((day, idx) => (
            <AvailabilityDayCard
              key={day.weekday}
              day={day}
              dayIndex={idx}
              onToggle={toggleDay}
              onSlotUpdate={updateSlot}
              onAddSlot={addSlot}
              onRemoveSlot={removeSlot}
            />
          ))}
        </div>
      )}

      <div className="flex justify-end pt-4 border-t border-gray-100 dark:border-gray-700">
        <SaveAvailabilityButton
          onClick={handleSave}
          loading={saving}
          disabled={eventsLoading || fetchingSchedule || !selectedEventId}
        />
      </div>
    </div>
  );
}
