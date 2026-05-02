// import React, { useState, useEffect } from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// import Login from "./pages/Login";
// import LandingPage from "./pages/LandingPage/Index";
// import Layout from "./components/Layout";
// import ProtectedRoute from "./components/ProtectedRoute";

// // ADMIN & STAFF
// import Dashboard from "./pages/Dashboard";
// import OrderList from "./pages/OrderList";
// import Customers from "./pages/Customers";
// import Services from "./pages/Services";
// import AdminReports from "./pages/AdminReports";
// import Karyawan from "./pages/Karyawan";
// import AdminPayment from "./pages/AdminPayment";

// // USER
// import DashboardUser from "./pages/user/DashboardUser";
// import Orders from "./pages/user/Orders";
// import ServicesUser from "./pages/user/Services";
// import ProfileUser from "./pages/user/Profile";

// function App() {
//   const [darkMode, setDarkMode] = useState(false);

//   useEffect(() => {
//     document.documentElement.classList.toggle("dark", darkMode);
//   }, [darkMode]);

//   return (
//     <Router>
//       <Routes>
//         {/* PUBLIC */}
//         <Route path="/" element={<LandingPage />} />
//         <Route
//           path="/login"
//           element={<Login darkMode={darkMode} setDarkMode={setDarkMode} />}
//         />

//         {/* ================= LAYOUT (PROTECTED) ================= */}
//         <Route
//           element={
//             <ProtectedRoute>
//               <Layout darkMode={darkMode} setDarkMode={setDarkMode} />
//             </ProtectedRoute>
//           }
//         >
//           {/* ================= ADMIN ================= */}
//           <Route
//             path="/dashboard"
//             element={
//               <ProtectedRoute allowedRoles={["admin"]}>
//                 <Dashboard />
//               </ProtectedRoute>
//             }
//           />

//           <Route
//             path="/orders"
//             element={
//               <ProtectedRoute allowedRoles={["admin"]}>
//                 <OrderList />
//               </ProtectedRoute>
//             }
//           />

//           <Route
//             path="/customers"
//             element={
//               <ProtectedRoute allowedRoles={["admin"]}>
//                 <Customers />
//               </ProtectedRoute>
//             }
//           />

//           <Route
//             path="/karyawan"
//             element={
//               <ProtectedRoute allowedRoles={["admin"]}>
//                 <Karyawan />
//               </ProtectedRoute>
//             }
//           />

//           <Route
//             path="/payments"
//             element={
//               <ProtectedRoute allowedRoles={["admin"]}>
//                 <AdminPayment />
//               </ProtectedRoute>
//             }
//           />

//           <Route
//             path="/services"
//             element={
//               <ProtectedRoute allowedRoles={["admin", "staff"]}>
//                 <Services />
//               </ProtectedRoute>
//             }
//           />

//           <Route
//             path="/reports"
//             element={
//               <ProtectedRoute allowedRoles={["admin"]}>
//                 <AdminReports />
//               </ProtectedRoute>
//             }
//           />

//           {/* ================= STAFF ================= */}
//           <Route
//             path="/staff/dashboard"
//             element={
//               <ProtectedRoute allowedRoles={["staff"]}>
//                 <Dashboard />
//               </ProtectedRoute>
//             }
//           />

//           <Route
//             path="/staff/orders"
//             element={
//               <ProtectedRoute allowedRoles={["staff"]}>
//                 <OrderList />
//               </ProtectedRoute>
//             }
//           />

//           <Route
//             path="/staff/customers"
//             element={
//               <ProtectedRoute allowedRoles={["staff"]}>
//                 <Customers />
//               </ProtectedRoute>
//             }
//           />

//           <Route
//             path="/staff/payments"
//             element={
//               <ProtectedRoute allowedRoles={["staff"]}>
//                 <AdminPayment />
//               </ProtectedRoute>
//             }
//           />

//           <Route
//             path="/staff/profile"
//             element={
//               <ProtectedRoute allowedRoles={["staff"]}>
//                 <ProfileUser />
//               </ProtectedRoute>
//             }
//           />

//           <Route
//             path="/staff/services"
//             element={
//               <ProtectedRoute allowedRoles={["staff"]}>
//                 <Services />
//               </ProtectedRoute>
//             }
//           />

//           {/* ================= USER ================= */}
//           <Route
//             path="/user/dashboard"
//             element={
//               <ProtectedRoute allowedRoles={["user"]}>
//                 <DashboardUser />
//               </ProtectedRoute>
//             }
//           />

//           <Route
//             path="/user/orders"
//             element={
//               <ProtectedRoute allowedRoles={["user"]}>
//                 <Orders />
//               </ProtectedRoute>
//             }
//           />

//           <Route
//             path="/user/services"
//             element={
//               <ProtectedRoute allowedRoles={["user"]}>
//                 <ServicesUser />
//               </ProtectedRoute>
//             }
//           />

//           <Route
//             path="/user/profile"
//             element={
//               <ProtectedRoute allowedRoles={["user"]}>
//                 <ProfileUser />
//               </ProtectedRoute>
//             }
//           />
//         </Route>
//       </Routes>
//     </Router>
//   );
// }

// export default App;
