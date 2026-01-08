import { Outlet, Link } from "react-router-dom";
import { Calendar, User } from "lucide-react";
import { ThemeToggle } from "../components/ThemeToggle";

export default function Layout() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 font-sans text-gray-900 dark:text-white">
      <nav className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4 flex items-center justify-between sticky top-0 z-10">
        <Link
          to="/"
          className="text-xl font-bold text-blue-600 dark:text-blue-400 flex items-center gap-2"
        >
          <Calendar className="w-6 h-6" />
          Kalendly
        </Link>
        <div className="flex items-center gap-6">
          <ThemeToggle />
          <Link
            to="/dashboard"
            className="text-sm font-medium hover:text-blue-600 dark:hover:text-blue-400 text-gray-700 dark:text-gray-300"
          >
            Dashboard
          </Link>
          <Link
            to="/availability"
            className="text-sm font-medium hover:text-blue-600 dark:hover:text-blue-400 text-gray-700 dark:text-gray-300"
          >
            Availability
          </Link>
          <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-400">
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
