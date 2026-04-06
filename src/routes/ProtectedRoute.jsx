import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");

  let user = null;
  try {
    const raw = localStorage.getItem("utilisateur");
    user = raw ? JSON.parse(raw) : null;
  } catch {
    user = null;
  }

  if (!token) {
    return <Navigate to="/yobante/auth/login" replace />;
  }

  if (!user || user?.role !== "Admin") {
    return <Navigate to="/yobante/auth/login" replace />;
  }

  return children;
}