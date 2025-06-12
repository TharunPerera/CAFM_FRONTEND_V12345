import DashboardCard from "../components/DashboardCard";

const Dashboard = () => (
  <div className="p-6">
    <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <DashboardCard title="Asset Card" count={10} />
      <DashboardCard title="Spare Parts" count={25} />
      <DashboardCard title="Work Requests" count={15} />
      <DashboardCard title="Work Orders" count={8} />
      <DashboardCard title="Job Cards" count={12} />
      <DashboardCard title="Buildings" count={5} />
      <DashboardCard title="People" count={50} />
      <DashboardCard title="Contracts" count={20} />
      <DashboardCard title="Companies" count={30} />
      <DashboardCard title="SLAs" count={10} />
    </div>
  </div>
);

export default Dashboard;
