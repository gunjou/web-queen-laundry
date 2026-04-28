import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Lock, User, Sun, Moon, Eye, EyeOff, LogIn } from "lucide-react";
import Swal from "sweetalert2";

import LogoImg from "../assets/logo.png";
import { users } from "../data/users";

const Login = ({ darkMode, setDarkMode }) => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);

    const username = e.target.username.value;
    const password = e.target.password.value;

    setTimeout(() => {
      const foundUser = users.find(
        (u) => u.username === username && u.password === password
      );

      setLoading(false);

      if (!foundUser) {
        Swal.fire({
          title: "Login Gagal",
          text: "Username atau password salah",
          icon: "error",
          confirmButtonColor: "#1B305B",
        });
        return;
      }

      localStorage.setItem("user", JSON.stringify(foundUser));

      Swal.fire({
        title: "Berhasil Masuk!",
        text: `Selamat Datang ${foundUser.name}`,
        icon: "success",
        confirmButtonColor: "#1B305B",
        timer: 1500,
        showConfirmButton: false,
      }).then(() => {
        if (foundUser.role === "admin") {
          navigate("/dashboard");
        } else if (foundUser.role === "staff") {
          navigate("/staff/dashboard");
        } else {
          navigate("/user/dashboard");
        }
      });
    }, 1000);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-900 px-4 transition-colors duration-300">
      {/* DARK MODE TOGGLE (TIDAK DIUBAH) */}
      <button
        onClick={() => setDarkMode(!darkMode)}
        className="absolute top-5 right-5 p-3 rounded-full bg-white dark:bg-slate-800 shadow-lg border border-gray-200 dark:border-slate-700 text-queen-navy dark:text-queen-gold transition-all hover:scale-110 active:scale-90 z-50"
      >
        {darkMode ? <Sun size={24} /> : <Moon size={24} />}
      </button>

      {/* LOGIN CARD (FULL ORIGINAL UI) */}
      <div className="max-w-md w-full space-y-8 bg-white dark:bg-slate-800 p-10 rounded-3xl shadow-2xl border border-gray-100 dark:border-slate-700 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-2 bg-queen-gold"></div>

        <div className="text-center">
          <div className="relative mx-auto h-24 w-24 mb-6 group">
            <div className="absolute inset-0 bg-queen-gold opacity-20 blur-2xl rounded-full group-hover:opacity-40 transition-opacity"></div>

            <div className="relative h-full w-full bg-white dark:bg-slate-700 p-4 rounded-[2rem] shadow-xl border border-gray-100 dark:border-slate-600 flex items-center justify-center transform -rotate-3 transition-transform group-hover:rotate-0 duration-500">
              <img
                src={LogoImg}
                alt="Queen Laundry Logo"
                className="h-full w-full object-contain"
              />
            </div>
          </div>

          <h2 className="text-3xl font-extrabold text-queen-navy dark:text-white tracking-tight">
            Queen Laundry
          </h2>

          <p className="mt-2 text-sm text-gray-500 dark:text-slate-400 font-medium uppercase tracking-widest">
            Jasa Cuci Antar Jemput
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          {/* USERNAME (ONLY ADD NAME) */}
          <div className="relative">
            <label className="block text-xs font-bold text-gray-500 dark:text-slate-400 mb-1 uppercase ml-1">
              Username
            </label>

            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                <User size={18} />
              </span>

              <input
                name="username"
                type="text"
                required
                className="block w-full pl-10 pr-4 py-3 border border-gray-200 dark:border-slate-600 rounded-xl text-gray-900 dark:text-white bg-gray-50 dark:bg-slate-700 focus:ring-2 focus:ring-queen-gold focus:bg-white dark:focus:bg-slate-800 outline-none transition-all sm:text-sm"
                placeholder="admin_queen"
              />
            </div>
          </div>

          {/* PASSWORD (ONLY ADD NAME) */}
          <div className="relative">
            <label className="block text-xs font-bold text-gray-500 dark:text-slate-400 mb-1 uppercase ml-1">
              Password
            </label>

            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                <Lock size={18} />
              </span>

              <input
                name="password"
                type={showPassword ? "text" : "password"}
                required
                className="block w-full pl-10 pr-12 py-3 border border-gray-200 dark:border-slate-600 rounded-xl text-gray-900 dark:text-white bg-gray-50 dark:bg-slate-700 focus:ring-2 focus:ring-queen-gold focus:bg-white dark:focus:bg-slate-800 outline-none transition-all sm:text-sm"
                placeholder="••••••••"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-queen-navy dark:hover:text-queen-gold transition-colors"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* REMEMBER + FORGOT (UNCHANGED UI) */}
          <div className="flex items-center justify-between px-1">
            <div className="flex items-center">
              <input
                id="remember-me"
                type="checkbox"
                className="h-4 w-4 text-queen-navy focus:ring-queen-gold border-gray-300 rounded cursor-pointer"
              />
              <label
                htmlFor="remember-me"
                className="ml-2 block text-sm text-gray-600 dark:text-slate-400 cursor-pointer"
              >
                Ingat Sesi
              </label>
            </div>

            <button
              type="button"
              className="text-sm font-semibold text-queen-navy dark:text-queen-gold hover:underline"
            >
              Lupa Password?
            </button>
          </div>

          {/* BUTTON (UNCHANGED UI) */}
          <button
            type="submit"
            disabled={loading}
            className={`group relative w-full flex justify-center py-3.5 px-4 border border-transparent text-sm font-bold rounded-xl text-white bg-queen-navy dark:bg-queen-navy hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-queen-navy transition-all shadow-xl active:scale-95 ${
              loading ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            <span className="flex items-center gap-2">
              {loading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>
                  <LogIn size={18} className="text-queen-gold" />
                  MASUK SEKARANG
                </>
              )}
            </span>
          </button>
        </form>

        <p className="text-center text-xs text-gray-400 dark:text-gray-500 uppercase tracking-widest pt-4">
          v1.0 &copy; 2026 Outlook Project
        </p>
      </div>
    </div>
  );
};

export default Login;
