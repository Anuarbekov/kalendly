import { useLocation, Link, Navigate } from "react-router-dom";

const BookingSuccess = () => {
  const location = useLocation();
  const booking = location.state?.booking;

  if (!booking) {
    return <Navigate to="/" replace />;
  }

  const startDate = new Date(booking.start_datetime);
  const endDate = booking.end_datetime ? new Date(booking.end_datetime) : null;

  const dateStr = startDate.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  const timeStr = startDate.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });

  const endTimeStr = endDate
    ? endDate.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
      })
    : "";

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-xl overflow-hidden border border-gray-100">
        <div className="bg-green-50 p-6 sm:p-8 text-center border-b border-green-100">
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-4">
            <svg
              className="h-8 w-8 text-green-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
            Booking Confirmed!
          </h2>
          <p className="text-gray-500 mt-2 text-sm sm:text-base">
            You are scheduled with{" "}
            <span className="font-semibold text-gray-700">Meir</span>
          </p>
        </div>

        <div className="p-6 sm:p-8 space-y-6">
          {/* Time Card */}
          <div className="flex items-start space-x-4">
            <div className="shrink-0 mt-1">
              <div className="h-10 w-10 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 sm:h-6 sm:w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
            </div>
            <div>
              <p className="text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wide">
                When
              </p>
              <p className="text-base sm:text-lg font-semibold text-gray-900">
                {dateStr}
              </p>
              <p className="text-gray-600 text-sm sm:text-base">
                {timeStr} {endTimeStr && ` - ${endTimeStr}`}
              </p>
            </div>
          </div>

          <div className="border-t border-gray-100 my-4"></div>

          <div className="flex items-start space-x-4">
            <div className="shrink-0 mt-1">
              <div className="h-10 w-10 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 sm:h-6 sm:w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
            </div>
            <div className="overflow-hidden">
              {" "}
              <p className="text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wide">
                Who
              </p>
              <p className="text-base sm:text-lg font-semibold text-gray-900 truncate">
                {booking.invitee_name}
              </p>
              <p className="text-gray-600 text-sm truncate">
                {booking.invitee_email}
              </p>
            </div>
          </div>

          {booking.location_value && (
            <div className="bg-gray-50 p-3 sm:p-4 rounded-lg flex items-start space-x-3 mt-4">
              <svg
                className="h-5 w-5 text-gray-400 mt-0.5 shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                />
              </svg>
              <span className="text-xs sm:text-sm text-gray-600">
                Web conferencing details have been sent to your email.
              </span>
            </div>
          )}
        </div>

        <div className="px-6 pb-6 sm:px-8 sm:pb-8 pt-0">
          <Link
            to="/"
            className="block w-full text-center bg-gray-900 hover:bg-gray-800 text-white font-medium py-3 rounded-xl transition-colors duration-200 shadow-lg shadow-gray-200"
          >
            Close
          </Link>
          <p className="text-center text-xs text-gray-400 mt-4">
            A calendar invitation has been sent to your email.
          </p>
        </div>
      </div>
    </div>
  );
};

export default BookingSuccess;
