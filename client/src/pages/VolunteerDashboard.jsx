import axiosInstance from '../utils/axiosInstance';

import { useEffect, useState } from 'react';

const VolunteerDashboard = () => {
  const [pickups, setPickups] = useState([]);

  useEffect(() => {
    axiosInstance.get('/api/volunteer/assigned-pickups')
      .then(res => setPickups(res.data))
      .catch(() => setPickups([]));
  }, []);

  const handleAccept = async (id) => {
    await axiosInstance.post(`/api/volunteer/pickup/${id}/accept`);
    // Refresh pickups list after accepting
  };

  const handleReject = async (id) => {
    await axiosInstance.post(`/api/volunteer/pickup/${id}/reject`);
    // Refresh pickups list after rejecting
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-green-700 mb-4">🚚 Assigned Pickups</h2>

      {pickups.length === 0 ? (
        <p className="text-gray-600">No pickups assigned yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
            <thead className="bg-green-600 text-white">
              <tr>
                <th className="py-2 px-4">#</th>
                <th className="py-2 px-4">Donor</th>
                <th className="py-2 px-4">Food Type</th>
                <th className="py-2 px-4">Quantity</th>
                <th className="py-2 px-4">Pickup Time</th>
                <th className="py-2 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {pickups.map((pickup, index) => (
                <tr key={pickup._id} className="border-b">
                  <td className="py-2 px-4">{index + 1}</td>
                  <td className="py-2 px-4">{pickup.donor?.name || 'N/A'}</td>
                  <td className="py-2 px-4">{pickup.foodType}</td>
                  <td className="py-2 px-4">{pickup.quantity}</td>
                  <td className="py-2 px-4">
                    {new Date(pickup.pickupTime).toLocaleString()}
                  </td>
                  <td className="py-2 px-4">
                    <button
                      onClick={() => handleAccept(pickup._id)}
                      className="bg-green-500 text-white px-2 py-1 rounded mr-2"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => handleReject(pickup._id)}
                      className="bg-red-500 text-white px-2 py-1 rounded"
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default VolunteerDashboard;
