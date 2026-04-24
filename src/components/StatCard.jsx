import React from "react";

const StatCard = ({ title, value, icon: Icon, color, bg }) => {
  return (
    <div className="bg-white dark:bg-slate-800 p-4 md:p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 flex flex-col sm:flex-row items-start sm:items-center gap-3 md:gap-4">
      <div
        className={`p-3 md:p-4 rounded-xl ${bg} dark:bg-opacity-10 shrink-0`}
      >
        {Icon && <Icon className={`${color}`} size={20} md={28} />}
      </div>
      <div className="min-w-0">
        <p className="text-[10px] md:text-sm font-medium text-gray-500 dark:text-slate-400 truncate">
          {title}
        </p>
        <h3 className="text-sm md:text-2xl font-bold text-queen-navy dark:text-white truncate">
          {value}
        </h3>
      </div>
    </div>
  );
};

export default StatCard;
