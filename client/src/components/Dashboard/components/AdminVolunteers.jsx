import { useEffect, useState } from "react";
import axios from "axios";

const AdminVolunteer = () => {
  const [volunteers, setVolunteers] = useState([]);
  const [search, setSearch] = useState("");

  const fetchVolunteers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/admin/volunteers", {
        withCredentials: true,
      });
      setVolunteers(res.data);
    } catch (err) {
      console.error("Error fetching volunteers", err);
    }
  };

  useEffect(() => {
    fetchVolunteers();
  }, []);

  const filteredVolunteers = volunteers.filter((v) =>
    v.name.toLowerCase().includes(search.toLowerCase()) ||
    v.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold text-green-700 mb-6 flex items-center gap-2">
        🙋‍♂️ Volunteer Management
      </h2>

      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="🔍 Search volunteers by name or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="p-3 border border-gray-300 rounded-md w-full max-w-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400"
        />
        <span className="ml-4 text-gray-600 text-sm">
          Total: {filteredVolunteers.length}
        </span>
      </div>

      <div className="overflow-x-auto rounded-lg shadow-md">
        <table className="min-w-full bg-white rounded-lg">
          <thead className="bg-green-600 text-white">
            <tr>
              <th className="py-3 px-4 text-left">#</th>
              <th className="py-3 px-4 text-left">Name</th>
              <th className="py-3 px-4 text-left">Email</th>
              <th className="py-3 px-4 text-left">Mobile</th>
              <th className="py-3 px-4 text-left">Image</th>
            </tr>
          </thead>
          <tbody>
            {filteredVolunteers.map((vol, i) => (
              <tr key={vol._id} className="border-t hover:bg-gray-50">
                <td className="py-3 px-4">{i + 1}</td>
                <td className="py-3 px-4">{vol.name}</td>
                <td className="py-3 px-4">{vol.email}</td>
                <td className="py-3 px-4">{vol.mobile || "N/A"}</td>
                <td className="py-3 px-4">
                  {vol.image ? (
                    <img
                      src={vol.image}
                      alt="Volunteer"
                      className="w-10 h-10 rounded-full object-cover border"
                    />
                  ) : (
                    <span className="text-gray-400 italic">No Image</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminVolunteer;
