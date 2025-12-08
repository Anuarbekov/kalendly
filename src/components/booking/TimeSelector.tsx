import { useState, useEffect } from "react";
import { format, parseISO } from "date-fns";
import { DayPicker } from "react-day-picker";
import { api } from "../../lib/api";
import { cn } from "../../lib/utils";
import "react-day-picker/dist/style.css";

interface TimeSlot {
  start: string;
  end: string;
}

interface TimeSelectorProps {
  currentSlug: string;
  onSlotSelect: (slot: TimeSlot) => void;
}

export const TimeSelector = ({
  currentSlug,
  onSlotSelect,
}: TimeSelectorProps) => {
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [slots, setSlots] = useState<TimeSlot[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedSlotLocal, setSelectedSlotLocal] = useState<TimeSlot | null>(
    null
  );

  // Fetch slots only when date changes
  useEffect(() => {
    if (!selectedDate) return;

    const fetchSlots = async () => {
      setLoading(true);
      setSlots([]);
      setSelectedSlotLocal(null);

      try {
        const dateStr = format(selectedDate, "yyyy-MM-dd");
        const response = await api.get<TimeSlot[]>(
          `/public/${currentSlug}/slots?date=${dateStr}`
        );
        setSlots(response.data);
      } catch (error) {
        console.error("Failed to fetch slots", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSlots();
  }, [selectedDate, currentSlug]);

  const formatTime = (isoString: string) =>
    format(parseISO(isoString), "HH:mm");

  return (
    <div className="flex flex-col md:flex-row gap-8 h-full animate-in fade-in duration-500">
      {/* 1. Date Picker */}
      <div
        className={cn(
          "flex-1 flex justify-center",
          selectedDate ? "md:border-r border-gray-100" : ""
        )}
      >
        <DayPicker
          mode="single"
          selected={selectedDate}
          onSelect={setSelectedDate}
          disabled={[{ before: new Date() }]}
          showOutsideDays
          fixedWeeks
          classNames={{
            day_selected:
              "bg-blue-600 text-white hover:bg-blue-600 focus:bg-blue-600 rounded-full",
            day_today: "font-bold text-blue-600",
          }}
        />
      </div>

      {/* 2. Slots List */}
      {selectedDate && (
        <div className="w-full md:w-[280px] animate-in fade-in slide-in-from-right-4 duration-300">
          <h3 className="text-gray-900 mb-4 font-medium sticky top-0 bg-white pb-2">
            {format(selectedDate, "EEEE, MMM d")}
          </h3>

          <div className="space-y-2 h-[400px] overflow-y-auto pr-2 custom-scrollbar">
            {loading ? (
              <div className="text-center py-10 text-gray-400">Loading...</div>
            ) : slots.length === 0 ? (
              <div className="text-center py-10 text-gray-400">
                No slots available
              </div>
            ) : (
              slots.map((slot) => {
                const timeLabel = formatTime(slot.start);
                const isSelected = selectedSlotLocal?.start === slot.start;

                return (
                  <div key={slot.start} className="flex gap-2">
                    {isSelected ? (
                      <div className="flex-1 flex gap-2">
                        <button className="bg-gray-600 text-white w-1/2 py-3 rounded font-bold cursor-default">
                          {timeLabel}
                        </button>
                        <button
                          onClick={() => onSlotSelect(slot)}
                          className="bg-blue-600 hover:bg-blue-700 text-white w-1/2 py-3 rounded font-bold transition-colors"
                        >
                          Next
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => setSelectedSlotLocal(slot)}
                        className="w-full border border-blue-200 text-blue-600 font-bold py-3 rounded hover:border-blue-600 hover:bg-blue-50 transition-all"
                      >
                        {timeLabel}
                      </button>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
};
