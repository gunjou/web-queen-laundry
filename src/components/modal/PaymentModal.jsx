import React, { useEffect, useMemo, useState } from "react";
import {
  X,
  CreditCard,
  Wallet,
  Hash,
  CheckCircle2,
  Search,
} from "lucide-react";
import { getOrders } from "../../api/orders/orders.api";

const PaymentModal = ({
  isOpen,
  onClose,
  form,
  setForm,
  onSubmit,
  loading,
  isEdit,
}) => {
  const [unpaidOrders, setUnpaidOrders] = useState([]);
  const [searchOrder, setSearchOrder] = useState("");
  const [openDropdown, setOpenDropdown] = useState(false);

  /* =========================
     FETCH ORDER BELUM BAYAR
  ========================= */
  useEffect(() => {
    if (!isOpen) return;

    const fetch = async () => {
      try {
        const data = await getOrders();

        const filtered = data.filter((o) => o.payment_status === "BELUM_BAYAR");

        setUnpaidOrders(filtered);
      } catch (err) {
        console.log(err);
      }
    };

    fetch();
  }, [isOpen]);

  /* =========================
     FILTER SEARCH
  ========================= */
  const filteredOrders = useMemo(() => {
    const q = searchOrder.toLowerCase();

    return unpaidOrders.filter((o) => {
      return (
        o.kode_invoice?.toLowerCase().includes(q) ||
        o.customer?.toLowerCase().includes(q) ||
        String(o.id_order).includes(q)
      );
    });
  }, [searchOrder, unpaidOrders]);

  /* =========================
     SELECT ORDER
  ========================= */
  const handleSelectOrder = (order) => {
    setForm((prev) => ({
      ...prev,
      id_order: order.id_order,
      jumlah: order.harga_final,
    }));

    setSearchOrder(`${order.kode_invoice} - ${order.customer}`);
    setOpenDropdown(false);
  };

  /* =========================
     CLEAR SELECT
  ========================= */
  const handleClear = () => {
    setForm((prev) => ({
      ...prev,
      id_order: "",
      jumlah: "",
    }));

    setSearchOrder("");
  };

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[999] flex items-end sm:items-center justify-center">
      {/* BACKDROP */}
      <div
        className="fixed inset-0 bg-slate-900/40 backdrop-blur-md"
        onClick={onClose}
      />

      {/* MODAL */}
      <div className="relative bg-white dark:bg-slate-800 w-full max-w-lg rounded-t-[2.5rem] sm:rounded-3xl shadow-2xl overflow-hidden z-[1000]">
        {/* HANDLE MOBILE */}
        <div className="sm:hidden w-12 h-1.5 bg-gray-300 dark:bg-slate-600 rounded-full mx-auto mt-4 mb-2" />

        {/* HEADER */}
        <div className="bg-queen-navy p-6 text-white flex justify-between items-center">
          <div>
            <h3 className="text-xl font-bold flex items-center gap-2">
              <CheckCircle2 size={22} />
              {isEdit ? "Edit Payment" : "Tambah Payment"}
            </h3>
            <p className="text-blue-200 text-xs mt-1">
              Kelola transaksi pembayaran
            </p>
          </div>

          <button onClick={onClose}>
            <X />
          </button>
        </div>

        {/* BODY */}
        <form
          onSubmit={onSubmit}
          className="p-6 space-y-5 max-h-[75vh] overflow-y-auto"
        >
          {/* ORDER SEARCH */}
          <div className="space-y-2 relative">
            <label className="label">
              <Hash size={14} /> Order Belum Bayar
            </label>

            <div className="relative">
              <input
                value={searchOrder}
                onChange={(e) => {
                  setSearchOrder(e.target.value);
                  setOpenDropdown(true);
                }}
                onFocus={() => setOpenDropdown(true)}
                placeholder="Cari invoice / nama / ID order..."
                className="input pl-10 pr-10"
              />

              {/* CLEAR BUTTON */}
              {searchOrder && (
                <button
                  type="button"
                  onClick={handleClear}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-500"
                >
                  <X size={16} />
                </button>
              )}
            </div>

            {/* DROPDOWN */}
            {openDropdown && (
              <div className="absolute z-50 w-full bg-white dark:bg-slate-900 border rounded-xl mt-2 max-h-52 overflow-auto shadow-lg">
                {filteredOrders.length === 0 ? (
                  <p className="p-3 text-sm text-gray-400">
                    Data tidak ditemukan
                  </p>
                ) : (
                  filteredOrders.map((o) => (
                    <div
                      key={o.id_order}
                      onClick={() => handleSelectOrder(o)}
                      className="p-3 hover:bg-slate-100 dark:hover:bg-slate-700 cursor-pointer"
                    >
                      <p className="font-semibold text-sm">{o.kode_invoice}</p>
                      <p className="text-xs text-gray-500">
                        {o.customer} • Rp{" "}
                        {Number(o.harga_final).toLocaleString("id-ID")}
                      </p>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>

          {/* JUMLAH */}
          <div className="space-y-2">
            <label className="label">
              <Wallet size={14} /> Jumlah
            </label>

            <input
              name="jumlah"
              value={form.jumlah}
              readOnly
              className="input bg-gray-100 dark:bg-slate-900"
            />
          </div>

          {/* METODE */}
          <div className="space-y-2">
            <label className="label">
              <CreditCard size={14} /> Metode
            </label>

            <select
              name="metode"
              value={form.metode}
              onChange={handleChange}
              className="input"
              required
            >
              <option value="">Pilih metode</option>
              <option value="Cash">Cash</option>
              <option value="Transfer">Transfer</option>
              <option value="QRIS">QRIS</option>
            </select>
          </div>

          {/* SUBMIT */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-5 bg-queen-gold text-queen-navy font-black rounded-2xl"
          >
            {loading ? "Loading..." : "Simpan Payment"}
          </button>
        </form>
      </div>

      {/* STYLE */}
      <style>{`
        .label {
          font-size: 10px;
          font-weight: 700;
          text-transform: uppercase;
          color: #9ca3af;
          letter-spacing: 0.1em;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .input {
          width: 100%;
          padding: 14px 16px;
          border-radius: 16px;
          border: 1px solid #e5e7eb;
          background: #f9fafb;
          outline: none;
        }

        .dark .input {
          background: #0f172a;
          border-color: #334155;
          color: white;
        }
      `}</style>
    </div>
  );
};

export default PaymentModal;
