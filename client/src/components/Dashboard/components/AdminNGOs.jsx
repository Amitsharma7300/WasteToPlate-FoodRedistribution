import { useEffect, useState } from "react";
import axios from "axios";

const AdminNGOs = () => {
  const [ngos, setNgos] = useState([]);
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const ngosPerPage = 5;

  const fetchNGOs = async () => {
    try {
      const res = await axios.get( `${import.meta.env.VITE_API_URL}/api/admin/ngos`, {
        withCredentials: true,
      });
      setNgos(res.data);
    } catch (err) {
      console.error("Error fetching NGOs", err);
    }
  };

  useEffect(() => {
    fetchNGOs();
  }, []);

  const filteredNgos = ngos.filter((ngo) =>
    (ngo.name?.toLowerCase().includes(search.toLowerCase()) ||
     ngo.email?.toLowerCase().includes(search.toLowerCase())) &&
    (location === "" || ngo.address?.toLowerCase().includes(location.toLowerCase()))
  );

  const indexOfLastNgo = currentPage * ngosPerPage;
  const indexOfFirstNgo = indexOfLastNgo - ngosPerPage;
  const currentNgos = filteredNgos.slice(indexOfFirstNgo, indexOfLastNgo);

  const totalPages = Math.ceil(filteredNgos.length / ngosPerPage);

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold text-green-700 mb-4">🏢 Registered NGOs</h2>

      <div className="flex flex-col md:flex-row gap-4 mb-4">
        <input
          type="text"
          placeholder="Search by name or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="p-2 border border-gray-300 rounded w-full md:w-1/3"
        />
        <input
          type="text"
          placeholder="Filter by location..."
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="p-2 border border-gray-300 rounded w-full md:w-1/3"
        />
      </div>

      <div className="mb-2 text-sm text-gray-600">
        Total NGOs: {filteredNgos.length}
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-lg rounded-lg overflow-hidden">
          <thead className="bg-green-600 text-white">
            <tr>
              <th className="py-2 px-4">#</th>
              <th className="py-2 px-4">Image</th>
              <th className="py-2 px-4">Name</th>
              <th className="py-2 px-4">Email</th>
              <th className="py-2 px-4">Location</th>
              <th className="py-2 px-4">Contact</th>
            </tr>
          </thead>
          <tbody>
            {currentNgos.length > 0 ? (
              currentNgos.map((ngo, index) => (
                <tr key={ngo._id} className="border-b hover:bg-gray-100 transition">
                  <td className="py-2 px-4">{indexOfFirstNgo + index + 1}</td>
                  <td className="py-2 px-4">
                    {ngo.image ? (
                      <img
                        src={ngo.image}
                        alt="NGO"
                        className="w-10 h-10 rounded-full object-cover"
                      />
                    ) : (
                      <span className="text-gray-400 italic">No Image</span>
                    )}
                  </td>
                  <td className="py-2 px-4 font-semibold">{ngo.name}</td>
                  <td className="py-2 px-4 text-blue-600">{ngo.email}</td>
                  <td className="py-2 px-4">{ngo.address || "N/A"}</td>
                  <td className="py-2 px-4">{ngo.mobile || "N/A"}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="py-4 px-4 text-center text-gray-500">
                  No NGOs found matching your criteria.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-4 space-x-2">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              className={`px-3 py-1 border rounded ${
                currentPage === i + 1
                  ? "bg-green-600 text-white"
                  : "bg-white text-green-700 border-green-400"
              } hover:bg-green-100`}
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminNGOs;
