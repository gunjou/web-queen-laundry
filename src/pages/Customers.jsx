import React, { useState } from "react";
import {
  Search,
  UserPlus,
  Phone,
  MapPin,
  MessageCircle,
  MoreVertical,
  ChevronRight,
  User,
  Mail,
  History,
} from "lucide-react";

const Customers = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const customers = [
    {
      id: "CUST-001",
      name: "Aniki",
      phone: "081234567890",
      address: "Jl. Pendidikan No. 15, Mataram",
      totalOrders: 12,
      lastOrder: "2 hari yang lalu",
      status: "Loyal",
    },
    {
      id: "CUST-002",
      name: "Budi Santoso",
      phone: "087765432100",
      address: "Perumahan Griya Asri Blok C-12",
      totalOrders: 5,
      lastOrder: "1 minggu yang lalu",
      status: "Reguler",
    },
    {
      id: "CUST-003",
      name: "Siska Putri",
      phone: "081900887766",
      address: "Kost Hijau, Sekitar Kampus UNRAM",
      totalOrders: 1,
      lastOrder: "Baru Terdaftar",
      status: "Baru",
    },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-24 lg:pb-10">
      {/* Header & Add Button */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-queen-navy dark:text-white">
            Data Pelanggan
          </h1>
          <p className="text-sm text-gray-500">
            Kelola informasi dan riwayat pelanggan
          </p>
        </div>

        <button className="flex items-center justify-center gap-2 px-6 py-3 bg-queen-navy text-white font-bold rounded-2xl hover:bg-slate-800 transition-all shadow-lg shadow-queen-navy/20">
          <UserPlus size={20} />
          <span>Tambah Pelanggan</span>
        </button>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search
          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          size={20}
        />
        <input
          type="text"
          placeholder="Cari nama, nomor HP, atau alamat..."
          className="w-full pl-12 pr-4 py-4 rounded-[1.5rem] border border-gray-100 dark:border-slate-700 bg-white dark:bg-slate-800 dark:text-white focus:ring-2 focus:ring-queen-gold outline-none shadow-sm transition-all"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* DESKTOP VIEW (TABLE) */}
      <div className="hidden lg:block bg-white dark:bg-slate-800 rounded-[2.5rem] shadow-sm border border-gray-100 dark:border-slate-700/50 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 dark:bg-slate-900/50 text-[10px] uppercase tracking-widest text-gray-400 font-bold">
            <tr>
              <th className="px-8 py-5">Nama Pelanggan</th>
              <th className="px-8 py-5">Kontak & Alamat</th>
              <th className="px-8 py-5">Riwayat</th>
              <th className="px-8 py-5">Status</th>
              <th className="px-8 py-5 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-slate-700">
            {customers.map((cust) => (
              <tr
                key={cust.id}
                className="hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors group"
              >
                <td className="px-8 py-6">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-2xl bg-queen-gold/10 flex items-center justify-center text-queen-navy font-black">
                      {cust.name.charAt(0)}
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-black text-queen-navy dark:text-white">
                        {cust.name}
                      </span>
                      <span className="text-[10px] text-gray-400 font-bold">
                        {cust.id}
                      </span>
                    </div>
                  </div>
                </td>
                <td className="px-8 py-6 text-sm">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-gray-600 dark:text-slate-300">
                      <Phone size={14} className="text-green-500" />{" "}
                      {cust.phone}
                    </div>
                    <div className="flex items-center gap-2 text-gray-400 text-xs">
                      <MapPin size={14} /> {cust.address}
                    </div>
                  </div>
                </td>
                <td className="px-8 py-6">
                  <div className="text-xs">
                    <p className="font-bold text-queen-navy dark:text-queen-gold-light">
                      {cust.totalOrders} Order
                    </p>
                    <p className="text-gray-400">{cust.lastOrder}</p>
                  </div>
                </td>
                <td className="px-8 py-6">
                  <span className="px-3 py-1 bg-slate-100 dark:bg-slate-700 rounded-lg text-[10px] font-black uppercase tracking-tighter">
                    {cust.status}
                  </span>
                </td>
                <td className="px-8 py-6 text-right">
                  <div className="flex justify-end gap-2">
                    <button className="p-2 text-green-600 hover:bg-green-50 rounded-xl transition-colors">
                      <MessageCircle size={20} />
                    </button>
                    <button className="p-2 text-gray-400 hover:bg-gray-100 rounded-xl">
                      <ChevronRight size={20} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MOBILE VIEW (CARDS) */}
      <div className="lg:hidden space-y-4">
        {customers.map((cust) => (
          <div
            key={cust.id}
            className="bg-white dark:bg-slate-800 p-5 rounded-[2.5rem] border border-gray-100 dark:border-slate-700 shadow-sm"
          >
            <div className="flex items-center gap-4 mb-5">
              <div className="h-14 w-14 rounded-3xl bg-queen-navy text-queen-gold flex items-center justify-center text-xl font-black shadow-lg shadow-queen-navy/10">
                {cust.name.charAt(0)}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-black text-queen-navy dark:text-white truncate">
                  {cust.name}
                </h3>
                <div className="flex items-center gap-2 text-green-600 font-bold text-sm">
                  <Phone size={14} /> {cust.phone}
                </div>
              </div>
              <span className="bg-queen-gold/10 text-queen-navy dark:text-queen-gold px-2 py-1 rounded-md text-[9px] font-black uppercase tracking-widest">
                {cust.status}
              </span>
            </div>

            <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-3xl space-y-3 mb-5">
              <div className="flex items-start gap-3">
                <MapPin size={16} className="text-gray-400 shrink-0 mt-0.5" />
                <p className="text-xs text-gray-600 dark:text-slate-400 leading-relaxed">
                  {cust.address}
                </p>
              </div>
              <div className="flex justify-between border-t border-gray-200 dark:border-slate-700 pt-3">
                <div className="flex items-center gap-2 text-[11px] font-bold text-gray-400">
                  <History size={14} /> {cust.totalOrders} Kali Order
                </div>
                <div className="text-[11px] text-queen-navy dark:text-queen-gold font-bold">
                  {cust.lastOrder}
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <a
                href={`https://wa.me/${cust.phone}`}
                target="_blank"
                rel="noreferrer"
                className="flex-1 flex items-center justify-center gap-2 py-3.5 bg-green-500 text-white rounded-2xl font-bold shadow-lg shadow-green-500/20 active:scale-95 transition-all"
              >
                <MessageCircle size={18} />
                <span>WhatsApp</span>
              </a>
              <button className="px-5 py-3.5 bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-white rounded-2xl font-bold active:scale-95 transition-all">
                Detail
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Customers;
