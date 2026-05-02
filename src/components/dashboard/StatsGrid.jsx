import { formatRupiah } from "../../utils/format";
import { Package, CheckCircle2, Activity, Wallet } from "lucide-react";

const StatsGrid = ({ stats, loading }) => {
  const data = [
    {
      title: "Order Aktif",
      value: stats?.active_orders ?? 0,
      icon: Activity,
      color: "text-blue-500",
    },
    {
      title: "Selesai Hari Ini",
      value: stats?.completed_today ?? 0,
      icon: CheckCircle2,
      color: "text-green-500",
    },
    {
      title: "Total Order Hari Ini",
      value: stats?.total_today ?? 0,
      icon: Package,
      color: "text-queen-navy",
    },
    {
      title: "Pendapatan Hari Ini",
      value: formatRupiah(stats?.revenue_today ?? 0),
      icon: Wallet,
      color: "text-yellow-500",
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {data.map((s, i) => {
        const Icon = s.icon;

        return (
          <div
            key={i}
            className="bg-white dark:bg-slate-800 p-4 rounded-2xl border border-gray-100 dark:border-slate-700 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
          >
            <div className="flex justify-between items-center">
              <div className="p-2 rounded-lg bg-gray-100 dark:bg-slate-700">
                <Icon size={18} className={s.color} />
              </div>
            </div>

            <h3 className="text-lg font-bold mt-3 text-queen-navy dark:text-white">
              {loading ? (
                <div className="h-5 w-16 bg-gray-200 dark:bg-slate-700 animate-pulse rounded" />
              ) : (
                s.value
              )}
            </h3>

            <p className="text-xs text-gray-500">{s.title}</p>
          </div>
        );
      })}
    </div>
  );
};

export default StatsGrid;
