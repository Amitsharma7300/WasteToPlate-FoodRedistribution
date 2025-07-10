import { useEffect, useState } from "react";
import axios from "axios";

const AdminAssignPickup = () => {
  const [volunteers, setVolunteers] = useState([]);
  const [donations, setDonations] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [selectedVolunteer, setSelectedVolunteer] = useState("");
  const [selectedDonation, setSelectedDonation] = useState("");
  const [message, setMessage] = useState("");
  const [search, setSearch] = useState("");

  // Fetch volunteers, donations, and assignments
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [volRes, donRes, assignRes] = await Promise.all([
          axios.get("http://localhost:5000/api/admin/volunteers", { withCredentials: true }),
          axios.get("http://localhost:5000/api/admin/pending-donations", { withCredentials: true }),
          axios.get("http://localhost:5000/api/admin/assigned-pickups", { withCredentials: true }),
        ]);
        setVolunteers(volRes.data);
        setDonations(donRes.data);
        setAssignments(assignRes.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleAssign = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:5000/api/admin/assign-pickup",
        {
          volunteerId: selectedVolunteer,
          donationId: selectedDonation,
        },
        { withCredentials: true }
      );
      setMessage(res.data.message || "Pickup assigned successfully.");
      setSelectedVolunteer("");
      setSelectedDonation("");

      // Refresh assignments
      const assignRes = await axios.get("http://localhost:5000/api/admin/assigned-pickups", {
        withCredentials: true,
      });
      setAssignments(assignRes.data);
    } catch (err) {
      console.error("Assignment failed", err);
      setMessage("Something went wrong. Try again.");
    }
  };

  // Filtered data
  const filteredAssignments = assignments.filter((a) =>
    a.volunteer?.name?.toLowerCase().includes(search.toLowerCase()) ||
    a.foodType?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white shadow rounded-xl p-6">
        <h2 className="text-2xl font-bold text-green-700 mb-4 text-center">🚚 Assign Pickup</h2>

        {message && (
          <div className="mb-4 p-2 text-white bg-green-500 rounded text-center">
            {message}
          </div>
        )}

        {/* Assign Form */}
        <form onSubmit={handleAssign} className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-1">Select Volunteer</label>
            <select
              required
              value={selectedVolunteer}
              onChange={(e) => setSelectedVolunteer(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2"
            >
              <option value="">-- Choose a Volunteer --</option>
              {volunteers.map((v) => (
                <option key={v._id} value={v._id}>
                  {v.name} ({v.email})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Select Donation</label>
            <select
              required
              value={selectedDonation}
              onChange={(e) => setSelectedDonation(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2"
            >
              <option value="">-- Choose a Donation --</option>
              {donations.map((d) => (
                <option key={d._id} value={d._id}>
                  {d.foodType} - {d.pickupAddress}
                </option>
              ))}
            </select>
          </div>

          <div className="md:col-span-2 text-center mt-2">
            <button
              type="submit"
              className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
            >
              Assign Pickup
            </button>
          </div>
        </form>
      </div>

      {/* Assignment Table */}
      <div className="max-w-6xl mx-auto mt-10 bg-white shadow rounded-lg p-6">
        <h3 className="text-xl font-semibold text-gray-700 mb-4">📋 Assigned Pickups</h3>

        <input
          type="text"
          placeholder="Search by volunteer or food type..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2 mb-4"
        />

        <div className="overflow-x-auto">
          <table className="min-w-full text-left border border-gray-200">
            <thead className="bg-green-600 text-white">
              <tr>
                <th className="px-4 py-2">Volunteer</th>
                <th className="px-4 py-2">Food Type</th>
                <th className="px-4 py-2">Pickup Address</th>
                <th className="px-4 py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredAssignments.map((a) => (
                <tr key={a._id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-2">{a.volunteer?.name}</td>
                  <td className="px-4 py-2">{a.foodType}</td>
                  <td className="px-4 py-2">{a.pickupAddress}</td>
                  <td className="px-4 py-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      a.status === "Assigned"
                        ? "bg-yellow-100 text-yellow-700"
                        : a.status === "Completed"
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-100 text-gray-700"
                    }`}>
                      {a.status}
                    </span>
                  </td>
                </tr>
              ))}
              {filteredAssignments.length === 0 && (
                <tr>
                  <td colSpan="4" className="text-center py-4 text-gray-500">
                    No assigned pickups found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminAssignPickup;
