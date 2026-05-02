import React from "react";
import { X, User, Phone, MapPin, CheckCircle2 } from "lucide-react";

const CustomerModal = ({
  isOpen,
  onClose,
  form,
  setForm,
  onSubmit,
  loading,
  isEdit,
}) => {
  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
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
              {isEdit ? "Edit Pelanggan" : "Tambah Pelanggan"}
            </h3>
            <p className="text-blue-200 text-xs mt-1">
              Kelola data pelanggan laundry
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-full"
          >
            <X size={22} />
          </button>
        </div>

        {/* BODY */}
        <form
          onSubmit={onSubmit}
          className="p-6 space-y-5 max-h-[75vh] overflow-y-auto"
        >
          {/* NAMA */}
          <div className="space-y-2">
            <label className="label">
              <User size={14} /> Nama
            </label>

            <input
              name="nama"
              value={form.nama}
              onChange={handleChange}
              placeholder="Nama pelanggan"
              className="input"
              required
            />
          </div>

          {/* NO HP */}
          <div className="space-y-2">
            <label className="label">
              <Phone size={14} /> No HP
            </label>

            <input
              name="no_hp"
              value={form.no_hp}
              onChange={handleChange}
              placeholder="08xxxxxxxxxx"
              className="input"
              required
            />
          </div>

          {/* ALAMAT */}
          <div className="space-y-2">
            <label className="label">
              <MapPin size={14} /> Alamat
            </label>

            <textarea
              name="alamat"
              value={form.alamat}
              onChange={handleChange}
              rows={3}
              placeholder="Alamat lengkap"
              className="input resize-none"
              required
            />
          </div>

          {/* ACTION */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-5 bg-queen-gold text-queen-navy font-black rounded-2xl shadow-xl disabled:opacity-60"
          >
            {loading
              ? "Menyimpan..."
              : isEdit
              ? "Update Pelanggan"
              : "Simpan Pelanggan"}
          </button>
        </form>
      </div>

      {/* STYLE (SAMAKAN DENGAN ORDERMODAL) */}
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

export default CustomerModal;
