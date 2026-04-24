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

  return (
    <div className="space-y-6 bg-gray-50 dark:bg-slate-900 min-h-screen">
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-queen-navy dark:text-white">
            Dashboard
          </h1>
          <p className="text-sm text-gray-500">Selamat datang kembali 👋</p>
        </div>

        <div className="text-right text-xs text-gray-400">
          <p>{new Date().toLocaleDateString("id-ID", { weekday: "long" })}</p>
          <p>{new Date().toLocaleDateString("id-ID")}</p>
        </div>
      </div>

      {/* STATS */}
      <StatsGrid stats={statsData} />

      {/* 🔥 CHART + ADD ORDER CARD */}
      <div className="grid lg:grid-cols-3 gap-6 items-start">
        {/* CHART */}
        <div className="lg:col-span-2">
          <RevenueChart
            data={chartData[filter]}
            filter={filter}
            setFilter={setFilter}
          />
        </div>
        {/* 🔥 ADD ORDER CARD (DESKTOP ONLY) */}
        <div className="hidden lg:flex flex-col justify-between bg-gradient-to-br from-queen-navy to-slate-800 text-white rounded-3xl p-6 shadow-xl border border-white/5 group overflow-hidden relative">
          <div>
            <div className="bg-queen-gold/20 p-3 rounded-xl w-fit mb-4 group-hover:rotate-12 transition-transform duration-500">
              <Plus className="text-queen-gold" size={24} />
            </div>

            <h3 className="text-xl font-bold mb-2">Tambah Order Baru</h3>

            <p className="text-sm text-blue-100 leading-relaxed">
              Buat transaksi laundry dengan cepat dan otomatis tercatat ke
              sistem.
            </p>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="mt-4 w-full py-3 bg-queen-gold text-queen-navy font-bold rounded-xl hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] transition-all active:scale-95"
          >
            + Buat Order
          </button>

          {/* dekorasi */}
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-queen-gold opacity-[0.05] rounded-full blur-2xl"></div>
          <div className="absolute -bottom-16 -left-10 w-40 h-40 bg-blue-500 opacity-[0.05] rounded-full blur-2xl"></div>
        </div>
      </div>

      {/* CONTENT */}
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RecentOrders orders={ordersData} />
        </div>

        <ActivityCard activities={activityData} />
      </div>

      {/* 🔥 FLOATING BUTTON (MOBILE ONLY) */}
      <div className="lg:hidden fixed bottom-24 right-5 z-50">
        <button
          onClick={() => setIsModalOpen(true)}
          className="group relative flex items-center justify-center w-14 h-14 rounded-full bg-queen-navy dark:bg-queen-gold text-white dark:text-queen-navy shadow-[0_10px_30px_rgba(0,0,0,0.25)] hover:scale-110 active:scale-95 transition-all duration-300"
        >
          <Plus
            size={26}
            strokeWidth={3}
            className="group-hover:rotate-90 transition-transform duration-300"
          />

          <span className="absolute right-16 bg-queen-navy dark:bg-slate-800 text-white dark:text-queen-gold px-3 py-1.5 rounded-lg text-xs font-bold shadow-lg opacity-0 group-hover:opacity-100 transition whitespace-nowrap border border-white/10 pointer-events-none">
            Tambah Order
          </span>
        </button>
      </div>

      {/* MODAL */}
      <OrderModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default Dashboard;
