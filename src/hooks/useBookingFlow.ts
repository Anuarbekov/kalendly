import { useState } from "react";
import type { TimeSlot } from "../types";

type ViewState = "calendar" | "form";

export function useBookingFlow() {
  const [view, setView] = useState<ViewState>("calendar");
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null);

  const selectSlot = (slot: TimeSlot) => {
    setSelectedSlot(slot);
    setView("form");
  };

  const goBackToCalendar = () => {
    setView("calendar");
    setSelectedSlot(null);
  };

  return {
    view,
    selectedSlot,
    selectSlot,
    goBackToCalendar,
  };
}
