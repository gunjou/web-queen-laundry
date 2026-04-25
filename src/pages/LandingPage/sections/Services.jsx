import React from "react";
import {
  Home,
  Bike,
  Truck,
  Shirt,
  ShirtIcon,
  Sparkles,
  Timer,
} from "lucide-react";
import ServiceCard from "../components/ServiceCard";

export default function Services() {
  return (
    <section id="services" className="max-w-6xl mx-auto px-6 mt-20">
      {/* TITLE */}
      <h2 className="text-3xl font-semibold">Layanan Kami</h2>
      <p className="text-slate-500 mt-2">
        Pilih cara pengantaran dan jenis perawatan sesuai kebutuhan Anda
      </p>

      {/* ===================== */}
      {/* DELIVERY METHOD */}
      {/* ===================== */}
      <div className="mt-10">
        <h3 className="text-sm font-medium text-slate-500 mb-4">
          Cara Layanan
        </h3>

        <div className="grid md:grid-cols-3 gap-6">
          <ServiceCard
            icon={<Home size={18} />}
            title="Reguler"
            desc="Antar langsung ke outlet kami"
          />
          <ServiceCard
            icon={<Bike size={18} />}
            title="Pickup"
            desc="Kami jemput ke lokasi Anda"
          />
          <ServiceCard
            icon={<Truck size={18} />}
            title="Pickup & Delivery"
            desc="Dijemput dan diantar kembali ke rumah Anda"
          />
        </div>
      </div>

      {/* ===================== */}
      {/* SERVICE TYPE */}
      {/* ===================== */}
      <div className="mt-12">
        <h3 className="text-sm font-medium text-slate-500 mb-4">
          Jenis Perawatan Laundry
        </h3>

        <div className="grid md:grid-cols-4 gap-6">
          <ServiceCard
            icon={<Shirt size={18} />}
            title="Cuci Kering"
            desc="Tanpa setrika, bersih maksimal"
          />
          <ServiceCard
            icon={<ShirtIcon size={18} />}
            title="Cuci + Setrika"
            desc="Dicuci dan dirapikan siap pakai"
          />
          <ServiceCard
            icon={<Sparkles size={18} />}
            title="Setrika Saja"
            desc="Finishing pakaian agar rapi"
          />
          <ServiceCard
            icon={<Timer size={18} />}
            title="Express"
            desc="Proses prioritas cepat selesai"
          />
        </div>
      </div>
    </section>
  );
}
