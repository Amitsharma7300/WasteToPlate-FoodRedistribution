import { useContext } from 'react';
import { AuthContext } from '../../../context/AuthContext'; // Adjust the path as necessary 

const Profile = () => {
  const { user } = useContext(AuthContext);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4 text-green-700">Profile</h2>
      <p><strong>Email:</strong> {user?.email}</p>
      <p><strong>Role:</strong> {user?.role}</p>
    </div>
  );
};

export default Profile