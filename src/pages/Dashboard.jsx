import React, { useState } from "react";
import {
  ShoppingBag,
  Clock,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  Plus,
} from "lucide-react";
import StatCard from "../components/StatCard";
import OrderModal from "../components/modal/OrderModal";

const Dashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  // Data dummy untuk visualisasi
  const stats = [
    {
      title: "Order Aktif",
      value: "12",
      icon: Clock,
      color: "text-blue-600",
      bg: "bg-blue-100",
    },
    {
      title: "Hari Ini",
      value: "Rp 450.000",
      icon: TrendingUp,
      color: "text-green-600",
      bg: "bg-green-100",
    },
    {
      title: "Siap Ambil",
      value: "5",
      icon: CheckCircle2,
      color: "text-queen-gold",
      bg: "bg-yellow-100",
    },
    {
      title: "Belum Bayar",
      value: "3",
      icon: AlertCircle,
      color: "text-red-600",
      bg: "bg-red-100",
    },
  ];

  const recentOrders = [
    {
      id: "001",
      customer: "Aniki",
      service: "Cuci Setrika",
      weight: "5kg",
      status: "Diproses",
      payment: "Lunas",
    },
    {
      id: "002",
      customer: "Budi",
      service: "Cuci Kering",
      weight: "3kg",
      status: "Diterima",
      payment: "Belum Bayar",
    },
    {
      id: "003",
      customer: "Citra",
      service: "Express",
      weight: "2kg",
      status: "Selesai",
      payment: "Lunas",
    },
  ];

  return (
    <div className="p-6 pt-2 space-y-8 animate-in fade-in duration-500">
      {/* Header Section */}
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-queen-navy dark:text-white">
            Dashboard Overview
          </h1>
          <p className="text-gray-500 dark:text-slate-400">
            Selamat datang kembali, Admin Queen.
          </p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
        {stats.map((stat, index) => (
          <StatCard
            key={index}
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
            color={stat.color}
            bg={stat.bg}
          />
        ))}
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Orders Table */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 overflow-hidden">
          <div className="p-5 border-b border-gray-100 dark:border-slate-700 flex justify-between items-center">
            <h3 className="font-bold text-queen-navy dark:text-white">
              Order Terbaru
            </h3>
            <button className="text-sm text-queen-gold font-semibold hover:underline">
              Lihat Semua
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50 dark:bg-slate-700/50 text-xs uppercase text-gray-400">
                <tr>
                  <th className="px-6 py-3">ID Order</th>
                  <th className="px-6 py-3">Pelanggan</th>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3">Pembayaran</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-slate-700">
                {recentOrders.map((order) => (
                  <tr
                    key={order.id}
                    className="hover:bg-gray-50 dark:hover:bg-slate-700/30 transition-colors"
                  >
                    <td className="px-6 py-4 font-medium text-queen-navy dark:text-queen-gold-light">
                      {order.id}
                    </td>
                    <td className="px-6 py-4 dark:text-slate-300">
                      {order.customer}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${
                          order.status === "Selesai"
                            ? "bg-green-100 text-green-700"
                            : "bg-blue-100 text-blue-700"
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={
                          order.payment === "Lunas"
                            ? "text-green-500"
                            : "text-red-500"
                        }
                      >
                        {order.payment}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 1. DESKTOP QUICK ACTION CARD (Tampil hanya di lg) */}
        <div className="hidden lg:block bg-gradient-to-br from-queen-navy to-slate-800 rounded-3xl p-8 text-white relative overflow-hidden shadow-2xl group border border-white/5">
          <div className="relative z-10 flex flex-col h-full justify-between">
            <div>
              <div className="bg-queen-gold/20 p-3 rounded-2xl w-fit mb-4 group-hover:rotate-12 transition-transform duration-500">
                <ShoppingBag className="text-queen-gold" size={28} />
              </div>
              <h3 className="text-2xl font-extrabold mb-2 tracking-tight">
                Input Order Cepat
              </h3>
              <p className="text-blue-100/70 text-sm leading-relaxed mb-8">
                Mulai transaksi baru dengan cepat. Sistem akan otomatis mencatat
                invoice dan waktu masuk.
              </p>
            </div>

            <button
              onClick={() => setIsModalOpen(true)}
              className="group/btn relative overflow-hidden w-full py-4 bg-queen-gold text-queen-navy font-bold rounded-2xl hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] transition-all duration-300 active:scale-95"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                <span className="text-lg">Buat Order Baru</span>
                <div className="bg-queen-navy/10 p-1 rounded-full group-hover/btn:translate-x-1 transition-transform">
                  <Plus size={20} />
                </div>
              </span>
            </button>
          </div>

          {/* Dekorasi Background Desktop */}
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-queen-gold opacity-[0.03] rounded-full blur-2xl"></div>
          <div className="absolute top-20 -left-10 w-32 h-32 bg-blue-500 opacity-[0.05] rounded-full blur-3xl"></div>
          <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-queen-gold opacity-[0.07] rounded-full group-hover:scale-110 transition-transform duration-700"></div>
        </div>

        {/* 2. MOBILE FLOATING ACTION BUTTON (FAB) (Tampil di < lg) */}
        <div className="lg:hidden fixed bottom-20 right-6 z-[60]">
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center justify-center w-16 h-16 bg-queen-navy dark:bg-queen-gold text-queen-gold dark:text-queen-navy rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.2)] dark:shadow-[0_8px_30px_rgba(212,175,55,0.3)] hover:scale-110 active:scale-90 transition-all duration-300 group"
          >
            <Plus
              size={32}
              strokeWidth={3}
              className="group-hover:rotate-90 transition-transform duration-300"
            />

            {/* Label kecil opsional yang muncul di samping FAB (Bisa dihapus jika ingin minimalis) */}
            <span className="absolute right-20 bg-queen-navy dark:bg-slate-800 text-white dark:text-queen-gold px-3 py-1.5 rounded-lg text-xs font-bold shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-white/10 pointer-events-none">
              Order Baru
            </span>
          </button>
        </div>
      </div>

      {/* 6. Pasang Komponen Modal */}
      <OrderModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default Dashboard;
