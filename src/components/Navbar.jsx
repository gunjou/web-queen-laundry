import React from "react";
import { Sun, Moon, UserCircle } from "lucide-react";

import LogoImg from "../assets/logo.png";

const Navbar = ({ darkMode, setDarkMode }) => {
  return (
    <nav className="sticky top-0 z-40 bg-white dark:bg-slate-800 border-b border-gray-100 dark:border-slate-700 px-4 md:px-6 py-3 flex justify-between items-center shadow-sm">
      <div className="flex items-center gap-3">
        {/* Logo muncul di navbar hanya saat mobile */}
        <div className="lg:hidden bg-white p-1.5 rounded-lg shrink-0 shadow-sm border border-gray-100 ring-1 ring-black/5">
          <img src={LogoImg} alt="Q" className="h-7 w-7 object-contain" />
        </div>
        {/* <h2 className="font-bold text-queen-navy dark:text-white text-sm md:text-base">
          Queen Laundry <span className="hidden sm:inline">System</span>
        </h2> */}
      </div>

      <div className="flex items-center gap-2 md:gap-4">
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="p-2 rounded-xl bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-queen-gold transition-all hover:bg-gray-200"
        >
          {darkMode ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        <div className="h-6 w-[1px] bg-gray-200 dark:bg-slate-700 mx-1"></div>

        <div className="flex items-center gap-2">
          <div className="text-right hidden xs:block">
            <p className="text-[10px] md:text-xs font-bold text-queen-navy dark:text-white leading-none">
              Gunjo
            </p>
          </div>
          <UserCircle size={28} className="text-gray-400 dark:text-slate-500" />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
