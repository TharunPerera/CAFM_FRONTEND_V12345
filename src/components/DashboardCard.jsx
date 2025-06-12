const DashboardCard = ({ title, count }) => (
  <div className="bg-white p-4 rounded-lg shadow-md">
    <h3 className="text-lg font-semibold">{title}</h3>
    <p className="text-2xl">{count}</p>
  </div>
);

export default DashboardCard;
