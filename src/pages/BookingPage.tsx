import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BookingSidebar } from "../components/booking/BookingSidebar";
import { TimeSelector } from "../components/booking/TimeSelector";
import { BookingForm } from "../components/booking/BookingForm";
import { api } from "../lib/api";

interface TimeSlot {
  start: string;
  end: string;
}
interface EventDetails {
  name: string;
  host_name: string;
  duration_minutes: number;
}
export default function BookingPage() {
  const { slug } = useParams<{ slug: string }>();
  const currentSlug = slug || "30-min-tutoring";

  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null);
  const [view, setView] = useState<"calendar" | "form">("calendar");
  const [eventDetails, setEventDetails] = useState<EventDetails | null>(null);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const { data } = await api.get<EventDetails>(
          `/public/${currentSlug}/details`
        );
        setEventDetails(data);
      } catch (error) {
        console.error("Failed to fetch event details");
      }
    };
    fetchDetails();
  }, [currentSlug]);
  const handleSlotSelect = (slot: TimeSlot) => {
    setSelectedSlot(slot);
    setView("form");
  };

  const handleBack = () => {
    setView("calendar");
    setSelectedSlot(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-5xl w-full flex flex-col md:flex-row overflow-hidden min-h-[600px]">
        <BookingSidebar
          slug={currentSlug}
          hostName={eventDetails?.host_name || ""}
          name={eventDetails?.name || ""}
          duration={eventDetails?.duration_minutes || 0}
          selectedSlot={selectedSlot}
          showBackButton={view === "form"}
          onBack={handleBack}
        />

        <div className="md:w-2/3 p-8 bg-white relative">
          {view === "calendar" ? (
            <TimeSelector
              currentSlug={currentSlug}
              onSlotSelect={handleSlotSelect}
            />
          ) : (
            selectedSlot && (
              <BookingForm
                key={selectedSlot.start}
                currentSlug={currentSlug}
                selectedSlot={selectedSlot}
              />
            )
          )}
        </div>
      </div>
    </div>
  );
}
