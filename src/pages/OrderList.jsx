import React, { useState } from "react";
import {
  Search,
  Calendar,
  Clock,
  Timer,
  ChevronRight,
  Scale as ScaleIcon,
  Wallet,
  Truck,
  Store,
} from "lucide-react";

const OrderList = () => {
  const [filterStatus, setFilterStatus] = useState("Semua");

  const orders = [
    {
      id: "QN-001",
      customer: "Aniki",
      type: "Reguler",
      service: "Cuci Setrika",
      qty: "5.0",
      total: 35000,
      entryTime: "10:30",
      estimateTime: "Besok, 10:30",
      status: "Diproses",
      payment: "Lunas",
    },
    {
      id: "QN-002",
      customer: "Budi",
      type: "Pickup",
      service: "Cuci Kering",
      qty: "3.2",
      total: 24000,
      entryTime: "11:15",
      estimateTime: "Hari ini, 18:00",
      status: "Selesai",
      payment: "Belum Lunas",
    },
    {
      id: "QN-003",
      customer: "Siska",
      type: "Pickup & Delivery",
      service: "Express 6 Jam",
      qty: "2.0",
      total: 30000,
      entryTime: "13:00",
      estimateTime: "Hari ini, 19:00",
      status: "Diterima",
      payment: "Lunas",
    },
  ];

  // 🔥 STYLE HELPERS
  const getTypeStyle = (type) => {
    if (type === "Reguler")
      return "bg-green-100 text-green-600 dark:bg-green-500/10";
    if (type === "Pickup")
      return "bg-blue-100 text-blue-600 dark:bg-blue-500/10";
    return "bg-purple-100 text-purple-600 dark:bg-purple-500/10";
  };

  const getStatusStyle = (status) => {
    if (status === "Selesai")
      return "bg-green-100 text-green-600 dark:bg-green-500/10";
    if (status === "Diproses")
      return "bg-yellow-100 text-yellow-600 dark:bg-yellow-500/10";
    return "bg-blue-100 text-blue-600 dark:bg-blue-500/10";
  };

  return (
    <div className="space-y-6 pb-24 lg:pb-10 animate-in fade-in duration-500">
      {/* HEADER */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-queen-navy dark:text-white">
            Daftar Order
          </h1>
          <p className="text-sm text-gray-500">
            Monitoring operasional laundry
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={18}
            />
            <input
              placeholder="Cari order..."
              className="pl-10 pr-4 py-3 rounded-2xl border bg-white dark:bg-slate-800 dark:text-white text-sm"
            />
          </div>

          <button className="p-3 bg-white dark:bg-slate-800 border rounded-2xl">
            <Calendar size={18} />
          </button>
        </div>
      </div>

      {/* FILTER */}
      <div className="flex gap-2 overflow-x-auto">
        {["Semua", "Diterima", "Diproses", "Selesai", "Diambil"].map(
          (status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-5 py-2 rounded-full text-xs font-bold ${
                filterStatus === status
                  ? "bg-queen-navy text-white"
                  : "bg-gray-100 dark:bg-slate-800 text-gray-500"
              }`}
            >
              {status}
            </button>
          )
        )}
      </div>

      {/* ================= DESKTOP TABLE ================= */}
      <div className="hidden lg:block bg-white dark:bg-slate-800 rounded-3xl border overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 dark:bg-slate-900 text-xs uppercase text-gray-400">
            <tr>
              <th className="px-6 py-4">Order</th>
              <th className="px-6 py-4">Type</th>
              <th className="px-6 py-4">Layanan</th>
              <th className="px-6 py-4">Berat</th>
              <th className="px-6 py-4">Waktu</th>
              <th className="px-6 py-4">Total</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Aksi</th>
            </tr>
          </thead>

          <tbody className="divide-y">
            {orders.map((order) => (
              <tr
                key={order.id}
                className="hover:bg-slate-50 dark:hover:bg-slate-700/30"
              >
                {/* ORDER */}
                <td className="px-6 py-5">
                  <p className="text-xs text-queen-gold font-bold">
                    {order.id}
                  </p>
                  <p className="font-black dark:text-white">{order.customer}</p>
                </td>

                {/* TYPE */}
                <td className="px-6 py-5">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold ${getTypeStyle(
                      order.type
                    )}`}
                  >
                    {order.type}
                  </span>
                </td>

                {/* SERVICE */}
                <td className="px-6 py-5 font-bold dark:text-white">
                  {order.service}
                </td>

                {/* WEIGHT */}
                <td className="px-6 py-5">
                  <div className="flex items-center gap-1 text-gray-500">
                    <ScaleIcon size={14} />
                    {order.qty} kg
                  </div>
                </td>

                {/* TIME */}
                <td className="px-6 py-5 text-xs">
                  <div className="flex items-center gap-1 text-gray-400">
                    <Clock size={12} />
                    {order.entryTime}
                  </div>
                  <div className="flex items-center gap-1 text-queen-navy dark:text-queen-gold font-bold">
                    <Timer size={12} />
                    {order.estimateTime}
                  </div>
                </td>

                {/* TOTAL */}
                <td className="px-6 py-5">
                  <p className="font-black dark:text-white">
                    Rp {order.total.toLocaleString()}
                  </p>

                  <span
                    className={`text-[10px] font-bold ${
                      order.payment === "Lunas"
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {order.payment}
                  </span>
                </td>

                {/* STATUS */}
                <td className="px-6 py-5">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusStyle(
                      order.status
                    )}`}
                  >
                    {order.status}
                  </span>
                </td>

                {/* ACTION */}
                <td className="px-6 py-5 text-right">
                  <button className="p-2 hover:bg-queen-navy hover:text-white rounded-xl">
                    <ChevronRight size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ================= MOBILE ================= */}
      <div className="lg:hidden space-y-4">
        {orders.map((order) => (
          <div
            key={order.id}
            className="bg-white dark:bg-slate-800 p-5 rounded-3xl shadow"
          >
            <div className="flex justify-between mb-3">
              <div>
                <p className="text-xs text-queen-gold font-bold">{order.id}</p>
                <h3 className="font-black dark:text-white">{order.customer}</h3>
              </div>

              <span
                className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusStyle(
                  order.status
                )}`}
              >
                {order.status}
              </span>
            </div>

            <p className="font-bold">{order.service}</p>
            <p className="text-xs text-gray-500">{order.qty} kg</p>

            <div className="flex justify-between mt-3">
              <p className="font-black">Rp {order.total.toLocaleString()}</p>
              <p
                className={`text-xs font-bold ${
                  order.payment === "Lunas" ? "text-green-500" : "text-red-500"
                }`}
              >
                {order.payment}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderList;
