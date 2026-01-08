// components/AvailabilityDayCard.tsx
import { Plus, Trash2 } from "lucide-react";
import type { DailyAvailability, AvailabilitySlot } from "../types";

interface Props {
  day: DailyAvailability;
  dayIndex: number;
  onToggle: (idx: number) => void;
  onSlotUpdate: (
    dIdx: number,
    sIdx: number,
    field: keyof AvailabilitySlot,
    val: string
  ) => void;
  onAddSlot: (idx: number) => void;
  onRemoveSlot: (dIdx: number, sIdx: number) => void;
}

export function AvailabilityDayCard({
  day,
  dayIndex,
  onToggle,
  onSlotUpdate,
  onAddSlot,
  onRemoveSlot,
}: Props) {
  return (
    <div
      className={`bg-white dark:bg-gray-800 border rounded-lg shadow-sm p-4 space-y-4 transition-colors ${
        day.isAvailable
          ? "border-gray-200 dark:border-gray-700"
          : "border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50"
      }`}
    >
      <div className="flex items-center justify-between gap-2">
        <span
          className={`text-lg font-semibold ${
            day.isAvailable
              ? "text-gray-800 dark:text-white"
              : "text-gray-400 dark:text-gray-500"
          }`}
        >
          {day.label}
        </span>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            className="sr-only peer"
            checked={day.isAvailable}
            onChange={() => onToggle(dayIndex)}
          />
          <div
            className="w-11 h-6 bg-gray-200 dark:bg-gray-700 peer-focus:outline-none rounded-full peer 
  peer-checked:after:translate-x-full peer-checked:after:border-white 
  after:content-[''] after:absolute 
  after:top-[2px] after:left-[2px] 
  after:bg-white after:border-gray-300 dark:after:border-gray-600 after:border after:rounded-full 
  after:h-5 after:w-5 after:transition-all 
  peer-checked:bg-green-500 dark:peer-checked:bg-green-600"
          ></div>
        </label>
      </div>

      {!day.isAvailable ? (
        <p className="text-sm text-gray-400 dark:text-gray-500 italic">
          Unavailable
        </p>
      ) : (
        <div className="space-y-3">
          {day.slots.map((slot, slotIndex) => (
            <div
              key={`${day.weekday}-${slotIndex}`}
              className="flex items-center gap-2"
            >
              <input
                type="time"
                value={slot.start}
                onChange={(e) =>
                  onSlotUpdate(dayIndex, slotIndex, "start", e.target.value)
                }
                className="flex-1 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500"
              />
              <span className="text-gray-500 dark:text-gray-400 text-sm">
                to
              </span>
              <input
                type="time"
                value={slot.end}
                onChange={(e) =>
                  onSlotUpdate(dayIndex, slotIndex, "end", e.target.value)
                }
                className="flex-1 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500"
              />
              {day.slots.length > 1 && (
                <button
                  onClick={() => onRemoveSlot(dayIndex, slotIndex)}
                  className="p-2 text-gray-400 dark:text-gray-500 hover:text-red-600 dark:hover:text-red-400 rounded-md hover:bg-red-50 dark:hover:bg-red-900/30 transition"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>
          ))}
          <button
            onClick={() => onAddSlot(dayIndex)}
            className="inline-flex items-center gap-2 text-sm text-blue-700 dark:text-blue-400 border border-blue-200 dark:border-blue-800 px-3 py-2 rounded-md hover:bg-blue-50 dark:hover:bg-blue-900/30 transition"
          >
            <Plus className="w-4 h-4" /> Add time slot
          </button>
        </div>
      )}
    </div>
  );
}
