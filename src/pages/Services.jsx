import React, { useEffect, useMemo, useState } from "react";
import { Plus, Edit3, Trash2, Search } from "lucide-react";
import Swal from "sweetalert2";

import ServiceModal from "../components/modal/ServiceModal";
import { formatRupiah, parseRupiah } from "../utils/format";

import {
  getServices,
  deleteService,
  createService,
  updateService,
} from "../api/services/services.api";

const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hargaDisplay, setHargaDisplay] = useState("");

  const [tab, setTab] = useState("semua");
  const [search, setSearch] = useState("");

  // MODAL STATE
  const [openModal, setOpenModal] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    nama: "",
    tipe: "",
    harga: "",
  });

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

  const filteredServices = useMemo(() => {
    return services.filter((item) => {
      const matchTab = tab === "semua" || item.tipe === tab;
      const matchSearch = item.nama
        ?.toLowerCase()
        .includes(search.toLowerCase());

      return matchTab && matchSearch;
    });
  }, [services, tab, search]);

  // DELETE
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
        prev.filter((item) => item.id_service !== service.id_service)
      );

      Swal.fire({
        title: "Berhasil",
        text: "Layanan berhasil dihapus",
        icon: "success",
        timer: 1200,
        showConfirmButton: false,
      });
    } catch (error) {
      Swal.fire("Error", error.message || "Gagal menghapus layanan", "error");
    }
  };

  // OPEN CREATE
  const handleOpenCreate = () => {
    setEditingId(null);
    setForm({ nama: "", tipe: "", harga: "" });
    setOpenModal(true);
  };

  // OPEN EDIT
  const handleOpenEdit = (service) => {
    setEditingId(service.id_service);

    setForm({
      nama: service.nama || "",
      tipe: service.tipe || "",
      harga: String(service.harga || ""),
    });

    setHargaDisplay(formatRupiah(service.harga));

    setOpenModal(true);
  };

  // SAVE (CREATE / UPDATE)
  const handleSave = async (e) => {
    e.preventDefault();

    // =========================
    // VALIDASI FRONTEND
    // =========================
    if (!form.nama || !form.tipe || !form.harga) {
      Swal.fire("Validasi", "Semua field wajib diisi", "warning");
      return;
    }

    // =========================
    // NORMALISASI DATA
    // =========================
    const payload = {
      nama: form.nama.trim(),
      tipe: form.tipe.toLowerCase(),
      harga: Number(form.harga),
    };

    // tambahan safety (hindari NaN)
    if (isNaN(payload.harga)) {
      Swal.fire("Error", "Harga harus berupa angka", "error");
      return;
    }

    try {
      setLoading(true);

      // =========================
      // CREATE / UPDATE
      // =========================
      if (editingId) {
        await updateService(editingId, payload);

        Swal.fire({
          title: "Berhasil",
          text: "Layanan berhasil diupdate",
          icon: "success",
          timer: 1200,
          showConfirmButton: false,
        });
      } else {
        await createService(payload);

        Swal.fire({
          title: "Berhasil",
          text: "Layanan berhasil ditambahkan",
          icon: "success",
          timer: 1200,
          showConfirmButton: false,
        });
      }

      // =========================
      // RESET STATE
      // =========================
      setOpenModal(false);
      setEditingId(null);
      setForm({
        nama: "",
        tipe: "",
        harga: "",
      });

      // refresh data
      await fetchServices();
    } catch (error) {
      console.log("SERVICE ERROR:", error.response?.data);

      Swal.fire(
        "Error",
        error.response?.data?.message || "Gagal menyimpan layanan",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  const tabs = [
    { key: "semua", label: "Semua" },
    { key: "kiloan", label: "Kiloan" },
    { key: "satuan", label: "Satuan" },
  ];

  return (
    <div className="space-y-6 pb-24">
      {/* HEADER */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-800 dark:text-white">
            Manajemen Layanan
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Kelola layanan laundry
          </p>
        </div>

        <button
          onClick={handleOpenCreate}
          className="flex items-center gap-2 px-4 py-3 bg-queen-navy text-white rounded-2xl text-sm font-bold shadow-sm hover:opacity-90 transition"
        >
          <Plus size={16} />
          Tambah Layanan
        </button>
      </div>

      {/* SEARCH */}
      <div className="relative">
        <Search
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
        />
        <input
          type="text"
          placeholder="Cari layanan..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-11 pr-4 py-3 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 dark:text-white text-sm outline-none"
        />
      </div>

      {/* FILTER TAB */}
      <div className="flex gap-2 overflow-x-auto">
        {tabs.map((item) => (
          <button
            key={item.key}
            onClick={() => setTab(item.key)}
            className={`px-4 py-2 rounded-full text-xs font-bold transition ${
              tab === item.key
                ? "bg-queen-navy text-white"
                : "bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400"
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* TABLE */}
      <div className="hidden lg:block bg-white dark:bg-slate-800 rounded-3xl border overflow-hidden">
        <div className="max-h-[300px] overflow-y-auto">
          <table className="w-full text-left">
            <thead className="sticky top-0 z-10 bg-gray-50 dark:bg-slate-900 text-xs uppercase text-gray-400">
              <tr>
                <th className="px-8 py-4">Nama</th>
                <th className="px-8 py-4">Tipe</th>
                <th className="px-8 py-4">Harga</th>
                <th className="px-8 py-4 text-right">Aksi</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100 dark:divide-slate-700">
              {filteredServices.map((service) => (
                <tr key={service.id_service}>
                  <td className="px-8 py-5 font-semibold dark:text-white">
                    {service.nama}
                  </td>

                  <td
                    className="px-8 py-5 uppercase text-xs font-bold"
                    style={{
                      color: service.tipe === "kiloan" ? "#2563eb" : "#059669",
                    }}
                  >
                    {service.tipe}
                  </td>

                  <td className="px-8 py-5 font-bold text-queen-navy dark:text-queen-gold">
                    Rp {Number(service.harga).toLocaleString("id-ID")}
                  </td>

                  <td className="px-8 py-5">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => handleOpenEdit(service)}
                        className="p-2 rounded-xl text-blue-500"
                      >
                        <Edit3 size={18} />
                      </button>

                      <button
                        onClick={() => handleDelete(service)}
                        className="p-2 rounded-xl text-red-500"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* MOBILE */}
      <div className="grid gap-4 lg:hidden">
        {filteredServices.map((service) => (
          <div
            key={service.id_service}
            className="bg-white dark:bg-slate-900 rounded-3xl p-5 border"
          >
            <div className="flex justify-between">
              <div>
                <h3 className="font-bold">{service.nama}</h3>
                <p className="text-xs uppercase text-gray-400">
                  {service.tipe}
                </p>
              </div>

              <p className="font-black text-queen-navy">
                Rp {Number(service.harga).toLocaleString("id-ID")}
              </p>
            </div>

            <div className="flex justify-end gap-2 mt-4">
              <button onClick={() => handleOpenEdit(service)}>
                <Edit3 size={16} />
              </button>

              <button onClick={() => handleDelete(service)}>
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
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
        loading={loading}
        isEdit={!!editingId}
      />
    </div>
  );
};

export default Services;
