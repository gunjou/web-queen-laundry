import React, { useState } from "react";
import {
  X,
  User,
  Scale,
  Package,
  Wallet,
  CheckCircle2,
  Truck,
  Store,
  Zap,
  MapPin,
} from "lucide-react";
import Swal from "sweetalert2";

const OrderModal = ({ isOpen, onClose }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const role = user?.role || "user";

  const [paymentStatus, setPaymentStatus] = useState("Belum Lunas");
  const [paymentMethod, setPaymentMethod] = useState("Cash");

  const [serviceType, setServiceType] = useState(
    role === "user" ? "pickup" : "reguler"
  );

  const [address, setAddress] = useState("");
  const [isExpress, setIsExpress] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (serviceType !== "reguler" && !address) {
      Swal.fire({
        title: "Alamat wajib diisi",
        icon: "warning",
      });
      return;
    }

    onClose();

    Swal.fire({
      title: "Order Berhasil!",
      text: `Order ${serviceType.toUpperCase()} - ${
        isExpress ? "Express" : "Reguler"
      } | ${paymentMethod} (${paymentStatus})`,
      icon: "success",
      confirmButtonColor: "#1B305B",
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
        {/* HANDLE */}
        <div className="sm:hidden w-12 h-1.5 bg-gray-300 dark:bg-slate-600 rounded-full mx-auto mt-4 mb-2"></div>

        {/* HEADER */}
        <div className="bg-queen-navy p-6 text-white flex justify-between items-center">
          <div>
            <h3 className="text-xl font-bold flex items-center gap-2">
              <CheckCircle2 className="text-queen-gold" size={24} />
              Buat Order Baru
            </h3>
            <p className="text-blue-200 text-xs mt-1">
              Lengkapi rincian cucian pelanggan
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-full"
          >
            <X size={24} />
          </button>
        </div>

        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="p-6 space-y-6 max-h-[75vh] overflow-y-auto"
        >
          {/* CUSTOMER */}
          <div className="space-y-2">
            <label className="label">
              <User size={14} /> Pelanggan
            </label>
            <input
              type="text"
              placeholder="Cari atau ketik nama..."
              className="input"
              required
            />
          </div>

          {/* SERVICE TYPE */}
          <div className="space-y-3">
            <label className="label flex items-center gap-2">
              <Package size={14} /> Tipe Layanan
            </label>

            <div className="grid grid-cols-3 gap-3">
              <button
                type="button"
                disabled={role === "user"}
                onClick={() => setServiceType("reguler")}
                className={`relative flex flex-col items-center justify-center gap-2 py-4 rounded-2xl border transition-all ${
                  serviceType === "reguler"
                    ? "bg-queen-navy text-white border-queen-navy shadow-lg scale-[1.02]"
                    : "bg-gray-50 dark:bg-slate-900 border-gray-200 dark:border-slate-700 text-gray-500"
                } ${role === "user" ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                <Store size={18} />
                <span className="text-[10px] font-bold">Reguler</span>

                {role === "user" && (
                  <span className="absolute -bottom-5 text-[9px] text-red-400">
                    Datang ke outlet
                  </span>
                )}
              </button>

              <button
                type="button"
                onClick={() => setServiceType("pickup")}
                className={`flex flex-col items-center justify-center gap-2 py-4 rounded-2xl border transition-all ${
                  serviceType === "pickup"
                    ? "bg-queen-navy text-white border-queen-navy shadow-lg scale-[1.02]"
                    : "bg-gray-50 dark:bg-slate-900 border-gray-200 dark:border-slate-700 text-gray-500"
                }`}
              >
                <Truck size={18} />
                <span className="text-[10px] font-bold">Pickup</span>
              </button>

              <button
                type="button"
                onClick={() => setServiceType("pickup_delivery")}
                className={`flex flex-col items-center justify-center gap-2 py-4 rounded-2xl border transition-all ${
                  serviceType === "pickup_delivery"
                    ? "bg-queen-navy text-white border-queen-navy shadow-lg scale-[1.02]"
                    : "bg-gray-50 dark:bg-slate-900 border-gray-200 dark:border-slate-700 text-gray-500"
                }`}
              >
                <Truck size={18} />
                <span className="text-[10px] font-bold text-center leading-tight">
                  Pickup + <br /> Delivery
                </span>
              </button>
            </div>
          </div>

          {/* ADDRESS */}
          {serviceType !== "reguler" && (
            <div className="space-y-2">
              <label className="label flex items-center gap-2">
                <MapPin size={14} />
                {serviceType === "pickup"
                  ? "Alamat Penjemputan"
                  : "Alamat Pickup & Delivery"}
              </label>

              <textarea
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Masukkan alamat lengkap..."
                rows={3}
                className="input resize-none"
                required
              />
            </div>
          )}

          {/* SERVICE + WEIGHT */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="label">
                <Package size={14} /> Layanan
              </label>
              <select className="input">
                <option>Cuci Setrika</option>
                <option>Cuci Kering</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="label">
                <Scale size={14} /> Berat (Kg)
              </label>
              <input type="number" step="0.1" className="input" required />
            </div>
          </div>

          {/* EXPRESS */}
          <div className="space-y-3">
            <label className="label flex items-center gap-2">
              <Zap size={14} /> Add On
            </label>

            <button
              type="button"
              onClick={() => setIsExpress(!isExpress)}
              className={`w-full flex items-center justify-between p-4 rounded-2xl border transition-all ${
                isExpress
                  ? "bg-yellow-100 dark:bg-yellow-500/10 border-yellow-400 text-yellow-700 dark:text-yellow-300 shadow-md"
                  : "bg-gray-50 dark:bg-slate-900 border-gray-200 dark:border-slate-700 text-gray-500"
              }`}
            >
              <div className="flex items-center gap-3">
                <Zap size={18} />
                <div>
                  <p className="text-sm font-bold">Express Service</p>
                  <p className="text-xs opacity-70">
                    Selesai lebih cepat (+biaya)
                  </p>
                </div>
              </div>

              <div
                className={`w-10 h-5 rounded-full ${
                  isExpress ? "bg-yellow-400" : "bg-gray-300"
                }`}
              >
                <div
                  className={`h-5 w-5 bg-white rounded-full shadow transform ${
                    isExpress ? "translate-x-5" : ""
                  }`}
                />
              </div>
            </button>
          </div>

          {/* TOTAL */}
          <div className="p-5 bg-queen-navy/5 dark:bg-slate-700/50 rounded-2xl border border-dashed">
            <label className="text-[10px] font-bold text-queen-navy dark:text-queen-gold uppercase">
              Total Tagihan
            </label>
            <input
              type="number"
              defaultValue="35000"
              className="bg-transparent text-3xl font-black w-full outline-none text-queen-navy dark:text-white"
            />
          </div>

          {/* PAYMENT METHOD */}
          <div className="space-y-2">
            <label className="label flex items-center gap-2">
              <Wallet size={14} /> Metode Pembayaran
            </label>

            <select
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="input"
            >
              <option>Cash</option>
              <option>Transfer</option>
              <option>QRIS</option>
            </select>

            {paymentMethod === "QRIS" && (
              <div className="mt-3 p-4 rounded-2xl border border-dashed border-gray-300 dark:border-slate-600 bg-gray-50 dark:bg-slate-900 text-center">
                <p className="text-xs text-gray-500 mb-2">
                  Scan QR untuk bayar
                </p>

                <div className="w-32 h-32 mx-auto bg-white dark:bg-slate-700 rounded-xl flex items-center justify-center text-gray-400 text-xs">
                  QR IMAGE
                </div>
              </div>
            )}
          </div>

          {/* PAYMENT STATUS */}
          <div className="space-y-3">
            <label className="label flex items-center gap-2">
              <Wallet size={14} /> Status Pembayaran
            </label>

            <div className="grid grid-cols-2 gap-3 p-1 bg-gray-100 dark:bg-slate-900 rounded-2xl">
              <button
                type="button"
                onClick={() => setPaymentStatus("Lunas")}
                className={`btn-toggle ${
                  paymentStatus === "Lunas" ? "bg-green-500 text-white" : ""
                }`}
              >
                Lunas
              </button>

              <button
                type="button"
                onClick={() => setPaymentStatus("Belum Lunas")}
                className={`btn-toggle ${
                  paymentStatus === "Belum Lunas" ? "bg-red-500 text-white" : ""
                }`}
              >
                Belum
              </button>
            </div>
          </div>

          {/* SUBMIT */}
          <button className="w-full py-5 bg-queen-gold text-queen-navy font-black rounded-2xl shadow-xl hover:scale-[1.02] active:scale-95 transition-all">
            Konfirmasi Order
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

        .btn-toggle {
          padding: 12px;
          border-radius: 12px;
          font-weight: bold;
          font-size: 14px;
          transition: 0.3s;
        }
      `}</style>
    </div>
  );
};

export default OrderModal;
