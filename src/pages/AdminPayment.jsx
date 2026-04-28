import { useState } from "react";
import {
  Plus,
  CreditCard,
  QrCode,
  Wallet,
  Building2,
  ToggleRight,
  ToggleLeft,
  ImagePlus,
} from "lucide-react";

/* =========================
   INITIAL DATA
========================= */
const initialPayments = [
  {
    id: 1,
    name: "QRIS",
    type: "qris",
    image: "",
    active: true,
  },
  {
    id: 2,
    name: "Transfer BCA",
    type: "bank",
    number: "1234567890",
    active: true,
  },
  {
    id: 3,
    name: "Cash",
    type: "cash",
    active: true,
  },
];

const AdminPayment = () => {
  const [payments, setPayments] = useState(initialPayments);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [form, setForm] = useState({
    name: "",
    type: "qris",
    number: "",
    image: "",
  });

  /* =========================
     HANDLE IMAGE
  ========================= */
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const imageUrl = URL.createObjectURL(file);
    setForm({ ...form, image: imageUrl });
  };

  /* =========================
     ADD PAYMENT
  ========================= */
  const handleAdd = () => {
    if (!form.name) return;

    setPayments([
      ...payments,
      {
        id: Date.now(),
        ...form,
        active: true,
      },
    ]);

    setForm({ name: "", type: "qris", number: "", image: "" });
    setIsModalOpen(false);
  };

  /* =========================
     TOGGLE
  ========================= */
  const toggleActive = (id) => {
    setPayments((prev) =>
      prev.map((p) => (p.id === id ? { ...p, active: !p.active } : p))
    );
  };

  const getIcon = (type) => {
    switch (type) {
      case "qris":
        return <QrCode size={18} />;
      case "bank":
        return <Building2 size={18} />;
      case "cash":
        return <Wallet size={18} />;
      default:
        return <CreditCard size={18} />;
    }
  };

  return (
    <div className="space-y-6 bg-gray-50 dark:bg-slate-900 min-h-screen">
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-queen-navy dark:text-white">
            Pembayaran
          </h1>
          <p className="text-sm text-gray-500">Kelola metode pembayaran</p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-queen-navy font-semibold text-white text-xs rounded-xl shadow"
        >
          <Plus size={16} />
          Tambah Pembayaran
        </button>
      </div>

      {/* LIST */}
      <div className=" mt-4 space-y-3">
        {payments.map((item) => (
          <div
            key={item.id}
            className="bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-sm border border-slate-200/50 dark:border-slate-700/50"
          >
            <div className="flex justify-between items-center">
              {/* LEFT */}
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-indigo-100 text-indigo-600">
                  {getIcon(item.type)}
                </div>

                <div>
                  <p className="text-sm font-semibold dark:text-white">
                    {item.name}
                  </p>

                  {item.number && (
                    <p className="text-xs text-slate-400">{item.number}</p>
                  )}
                </div>
              </div>

              {/* STATUS */}
              <div className="flex items-center gap-3">
                <span
                  className={`text-[10px] px-2 py-1 rounded-lg ${
                    item.active
                      ? "bg-emerald-100 text-emerald-600"
                      : "bg-slate-200 text-slate-500"
                  }`}
                >
                  {item.active ? "Aktif" : "Nonaktif"}
                </span>

                <button onClick={() => toggleActive(item.id)}>
                  {item.active ? (
                    <ToggleRight size={22} className="text-indigo-600" />
                  ) : (
                    <ToggleLeft size={22} className="text-slate-400" />
                  )}
                </button>
              </div>
            </div>

            {/* 🔥 IMAGE PREVIEW (QRIS) */}
            {item.image && (
              <div className="mt-3">
                <img
                  src={item.image}
                  alt="QR"
                  className="w-32 h-32 object-cover rounded-xl border"
                />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* =========================
          MODAL
      ========================= */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 w-full max-w-sm">
            <h3 className="text-sm font-semibold mb-4 dark:text-white">
              Tambah Metode
            </h3>

            {/* NAME */}
            <input
              type="text"
              placeholder="Nama metode"
              className="w-full mb-3 p-3 rounded-xl border dark:bg-slate-900"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />

            {/* TYPE */}
            <select
              className="w-full mb-3 p-3 rounded-xl border dark:bg-slate-900"
              value={form.type}
              onChange={(e) => setForm({ ...form, type: e.target.value })}
            >
              <option value="qris">QRIS</option>
              <option value="bank">Transfer Bank</option>
              <option value="cash">Cash</option>
            </select>

            {/* BANK NUMBER */}
            {form.type === "bank" && (
              <input
                type="text"
                placeholder="Nomor rekening"
                className="w-full mb-3 p-3 rounded-xl border dark:bg-slate-900"
                value={form.number}
                onChange={(e) => setForm({ ...form, number: e.target.value })}
              />
            )}

            {/* 🔥 UPLOAD QR */}
            {form.type === "qris" && (
              <div className="mb-3">
                <label className="text-xs text-slate-500 mb-1 block">
                  Upload QR
                </label>

                <label className="flex flex-col items-center justify-center border-2 border-dashed rounded-xl p-4 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-700">
                  <ImagePlus size={20} className="mb-2" />
                  <span className="text-xs text-slate-500">
                    Klik untuk upload QR
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    hidden
                    onChange={handleImageUpload}
                  />
                </label>

                {/* PREVIEW */}
                {form.image && (
                  <img
                    src={form.image}
                    alt="preview"
                    className="mt-3 w-28 h-28 rounded-lg border"
                  />
                )}
              </div>
            )}

            {/* ACTION */}
            <div className="flex gap-2 mt-4">
              <button
                onClick={() => setIsModalOpen(false)}
                className="flex-1 py-2 bg-slate-200 rounded-xl text-sm"
              >
                Batal
              </button>
              <button
                onClick={handleAdd}
                className="flex-1 py-2 bg-queen-navy text-white rounded-xl text-sm"
              >
                Simpan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPayment;
