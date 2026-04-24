import {
  Clock,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  CreditCard,
  Package,
} from "lucide-react";

export const statsData = [
  { title: "Order Aktif", value: "12", change: "+12%", icon: Clock },
  { title: "Pendapatan", value: 450000, change: "+8%", icon: TrendingUp },
  { title: "Siap Ambil", value: "5", change: "-2%", icon: CheckCircle2 },
  { title: "Belum Bayar", value: "3", change: "-5%", icon: AlertCircle },
];

export const ordersData = [
  { id: "001", customer: "Aniki", status: "Diproses", payment: "Lunas" },
  { id: "002", customer: "Budi", status: "Diterima", payment: "Belum Bayar" },
  { id: "003", customer: "Citra", status: "Selesai", payment: "Lunas" },
];

export const chartData = [
  { name: "Sen", value: 120000 },
  { name: "Sel", value: 210000 },
  { name: "Rab", value: 180000 },
  { name: "Kam", value: 260000 },
  { name: "Jum", value: 300000 },
];

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
    color: "text-blue-500",
    bg: "bg-blue-100",
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
