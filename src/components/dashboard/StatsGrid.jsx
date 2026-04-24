import { formatRupiah } from "../../utils/format";

const StatsGrid = ({ stats }) => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((s, i) => (
        <div
          key={i}
          className="bg-white dark:bg-slate-800 p-4 rounded-2xl border border-gray-100 dark:border-slate-700 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
        >
          <div className="flex justify-between items-center">
            <div className="p-2 rounded-lg bg-gray-100 dark:bg-slate-700">
              <s.icon size={18} />
            </div>

            <span
              className={`text-xs font-semibold ${
                s.change.includes("+") ? "text-green-500" : "text-red-500"
              }`}
            >
              {s.change}
            </span>
          </div>

          <h3 className="text-lg font-bold mt-3 text-queen-navy dark:text-white">
            {typeof s.value === "number" ? formatRupiah(s.value) : s.value}
          </h3>

          <p className="text-xs text-gray-500">{s.title}</p>
        </div>
      ))}
    </div>
  );
};

export default StatsGrid;
