import { Outlet, Link } from "react-router-dom";
import { Calendar, User } from "lucide-react";

export default function Layout() {
  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
      <nav className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between sticky top-0 z-10">
        <Link
          to="/"
          className="text-xl font-bold text-blue-600 flex items-center gap-2"
        >
          <Calendar className="w-6 h-6" />
          Kalendly
        </Link>
        <div className="flex items-center gap-6">
          <Link
            to="/dashboard"
            className="text-sm font-medium hover:text-blue-600"
          >
            Dashboard
          </Link>
          <Link
            to="/availability"
            className="text-sm font-medium hover:text-blue-600"
          >
            Availability
          </Link>
          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
            <User className="w-4 h-4" />
          </div>
        </div>
      </nav>
      <main className="max-w-6xl mx-auto p-6">
        <Outlet />
      </main>
    </div>
  );
}
