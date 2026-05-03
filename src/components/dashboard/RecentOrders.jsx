import React, { useEffect, useMemo, useState } from "react";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

import { getOrders } from "../../api/orders/orders.api";

const statusMap = {
  SELESAI: "bg-green-100 text-green-700",
  DIPROSES: "bg-blue-100 text-blue-700",
  DITERIMA: "bg-yellow-100 text-yellow-700",
  DIAMBIL: "bg-purple-100 text-purple-700",
};

const RecentOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecentOrders = async () => {
      try {
        setLoading(true);

        const res = await getOrders();

        setOrders(Array.isArray(res) ? res : []);
      } catch (error) {
        console.error(error);
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };

    fetchRecentOrders();
  }, []);

  const recentOrders = useMemo(() => {
    return [...orders].sort((a, b) => b.id_order - a.id_order).slice(0, 3);
  }, [orders]);

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl border border-gray-100 dark:border-slate-700 overflow-hidden">
      {/* HEADER */}
      <div className="p-4 border-b flex items-center justify-between">
        <h3 className="font-bold text-queen-navy dark:text-white">
          Order Terbaru
        </h3>

        <Link
          to="/orders"
          className="text-xs font-semibold text-queen-navy dark:text-white flex items-center gap-1 hover:opacity-80 transition"
        >
          Lihat Semua
          <ChevronRight size={14} />
        </Link>
      </div>

      {loading ? (
        <div className="p-8 flex flex-col items-center justify-center text-slate-400">
          <div className="w-7 h-7 border-4 border-slate-200 border-t-queen-navy rounded-full animate-spin" />
          <p className="text-sm mt-2">Memuat order...</p>
        </div>
      ) : recentOrders.length === 0 ? (
        <div className="p-8 text-center text-sm text-slate-400">
          Belum ada order
        </div>
      ) : (
        <>
          {/* DESKTOP */}
          <div className="hidden md:block">
            <table className="w-full text-sm">
              <tbody>
                {recentOrders.map((o) => (
                  <tr
                    key={o.id_order}
                    className="hover:bg-gray-50 dark:hover:bg-slate-700/40 transition"
                  >
                    <td className="p-4 font-semibold text-queen-gold">
                      {o.kode_invoice}
                    </td>

                    <td className="dark:text-white">{o.customer}</td>

                    <td>
                      <span
                        className={`px-2 py-1 text-xs rounded-full font-semibold ${
                          statusMap[o.order_status] ||
                          "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {o.order_status}
                      </span>
                    </td>

                    <td
                      className={`font-semibold ${
                        o.payment_status === "SUDAH_BAYAR"
                          ? "text-green-500"
                          : "text-red-500"
                      }`}
                    >
                      {o.payment_status === "SUDAH_BAYAR"
                        ? "Lunas"
                        : "Belum Lunas"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* MOBILE */}
          <div className="md:hidden space-y-3 p-4">
            {recentOrders.map((o) => (
              <div
                key={o.id_order}
                className="bg-gray-50 dark:bg-slate-700/40 rounded-xl p-4 border border-slate-100 dark:border-slate-700"
              >
                <div className="flex justify-between gap-2">
                  <span className="font-bold text-queen-gold text-xs">
                    {o.kode_invoice}
                  </span>

                  <span
                    className={`px-2 py-1 text-[10px] rounded-full font-semibold ${
                      statusMap[o.order_status] || "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {o.order_status}
                  </span>
                </div>

                <p className="text-sm mt-2 font-semibold dark:text-white">
                  {o.customer}
                </p>

                <p
                  className={`text-xs mt-1 ${
                    o.payment_status === "SUDAH_BAYAR"
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  {o.payment_status === "SUDAH_BAYAR" ? "Lunas" : "Belum Lunas"}
                </p>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default RecentOrders;
