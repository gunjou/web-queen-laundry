import React from "react";

export default function GlowCard({ text }) {
  return (
    <div className="p-6 rounded-xl bg-white/70 dark:bg-white/5 border text-center">
      {text}
    </div>
  );
}
