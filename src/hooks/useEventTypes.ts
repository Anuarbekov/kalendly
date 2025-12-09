import { useState, useEffect, useCallback } from "react";
import { api } from "../lib/api";
import type { EventType } from "../types";
import toast from "react-hot-toast";

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
  const createEventType = async (data: {
    name: string;
    slug: string;
    duration_minutes: number;
  }) => {
    try {
      const res = await api.post("/event-types", data);
      setEvents((prev) => [...prev, res.data]);
      toast.success("Event type created!");
      return true;
    } catch (err: any) {
      console.error(err);
      const msg = err.response?.data?.detail || "Failed to create event type";
      toast.error(msg);
      return false;
    }
  };
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
  const deleteEventType = async (id: number) => {
    try {
      await api.delete(`/event-types/${id}`);
      setEvents((prev) => prev.filter((e) => e.id !== id));
      toast.success("Event type deleted");
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete event");
    }
  };
  return {
    events,
    loading,
    error,
    toggleEventStatus,
    createEventType,
    deleteEventType,
  };
}
