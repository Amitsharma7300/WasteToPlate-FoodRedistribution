import axios from "axios";
import { useEffect, useState } from "react";

const AdminAssignPickup = () => {
  const [volunteers, setVolunteers] = useState([]);
  const [donations, setDonations] = useState([]);
  const [form, setForm] = useState({ volunteer: "", donation: "" });
  const [message, setMessage] = useState("");
  const [search, setSearch] = useState("");

  // Fetch volunteers and donations
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [volRes, donRes] = await Promise.all([
          axios.get("http://localhost:5000/api/admin/volunteers", { withCredentials: true }),
          axios.get("http://localhost:5000/api/admin/pending-donations", { withCredentials: true }),
        ]);
        setVolunteers(volRes.data);
        setDonations(donRes.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleAssign = async (e) => {
    e.preventDefault();
    // Log selected IDs
    console.log("Volunteer ID:", form.volunteer);
    console.log("Donation ID:", form.donation);

    try {
      const res = await axios.post(
        "http://localhost:5000/api/admin/assign-pickup",
        {
          volunteerId: form.volunteer,
          donationId: form.donation,
        },
        { withCredentials: true }
      );
      setMessage(res.data.message || "Pickup assigned successfully.");
      setForm({ volunteer: "", donation: "" });
    } catch (err) {
      console.error("Assignment failed", err);
      setMessage("Something went wrong. Try again.");
    }
  };

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
              value={form.volunteer}
              onChange={(e) => setForm({ ...form, volunteer: e.target.value })}
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
              value={form.donation}
              onChange={(e) => setForm({ ...form, donation: e.target.value })}
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
    </div>
  );
};

export default AdminAssignPickup;
