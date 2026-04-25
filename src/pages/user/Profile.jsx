import { useState } from "react";
import {
  User,
  MapPin,
  Phone,
  Mail,
  LogOut,
  ChevronRight,
  Package,
  Scale,
  Settings,
} from "lucide-react";

const Profile = () => {
  const [user] = useState({
    name: "Budi Santoso",
    email: "budi@email.com",
    phone: "0812-3456-7890",
    address: "Jln Katak, Moyo Hilir, Sumbawa Besar",
  });

  return (
    <div className="min-h-screen pb-28">
      {/* HEADER PROFILE */}
      <div className="px-4 pt-4">
        <div className="bg-gradient-to-br from-indigo-600 to-cyan-500 rounded-3xl p-5 text-white shadow-xl">
          <div className="flex items-center gap-4">
            {/* AVATAR */}
            <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center text-xl font-bold">
              {user.name.charAt(0)}
            </div>

            {/* INFO */}
            <div>
              <h2 className="font-semibold text-lg">{user.name}</h2>
              <p className="text-xs opacity-80">Member sejak 2026</p>
            </div>
          </div>

          {/* QUICK STATS */}
          <div className="flex justify-between mt-5 text-xs">
            <div>
              <p className="opacity-80">Total Order</p>
              <p className="font-semibold text-sm">12</p>
            </div>
            <div>
              <p className="opacity-80">Total Kg</p>
              <p className="font-semibold text-sm">28 kg</p>
            </div>
            <div>
              <p className="opacity-80">Aktif</p>
              <p className="font-semibold text-sm">2</p>
            </div>
          </div>
        </div>
      </div>

      {/* INFO AKUN */}
      <div className="px-4 mt-6 space-y-3">
        <h2 className="text-sm font-semibold text-slate-700 dark:text-slate-200">
          Informasi Akun
        </h2>

        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200/50 dark:border-slate-700/50 divide-y dark:divide-slate-700">
          <Item icon={<User size={16} />} label="Nama" value={user.name} />
          <Item icon={<Mail size={16} />} label="Email" value={user.email} />
          <Item icon={<Phone size={16} />} label="No. HP" value={user.phone} />
          <Item
            icon={<MapPin size={16} />}
            label="Alamat"
            value={user.address}
          />
        </div>
      </div>

      {/* MENU */}
      <div className="px-4 mt-6 space-y-3">
        <h2 className="text-sm font-semibold text-slate-700 dark:text-slate-200">
          Pengaturan
        </h2>

        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200/50 dark:border-slate-700/50 divide-y dark:divide-slate-700">
          <MenuItem icon={<Settings size={16} />} label="Edit Profile" />
          <MenuItem icon={<Package size={16} />} label="Riwayat Order" />
          <MenuItem icon={<Scale size={16} />} label="Statistik Laundry" />
        </div>
      </div>

      {/* LOGOUT */}
      <div className="px-4 mt-6">
        <button className="w-full flex items-center justify-center gap-2 bg-red-500 text-white py-3 rounded-2xl font-medium shadow hover:scale-105 transition">
          <LogOut size={18} />
          Keluar
        </button>
      </div>
    </div>
  );
};

/* =========================
   COMPONENTS
========================= */

const Item = ({ icon, label, value }) => {
  return (
    <div className="flex items-start gap-3 p-4">
      <div className="text-slate-500">{icon}</div>

      <div className="flex-1">
        <p className="text-[11px] text-slate-400">{label}</p>
        <p className="text-sm font-medium text-slate-800 dark:text-slate-100">
          {value}
        </p>
      </div>
    </div>
  );
};

const MenuItem = ({ icon, label }) => {
  return (
    <button className="w-full flex items-center justify-between p-4 text-left hover:bg-slate-50 dark:hover:bg-slate-700/50 transition">
      <div className="flex items-center gap-3">
        <div className="text-slate-500">{icon}</div>
        <span className="text-sm text-slate-700 dark:text-slate-200">
          {label}
        </span>
      </div>

      <ChevronRight size={16} className="text-slate-400" />
    </button>
  );
};

export default Profile;
