import React, { useState } from "react";
import {
  Search,
  UserPlus,
  ChevronRight,
  Clock,
  Wallet,
  MessageCircle,
} from "lucide-react";

const Karyawan = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const employees = [
    {
      id: "EMP-001",
      name: "Aniki",
      phone: "6281234567890",
      role: "Kasir",
      shift: "Pagi",
      salary: 2500000,
      status: "Aktif",
    },
    {
      id: "EMP-002",
      name: "Budi Santoso",
      phone: "6287765432100",
      role: "Operator",
      shift: "Siang",
      salary: 2300000,
      status: "Aktif",
    },
    {
      id: "EMP-003",
      name: "Siska Putri",
      phone: "6281900887766",
      role: "Kurir",
      shift: "Flexible",
      salary: 2000000,
      status: "Training",
    },
  ];

  const filtered = employees.filter((emp) =>
    emp.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const shiftBadge = (shift) => {
    switch (shift) {
      case "Pagi":
        return "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400";
      case "Siang":
        return "bg-sky-100 text-sky-700 dark:bg-sky-900/30 dark:text-sky-400";
      case "Sore":
        return "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400";
      default:
        return "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300";
    }
  };

  const roleBadge = (role) => {
    switch (role) {
      case "Kasir":
        return "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400";
      case "Operator":
        return "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400";
      case "Kurir":
        return "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400";
      default:
        return "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300";
    }
  };

  return (
    <div className="space-y-6 pb-24 lg:pb-10">
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-xl font-black text-queen-navy dark:text-white">
            Data Staff
          </h1>
          <p className="text-xs text-gray-500">
            Kelola karyawan & operasional laundry
          </p>
        </div>

        <button className="flex items-center gap-2 px-5 py-3 bg-queen-navy text-white text-xs font-bold rounded-2xl shadow-lg">
          <UserPlus size={18} />
          Tambah Staff
        </button>
      </div>

      {/* SEARCH */}
      <div className="relative">
        <Search
          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          size={18}
        />
        <input
          type="text"
          placeholder="Cari nama karyawan..."
          className="w-full pl-11 pr-4 py-3 rounded-2xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 dark:text-white focus:ring-2 focus:ring-queen-gold outline-none text-sm"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* ================= DESKTOP ================= */}
      <div className="hidden lg:block bg-white dark:bg-slate-800 rounded-[2rem] border overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 dark:bg-slate-900 text-[10px] uppercase text-gray-400">
            <tr>
              <th className="px-6 py-4">Karyawan</th>
              <th className="px-6 py-4">Role</th>
              <th className="px-6 py-4">Shift</th>
              <th className="px-6 py-4">Gaji</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Aksi</th>
            </tr>
          </thead>

          <tbody>
            {filtered.map((emp) => (
              <tr key={emp.id} className="border-t">
                {/* NAME */}
                <td className="px-6 py-5">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-xl bg-queen-gold/20 flex items-center justify-center font-bold">
                      {emp.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-bold dark:text-white">{emp.name}</p>
                      <p className="text-xs text-gray-400">{emp.id}</p>
                    </div>
                  </div>
                </td>

                {/* ROLE */}
                <td className="px-6 py-5">
                  <span
                    className={`px-3 py-1 rounded-lg text-xs font-bold ${roleBadge(
                      emp.role
                    )}`}
                  >
                    {emp.role}
                  </span>
                </td>

                {/* SHIFT */}
                <td className="px-6 py-5">
                  <span
                    className={`px-3 py-1 rounded-lg text-xs font-bold flex items-center gap-1 w-fit ${shiftBadge(
                      emp.shift
                    )}`}
                  >
                    <Clock size={12} />
                    {emp.shift}
                  </span>
                </td>

                {/* SALARY */}
                <td className="px-6 py-5 font-semibold dark:text-white text-black">
                  Rp {emp.salary.toLocaleString("id-ID")}
                </td>

                {/* STATUS */}
                <td className="px-6 py-5">
                  <span
                    className={`px-3 py-1 rounded-lg text-xs font-bold ${
                      emp.status === "Aktif"
                        ? "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400"
                        : "bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400"
                    }`}
                  >
                    {emp.status}
                  </span>
                </td>

                {/* ACTION */}
                <td className="px-6 py-5 text-right">
                  <div className="flex justify-end gap-2">
                    {/* WHATSAPP BUTTON */}
                    <a
                      href={`https://wa.me/${emp.phone}`}
                      target="_blank"
                      rel="noreferrer"
                      className="p-2 text-green-600 hover:bg-green-100 dark:hover:bg-green-900/30 rounded-xl transition"
                    >
                      <MessageCircle size={18} />
                    </a>

                    {/* DETAIL */}
                    <button className="p-2 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-xl">
                      <ChevronRight size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ================= MOBILE ================= */}
      <div className="lg:hidden space-y-4">
        {filtered.map((emp) => (
          <div
            key={emp.id}
            className="bg-white dark:bg-slate-800 p-5 rounded-3xl border shadow-sm"
          >
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-black text-lg dark:text-white">{emp.name}</h3>
              <span
                className={`text-xs font-bold ${
                  emp.status === "Aktif" ? "text-green-600" : "text-yellow-600"
                }`}
              >
                {emp.status}
              </span>
            </div>

            <div className="flex gap-2 mb-3">
              <span
                className={`px-2 py-1 text-xs rounded-lg font-bold ${roleBadge(
                  emp.role
                )}`}
              >
                {emp.role}
              </span>
              <span
                className={`px-2 py-1 text-xs rounded-lg font-bold ${shiftBadge(
                  emp.shift
                )}`}
              >
                {emp.shift}
              </span>
            </div>

            <div className="flex items-center gap-2 font-bold text-queen-navy dark:text-queen-gold">
              <Wallet size={14} />
              Rp {emp.salary.toLocaleString("id-ID")}
            </div>

            {/* ACTION */}
            <div className="flex gap-3 mt-4">
              <a
                href={`https://wa.me/${emp.phone}`}
                target="_blank"
                rel="noreferrer"
                className="flex-1 flex items-center justify-center gap-2 py-3 bg-green-500 text-white rounded-xl font-bold"
              >
                <MessageCircle size={16} />
                Chat
              </a>

              <button className="flex-1 py-3 bg-queen-navy text-white rounded-xl font-bold">
                Detail
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Karyawan;
