import React from "react";
import { MapPin, Truck, Clock, Globe } from "lucide-react";

export default function Area() {
  return (
    <section
      id="area"
      className="max-w-6xl mx-auto px-4 sm:px-6 mt-20 md:mt-32 mb-20 md:mb-28"
    >
      <div className="relative">
        {/* GLOW */}
        <div className="absolute -inset-10 bg-blue-500/10 blur-3xl rounded-full" />

        {/* CARD */}
        <div
          className="relative rounded-3xl overflow-hidden
          bg-gradient-to-b from-white/80 to-white/60
          dark:from-white/10 dark:to-white/5
          border border-white/20 dark:border-white/10
          backdrop-blur-xl"
        >
          {/* MOBILE STACK + DESKTOP SPLIT */}
          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* LEFT CONTENT */}
            <div className="p-6 sm:p-8 md:p-10">
              {/* HEADER */}
              <div className="flex items-center gap-3">
                <div className="p-2 sm:p-3 rounded-full bg-blue-500/10 text-blue-500">
                  <MapPin size={18} />
                </div>

                <p className="text-xs sm:text-sm text-blue-500 font-medium">
                  Area Layanan
                </p>
              </div>

              {/* TITLE */}
              <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold mt-4 md:mt-5 leading-snug">
                Melayani Moyo Hilir & sekitarnya
              </h3>

              {/* DESC */}
              <p className="text-sm sm:text-base text-slate-500 mt-3 leading-relaxed">
                Layanan pickup & delivery cepat mencakup seluruh Bali dengan
                sistem pengantaran yang terjadwal, efisien, dan profesional.
              </p>

              {/* INFO */}
              <div className="mt-6 md:mt-8 space-y-4 md:space-y-5 text-sm">
                <div className="flex items-start gap-3">
                  <Truck className="text-blue-500 mt-1" size={18} />
                  <div>
                    <p className="font-medium text-slate-700 dark:text-slate-200">
                      Pickup Cepat
                    </p>
                    <p className="text-xs text-slate-500">
                      ±30 menit area Moyo Hilir
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="text-indigo-500 mt-1" size={18} />
                  <div>
                    <p className="font-medium text-slate-700 dark:text-slate-200">
                      Operasional
                    </p>
                    <p className="text-xs text-slate-500">08.00 - 20.00 WITA</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Globe className="text-blue-500 mt-1" size={18} />
                  <div>
                    <p className="font-medium text-slate-700 dark:text-slate-200">
                      Coverage
                    </p>
                    <p className="text-xs text-slate-500">
                      Moyo Hilir, Sumbawa Besar
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT MAP (RESPONSIVE FIX) */}
            <div className="h-[220px] sm:h-[280px] md:h-full w-full">
              <iframe
                title="Laundry Location Map"
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d31567.160125633945!2d118.3111147!3d-8.5095737!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dca6a1bfffffffd%3A0x7f0e125c2684707d!2sLapangan%20Sepak%20Bola%20Desa%20Lanci%20Jaya!5e0!3m2!1sid!2sid!4v1777071326199!5m2!1sid!2sid"
                className="w-full h-full"
                loading="lazy"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
