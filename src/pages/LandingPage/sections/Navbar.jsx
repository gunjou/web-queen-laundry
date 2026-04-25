import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Sun, Moon } from "lucide-react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "dark") {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toggleDark = () => {
    setDarkMode(!darkMode);

    if (!darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all ${
        scrolled
          ? "bg-white/70 dark:bg-[#070A12]/70 backdrop-blur-xl border-b border-slate-200/50 dark:border-slate-800/50"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        <div className="font-semibold text-lg">
          Queen<span className="text-blue-500">Laundry</span>
        </div>

        <nav className="hidden md:flex gap-8 text-sm text-slate-600 dark:text-slate-300">
          <a href="#services">Layanan</a>
          <a href="#benefit">Keunggulan</a>
          <a href="#area">Area</a>
        </nav>

        <div className="flex items-center gap-3">
          <button onClick={toggleDark} className="p-2 rounded-xl border">
            {darkMode ? <Sun size={16} /> : <Moon size={16} />}
          </button>

          <Link
            to="/login"
            className="px-4 py-2 rounded-xl bg-blue-600 text-white text-sm"
          >
            Masuk
          </Link>
        </div>
      </div>
    </header>
  );
}
