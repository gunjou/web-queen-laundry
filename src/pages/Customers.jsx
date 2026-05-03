import React, { useEffect, useMemo, useState } from "react";
import {
  Search,
  UserPlus,
  Phone,
  MapPin,
  MessageCircle,
  Pencil,
  Trash2,
} from "lucide-react";
import Swal from "sweetalert2";

import {
  getCustomers,
  createCustomer,
  updateCustomer,
  deleteCustomer,
} from "../api/customers/customers.api";

import CustomerModal from "../components/modal/CustomerModal";

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
        Swal.fire("Berhasil", "Customer berhasil diperbarui", "success");
      } else {
        await createCustomer(form);
        Swal.fire("Berhasil", "Customer berhasil ditambahkan", "success");
      }

      setOpenModal(false);
      setForm(initialForm);
      setEditingId(null);

      await fetchCustomers();
    } catch (err) {
      Swal.fire("Gagal", err.message || "Gagal menyimpan customer", "error");
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
      Swal.fire("Terhapus", "Customer berhasil dihapus", "success");
      await fetchCustomers();
    } catch (err) {
      Swal.fire("Gagal", err.message || "Gagal menghapus customer", "error");
    }
  };

  const getWhatsappLink = (phone) => {
    if (!phone) return "#";
    return `https://wa.me/${phone.replace(/^0/, "62")}`;
  };

  return (
    <div className="space-y-6 pb-24 lg:pb-10">
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
        <div className="flex gap-3 items-center">
          <div className="relative w-full lg:w-[300px]">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={18}
            />
            <input
              type="text"
              placeholder="Cari nama, nomor HP, atau alamat..."
              className="w-full pl-10 pr-4 py-3 rounded-2xl border bg-white dark:bg-slate-800 dark:text-white text-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button
            onClick={handleOpenCreate}
            className="hidden lg:flex items-center gap-2 px-4 py-3 bg-queen-navy text-white font-bold text-sm rounded-2xl"
          >
            <UserPlus size={18} />
            Tambah Pelanggan
          </button>

          <div />
        </div>
      </div>

      {/* DESKTOP TABLE */}
      <div className="hidden lg:block bg-white dark:bg-slate-800 rounded-3xl border overflow-hidden">
        <div className="max-h-[350px] overflow-y-auto">
          <table className="w-full text-sm text-left">
            <thead className="sticky top-0 bg-gray-50 dark:bg-slate-900 text-xs uppercase text-gray-400">
              <tr>
                <th className="px-6 py-4">Nama</th>
                <th className="px-6 py-4">Kontak</th>
                <th className="px-6 py-4">Alamat</th>
                <th className="px-6 py-4 text-right">Aksi</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={8} className="px-6 py-10 text-center">
                    <div className="flex flex-col items-center justify-center gap-3 text-slate-400">
                      <div className="w-8 h-8 border-4 border-slate-200 border-t-queen-navy rounded-full animate-spin"></div>
                      <p className="text-sm font-medium">
                        Memuat data pelanggan...
                      </p>
                    </div>
                  </td>
                </tr>
              ) : filteredCustomers.length === 0 ? (
                <tr>
                  <td colSpan="4" className="px-8 py-8 text-center">
                    Data tidak ditemukan
                  </td>
                </tr>
              ) : (
                filteredCustomers.map((cust) => (
                  <tr key={cust.id_customer} className="border-t">
                    <td className="px-6 py-5 font-semibold dark:text-white capitalize">
                      {cust.nama}
                    </td>
                    <td className="px-6 py-5 dark:text-white">{cust.no_hp}</td>
                    <td className="px-6 py-5 dark:text-white">{cust.alamat}</td>

                    <td className="px-6 py-5 text-right">
                      <div className="flex justify-end gap-2">
                        <a
                          href={getWhatsappLink(cust.no_hp)}
                          target="_blank"
                          rel="noreferrer"
                          className="p-2 text-green-500"
                        >
                          <MessageCircle size={18} />
                        </a>

                        <button
                          onClick={() => handleOpenEdit(cust)}
                          className="p-2 text-blue-500"
                        >
                          <Pencil size={18} />
                        </button>

                        <button
                          onClick={() => handleDelete(cust)}
                          className="p-2 text-red-500"
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
      </div>

      {/* MOBILE (UPDATED SaaS CARD STYLE) */}
      <div className="lg:hidden space-y-4">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-10 text-slate-400">
            <div className="w-8 h-8 border-4 border-slate-200 border-t-queen-navy rounded-full animate-spin" />
            <p className="text-sm mt-2">Memuat data customer...</p>
          </div>
        ) : filteredCustomers.length === 0 ? (
          <div className="text-center text-gray-400 py-10">
            Data tidak ditemukan
          </div>
        ) : (
          filteredCustomers.map((cust) => (
            <div
              key={cust.id_customer}
              className="bg-white dark:bg-slate-800 rounded-3xl p-5 shadow-sm"
            >
              {/* HEADER */}
              <div className="flex justify-between gap-3">
                <div>
                  <h3 className="font-black text-queen-navy dark:text-white">
                    {cust.nama}
                  </h3>

                  <div className="mt-2 space-y-1">
                    <p className="text-sm text-gray-500 flex items-center gap-2">
                      <Phone size={14} />
                      {cust.no_hp}
                    </p>

                    <p className="text-xs text-gray-400 flex items-start gap-2">
                      <MapPin size={14} />
                      {cust.alamat}
                    </p>
                  </div>
                </div>
              </div>

              {/* ACTIONS */}
              <div className="mt-4 flex justify-end gap-2">
                <a
                  href={getWhatsappLink(cust.no_hp)}
                  target="_blank"
                  rel="noreferrer"
                  className="p-3 rounded-2xl bg-green-100 text-green-600 active:scale-95 transition"
                  title="WhatsApp"
                >
                  <MessageCircle size={18} />
                </a>

                <button
                  onClick={() => handleOpenEdit(cust)}
                  className="p-3 rounded-2xl bg-slate-100 dark:bg-slate-700 text-blue-500 active:scale-95 transition"
                  title="Edit"
                >
                  <Pencil size={18} />
                </button>

                <button
                  onClick={() => handleDelete(cust)}
                  className="p-3 rounded-2xl bg-red-100 text-red-600 active:scale-95 transition"
                  title="Hapus"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* FLOAT BUTTON */}
      <div className="lg:hidden fixed bottom-24 right-5">
        <button
          onClick={handleOpenCreate}
          className="w-14 h-14 rounded-full bg-queen-navy text-white flex items-center justify-center shadow-lg active:scale-95 transition"
          title="Tambah Pelanggan"
        >
          <UserPlus size={18} />
        </button>
      </div>

      {openModal && (
        <CustomerModal
          isOpen={openModal}
          onClose={() => setOpenModal(false)}
          form={form}
          setForm={setForm}
          onSubmit={handleSave}
          loading={saving}
          isEdit={!!editingId}
        />
      )}
    </div>
  );
};

export default Customers;
