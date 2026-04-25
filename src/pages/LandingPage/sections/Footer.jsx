import React from "react";
import { Shirt, Sparkles } from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-32 border-t border-slate-200/50 dark:border-slate-800/50 bg-white/40 dark:bg-white/5 backdrop-blur-xl">
      <div className="max-w-6xl mx-auto px-6 py-12 grid md:grid-cols-3 gap-10">
        {/* BRAND */}
        <div>
          <div className="font-semibold text-lg">
            Queen<span className="text-blue-500">Laundry</span>
          </div>

          <p className="text-sm text-slate-500 mt-4 leading-relaxed">
            Laundry modern dengan sistem pickup, pencucian premium, dan tracking
            real-time langsung dari smartphone Anda.
          </p>
        </div>

        {/* QUICK LINKS */}
        <div>
          <h4 className="font-semibold mb-4">Navigasi</h4>

          <div className="flex flex-col gap-2 text-sm text-slate-500">
            <a href="#services" className="hover:text-blue-500">
              Layanan
            </a>
            <a href="#benefit" className="hover:text-blue-500">
              Keunggulan
            </a>
            <a href="#area" className="hover:text-blue-500">
              Area Layanan
            </a>
            <a href="/login" className="hover:text-blue-500">
              Login
            </a>
          </div>
        </div>

        {/* HIGHLIGHT */}
        <div>
          <h4 className="font-semibold mb-4">Kenapa Kami</h4>

          <div className="space-y-3 text-sm text-slate-500">
            <p className="flex items-center gap-2">
              <Sparkles size={14} className="text-blue-500" />
              Kualitas premium
            </p>
            <p className="flex items-center gap-2">
              <Shirt size={14} className="text-blue-500" />
              Perawatan pakaian terbaik
            </p>
            <p>Pickup & delivery cepat</p>
            <p>Tracking real-time</p>
          </div>
        </div>
      </div>

      {/* BOTTOM BAR */}
      <div className="border-t border-slate-200/50 dark:border-slate-800/50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex flex-col md:flex-row justify-center items-center text-xs text-slate-500">
          <p>
            © {new Date().getFullYear()} OutlookProject. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
