import React, { useState } from "react";

const benefits = [
  {
    title: "Efisiensi Waktu",
    desc: "Proses pickup dan laundry terjadwal otomatis tanpa perlu repot mengatur waktu.",
  },
  {
    title: "Kualitas Premium",
    desc: "Pencucian menggunakan standar profesional dengan perhatian pada detail setiap pakaian.",
  },
  {
    title: "Tracking Real-Time",
    desc: "Pantau proses laundry secara langsung dari awal hingga selesai tanpa menebak-nebak.",
  },
];

export default function Benefit() {
  const [active, setActive] = useState(0);

  return (
    <section id="benefit" className="max-w-6xl mx-auto px-6 mt-20">
      {/* HEADER */}
      <div className="text-center md:text-left">
        <p className="text-xs tracking-wider uppercase text-blue-500 font-semibold">
          Kenapa pilih kami
        </p>

        <h2 className="text-3xl md:text-4xl font-semibold mt-2">
          Keunggulan layanan laundry modern
        </h2>

        <p className="mt-3 text-slate-500 max-w-xl mx-auto md:mx-0">
          Dibangun untuk memberikan pengalaman laundry yang lebih cepat,
          transparan, dan berkualitas tinggi.
        </p>
      </div>

      {/* GRID */}
      <div className="mt-12 grid md:grid-cols-3 gap-6">
        {benefits.map((item, i) => {
          const isActive = active === i;

          return (
            <div
              key={i}
              onClick={() => setActive(i)}
              className={`
                cursor-pointer rounded-2xl p-6 transition-all duration-300
                border backdrop-blur-xl
                ${
                  isActive
                    ? "bg-blue-500/10 border-blue-400 shadow-lg scale-[1.02]"
                    : "bg-white/60 dark:bg-white/5 border-white/20 dark:border-white/10 hover:scale-[1.01] hover:border-blue-300"
                }
              `}
            >
              {/* TITLE */}
              <h3
                className={`
                  font-semibold text-lg transition-colors
                  ${
                    isActive
                      ? "text-blue-600"
                      : "text-slate-800 dark:text-white"
                  }
                `}
              >
                {item.title}
              </h3>

              {/* DESCRIPTION */}
              <p className="text-sm text-slate-500 mt-2 leading-relaxed">
                {item.desc}
              </p>

              {/* ACTIVE INDICATOR */}
              <div className="mt-4 flex items-center gap-2 text-xs">
                <div
                  className={`
                    w-2 h-2 rounded-full transition-all
                    ${
                      isActive
                        ? "bg-blue-500"
                        : "bg-slate-300 dark:bg-slate-600"
                    }
                  `}
                />
                <span className="text-slate-400">
                  {isActive ? "Selected" : "Click to focus"}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
