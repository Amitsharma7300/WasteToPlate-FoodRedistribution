
import { Link } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';

const DashboardNavbar = () => {
  const { user } = useAuth();

  return (
    <nav className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
      <div className="flex items-center space-x-3">
        <Link to="/" className="text-2xl font-bold text-green-600 dark:text-green-400">
           Dashboard
        </Link>
        <span className="text-sm text-gray-500 dark:text-gray-400 hidden sm:inline">
          | Role: <strong>{user?.role?.toUpperCase()}</strong>
        </span>
      </div>

      <div className="flex items-center gap-4">
        <span className="text-gray-700 dark:text-gray-300 hidden sm:block">
          {user?.email}
        </span>

      </div>
    </nav>
  );
};

export default DashboardNavbar;
