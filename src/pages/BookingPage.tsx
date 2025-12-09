import { useParams } from "react-router-dom";
import { BookingSidebar } from "../components/booking/BookingSidebar";
import { TimeSelector } from "../components/booking/TimeSelector";
import { BookingForm } from "../components/booking/BookingForm";

import { useEventDetails } from "../hooks/useEventDetails";
import { useBookingFlow } from "../hooks/useBookingFlow";

export default function BookingPage() {
  const { slug } = useParams<{ slug: string }>();
  const currentSlug = slug || "30-min-tutoring";

  const { eventDetails, isLoading, error } = useEventDetails(currentSlug);
  const { view, selectedSlot, selectSlot, goBackToCalendar } = useBookingFlow();

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
          onBack={goBackToCalendar}
        />

        <div className="md:w-2/3 p-8 bg-white relative">
          {view === "calendar" ? (
            <TimeSelector currentSlug={currentSlug} onSlotSelect={selectSlot} />
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
