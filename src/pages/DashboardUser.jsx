import { useState } from "react";
import { Plus, Shirt, Truck, Clock, CheckCircle2, MapPin } from "lucide-react";

import OrderModal from "../components/modal/OrderModal";

/* =========================
   SERVICES (COLOR SYSTEM)
========================= */
const SERVICES = [
  {
    id: 1,
    name: "Cuci Kering",
    icon: <Shirt size={18} />,
    color: "from-sky-400 to-blue-500",
    iconBg: "bg-blue-500",
  },
  {
    id: 2,
    name: "Cuci + Setrika",
    icon: <Shirt size={18} />,
    color: "from-indigo-400 to-indigo-600",
    iconBg: "bg-indigo-500",
  },
  {
    id: 3,
    name: "Setrika Saja",
    icon: <Shirt size={18} />,
    color: "from-amber-400 to-orange-500",
    iconBg: "bg-orange-500",
  },
  {
    id: 4,
    name: "Layanan Express",
    icon: <Clock size={18} />,
    color: "from-rose-400 to-pink-500",
    iconBg: "bg-rose-500",
  },
];

const DashboardUser = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const activeOrder = {
    id: "#QL-2026-001",
    status: "Sedang Dicuci",
    steps: ["Pickup", "Dicuci", "Setrika", "Dikirim", "Selesai"],
    currentStep: 1,
  };

  return (
    <div className="min-h-screen pb-28">
      {/* HEADER */}
      <div className="px-4 pt-4 flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold text-slate-800 dark:text-slate-100">
            Halo, Budi 👋
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Mau laundry apa hari ini?
          </p>
        </div>
      </div>

      {/* ADDRESS */}
      <div className="px-4 mt-2 flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
        <MapPin size={14} />
        Jln Katak, Moyo Hilir, Sumbawa Besar
      </div>

      {/* PROMO */}
      <div className="mx-4 mt-4 p-4 rounded-2xl bg-gradient-to-r from-amber-400 via-orange-400 to-rose-400 text-white shadow-lg">
        <p className="text-xs opacity-90">Promo Hari Ini</p>
        <h3 className="font-semibold text-sm">Diskon 20% semua layanan 🎉</h3>
      </div>

      {/* =========================
          SERVICES
      ========================= */}
      <div className="px-4 mt-4">
        <h2 className="text-sm font-semibold mb-2 text-slate-700 dark:text-slate-200">
          Layanan Tersedia
        </h2>
        <div className="grid grid-cols-4 gap-3 px-4">
          {SERVICES.map((item) => (
            <div
              key={item.id}
              className={`relative overflow-hidden rounded-2xl p-[1px] bg-gradient-to-br ${item.color} shadow-md active:scale-95 transition`}
            >
              <div className="bg-white dark:bg-slate-900 rounded-2xl p-3 flex flex-col items-center justify-center">
                <div
                  className={`text-white ${item.iconBg} p-2 rounded-xl mb-1 shadow`}
                >
                  {item.icon}
                </div>
                <p className="text-[10px] text-center font-medium text-slate-700 dark:text-slate-200">
                  {item.name}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* =========================
          ACTIVE ORDER (2 COL ONLY HERE)
      ========================= */}
      <div className="px-4 mt-6">
        <h2 className="text-sm font-semibold mb-2 text-slate-700 dark:text-slate-200">
          Order Aktif
        </h2>

        <div className="md:grid md:grid-cols-3 md:gap-4">
          {/* LEFT: TRACKING */}
          <div className="md:col-span-2">
            <div className="bg-gradient-to-br from-indigo-600 via-blue-600 to-cyan-500 text-white p-4 rounded-3xl shadow-xl">
              <p className="text-xs opacity-80">{activeOrder.id}</p>
              <h3 className="font-bold text-lg">{activeOrder.status}</h3>

              <div className="flex items-center gap-2 text-xs mt-1 opacity-90">
                <Truck size={14} />
                Kurir menuju lokasi
              </div>

              {/* STEP */}
              <div className="flex justify-between mt-5">
                {activeOrder.steps.map((step, index) => (
                  <div key={index} className="flex-1 text-center relative">
                    {index !== 0 && (
                      <div
                        className={`absolute top-2 left-0 w-full h-[2px] ${
                          index <= activeOrder.currentStep
                            ? "bg-amber-300"
                            : "bg-white/20"
                        }`}
                      />
                    )}

                    <div
                      className={`w-4 h-4 mx-auto rounded-full ${
                        index <= activeOrder.currentStep
                          ? "bg-amber-300"
                          : "bg-white/30"
                      }`}
                    />

                    <p className="text-[9px] mt-2 opacity-80">{step}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT: ACTION CARD (DESKTOP ONLY) */}
          <div className="hidden md:block">
            <div className="bg-white dark:bg-slate-800 p-5 rounded-3xl shadow-md border border-slate-200/50 dark:border-slate-700/50 h-full flex flex-col justify-between">
              <div>
                <p className="text-xs text-slate-500">Aksi cepat</p>
                <h3 className="font-semibold text-slate-800 dark:text-slate-100">
                  Tambah cucian?
                </h3>

                <p className="text-xs text-slate-500 mt-2">
                  Tambahkan laundry tanpa buat order baru.
                </p>
              </div>

              <button
                onClick={() => setIsModalOpen(true)}
                className="mt-4 w-full flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-600 to-cyan-500 text-white py-2 rounded-xl font-medium shadow hover:scale-105 transition"
              >
                <Plus size={18} />
                Tambah Order
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* HISTORY */}
      <div className="px-4 mt-6">
        <h2 className="text-sm font-semibold mb-2 text-slate-700 dark:text-slate-200">
          Riwayat
        </h2>

        <div className="space-y-2">
          {[1, 2].map((_, i) => (
            <div
              key={i}
              className="flex justify-between items-center bg-white dark:bg-slate-800 p-3 rounded-2xl shadow-sm border border-slate-200/50 dark:border-slate-700/50"
            >
              <div>
                <p className="text-sm font-medium dark:text-slate-100">
                  #QL-2026-00{i}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Selesai
                </p>
              </div>
              <CheckCircle2 className="text-emerald-500" size={18} />
            </div>
          ))}
        </div>
      </div>

      {/* FLOAT BUTTON (MOBILE ONLY) */}
      <div className="fixed bottom-24 right-5 md:hidden">
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

export default DashboardUser;
