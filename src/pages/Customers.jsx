import React, { useEffect, useMemo, useState } from "react";
import {
  Search,
  UserPlus,
  Phone,
  MapPin,
  MessageCircle,
  Pencil,
  Trash2,
  X,
} from "lucide-react";
import Swal from "sweetalert2";

import {
  getCustomers,
  createCustomer,
  updateCustomer,
  deleteCustomer,
} from "../api/customers/customers.api";

const initialForm = {
  nama: "",
  no_hp: "",
  alamat: "",
};

const Customers = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [openModal, setOpenModal] = useState(false);
  const [saving, setSaving] = useState(false);

  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(initialForm);

  const fetchCustomers = async () => {
    try {
      setLoading(true);
      const data = await getCustomers();
      setCustomers(Array.isArray(data) ? data : []);
    } catch (err) {
      Swal.fire({
        title: "Gagal",
        text: err.message || "Gagal mengambil data customer",
        icon: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const filteredCustomers = useMemo(() => {
    const keyword = searchTerm.toLowerCase();

    return customers.filter((cust) => {
      return (
        cust.nama?.toLowerCase().includes(keyword) ||
        cust.no_hp?.toLowerCase().includes(keyword) ||
        cust.alamat?.toLowerCase().includes(keyword)
      );
    });
  }, [customers, searchTerm]);

  const handleOpenCreate = () => {
    setEditingId(null);
    setForm(initialForm);
    setOpenModal(true);
  };

  const handleOpenEdit = (cust) => {
    setEditingId(cust.id_customer);
    setForm({
      nama: cust.nama || "",
      no_hp: cust.no_hp || "",
      alamat: cust.alamat || "",
    });
    setOpenModal(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);

      if (editingId) {
        await updateCustomer(editingId, form);

        Swal.fire({
          title: "Berhasil",
          text: "Customer berhasil diperbarui",
          icon: "success",
          timer: 1200,
          showConfirmButton: false,
        });
      } else {
        await createCustomer(form);

        Swal.fire({
          title: "Berhasil",
          text: "Customer berhasil ditambahkan",
          icon: "success",
          timer: 1200,
          showConfirmButton: false,
        });
      }

      setOpenModal(false);
      setForm(initialForm);
      setEditingId(null);

      await fetchCustomers();
    } catch (err) {
      Swal.fire({
        title: "Gagal",
        text: err.message || "Gagal menyimpan customer",
        icon: "error",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (cust) => {
    const result = await Swal.fire({
      title: "Hapus customer?",
      text: cust.nama,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Hapus",
      cancelButtonText: "Batal",
      confirmButtonColor: "#dc2626",
    });

    if (!result.isConfirmed) return;

    try {
      await deleteCustomer(cust.id_customer);

      Swal.fire({
        title: "Terhapus",
        text: "Customer berhasil dihapus",
        icon: "success",
        timer: 1200,
        showConfirmButton: false,
      });

      await fetchCustomers();
    } catch (err) {
      Swal.fire({
        title: "Gagal",
        text: err.message || "Gagal menghapus customer",
        icon: "error",
      });
    }
  };

  const getWhatsappLink = (phone) => {
    if (!phone) return "#";
    return `https://wa.me/${phone.replace(/^0/, "62")}`;
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-24 lg:pb-10">
      {/* HEADER */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-queen-navy dark:text-white">
            Data Pelanggan
          </h1>
          <p className="text-sm text-gray-500 dark:text-slate-400">
            Kelola informasi pelanggan
          </p>
        </div>

        <button
          onClick={handleOpenCreate}
          className="flex items-center justify-center gap-2 px-6 py-3 bg-queen-navy text-white font-bold rounded-2xl hover:bg-slate-800 transition-all shadow-lg"
        >
          <UserPlus size={20} />
          <span>Tambah Pelanggan</span>
        </button>
      </div>

      {/* SEARCH */}
      <div className="relative">
        <Search
          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          size={20}
        />
        <input
          type="text"
          placeholder="Cari nama, nomor HP, atau alamat..."
          className="w-full pl-12 pr-4 py-4 rounded-2xl border border-gray-100 dark:border-slate-700 bg-white dark:bg-slate-800 dark:text-white focus:ring-2 focus:ring-queen-gold outline-none shadow-sm"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* DESKTOP */}
      <div className="hidden lg:block bg-white dark:bg-slate-800 rounded-3xl shadow-sm border border-gray-100 dark:border-slate-700 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 dark:bg-slate-900/50 text-xs uppercase text-gray-400">
            <tr>
              <th className="px-8 py-4">Nama</th>
              <th className="px-8 py-4">Kontak</th>
              <th className="px-8 py-4">Alamat</th>
              <th className="px-8 py-4 text-right">Aksi</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100 dark:divide-slate-700">
            {loading ? (
              <tr>
                <td colSpan="4" className="px-8 py-8 text-center text-gray-400">
                  Memuat data...
                </td>
              </tr>
            ) : filteredCustomers.length === 0 ? (
              <tr>
                <td colSpan="4" className="px-8 py-8 text-center text-gray-400">
                  Data tidak ditemukan
                </td>
              </tr>
            ) : (
              filteredCustomers.map((cust) => (
                <tr
                  key={cust.id_customer}
                  className="hover:bg-slate-50 dark:hover:bg-slate-700/20"
                >
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-4">
                      <div className="h-11 w-11 rounded-2xl bg-queen-gold/10 dark:bg-queen-gold/15 flex items-center justify-center text-sm font-black text-queen-navy dark:text-queen-gold">
                        {cust.nama?.charAt(0)?.toUpperCase()}
                      </div>

                      <div className="min-w-0">
                        <p className="font-semibold text-slate-800 dark:text-white truncate">
                          {cust.nama}
                        </p>

                        <p className="text-[11px] text-slate-400">
                          ID #{cust.id_customer}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="px-8 py-5 text-sm text-slate-600 dark:text-slate-300">
                    {cust.no_hp}
                  </td>

                  <td className="px-8 py-5 text-sm text-slate-500 dark:text-slate-400">
                    {cust.alamat}
                  </td>

                  <td className="px-8 py-5">
                    <div className="flex justify-end gap-2">
                      <a
                        href={getWhatsappLink(cust.no_hp)}
                        target="_blank"
                        rel="noreferrer"
                        className="p-2 rounded-xl hover:bg-green-50 dark:hover:bg-green-500/10 text-green-500"
                      >
                        <MessageCircle size={18} />
                      </a>

                      <button
                        onClick={() => handleOpenEdit(cust)}
                        className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700 text-blue-500"
                      >
                        <Pencil size={18} />
                      </button>

                      <button
                        onClick={() => handleDelete(cust)}
                        className="p-2 rounded-xl hover:bg-red-50 dark:hover:bg-red-500/10 text-red-500"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* MOBILE */}
      <div className="lg:hidden space-y-4">
        {filteredCustomers.map((cust) => (
          <div
            key={cust.id_customer}
            className="bg-white dark:bg-slate-800 p-5 rounded-3xl border border-gray-100 dark:border-slate-700 shadow-sm"
          >
            <div className="flex justify-between items-start gap-3">
              <div className="flex gap-4 min-w-0">
                <div className="h-12 w-12 shrink-0 rounded-2xl bg-queen-gold/10 dark:bg-queen-gold/15 flex items-center justify-center text-sm font-black text-queen-navy dark:text-queen-gold">
                  {cust.nama?.charAt(0)?.toUpperCase()}
                </div>

                <div className="min-w-0">
                  <h3 className="font-bold text-queen-navy dark:text-white truncate">
                    {cust.nama}
                  </h3>

                  <div className="mt-1 flex items-center gap-2 text-sm text-slate-500 dark:text-slate-300">
                    <Phone size={14} />
                    {cust.no_hp}
                  </div>

                  <div className="mt-2 flex items-start gap-2 text-xs text-slate-400">
                    <MapPin size={14} className="mt-0.5 shrink-0" />
                    <span>{cust.alamat}</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-2 shrink-0">
                <button
                  onClick={() => handleOpenEdit(cust)}
                  className="p-2 rounded-xl bg-slate-100 dark:bg-slate-700 text-blue-500"
                >
                  <Pencil size={16} />
                </button>

                <button
                  onClick={() => handleDelete(cust)}
                  className="p-2 rounded-xl bg-red-50 dark:bg-red-500/10 text-red-500"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>

            <a
              href={getWhatsappLink(cust.no_hp)}
              target="_blank"
              rel="noreferrer"
              className="mt-4 flex items-center justify-center gap-2 w-full py-3 rounded-2xl bg-green-500 text-white font-semibold active:scale-95 transition"
            >
              <MessageCircle size={16} />
              WhatsApp
            </a>
          </div>
        ))}
      </div>

      {/* MODAL */}
      {openModal && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-lg font-bold text-slate-800 dark:text-white">
                {editingId ? "Edit Pelanggan" : "Tambah Pelanggan"}
              </h3>

              <button
                onClick={() => setOpenModal(false)}
                className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <input
                type="text"
                placeholder="Nama"
                value={form.nama}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, nama: e.target.value }))
                }
                required
                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 dark:text-white"
              />

              <input
                type="text"
                placeholder="No HP"
                value={form.no_hp}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, no_hp: e.target.value }))
                }
                required
                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 dark:text-white"
              />

              <textarea
                placeholder="Alamat"
                value={form.alamat}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, alamat: e.target.value }))
                }
                required
                rows={3}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 dark:text-white resize-none"
              />

              <button
                type="submit"
                disabled={saving}
                className="w-full py-3 bg-queen-navy text-white rounded-xl font-bold"
              >
                {saving ? "Menyimpan..." : editingId ? "Update" : "Simpan"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Customers;
