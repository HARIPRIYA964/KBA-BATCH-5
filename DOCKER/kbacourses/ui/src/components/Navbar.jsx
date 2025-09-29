import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";

export default function Navbar() {
  const { profile, isAdmin, logout } = useAuth();
  const navigate = useNavigate();

  const onLogout = async () => {
    try {
      await logout();                         // clears cookie + state
      toast.success("Logged out");
      navigate("/login", { replace: true });  // prevent Back from reviving
    } catch {
      toast.error("Logout failed");
    }
  };

  return (
    <nav className="flex items-center justify-between px-4 py-3 bg-white shadow">
      <Link to="/" className="font-semibold">KBA Courses</Link>
      <div className="flex items-center gap-4">
        <NavLink to="/courses" className="hover:underline">Courses</NavLink>
        {profile ? (
          <>
            <span className="text-sm text-gray-600">Hi, {profile.userName}</span>
            <NavLink to="/dashboard" className="hover:underline">Dashboard</NavLink>
            {isAdmin && (
              <NavLink to="/admin/add-course" className="hover:underline">Add Course</NavLink>
            )}
            <button onClick={onLogout} className="text-sm text-red-600 border rounded px-2 py-1">
              Logout
            </button>
          </>
        ) : (
          <>
            <NavLink to="/login" className="hover:underline">Login</NavLink>
            <NavLink to="/signup" className="hover:underline">Signup</NavLink>
          </>
        )}
      </div>
    </nav>
  );
}
