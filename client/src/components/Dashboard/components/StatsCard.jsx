import { useEffect, useState } from "react";
import axios from "axios";

const StatsCard = () => {
  const [stats, setStats] = useState({
    donors: 0,
    ngos: 0,
    volunteers: 0,
    donations: 0,
    pickups: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get(  `${import.meta.env.VITE_API_URL}/api/admin/stats`, {
          withCredentials: true,
        });
        setStats(res.data);
      } catch (err) {
        console.error("Failed to fetch stats", err);
      }
    };

    fetchStats();
  }, []);

  const cardData = [
    { label: "Donors", value: stats.donors, color: "bg-green-100", text: "text-green-700" },
    { label: "NGOs", value: stats.ngos, color: "bg-blue-100", text: "text-blue-700" },
    { label: "Volunteers", value: stats.volunteers, color: "bg-yellow-100", text: "text-yellow-700" },
    { label: "Donations", value: stats.donations, color: "bg-purple-100", text: "text-purple-700" },
    { label: "Pickups", value: stats.pickups, color: "bg-red-100", text: "text-red-700" },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {cardData.map((card, idx) => (
        <div
          key={idx}
          className={`rounded-lg p-5 shadow-md ${card.color} ${card.text} transition transform hover:scale-105`}
        >
          <div className="text-xl font-bold">{card.value}</div>
          <div className="text-sm">{card.label}</div>
        </div>
      ))}
    </div>
  );
};

export default StatsCard;
