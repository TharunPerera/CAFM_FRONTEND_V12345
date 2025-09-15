// // import DashboardCard from "../components/DashboardCard";

// // const Dashboard = () => (
// //   <div className="p-6">
// //     <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
// //     <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
// //       <DashboardCard title="Asset Card" count={10} />
// //       <DashboardCard title="Spare Parts" count={25} />
// //       <DashboardCard title="Work Requests" count={15} />
// //       <DashboardCard title="Work Orders" count={8} />
// //       <DashboardCard title="Job Cards" count={12} />
// //       <DashboardCard title="Buildings" count={5} />
// //       <DashboardCard title="People" count={50} />
// //       <DashboardCard title="Contracts" count={20} />
// //       <DashboardCard title="Companies" count={30} />
// //       <DashboardCard title="SLAs" count={10} />
// //     </div>
// //   </div>
// // );

// // export default Dashboard;

// import React, { useState, useEffect, useCallback } from "react";
// import { Bar, Pie } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   ArcElement,
//   BarElement,
//   CategoryScale,
//   LinearScale,
//   Title,
//   Tooltip,
//   Legend,
// } from "chart.js";
// import Select from "react-select";
// import { Loader2, AlertCircle } from "lucide-react";
// import toast from "react-hot-toast";
// import { contractService } from "../services/contractService";
// import {
//   connectWebSocket,
//   subscribeToDashboard,
//   disconnectWebSocket,
// } from "../services/WebSocketService";
// import { useAuth } from "../context/AuthContext";
// import api from "../services/api";

// ChartJS.register(
//   ArcElement,
//   BarElement,
//   CategoryScale,
//   LinearScale,
//   Title,
//   Tooltip,
//   Legend
// );

// const Dashboard = () => {
//   const { user } = useAuth();
//   const [contracts, setContracts] = useState([]);
//   const [selectedContract, setSelectedContract] = useState(null);
//   const [dashboardData, setDashboardData] = useState({
//     contractId: null,
//     workOrderCounts: { CM: 0, RM: 0, PM: 0 },
//     workRequestCounts: { CM: 0, RM: 0, PM: 0 },
//     assetCategoryCounts: {},
//   });
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   // Fetch contracts for the selector
//   const fetchContracts = useCallback(async () => {
//     try {
//       const response = await contractService.getAllContracts();
//       const contractOptions = response.data.map((contract) => ({
//         value: contract.contractId,
//         label: contract.contractName,
//       }));
//       setContracts(contractOptions);
//       if (contractOptions.length > 0) {
//         setSelectedContract(contractOptions[0]);
//       }
//     } catch (err) {
//       toast.error("Failed to fetch contracts");
//       console.error(err);
//     }
//   }, []);

//   // Fetch dashboard data for selected contract
//   const fetchDashboardData = useCallback(async (contractId) => {
//     setLoading(true);
//     setError(null);
//     try {
//       const response = await api.get(`/dashboard/${contractId}`);
//       setDashboardData(response.data);
//     } catch (err) {
//       setError("Failed to fetch dashboard data");
//       toast.error("Failed to fetch dashboard data");
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   // WebSocket setup
//   useEffect(() => {
//     const stompClient = connectWebSocket();
//     return () => disconnectWebSocket();
//   }, []);

//   useEffect(() => {
//     if (selectedContract) {
//       fetchDashboardData(selectedContract.value);
//       subscribeToDashboard(selectedContract.value, (data) => {
//         setDashboardData(data);
//         toast.success("Dashboard updated in real-time");
//       });
//     }
//   }, [selectedContract, fetchDashboardData]);

//   useEffect(() => {
//     fetchContracts();
//   }, [fetchContracts]);

//   // Chart data for work orders and work requests
//   const workOrderChartData = {
//     labels: ["Corrective (CM)", "Reactive (RM)", "Preventive (PM)"],
//     datasets: [
//       {
//         label: "Work Orders",
//         data: [
//           dashboardData.workOrderCounts.CM || 0,
//           dashboardData.workOrderCounts.RM || 0,
//           dashboardData.workOrderCounts.PM || 0,
//         ],
//         backgroundColor: ["#3B82F6", "#EF4444", "#10B981"],
//         borderColor: ["#2563EB", "#DC2626", "#059669"],
//         borderWidth: 1,
//       },
//     ],
//   };

