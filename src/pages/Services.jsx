import React, { useEffect, useMemo, useState } from "react";
import { Plus, Edit3, Trash2, Search, Pencil } from "lucide-react";
import Swal from "sweetalert2";

import ServiceModal from "../components/modal/ServiceModal";
import { formatRupiah } from "../utils/format";

import {
  getServices,
  deleteService,
  createService,
  updateService,
} from "../api/services/services.api";

const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  const [tab, setTab] = useState("semua");
  const [search, setSearch] = useState("");

  const [openModal, setOpenModal] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    nama: "",
    tipe: "",
    harga: "",
  });

  const [hargaDisplay, setHargaDisplay] = useState("");

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      setLoading(true);
      const res = await getServices();
      setServices(Array.isArray(res) ? res : []);
    } catch (error) {
      Swal.fire("Error", error.message || "Gagal memuat layanan", "error");
    } finally {
      setLoading(false);
    }
  };

  /* =========================
     FILTER
  ========================= */
  const filteredServices = useMemo(() => {
    return services.filter((item) => {
      const matchTab = tab === "semua" || item.tipe === tab;
      const matchSearch = item.nama
        ?.toLowerCase()
        .includes(search.toLowerCase());

      return matchTab && matchSearch;
    });
  }, [services, tab, search]);

  /* =========================
     DELETE
  ========================= */
  const handleDelete = async (service) => {
    const result = await Swal.fire({
      title: "Hapus layanan?",
      text: service.nama,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Hapus",
      cancelButtonText: "Batal",
      confirmButtonColor: "#dc2626",
    });

    if (!result.isConfirmed) return;

    try {
      await deleteService(service.id_service);

      setServices((prev) =>
        prev.filter((i) => i.id_service !== service.id_service)
      );

      Swal.fire("Berhasil", "Layanan berhasil dihapus", "success");
    } catch (error) {
      Swal.fire("Error", error.message || "Gagal menghapus", "error");
    }
  };

  /* =========================
     OPEN MODAL
  ========================= */
  const handleOpenCreate = () => {
    setEditingId(null);
    setForm({ nama: "", tipe: "", harga: "" });
    setOpenModal(true);
  };

  const handleOpenEdit = (service) => {
    setEditingId(service.id_service);
    setForm({
      nama: service.nama,
      tipe: service.tipe,
      harga: String(service.harga),
    });
    setHargaDisplay(formatRupiah(service.harga));
    setOpenModal(true);
  };

  /* =========================
     SAVE
  ========================= */
  const handleSave = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        nama: form.nama,
        tipe: form.tipe,
        harga: Number(form.harga),
      };

      if (editingId) {
        await updateService(editingId, payload);
      } else {
        await createService(payload);
      }

      setOpenModal(false);
      await fetchServices();

      Swal.fire("Berhasil", "Data tersimpan", "success");
    } catch (err) {
      Swal.fire("Error", err.message || "Gagal menyimpan", "error");
    }
  };

  const tabs = [
    { key: "semua", label: "Semua" },
    { key: "kiloan", label: "Kiloan" },
    { key: "satuan", label: "Satuan" },
  ];

  return (
    <div className="space-y-6 pb-24 lg:pb-10">
      {/* ================= HEADER (SAMA DENGAN PAYMENTS STYLE) ================= */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-queen-navy dark:text-white">
            Services
          </h1>
          <p className="text-sm text-gray-500">Kelola layanan laundry</p>
        </div>

        <div className="flex gap-3 items-center w-full lg:w-auto">
          {/* SEARCH */}
          <div className="relative w-full lg:w-[300px]">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari layanan..."
              className="w-full pl-10 pr-4 py-3 rounded-2xl border bg-white dark:bg-slate-800 dark:text-white text-sm"
            />
          </div>

          {/* BUTTON */}
          <button
            onClick={handleOpenCreate}
            className="hidden lg:flex items-center gap-2 px-4 py-3 bg-queen-navy text-white font-bold text-sm rounded-2xl"
          >
            <Plus size={18} />
            Tambah
          </button>
        </div>
      </div>

      {/* ================= TAB ================= */}
      <div className="flex gap-2 overflow-x-auto">
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`px-4 py-2 rounded-full text-xs font-bold transition ${
              tab === t.key
                ? "bg-queen-navy text-white"
                : "bg-slate-100 dark:bg-slate-800 text-slate-500"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* ================= TABLE DESKTOP ================= */}
      <div className="hidden lg:block bg-white dark:bg-slate-800 rounded-3xl border overflow-hidden">
        <div className="max-h-[420px] overflow-y-auto">
          <table className="w-full text-sm">
            <thead className="sticky top-0 bg-gray-50 dark:bg-slate-900 text-xs uppercase text-gray-400">
              <tr>
                <th className="px-6 py-4 text-left">Nama</th>
                <th className="px-6 py-4 text-left">Tipe</th>
                <th className="px-6 py-4 text-left">Harga</th>
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
                        Memuat data layanan...
                      </p>
                    </div>
                  </td>
                </tr>
              ) : filteredServices.length === 0 ? (
                <tr>
                  <td colSpan={4} className="text-center py-10">
                    Data tidak ditemukan
                  </td>
                </tr>
              ) : (
                filteredServices.map((s) => (
                  <tr key={s.id_service} className="border-t">
                    <td className="px-6 py-5 font-semibold dark:text-white">
                      {s.nama}
                    </td>

                    <td className="px-6 py-5 uppercase text-xs font-bold text-blue-500">
                      {s.tipe}
                    </td>

                    <td className="px-6 py-5 font-bold text-queen-navy dark:text-queen-gold">
                      Rp {Number(s.harga).toLocaleString("id-ID")}
                    </td>

                    <td className="px-6 py-5 text-right">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => handleOpenEdit(s)}
                          className="p-2 text-blue-500"
                        >
                          <Pencil size={18} />
                        </button>

                        <button
                          onClick={() => handleDelete(s)}
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

      {/* ================= MOBILE ================= */}
      <div className="lg:hidden space-y-4">
        {loading ? (
          <div className="text-center py-10">Loading...</div>
        ) : filteredServices.length === 0 ? (
          <div className="text-center py-10">Data tidak ditemukan</div>
        ) : (
          filteredServices.map((s) => (
            <div
              key={s.id_service}
              className="bg-white dark:bg-slate-800 rounded-3xl p-5 border"
            >
              <div className="flex justify-between">
                <div>
                  <h3 className="font-bold">{s.nama}</h3>
                  <p className="text-xs uppercase text-gray-400">{s.tipe}</p>
                </div>

                <p className="font-bold text-queen-navy">
                  Rp {Number(s.harga).toLocaleString("id-ID")}
                </p>
              </div>

              <div className="flex justify-end gap-3 mt-4">
                <button
                  onClick={() => handleOpenEdit(s)}
                  className="p-3 rounded-2xl bg-slate-100 dark:bg-slate-700 text-blue-500 active:scale-95 transition"
                >
                  <Pencil size={18} />
                </button>
                <button
                  onClick={() => handleDelete(s)}
                  className="p-3 rounded-2xl bg-slate-100 dark:bg-slate-700 text-red-500 active:scale-95 transition"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* FLOAT BUTTON MOBILE */}
      <div className="lg:hidden fixed bottom-24 right-5">
        <button
          onClick={handleOpenCreate}
          className="w-14 h-14 rounded-full bg-queen-navy text-white flex items-center justify-center shadow-lg"
        >
          <Plus />
        </button>
      </div>

      {/* MODAL */}
      <ServiceModal
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
        form={form}
        setForm={setForm}
        hargaDisplay={hargaDisplay}
        setHargaDisplay={setHargaDisplay}
        onSubmit={handleSave}
        isEdit={!!editingId}
      />
    </div>
  );
};

export default Services;
