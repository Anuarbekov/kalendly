import { useState } from "react";
import { api } from "../../lib/api";
import type { TimeSlot } from "../../types";

interface BookingFormProps {
  currentSlug: string;
  selectedSlot: TimeSlot;
}

export const BookingForm = ({
  currentSlug,
  selectedSlot,
}: BookingFormProps) => {
  const [formData, setFormData] = useState({ name: "", email: "", notes: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const payload = {
        start_datetime: selectedSlot.start,
        end_datetime: selectedSlot.end,
        invitee_name: formData.name,
        invitee_email: formData.email,
        invitee_note: formData.notes,
      };

      await api.post(`/public/${currentSlug}/book`, payload);
      alert("Booking Confirmed! Check your email.");
      window.location.href = "/";
    } catch (error: any) {
      console.error("Booking failed", error);
      const msg = error.response?.data?.detail
        ? JSON.stringify(error.response.data.detail)
        : "Booking failed. Please try again.";
      alert(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-md mx-auto animate-in fade-in slide-in-from-right-8 duration-300">
      <h2 className="text-xl font-bold mb-4">Enter Details</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Name
          </label>
          <input
            required
            className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 outline-none"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            required
            type="email"
            className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 outline-none"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Notes
          </label>
          <textarea
            className="w-full border border-gray-300 rounded-lg p-2.5 h-24 focus:ring-2 focus:ring-blue-500 outline-none resize-none"
            value={formData.notes}
            onChange={(e) =>
              setFormData({ ...formData, notes: e.target.value })
            }
          />
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-600 text-white font-bold py-3 rounded-full hover:bg-blue-700 transition-colors mt-4 disabled:bg-blue-300"
        >
          {isSubmitting ? "Scheduling..." : "Schedule Event"}
        </button>
      </form>
    </div>
  );
};
