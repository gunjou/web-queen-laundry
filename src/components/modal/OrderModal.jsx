import React, { useEffect, useMemo, useState } from "react";
import {
  X,
  XCircle,
  User,
  Scale,
  Package,
  Wallet,
  CheckCircle2,
  Truck,
  Store,
  Zap,
  MapPin,
  Plus,
} from "lucide-react";
import Swal from "sweetalert2";

import {
  getCustomers,
  createCustomer,
} from "../../api/customers/customers.api";
import { getServices } from "../../api/services/services.api";
import { createOrder } from "../../api/orders/orders.api";

const OrderModal = ({ isOpen, onClose, onSuccess }) => {
  const [paymentStatus, setPaymentStatus] = useState("Belum Lunas");
  const [paymentMethod, setPaymentMethod] = useState("Cash");

  const [serviceType, setServiceType] = useState("reguler");
  const [address, setAddress] = useState("");
  const [isExpress, setIsExpress] = useState(false);

  const [customers, setCustomers] = useState([]);
  const [services, setServices] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    id_customer: "",
    id_service: "",
    berat: "",
    catatan: "",
  });

  // customer picker
  const [customerQuery, setCustomerQuery] = useState("");
  const [showCustomerDropdown, setShowCustomerDropdown] = useState(false);
  const [showQuickAddCustomer, setShowQuickAddCustomer] = useState(false);

  const [newCustomer, setNewCustomer] = useState({
    nama: "",
    no_hp: "",
    alamat: "",
  });

  useEffect(() => {
    if (isOpen) {
      fetchInitialData();
    }
  }, [isOpen]);

  const fetchInitialData = async () => {
    try {
      const custRes = await getCustomers();
      setCustomers(Array.isArray(custRes) ? custRes : []);
    } catch (error) {
      console.error(error);
      Swal.fire("Error", error.message || "Gagal memuat customer", "error");
    }

    try {
      const serviceRes = await getServices();
      setServices(Array.isArray(serviceRes) ? serviceRes : []);
    } catch (error) {
      console.error(error);
      Swal.fire("Error", error.message || "Gagal memuat layanan", "error");
    }
  };

  const filteredCustomers = useMemo(() => {
    if (!customerQuery.trim()) return customers;

    const q = customerQuery.toLowerCase();

    return customers.filter(
      (cust) =>
        cust.nama?.toLowerCase().includes(q) ||
        cust.no_hp?.toLowerCase().includes(q)
    );
  }, [customers, customerQuery]);

  if (!isOpen) return null;

  const handleChange = (field, value) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleQuickAddCustomer = async () => {
    if (!newCustomer.nama || !newCustomer.no_hp) {
      Swal.fire("Oops", "Nama dan no HP wajib diisi", "warning");
      return;
    }

    try {
      const created = await createCustomer(newCustomer);

      const customer = created?.id_customer
        ? created
        : {
            ...newCustomer,
            id_customer: Date.now(),
          };

      setCustomers((prev) => [customer, ...prev]);

      handleChange("id_customer", customer.id_customer);
      setSelectedCustomer(customer);
      setCustomerQuery(customer.nama);
      setShowQuickAddCustomer(false);
      setShowCustomerDropdown(false);

      setNewCustomer({
        nama: "",
        no_hp: "",
        alamat: "",
      });

      Swal.fire({
        title: "Pelanggan ditambahkan",
        icon: "success",
        timer: 1200,
        showConfirmButton: false,
      });
    } catch (error) {
      Swal.fire("Error", error.message || "Gagal menambah pelanggan", "error");
    }
  };

  const resetForm = () => {
    setForm({
      id_customer: "",
      id_service: "",
      berat: "",
      catatan: "",
    });

    setAddress("");
    setIsExpress(false);
    setPaymentStatus("Belum Lunas");
    setPaymentMethod("Cash");
    setServiceType("reguler");

    setCustomerQuery("");
    setShowCustomerDropdown(false);
    setShowQuickAddCustomer(false);

    setNewCustomer({
      nama: "",
      no_hp: "",
      alamat: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.id_customer || !form.id_service || !form.berat) {
      Swal.fire(
        "Form belum lengkap",
        "Pilih customer, layanan, dan isi berat",
        "warning"
      );
      return;
    }

    if (serviceType !== "reguler" && !address) {
      Swal.fire("Alamat wajib diisi", "", "warning");
      return;
    }

    try {
      setLoading(true);

      const payload = {
        berat: Number(form.berat),
        catatan: form.catatan || "",
        id_customer: Number(form.id_customer),
        id_service: Number(form.id_service),
        langsung_bayar: paymentStatus === "Lunas",
        metode: paymentMethod,
      };

      await createOrder(payload);

      Swal.fire({
        title: "Order berhasil dibuat",
        icon: "success",
        confirmButtonColor: "#1B305B",
      });

      resetForm();
      onClose();
      if (onSuccess) onSuccess();
    } catch (error) {
      Swal.fire("Error", error.message || "Gagal membuat order", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[999] flex items-end sm:items-center justify-center">
      <div
        className="fixed inset-0 bg-slate-900/40 backdrop-blur-md"
        onClick={onClose}
      />

      <div className="relative bg-white dark:bg-slate-800 w-full max-w-lg rounded-t-[2.5rem] sm:rounded-3xl shadow-2xl overflow-hidden animate-in slide-in-from-bottom sm:zoom-in duration-300 z-[1000]">
        <div className="sm:hidden w-12 h-1.5 bg-gray-300 dark:bg-slate-600 rounded-full mx-auto mt-4 mb-2"></div>

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

        <form
          onSubmit={handleSubmit}
          className="p-6 space-y-6 max-h-[75vh] overflow-y-auto"
        >
          {/* CUSTOMER */}
          <div className="space-y-2 relative">
            <label className="label">
              <User size={14} /> Pelanggan
            </label>

            {!form.id_customer ? (
              <>
                <input
                  type="text"
                  className="input"
                  placeholder="Cari nama / nomor HP..."
                  value={customerQuery}
                  onChange={(e) => {
                    setCustomerQuery(e.target.value);
                    setShowCustomerDropdown(true);
                    setShowQuickAddCustomer(false);
                  }}
                  onFocus={() => {
                    setShowCustomerDropdown(true);
                    setShowQuickAddCustomer(false);
                  }}
                />

                {showCustomerDropdown && customerQuery.trim() && (
                  <div className="absolute z-50 mt-1 w-full rounded-2xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-xl max-h-56 overflow-y-auto">
                    {filteredCustomers.length > 0 ? (
                      filteredCustomers.map((cust) => (
                        <button
                          key={cust.id_customer}
                          type="button"
                          onClick={() => {
                            handleChange("id_customer", cust.id_customer);
                            setCustomerQuery(cust.nama);
                            setSelectedCustomer(cust);
                            setShowCustomerDropdown(false);
                            setShowQuickAddCustomer(false);
                          }}
                          className="w-full px-4 py-3 text-left hover:bg-gray-50 dark:hover:bg-slate-700 transition"
                        >
                          <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-2xl bg-queen-gold/10 text-queen-navy dark:text-queen-gold flex items-center justify-center text-sm font-black shrink-0">
                              {cust.nama?.charAt(0)?.toUpperCase()}
                            </div>

                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-semibold text-slate-800 dark:text-white truncate">
                                {cust.nama}
                              </p>

                              {cust.no_hp && (
                                <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                                  {cust.no_hp}
                                </p>
                              )}
                            </div>
                          </div>
                        </button>
                      ))
                    ) : (
                      <button
                        type="button"
                        className="w-full px-4 py-3 text-left hover:bg-gray-50 dark:hover:bg-slate-700 transition"
                        onClick={() => {
                          setShowQuickAddCustomer(true);
                          setShowCustomerDropdown(false);
                          setNewCustomer({
                            nama: customerQuery,
                            no_hp: "",
                            alamat: "",
                          });
                        }}
                      >
                        <div className="flex items-center gap-2 text-queen-navy dark:text-queen-gold font-semibold">
                          <Plus size={14} />
                          Tambah pelanggan baru
                        </div>
                        <p className="text-xs text-gray-500 mt-1">
                          "{customerQuery}" belum ditemukan
                        </p>
                      </button>
                    )}
                  </div>
                )}
              </>
            ) : (
              <div className="flex items-center justify-between rounded-2xl border border-emerald-200 bg-emerald-50 dark:bg-emerald-500/10 dark:border-emerald-500/20 px-4 py-3">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="h-10 w-10 rounded-2xl bg-emerald-100 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 flex items-center justify-center text-sm font-black shrink-0">
                    {(selectedCustomer?.nama || customerQuery)
                      ?.charAt(0)
                      ?.toUpperCase()}
                  </div>

                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-emerald-700 dark:text-emerald-300 truncate">
                      {selectedCustomer?.nama || customerQuery}
                    </p>

                    {selectedCustomer?.no_hp && (
                      <p className="text-[11px] text-emerald-600 dark:text-emerald-400 truncate">
                        {selectedCustomer.no_hp}
                      </p>
                    )}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    handleChange("id_customer", "");
                    setCustomerQuery("");
                    setSelectedCustomer(null);
                    setShowCustomerDropdown(false);
                    setShowQuickAddCustomer(false);
                  }}
                  className="p-1 text-emerald-700 hover:bg-emerald-100 dark:hover:bg-emerald-500/10 rounded-full transition"
                >
                  <XCircle size={18} />
                </button>
              </div>
            )}
          </div>

          {/* QUICK ADD CUSTOMER */}
          {showQuickAddCustomer && !form.id_customer && (
            <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 p-4 space-y-3 animate-in fade-in duration-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-bold text-queen-navy dark:text-white">
                    Tambah Pelanggan Baru
                  </p>
                  <p className="text-[11px] text-slate-500">
                    Data ini akan langsung dipilih untuk order
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setShowQuickAddCustomer(false);
                  }}
                  className="p-1 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 transition"
                >
                  <X size={16} />
                </button>
              </div>

              <input
                className="input"
                placeholder="Nama pelanggan"
                value={newCustomer.nama}
                onChange={(e) =>
                  setNewCustomer((prev) => ({
                    ...prev,
                    nama: e.target.value,
                  }))
                }
              />

              <input
                className="input"
                placeholder="Nomor HP"
                value={newCustomer.no_hp}
                onChange={(e) =>
                  setNewCustomer((prev) => ({
                    ...prev,
                    no_hp: e.target.value,
                  }))
                }
              />

              <textarea
                rows={2}
                className="input resize-none"
                placeholder="Alamat"
                value={newCustomer.alamat}
                onChange={(e) =>
                  setNewCustomer((prev) => ({
                    ...prev,
                    alamat: e.target.value,
                  }))
                }
              />

              <button
                type="button"
                onClick={handleQuickAddCustomer}
                className="w-full py-3 rounded-2xl bg-queen-navy text-white font-bold hover:opacity-95 transition"
              >
                Simpan Pelanggan
              </button>
            </div>
          )}

          {/* SERVICE TYPE */}
          <div className="space-y-3">
            <label className="label">
              <Package size={14} /> Tipe Layanan
            </label>

            <div className="grid grid-cols-3 gap-3">
              {[
                ["reguler", "Reguler", Store],
                ["pickup", "Pickup", Truck],
                ["pickup_delivery", "Pickup + Delivery", Truck],
              ].map(([key, label, Icon]) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setServiceType(key)}
                  className={`flex flex-col items-center justify-center gap-2 py-4 rounded-2xl border transition-all ${
                    serviceType === key
                      ? "bg-queen-navy text-white border-queen-navy shadow-lg scale-[1.02]"
                      : "bg-gray-50 dark:bg-slate-900 border-gray-200 dark:border-slate-700 text-gray-500"
                  }`}
                >
                  <Icon size={18} />
                  <span className="text-[10px] font-bold text-center">
                    {label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {serviceType !== "reguler" && (
            <div className="space-y-2">
              <label className="label">
                <MapPin size={14} /> Alamat
              </label>
              <textarea
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                rows={3}
                className="input resize-none"
              />
            </div>
          )}

          {/* SERVICE + BERAT */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="label">
                <Package size={14} /> Layanan
              </label>

              <select
                className="input"
                value={form.id_service}
                onChange={(e) => handleChange("id_service", e.target.value)}
              >
                <option value="">Pilih layanan</option>
                {services.map((service) => (
                  <option key={service.id_service} value={service.id_service}>
                    {service.nama_service}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className="label">
                <Scale size={14} /> Berat
              </label>

              <input
                type="number"
                step="0.1"
                className="input"
                value={form.berat}
                onChange={(e) => handleChange("berat", e.target.value)}
              />
            </div>
          </div>

          {/* CATATAN */}
          <div className="space-y-2">
            <label className="label">Catatan</label>
            <textarea
              rows={3}
              className="input resize-none"
              value={form.catatan}
              onChange={(e) => handleChange("catatan", e.target.value)}
            />
          </div>

          {/* PAYMENT METHOD */}
          <div className="space-y-2">
            <label className="label">
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
          </div>

          {/* PAYMENT STATUS */}
          <div className="space-y-3">
            <label className="label">
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

          <button
            disabled={loading}
            className="w-full py-5 bg-queen-gold text-queen-navy font-black rounded-2xl shadow-xl disabled:opacity-60"
          >
            {loading ? "Menyimpan..." : "Konfirmasi Order"}
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
