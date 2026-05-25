import { useEffect, useMemo, useState } from "react";
import {
  Search,
  CreditCard,
  QrCode,
  Wallet,
  Building2,
  Plus,
} from "lucide-react";
import Swal from "sweetalert2";

import PaymentModal from "../components/modal/PaymentModal";
import { getPayments, createPayment } from "../api/payments/payments.api";

const paymentMethods = ["SEMUA", "CASH", "TRANSFER", "QRIS"];

const Payments = () => {
  const [payments, setPayments] = useState([]);
  const [search, setSearch] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("SEMUA");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const itemsPerPageOptions = [5, 10, 20, 50];
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loadingSubmit, setLoadingSubmit] = useState(false);

  const [form, setForm] = useState({
    id_order: "",
    jumlah: "",
    metode: "",
  });

  /* =========================
     FETCH DATA
  ========================= */
  useEffect(() => {
    fetchPayments();
  }, []);

  console.log({
    id_order: Number(form.id_order),
    jumlah: Number(form.jumlah),
    metode: form.metode,
  });

  const fetchPayments = async () => {
    try {
      setLoading(true);
      const data = await getPayments();
      setPayments(Array.isArray(data) ? data : []);
    } catch (err) {
      Swal.fire("Error", err.message || "Gagal ambil data payments", "error");
    } finally {
      setLoading(false);
    }
  };

  /* =========================
     FILTER
  ========================= */
  const filtered = useMemo(() => {
    return payments.filter((p) => {
      const q = search.toLowerCase();
      const method = p.metode?.toLowerCase() || "";
      const selected = paymentMethod.toLowerCase();

      const matchSearch =
        p.kode_invoice?.toLowerCase().includes(q) || method.includes(q);

      const matchMethod = paymentMethod === "SEMUA" || method === selected;

      return matchSearch && matchMethod;
    });
  }, [payments, search, paymentMethod]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / itemsPerPage));

  const paginatedPayments = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filtered.slice(startIndex, startIndex + itemsPerPage);
  }, [filtered, currentPage, itemsPerPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [search, payments.length, itemsPerPage]);

  /* =========================
     ICON
  ========================= */
  const getIcon = (metode) => {
    switch (metode?.toLowerCase()) {
      case "qris":
        return <QrCode size={18} className="text-purple-600" />;
      case "transfer":
        return <Building2 size={18} className="text-blue-600" />;
      case "cash":
        return <Wallet size={18} className="text-green-600" />;
      default:
        return <CreditCard size={18} className="text-orange-600" />;
    }
  };

  const formatRupiah = (n) =>
    new Intl.NumberFormat("id-ID").format(Number(n || 0));

  /* =========================
     SUBMIT PAYMENT (FIX 400)
  ========================= */
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoadingSubmit(true);

      const payload = {
        id_order: Number(form.id_order),
        jumlah: Number(form.jumlah),
        metode: form.metode,
      };

      // VALIDASI WAJIB
      if (!payload.id_order || !payload.jumlah || !payload.metode) {
        Swal.fire("Error", "Semua field wajib diisi", "warning");
        return;
      }

      await createPayment(payload);
      await fetchPayments();

      setForm({ id_order: "", jumlah: "", metode: "" });
      setIsModalOpen(false);

      Swal.fire("Berhasil", "Payment berhasil ditambahkan", "success");
    } catch (err) {
      Swal.fire("Error", err.message || "Gagal membuat payment", "error");
    } finally {
      setLoadingSubmit(false);
    }
  };

  return (
    <div className="space-y-6 pb-24 lg:pb-10">
      {/* HEADER */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-queen-navy dark:text-white">
            Payments
          </h1>
          <p className="text-sm text-gray-500">Riwayat pembayaran transaksi</p>
        </div>

        <div className="flex gap-3 items-center">
          {/* SEARCH */}
          <div className="relative w-full lg:w-[300px]">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={18}
            />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari invoice / metode..."
              className="w-full pl-10 pr-4 py-3 rounded-2xl border bg-white dark:bg-slate-800 dark:text-white text-sm"
            />
          </div>

          {/* BUTTON */}
          <button
            onClick={() => setIsModalOpen(true)}
            className="hidden lg:flex items-center gap-2 px-4 py-3 bg-queen-navy text-white font-bold text-sm rounded-2xl"
          >
            <Plus size={18} />
            Bayar
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between text-xs text-gray-500">
        <div className="flex gap-2 overflow-x-auto pb-2 lg:pb-0">
          {paymentMethods.map((method) => (
            <button
              key={method}
              onClick={() => setPaymentMethod(method)}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                paymentMethod === method
                  ? "bg-queen-navy text-white"
                  : "bg-gray-100 dark:bg-slate-800 text-gray-500"
              }`}
            >
              {method}
            </button>
          ))}
        </div>

        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between text-xs text-gray-500">
          {/* INFO */}
          <div className="flex items-center justify-between gap-3 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-2">
            <span>
              Total Transaksi:{" "}
              <span className="font-bold text-slate-800 dark:text-white">
                {filtered.length}
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
              disabled={currentPage === 1}
              className="px-3 py-1.5 rounded-xl bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-white disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Prev
            </button>

            <span className="flex-1 text-center font-semibold text-slate-700 dark:text-white">
              {currentPage} / {totalPages}
            </span>

            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(totalPages, prev + 1))
              }
              disabled={currentPage >= totalPages}
              className="px-3 py-1.5 rounded-xl bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-white disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {/* TABLE DESKTOP */}
      <div className="hidden lg:block bg-white dark:bg-slate-800 rounded-3xl border overflow-hidden">
        <div className="max-h-[350px] overflow-y-auto">
          <table className="w-full text-xs">
            <thead className="sticky top-0 bg-gray-50 dark:bg-slate-900 text-xs uppercase text-gray-400">
              <tr>
                <th className="px-3 py-2 text-left">Invoice</th>
                <th className="px-3 py-2 text-left">Metode</th>
                <th className="px-3 py-2 text-left">Jumlah</th>
                <th className="px-3 py-2 text-left">Tanggal</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={4} className="px-3 py-10 text-center">
                    <div className="flex flex-col items-center justify-center gap-3 text-slate-400">
                      <div className="w-8 h-8 border-4 border-slate-200 border-t-queen-navy rounded-full animate-spin"></div>
                      <p className="text-sm font-medium">
                        Memuat data pembayaran...
                      </p>
                    </div>
                  </td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td
                    colSpan={4}
                    className="text-center py-6 text-xs text-gray-400"
                  >
                    Data tidak ditemukan
                  </td>
                </tr>
              ) : (
                paginatedPayments.map((p) => (
                  <tr key={p.id_payment} className="border-t">
                    <td className="px-3 py-2 font-bold text-queen-gold">
                      {p.kode_invoice}
                    </td>

                    <td className="px-3 py-2 flex items-center font-semibold dark:text-white gap-2">
                      {getIcon(p.metode)}
                      {p.metode}
                    </td>

                    <td className="px-3 py-2 font-bold text-queen-navy dark:text-white">
                      Rp {formatRupiah(p.jumlah)}
                    </td>

                    <td className="px-3 py-2 text-xs text-gray-500">
                      {new Date(p.tanggal_bayar).toLocaleString("id-ID")}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* MOBILE */}
      <div className="lg:hidden space-y-4">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-10 text-slate-400">
            <div className="w-8 h-8 border-4 border-slate-200 border-t-queen-navy rounded-full animate-spin" />
            <p className="text-sm mt-2">Memuat data pembayaran...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-10">Data tidak ditemukan</div>
        ) : (
          paginatedPayments.map((p) => (
            <div
              key={p.id_payment}
              className="bg-white dark:bg-slate-800 rounded-3xl p-4 shadow-sm border border-slate-100 dark:border-slate-700"
            >
              <div className="flex justify-between">
                <div>
                  <p className="text-xs text-queen-gold font-bold">
                    {p.kode_invoice}
                  </p>
                  <div className="flex items-center gap-2 mt-2 dark:text-white">
                    {getIcon(p.metode)}
                    {p.metode}
                  </div>
                </div>

                <p className="font-bold dark:text-white">
                  Rp {formatRupiah(p.jumlah)}
                </p>
              </div>
            </div>
          ))
        )}
      </div>

      {/* FLOAT BUTTON */}
      <div className="lg:hidden fixed bottom-24 right-5">
        <button
          onClick={() => setIsModalOpen(true)}
          className="w-14 h-14 rounded-full bg-queen-navy text-white flex items-center justify-center"
        >
          <Plus />
        </button>
      </div>

      {/* MODAL */}
      <PaymentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        form={form}
        setForm={setForm}
        onSubmit={handleSubmit}
        loading={loadingSubmit}
      />
    </div>
  );
};

export default Payments;
