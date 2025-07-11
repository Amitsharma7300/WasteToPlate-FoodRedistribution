import axios from 'axios';
import { useEffect, useState } from 'react';
import { FaClock, FaHandHoldingHeart, FaPlusCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import useAuth from '../context/useAuth';

const DonarDashboard = () => {
  const { user } = useAuth();
  const [donationStats, setDonationStats] = useState({ total: 0, pending: 0});
  const [pickups, setPickups] = useState([]);

  useEffect(() => {
    const fetchStats = async () => {
      if (!user) return;
      try {
        const res = await axios.get(  `${import.meta.env.VITE_API_URL}/api/donor/stats`, {
          withCredentials: true,
        });
        setDonationStats(res.data);
      } catch (err) {
        setDonationStats({ total: 0, pending: 0 });
      }
    };
    fetchStats();
  }, [user]);

  useEffect(() => {
    axios
      .get(  `${import.meta.env.VITE_API_URL}/api/donor/pending-pickups`, { withCredentials: true })
      .then((res) => setPickups(res.data))
      .catch(() => setPickups([]));
  }, []);

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg text-gray-600">Loading or not authorized...</p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gradient-to-br from-green-50 to-blue-50 min-h-screen">
      <div className="max-w-7xl mx-auto space-y-8">

        {/* Welcome Section */}
        <div className="bg-white shadow-xl rounded-xl p-6 flex flex-col sm:flex-row items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-green-700">
              Welcome back, {user?.name || 'Donor'}!
            </h2>
            <p className="text-gray-600 mt-1">
              Here you can manage your food donations and track their impact.
            </p>
          </div>
          <img
            src="/src/assets/mission.jpeg"
            alt="Donor Dashboard"
            className="w-40 h-40 object-cover rounded-lg hidden sm:block"
          />
        </div>

        {/* Friendly Message if No Data */}
        {donationStats.total === 0 && donationStats.pending === 0 && (
          <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 p-4 rounded-lg shadow">
            <p className="font-medium">
              You haven’t made any donations yet. Start by clicking <strong>“Make a Donation”</strong> below and help reduce food waste!
            </p>
          </div>
        )}

        {/* Quick Actions */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <Link
            to="/donate"
            className="bg-gradient-to-r from-green-400 to-green-600 text-white p-6 rounded-lg flex items-center justify-between shadow hover:shadow-md transition"
          >
            <div>
              <h3 className="text-xl font-bold mb-2">Make a Donation</h3>
              <p>Help someone in need with surplus food.</p>
            </div>
            <FaPlusCircle className="text-4xl" />
          </Link>

          <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-bold text-gray-700">Donations Made</h3>
              <FaHandHoldingHeart className="text-green-500 text-2xl" />
            </div>
            <p className="text-3xl font-extrabold text-green-700">{donationStats.total}</p>
            <p className="text-sm text-gray-500">Total so far</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-bold text-gray-700">Pending Pickups</h3>
              <FaClock className="text-yellow-500 text-2xl" />
            </div>
            <p className="text-3xl font-extrabold text-yellow-600">{donationStats.pending}</p>
            <p className="text-sm text-gray-500">Awaiting volunteers</p>
          </div>
        </div>

        {/* Tips Section */}
        <div className="bg-white rounded-xl shadow p-6 mt-6">
          <h3 className="text-xl font-semibold mb-2 text-blue-800">Tips for a Successful Donation</h3>
          <ul className="list-disc pl-6 text-gray-700 space-y-1">
            <li>Ensure the food is fresh and securely packed.</li>
            <li>Clearly mention the quantity and pickup time.</li>
            <li>Contact the NGO if there are delays.</li>
          </ul>
        </div>

        {/* Pending Pickups Section */}
        <div className="bg-white rounded-xl shadow p-6 mt-6">
          <h2 className="text-xl font-bold mb-4">Pending Pickups</h2>
          {pickups.length === 0 ? (
            <div>No pending pickups for your donations.</div>
          ) : (
            <ul>
              {pickups.map((pickup) => (
                <li key={pickup._id}>
                  {pickup.foodType} - {pickup.pickupAddress} (Volunteer: {pickup.assignedVolunteer?.name || 'Not assigned'})
                </li>
              ))}
            </ul>
          )}
        </div>

      </div>
    </div>
  );
};

export default DonarDashboard;
