import {
  Clock,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  CreditCard,
  Package,
} from "lucide-react";

export const statsData = [
  {
    title: "Order Aktif",
    value: "12",
    change: "+12%",
    icon: Clock,
    color: "text-blue-500",
    bg: "bg-blue-100",
  },
  {
    title: "Pendapatan",
    value: 450000,
    change: "+8%",
    icon: TrendingUp,
    color: "text-green-500",
    bg: "bg-green-100",
  },
  {
    title: "Siap Ambil",
    value: "5",
    change: "-2%",
    icon: CheckCircle2,
    color: "text-yellow-500",
    bg: "bg-yellow-100",
  },
  {
    title: "Belum Bayar",
    value: "3",
    change: "-5%",
    icon: AlertCircle,
    color: "text-red-500",
    bg: "bg-red-100",
  },
];

export const ordersData = [
  { id: "001", customer: "Aniki", status: "Diproses", payment: "Lunas" },
  { id: "002", customer: "Budi", status: "Diterima", payment: "Belum Bayar" },
  { id: "003", customer: "Citra", status: "Selesai", payment: "Lunas" },
];

export const chartData = {
  Minggu: [
    { name: "Sen", value: 120000 },
    { name: "Sel", value: 210000 },
    { name: "Rab", value: 180000 },
    { name: "Kam", value: 260000 },
    { name: "Jum", value: 300000 },
    { name: "Sab", value: 150000 },
    { name: "Min", value: 90000 },
  ],

  Bulan: Array.from({ length: 31 }, (_, i) => ({
    name: `${i + 1}`,
    value: Math.floor(Math.random() * 500000) + 50000,
  })),

  Tahun: [
    { name: "Jan", value: 2400000 },
    { name: "Feb", value: 1800000 },
    { name: "Mar", value: 3200000 },
    { name: "Apr", value: 2800000 },
    { name: "Mei", value: 3500000 },
    { name: "Jun", value: 3000000 },
    { name: "Jul", value: 4100000 },
    { name: "Agu", value: 3800000 },
    { name: "Sep", value: 3600000 },
    { name: "Okt", value: 4200000 },
    { name: "Nov", value: 3900000 },
    { name: "Des", value: 4500000 },
  ],
};

export const activityData = [
  {
    id: 1,
    icon: CheckCircle2,
    title: "Order #001 selesai",
    time: "2 menit lalu",
    color: "text-green-500",
    bg: "bg-green-100",
  },
  {
    id: 2,
    icon: CreditCard,
    title: "Pembayaran diterima",
    time: "10 menit lalu",
    color: "text-blue-500 dark:text-blue-400",
    bg: "bg-blue-100 dark:bg-blue-400/10",
  },
  {
    id: 3,
    icon: Package,
    title: "Order baru masuk",
    time: "30 menit lalu",
    color: "text-yellow-500",
    bg: "bg-yellow-100",
  },
];
