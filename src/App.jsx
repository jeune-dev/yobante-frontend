import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/auth/Login";
import DashboardSelector from "./pages/home/DashboardSelector";
import DashboardColis from "./pages/home/DashboardColis";
import DashboardBoutique from "./pages/home/DashboardBoutique";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App() {
  return (
    <BrowserRouter>
      <ToastContainer position="top-right" autoClose={3000} />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/yobante/auth/login" element={<Login />} />
        <Route path="/yobante/admin/selector" element={<DashboardSelector />} />
        <Route path="/yobante/admin/colis" element={<DashboardColis />} />
        <Route path="/yobante/admin/boutique" element={<DashboardBoutique />} />
        <Route path="*" element={<Navigate to="/yobante/auth/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}