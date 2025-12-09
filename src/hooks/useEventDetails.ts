import { useState, useEffect } from "react";
import { api } from "../lib/api";

interface EventDetails {
  name: string;
  host_name: string;
  duration_minutes: number;
}

export function useEventDetails(slug: string) {
  const [eventDetails, setEventDetails] = useState<EventDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let mounted = true;

    const fetchDetails = async () => {
      setIsLoading(true);
      try {
        const { data } = await api.get<EventDetails>(`/public/${slug}/details`);
        if (mounted) setEventDetails(data);
      } catch (err) {
        if (mounted)
          setError(err instanceof Error ? err : new Error("Unknown error"));
      } finally {
        if (mounted) setIsLoading(false);
      }
    };

    fetchDetails();

    return () => {
      mounted = false;
    };
  }, [slug]);

  return { eventDetails, isLoading, error };
}
