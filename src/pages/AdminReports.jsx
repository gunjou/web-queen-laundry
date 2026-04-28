import { useState } from "react";
import { DollarSign, Package, Scale, Calendar, TrendingUp } from "lucide-react";

import RevenueChart from "../components/dashboard/RevenueChart";

/* 🔥 DATA CHART SIMULASI */
const chartData = {
  daily: [
    { name: "Sen", value: 20000 },
    { name: "Sel", value: 30000 },
    { name: "Rab", value: 25000 },
    { name: "Kam", value: 40000 },
    { name: "Jum", value: 35000 },
    { name: "Sab", value: 50000 },
    { name: "Min", value: 45000 },
  ],
  monthly: [
    { name: "Jan", value: 300000 },
    { name: "Feb", value: 400000 },
    { name: "Mar", value: 350000 },
    { name: "Apr", value: 500000 },
    { name: "Mei", value: 450000 },
    { name: "Jun", value: 600000 },
  ],
  yearly: [
    { name: "2021", value: 8000000 },
    { name: "2022", value: 10000000 },
    { name: "2023", value: 12000000 },
    { name: "2024", value: 14000000 },
    { name: "2025", value: 15000000 },
  ],
};

const AdminReports = () => {
  const [range, setRange] = useState("monthly");

  const dataMap = {
    daily: {
      revenue: 120000,
      orders: 12,
      weight: 28,
      growth: "+5%",
    },
    monthly: {
      revenue: 1250000,
      orders: 120,
      weight: 320,
      growth: "+12%",
    },
    yearly: {
      revenue: 15000000,
      orders: 1500,
      weight: 4200,
      growth: "+20%",
    },
  };

  const summary = dataMap[range];

  const services = [
    { name: "Cuci + Setrika", total: 600000 },
    { name: "Cuci Saja", total: 400000 },
    { name: "Setrika Saja", total: 150000 },
    { name: "Express", total: 100000 },
  ];

  const maxService = Math.max(...services.map((s) => s.total));

  const getLabel = () => {
    const date = new Date();

    if (range === "daily") {
      return date.toLocaleDateString("id-ID", {
        weekday: "short",
        day: "numeric",
        month: "short",
      });
    }

    if (range === "monthly") {
      return date.toLocaleDateString("id-ID", {
        month: "long",
        year: "numeric",
      });
    }

    return date.getFullYear();
  };

  return (
    <div className="min-h-screen pb-28">
      {/* HEADER */}
      <div className="px-4 pt-2 flex justify-between items-start">
        <div>
          <h1 className="text-lg font-semibold text-slate-800 dark:text-slate-100">
            Laporan
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Analisis performa bisnis laundry
          </p>
        </div>

        {/* FILTER */}
        <div className="flex flex-col items-end gap-2">
          <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl text-[10px]">
            {["daily", "monthly", "yearly"].map((item) => (
              <button
                key={item}
                onClick={() => setRange(item)}
                className={`px-3 py-1 rounded-lg capitalize transition ${
                  range === item
                    ? "bg-white dark:bg-slate-900 shadow text-slate-800 dark:text-white"
                    : "text-slate-500"
                }`}
              >
                {item}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 text-xs bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-xl">
            <Calendar size={12} />
            {getLabel()}
          </div>
        </div>
      </div>

      {/* SUMMARY */}
      <div className="px-4 mt-4 grid grid-cols-2 md:grid-cols-3 gap-3">
        <StatCard
          icon={<DollarSign size={16} />}
          label="Omzet"
          value={`Rp ${summary.revenue.toLocaleString("id-ID")}`}
          growth={summary.growth}
          color="from-emerald-400 to-green-500"
        />

        <StatCard
          icon={<Package size={16} />}
          label="Order"
          value={summary.orders}
          growth="+8%"
          color="from-indigo-400 to-indigo-600"
        />

        <StatCard
          icon={<Scale size={16} />}
          label="Berat"
          value={`${summary.weight} kg`}
          growth="+5%"
          color="from-amber-400 to-orange-500"
        />
      </div>

      {/* 🔥 CHART */}
      <div className="px-4 mt-6">
        <RevenueChart
          data={chartData[range]}
          filter={range}
          setFilter={setRange}
        />
      </div>

      {/* SERVICE INSIGHT */}
      <div className="px-4 mt-6">
        <h2 className="text-sm font-semibold mb-2 text-slate-700 dark:text-slate-200">
          Performa Layanan
        </h2>

        <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-sm border border-slate-200/50 dark:border-slate-700/50 space-y-4">
          {services.map((item, i) => {
            const percent = (item.total / maxService) * 100;

            return (
              <div key={i}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-600 dark:text-slate-300">
                    {item.name}
                  </span>
                  <span className="text-indigo-600 font-medium">
                    Rp {item.total.toLocaleString("id-ID")}
                  </span>
                </div>

                <div className="w-full h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-indigo-500 to-cyan-500"
                    style={{ width: `${percent}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

/* STAT CARD */
const StatCard = ({ icon, label, value, growth, color }) => {
  return (
    <div className={`rounded-2xl p-[1px] bg-gradient-to-br ${color}`}>
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-4">
        <div className="flex justify-between">
          <div className="text-slate-500">{icon}</div>
          <div className="flex items-center gap-1 text-[10px] text-emerald-600">
            <TrendingUp size={12} />
            {growth}
          </div>
        </div>

        <p className="text-xs text-slate-500 mt-2">{label}</p>
        <p className="text-sm font-semibold dark:text-white">{value}</p>
      </div>
    </div>
  );
};

export default AdminReports;
