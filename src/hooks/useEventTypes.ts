import { useState, useEffect, useCallback } from "react";
import { api } from "../lib/api";
import type { EventType } from "../types";

export function useEventTypes() {
  const [events, setEvents] = useState<EventType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    const fetchEvents = async () => {
      try {
        const { data } = await api.get<EventType[]>("/event-types/");
        if (mounted) setEvents(data);
      } catch (err) {
        console.error(err);
        if (mounted) setError("Failed to load events");
      } finally {
        if (mounted) setLoading(false);
      }
    };
    fetchEvents();
    return () => {
      mounted = false;
    };
  }, []);

  const toggleEventStatus = useCallback(
    async (id: number, currentStatus: boolean) => {
      const previousEvents = [...events];

      setEvents((prev) =>
        prev.map((e) => (e.id === id ? { ...e, is_active: !currentStatus } : e))
      );

      try {
        await api.patch(`/event-types/${id}`, { is_active: !currentStatus });
      } catch (err) {
        console.error("Failed to update status", err);
        setEvents(previousEvents);
      }
    },
    [events]
  );

  return { events, loading, error, toggleEventStatus };
}
