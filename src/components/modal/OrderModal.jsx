import React, { useState } from "react";
import { X, User, Scale, Package, Wallet, CheckCircle2 } from "lucide-react";
import Swal from "sweetalert2";

const OrderModal = ({ isOpen, onClose }) => {
  // State untuk status pembayaran (Lunas / Belum Lunas)
  const [paymentStatus, setPaymentStatus] = useState("Belum Lunas");

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onClose();
    Swal.fire({
      title: "Order Berhasil!",
      text: `Order status ${paymentStatus} telah dicatat.`,
      icon: "success",
      confirmButtonColor: "#1B305B",
    });
  };

  return (
    // Kita pastikan inset-0 benar-benar nempel ke pinggir layar
    <div className="fixed inset-0 z-[999] flex items-end sm:items-center justify-center transition-all duration-300">
      {/* Backdrop: Dibuat full screen tanpa celah */}
      <div
        className="fixed inset-0 bg-slate-900/40 backdrop-blur-md"
        onClick={onClose}
      ></div>

      {/* Modal Container */}
      <div className="relative bg-white dark:bg-slate-800 w-full max-w-lg rounded-t-[2.5rem] sm:rounded-3xl shadow-2xl overflow-hidden transform transition-all animate-in slide-in-from-bottom sm:zoom-in duration-300 z-[1000]">
        {/* Handle Bar untuk Mobile (Aksen Visual) */}
        <div className="sm:hidden w-12 h-1.5 bg-gray-300 dark:bg-slate-600 rounded-full mx-auto mt-4 mb-2"></div>

        {/* Header */}
        <div className="bg-queen-navy p-6 text-white flex justify-between items-center sm:rounded-t-3xl">
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
            className="p-2 hover:bg-white/10 rounded-full transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="p-6 space-y-6 max-h-[75vh] overflow-y-auto"
        >
          {/* Section Pelanggan */}
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.1em] flex items-center gap-2">
              <User
                size={14}
                className="text-queen-navy dark:text-queen-gold"
              />{" "}
              Pelanggan
            </label>
            <input
              type="text"
              placeholder="Cari atau ketik nama..."
              className="w-full px-4 py-4 rounded-2xl border border-gray-100 dark:border-slate-700 bg-gray-50 dark:bg-slate-900 dark:text-white focus:ring-2 focus:ring-queen-gold outline-none transition-all shadow-sm"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Section Layanan */}
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.1em] flex items-center gap-2">
                <Package
                  size={14}
                  className="text-queen-navy dark:text-queen-gold"
                />{" "}
                Layanan
              </label>
              <select className="w-full px-4 py-4 rounded-2xl border border-gray-100 dark:border-slate-700 bg-gray-50 dark:bg-slate-900 dark:text-white focus:ring-2 focus:ring-queen-gold outline-none appearance-none cursor-pointer">
                <option>Cuci Setrika</option>
                <option>Cuci Kering</option>
                <option>Express</option>
              </select>
            </div>

            {/* Section Berat */}
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.1em] flex items-center gap-2">
                <Scale
                  size={14}
                  className="text-queen-navy dark:text-queen-gold"
                />{" "}
                Berat (Kg)
              </label>
              <input
                type="number"
                placeholder="0.0"
                step="0.1"
                className="w-full px-4 py-4 rounded-2xl border border-gray-100 dark:border-slate-700 bg-gray-50 dark:bg-slate-900 dark:text-white focus:ring-2 focus:ring-queen-gold outline-none"
                required
              />
            </div>
          </div>

          {/* Section Harga */}
          <div className="p-5 bg-queen-navy/5 dark:bg-slate-700/50 rounded-2xl border border-dashed border-queen-navy/20 dark:border-slate-600">
            <label className="text-[10px] font-bold text-queen-navy dark:text-queen-gold uppercase tracking-wider">
              Total Tagihan
            </label>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-2xl font-bold text-queen-navy dark:text-white">
                Rp
              </span>
              <input
                type="number"
                defaultValue="35000"
                className="bg-transparent text-3xl font-black text-queen-navy dark:text-white outline-none w-full"
              />
            </div>
          </div>

          {/* Section Pembayaran: Toggle Lunas / Belum Lunas */}
          <div className="space-y-3">
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider flex items-center gap-2">
              <Wallet
                size={14}
                className="text-queen-navy dark:text-queen-gold"
              />{" "}
              Status Pembayaran
            </label>
            <div className="grid grid-cols-2 gap-3 p-1 bg-gray-100 dark:bg-slate-900 rounded-2xl">
              <button
                type="button"
                onClick={() => setPaymentStatus("Lunas")}
                className={`py-3 rounded-xl font-bold text-sm transition-all duration-300 ${
                  paymentStatus === "Lunas"
                    ? "bg-green-500 text-white shadow-lg scale-[1.02]"
                    : "text-gray-500 dark:text-slate-400 hover:bg-white/50 dark:hover:bg-slate-800"
                }`}
              >
                Lunas
              </button>
              <button
                type="button"
                onClick={() => setPaymentStatus("Belum Lunas")}
                className={`py-3 rounded-xl font-bold text-sm transition-all duration-300 ${
                  paymentStatus === "Belum Lunas"
                    ? "bg-red-500 text-white shadow-lg scale-[1.02]"
                    : "text-gray-500 dark:text-slate-400 hover:bg-white/50 dark:hover:bg-slate-800"
                }`}
              >
                Belum Lunas
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-5 bg-queen-gold text-queen-navy font-black rounded-2xl shadow-xl shadow-queen-gold/20 hover:bg-queen-gold-light active:scale-95 transition-all mt-4 uppercase tracking-[0.2em] text-sm"
          >
            Konfirmasi Orderan
          </button>
        </form>
      </div>
    </div>
  );
};

export default OrderModal;
