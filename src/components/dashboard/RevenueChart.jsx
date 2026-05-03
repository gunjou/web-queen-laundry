import {
  ResponsiveContainer,
  Tooltip,
  CartesianGrid,
  XAxis,
  YAxis,
  AreaChart,
  Area,
} from "recharts";
import { formatRupiah } from "../../utils/format";
import { useMemo } from "react";

const RevenueChart = ({ data = [], filter, setFilter }) => {
  const chartData = useMemo(() => {
    return data.map((item) => ({
      name: item.label?.trim(),
      value: Number(item.total || 0),
    }));
  }, [data]);

  const totalRevenue = useMemo(() => {
    return chartData.reduce((sum, item) => sum + item.value, 0);
  }, [chartData]);

  const subtitle = useMemo(() => {
    if (filter === "Minggu") return "Total minggu ini:";
    if (filter === "Bulan") return "Total bulan ini:";
    return "Total tahun ini:";
  }, [filter]);

  return (
    <div className="bg-white dark:bg-slate-800 p-5 rounded-3xl border border-gray-100 dark:border-slate-700 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-4">
        <div>
          <h3 className="font-bold text-sm md:text-base dark:text-white text-queen-navy">
            Statistik Pendapatan
          </h3>

          <p className="text-xs text-gray-400">
            {subtitle}
            <span className="ml-1 font-semibold text-queen-navy dark:text-white">
              Rp {formatRupiah(totalRevenue)}
            </span>
          </p>
        </div>

        <div className="flex gap-2">
          {["Minggu", "Bulan", "Tahun"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1.5 text-xs rounded-lg transition-all ${
                filter === f
                  ? "bg-queen-navy text-white shadow"
                  : "bg-gray-100 dark:bg-slate-700 text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-slate-600/50"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="h-48 sm:h-56 md:h-60">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ left: -10, right: 10 }}>
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#1e3a8a" stopOpacity={0.4} />
                <stop offset="100%" stopColor="#1e3a8a" stopOpacity={0} />
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="3 3" vertical={false} />

            <XAxis dataKey="name" tick={{ fontSize: 10 }} />

            <YAxis
              width={45}
              tick={{ fontSize: 10 }}
              tickFormatter={(v) => `${Math.round(v / 1000)}k`}
            />

            <Tooltip
              formatter={(v) => `Rp ${formatRupiah(v)}`}
              contentStyle={{ borderRadius: "10px" }}
            />

            <Area
              type="monotone"
              dataKey="value"
              stroke="#1e3a8a"
              strokeWidth={2}
              fill="url(#colorRevenue)"
              dot={false}
              activeDot={{ r: 5 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default RevenueChart;
