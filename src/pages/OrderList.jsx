import React, { useEffect, useMemo, useState } from "react";
import {
  MessageCircle,
  Search,
  ChevronRight,
  Scale as ScaleIcon,
  Plus,
} from "lucide-react";
import Swal from "sweetalert2";
import { Pencil, Trash2 } from "lucide-react";
import { getCustomers } from "../api/customers/customers.api";

import OrderModal from "../components/modal/OrderModal";
import OrderEditModal from "../components/modal/OrderEditModal";
import {
  getOrders,
  createOrder,
  updateOrder,
  deleteOrder,
  updateOrderStatus,
} from "../api/orders/orders.api";

const statusTabs = ["SEMUA", "DITERIMA", "DIPROSES", "DIAMBIL", "SELESAI"];

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusTab, setStatusTab] = useState("SEMUA");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const itemsPerPageOptions = [5, 10, 20, 50];
  const [loading, setLoading] = useState(false);
  const [tableLoading, setTableLoading] = useState(true);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingOrder, setEditingOrder] = useState(null);
  const [customerMap, setCustomerMap] = useState({});

  // NEW: pagination dari backend
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total_data: 0,
    total_page: 1,
  });

  useEffect(() => {
    fetchOrders();
    fetchCustomers();
  }, []);

  const fetchOrders = async (page = 1, limit = itemsPerPage) => {
    try {
      setTableLoading(true);

      const response = await getOrders({
        page,
        limit,
      });

      const orderData = response?.data || [];

      setOrders(orderData);

      // NEW: pakai pagination dari backend
      setPagination(
        response?.pagination || {
          page,
          limit,
          total_data: 0,
          total_page: 1,
        }
      );
    } catch (err) {
      Swal.fire("Error", err.message || "Gagal mengambil data", "error");
    } finally {
      setTableLoading(false);
    }
  };

  const fetchCustomers = async () => {
    try {
      const data = await getCustomers();

      const map = {};

      (Array.isArray(data) ? data : []).forEach((customer) => {
        if (customer.nama) {
          map[customer.nama.trim().toLowerCase()] = customer.no_hp;
        }
      });

      setCustomerMap(map);
    } catch (err) {
      console.error("Gagal ambil customer:", err);
    }
  };

  const getWhatsappLink = (phone) => {
    if (!phone) return "#";

    const cleaned = String(phone).replace(/\D/g, "");

    if (cleaned.startsWith("0")) {
      return `https://wa.me/62${cleaned.slice(1)}`;
    }

    if (cleaned.startsWith("62")) {
      return `https://wa.me/${cleaned}`;
    }

    return `https://wa.me/${cleaned}`;
  };

  const formatDate = (value) => {
    if (!value) return "-";
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return value;
    return date.toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const keyword = searchTerm.toLowerCase();

      const matchSearch =
        order.customer?.toLowerCase().includes(keyword) ||
        order.kode_invoice?.toLowerCase().includes(keyword) ||
        order.service?.toLowerCase().includes(keyword);

      const matchStatus =
        statusTab === "SEMUA" || order.order_status === statusTab;

      return matchSearch && matchStatus;
    });
  }, [orders, searchTerm, statusTab]);

  const paginatedOrders = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredOrders.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredOrders, currentPage, itemsPerPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, statusTab, orders.length, itemsPerPage]);

  // FIX: fetch ulang saat pagination berubah
  useEffect(() => {
    fetchOrders(currentPage, itemsPerPage);
  }, [currentPage, itemsPerPage]);

  const handleSubmitOrder = async (payload) => {
    if (!editingOrder) return;

    try {
      setLoading(true);

      await updateOrder(editingOrder.id_order, payload);

      await fetchOrders();

      setIsModalOpen(false);
      setEditingOrder(null);

      Swal.fire("Berhasil", "Order berhasil diperbarui", "success");
    } catch (err) {
      Swal.fire("Error", err.message || "Gagal update order", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Hapus order?",
      text: "Data tidak bisa dikembalikan",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ya, hapus",
      cancelButtonText: "Batal",
    });

    if (!confirm.isConfirmed) return;

    try {
      await deleteOrder(id);
      await fetchOrders();

      Swal.fire("Berhasil", "Order berhasil dihapus", "success");
    } catch (err) {
      Swal.fire("Error", err.message || "Gagal menghapus order", "error");
    }
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await updateOrderStatus(orderId, newStatus);

      setOrders((prev) =>
        prev.map((o) =>
          o.id_order === orderId ? { ...o, order_status: newStatus } : o
        )
      );
    } catch (err) {
      Swal.fire("Error", err.message || "Gagal update status", "error");
    }
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case "DITERIMA":
        return "bg-gray-100 text-gray-700 dark:bg-slate-700 dark:text-slate-300";

      case "DIPROSES":
        return "bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-300";

      case "DIAMBIL":
        return "bg-purple-100 text-purple-700 dark:bg-purple-500/20 dark:text-purple-300";

      case "SELESAI":
        return "bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-300";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="space-y-6 pb-24 lg:pb-10">
      {/* HEADER */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-queen-navy dark:text-white">
            Daftar Order
          </h1>
          <p className="text-sm text-gray-500">
            Monitoring operasional laundry
          </p>
        </div>

        <div className="flex gap-3 items-center">
          <div className="relative w-full lg:w-[300px]">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={18}
            />
            <input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Cari invoice / customer..."
              className="w-full pl-10 pr-4 py-3 rounded-2xl border bg-white dark:bg-slate-800 dark:text-white text-sm"
            />
          </div>

          <button
            onClick={() => {
              setEditingOrder(null);
              setIsModalOpen(true);
            }}
            className="hidden lg:flex items-center gap-2 px-4 py-3 bg-queen-navy text-white font-bold text-sm rounded-2xl"
          >
            <Plus size={18} />
            Tambah
          </button>
        </div>
      </div>

      {/* FILTER STATUS */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex gap-2 overflow-x-auto pb-1">
          {statusTabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setStatusTab(tab)}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                statusTab === tab
                  ? "bg-queen-navy text-white"
                  : "bg-gray-100 dark:bg-slate-800 text-gray-500"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between text-xs text-gray-500">
          {/* INFO */}
          <div className="flex items-center justify-between gap-3 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-2">
            <span>
              Total order:{" "}
              <span className="font-bold text-slate-800 dark:text-white">
                {pagination.total_data}
              </span>
            </span>

            <label className="flex items-center gap-2">
              <span>Limit</span>

              <select
                value={itemsPerPage}
                onChange={(e) => setItemsPerPage(Number(e.target.value))}
                className="rounded-lg border bg-white dark:bg-slate-900 px-2 py-1 text-xs text-slate-700 dark:text-white outline-none"
              >
                {itemsPerPageOptions.map((limit) => (
                  <option key={limit} value={limit}>
                    {limit}
                  </option>
                ))}
              </select>
            </label>
          </div>

          {/* PAGINATION */}
          <div className="flex items-center justify-between gap-2 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-2 py-2">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
              disabled={pagination.page === 1}
              className="px-3 py-1.5 rounded-xl bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-white disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Prev
            </button>

            <span className="flex-1 text-center font-semibold text-slate-700 dark:text-white">
              {pagination.page} / {pagination.total_page}
            </span>

            <button
              onClick={() =>
                setCurrentPage((prev) =>
                  Math.min(pagination.total_page, prev + 1)
                )
              }
              disabled={pagination.page >= pagination.total_page}
              className="px-3 py-1.5 rounded-xl bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-white disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {/* DESKTOP */}
      <div className="hidden lg:block bg-white dark:bg-slate-800 rounded-3xl border overflow-hidden">
        <div className="max-h-[350px] overflow-y-auto">
          <table className="w-full text-[11px] leading-5">
            <thead className="sticky top-0 bg-gray-50 dark:bg-slate-900 text-[10px] uppercase text-gray-400">
              <tr>
                <th className="px-2 py-2 text-left">Invoice</th>
                <th className="px-2 py-2 text-left">Customer</th>
                <th className="px-2 py-2 text-left">Layanan</th>
                <th className="px-2 py-2 text-left">Type</th>
                <th className="px-2 py-2 text-left">Berat</th>
                <th className="px-2 py-2 text-left">Ongkir</th>
                <th className="px-2 py-2 text-left">Total</th>
                <th className="px-2 py-2 text-left">Estimasi</th>
                <th className="px-2 py-2 text-left">Status</th>
                <th className="px-2 py-2 text-left">Bayar</th>
                <th className="px-2 py-2 text-right">Aksi</th>
              </tr>
            </thead>

            <tbody>
              {tableLoading ? (
                <tr>
                  <td colSpan={11} className="px-2 py-8 text-center">
                    <div className="flex flex-col items-center justify-center gap-3 text-slate-400">
                      <div className="w-8 h-8 border-4 border-slate-200 border-t-queen-navy rounded-full animate-spin"></div>
                      <p className="text-sm font-medium">
                        Memuat data order...
                      </p>
                    </div>
                  </td>
                </tr>
              ) : filteredOrders.length === 0 ? (
                <tr>
                  <td
                    colSpan={11}
                    className="px-2 py-8 text-center text-gray-400"
                  >
                    Data tidak ditemukan
                  </td>
                </tr>
              ) : (
                paginatedOrders.map((order) => {
                  const customerPhone =
                    customerMap[order.customer?.trim().toLowerCase()];

                  return (
                    <tr
                      key={order.id_order}
                      className="border-t hover:bg-slate-50 dark:hover:bg-slate-700/30"
                    >
                      <td className="px-2 py-3 font-semibold text-queen-gold">
                        {order.kode_invoice}
                      </td>

                      <td className="px-2 py-3 font-medium dark:text-white capitalize">
                        {order.customer}
                      </td>

                      <td className="px-2 py-3 dark:text-white">
                        {order.service}
                      </td>
                      <td className="px-2 py-3 dark:text-white capitalize">
                        {order.catatan}
                      </td>

                      <td className="px-2 py-3 text-gray-500">
                        <span className="flex items-center gap-1">
                          {order.berat} kg
                        </span>
                      </td>

                      <td className="px-2 py-3 dark:text-white capitalize">
                        {order.ongkir}
                      </td>

                      <td className="px-2 py-3 font-semibold dark:text-white">
                        Rp {Number(order.harga_final).toLocaleString("id-ID")}
                      </td>

                      <td className="px-2 py-3 dark:text-white">
                        {formatDate(order.estimasi_selesai)}
                      </td>

                      <td className="px-2 py-3">
                        <select
                          value={order.order_status}
                          onChange={(e) =>
                            handleStatusChange(order.id_order, e.target.value)
                          }
                          className={`px-2 py-1 rounded-xl text-[10px] font-bold outline-none ${getStatusStyle(
                            order.order_status
                          )}`}
                        >
                          <option value="DITERIMA">DITERIMA</option>
                          <option value="DIPROSES">DIPROSES</option>
                          <option value="DIAMBIL">BISA DIAMBIL</option>
                          <option value="SELESAI">SELESAI</option>
                        </select>
                      </td>

                      <td className="px-2 py-3">
                        <span
                          className={`px-2 py-1 rounded-full text-[10px] font-bold ${
                            order.payment_status === "SUDAH_BAYAR"
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {order.payment_status === "SUDAH_BAYAR"
                            ? "LUNAS"
                            : order.payment_status}
                        </span>
                      </td>

                      <td className="px-2 py-3 text-right">
                        <div className="flex justify-end gap-1">
                          <a
                            href={getWhatsappLink(customerPhone)}
                            target="_blank"
                            rel="noreferrer"
                            className={`p-2 rounded-xl transition-colors ${
                              customerPhone
                                ? "text-green-600 hover:bg-green-50 dark:hover:bg-green-500/10"
                                : "text-gray-300 cursor-not-allowed pointer-events-none"
                            }`}
                            title="WhatsApp Customer"
                          >
                            <MessageCircle size={18} />
                          </a>

                          <button
                            onClick={() => handleDelete(order.id_order)}
                            className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-xl transition-colors"
                            title="Hapus"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* MOBILE */}
      <div className="lg:hidden space-y-4">
        {tableLoading ? (
          <div className="flex flex-col items-center justify-center py-10 text-slate-400">
            <div className="w-8 h-8 border-4 border-slate-200 border-t-queen-navy rounded-full animate-spin" />
            <p className="text-sm mt-2">Memuat data order...</p>
          </div>
        ) : filteredOrders.length === 0 ? (
          <div className="text-center text-gray-400 py-10">
            Data tidak ditemukan
          </div>
        ) : (
          paginatedOrders.map((order) => {
            const customerPhone =
              customerMap[order.customer?.trim().toLowerCase()];

            return (
              <div
                key={order.id_order}
                className="bg-white dark:bg-slate-800 rounded-3xl p-4 shadow-sm border border-slate-100 dark:border-slate-700"
              >
                <div className="flex justify-between gap-3">
                  <div>
                    <p className="text-[11px] font-bold text-queen-gold">
                      {order.kode_invoice}
                    </p>

                    <h3 className="mt-1 font-bold text-slate-900 dark:text-white text-sm">
                      {order.customer}
                    </h3>

                    <p className="text-xs text-gray-500 mt-1">
                      {order.service}
                    </p>
                  </div>

                  <span
                    className={`px-2 py-1 rounded-full text-[10px] font-bold h-fit ${getStatusStyle(
                      order.order_status
                    )}`}
                  >
                    {order.order_status}
                  </span>
                </div>

                <div className="mt-3 grid gap-2 text-xs">
                  <div className="flex justify-between">
                    <p className="text-gray-500">{order.berat} kg</p>
                    <p className="font-semibold text-slate-900 dark:text-white">
                      Rp {Number(order.harga_final).toLocaleString("id-ID")}
                    </p>
                  </div>
                  <div className="flex justify-between gap-3">
                    <span className="text-gray-500">Estimasi selesai</span>
                    <span className="font-semibold text-slate-900 dark:text-white">
                      {formatDate(order.estimasi_selesai)}
                    </span>
                  </div>
                </div>

                <div className="mt-3 flex justify-end gap-2">
                  <a
                    href={getWhatsappLink(customerPhone)}
                    target="_blank"
                    rel="noreferrer"
                    className={`p-3 rounded-2xl active:scale-95 transition ${
                      customerPhone
                        ? "bg-green-100 text-green-600"
                        : "bg-gray-100 text-gray-300 pointer-events-none"
                    }`}
                    title="WhatsApp Customer"
                  >
                    <MessageCircle size={18} />
                  </a>

                  <button
                    onClick={() => handleDelete(order.id_order)}
                    className="p-3 rounded-2xl bg-red-100 text-red-600 active:scale-95 transition"
                    title="Hapus"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* FLOATING ACTION BUTTON */}
      <div className="lg:hidden fixed bottom-24 right-5">
        <button
          onClick={() => {
            setEditingOrder(null);
            setIsModalOpen(true);
          }}
          className="w-14 h-14 rounded-full bg-queen-navy text-white flex items-center justify-center"
        >
          <Plus />
        </button>
      </div>

      {/* MODAL */}
      {isModalOpen && !editingOrder && (
        <OrderModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSuccess={async () => {
            await fetchOrders();
            setIsModalOpen(false);

            Swal.fire({
              title: "Order berhasil dibuat",
              icon: "success",
              timer: 1200,
              showConfirmButton: false,
            });
          }}
        />
      )}

      {isModalOpen && editingOrder && (
        <OrderEditModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setEditingOrder(null);
          }}
          onSubmit={handleSubmitOrder}
          loading={loading}
          initialData={editingOrder}
        />
      )}
    </div>
  );
};

export default OrderList;
