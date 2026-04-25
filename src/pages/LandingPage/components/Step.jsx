import React from "react";

export default function Step({ text, icon, status }) {
  const styles = {
    completed: "bg-green-500 text-white",
    current: "bg-blue-600 text-white animate-pulse",
    pending: "bg-white/10 text-slate-400",
  };

  return (
    <div className={`flex items-center gap-3 p-3 rounded-xl ${styles[status]}`}>
      {icon}
      <span>{text}</span>
    </div>
  );
}
