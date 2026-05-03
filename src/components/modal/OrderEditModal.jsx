import React, { useEffect, useState } from "react";
import { X, Scale, FileText, CheckCircle2 } from "lucide-react";

const OrderEditModal = ({
  isOpen,
  onClose,
  onSubmit,
  loading,
  initialData,
}) => {
  const [form, setForm] = useState({
    berat: "",
    catatan: "",
  });

  useEffect(() => {
    if (isOpen && initialData) {
      setForm({
        berat: initialData.berat || "",
        catatan: initialData.catatan || "",
      });
    }
  }, [isOpen, initialData]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit({
      berat: Number(form.berat),
      catatan: form.catatan,
    });
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
        {/* MOBILE HANDLE */}
        <div className="sm:hidden w-12 h-1.5 bg-gray-300 dark:bg-slate-600 rounded-full mx-auto mt-4 mb-2" />

        {/* HEADER */}
        <div className="bg-queen-navy p-6 text-white flex justify-between items-center">
          <div>
            <h3 className="text-xl font-bold flex items-center gap-2">
              <CheckCircle2 className="text-queen-gold" size={22} />
              Edit Order
            </h3>

            <p className="text-blue-200 text-xs mt-1">
              Ubah data order laundry
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
          onSubmit={handleSubmit}
          className="p-6 space-y-5 max-h-[75vh] overflow-y-auto"
        >
          {/* BERAT */}
          <div className="space-y-2">
            <label className="label">
              <Scale size={14} /> Berat
            </label>

            <input
              type="number"
              step="0.1"
              name="berat"
              value={form.berat}
              onChange={handleChange}
              placeholder="Contoh: 3.5"
              className="input"
              required
            />
          </div>

          {/* CATATAN */}
          {/* <div className="space-y-2">
            <label className="label">
              <FileText size={14} /> Catatan
            </label>

            <textarea
              name="catatan"
              value={form.catatan}
              onChange={handleChange}
              rows={3}
              placeholder="Catatan order"
              className="input resize-none"
            />
          </div> */}

          {/* ACTION */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-5 bg-queen-gold text-queen-navy font-black rounded-2xl shadow-xl disabled:opacity-60"
          >
            {loading ? "Menyimpan..." : "Update Order"}
          </button>
        </form>
      </div>

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

export default OrderEditModal;
