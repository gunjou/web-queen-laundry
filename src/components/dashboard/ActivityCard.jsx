import React, { useEffect, useMemo, useState } from "react";
import { ChevronRight, Wallet } from "lucide-react";
import { Link } from "react-router-dom";

import { getOrders } from "../../api/orders/orders.api";

const ActivityCard = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        setLoading(true);

        const res = await getOrders();

        setActivities(Array.isArray(res) ? res : []);
      } catch (error) {
        console.error(error);
        setActivities([]);
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, []);

  const recentActivities = useMemo(() => {
    return [...activities].sort((a, b) => b.id_order - a.id_order).slice(0, 3);
  }, [activities]);

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl border border-gray-100 dark:border-slate-700 p-5 shadow-sm">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-queen-navy dark:text-white">Aktivitas</h3>

        <Link
          to="/orders"
          className="text-xs font-semibold text-queen-navy dark:text-white flex items-center gap-1 hover:opacity-80 transition"
        >
          Lihat Semua
          <ChevronRight size={14} />
        </Link>
      </div>

      {loading ? (
        <div className="py-8 flex flex-col items-center justify-center text-slate-400">
          <div className="w-7 h-7 border-4 border-slate-200 border-t-queen-navy rounded-full animate-spin" />
          <p className="text-sm mt-2">Memuat aktivitas...</p>
        </div>
      ) : recentActivities.length === 0 ? (
        <div className="py-8 text-center text-sm text-slate-400">
          Belum ada aktivitas
        </div>
      ) : (
        <div className="space-y-3">
          {recentActivities.map((a) => (
            <div
              key={a.id_order}
              className="flex items-start gap-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-slate-700/30 transition"
            >
              <div
                className={`p-2 rounded-xl ${
                  a.payment_status === "SUDAH_BAYAR"
                    ? "bg-green-100 text-green-600 dark:bg-green-500/10 dark:text-green-400"
                    : "bg-red-100 text-red-600 dark:bg-red-500/10 dark:text-red-400"
                }`}
              >
                <Wallet size={16} />
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold dark:text-white truncate">
                  {a.customer}
                </p>

                <p className="text-xs text-gray-400 truncate">
                  {a.kode_invoice}
                </p>

                <p className="text-xs mt-1 font-medium text-queen-navy dark:text-white">
                  Rp {Number(a.harga_final).toLocaleString("id-ID")}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ActivityCard;
