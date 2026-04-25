import React from "react";

export default function ServiceCard({ icon, title, desc }) {
  return (
    <div className="p-6 rounded-2xl bg-white/70 dark:bg-white/5 border">
      <div className="text-blue-500">{icon}</div>
      <p className="font-semibold mt-4">{title}</p>
      <p className="text-sm text-slate-500 mt-2">{desc}</p>
    </div>
  );
}
