import React, { useState } from "react";
import {
  Plus,
  Edit3,
  Trash2,
  Package,
  Zap,
  Clock,
  Info,
  CheckCircle2,
  ChevronRight,
  DollarSign,
} from "lucide-react";
import Swal from "sweetalert2";

const Services = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const laundryServices = [
    {
      id: "SRV-001",
      name: "Cuci Setrika",
      price: 7000,
      unit: "Kg",
      duration: "2-3 Hari",
      category: "Reguler",
      icon: Clock,
      color: "text-blue-500",
      bg: "bg-blue-50",
    },
    {
      id: "SRV-002",
      name: "Cuci Kering",
      price: 5000,
      unit: "Kg",
      duration: "2 Hari",
      category: "Reguler",
      icon: Package,
      color: "text-purple-500",
      bg: "bg-purple-50",
    },
    {
      id: "SRV-003",
      name: "Express 6 Jam",
      price: 15000,
      unit: "Kg",
      duration: "6 Jam",
      category: "Premium",
      icon: Zap,
      color: "text-orange-500",
      bg: "bg-orange-50",
    },
    {
      id: "SRV-004",
      name: "Setrika Saja",
      price: 4000,
      unit: "Kg",
      duration: "1 Hari",
      category: "Reguler",
      icon: CheckCircle2,
      color: "text-green-500",
      bg: "bg-green-50",
    },
  ];

  const handleDelete = (name) => {
    Swal.fire({
      title: "Hapus Layanan?",
      text: `Layanan ${name} akan dihapus permanen.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#1B305B",
      confirmButtonText: "Ya, Hapus!",
    });
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-24 lg:pb-10">
      {/* Header & Add Layanan */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-queen-navy dark:text-white">
            Katalog Layanan
          </h1>
          <p className="text-sm text-gray-500">
            Atur jenis cucian dan harga per unit
          </p>
        </div>

        <button className="flex items-center justify-center gap-2 px-6 py-4 bg-queen-navy text-white font-black rounded-2xl hover:bg-slate-800 transition-all shadow-xl shadow-queen-navy/20 active:scale-95 text-sm uppercase tracking-widest">
          <Plus size={20} className="text-queen-gold" />
          <span>Tambah Layanan</span>
        </button>
      </div>

      {/* Stats Mini - Eye Catching */}
      <div className="p-4 bg-queen-gold/10 border border-queen-gold/20 rounded-3xl flex items-center gap-4">
        <div className="p-3 bg-white dark:bg-slate-800 rounded-2xl shadow-sm text-queen-navy">
          <Info size={20} />
        </div>
        <p className="text-xs md:text-sm font-bold text-queen-navy dark:text-queen-gold-light leading-relaxed">
          Tips: Gunakan kategori{" "}
          <span className="underline italic text-orange-600 font-black">
            Premium
          </span>{" "}
          untuk layanan kilat/express guna meningkatkan pendapatan harian.
        </p>
      </div>

      {/* DESKTOP VIEW (TABLE) */}
      <div className="hidden lg:block bg-white dark:bg-slate-800 rounded-[2.5rem] shadow-sm border border-gray-100 dark:border-slate-700/50 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 dark:bg-slate-900/50 text-[10px] uppercase tracking-widest text-gray-400 font-bold">
            <tr>
              <th className="px-8 py-5">Nama Layanan</th>
              <th className="px-8 py-5">Harga per Unit</th>
              <th className="px-8 py-5">Estimasi Waktu</th>
              <th className="px-8 py-5">Kategori</th>
              <th className="px-8 py-5 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-slate-700">
            {laundryServices.map((service) => (
              <tr
                key={service.id}
                className="hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors group"
              >
                <td className="px-8 py-6">
                  <div className="flex items-center gap-4">
                    <div
                      className={`p-3 rounded-2xl ${service.bg} dark:bg-opacity-10 ${service.color}`}
                    >
                      <service.icon size={22} />
                    </div>
                    <span className="text-sm font-black text-queen-navy dark:text-white">
                      {service.name}
                    </span>
                  </div>
                </td>
                <td className="px-8 py-6 font-black text-sm text-queen-navy dark:text-queen-gold">
                  Rp {service.price.toLocaleString()}{" "}
                  <span className="text-xs font-medium text-gray-400">
                    / {service.unit}
                  </span>
                </td>
                <td className="px-8 py-6">
                  <div className="flex items-center gap-2 text-xs font-bold text-gray-500">
                    <Clock size={14} /> {service.duration}
                  </div>
                </td>
                <td className="px-8 py-6">
                  <span
                    className={`px-4 py-1 rounded-lg text-[10px] font-black uppercase tracking-tighter ${
                      service.category === "Premium"
                        ? "bg-orange-100 text-orange-600"
                        : "bg-blue-100 text-blue-600"
                    }`}
                  >
                    {service.category}
                  </span>
                </td>
                <td className="px-8 py-6 text-right">
                  <div className="flex justify-end gap-2">
                    <button className="p-2.5 text-blue-500 hover:bg-blue-50 rounded-xl transition-all">
                      <Edit3 size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(service.name)}
                      className="p-2.5 text-red-500 hover:bg-red-50 rounded-xl transition-all"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MOBILE VIEW (CARDS) */}
      <div className="lg:hidden grid grid-cols-1 md:grid-cols-2 gap-4">
        {laundryServices.map((service) => (
          <div
            key={service.id}
            className="bg-white dark:bg-slate-800 p-6 rounded-[2.5rem] border border-gray-100 dark:border-slate-700 shadow-sm relative overflow-hidden group"
          >
            <div
              className={`absolute top-0 right-0 p-4 ${service.color} opacity-10 group-hover:scale-150 transition-transform duration-700`}
            >
              <service.icon size={80} />
            </div>

            <div className="relative z-10">
              <div className="flex justify-between items-start mb-6">
                <div
                  className={`p-4 rounded-3xl ${service.bg} dark:bg-opacity-10 ${service.color} shadow-sm`}
                >
                  <service.icon size={24} />
                </div>
                <span
                  className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest ${
                    service.category === "Premium"
                      ? "bg-orange-100 text-orange-600"
                      : "bg-blue-100 text-blue-600"
                  }`}
                >
                  {service.category}
                </span>
              </div>

              <div className="mb-6">
                <h3 className="text-xl font-black text-queen-navy dark:text-white mb-1">
                  {service.name}
                </h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-black text-queen-navy dark:text-queen-gold">
                    Rp {service.price.toLocaleString()}
                  </span>
                  <span className="text-xs font-bold text-gray-400">
                    /{service.unit}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-6 border-t border-gray-100 dark:border-slate-700">
                <div className="flex items-center gap-2 text-xs font-bold text-gray-500">
                  <Clock size={16} className={service.color} />{" "}
                  {service.duration}
                </div>
                <div className="flex gap-2">
                  <button className="p-3 bg-gray-50 dark:bg-slate-700 text-blue-500 rounded-2xl active:scale-90 transition-all">
                    <Edit3 size={18} />
                  </button>
                  <button
                    onClick={() => handleDelete(service.name)}
                    className="p-3 bg-gray-50 dark:bg-slate-700 text-red-500 rounded-2xl active:scale-90 transition-all"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;
