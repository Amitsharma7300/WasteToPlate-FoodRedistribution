import { Route, Routes } from "react-router-dom";

import ProtectedRoute from "../components/Common/ProtectedRoute";
import Login from "../pages/Login";
import Register from "../pages/Register";

import AdminDashboard from "../components/Dashboard/adminDashboard";
import AdminDonors from "../components/Dashboard/components/AdminDonors";
import AdminNGOs from "../components/Dashboard/components/AdminNGOs";
import AdminVolunteers from "../components/Dashboard/components/AdminVolunteers";
import AdminAssignPickup from "../components/Dashboard/components/adminAssignPickup";
import AddVolunteer from "../components/Dashboard/pages/AddVolunteer";
import DashboardHome from "../components/Dashboard/pages/DashboardHome";
import Donations from "../components/Dashboard/pages/Donations";
import Pickups from "../components/Dashboard/pages/Pickups";
import Profile from "../components/Dashboard/pages/Profile";
import About from "../pages/About";
import Contact from "../pages/Contact";
import DonarDashboard from "../pages/DonarDashboard";
import DonateFood from "../pages/DonateFood";
import Home from "../pages/Home";
import ReceiverDashboard from "../pages/ReceiverDashboard";
import VolunteerDashboard from "../pages/VolunteerDashboard";


const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route
        path="/donate"
        element={
          <ProtectedRoute>
            <DonateFood />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard/donor"
        element={
          <ProtectedRoute>
            <DonarDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard/ngo"
        element={
          <ProtectedRoute>
            <ReceiverDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard/volunteer"
        element={
          <ProtectedRoute>
            <VolunteerDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <AdminDashboard />
          </ProtectedRoute>
        }
      >
        <Route index element={<DashboardHome />} />
        <Route path="admin" element={<DashboardHome />} />
        <Route path="admin/donors" element={<AdminDonors />} />
        <Route path="admin/ngos" element={<AdminNGOs />} />
        <Route path="admin/volunteers" element={<AdminVolunteers />} />
        <Route path="assign-pickup" element={<AdminAssignPickup />} />
        <Route path="donations" element={<Donations />} />
        <Route path="pickups" element={<Pickups />} />
        <Route path="profile" element={<Profile />} />
        <Route path="add-volunteer" element={<AddVolunteer />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