//   const workRequestChartData = {
//     labels: ["Corrective (CM)", "Reactive (RM)", "Preventive (PM)"],
//     datasets: [
//       {
//         label: "Work Requests",
//         data: [
//           dashboardData.workRequestCounts.CM || 0,
//           dashboardData.workRequestCounts.RM || 0,
//           dashboardData.workRequestCounts.PM || 0,
//         ],
//         backgroundColor: ["#3B82F6", "#EF4444", "#10B981"],
//         borderColor: ["#2563EB", "#DC2626", "#059669"],
//         borderWidth: 1,
//       },
//     ],
//   };

//   const assetCategoryChartData = {
//     labels: Object.keys(dashboardData.assetCategoryCounts),
//     datasets: [
//       {
//         data: Object.values(dashboardData.assetCategoryCounts),
//         backgroundColor: [
//           "#3B82F6",
//           "#EF4444",
//           "#10B981",
//           "#F59E0B",
//           "#8B5CF6",
//           "#EC4899",
//         ],
//       },
//     ],
//   };

//   const chartOptions = {
//     responsive: true,
//     plugins: {
//       legend: { position: "top" },
//       title: { display: true, text: "" },
//     },
//   };

//   return (
//     <div className="p-6 bg-gray-100 min-h-screen">
//       <h2 className="text-2xl font-bold mb-6 text-gray-800">Dashboard</h2>

//       {/* Contract Selector */}
//       <div className="mb-6 max-w-md">
//         <label className="block text-sm font-medium text-gray-700 mb-2">
//           Select Contract
//         </label>
//         <Select
//           options={contracts}
//           value={selectedContract}
//           onChange={setSelectedContract}
//           placeholder="Select a contract..."
//           className="text-sm"
//         />
//       </div>

//       {loading && (
//         <div className="flex justify-center items-center">
//           <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
//         </div>
//       )}

//       {error && (
//         <div className="flex items-center bg-red-100 text-red-700 p-4 rounded-lg mb-6">
//           <AlertCircle className="h-5 w-5 mr-2" />
//           <span>{error}</span>
//         </div>
//       )}

//       {!loading && !error && selectedContract && (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {/* Work Orders Chart */}
//           <div className="bg-white p-6 rounded-lg shadow-md">
//             <h3 className="text-lg font-semibold mb-4">Work Orders by Type</h3>
//             <Bar
//               data={workOrderChartData}
//               options={{
//                 ...chartOptions,
//                 plugins: {
//                   ...chartOptions.plugins,
//                   title: { display: true, text: "Work Orders" },
//                 },
//               }}
//             />
//           </div>

//           {/* Work Requests Chart */}
//           <div className="bg-white p-6 rounded-lg shadow-md">
//             <h3 className="text-lg font-semibold mb-4">
//               Work Requests by Type
//             </h3>
//             <Bar
//               data={workRequestChartData}
//               options={{
//                 ...chartOptions,
//                 plugins: {
//                   ...chartOptions.plugins,
//                   title: { display: true, text: "Work Requests" },
//                 },
//               }}
//             />
//           </div>

//           {/* Asset Categories Chart */}
//           <div className="bg-white p-6 rounded-lg shadow-md">
//             <h3 className="text-lg font-semibold mb-4">Asset Categories</h3>
//             <Pie
//               data={assetCategoryChartData}
//               options={{
//                 ...chartOptions,
//                 plugins: {
//                   ...chartOptions.plugins,
//                   title: { display: true, text: "Asset Categories" },
//                 },
//               }}
//             />
//           </div>

