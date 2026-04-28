import { useState } from "react";
import { Plus } from "lucide-react";

import StatsGrid from "../components/dashboard/StatsGrid";
import RevenueChart from "../components/dashboard/RevenueChart";
import RecentOrders from "../components/dashboard/RecentOrders";
import ActivityCard from "../components/dashboard/ActivityCard";
import OrderModal from "../components/modal/OrderModal";

import {
  statsData,
  ordersData,
  chartData,
  activityData,
} from "../data/dashboardData";

const Dashboard = () => {
  const [filter, setFilter] = useState("Minggu");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 🔥 GET USER LOGIN
  const user = JSON.parse(localStorage.getItem("user"));
  const role = user?.role;

  // 🔒 PROTECT PAGE
  if (!user) {
    window.location.href = "/";
    return null;
  }

  return (
    <div className="space-y-6 bg-gray-50 dark:bg-slate-900 min-h-screen">
      {/* =========================
          HEADER
      ========================= */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-queen-navy dark:text-white">
            Dashboard
          </h1>

          <p className="text-sm text-gray-500">
            {role === "admin"
              ? "Ringkasan bisnis hari ini"
              : "Pantau pekerjaan hari ini"}
          </p>
        </div>

        <div className="text-right text-xs text-gray-400">
          <p>
            {new Date().toLocaleDateString("id-ID", {
              weekday: "long",
            })}
          </p>
          <p>{new Date().toLocaleDateString("id-ID")}</p>
        </div>
      </div>

      {/* =========================
          STATS (ADMIN ONLY)
      ========================= */}
      {role === "admin" && <StatsGrid stats={statsData} />}

      {/* =========================
          CHART / STAFF SUMMARY
      ========================= */}
      <div className="grid lg:grid-cols-3 gap-6 items-start">
        {/* 🔥 ADMIN: CHART */}
        {role === "admin" && (
          <div className="lg:col-span-2">
            <RevenueChart
              data={chartData[filter]}
              filter={filter}
              setFilter={setFilter}
            />
          </div>
        )}

        {/* 🔥 STAFF: SUMMARY + ADD ORDER */}
        {role === "staff" && (
          <div className="lg:col-span-3 grid md:grid-cols-2 gap-4">
            {/* SUMMARY */}
            <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-sm border border-slate-200/50 dark:border-slate-700/50">
              <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                Fokus Hari Ini
              </h3>

              <p className="text-xs text-slate-500 mt-1">
                Prioritaskan order yang sedang berjalan
              </p>

              <div className="mt-4 grid grid-cols-3 gap-3 text-center">
                <div>
                  <p className="text-lg font-bold text-indigo-600">12</p>
                  <p className="text-[10px] text-slate-500">Diproses</p>
                </div>
                <div>
                  <p className="text-lg font-bold text-amber-500">5</p>
                  <p className="text-[10px] text-slate-500">Pickup</p>
                </div>
                <div>
                  <p className="text-lg font-bold text-emerald-500">8</p>
                  <p className="text-[10px] text-slate-500">Selesai</p>
                </div>
              </div>
            </div>

            {/* 🔥 ADD ORDER STAFF */}
            <div className="bg-gradient-to-br from-indigo-600 to-cyan-500 text-white rounded-3xl p-6 shadow-lg flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-bold mb-2">Tambah Order</h3>

                <p className="text-xs opacity-90">
                  Buat order baru untuk pelanggan
                </p>
              </div>

              <button
                onClick={() => setIsModalOpen(true)}
                className="mt-4 w-full py-2 bg-white text-indigo-600 font-semibold rounded-xl active:scale-95 transition"
              >
                + Buat Order
              </button>
            </div>
          </div>
        )}

        {/* 🔥 ADD ORDER CARD ADMIN */}
        {role === "admin" && (
          <div className="hidden lg:flex flex-col justify-between bg-gradient-to-br from-queen-navy to-slate-800 text-white rounded-3xl p-6 shadow-xl border border-white/5 relative overflow-hidden">
            <div>
              <div className="bg-queen-gold/20 p-3 rounded-xl w-fit mb-4">
                <Plus className="text-queen-gold" size={24} />
              </div>

              <h3 className="text-xl font-bold mb-2">Tambah Order Baru</h3>

              <p className="text-sm text-blue-100">
                Buat transaksi laundry dengan cepat dan otomatis tercatat ke
                sistem.
              </p>
            </div>

            <button
              onClick={() => setIsModalOpen(true)}
              className="mt-4 w-full py-3 bg-queen-gold text-queen-navy font-bold rounded-xl hover:shadow-lg transition active:scale-95"
            >
              + Buat Order
            </button>
          </div>
        )}
      </div>

      {/* =========================
          CONTENT
      ========================= */}
      <div className="grid lg:grid-cols-3 gap-6">
        <div className={role === "admin" ? "lg:col-span-2" : "lg:col-span-3"}>
          <RecentOrders orders={ordersData} />
        </div>

        {/* 🔥 ACTIVITY ADMIN ONLY */}
        {role === "admin" && <ActivityCard activities={activityData} />}
      </div>

      {/* =========================
          FLOAT BUTTON (ADMIN + STAFF)
      ========================= */}
      {(role === "admin" || role === "staff") && (
        <div className="lg:hidden fixed bottom-24 right-5 z-50">
          <button
            onClick={() => setIsModalOpen(true)}
            className="w-14 h-14 rounded-full bg-queen-navy dark:bg-queen-gold text-white dark:text-queen-navy shadow-lg flex items-center justify-center active:scale-95 transition"
          >
            <Plus size={26} />
          </button>
        </div>
      )}

      {/* =========================
          MODAL
      ========================= */}
      <OrderModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default Dashboard;
