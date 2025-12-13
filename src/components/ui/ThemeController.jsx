import React, { useState, useEffect, useRef } from "react";
import { LuSunMoon } from "react-icons/lu";

const ThemeController = () => {
  const [theme, setTheme] = useState("system");
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  // ✅ Load theme on mount
  useEffect(() => {
    const saved = localStorage.getItem("theme") || "system";
    setTheme(saved);

    if (saved === "light" || saved === "mytheme") {
      document.documentElement.setAttribute("data-theme", saved);
    } else {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      document.documentElement.setAttribute("data-theme", prefersDark ? "mytheme" : "light");
    }
  }, []);

  // ✅ Apply and persist theme changes
  useEffect(() => {
    const root = document.documentElement;

    if (theme === "light" || theme === "mytheme") {
      root.setAttribute("data-theme", theme);
    } else {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      root.setAttribute("data-theme", prefersDark ? "mytheme" : "light");
    }

    // Always save user preference (including "system")
    localStorage.setItem("theme", theme);
  }, [theme]);

  // ✅ Listen for system changes when theme = system
  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const listener = (e) => {
      if (theme === "system") {
        document.documentElement.setAttribute("data-theme", e.matches ? "mytheme" : "light");
      }
    };
    mq.addEventListener("change", listener);
    return () => mq.removeEventListener("change", listener);
  }, [theme]);

  // ✅ Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Button */}
      <button
        className="p-2 bg-base-200 rounded-full shadow hover:bg-base-300 transition"
        onClick={() => setOpen(!open)}
      >
        {theme === "light" ? "☀️" : theme === "mytheme" ? "🌙" : <LuSunMoon />}
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 mt-2 w-40 bg-base-100 shadow-lg rounded-md overflow-hidden z-50">
          <button
            className="w-full text-left px-4 py-2 hover:bg-base-200"
            onClick={() => {
              setTheme("light");
              setOpen(false);
            }}
          >
            ☀️ Light
          </button>
          <button
            className="w-full text-left px-4 py-2 hover:bg-base-200"
            onClick={() => {
              setTheme("mytheme");
              setOpen(false);
            }}
          >
            🌙 Dark
          </button>
          <button
            className="w-full text-left px-4 py-2 hover:bg-base-200"
            onClick={() => {
              setTheme("system");
              setOpen(false);
            }}
          >
            🖥 System
          </button>
        </div>
      )}
    </div>
  );
};

export default ThemeController;