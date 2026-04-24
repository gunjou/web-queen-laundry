import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

const Layout = ({ darkMode, setDarkMode }) => {
  return (
    <div className="flex h-screen bg-slate-50 dark:bg-slate-900 transition-colors duration-300 overflow-hidden">
      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0">
        <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />

        {/* pb-20 di mobile supaya konten tidak tertutup bottom nav (h-16 + sedikit space) */}
        <main className="flex-1 overflow-y-auto px-4 md:px-6 py-6 pb-20 lg:pb-6">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
