import { useEffect, useState } from 'react';
import axios from 'axios';

const Pickups = () => {
  const [pickups, setPickups] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/dashboard/pickups', { withCredentials: true })
      .then(res => setPickups(res.data));
  }, []);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4 text-green-700">Pickups</h2>
      <ul>
        {pickups.map(p => (
          <li key={p._id} className="bg-white p-4 rounded shadow mb-2">
            NGO: {p.ngo?.email} | Status: {p.status} | Date: {new Date(p.scheduledDate).toDateString()}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Pickups;
