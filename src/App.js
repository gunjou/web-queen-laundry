import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import LandingPage from "./pages/LandingPage/Index";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";

// ADMIN
import Dashboard from "./pages/Dashboard";
import OrderList from "./pages/OrderList";
import Customers from "./pages/Customers";
import Services from "./pages/Services";
import AdminReports from "./pages/AdminReports";
import Karyawan from "./pages/Karyawan";
import AdminPayment from "./pages/AdminPayment";

function App() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  return (
    <Router>
      <Routes>
        {/* PUBLIC */}
        <Route path="/" element={<LandingPage />} />
        <Route
          path="/login"
          element={<Login darkMode={darkMode} setDarkMode={setDarkMode} />}
        />

        {/* PROTECTED */}
        <Route
          element={
            <ProtectedRoute>
              <Layout darkMode={darkMode} setDarkMode={setDarkMode} />
            </ProtectedRoute>
          }
        >
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/orders"
            element={
              <ProtectedRoute>
                <OrderList />
              </ProtectedRoute>
            }
          />

          <Route
            path="/customers"
            element={
              <ProtectedRoute>
                <Customers />
              </ProtectedRoute>
            }
          />

          <Route
            path="/karyawan"
            element={
              <ProtectedRoute>
                <Karyawan />
              </ProtectedRoute>
            }
          />

          <Route
            path="/payments"
            element={
              <ProtectedRoute>
                <AdminPayment />
              </ProtectedRoute>
            }
          />

          <Route
            path="/services"
            element={
              <ProtectedRoute>
                <Services />
              </ProtectedRoute>
            }
          />

          <Route
            path="/reports"
            element={
              <ProtectedRoute>
                <AdminReports />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
