import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Layout from "./components/Layout";
import OrderList from "./pages/OrderList";
import Customers from "./pages/Customers";
import Services from "./pages/Services";

function App() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={<Login darkMode={darkMode} setDarkMode={setDarkMode} />}
        />

        {/* Halaman yang butuh Sidebar/Navbar dibungkus Layout */}
        <Route
          path="/"
          element={<Layout darkMode={darkMode} setDarkMode={setDarkMode} />}
        >
          <Route index element={<Navigate to="/dashboard" />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="orders" element={<OrderList />} />
          <Route path="customers" element={<Customers />} />
          <Route path="services" element={<Services />} />
          {/* Tambahkan route lain di sini nanti */}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
