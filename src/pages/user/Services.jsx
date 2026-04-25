import { useState } from "react";
import {
  Shirt,
  Sparkles,
  Clock,
  Zap,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";

import OrderModal from "../../components/modal/OrderModal";

const SERVICES = [
  {
    id: 1,
    name: "Cuci Saja",
    desc: "Cuci bersih tanpa setrika",
    price: "Rp 6.000/kg",
    est: "1-2 hari",
    icon: <Shirt size={18} />,
    gradient: "from-sky-400 to-blue-500",
    iconBg: "bg-blue-500",
  },
  {
    id: 2,
    name: "Cuci + Setrika",
    desc: "Paket lengkap, siap pakai",
    price: "Rp 8.000/kg",
    est: "2-3 hari",
    icon: <Sparkles size={18} />,
    gradient: "from-indigo-400 to-indigo-600",
    iconBg: "bg-indigo-500",
  },
  {
    id: 3,
    name: "Setrika Saja",
    desc: "Rapikan pakaian kamu",
    price: "Rp 5.000/kg",
    est: "1 hari",
    icon: <Shirt size={18} />,
    gradient: "from-amber-400 to-orange-500",
    iconBg: "bg-orange-500",
  },
  {
    id: 4,
    name: "Layanan Express",
    desc: "Prioritas, selesai lebih cepat",
    price: "+ Rp 3.000/kg",
    est: "< 24 jam",
    icon: <Zap size={18} />,
    gradient: "from-rose-400 to-pink-500",
    iconBg: "bg-rose-500",
    highlight: true,
  },
];

const Services = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);

  const handleOrder = (service) => {
    setSelectedService(service);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen pb-28">
      {/* HEADER */}
      <div className="px-4 pt-2">
        <h1 className="text-lg font-semibold text-slate-800 dark:text-slate-100">
          Layanan
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Pilih layanan laundry sesuai kebutuhan kamu
        </p>
      </div>

      {/* LIST */}
      <div className="px-4 mt-4 space-y-4">
        {SERVICES.map((item) => (
          <div
            key={item.id}
            className={`relative overflow-hidden rounded-3xl p-[1px] bg-gradient-to-br ${item.gradient} shadow-md`}
          >
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-4">
              {/* TOP */}
              <div className="flex justify-between items-start">
                <div className="flex gap-3">
                  <div
                    className={`text-white ${item.iconBg} p-2 rounded-xl shadow`}
                  >
                    {item.icon}
                  </div>

                  <div>
                    <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-100">
                      {item.name}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {item.desc}
                    </p>
                  </div>
                </div>

                {item.highlight && (
                  <div className="text-[10px] px-2 py-1 rounded-lg bg-rose-100 text-rose-600 font-medium">
                    Express
                  </div>
                )}
              </div>

              {/* INFO */}
              <div className="flex justify-between items-center mt-4">
                <div className="text-xs text-slate-500 space-y-1">
                  <div className="flex items-center gap-1">
                    <Clock size={12} />
                    {item.est}
                  </div>
                </div>

                <p className="text-sm font-semibold text-indigo-600">
                  {item.price}
                </p>
              </div>

              {/* CTA */}
              <button
                onClick={() => handleOrder(item)}
                className="mt-4 w-full flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-600 to-cyan-500 text-white py-2 rounded-xl text-sm font-medium shadow hover:scale-105 transition"
              >
                Pilih Layanan
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* EXTRA INFO */}
      <div className="px-4 mt-6">
        <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-sm border border-slate-200/50 dark:border-slate-700/50">
          <div className="flex items-center gap-2 text-emerald-500">
            <CheckCircle2 size={16} />
            <p className="text-xs font-medium">
              Semua layanan menggunakan deterjen premium & aman
            </p>
          </div>

          <p className="text-[11px] text-slate-500 mt-2">
            Harga dapat berubah tergantung jenis pakaian & tingkat kotor.
          </p>
        </div>
      </div>

      {/* MODAL */}
      <OrderModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        selectedService={selectedService}
      />
    </div>
  );
};

export default Services;
