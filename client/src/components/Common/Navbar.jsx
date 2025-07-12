import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-green-700">
          🌿 WasteToPlate
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex space-x-6 items-center">
          <Link to="/" className="text-gray-700 hover:text-green-600 transition">Home</Link>
          <Link to="/about" className="text-gray-700 hover:text-green-600 transition">About</Link>
          <Link to="/contact" className="text-gray-700 hover:text-green-600 transition">Contact</Link>

          {user ? (
            <>
              <Link to="/donate" className="text-gray-700 hover:text-green-600 transition">
                Donate
              </Link>

              {/* Role-based Dashboard */}
              {user.role === "Donor" && (
                <Link to="/dashboard/donor" className="text-gray-700 hover:text-green-600 transition">
                  Donor Panel
                </Link>
              )}
              {user.role === "NGO" && (
                <Link to="/dashboard/ngo" className="text-gray-700 hover:text-green-600 transition">
                  NGO Panel
                </Link>
              )}
              {user.role === "Volunteer" && (
                <Link to="/dashboard/volunteer" className="text-gray-700 hover:text-green-600 transition">
                  Volunteer Panel
                </Link>
              )}

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

        {/* Mobile Toggle Button */}
        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!isMenuOpen)}>
            <svg
              className="w-6 h-6 text-gray-700"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>
      

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white px-4 pb-4 space-y-2">
          <Link to="/" className="block text-gray-700 hover:text-green-600">Home</Link>
          <Link to="/about" className="block text-gray-700 hover:text-green-600">About</Link>
          <Link to="/contact" className="block text-gray-700 hover:text-green-600">Contact</Link>

          {user ? (
            <>
              <Link to="/donate" className="block text-gray-700 hover:text-green-600">Donate</Link>

              {user.role === "Donor" && (
                <Link to="/dashboard/donor" className="block text-gray-700 hover:text-green-600">Donor Panel</Link>
              )}
              {user.role === "NGO" && (
                <Link to="/dashboard/ngo" className="block text-gray-700 hover:text-green-600">NGO Panel</Link>
              )}
              {user.role === "Volunteer" && (
                <Link to="/dashboard/volunteer" className="block text-gray-700 hover:text-green-600">Volunteer Panel</Link>
              )}

              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-1 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="block text-gray-700 hover:text-green-600">Login</Link>
              <Link to="/register" className="block text-white bg-green-600 px-4 py-1 rounded hover:bg-green-700">
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