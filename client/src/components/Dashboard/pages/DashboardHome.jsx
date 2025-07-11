import StatsCard from "../components/StatsCard";
import RecentActivity from "../components/RecentActivity";
import QuickActions from "../components/QuickActions";
const DashboardHome = () => (
  <div className="p-6">
    <h2 className="text-2xl font-bold text-green-700 mb-4">📊 Admin Dashboard Overview</h2>
    <StatsCard />
    <QuickActions />
    <RecentActivity />
  </div>
);

export default DashboardHome;