//           {/* Summary Cards */}
//           <div className="bg-white p-6 rounded-lg shadow-md">
//             <h3 className="text-lg font-semibold mb-4">Summary</h3>
//             <div className="grid grid-cols-2 gap-4">
//               <div className="bg-blue-100 p-4 rounded-lg">
//                 <p className="text-sm text-blue-700">Total Work Orders</p>
//                 <p className="text-xl font-bold text-blue-900">
//                   {Object.values(dashboardData.workOrderCounts).reduce(
//                     (sum, count) => sum + count,
//                     0
//                   )}
//                 </p>
//               </div>
//               <div className="bg-green-100 p-4 rounded-lg">
//                 <p className="text-sm text-green-700">Total Work Requests</p>
//                 <p className="text-xl font-bold text-green-900">
//                   {Object.values(dashboardData.workRequestCounts).reduce(
//                     (sum, count) => sum + count,
//                     0
//                   )}
//                 </p>
//               </div>
//               <div className="bg-purple-100 p-4 rounded-lg">
//                 <p className="text-sm text-purple-700">Total Assets</p>
//                 <p className="text-xl font-bold text-purple-900">
//                   {Object.values(dashboardData.assetCategoryCounts).reduce(
//                     (sum, count) => sum + count,
//                     0
//                   )}
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// // export default Dashboard;

// import React, { useState, useEffect, useCallback } from "react";
// import { Bar, Pie } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   ArcElement,
//   BarElement,
//   CategoryScale,
//   LinearScale,
//   Title,
//   Tooltip,
//   Legend,
// } from "chart.js";
// import Select from "react-select";
// import { Loader2, AlertCircle } from "lucide-react";
// import toast from "react-hot-toast";
// import { contractService } from "../services/contractService";
// import {
//   connectWebSocket,
//   subscribeToDashboard,
//   disconnectWebSocket,
// } from "../services/WebSocketService";
// import { useAuth } from "../context/AuthContext";
// import api from "../services/api";

// ChartJS.register(
//   ArcElement,
//   BarElement,
//   CategoryScale,
//   LinearScale,
//   Title,
//   Tooltip,
//   Legend
// );

// const Dashboard = () => {
//   const { user } = useAuth();
//   const [contracts, setContracts] = useState([]);
//   const [selectedContract, setSelectedContract] = useState(null);
//   const [dashboardData, setDashboardData] = useState({
//     contractId: null,
//     workOrderCounts: { CM: 0, RM: 0, PM: 0 },
//     workRequestCounts: { CM: 0, RM: 0, PM: 0 },
//     assetCategoryCounts: {},
//   });
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [wsError, setWsError] = useState(null);

//   // Fetch contracts for the selector
//   const fetchContracts = useCallback(async () => {
//     try {
//       const response = await contractService.getAllContracts();
//       const contractOptions = response.data.map((contract) => ({
//         value: contract.contractId,
//         label: contract.contractName,
//       }));
//       setContracts(contractOptions);
//       if (contractOptions.length > 0) {
//         setSelectedContract(contractOptions[0]);
//       }
//     } catch (err) {
//       toast.error("Failed to fetch contracts");
//       console.error(err);
//     }
//   }, []);

//   // Fetch dashboard data for selected contract
//   const fetchDashboardData = useCallback(async (contractId) => {
//     setLoading(true);
//     setError(null);
//     try {
//       const response = await api.get(`/dashboard/${contractId}`);
//       setDashboardData(response.data);
//     } catch (err) {
//       setError("Failed to fetch dashboard data");
//       toast.error("Failed to fetch dashboard data");
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   // WebSocket setup
//   useEffect(() => {
//     const stompClient = connectWebSocket();
//     return () => disconnectWebSocket();
//   }, []);

//   useEffect(() => {
//     if (selectedContract) {
//       fetchDashboardData(selectedContract.value);
//       subscribeToDashboard(
//         selectedContract.value,
//         (data) => {
//           setDashboardData(data);
//           toast.success("Dashboard updated in real-time");
//           setWsError(null); // Clear WebSocket error on successful update
//         },
//         () => {
//           setWsError(
//             "Failed to connect to real-time updates. Using static data."
//           );
//           toast.error(
//             "Real-time updates unavailable. Check server connection."
//           );
//         }
//       );
//     }
//   }, [selectedContract, fetchDashboardData]);

//   useEffect(() => {
//     fetchContracts();
//   }, [fetchContracts]);

//   // Chart data for work orders and work requests
//   const workOrderChartData = {
//     labels: ["Corrective (CM)", "Reactive (RM)", "Preventive (PM)"],
//     datasets: [
//       {
//         label: "Work Orders",
//         data: [
//           dashboardData.workOrderCounts.CM || 0,
//           dashboardData.workOrderCounts.RM || 0,
//           dashboardData.workOrderCounts.PM || 0,
//         ],
//         backgroundColor: ["#3B82F6", "#EF4444", "#10B981"],
//         borderColor: ["#2563EB", "#DC2626", "#059669"],
//         borderWidth: 1,
//       },
//     ],
//   };

