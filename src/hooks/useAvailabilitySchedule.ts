// hooks/useAvailabilitySchedule.ts
import { useState, useCallback } from "react";
import type {
  AvailabilityRule,
  DailyAvailability,
  AvailabilitySlot,
} from "../types";

const WEEKDAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const createDefaultSchedule = (): DailyAvailability[] =>
  Array.from({ length: 7 }, (_, idx) => ({
    date: "",
    label: WEEKDAYS[idx],
    weekday: idx,
    isAvailable: false,
    slots: [{ start: "09:00", end: "17:00" }],
  }));

export const normalizeSchedule = (
  rules: AvailabilityRule[] = []
): DailyAvailability[] => {
  const base = createDefaultSchedule();
  return base.map((day) => {
    const matchingRules = rules.filter((r) => r.weekday === day.weekday);
    if (matchingRules.length > 0) {
      return {
        ...day,
        isAvailable: true,
        slots: matchingRules.map((r) => ({
          start: r.start_time?.slice(0, 5) || "09:00",
          end: r.end_time?.slice(0, 5) || "17:00",
        })),
      };
    }
    return day;
  });
};

export const convertScheduleToRules = (
  schedule: DailyAvailability[]
): AvailabilityRule[] => {
  const rules: AvailabilityRule[] = [];
  schedule.forEach((day) => {
    if (day.isAvailable && day.slots.length > 0) {
      day.slots.forEach((slot) => {
        rules.push({
          weekday: day.weekday,
          start_time: slot.start,
          end_time: slot.end,
        });
      });
    }
  });
  return rules;
};

export function useAvailabilitySchedule() {
  const [schedule, setSchedule] = useState<DailyAvailability[]>(
    createDefaultSchedule()
  );
  const updateDay = useCallback(
    (
      dayIndex: number,
      updater: (day: DailyAvailability) => DailyAvailability
    ) => {
      setSchedule((prev) =>
        prev.map((day, idx) => (idx === dayIndex ? updater(day) : day))
      );
    },
    []
  );

  const toggleDay = (dayIndex: number) => {
    updateDay(dayIndex, (day) => {
      const newIsAvailable = !day.isAvailable;
      return {
        ...day,
        isAvailable: newIsAvailable,
        // When toggling off, clear all slots
        // When toggling on, add default slot if none exist
        slots: newIsAvailable
          ? day.slots.length > 0
            ? day.slots
            : [{ start: "09:00", end: "17:00" }]
          : [],
      };
    });
  };

  const updateSlot = (
    dayIndex: number,
    slotIndex: number,
    field: keyof AvailabilitySlot,
    value: string
  ) => {
    updateDay(dayIndex, (day) => ({
      ...day,
      slots: day.slots.map((slot, idx) =>
        idx === slotIndex ? { ...slot, [field]: value } : slot
      ),
    }));
  };

  const addSlot = (dayIndex: number) => {
    updateDay(dayIndex, (day) => ({
      ...day,
      slots: [...day.slots, { start: "09:00", end: "17:00" }],
    }));
  };

  const removeSlot = (dayIndex: number, slotIndex: number) => {
    updateDay(dayIndex, (day) => {
      const newSlots = day.slots.filter((_, idx) => idx !== slotIndex);
      return {
        ...day,
        slots: newSlots.length ? newSlots : [{ start: "09:00", end: "17:00" }],
      };
    });
  };

  const applyTemplateToAll = (start = "09:00", end = "17:00") => {
    setSchedule((prev) =>
      prev.map((day) => ({
        ...day,
        isAvailable: true,
        slots: [{ start, end }],
      }))
    );
  };

  return {
    schedule,
    setSchedule,
    toggleDay,
    updateSlot,
    addSlot,
    removeSlot,
    applyTemplateToAll,
  };
}
