import { useEffect, useState } from "react";
import axios from "axios";

const ReceiverDashboard = () => {
  const [available, setAvailable] = useState([]);
  const [accepted, setAccepted] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchAvailable();
    fetchAccepted();
  }, []);

  const fetchAvailable = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:5000/api/receiver/donations", {
        withCredentials: true,
      });
      setAvailable(res.data);
    } catch (err) {
      console.error("❌ Error fetching available donations", err);
    }
    setLoading(false);
  };

  const fetchAccepted = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/receiver/accepted`, {
        withCredentials: true,
      });
      setAccepted(res.data);
    } catch (err) {
      console.error("❌ Error fetching accepted donations", err);
    }
  };

  const acceptDonation = async (id) => {
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/receiver/accept/${id}`, {}, {
        withCredentials: true,
      });
      setMessage("✅ Donation accepted");
      fetchAvailable();
      fetchAccepted();
    } catch (err) {
      console.error(err);
      setMessage("❌ Failed to accept donation");
    }
  };

  const completeDonation = async (id) => {
    try {
      await axios.patch(`${import.meta.env.VITE_API_URL}/api/receiver/complete/${id}`, {}, {
        withCredentials: true,
      });
      setMessage("✅ Marked as completed");
      fetchAccepted();
    } catch (err) {
      console.error(err);
      setMessage("❌ Failed to mark as completed");
    }
  };

  const StatusBadge = ({ status }) => {
    const colors = {
      pending: "bg-yellow-100 text-yellow-800",
      accepted: "bg-blue-100 text-blue-800",
      completed: "bg-green-100 text-green-800",
    };
    return (
      <span className={`text-xs font-semibold px-2 py-1 rounded-full ${colors[status] || "bg-gray-100 text-gray-800"}`}>
        {status.toUpperCase()}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-green-100 to-blue-50 p-6">
      <div className="max-w-6xl mx-auto space-y-12">
        <h1 className="text-3xl font-extrabold text-center text-blue-800">📦 Receiver Dashboard</h1>

        {message && (
          <div className="text-center bg-blue-100 text-blue-800 font-medium py-2 rounded shadow-md">
            {message}
          </div>
        )}

        {/* Available Donations */}
        <section>
          <h2 className="text-xl font-semibold text-gray-700 mb-4">🆕 Available Donations</h2>
          {loading ? (
            <div className="text-center text-gray-500">⏳ Loading...</div>
          ) : available.length === 0 ? (
            <div className="text-center text-gray-500">No donations available right now.</div>
          ) : (
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5">
              {available.map((d) => (
                <div key={d._id} className="bg-white p-4 rounded-xl shadow border hover:shadow-lg transition">
                  <h3 className="text-lg font-semibold text-green-700 mb-1">{d.foodType}</h3>
                  <p><strong>Quantity:</strong> {d.quantity}</p>
                  <p><strong>Pickup Address:</strong> {d.pickupAddress}</p>
                  <button
                    onClick={() => acceptDonation(d._id)}
                    className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded"
                  >
                    ✅ Accept Donation
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Accepted Donations */}
        <section>
          <h2 className="text-xl font-semibold text-gray-700 mb-4">📋 My Accepted Donations</h2>
          {accepted.length === 0 ? (
            <div className="text-center text-gray-500">No accepted donations yet.</div>
          ) : (
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5">
              {accepted.map((d) => (
                <div key={d._id} className="bg-white p-4 rounded-xl shadow border hover:shadow-lg transition">
                  <h3 className="text-lg font-semibold text-blue-700 mb-1">{d.foodType}</h3>
                  <p><strong>Quantity:</strong> {d.quantity}</p>
                  <p><strong>Pickup Address:</strong> {d.pickupAddress}</p>
                  <div className="mt-2"><StatusBadge status={d.status} /></div>
                  {d.status === "accepted" && (
                    <button
                      onClick={() => completeDonation(d._id)}
                      className="mt-4 w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded"
                    >
                      ✅ Mark as Completed
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default ReceiverDashboard;
