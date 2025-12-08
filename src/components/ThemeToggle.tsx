import { Moon, Sun } from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";

export function ThemeToggle() {
  const { toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="relative p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
      aria-label="Toggle Theme"
    >
      <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all duration-300 dark:-rotate-90 dark:scale-0 text-yellow-500" />

      <Moon className="absolute top-2 h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all duration-300 dark:rotate-0 dark:scale-100 text-blue-500" />

      <span className="sr-only">Toggle theme</span>
    </button>
  );
}
