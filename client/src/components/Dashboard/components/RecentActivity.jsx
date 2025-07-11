import { useEffect, useState } from "react";
import axios from "axios";

const RecentActivity = () => {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    const fetchActivity = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/admin/recent-activity", {
          withCredentials: true,
        });
        setActivities(res.data);
      } catch (err) {
        setActivities([]);
      }
    };
    fetchActivity();
  }, []);

  return (
    <div className="bg-white rounded-lg shadow p-4 mt-6">
      <h3 className="text-lg font-semibold mb-2 text-blue-700">Recent Activity</h3>
      {activities.length === 0 ? (
        <div className="text-gray-500">No recent activity.</div>
      ) : (
        <ul className="space-y-2">
          {activities.map((act, idx) => (
            <li key={idx} className="text-gray-700">
              <span className="font-bold">{act.type}:</span> {act.message}
              <span className="text-xs text-gray-400 ml-2">{new Date(act.date).toLocaleString()}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default RecentActivity;