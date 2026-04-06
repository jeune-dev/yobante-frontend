import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/auth/Login.jsx";
import DashboardSelector from "../pages/home/DashboardSelector.jsx";
import DashboardColis from "../pages/home/DashboardColis.jsx";
import DashboardBoutique from "../pages/home/DashboardBoutique.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";

export default function RoutePage() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/yobante/auth/login" replace />} />
        <Route path="/yobante/auth/login" element={<Login />} />

        <Route
          path="/yobante/admin/selector"
          element={
            <ProtectedRoute>
              <DashboardSelector />
            </ProtectedRoute>
          }
        />
        <Route
          path="/yobante/admin/colis"
          element={
            <ProtectedRoute>
              <DashboardColis />
            </ProtectedRoute>
          }
        />
        <Route
          path="/yobante/admin/boutique"
          element={
            <ProtectedRoute>
              <DashboardBoutique />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<Navigate to="/yobante/auth/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}