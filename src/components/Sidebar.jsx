import React from "react";
import {
  LayoutDashboard,
  ShoppingCart,
  Users,
  Package,
  CreditCard,
  BarChart3,
  LogOut,
  IdCardLanyard,
} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";

import LogoImg from "../assets/logo.png";

// =========================
// ADMIN MENU ONLY
// =========================
const menuSections = [
  {
    title: "MAIN",
    items: [{ name: "Dashboard", icon: LayoutDashboard, path: "/dashboard" }],
  },
  {
    title: "TRANSAKSI",
    items: [
      { name: "Order", icon: ShoppingCart, path: "/orders" },
      { name: "Pembayaran", icon: CreditCard, path: "/payments" },
    ],
  },
  {
    title: "MASTER DATA",
    items: [
      { name: "Customer", icon: Users, path: "/customers" },
      // { name: "Karyawan", icon: IdCardLanyard, path: "/karyawan" },
      { name: "Layanan", icon: Package, path: "/services" },
    ],
  },
  {
    title: "SYSTEM",
    items: [{ name: "Laporan", icon: BarChart3, path: "/reports" }],
  },
];

const Sidebar = () => {
  const navigate = useNavigate();

  const flatMenus = menuSections.flatMap((s) => s.items);

  // =========================
  // LOGOUT
  // =========================
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <>
      {/* ================= DESKTOP ================= */}
      <div className="hidden lg:flex w-64 h-full flex-col bg-white dark:bg-slate-900 border-r border-gray-100 dark:border-white/10">
        {/* LOGO */}
        <div className="p-6 flex items-center gap-3">
          <img src={LogoImg} alt="logo" className="h-9 w-9" />
          <div>
            <p className="font-semibold text-sm text-gray-800 dark:text-white">
              Queen Laundry
            </p>
            <p className="text-xs text-gray-400">Jasa Cuci Antar Jemput</p>
          </div>
        </div>

        {/* MENU */}
        <div className="flex-1 px-3 space-y-6 overflow-y-auto">
          {menuSections.map((section) => (
            <div key={section.title}>
              <p className="text-[10px] font-semibold text-gray-400 px-3 mb-2">
                {section.title}
              </p>

              <div className="space-y-1">
                {section.items.map((menu) => (
                  <NavLink
                    key={menu.name}
                    to={menu.path}
                    className={({ isActive }) =>
                      `relative flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all ${
                        isActive
                          ? "bg-gray-100 dark:bg-white/10 text-gray-900 dark:text-white"
                          : "text-gray-500 dark:text-slate-400 hover:bg-gray-50 dark:hover:bg-white/5"
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        <span
                          className={`absolute left-0 top-0 h-full w-1 rounded-r-full ${
                            isActive ? "bg-queen-gold" : ""
                          }`}
                        />

                        <menu.icon
                          size={18}
                          className={isActive ? "text-queen-gold" : ""}
                        />

                        {menu.name}
                      </>
                    )}
                  </NavLink>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* LOGOUT */}
        <div className="px-4 py-3 border-t border-gray-100 dark:border-white/10">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-2.5 w-full text-sm text-red-500 hover:bg-red-500/10 rounded-xl"
          >
            <LogOut size={18} />
            Keluar
          </button>
        </div>
      </div>

      {/* ================= MOBILE ================= */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-slate-900 border-t border-gray-200 dark:border-slate-700">
        <div className="flex justify-around items-center h-16">
          {flatMenus.slice(0, 5).map((menu) => (
            <NavLink key={menu.name} to={menu.path} className="flex-1">
              {({ isActive }) => (
                <div
                  className={`flex flex-col items-center justify-center h-full transition-all ${
                    isActive
                      ? "text-queen-gold"
                      : "text-gray-400 dark:text-slate-500"
                  }`}
                >
                  <menu.icon
                    size={20}
                    className={isActive ? "scale-110" : ""}
                  />

                  <span className="text-[10px] mt-1 font-medium">
                    {menu.name}
                  </span>

                  <div
                    className={`h-[2px] w-5 mt-1 rounded-full transition-all ${
                      isActive ? "bg-queen-gold" : "bg-transparent"
                    }`}
                  />
                </div>
              )}
            </NavLink>
          ))}
        </div>
      </div>
    </>
  );
};

export default Sidebar;
