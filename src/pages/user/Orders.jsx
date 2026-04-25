import { useState } from "react";
import { useLocation } from "react-router-dom";
import {
  Plus,
  Truck,
  Clock,
  CheckCircle2,
  Package,
  Home,
  Bike,
  Sparkles,
} from "lucide-react";

import OrderModal from "../../components/modal/OrderModal";

const Orders = () => {
  const location = useLocation();

  // 🔥 ambil tab dari navigation
  const [tab, setTab] = useState(location.state?.tab || "aktif");

  const [isModalOpen, setIsModalOpen] = useState(false);

  const orders = [
    {
      id: "#QL-2026-001",
      status: "Sedang Dicuci",
      type: "aktif",
      service: "Pickup & Delivery",
      laundryType: "Cuci + Setrika",
      total: 45000,
      progress: 2,
      weight: 3.5,
    },
    {
      id: "#QL-2026-002",
      status: "Kurir Menuju Lokasi",
      type: "aktif",
      service: "Pickup",
      laundryType: "Cuci Saja",
      total: 30000,
      progress: 1,
      weight: 2,
    },
    {
      id: "#QL-2026-003",
      status: "Sedang Disetrika",
      type: "aktif",
      service: "Reguler",
      laundryType: "Setrika Saja",
      total: 25000,
      progress: 1,
      weight: 1.5,
    },
    {
      id: "#QL-2026-004",
      status: "Selesai",
      type: "riwayat",
      service: "Reguler",
      laundryType: "Layanan Express",
      total: 50000,
      weight: 4,
    },
  ];

  const getSteps = (service) => {
    switch (service) {
      case "Pickup & Delivery":
        return ["Pickup", "Dicuci", "Setrika", "Dikirim", "Selesai"];
      case "Pickup":
        return ["Pickup", "Dicuci", "Setrika", "Selesai"];
      default:
        return ["Diproses", "Dicuci", "Setrika", "Selesai"];
    }
  };

  const getServiceUI = (service) => {
    switch (service) {
      case "Pickup & Delivery":
        return {
          icon: <Truck size={14} />,
          style: "bg-indigo-100 text-indigo-600",
        };
      case "Pickup":
        return {
          icon: <Bike size={14} />,
          style: "bg-amber-100 text-amber-600",
        };
      default:
        return {
          icon: <Home size={14} />,
          style: "bg-emerald-100 text-emerald-600",
        };
    }
  };

  const getLaundryUI = () => ({
    icon: <Sparkles size={14} />,
    style: "bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-200",
  });

  const filteredOrders = orders.filter((o) => o.type === tab);

  return (
    <div className="min-h-screen pb-28">
      {/* HEADER */}
      <div className="px-4 pt-2">
        <h1 className="text-lg font-semibold text-slate-800 dark:text-slate-100">
          Orders
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Pantau semua laundry kamu
        </p>
      </div>

      {/* TABS */}
      <div className="px-4 mt-4">
        <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
          {["aktif", "riwayat"].map((item) => (
            <button
              key={item}
              onClick={() => setTab(item)}
              className={`flex-1 py-2 text-xs rounded-lg capitalize transition ${
                tab === item
                  ? "bg-white dark:bg-slate-900 shadow text-slate-800 dark:text-white"
                  : "text-slate-500"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      {/* LIST */}
      <div className="px-4 mt-4 space-y-3">
        {filteredOrders.length === 0 && (
          <div className="text-center text-xs text-slate-400 mt-10">
            Belum ada order
          </div>
        )}

        {filteredOrders.map((order, index) => {
          const serviceUI = getServiceUI(order.service);
          const laundryUI = getLaundryUI();
          const steps = getSteps(order.service);

          return (
            <div
              key={index}
              className="bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-sm border border-slate-200/50 dark:border-slate-700/50"
            >
              {/* TOP */}
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-semibold dark:text-slate-100">
                    {order.id}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {order.status}
                  </p>
                </div>

                {order.type === "aktif" ? (
                  <Clock size={18} className="text-amber-500" />
                ) : (
                  <CheckCircle2 size={18} className="text-emerald-500" />
                )}
              </div>

              {/* BADGE + PRICE */}
              <div className="flex justify-between items-center mt-3 gap-2 flex-wrap">
                <div className="flex gap-2 flex-wrap">
                  <div
                    className={`flex items-center gap-1 px-2 py-1 rounded-lg text-[10px] font-medium ${serviceUI.style}`}
                  >
                    {serviceUI.icon}
                    {order.service}
                  </div>

                  <div
                    className={`flex items-center gap-1 px-2 py-1 rounded-lg text-[10px] font-medium ${laundryUI.style}`}
                  >
                    {laundryUI.icon}
                    {order.laundryType}
                  </div>
                </div>

                <p className="text-sm font-semibold text-indigo-600">
                  Rp {order.total.toLocaleString("id-ID")}
                </p>
              </div>

              {/* TRACKING */}
              {order.type === "aktif" && (
                <div className="flex justify-between mt-4">
                  {steps.map((step, i) => (
                    <div key={i} className="flex-1 text-center relative">
                      {i !== 0 && (
                        <div
                          className={`absolute top-2 left-0 w-full h-[2px] ${
                            i <= order.progress
                              ? "bg-indigo-500"
                              : "bg-slate-200 dark:bg-slate-700"
                          }`}
                        />
                      )}

                      <div
                        className={`w-3 h-3 mx-auto rounded-full ${
                          i <= order.progress
                            ? "bg-indigo-500"
                            : "bg-slate-300 dark:bg-slate-600"
                        }`}
                      />

                      <p className="text-[9px] mt-1 text-slate-400">{step}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* FOOTER */}
              <div className="flex justify-between items-center mt-4 text-xs text-slate-500">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1">
                    <Package size={14} />3 item
                  </div>

                  <div className="text-[11px] font-medium text-slate-600 dark:text-slate-300">
                    {order.weight} kg
                  </div>
                </div>

                {order.type === "aktif" && (
                  <div className="flex items-center gap-1 text-indigo-500">
                    <Truck size={14} />
                    Tracking
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* FLOAT BUTTON */}
      <div className="fixed bottom-24 right-5">
        <button
          onClick={() => setIsModalOpen(true)}
          className="w-14 h-14 rounded-full bg-gradient-to-r from-indigo-600 to-cyan-500 text-white shadow-xl flex items-center justify-center active:scale-95 transition"
        >
          <Plus size={24} />
        </button>
      </div>

      {/* MODAL */}
      <OrderModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default Orders;
