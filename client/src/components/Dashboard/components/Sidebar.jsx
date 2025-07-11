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
} from "react-icons/fa";
import { useAuth } from "../../../context/AuthContext";
import axiosInstance from "../../../utils/axiosInstance";

const Sidebar = () => {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axiosInstance.post('/api/auth/logout');
      setUser(null);
      navigate("/login");
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  return (
    <div className="w-64 min-h-screen bg-white shadow-md border-r px-4 py-6">
      <h2 className="text-2xl font-bold text-green-600 mb-8">Dashboard</h2>

      <nav className="flex flex-col gap-3 text-gray-700">

        {/* Dashboard Home */}
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `flex items-center gap-2 px-4 py-2 rounded hover:bg-green-100 ${
              isActive ? "bg-green-200 font-semibold" : ""
            }`
          }
        >
          <FaTachometerAlt /> Home
        </NavLink>

        {/* Donor Routes */}
        {user?.role === "Donor" && (
          <NavLink
            to="/donate"
            className={({ isActive }) =>
              `flex items-center gap-2 px-4 py-2 rounded hover:bg-green-100 ${
                isActive ? "bg-green-200 font-semibold" : ""
              }`
            }
          >
            <FaUtensils /> Donate Food
          </NavLink>
        )}

        {/* NGO Routes */}
        {user?.role === "NGO" && (
          <NavLink
            to="/dashboard/ngo"
            className={({ isActive }) =>
              `flex items-center gap-2 px-4 py-2 rounded hover:bg-green-100 ${
                isActive ? "bg-green-200 font-semibold" : ""
              }`
            }
          >
            <FaUtensils /> Manage Donations
          </NavLink>
        )}

        {/* Volunteer Routes */}
        {user?.role === "Volunteer" && (
          <NavLink
            to="/dashboard/volunteer"
            className={({ isActive }) =>
              `flex items-center gap-2 px-4 py-2 rounded hover:bg-green-100 ${
                isActive ? "bg-green-200 font-semibold" : ""
              }`
            }
          >
            <FaTruck /> Assigned Pickups
          </NavLink>
        )}

        {/* Admin Routes */}
        {user?.role === "admin" && (
          <>
            <NavLink
              to="/dashboard/admin/volunteers"
              className={({ isActive }) =>
                `flex items-center gap-2 px-4 py-2 rounded hover:bg-green-100 ${
                  isActive ? "bg-green-200 font-semibold" : ""
                }`
              }
            >
              <FaUserFriends /> View Volunteers
            </NavLink>

            <NavLink
              to="/dashboard/admin/ngos"
              className={({ isActive }) =>
                `flex items-center gap-2 px-4 py-2 rounded hover:bg-green-100 ${
                  isActive ? "bg-green-200 font-semibold" : ""
                }`
              }
            >
              <FaRegBuilding /> View NGOs
            </NavLink>

            <NavLink
              to="/dashboard/admin/donors"
              className={({ isActive }) =>
                `flex items-center gap-2 px-4 py-2 rounded hover:bg-green-100 ${
                  isActive ? "bg-green-200 font-semibold" : ""
                }`
              }
            >
              <FaUsers /> View Donors
            </NavLink>

            <NavLink
              to="/dashboard/assign-pickup"
              className={({ isActive }) =>
                `flex items-center gap-2 px-4 py-2 rounded hover:bg-green-100 ${
                  isActive ? "bg-green-200 font-semibold" : ""
                }`
              }
            >
              <FaClipboardList /> Assign Pickup
            </NavLink>
          </>
        )}

        {/* Profile (Common) */}
        <NavLink
          to="/dashboard/profile"
          className={({ isActive }) =>
            `flex items-center gap-2 px-4 py-2 rounded hover:bg-green-100 ${
              isActive ? "bg-green-200 font-semibold" : ""
            }`
          }
        >
          <FaUserCircle /> Profile
        </NavLink>

        {/* Logout (Common) */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-4 py-2 mt-6 text-red-600 hover:bg-red-100 rounded"
        >
          <FaSignOutAlt /> Logout
        </button>
      </nav>
    </div>
  );
};

export default Sidebar;
