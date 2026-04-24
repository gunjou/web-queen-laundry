const ActivityCard = ({ activities }) => {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl border border-gray-100 dark:border-slate-700 p-5 shadow-sm">
      <h3 className="font-bold mb-4 text-queen-navy dark:text-white">
        Aktivitas
      </h3>

      <div className="space-y-3">
        {activities.map((a) => (
          <div
            key={a.id}
            className="flex items-start gap-3 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700/30 transition"
          >
            <div className={`p-2 rounded-lg ${a.bg} ${a.color}`}>
              <a.icon size={16} />
            </div>

            <div>
              <p className="text-sm font-medium">{a.title}</p>
              <p className="text-xs text-gray-400">{a.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActivityCard;
