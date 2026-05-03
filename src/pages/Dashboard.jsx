import { useEffect, useState } from "react";
import { Plus } from "lucide-react";

import StatsGrid from "../components/dashboard/StatsGrid";
import RevenueChart from "../components/dashboard/RevenueChart";
import RecentOrders from "../components/dashboard/RecentOrders";
import ActivityCard from "../components/dashboard/ActivityCard";
import OrderModal from "../components/modal/OrderModal";

import { getOrderSummary } from "../api/orders/orders.api";
import { getRevenueReport } from "../api/reports/reports.api";

import { ordersData, activityData } from "../data/dashboardData";

const Dashboard = () => {
  const [filter, setFilter] = useState("Minggu");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);

  const [revenueData, setRevenueData] = useState([]);
  const [revenueLoading, setRevenueLoading] = useState(false);

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) return;

    const fetchSummary = async () => {
      try {
        setLoading(true);
        const res = await getOrderSummary();
        setSummary(res);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchSummary();
  }, [token]);

  useEffect(() => {
    if (!token) return;

    const fetchRevenue = async () => {
      try {
        setRevenueLoading(true);

        const now = new Date();
        const month = now.getMonth() + 1;
        const year = now.getFullYear();

        let params = {};

        if (filter === "Minggu") {
          params = { type: "weekly" };
        }

        if (filter === "Bulan") {
          params = {
            type: "monthly",
            month,
            year,
          };
        }

        if (filter === "Tahun") {
          params = {
            type: "yearly",
            year,
          };
        }

        const res = await getRevenueReport(params);
        setRevenueData(Array.isArray(res) ? res : []);
      } catch (err) {
        console.error(err);
        setRevenueData([]);
      } finally {
        setRevenueLoading(false);
      }
    };

    fetchRevenue();
  }, [filter, token]);

  if (!token) {
    window.location.href = "/login";
    return null;
  }

  return (
    <div className="space-y-6 bg-gray-50 dark:bg-slate-900 min-h-screen">
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-xl md:text-2xl font-extrabold text-queen-navy dark:text-white">
            Dashboard
          </h1>
          <p className="text-sm text-gray-500">Ringkasan bisnis hari ini</p>
        </div>

        <div className="text-right text-xs text-gray-400">
          <p>
            {new Date().toLocaleDateString("id-ID", {
              weekday: "long",
            })}
          </p>
          <p>{new Date().toLocaleDateString("id-ID")}</p>
        </div>
      </div>

      <StatsGrid stats={summary} loading={loading} />

      <div className="grid lg:grid-cols-3 gap-6 items-start">
        <div className="lg:col-span-2">
          <RevenueChart
            data={revenueData}
            filter={filter}
            setFilter={setFilter}
            loading={revenueLoading}
          />
        </div>

        <div className="hidden lg:flex flex-col justify-between bg-gradient-to-br from-queen-navy to-slate-800 text-white rounded-3xl p-6">
          <div>
            <div className="bg-queen-gold/20 p-3 rounded-xl w-fit mb-4">
              <Plus className="text-queen-gold" size={24} />
            </div>

            <h3 className="text-xl font-bold mb-2">Tambah Order Baru</h3>

            <p className="text-sm text-blue-100">
              Buat transaksi laundry dengan cepat.
            </p>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="mt-4 w-full py-3 bg-queen-gold text-queen-navy font-bold rounded-xl"
          >
            + Buat Order
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RecentOrders orders={ordersData} />
        </div>

        <ActivityCard activities={activityData} />
      </div>

      <div className="lg:hidden fixed bottom-24 right-5 z-50">
        <button
          onClick={() => setIsModalOpen(true)}
          className="w-14 h-14 rounded-full bg-queen-navy text-white shadow-lg flex items-center justify-center"
        >
          <Plus size={26} />
        </button>
      </div>

      <OrderModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default Dashboard;
