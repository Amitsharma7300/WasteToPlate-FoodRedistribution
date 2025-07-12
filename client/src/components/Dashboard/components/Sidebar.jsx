import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  FaTachometerAlt,
  FaUtensils,
  FaTruck,
  FaUserCircle,
  FaSignOutAlt,
  FaUsers,
  FaRegBuilding,
  FaUserFriends,
  FaClipboardList,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { useAuth } from "../../../context/AuthContext";
import axiosInstance from "../../../utils/axiosInstance";

const Sidebar = () => {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await axiosInstance.post("/api/auth/logout");
      setUser(null);
      navigate("/login");
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  const toggleMobileMenu = () => setMobileOpen((prev) => !prev);

  // List of nav links for reuse
  const links = [
    { to: "/dashboard", icon: <FaTachometerAlt />, label: "Home", roles: ["Donor","NGO","Volunteer","admin"] },
    { to: "/donate",      icon: <FaUtensils />,      label: "Donate Food",      roles: ["Donor"] },
    { to: "/dashboard/ngo",icon: <FaUtensils />,      label: "Manage Donations",  roles: ["NGO"] },
    { to: "/dashboard/volunteer", icon: <FaTruck />,   label: "Assigned Pickups", roles: ["Volunteer"] },
    { to: "/dashboard/admin/volunteers", icon: <FaUserFriends />,  label: "View Volunteers", roles: ["admin"] },
    { to: "/dashboard/admin/ngos",       icon: <FaRegBuilding />,  label: "View NGOs",       roles: ["admin"] },
    { to: "/dashboard/admin/donors",     icon: <FaUsers />,        label: "View Donors",     roles: ["admin"] },
    { to: "/dashboard/assign-pickup",    icon: <FaClipboardList /> ,label: "Assign Pickup",  roles: ["admin"] },
    { to: "/dashboard/profile", icon: <FaUserCircle />, label: "Profile", roles: ["Donor","NGO","Volunteer","admin"] },
  ];

  const renderLinks = () =>
    links
      .filter((lnk) => lnk.roles.includes(user?.role))
      .map(({ to, icon, label }) => (
        <NavLink
          key={to}
          to={to}
          className={({ isActive }) =>
            `flex items-center gap-2 px-4 py-2 rounded hover:bg-green-100 ${
              isActive ? "bg-green-200 font-semibold" : ""
            }`
          }
          onClick={() => setMobileOpen(false)}
        >
          {icon}
          {label}
        </NavLink>
      ));

  return (
    <>
      {/* Mobile Navbar */}
      <header className="md:hidden flex items-center justify-between bg-white px-4 py-3 shadow">
        <h2 className="text-xl font-bold text-green-600">Dashboard</h2>
        <button onClick={toggleMobileMenu} aria-label="Toggle menu">
          {mobileOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </header>

      {/* Desktop Sidebar */}
      <aside className="hidden md:block w-64 min-h-screen bg-white shadow-md border-r px-4 py-6">
        <h2 className="text-2xl font-bold text-green-600 mb-8">Dashboard</h2>
        <nav className="flex flex-col gap-3 text-gray-700">
          {renderLinks()}
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 mt-6 text-red-600 hover:bg-red-100 rounded"
          >
            <FaSignOutAlt />
            Logout
          </button>
        </nav>
      </aside>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <>
          <div
            className="fixed inset-0 bg-black bg-opacity-30 z-40"
            onClick={toggleMobileMenu}
          />
          <div className="fixed inset-y-0 left-0 w-64 bg-white shadow-lg z-50 transform transition-transform duration-200">
            <nav className="flex flex-col gap-3 text-gray-700 p-6">
              {renderLinks()}
              <button
                onClick={() => {
                  toggleMobileMenu();
                  handleLogout();
                }}
                className="flex items-center gap-2 mt-6 text-red-600 hover:bg-red-100 px-4 py-2 rounded"
              >
                <FaSignOutAlt />
                Logout
              </button>
            </nav>
          </div>
        </>
      )}
    </>
  );
};

export default Sidebar;