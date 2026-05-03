import React, { useEffect, useMemo, useState } from "react";
import {
  Calendar,
  TrendingUp,
  Package,
  DollarSign,
  CheckCircle,
  AlertCircle,
  Printer,
  Filter,
} from "lucide-react";
import Swal from "sweetalert2";

import { getOrders } from "../api/orders/orders.api";
import { getPayments } from "../api/payments/payments.api";
import { getServices } from "../api/services/services.api";

const AdminReports = () => {
  const [orders, setOrders] = useState([]);
  const [payments, setPayments] = useState([]);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  useEffect(() => {
    fetchAllData();
    // Set default date range (last 30 days)
    const today = new Date();
    const thirtyDaysAgo = new Date(today.setDate(today.getDate() - 30));
    setDateFrom(thirtyDaysAgo.toISOString().split("T")[0]);
    setDateTo(new Date().toISOString().split("T")[0]);
  }, []);

  const fetchAllData = async () => {
    try {
      setLoading(true);
      const [ordersData, paymentsData, servicesData] = await Promise.all([
        getOrders(),
        getPayments(),
        getServices(),
      ]);

      setOrders(Array.isArray(ordersData) ? ordersData : []);
      setPayments(Array.isArray(paymentsData) ? paymentsData : []);
      setServices(Array.isArray(servicesData) ? servicesData : []);
    } catch (err) {
      Swal.fire("Error", err.message || "Gagal memuat data laporan", "error");
    } finally {
      setLoading(false);
    }
  };

  /* =========================
     STATISTICS
  ========================= */
  const stats = useMemo(() => {
    const totalOrders = orders.length;
    const completedOrders = orders.filter(
      (o) => o.order_status === "SELESAI"
    ).length;
    const totalRevenue = payments.reduce(
      (sum, p) => sum + Number(p.jumlah || 0),
      0
    );
    const paidOrders = orders.filter(
      (o) => o.payment_status === "SUDAH_BAYAR"
    ).length;
    const unpaidOrders = totalOrders - paidOrders;

    return {
      totalOrders,
      completedOrders,
      totalRevenue,
      paidOrders,
      unpaidOrders,
      completionRate:
        totalOrders > 0 ? Math.round((completedOrders / totalOrders) * 100) : 0,
    };
  }, [orders, payments]);

  /* =========================
     POPULAR SERVICES
  ========================= */
  const popularServices = useMemo(() => {
    const serviceCount = {};
    orders.forEach((order) => {
      if (order.service) {
        serviceCount[order.service] = (serviceCount[order.service] || 0) + 1;
      }
    });

    return Object.entries(serviceCount)
      .map(([name, count]) => ({
        name,
        count,
        price: services.find((s) => s.nama === name)?.harga || 0,
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);
  }, [orders, services]);

  /* =========================
     PAYMENT METHODS
  ========================= */
  const paymentMethods = useMemo(() => {
    const methods = {};
    payments.forEach((p) => {
      methods[p.metode] = (methods[p.metode] || 0) + 1;
    });

    return Object.entries(methods)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count);
  }, [payments]);

  /* =========================
     ORDER STATUS BREAKDOWN
  ========================= */
  const orderStatusBreakdown = useMemo(() => {
    const statuses = {
      DITERIMA: 0,
      DIPROSES: 0,
      SELESAI: 0,
      DIAMBIL: 0,
    };

    orders.forEach((order) => {
      if (statuses.hasOwnProperty(order.order_status)) {
        statuses[order.order_status]++;
      }
    });

    return statuses;
  }, [orders]);

  const handleExport = () => {
    try {
      // Create HTML content for PDF
      const htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
          <title>Laporan Laundry - ${new Date().toLocaleDateString(
            "id-ID"
          )}</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            .header { text-align: center; margin-bottom: 30px; }
            .header h1 { color: #1e40af; margin: 0; }
            .header p { color: #6b7280; margin: 5px 0; }
            .section { margin-bottom: 25px; }
            .section h2 { color: #1e40af; border-bottom: 2px solid #e5e7eb; padding-bottom: 5px; }
            .stats { display: grid; grid-template-columns: repeat(2, 1fr); gap: 15px; margin-bottom: 20px; }
            .stat-card { border: 1px solid #e5e7eb; padding: 15px; border-radius: 8px; }
            .stat-card h3 { margin: 0 0 5px 0; color: #374151; }
            .stat-card p { margin: 0; font-size: 24px; font-weight: bold; color: #1e40af; }
            .table { width: 100%; border-collapse: collapse; margin-top: 10px; }
            .table th, .table td { border: 1px solid #e5e7eb; padding: 8px; text-align: left; }
            .table th { background-color: #f9fafb; font-weight: bold; }
            .breakdown { display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; margin-top: 10px; }
            .breakdown-item { text-align: center; padding: 10px; border: 1px solid #e5e7eb; border-radius: 8px; }
            .breakdown-item h4 { margin: 0 0 5px 0; font-size: 12px; color: #6b7280; text-transform: uppercase; }
            .breakdown-item p { margin: 0; font-size: 20px; font-weight: bold; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>LAPORAN LAUNDRY</h1>
            <p>Dibuat: ${new Date().toLocaleString("id-ID")}</p>
            <p>Periode: ${dateFrom} - ${dateTo}</p>
          </div>

          <div class="section">
            <h2>Statistik Utama</h2>
            <div class="stats">
              <div class="stat-card">
                <h3>Total Order</h3>
                <p>${stats.totalOrders}</p>
              </div>
              <div class="stat-card">
                <h3>Order Selesai</h3>
                <p>${stats.completedOrders} (${stats.completionRate}%)</p>
              </div>
              <div class="stat-card">
                <h3>Total Revenue</h3>
                <p>Rp ${Number(stats.totalRevenue).toLocaleString("id-ID")}</p>
              </div>
              <div class="stat-card">
                <h3>Order Belum Bayar</h3>
                <p>${stats.unpaidOrders}</p>
              </div>
            </div>
          </div>

          <div class="section">
            <h2>Status Order Breakdown</h2>
            <div class="breakdown">
              <div class="breakdown-item">
                <h4>Diterima</h4>
                <p>${orderStatusBreakdown.DITERIMA}</p>
              </div>
              <div class="breakdown-item">
                <h4>Diproses</h4>
                <p>${orderStatusBreakdown.DIPROSES}</p>
              </div>
              <div class="breakdown-item">
                <h4>Selesai</h4>
                <p>${orderStatusBreakdown.SELESAI}</p>
              </div>
              <div class="breakdown-item">
                <h4>Diambil</h4>
                <p>${orderStatusBreakdown.DIAMBIL}</p>
              </div>
            </div>
          </div>

          <div class="section">
            <h2>Layanan Populer</h2>
            <table class="table">
              <thead>
                <tr>
                  <th>Peringkat</th>
                  <th>Nama Layanan</th>
                  <th>Jumlah Order</th>
                </tr>
              </thead>
              <tbody>
                ${popularServices
                  .map(
                    (service, idx) => `
                  <tr>
                    <td>${idx + 1}</td>
                    <td>${service.name}</td>
                    <td>${service.count}</td>
                  </tr>
                `
                  )
                  .join("")}
              </tbody>
            </table>
          </div>

          <div class="section">
            <h2>Metode Pembayaran</h2>
            <table class="table">
              <thead>
                <tr>
                  <th>Metode</th>
                  <th>Jumlah</th>
                  <th>Persentase</th>
                </tr>
              </thead>
              <tbody>
                ${paymentMethods
                  .map(
                    (method) => `
                  <tr>
                    <td>${method.name}</td>
                    <td>${method.count}</td>
                    <td>${((method.count / payments.length) * 100).toFixed(
                      1
                    )}%</td>
                  </tr>
                `
                  )
                  .join("")}
              </tbody>
            </table>
          </div>
        </body>
        </html>
      `;

      // Open in new window for printing
      const printWindow = window.open("", "_blank");
      printWindow.document.write(htmlContent);
      printWindow.document.close();
      printWindow.focus();

      // Auto print after a short delay
      setTimeout(() => {
        printWindow.print();
      }, 500);

      Swal.fire(
        "Berhasil",
        "Laporan dibuka di jendela baru. Gunakan Ctrl+P (Windows) atau Cmd+P (Mac) untuk mencetak sebagai PDF.",
        "success"
      );
    } catch (err) {
      Swal.fire("Error", "Gagal mengunduh laporan", "error");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-slate-200 border-t-queen-navy rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-400">Memuat laporan...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-24 lg:pb-10">
      {/* HEADER */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-queen-navy dark:text-white">
            Laporan
          </h1>
          <p className="text-sm text-gray-500">Dashboard analisis laundry</p>
        </div>

        <button
          onClick={handleExport}
          className="flex items-center gap-2 px-4 py-3 bg-queen-navy text-white font-bold text-sm rounded-2xl w-fit"
        >
          <Printer size={18} />
          Cetak PDF
        </button>
      </div>

      {/* STATS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Orders */}
        <div className="bg-white dark:bg-slate-800 rounded-3xl p-5 border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500 dark:text-slate-400">
                Total Order
              </p>
              <p className="text-2xl font-black text-queen-navy dark:text-white mt-2">
                {stats.totalOrders}
              </p>
            </div>
            <Package size={32} className="text-blue-500 opacity-20" />
          </div>
        </div>

        {/* Completed Orders */}
        <div className="bg-white dark:bg-slate-800 rounded-3xl p-5 border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500 dark:text-slate-400">
                Order Selesai
              </p>
              <p className="text-2xl font-black text-green-600 dark:text-green-400 mt-2">
                {stats.completedOrders}
              </p>
              <p className="text-xs text-gray-400 mt-1">
                {stats.completionRate}% completion
              </p>
            </div>
            <CheckCircle size={32} className="text-green-500 opacity-20" />
          </div>
        </div>

        {/* Total Revenue */}
        <div className="bg-white dark:bg-slate-800 rounded-3xl p-5 border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500 dark:text-slate-400">
                Total Revenue
              </p>
              <p className="text-2xl font-black text-queen-gold dark:text-queen-gold mt-2">
                Rp {Number(stats.totalRevenue).toLocaleString("id-ID")}
              </p>
            </div>
            <DollarSign size={32} className="text-yellow-500 opacity-20" />
          </div>
        </div>

        {/* Unpaid Orders */}
        <div className="bg-white dark:bg-slate-800 rounded-3xl p-5 border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500 dark:text-slate-400">
                Order Belum Bayar
              </p>
              <p className="text-2xl font-black text-red-600 dark:text-red-400 mt-2">
                {stats.unpaidOrders}
              </p>
              <p className="text-xs text-gray-400 mt-1">
                Rp{" "}
                {Number(
                  orders
                    .filter((o) => o.payment_status !== "SUDAH_BAYAR")
                    .reduce((sum, o) => sum + Number(o.harga_final || 0), 0)
                ).toLocaleString("id-ID")}
              </p>
            </div>
            <AlertCircle size={32} className="text-red-500 opacity-20" />
          </div>
        </div>
      </div>

      {/* ORDER STATUS BREAKDOWN */}
      <div className="bg-white dark:bg-slate-800 rounded-3xl p-5 border">
        <h3 className="font-black text-queen-navy dark:text-white mb-4">
          Status Order Breakdown
        </h3>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-gray-50 dark:bg-slate-700 rounded-2xl">
            <p className="text-xs text-gray-500 dark:text-slate-400 uppercase font-bold">
              Diterima
            </p>
            <p className="text-2xl font-black text-gray-700 dark:text-white mt-2">
              {orderStatusBreakdown.DITERIMA}
            </p>
          </div>

          <div className="text-center p-4 bg-blue-50 dark:bg-blue-500/10 rounded-2xl">
            <p className="text-xs text-blue-600 dark:text-blue-400 uppercase font-bold">
              Diproses
            </p>
            <p className="text-2xl font-black text-blue-700 dark:text-blue-300 mt-2">
              {orderStatusBreakdown.DIPROSES}
            </p>
          </div>

          <div className="text-center p-4 bg-green-50 dark:bg-green-500/10 rounded-2xl">
            <p className="text-xs text-green-600 dark:text-green-400 uppercase font-bold">
              Selesai
            </p>
            <p className="text-2xl font-black text-green-700 dark:text-green-300 mt-2">
              {orderStatusBreakdown.SELESAI}
            </p>
          </div>

          <div className="text-center p-4 bg-purple-50 dark:bg-purple-500/10 rounded-2xl">
            <p className="text-xs text-purple-600 dark:text-purple-400 uppercase font-bold">
              Diambil
            </p>
            <p className="text-2xl font-black text-purple-700 dark:text-purple-300 mt-2">
              {orderStatusBreakdown.DIAMBIL}
            </p>
          </div>
        </div>
      </div>

      {/* POPULAR SERVICES & PAYMENT METHODS - SIDE BY SIDE ON DESKTOP */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* POPULAR SERVICES */}
        <div className="bg-white dark:bg-slate-800 rounded-3xl p-5 border">
          <h3 className="font-black text-queen-navy dark:text-white mb-4">
            Layanan Populer
          </h3>

          <div className="space-y-2">
            {popularServices.length === 0 ? (
              <p className="text-sm text-gray-400 text-center py-4">
                Tidak ada data
              </p>
            ) : (
              popularServices.map((service, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-3 bg-gray-50 dark:bg-slate-700 rounded-2xl"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-queen-gold/20 flex items-center justify-center text-xs font-bold text-queen-gold">
                      {idx + 1}
                    </div>
                    <div>
                      <p className="font-semibold dark:text-white">
                        {service.name}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-slate-400">
                        {service.count} orders
                      </p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* PAYMENT METHODS */}
        <div className="bg-white dark:bg-slate-800 rounded-3xl p-5 border">
          <h3 className="font-black text-queen-navy dark:text-white mb-4">
            Metode Pembayaran
          </h3>

          <div className="space-y-2">
            {paymentMethods.length === 0 ? (
              <p className="text-sm text-gray-400 text-center py-4">
                Tidak ada data
              </p>
            ) : (
              paymentMethods.map((method, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-3 bg-gray-50 dark:bg-slate-700 rounded-2xl"
                >
                  <p className="font-semibold capitalize dark:text-white">
                    {method.name}
                  </p>
                  <div className="flex items-center gap-2">
                    <div className="w-24 h-2 bg-slate-200 dark:bg-slate-600 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-queen-navy"
                        style={{
                          width: `${(method.count / payments.length) * 100}%`,
                        }}
                      ></div>
                    </div>
                    <p className="text-xs font-bold text-gray-600 dark:text-slate-400 w-8 text-right">
                      {method.count}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminReports;