//   const workRequestChartData = {
//     labels: ["Corrective (CM)", "Reactive (RM)", "Preventive (PM)"],
//     datasets: [
//       {
//         label: "Work Requests",
//         data: [
//           dashboardData.workRequestCounts.CM || 0,
//           dashboardData.workRequestCounts.RM || 0,
//           dashboardData.workRequestCounts.PM || 0,
//         ],
//         backgroundColor: ["#3B82F6", "#EF4444", "#10B981"],
//         borderColor: ["#2563EB", "#DC2626", "#059669"],
//         borderWidth: 1,
//       },
//     ],
//   };

//   const assetCategoryChartData = {
//     labels: Object.keys(dashboardData.assetCategoryCounts),
//     datasets: [
//       {
//         data: Object.values(dashboardData.assetCategoryCounts),
//         backgroundColor: [
//           "#3B82F6",
//           "#EF4444",
//           "#10B981",
//           "#F59E0B",
//           "#8B5CF6",
//           "#EC4899",
//         ],
//       },
//     ],
//   };

//   const chartOptions = {
//     responsive: true,
//     plugins: {
//       legend: { position: "top" },
//       title: { display: true, text: "" },
//     },
//   };

//   return (
//     <div className="p-6 bg-gray-100 min-h-screen">
//       <h2 className="text-2xl font-bold mb-6 text-gray-800">Dashboard</h2>

//       {/* Contract Selector */}
//       <div className="mb-6 max-w-md">
//         <label className="block text-sm font-medium text-gray-700 mb-2">
//           Select Contract
//         </label>
//         <Select
//           options={contracts}
//           value={selectedContract}
//           onChange={setSelectedContract}
//           placeholder="Select a contract..."
//           className="text-sm"
//         />
//       </div>

//       {loading && (
//         <div className="flex justify-center items-center">
//           <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
//         </div>
//       )}

//       {error && (
//         <div className="flex items-center bg-red-100 text-red-700 p-4 rounded-lg mb-6">
//           <AlertCircle className="h-5 w-5 mr-2" />
//           <span>{error}</span>
//         </div>
//       )}

//       {wsError && (
//         <div className="flex items-center bg-yellow-100 text-yellow-700 p-4 rounded-lg mb-6">
//           <AlertCircle className="h-5 w-5 mr-2" />
//           <span>{wsError}</span>
//         </div>
//       )}

//       {!loading && !error && selectedContract && (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {/* Work Orders Chart */}
//           <div className="bg-white p-6 rounded-lg shadow-md">
//             <h3 className="text-lg font-semibold mb-4">Work Orders by Type</h3>
//             <Bar
//               data={workOrderChartData}
//               options={{
//                 ...chartOptions,
//                 plugins: {
//                   ...chartOptions.plugins,
//                   title: { display: true, text: "Work Orders" },
//                 },
//               }}
//             />
//           </div>

//           {/* Work Requests Chart */}
//           <div className="bg-white p-6 rounded-lg shadow-md">
//             <h3 className="text-lg font-semibold mb-4">
//               Work Requests by Type
//             </h3>
//             <Bar
//               data={workRequestChartData}
//               options={{
//                 ...chartOptions,
//                 plugins: {
//                   ...chartOptions.plugins,
//                   title: { display: true, text: "Work Requests" },
//                 },
//               }}
//             />
//           </div>

//           {/* Asset Categories Chart */}
//           <div className="bg-white p-6 rounded-lg shadow-md">
//             <h3 className="text-lg font-semibold mb-4">Asset Categories</h3>
//             <Pie
//               data={assetCategoryChartData}
//               options={{
//                 ...chartOptions,
//                 plugins: {
//                   ...chartOptions.plugins,
//                   title: { display: true, text: "Asset Categories" },
//                 },
//               }}
//             />
//           </div>

