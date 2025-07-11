import { useNavigate } from "react-router-dom";

const QuickActions = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-lg shadow p-4 mt-6 flex flex-wrap gap-4">
      
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        onClick={() => navigate("/dashboard/add-volunteer")}
      >
        Add Volunteer
      </button>
      <button
        className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
        onClick={() => navigate("/admin/donations")}
      >
        View Donations
      </button>
    </div>
  );
};

export default QuickActions;