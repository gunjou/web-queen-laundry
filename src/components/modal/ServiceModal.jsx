import React from "react";
import { X, Package, Tag, DollarSign, CheckCircle2 } from "lucide-react";

import { formatRupiah, parseRupiah } from "../../utils/format";

const ServiceModal = ({
  isOpen,
  onClose,
  form,
  setForm,
  hargaDisplay,
  setHargaDisplay,
  onSubmit,
  loading,
  isEdit,
}) => {
  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleHargaChange = (e) => {
    const raw = parseRupiah(e.target.value);

    setHargaDisplay(formatRupiah(raw));

    setForm((prev) => ({
      ...prev,
      harga: raw,
    }));
  };

  return (
    <div className="fixed inset-0 z-[999] flex items-end sm:items-center justify-center">
      {/* BACKDROP */}
      <div
        className="fixed inset-0 bg-slate-900/40 backdrop-blur-md"
        onClick={onClose}
      />

      {/* MODAL */}
      <div className="relative bg-white dark:bg-slate-800 w-full max-w-lg rounded-t-[2.5rem] sm:rounded-3xl shadow-2xl overflow-hidden animate-in slide-in-from-bottom sm:zoom-in duration-300 z-[1000]">
        {/* HANDLE MOBILE */}
        <div className="sm:hidden w-12 h-1.5 bg-gray-300 dark:bg-slate-600 rounded-full mx-auto mt-4 mb-2" />

        {/* HEADER */}
        <div className="bg-queen-navy p-6 text-white flex justify-between items-center">
          <div>
            <h3 className="text-xl font-bold flex items-center gap-2">
              <CheckCircle2 className="text-queen-gold" size={22} />
              {isEdit ? "Edit Layanan" : "Tambah Layanan"}
            </h3>

            <p className="text-blue-200 text-xs mt-1">Kelola layanan laundry</p>
          </div>

          <button
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-full"
          >
            <X size={22} />
          </button>
        </div>

        {/* FORM */}
        <form
          onSubmit={onSubmit}
          className="p-6 space-y-5 max-h-[75vh] overflow-y-auto"
        >
          {/* NAMA */}
          <div className="space-y-2">
            <label className="label">
              <Package size={14} /> Nama Layanan
            </label>

            <input
              name="nama"
              value={form.nama}
              onChange={handleChange}
              placeholder="Contoh: Cuci Kering Setrika"
              className="input"
              required
            />
          </div>

          {/* TIPE */}
          <div className="space-y-2">
            <label className="label">
              <Tag size={14} /> Tipe
            </label>

            <select
              name="tipe"
              value={form.tipe}
              onChange={handleChange}
              className="input"
              required
            >
              <option value="">Pilih tipe</option>
              <option value="kiloan">Kiloan</option>
              <option value="satuan">Satuan</option>
            </select>
          </div>

          {/* HARGA (RUPIAH FORMAT) */}
          <div className="space-y-2">
            <label className="label">
              <DollarSign size={14} /> Harga
            </label>

            <input
              type="text"
              value={hargaDisplay}
              onChange={handleHargaChange}
              placeholder="Rp 0"
              className="input"
              required
            />
          </div>

          {/* SUBMIT */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-5 bg-queen-gold text-queen-navy font-black rounded-2xl shadow-xl disabled:opacity-60"
          >
            {loading
              ? "Menyimpan..."
              : isEdit
              ? "Update Layanan"
              : "Simpan Layanan"}
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

export default ServiceModal;
