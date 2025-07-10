import axios from "axios";
import { useEffect, useState } from "react";

const AdminDonors = () => {
  const [donors, setDonors] = useState([]);

  useEffect(() => {
    const fetchDonors = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/admin/donors", {
          withCredentials: true,
        });
        setDonors(res.data);
      } catch (err) {
        console.error("Error fetching donors:", err);
      }
    };

    fetchDonors();
  }, []);

  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-green-700">🍛 Donors & Their Donations</h2>

      {donors.length === 0 ? (
        <p className="text-gray-500">No donors found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200 text-sm">
            <thead className="bg-green-100">
              <tr>
                <th className="border px-3 py-2 text-left">#</th>
                <th className="border px-3 py-2 text-left">Donor Name</th>
                <th className="border px-3 py-2 text-left">Email</th>
                <th className="border px-3 py-2 text-left">Donations</th>
              </tr>
            </thead>
            <tbody>
              {donors.map((donor, index) => (
                <tr key={donor.id} className="hover:bg-gray-50">
                  <td className="border px-3 py-2">{index + 1}</td>
                  <td className="border px-3 py-2 font-semibold">{donor.name}</td>
                  <td className="border px-3 py-2">{donor.email}</td>
                  <td className="border px-3 py-2">
                    {donor.donations && donor.donations.length > 0 ? (
                      <ul>
                        {donor.donations.map((donation, i) => (
                          <li key={donation._id || i} className="mb-1">
                            <span className="font-medium">{donation.foodType}</span> - {donation.quantity} <span className="text-gray-500">({new Date(donation.createdAt).toLocaleString()})</span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <span className="text-gray-400">No donations</span>
                    )}
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

export default AdminDonors;
