// import React, { useState } from "react";
// import {
//   Plus,
//   Edit3,
//   Trash2,
//   Package,
//   Clock,
//   Truck,
//   Store,
//   Zap,
//   TrendingUp,
// } from "lucide-react";
// import Swal from "sweetalert2";

// const Services = () => {
//   const [tab, setTab] = useState("type");

//   // =========================
//   // DATA
//   // =========================
//   const serviceTypes = [
//     {
//       id: "TYPE-1",
//       name: "Reguler",
//       icon: Store,
//       pricing: null,
//     },
//     {
//       id: "TYPE-2",
//       name: "Pickup",
//       icon: Truck,
//       pricing: { dekat: 5000, sedang: 10000, jauh: 15000 },
//     },
//     {
//       id: "TYPE-3",
//       name: "Pickup + Delivery",
//       icon: Truck,
//       pricing: { dekat: 8000, sedang: 15000, jauh: 20000 },
//     },
//   ];

//   const services = [
//     {
//       id: "SRV-1",
//       name: "Cuci Setrika",
//       price: 7000,
//       unit: "Kg",
//       duration: "2-3 Hari",
//       icon: Clock,
//     },
//     {
//       id: "SRV-2",
//       name: "Cuci Kering",
//       price: 5000,
//       unit: "Kg",
//       duration: "2 Hari",
//       icon: Package,
//     },
//   ];

//   const addons = [
//     {
//       id: "ADD-1",
//       name: "Express 6 Jam",
//       price: 8000,
//       type: "flat",
//       icon: Zap,
//     },
//   ];

//   const handleDelete = (name) => {
//     Swal.fire({
//       title: "Hapus?",
//       text: name,
//       icon: "warning",
//       showCancelButton: true,
//     });
//   };

//   const tabs = [
//     { key: "type", label: "Tipe Layanan" },
//     { key: "service", label: "Layanan" },
//     { key: "addon", label: "Add On" },
//   ];

//   return (
//     <div className="space-y-6 pb-24">
//       {/* HEADER */}
//       <div className="flex justify-between items-center">
//         <div>
//           <h1 className="text-xl font-bold text-slate-800 dark:text-slate-100">
//             Manajemen Layanan
//           </h1>
//           <p className="text-xs text-slate-500 dark:text-slate-400">
//             Kelola tipe, layanan, dan add-on
//           </p>
//         </div>

//         <button className="flex items-center gap-2 px-4 py-2 bg-queen-navy text-white rounded-xl text-xs font-bold shadow-sm hover:opacity-90 transition">
//           <Plus size={16} /> Tambah
//         </button>
//       </div>

//       {/* TAB SWITCH */}
//       <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl text-xs w-fit">
//         {tabs.map((item) => (
//           <button
//             key={item.key}
//             onClick={() => setTab(item.key)}
//             className={`px-4 py-2 rounded-lg transition ${
//               tab === item.key
//                 ? "bg-white dark:bg-slate-900 shadow text-slate-800 dark:text-white"
//                 : "text-slate-500 dark:text-slate-400"
//             }`}
//           >
//             {item.label}
//           </button>
//         ))}
//       </div>

//       {/* ========================= TYPE ========================= */}
//       {tab === "type" && (
//         <div className="grid gap-4">
//           {serviceTypes.map((type) => (
//             <div
//               key={type.id}
//               className="bg-white dark:bg-slate-900 rounded-2xl p-4 shadow-sm border border-slate-200 dark:border-slate-700 hover:shadow-md dark:hover:shadow-slate-900/40 transition"
//             >
//               <div className="flex justify-between items-center">
//                 <div className="flex items-center gap-3">
//                   <type.icon
//                     className="text-slate-600 dark:text-slate-300"
//                     size={20}
//                   />
//                   <h3 className="font-bold text-slate-800 dark:text-white">
//                     {type.name}
//                   </h3>
//                 </div>

