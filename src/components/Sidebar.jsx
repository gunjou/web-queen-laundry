import React from "react";
import {
  LayoutDashboard,
  ShoppingCart,
  Users,
  LogOut,
  Package,
} from "lucide-react";
import { NavLink } from "react-router-dom";

import LogoImg from "../assets/logo.png";

const Sidebar = () => {
  const menus = [
    { name: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
    { name: "Order", icon: ShoppingCart, path: "/orders" },
    { name: "Customer", icon: Users, path: "/customers" },
    { name: "Layanan", icon: Package, path: "/services" },
  ];

  return (
    <>
      {/* DESKTOP SIDEBAR */}
      <div
        className="hidden lg:flex w-64 h-full flex-col shrink-0 
        bg-white dark:bg-queen-navy 
        text-queen-navy dark:text-white 
        border-r border-gray-100 dark:border-white/10"
      >
        {/* LOGO */}
        <div className="p-6 flex items-center gap-4 border-b border-gray-100 dark:border-white/10 group">
          <div className="bg-white dark:bg-slate-800 p-2 rounded-xl shadow-lg">
            <img src={LogoImg} alt="Q" className="h-9 w-9 object-contain" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-bold tracking-tight">Queen</span>
            <span className="text-[10px] font-bold text-queen-gold tracking-[0.25em] uppercase mt-1.5">
              Laundry
            </span>
          </div>
        </div>

        {/* MENU */}
        <nav className="flex-1 p-4 space-y-2 mt-4">
          {menus.map((menu) => (
            <NavLink
              key={menu.name}
              to={menu.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  isActive
                    ? "bg-queen-gold text-queen-navy font-bold shadow-md"
                    : "hover:bg-gray-100 dark:hover:bg-white/10 text-gray-600 dark:text-gray-300"
                }`
              }
            >
              <menu.icon size={20} />
              {menu.name}
            </NavLink>
          ))}
        </nav>

        {/* LOGOUT */}
        <div className="p-4 border-t border-gray-100 dark:border-white/10">
          <button className="flex items-center gap-3 px-4 py-3 w-full text-red-500 hover:bg-red-500/10 rounded-xl transition-all font-medium text-sm">
            <LogOut size={20} />
            Keluar
          </button>
        </div>
      </div>

      {/* MOBILE NAV */}
      <div
        className="lg:hidden fixed bottom-0 left-0 right-0 
        bg-white dark:bg-slate-800 
        border-t border-gray-200 dark:border-slate-700 
        z-50 px-2 pb-safe"
      >
        <div className="flex justify-around items-center h-16">
          {menus.map((menu) => (
            <NavLink
              key={menu.name}
              to={menu.path}
              className={({ isActive }) =>
                `flex flex-col items-center justify-center w-full h-full transition-all ${
                  isActive
                    ? "text-queen-navy dark:text-queen-gold"
                    : "text-gray-400 dark:text-slate-500"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <menu.icon
                    size={20}
                    className={isActive ? "scale-110" : ""}
                  />
                  <span className="text-[10px] mt-1 font-medium">
                    {menu.name}
                  </span>
                  <div
                    className={`h-1 w-1 rounded-full mt-0.5 ${
                      isActive ? "bg-current" : "bg-transparent"
                    }`}
                  />
                </>
              )}
            </NavLink>
          ))}
        </div>
      </div>
    </>
  );
};

export default Sidebar;
