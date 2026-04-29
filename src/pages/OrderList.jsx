import React, { useState } from "react";
import {
  Search,
  Clock,
  Timer,
  ChevronRight,
  Scale as ScaleIcon,
  Truck,
} from "lucide-react";

const OrderList = () => {
  const [serviceTab, setServiceTab] = useState("Semua");
  const [processTab, setProcessTab] = useState("Semua");

  const orders = [
    // ===== REGULER =====
    {
      id: "QN-001",
      customer: "Aniki",
      type: "Reguler",
      service: "Cuci Setrika",
      qty: "5.0",
      total: 35000,
      entryTime: "10:30",
      estimateTime: "Besok",
      status: "Diterima",
      payment: "Lunas",
    },
    {
      id: "QN-002",
      customer: "Budi",
      type: "Reguler",
      service: "Cuci Kering",
      qty: "3.0",
      total: 24000,
      entryTime: "11:00",
      estimateTime: "Hari ini",
      status: "Dicuci",
      payment: "Belum Lunas",
    },
    {
      id: "QN-003",
      customer: "Siska",
      type: "Reguler",
      service: "Express",
      qty: "2.0",
      total: 30000,
      entryTime: "12:00",
      estimateTime: "Hari ini",
      status: "Setrika",
      payment: "Lunas",
    },
    {
      id: "QN-004",
      customer: "Rudi",
      type: "Reguler",
      service: "Cuci Setrika",
      qty: "4.0",
      total: 28000,
      entryTime: "13:00",
      estimateTime: "Besok",
      status: "Bisa Diambil",
      payment: "Lunas",
    },
    {
      id: "QN-005",
      customer: "Dewi",
      type: "Reguler",
      service: "Cuci",
      qty: "3.5",
      total: 20000,
      entryTime: "14:00",
      estimateTime: "Hari ini",
      status: "Selesai",
      payment: "Lunas",
    },

    // ===== PICKUP =====
    {
      id: "QN-006",
      customer: "Joko",
      type: "Pickup",
      service: "Cuci Setrika",
      qty: "4.0",
      total: 30000,
      entryTime: "09:00",
      estimateTime: "Hari ini",
      status: "Menunggu Pickup", // 🔥 highlight
      payment: "Belum Lunas",
    },
    {
      id: "QN-007",
      customer: "Ayu",
      type: "Pickup",
      service: "Cuci",
      qty: "2.0",
      total: 15000,
      entryTime: "10:00",
      estimateTime: "Hari ini",
      status: "Dijemput",
      payment: "Lunas",
    },
    {
      id: "QN-008",
      customer: "Rian",
      type: "Pickup",
      service: "Express",
      qty: "2.5",
      total: 35000,
      entryTime: "11:00",
      estimateTime: "Hari ini",
      status: "Diproses",
      payment: "Lunas",
    },
    {
      id: "QN-009",
      customer: "Maya",
      type: "Pickup",
      service: "Cuci",
      qty: "3.0",
      total: 20000,
      entryTime: "12:00",
      estimateTime: "Hari ini",
      status: "Selesai",
      payment: "Lunas",
    },

    // ===== PICKUP + DELIVERY =====
    {
      id: "QN-010",
      customer: "Fajar",
      type: "Pickup & Delivery",
      service: "Cuci Setrika",
      qty: "5.0",
      total: 40000,
      entryTime: "08:00",
      estimateTime: "Hari ini",
      status: "Menunggu Pickup", // 🔥 highlight
      payment: "Belum Lunas",
    },
    {
      id: "QN-011",
      customer: "Lina",
      type: "Pickup & Delivery",
      service: "Express",
      qty: "2.0",
      total: 30000,
      entryTime: "09:30",
      estimateTime: "Hari ini",
      status: "Diproses",
      payment: "Lunas",
    },
    {
      id: "QN-012",
      customer: "Andre",
      type: "Pickup & Delivery",
      service: "Cuci",
      qty: "3.0",
      total: 20000,
      entryTime: "10:30",
      estimateTime: "Hari ini",
      status: "Dikirim",
      payment: "Lunas",
    },
    {
      id: "QN-013",
      customer: "Nina",
      type: "Pickup & Delivery",
      service: "Cuci",
      qty: "3.5",
      total: 25000,
      entryTime: "11:30",
      estimateTime: "Hari ini",
      status: "Selesai",
      payment: "Lunas",
    },
  ];

  const serviceTabs = ["Semua", "Reguler", "Pickup", "Pickup & Delivery"];

  const processMap = {
    Reguler: [
      "Semua",
      "Diterima",
      "Dicuci",
      "Setrika",
      "Bisa Diambil",
      "Selesai",
    ],
    Pickup: ["Semua", "Diterima", "Dijemput", "Dicuci", "Setrika", "Selesai"],
    "Pickup & Delivery": [
      "Semua",
      "Diterima",
      "Dijemput",
      "Dicuci",
      "Setrika",
      "Diantar",
      "Selesai",
    ],
    Semua: [
      "Semua",
      "Diterima",
      "Dijemput",
      "Dicuci",
      "Setrika",
      "Diantar",
      "Bisa Diambil",
      "Selesai",
    ],
  };

  // 🔥 DETECT PICKUP BELUM DIJEMPUT
  const isPickupPending = (order) => {
    return (
      (order.type === "Pickup" || order.type === "Pickup & Delivery") &&
      order.status !== "Dijemput"
    );
  };

  // 🔥 FILTER
  const filteredOrders = orders.filter((o) => {
    const matchService = serviceTab === "Semua" || o.type === serviceTab;
    const matchProcess = processTab === "Semua" || o.status === processTab;

    return matchService && matchProcess;
  });

  // 🔥 BADGE COUNT (HANYA SERVICE)
  const getServiceCount = (type) => {
    return orders.filter((o) => o.type === type).length;
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case "Selesai":
        return "bg-green-100 text-green-700 border border-green-200 dark:bg-green-500/20 dark:text-green-300 dark:border-green-500/20";

      case "Dicuci":
        return "bg-blue-100 text-blue-700 border border-blue-200 dark:bg-blue-500/20 dark:text-blue-300 dark:border-blue-500/20";

      case "Setrika":
        return "bg-indigo-100 text-indigo-700 border border-indigo-200 dark:bg-indigo-500/20 dark:text-indigo-300 dark:border-indigo-500/20";

      case "Dijemput":
        return "bg-yellow-100 text-yellow-700 border border-yellow-200 dark:bg-yellow-500/20 dark:text-yellow-300 dark:border-yellow-500/20";

      case "Diantar":
        return "bg-purple-100 text-purple-700 border border-purple-200 dark:bg-purple-500/20 dark:text-purple-300 dark:border-purple-500/20";

      default:
        return "bg-gray-100 text-gray-700 border border-gray-200 dark:bg-slate-700 dark:text-slate-300 dark:border-slate-600";
    }
  };

  return (
    <div className="space-y-6 pb-24 lg:pb-10">
      {/* HEADER */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        {/* TEXT */}
        <div>
          <h1 className="text-2xl font-black text-queen-navy dark:text-white">
            Daftar Order
          </h1>
          <p className="text-sm text-gray-500">
            Monitoring operasional laundry
          </p>
        </div>

        {/* SEARCH */}
        <div className="relative w-full lg:w-[300px]">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            size={18}
          />
          <input
            placeholder="Cari order..."
            className="w-full pl-10 pr-4 py-3 rounded-2xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 dark:text-white text-sm"
          />
        </div>
      </div>

      {/* 🔥 SERVICE TAB + BADGE */}
      <div className="flex gap-1.5 pb-1 overflow-x-auto">
        {serviceTabs.map((tab) => {
          const showBadge = tab === "Pickup" || tab === "Pickup & Delivery";

          return (
            <button
              key={tab}
              onClick={() => {
                setServiceTab(tab);
                setProcessTab("Semua");
              }}
              className={`px-3 py-1.5 rounded-full text-[11px] font-semibold flex items-center gap-1.5 transition-all ${
                serviceTab === tab
                  ? "bg-queen-navy text-white shadow-sm"
                  : "bg-gray-100 dark:bg-slate-800 text-gray-500 hover:bg-gray-200 dark:hover:bg-slate-700"
              }`}
            >
              {tab}

              {showBadge && (
                <span className="bg-white/20 text-[9px] px-1.5 py-0.5 rounded-full">
                  {getServiceCount(tab)}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* 🔥 PROCESS TAB */}
      <div className="flex gap-1.5 pb-1 overflow-x-auto">
        {processMap[serviceTab].map((tab) => (
          <button
            key={tab}
            onClick={() => setProcessTab(tab)}
            className={`px-3 py-1.5 rounded-full text-[11px] font-semibold transition-all ${
              processTab === tab
                ? "bg-queen-gold text-white shadow-sm"
                : "bg-gray-100 dark:bg-slate-800 text-gray-500 hover:bg-gray-200 dark:hover:bg-slate-700"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* ================= DESKTOP ================= */}
      <div className="hidden lg:block bg-white dark:bg-slate-800 rounded-3xl border overflow-hidden">
        <div className="max-h-[420px] overflow-y-auto">
          <table className="w-full text-sm">
            <thead className="sticky top-0 bg-gray-50 dark:bg-slate-900 text-xs uppercase text-gray-400">
              <tr>
                <th className="px-6 py-4">Order</th>
                <th className="px-6 py-4">Layanan</th>
                <th className="px-6 py-4">Berat</th>
                <th className="px-6 py-4">Waktu</th>
                <th className="px-6 py-4">Total</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Aksi</th>
              </tr>
            </thead>

            <tbody>
              {filteredOrders.map((order) => (
                <tr
                  key={order.id}
                  className={`border-t ${
                    isPickupPending(order)
                      ? "bg-red-50 dark:bg-red-900/20"
                      : "hover:bg-slate-50 dark:hover:bg-slate-700/30"
                  }`}
                >
                  <td className="px-6 py-5">
                    <p className="text-xs text-queen-gold font-bold">
                      {order.id}
                    </p>

                    <p className="font-black dark:text-white flex items-center">
                      {order.customer}

                      {isPickupPending(order) && (
                        <span className="ml-2 flex items-center gap-1 px-2 py-0.5 text-[10px] font-bold bg-red-500 text-white rounded-full animate-pulse">
                          <Truck size={10} />
                          Pickup
                        </span>
                      )}
                    </p>
                  </td>

                  <td className="px-6 py-5 font-bold dark:text-white">
                    {order.service}
                  </td>

                  <td className="px-6 py-5 flex items-center gap-1 text-gray-500 dark:text-gray-400">
                    <ScaleIcon size={14} /> {order.qty} kg
                  </td>

                  <td className="px-6 py-5 text-xs">
                    <div className="flex items-center gap-1 text-gray-400">
                      <Clock size={12} /> {order.entryTime}
                    </div>
                    <div className="flex items-center gap-1 font-bold text-queen-navy dark:text-queen-gold">
                      <Timer size={12} /> {order.estimateTime}
                    </div>
                  </td>

                  <td className="px-6 py-5">
                    <p className="font-black dark:text-white">
                      Rp {order.total.toLocaleString()}
                    </p>
                  </td>

                  <td className="px-6 py-5">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold  ${getStatusStyle(
                        order.status
                      )}`}
                    >
                      {order.status}
                    </span>
                  </td>

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
      </div>

      {/* ================= MOBILE ================= */}
      <div className="lg:hidden space-y-4">
        {filteredOrders.map((order) => (
          <div
            key={order.id}
            className={`p-5 rounded-3xl shadow ${
              isPickupPending(order)
                ? "bg-red-50 dark:bg-red-900/20 border border-red-200"
                : "bg-white dark:bg-slate-800"
            }`}
          >
            <div className="flex justify-between mb-3">
              <div>
                <p className="text-xs text-queen-gold font-bold">{order.id}</p>
                <h3 className="font-black dark:text-white flex items-center">
                  {order.customer}

                  {isPickupPending(order) && (
                    <span className="ml-2 flex items-center gap-1 px-2 py-0.5 text-[10px] font-bold bg-red-500 text-white rounded-full animate-pulse">
                      <Truck size={10} />
                      Pickup
                    </span>
                  )}
                </h3>
              </div>

              <span
                className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusStyle(
                  order.status
                )}`}
              >
                {order.status}
              </span>
            </div>

            <p className="font-bold dark:text-white">{order.service}</p>
            <p className="text-xs text-gray-500">{order.qty} kg</p>

            <div className="flex justify-between mt-3">
              <p className="font-black dark:text-white">
                Rp {order.total.toLocaleString()}
              </p>
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