//                 <div className="flex gap-2">
//                   <Edit3
//                     className="text-blue-500 dark:text-blue-400 cursor-pointer"
//                     size={16}
//                   />
//                   <Trash2
//                     className="text-red-500 dark:text-red-400 cursor-pointer"
//                     size={16}
//                     onClick={() => handleDelete(type.name)}
//                   />
//                 </div>
//               </div>

//               <div className="mt-3 text-xs text-slate-500 dark:text-slate-400">
//                 {type.pricing ? (
//                   <div className="flex gap-4 flex-wrap">
//                     <span>Near: Rp {type.pricing.dekat}</span>
//                     <span>Mid: Rp {type.pricing.sedang}</span>
//                     <span>Far: Rp {type.pricing.jauh}</span>
//                   </div>
//                 ) : (
//                   <span className="italic">Tanpa biaya tambahan</span>
//                 )}
//               </div>
//             </div>
//           ))}
//         </div>
//       )}

//       {/* ========================= SERVICE ========================= */}
//       {tab === "service" && (
//         <div className="grid gap-4">
//           {services.map((srv) => (
//             <div
//               key={srv.id}
//               className="bg-white dark:bg-slate-900 rounded-2xl p-4 shadow-sm border border-slate-200 dark:border-slate-700 hover:shadow-md dark:hover:shadow-slate-900/40 transition"
//             >
//               <div className="flex justify-between">
//                 <div>
//                   <h3 className="font-bold text-slate-800 dark:text-white">
//                     {srv.name}
//                   </h3>
//                   <p className="text-xs text-slate-500 dark:text-slate-400">
//                     {srv.duration}
//                   </p>
//                 </div>

//                 <div className="text-right">
//                   <p className="font-bold text-indigo-600 dark:text-indigo-400">
//                     Rp {srv.price.toLocaleString()}
//                   </p>
//                   <p className="text-xs text-slate-400">/{srv.unit}</p>
//                 </div>
//               </div>

//               <div className="flex justify-end gap-2 mt-3">
//                 <Edit3
//                   className="text-blue-500 dark:text-blue-400 cursor-pointer"
//                   size={16}
//                 />
//                 <Trash2
//                   className="text-red-500 dark:text-red-400 cursor-pointer"
//                   size={16}
//                   onClick={() => handleDelete(srv.name)}
//                 />
//               </div>
//             </div>
//           ))}
//         </div>
//       )}

//       {/* ========================= ADDON ========================= */}
//       {tab === "addon" && (
//         <div className="grid gap-4">
//           {addons.map((addon) => (
//             <div
//               key={addon.id}
//               className="bg-white dark:bg-slate-900 rounded-2xl p-4 shadow-sm border border-slate-200 dark:border-slate-700 hover:shadow-md dark:hover:shadow-slate-900/40 transition"
//             >
//               <div className="flex justify-between items-center">
//                 <div className="flex items-center gap-3">
//                   <addon.icon
//                     className="text-yellow-500 dark:text-yellow-400"
//                     size={20}
//                   />
//                   <h3 className="font-bold text-slate-800 dark:text-white">
//                     {addon.name}
//                   </h3>
//                 </div>

//                 <p className="font-bold text-amber-500 dark:text-amber-400">
//                   Rp {addon.price.toLocaleString()}
//                 </p>
//               </div>

//               <div className="flex justify-between mt-2 text-xs text-slate-500 dark:text-slate-400">
//                 <span className="uppercase">{addon.type}</span>
//                 <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
//                   <TrendingUp size={12} /> Upsell
//                 </span>
//               </div>

//               <div className="flex justify-end gap-2 mt-3">
//                 <Edit3
//                   className="text-blue-500 dark:text-blue-400 cursor-pointer"
//                   size={16}
//                 />
//                 <Trash2
//                   className="text-red-500 dark:text-red-400 cursor-pointer"
//                   size={16}
//                   onClick={() => handleDelete(addon.name)}
//                 />
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Services;
