const statusMap = {
  Selesai: "bg-green-100 text-green-700",
  Diproses: "bg-blue-100 text-blue-700",
  Diterima: "bg-yellow-100 text-yellow-700",
};

const RecentOrders = ({ orders }) => {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl border border-gray-100 dark:border-slate-700 overflow-hidden">
      <div className="p-4 border-b font-bold text-queen-navy dark:text-white">
        Order Terbaru
      </div>

      {/* DESKTOP */}
      <div className="hidden md:block">
        <table className="w-full text-sm">
          <tbody>
            {orders.map((o) => (
              <tr
                key={o.id}
                className="hover:bg-gray-50 dark:hover:bg-slate-700/40 transition cursor-pointer"
              >
                <td className="p-3 font-semibold dark:text-white">{o.id}</td>
                <td className="dark:text-white">{o.customer}</td>

                <td>
                  <span
                    className={`px-2 py-1 text-xs rounded ${
                      statusMap[o.status]
                    }`}
                  >
                    {o.status}
                  </span>
                </td>

                <td
                  className={`font-semibold ${
                    o.payment === "Lunas" ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {o.payment}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MOBILE */}
      <div className="md:hidden space-y-3 p-4">
        {orders.map((o) => (
          <div
            key={o.id}
            className="bg-gray-50 dark:bg-slate-700/40 rounded-xl p-4 border"
          >
            <div className="flex justify-between">
              <span className="font-bold dark:text-white">#{o.id}</span>

              <span
                className={`px-2 py-1 text-xs rounded ${statusMap[o.status]}`}
              >
                {o.status}
              </span>
            </div>

            <p className="text-sm mt-1 dark:text-white">{o.customer}</p>

            <p
              className={`text-xs mt-1 ${
                o.payment === "Lunas" ? "text-green-500" : "text-red-500"
              }`}
            >
              {o.payment}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentOrders;
