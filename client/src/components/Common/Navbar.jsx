import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import axiosInstance from "../../utils/axiosInstance";

const Navbar = () => {
  const { user, setUser, loading } = useAuth();            // assume your AuthContext provides setUser
  const navigate = useNavigate();
  const [isMenuOpen, setMenuOpen] = useState(false);

  // call correct endpoint, clear user, then redirect
  const handleLogout = async () => {
    try {
      await axiosInstance.post("/api/auth/logout");
      setUser(null);
      navigate("/login");
    } catch (err) {
      console.error("Logout failed:", err);
    } finally {
      setMenuOpen(false);
    }
  };

  // pick dashboard path by role
  const getDashboardRoute = () => {
    if (!user) return "/";
    switch (user.role?.toLowerCase()) {
      case "donor":
        return "/dashboard/donor";
      case "ngo":
      case "receiver":
        return "/dashboard/ngo";
      case "volunteer":
        return "/dashboard/volunteer";
      case "admin":
        return "/dashboard/admin";
      default:
        return "/";
    }
  };

  return (
    <header className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-green-700">
          🌿 WasteToPlate
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-gray-700 hover:text-green-600 transition">
            Home
          </Link>
          <Link to="/about" className="text-gray-700 hover:text-green-600 transition">
            About
          </Link>
          <Link to="/contact" className="text-gray-700 hover:text-green-600 transition">
            Contact
          </Link>

          {user ? (
            <>
              <Link to="/donate" className="text-gray-700 hover:text-green-600 transition">
                Donate
              </Link>
              <Link
                to={getDashboardRoute()}
                className="text-gray-700 hover:text-green-600 transition"
              >
                Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="ml-2 px-4 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-gray-700 hover:text-green-600 transition">
                Login
              </Link>
              <Link
                to="/register"
                className="px-4 py-1 bg-green-600 text-white rounded hover:bg-green-700 transition"
              >
                Register
              </Link>
            </>
          )}
        </nav>

        {/* Mobile Hamburger */}
        <div className="md:hidden">
          <button onClick={() => setMenuOpen((o) => !o)} aria-label="Toggle menu">
            {isMenuOpen ? (
              <svg
                className="w-6 h-6 text-gray-700"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg
                className="w-6 h-6 text-gray-700"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white px-4 pb-4 space-y-2">
          <Link to="/" onClick={() => setMenuOpen(false)} className="block text-gray-700 hover:text-green-600">
            Home
          </Link>
          <Link to="/about" onClick={() => setMenuOpen(false)} className="block text-gray-700 hover:text-green-600">
            About
          </Link>
          <Link to="/contact" onClick={() => setMenuOpen(false)} className="block text-gray-700 hover:text-green-600">
            Contact
          </Link>

          {user ? (
            <>
              <Link to="/donate" onClick={() => setMenuOpen(false)} className="block text-gray-700 hover:text-green-600">
                Donate
              </Link>
              <Link
                to={getDashboardRoute()}
                onClick={() => setMenuOpen(false)}
                className="block text-gray-700 hover:text-green-600"
              >
                Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" onClick={() => setMenuOpen(false)} className="block text-gray-700 hover:text-green-600">
                Login
              </Link>
              <Link
                to="/register"
                onClick={() => setMenuOpen(false)}
                className="block text-white bg-green-600 px-4 py-1 rounded hover:bg-green-700"
              >
                Register
              </Link>
            </>
          )}
        </div>
      )}
    </header>
  );
};

export default Navbar;
