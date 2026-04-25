import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2, Timer } from "lucide-react";

import heroImage from "../../../assets/logo.png";

export default function Hero() {
  return (
    <section className="relative pt-20 max-w-6xl mx-auto px-6">
      <div className="grid md:grid-cols-2 gap-14 items-center">
        {/* LEFT CONTENT */}
        <div className="text-center md:text-left">
          <p className="text-xs tracking-wider uppercase text-blue-500 font-semibold">
            Platform Laundry Modern
          </p>

          <h1 className="text-5xl md:text-6xl font-semibold leading-tight mt-4">
            Laundry lebih cepat, <span className="text-blue-500">bersih</span>,
            dan tanpa ribet
          </h1>

          <p className="mt-6 text-slate-600 dark:text-slate-300 max-w-xl leading-relaxed">
            Sistem pickup, pencucian premium, dan pengantaran langsung ke rumah
            dengan tracking real-time yang transparan dan mudah digunakan.
          </p>

          {/* CTA */}
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
            <Link
              to="/login"
              className="px-6 py-3 rounded-xl bg-blue-600 text-white flex items-center justify-center gap-2
              hover:bg-blue-700 transition"
            >
              Laundry Sekarang <ArrowRight size={16} />
            </Link>

            <a
              href="#services"
              className="px-6 py-3 rounded-xl border border-slate-300 dark:border-slate-700
              hover:border-blue-400 transition text-slate-700 dark:text-slate-200 text-center"
            >
              Lihat Layanan
            </a>
          </div>

          {/* TRUST */}
          <div className="mt-8 flex flex-col sm:flex-row gap-5 text-sm text-slate-500 justify-center md:justify-start">
            <span className="flex items-center gap-2">
              <CheckCircle2 size={14} className="text-green-500" />
              1000+ pelanggan aktif
            </span>

            <span className="flex items-center gap-2">
              <Timer size={14} className="text-blue-500" />
              Pickup ±30 menit
            </span>
          </div>
        </div>

        {/* RIGHT IMAGE (SMALLER + CLEAN) */}
        <div className="flex justify-center md:justify-end">
          <img
            src={heroImage}
            alt="Laundry App"
            className="w-[260px] md:w-[320px] lg:w-[360px] object-contain opacity-95"
          />
        </div>
      </div>
    </section>
  );
}
