import { useEffect, useState } from 'react';
import axios from 'axios';

const Donations = () => {
  const [donations, setDonations] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/dashboard/donations', { withCredentials: true })
      .then(res => setDonations(res.data));
  }, []);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4 text-green-700">Donations</h2>
      <ul>
        {donations.map(d => (
          <li key={d._id} className="bg-white p-4 rounded shadow mb-2">
            {d.foodItem} — {d.quantity}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Donations;
