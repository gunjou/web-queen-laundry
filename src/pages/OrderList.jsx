import React, { useState } from "react";
import {
  Search,
  Calendar,
  Clock,
  CheckCircle2,
  Timer,
  ChevronRight,
  Scale as ScaleIcon,
  Wallet,
  Hash,
} from "lucide-react";

const OrderList = () => {
  const [filterStatus, setFilterStatus] = useState("Semua");

  const orders = [
    {
      id: "QN-001",
      customer: "Aniki",
      service: "Cuci Setrika",
      qty: "5.0 kg",
      total: "Rp 35.000",
      entryTime: "10:30",
      estimateTime: "Besok, 10:30",
      status: "Diproses",
      payment: "Lunas",
    },
    {
      id: "QN-002",
      customer: "Budi",
      service: "Cuci Kering",
      qty: "3.2 kg",
      total: "Rp 24.000",
      entryTime: "11:15",
      estimateTime: "Hari ini, 18:00",
      status: "Selesai",
      payment: "Belum Lunas",
    },
    {
      id: "QN-003",
      customer: "Siska",
      service: "Express 6 Jam",
      qty: "2.0 kg",
      total: "Rp 30.000",
      entryTime: "13:00",
      estimateTime: "Hari ini, 19:00",
      status: "Diterima",
      payment: "Lunas",
    },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-24 lg:pb-10">
      {/* Header & Search */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-queen-navy dark:text-white">
            Daftar Order
          </h1>
          <p className="text-sm text-gray-500">
            Pantau operasional cucian real-time
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="relative flex-1 lg:min-w-[300px]">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={18}
            />
            <input
              type="text"
              placeholder="Cari nama/nota..."
              className="w-full pl-10 pr-4 py-3 rounded-2xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 dark:text-white focus:ring-2 focus:ring-queen-gold outline-none text-sm shadow-sm"
            />
          </div>
          <button className="p-3 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-2xl text-queen-navy dark:text-queen-gold shadow-sm hover:bg-gray-50 transition-colors">
            <Calendar size={20} />
          </button>
        </div>
      </div>

      {/* Filter Chips - Scrollable di Mobile */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide -mx-4 px-4 lg:mx-0 lg:px-0">
        {["Semua", "Diterima", "Diproses", "Selesai", "Diambil"].map(
          (status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-6 py-2.5 rounded-full text-xs font-bold transition-all whitespace-nowrap shadow-sm ${
                filterStatus === status
                  ? "bg-queen-navy text-white"
                  : "bg-white dark:bg-slate-800 text-gray-500 border border-gray-100 dark:border-slate-700"
              }`}
            >
              {status}
            </button>
          ),
        )}
      </div>

      {/* VIEW UNTUK DESKTOP (TABLE) */}
      <div className="hidden lg:block bg-white dark:bg-slate-800 rounded-[2.5rem] shadow-sm border border-gray-100 dark:border-slate-700/50 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 dark:bg-slate-900/50 text-[10px] uppercase tracking-widest text-gray-400 font-bold">
            <tr>
              <th className="px-8 py-5">Info Order</th>
              <th className="px-8 py-5">Layanan</th>
              <th className="px-8 py-5">Waktu & Est</th>
              <th className="px-8 py-5">Total</th>
              <th className="px-8 py-5">Status</th>
              <th className="px-8 py-5 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-slate-700">
            {orders.map((order) => (
              <tr
                key={order.id}
                className="hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors group"
              >
                <td className="px-8 py-6">
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-queen-gold mb-1">
                      {order.id}
                    </span>
                    <span className="text-sm font-black text-queen-navy dark:text-white">
                      {order.customer}
                    </span>
                  </div>
                </td>
                <td className="px-8 py-6">
                  <div className="flex flex-col">
                    <span className="text-sm font-bold">{order.service}</span>
                    <span className="text-xs text-gray-400">{order.qty}</span>
                  </div>
                </td>
                <td className="px-8 py-6">
                  <div className="space-y-1">
                    <div className="text-[11px] text-gray-400 flex items-center gap-1.5">
                      <Clock size={12} /> {order.entryTime}
                    </div>
                    <div className="text-[11px] text-queen-navy dark:text-queen-gold font-bold flex items-center gap-1.5">
                      <Timer size={12} /> {order.estimateTime}
                    </div>
                  </div>
                </td>
                <td className="px-8 py-6">
                  <div className="flex flex-col">
                    <span className="text-sm font-black">{order.total}</span>
                    <span
                      className={`text-[10px] font-bold ${order.payment === "Lunas" ? "text-green-500" : "text-red-500"}`}
                    >
                      {order.payment}
                    </span>
                  </div>
                </td>
                <td className="px-8 py-6">
                  <span
                    className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${
                      order.status === "Selesai"
                        ? "bg-green-100 text-green-600"
                        : "bg-blue-100 text-blue-600"
                    }`}
                  >
                    {order.status}
                  </span>
                </td>
                <td className="px-8 py-6 text-right">
                  <button className="p-2 hover:bg-queen-navy hover:text-white rounded-xl transition-all">
                    <ChevronRight size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* VIEW UNTUK MOBILE (CARDS) */}
      <div className="lg:hidden space-y-4">
        {orders.map((order) => (
          <div
            key={order.id}
            className="bg-white dark:bg-slate-800 p-5 rounded-[2rem] border border-gray-100 dark:border-slate-700 shadow-sm active:scale-[0.98] transition-all"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <span className="text-[10px] font-bold text-queen-gold tracking-widest uppercase">
                  {order.id}
                </span>
                <h3 className="text-lg font-black text-queen-navy dark:text-white">
                  {order.customer}
                </h3>
              </div>
              <span
                className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-tighter ${
                  order.status === "Selesai"
                    ? "bg-green-100 text-green-600"
                    : "bg-blue-100 text-blue-600"
                }`}
              >
                {order.status}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4 p-4 bg-slate-50 dark:bg-slate-900 rounded-2xl">
              <div className="space-y-1">
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">
                  Layanan
                </p>
                <p className="text-xs font-bold text-gray-700 dark:text-slate-300 truncate">
                  {order.service}
                </p>
                <p className="text-[10px] text-gray-500">{order.qty}</p>
              </div>
              <div className="space-y-1 text-right">
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">
                  Total Tagihan
                </p>
                <p className="text-sm font-black text-queen-navy dark:text-queen-gold">
                  {order.total}
                </p>
                <p
                  className={`text-[10px] font-bold ${order.payment === "Lunas" ? "text-green-500" : "text-red-500 animate-pulse"}`}
                >
                  {order.payment}
                </p>
              </div>
            </div>

            <div className="flex justify-between items-center pt-2">
              <div className="flex gap-4">
                <div className="flex items-center gap-1">
                  <Clock size={14} className="text-gray-400" />
                  <span className="text-[11px] text-gray-500">
                    {order.entryTime}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <Timer size={14} className="text-queen-gold" />
                  <span className="text-[11px] font-bold text-queen-navy dark:text-queen-gold-light">
                    {order.estimateTime}
                  </span>
                </div>
              </div>
              <button className="p-2 bg-queen-navy text-white rounded-xl shadow-lg shadow-queen-navy/20">
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderList;