//           {/* Summary Cards */}
//           <div className="bg-white p-6 rounded-lg shadow-md">
//             <h3 className="text-lg font-semibold mb-4">Summary</h3>
//             <div className="grid grid-cols-2 gap-4">
//               <div className="bg-blue-100 p-4 rounded-lg">
//                 <p className="text-sm text-blue-700">Total Work Orders</p>
//                 <p className="text-xl font-bold text-blue-900">
//                   {Object.values(dashboardData.workOrderCounts).reduce(
//                     (sum, count) => sum + count,
//                     0
//                   )}
//                 </p>
//               </div>
//               <div className="bg-green-100 p-4 rounded-lg">
//                 <p className="text-sm text-green-700">Total Work Requests</p>
//                 <p className="text-xl font-bold text-green-900">
//                   {Object.values(dashboardData.workRequestCounts).reduce(
//                     (sum, count) => sum + count,
//                     0
//                   )}
//                 </p>
//               </div>
//               <div className="bg-purple-100 p-4 rounded-lg">
//                 <p className="text-sm text-purple-700">Total Assets</p>
//                 <p className="text-xl font-bold text-purple-900">
//                   {Object.values(dashboardData.assetCategoryCounts).reduce(
//                     (sum, count) => sum + count,
//                     0
//                   )}
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Dashboard;

import React, { useState, useEffect, useCallback } from "react";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import Select from "react-select";
import { Loader2, AlertCircle } from "lucide-react";
import toast from "react-hot-toast";
import { contractService } from "../services/contractService";
import {
  connectWebSocket,
  subscribeToDashboard,
  disconnectWebSocket,
} from "../services/WebSocketService";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";

