import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Protected({ role }) {
  const { loading, profile } = useAuth();

  if (loading) return <div className="p-8 text-gray-600">Loading…</div>;
  if (!profile) return <Navigate to="/login" replace />;
  if (role && profile.userRole !== role) return <Navigate to="/" replace />;

  return <Outlet />;
}
