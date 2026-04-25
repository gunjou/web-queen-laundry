import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Shirt,
  Sparkles,
  Truck,
  MapPin,
  ArrowRight,
  Sun,
  Moon,
  CheckCircle2,
  Package,
  Bike,
  Home,
  Wind,
  ShirtIcon,
  Timer,
} from "lucide-react";

export default function LandingPage() {
  const [scrolled, setScrolled] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  // TRACKING STATE
  const [statusIndex, setStatusIndex] = useState(1);

  const steps = [
    { text: "Pesanan diterima", icon: <Package size={14} /> },
    { text: "Proses pencucian", icon: <Wind size={14} /> },
    { text: "Quality check", icon: <Sparkles size={14} /> },
    { text: "Sedang diantar", icon: <Truck size={14} /> },
    { text: "Selesai", icon: <CheckCircle2 size={14} /> },
  ];

  const progress = ((statusIndex + 1) / steps.length) * 100;

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "dark") {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // SIMULASI REAL-TIME TRACKING
  useEffect(() => {
    const interval = setInterval(() => {
      setStatusIndex((prev) => {
        if (prev < steps.length - 1) return prev + 1;
        return prev;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const toggleDark = () => {
    setDarkMode(!darkMode);

    if (!darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  return (
    <div className="min-h-screen bg-[#f7f8fc] dark:bg-[#070A12] text-slate-900 dark:text-white transition-colors relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(59,130,246,0.12),transparent_45%),radial-gradient(circle_at_80%_30%,rgba(99,102,241,0.12),transparent_50%)]" />

      {/* NAVBAR */}
      <header
        className={`fixed top-0 w-full z-50 transition-all ${
          scrolled
            ? "bg-white/70 dark:bg-[#070A12]/70 backdrop-blur-xl border-b border-slate-200/50 dark:border-slate-800/50"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="font-semibold text-lg tracking-tight">
            Queen<span className="text-blue-500">Laundry</span>
          </div>

          <nav className="hidden md:flex gap-8 text-sm text-slate-600 dark:text-slate-300">
            <a href="#services" className="hover:text-blue-500">
              Layanan
            </a>
            <a href="#benefit" className="hover:text-blue-500">
              Keunggulan
            </a>
            <a href="#area" className="hover:text-blue-500">
              Area
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={toggleDark}
              className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white/40 dark:bg-white/5"
            >
              {darkMode ? <Sun size={16} /> : <Moon size={16} />}
            </button>

            <Link
              to="/login"
              className="px-4 py-2 rounded-xl bg-blue-600 text-white text-sm hover:opacity-90"
            >
              Masuk
            </Link>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="relative pt-20 max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
        <div>
          <p className="text-sm text-blue-500 font-medium">
            Platform Laundry Modern
          </p>

          <h1 className="text-5xl md:text-6xl font-semibold leading-tight mt-2">
            Laundry lebih cepat, bersih, dan tanpa ribet
          </h1>

          <p className="mt-6 text-slate-600 dark:text-slate-300 max-w-md leading-relaxed">
            Sistem pickup, pencucian premium, dan pengantaran langsung ke rumah
            dengan tracking real-time.
          </p>

          <div className="mt-8 flex gap-3">
            <Link
              to="/login"
              className="px-6 py-3 rounded-xl bg-blue-600 text-white flex items-center gap-2 shadow-lg shadow-blue-500/20"
            >
              Pesan Sekarang <ArrowRight size={16} />
            </Link>

            <a
              href="#services"
              className="px-6 py-3 rounded-xl border border-slate-300 dark:border-slate-700"
            >
              Lihat Layanan
            </a>
          </div>

          <div className="mt-6 flex gap-6 text-sm text-slate-500">
            <span className="flex items-center gap-2">
              <CheckCircle2 size={14} /> 1000+ pelanggan aktif
            </span>
            <span className="flex items-center gap-2">
              <Timer size={14} /> Pickup cepat 30 menit
            </span>
          </div>
        </div>

        {/* TRACKING */}
        <div className="p-[1px] rounded-2xl bg-gradient-to-r from-blue-500/30 to-indigo-500/30">
          <div className="bg-white/80 dark:bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/20 dark:border-white/10">
            <p className="text-sm text-slate-500">Order Tracking</p>

            {/* INFO */}
            <div className="mt-3 text-sm text-slate-500">
              <p>
                No Order:{" "}
                <span className="font-medium text-slate-800 dark:text-white">
                  #QL-2026-001
                </span>
              </p>
              <p>Estimasi selesai: 2 jam lagi</p>
            </div>

            {/* PROGRESS BAR */}
            <div className="mt-4">
              <div className="h-2 w-full bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-600 transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="text-xs text-slate-500 mt-1">
                Progres {Math.round(progress)}%
              </p>
            </div>

            {/* STEPS */}
            <div className="mt-5 space-y-3">
              {steps.map((step, i) => {
                let status = "pending";
                if (i < statusIndex) status = "completed";
                else if (i === statusIndex) status = "current";

                return (
                  <Step
                    key={i}
                    icon={step.icon}
                    text={step.text}
                    status={status}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="max-w-6xl mx-auto px-6 mt-32">
        <h2 className="text-3xl font-semibold">Layanan</h2>
        <p className="text-slate-500 mt-2">
          Pilih layanan sesuai kebutuhan Anda
        </p>

        <div className="mt-10 grid md:grid-cols-3 gap-6">
          <ServiceCard
            icon={<Home size={18} />}
            title="Reguler"
            desc="Antar langsung ke outlet"
          />
          <ServiceCard
            icon={<Bike size={18} />}
            title="Pickup"
            desc="Kami jemput ke lokasi Anda"
          />
          <ServiceCard
            icon={<Truck size={18} />}
            title="Pickup & Delivery"
            desc="Jemput dan antar kembali"
          />
        </div>

        <div className="mt-12 grid md:grid-cols-4 gap-6">
          <ServiceCard
            icon={<Shirt size={18} />}
            title="Cuci Kering"
            desc="Tanpa setrika"
          />
          <ServiceCard
            icon={<ShirtIcon size={18} />}
            title="Cuci + Setrika"
            desc="Bersih & rapi"
          />
          <ServiceCard
            icon={<Sparkles size={18} />}
            title="Setrika Saja"
            desc="Finishing rapi"
          />
          <ServiceCard
            icon={<Timer size={18} />}
            title="Express"
            desc="Prioritas cepat"
          />
        </div>
      </section>

      {/* BENEFIT */}
      <section id="benefit" className="max-w-6xl mx-auto px-6 mt-32">
        <h2 className="text-3xl font-semibold">Keunggulan</h2>

        <div className="mt-10 grid md:grid-cols-3 gap-6">
          <GlowCard text="Efisiensi waktu maksimal" />
          <GlowCard text="Kualitas standar premium" />
          <GlowCard text="Tracking real-time modern" />
        </div>
      </section>

      {/* AREA */}
      <section id="area" className="max-w-6xl mx-auto px-6 mt-32 mb-28">
        <div className="p-[1px] rounded-2xl bg-gradient-to-r from-blue-500/30 to-indigo-500/30">
          <div className="bg-white/80 dark:bg-white/5 rounded-2xl p-12 text-center border border-white/10">
            <MapPin className="mx-auto mb-4 text-blue-500" />
            <h3 className="text-2xl font-semibold">
              Melayani Denpasar dan Sekitarnya
            </h3>
            <p className="text-slate-500 mt-3">
              Pickup dan delivery seluruh Bali
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

/* COMPONENTS */

const Step = ({ text, icon, status }) => {
  const styles = {
    completed: "bg-green-500 text-white border-transparent",
    current: "bg-blue-600 text-white border-transparent animate-pulse",
    pending:
      "bg-white/40 dark:bg-white/5 border-white/20 dark:border-white/10 text-slate-400",
  };

  return (
    <div
      className={`flex items-center gap-3 p-3 rounded-xl text-sm border ${styles[status]}`}
    >
      {icon}
      <span>{text}</span>
    </div>
  );
};

const ServiceCard = ({ icon, title, desc }) => (
  <div className="p-6 rounded-2xl bg-white/70 dark:bg-white/5 border border-white/20 dark:border-white/10 hover:shadow-lg transition">
    <div className="text-blue-500">{icon}</div>
    <p className="font-semibold mt-4">{title}</p>
    <p className="text-sm text-slate-500 mt-2">{desc}</p>
  </div>
);

const GlowCard = ({ text }) => (
  <div className="p-6 rounded-xl bg-white/70 dark:bg-white/5 border border-white/20 dark:border-white/10 text-center">
    {text}
  </div>
);