ChartJS.register(
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const { user } = useAuth();
  const [contracts, setContracts] = useState([]);
  const [selectedContract, setSelectedContract] = useState(null);
  const [dashboardData, setDashboardData] = useState({
    contractId: null,
    workOrderCounts: { CM: 0, RM: 0, PM: 0 },
    workRequestCounts: { CM: 0, RM: 0, PM: 0 },
    assetCategoryCounts: {},
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [wsError, setWsError] = useState(null);
  const [stompClient, setStompClient] = useState(null);

  // Fetch contracts for the selector
  const fetchContracts = useCallback(async () => {
    try {
      const response = await contractService.getAllContracts();
      const contractOptions = response.data.map((contract) => ({
        value: contract.contractId,
        label: contract.contractName,
      }));
      setContracts(contractOptions);
      if (contractOptions.length > 0) {
        setSelectedContract(contractOptions[0]);
      }
    } catch (err) {
      toast.error("Failed to fetch contracts");
      console.error(err);
    }
  }, []);

  // Fetch dashboard data for selected contract
  const fetchDashboardData = useCallback(async (contractId) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get(`/dashboard/${contractId}`);
      setDashboardData(response.data);
    } catch (err) {
      setError("Failed to fetch dashboard data");
      toast.error("Failed to fetch dashboard data");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  // WebSocket setup
  useEffect(() => {
    const client = connectWebSocket(
      (connectedClient) => {
        setStompClient(connectedClient);
        setWsError(null);
      },
      (error) => {
        setWsError(
          "Failed to connect to real-time updates. Using static data."
        );
        toast.error("Real-time updates unavailable: " + error);
      }
    );

    return () => disconnectWebSocket();
  }, []);

  // Subscribe to WebSocket when selectedContract and stompClient are ready
  useEffect(() => {
    if (selectedContract && stompClient && stompClient.connected) {
      const subscription = subscribeToDashboard(
        selectedContract.value,
        (data) => {
          setDashboardData(data);
          toast.success("Dashboard updated in real-time");
          setWsError(null);
        },
        (error) => {
          setWsError(
            "Failed to connect to real-time updates. Using static data."
          );
          toast.error(error);
        }
      );
      return () => {
        if (subscription) {
          subscription.unsubscribe();
        }
      };
    } else if (selectedContract && stompClient && !stompClient.connected) {
      setWsError("Waiting for WebSocket connection...");
    }
  }, [selectedContract, stompClient]);

  useEffect(() => {
    fetchContracts();
  }, [fetchContracts]);

  useEffect(() => {
    if (selectedContract) {
      fetchDashboardData(selectedContract.value);
    }
  }, [selectedContract, fetchDashboardData]);

  // Chart data for work orders and work requests
  const workOrderChartData = {
    labels: ["Corrective (CM)", "Reactive (RM)", "Preventive (PM)"],
    datasets: [
      {
        label: "Work Orders",
        data: [
          dashboardData.workOrderCounts.CM || 0,
          dashboardData.workOrderCounts.RM || 0,
          dashboardData.workOrderCounts.PM || 0,
        ],
        backgroundColor: ["#3B82F6", "#EF4444", "#10B981"],
        borderColor: ["#2563EB", "#DC2626", "#059669"],
        borderWidth: 1,
      },
    ],
  };

  const workRequestChartData = {
    labels: ["Corrective (CM)", "Reactive (RM)", "Preventive (PM)"],
    datasets: [
      {
        label: "Work Requests",
        data: [
          dashboardData.workRequestCounts.CM || 0,
          dashboardData.workRequestCounts.RM || 0,
          dashboardData.workRequestCounts.PM || 0,
        ],
        backgroundColor: ["#3B82F6", "#EF4444", "#10B981"],
        borderColor: ["#2563EB", "#DC2626", "#059669"],
        borderWidth: 1,
      },
    ],
  };

  const assetCategoryChartData = {
    labels: Object.keys(dashboardData.assetCategoryCounts),
    datasets: [
      {
        data: Object.values(dashboardData.assetCategoryCounts),
        backgroundColor: [
          "#3B82F6",
          "#EF4444",
          "#10B981",
          "#F59E0B",
          "#8B5CF6",
          "#EC4899",
        ],
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "" },
    },
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Dashboard</h2>

      {/* Contract Selector */}
      <div className="mb-6 max-w-md">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Select Contract
        </label>
        <Select
          options={contracts}
          value={selectedContract}
          onChange={setSelectedContract}
          placeholder="Select a contract..."
          className="text-sm"
        />
      </div>

      {loading && (
        <div className="flex justify-center items-center">
          <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
        </div>
      )}

      {error && (
        <div className="flex items-center bg-red-100 text-red-700 p-4 rounded-lg mb-6">
          <AlertCircle className="h-5 w-5 mr-2" />
          <span>{error}</span>
        </div>
      )}

      {wsError && (
        <div className="flex items-center bg-yellow-100 text-yellow-700 p-4 rounded-lg mb-6">
          <AlertCircle className="h-5 w-5 mr-2" />
          <span>{wsError}</span>
        </div>
      )}

      {!loading && !error && selectedContract && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Work Orders Chart */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-4">Work Orders by Type</h3>
            <Bar
              data={workOrderChartData}
              options={{
                ...chartOptions,
                plugins: {
                  ...chartOptions.plugins,
                  title: { display: true, text: "Work Orders" },
                },
              }}
            />
          </div>

          {/* Work Requests Chart */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-4">
              Work Requests by Type
            </h3>
            <Bar
              data={workRequestChartData}
              options={{
                ...chartOptions,
                plugins: {
                  ...chartOptions.plugins,
                  title: { display: true, text: "Work Requests" },
                },
              }}
            />
          </div>

          {/* Asset Categories Chart */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-4">Asset Categories</h3>
            <Pie
              data={assetCategoryChartData}
              options={{
                ...chartOptions,
                plugins: {
                  ...chartOptions.plugins,
                  title: { display: true, text: "Asset Categories" },
                },
              }}
            />
          </div>

          {/* Summary Cards */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-4">Summary</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-blue-100 p-4 rounded-lg">
                <p className="text-sm text-blue-700">Total Work Orders</p>
                <p className="text-xl font-bold text-blue-900">
                  {Object.values(dashboardData.workOrderCounts).reduce(
                    (sum, count) => sum + count,
                    0
                  )}
                </p>
              </div>
              <div className="bg-green-100 p-4 rounded-lg">
                <p className="text-sm text-green-700">Total Work Requests</p>
                <p className="text-xl font-bold text-green-900">
                  {Object.values(dashboardData.workRequestCounts).reduce(
                    (sum, count) => sum + count,
                    0
                  )}
                </p>
              </div>
              <div className="bg-purple-100 p-4 rounded-lg">
                <p className="text-sm text-purple-700">Total Assets</p>
                <p className="text-xl font-bold text-purple-900">
                  {Object.values(dashboardData.assetCategoryCounts).reduce(
                    (sum, count) => sum + count,
                    0
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
