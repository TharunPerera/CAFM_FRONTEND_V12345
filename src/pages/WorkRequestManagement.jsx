// "use client";

// import { useState } from "react";
// import { ArrowLeft, FileText, Wrench, Settings, Eye, Plus } from "lucide-react";
// import CorrectiveMaintenanceForm from "../components/WorkRequest/CorrectiveMaintenanceForm";
// import ReactiveMaintenanceForm from "../components/WorkRequest/ReactiveMaintenanceForm";
// import PreventiveMaintenanceForm from "../components/WorkRequest/PreventiveMaintenanceForm";
// import WorkRequestTable from "../components/WorkRequest/WorkRequestTable";

// const WorkRequestManagement = () => {
//   const [activeView, setActiveView] = useState("main");

//   const workRequestTypes = [
//     {
//       id: "cm",
//       title: "Corrective Maintenance Work Request",
//       description: "Create work requests for corrective maintenance tasks",
//       icon: Wrench,
//       gradient: "from-red-500 to-red-600",
//       bgGradient: "from-red-50 to-red-100",
//       component: CorrectiveMaintenanceForm,
//     },
//     {
//       id: "rm",
//       title: "Reactive Maintenance Work Request",
//       description: "Create work requests for reactive maintenance tasks",
//       icon: Settings,
//       gradient: "from-orange-500 to-orange-600",
//       bgGradient: "from-orange-50 to-orange-100",
//       component: ReactiveMaintenanceForm,
//     },
//     {
//       id: "pm",
//       title: "Preventive Plan Maintenance Work Request",
//       description:
//         "Create preventive maintenance schedules for multiple assets",
//       icon: FileText,
//       gradient: "from-green-500 to-green-600",
//       bgGradient: "from-green-50 to-green-100",
//       component: PreventiveMaintenanceForm,
//     },
//   ];

//   const renderActiveComponent = () => {
//     if (activeView === "main") {
//       return (
//         <div className="space-y-8">
//           {/* Header */}
//           <div className="text-center">
//             <h1 className="text-3xl font-bold text-gray-900 mb-3">
//               Work Request Management
//             </h1>
//             <p className="text-lg text-gray-600 max-w-2xl mx-auto">
//               Create and manage work requests for maintenance operations
//             </p>
//           </div>

//           {/* Work Request Type Cards */}
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
//             {workRequestTypes.map((type) => {
//               const IconComponent = type.icon;
//               return (
//                 <button
//                   key={type.id}
//                   onClick={() => setActiveView(type.id)}
//                   className="group block bg-white rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 text-left"
//                 >
//                   <div
//                     className={`bg-gradient-to-br ${type.bgGradient} p-6 rounded-t-xl`}
//                   >
//                     <div
//                       className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${type.gradient} shadow-md mb-4`}
//                     >
//                       <IconComponent className="w-6 h-6 text-white" />
//                     </div>
//                     <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-gray-700 transition-colors">
//                       {type.title}
//                     </h3>
//                     <p className="text-gray-600 leading-relaxed group-hover:text-gray-500 transition-colors">
//                       {type.description}
//                     </p>
//                   </div>
//                   <div className="p-6 bg-white rounded-b-xl">
//                     <div className="flex items-center justify-between">
//                       <span className="font-semibold text-gray-900 group-hover:text-gray-700 transition-colors">
//                         Create Request
//                       </span>
//                       <Plus className="w-5 h-5 text-gray-400 group-hover:text-gray-600 group-hover:translate-x-1 transition-all duration-300" />
//                     </div>
//                   </div>
//                 </button>
//               );
//             })}
//           </div>

//           {/* View Work Requests Button */}
//           <div className="text-center">
//             <button
//               onClick={() => setActiveView("table")}
//               className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
//             >
//               <Eye className="w-6 h-6 mr-3" />
//               View Work Requests
//             </button>
//           </div>
//         </div>
//       );
//     }

//     if (activeView === "table") {
//       return <WorkRequestTable onBack={() => setActiveView("main")} />;
//     }

//     const selectedType = workRequestTypes.find(
//       (type) => type.id === activeView
//     );
//     if (selectedType) {
//       const ComponentToRender = selectedType.component;
//       return <ComponentToRender onBack={() => setActiveView("main")} />;
//     }

//     return null;
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         {/* Back Button (only show when not on main view) */}
//         {activeView !== "main" && (
//           <div className="mb-6">
//             <button
//               onClick={() => setActiveView("main")}
//               className="inline-flex items-center px-4 py-2 bg-white rounded-lg shadow-md hover:shadow-lg transition-all border border-gray-200"
//             >
//               <ArrowLeft className="w-5 h-5 mr-2 text-gray-600" />
//               <span className="text-gray-700 font-medium">
//                 Back to Work Requests
//               </span>
//             </button>
//           </div>
//         )}

//         {/* Main Content */}
//         <div className="bg-white rounded-xl shadow-lg p-8">
//           {renderActiveComponent()}
//         </div>
//       </div>
//     </div>
//   );
// };

// // export default WorkRequestManagement;
// "use client";

// import { useState } from "react";
// import { ArrowLeft, FileText, Wrench, Settings, Eye, Plus } from "lucide-react";
// import CorrectiveMaintenanceForm from "../components/WorkRequest/CorrectiveMaintenanceForm";
// import ReactiveMaintenanceForm from "../components/WorkRequest/ReactiveMaintenanceForm";
// import PreventiveMaintenanceForm from "../components/WorkRequest/PreventiveMaintenanceForm";
// import WorkRequestTable from "../components/WorkRequest/WorkRequestTable";

// const WorkRequestManagement = () => {
//   const [activeView, setActiveView] = useState("main");

//   const workRequestTypes = [
//     {
//       id: "cm",
//       title: "Corrective Maintenance Work Request",
//       description: "Create work requests for corrective maintenance tasks",
//       icon: Wrench,
//       gradient: "from-red-500 to-red-600",
//       bgGradient: "from-red-50 to-red-100",
//       component: CorrectiveMaintenanceForm,
//     },
//     {
//       id: "rm",
//       title: "Reactive Maintenance Work Request",
//       description: "Create work requests for reactive maintenance tasks",
//       icon: Settings,
//       gradient: "from-orange-500 to-orange-600",
//       bgGradient: "from-orange-50 to-orange-100",
//       component: ReactiveMaintenanceForm,
//     },
//     {
//       id: "pm",
//       title: "Preventive Plan Maintenance Work Request",
//       description:
//         "Create preventive maintenance schedules for multiple assets",
//       icon: FileText,
//       gradient: "from-green-500 to-green-600",
//       bgGradient: "from-green-50 to-green-100",
//       component: PreventiveMaintenanceForm,
//     },
//   ];

//   const renderActiveComponent = () => {
//     if (activeView === "main") {
//       return (
//         <div className="space-y-8">
//           {/* Header */}
//           <div className="text-center">
//             <h1 className="text-3xl font-bold text-gray-900 mb-3">
//               Work Request Management
//             </h1>
//             <p className="text-lg text-gray-600 max-w-2xl mx-auto">
//               Create and manage work requests for maintenance operations
//             </p>
//           </div>

//           {/* Work Request Type Cards */}
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
//             {workRequestTypes.map((type) => {
//               const IconComponent = type.icon;
//               return (
//                 <button
//                   key={type.id}
//                   onClick={() => setActiveView(type.id)}
//                   className="group block bg-white rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 text-left"
//                 >
//                   <div
//                     className={`bg-gradient-to-br ${type.bgGradient} p-6 rounded-t-xl`}
//                   >
//                     <div
//                       className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${type.gradient} shadow-md mb-4`}
//                     >
//                       <IconComponent className="w-6 h-6 text-white" />
//                     </div>
//                     <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-gray-700 transition-colors">
//                       {type.title}
//                     </h3>
//                     <p className="text-gray-600 leading-relaxed group-hover:text-gray-500 transition-colors">
//                       {type.description}
//                     </p>
//                   </div>
//                   <div className="p-6 bg-white rounded-b-xl">
//                     <div className="flex items-center justify-between">
//                       <span className="font-semibold text-gray-900 group-hover:text-gray-700 transition-colors">
//                         Create Request
//                       </span>
//                       <Plus className="w-5 h-5 text-gray-400 group-hover:text-gray-600 group-hover:translate-x-1 transition-all duration-300" />
//                     </div>
//                   </div>
//                 </button>
//               );
//             })}
//           </div>

//           {/* View Work Requests Button */}
//           <div className="text-center">
//             <button
//               onClick={() => setActiveView("table")}
//               className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
//             >
//               <Eye className="w-6 h-6 mr-3" />
//               View Work Requests
//             </button>
//           </div>
//         </div>
//       );
//     }

//     if (activeView === "table") {
//       return <WorkRequestTable onBack={() => setActiveView("main")} />;
//     }

//     const selectedType = workRequestTypes.find(
//       (type) => type.id === activeView
//     );
//     if (selectedType) {
//       const ComponentToRender = selectedType.component;
//       return <ComponentToRender onBack={() => setActiveView("main")} />;
//     }

//     return null;
//   };

//   return (
//     <div
//       className={
//         activeView === "table"
//           ? "min-h-screen"
//           : "min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8"
//       }
//     >
//       <div
//         className={
//           activeView === "table"
//             ? "w-full h-full"
//             : "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
//         }
//       >
//         {workRequestTypes.some((type) => type.id === activeView) && (
//           <div className="mb-6">
//             <button
//               onClick={() => setActiveView("main")}
//               className="inline-flex items-center px-4 py-2 bg-white rounded-lg shadow-md hover:shadow-lg transition-all border border-gray-200"
//             >
//               <ArrowLeft className="w-5 h-5 mr-2 text-gray-600" />
//               <span className="text-gray-700 font-medium">
//                 Back to Work Requests
//               </span>
//             </button>
//           </div>
//         )}
//         <div
//           className={
//             activeView === "table" ? "" : "bg-white rounded-xl shadow-lg p-8"
//           }
//         >
//           {renderActiveComponent()}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default WorkRequestManagement;

// Modified WorkRequestManagement component
"use client";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { ArrowLeft, FileText, Wrench, Settings, Eye, Plus } from "lucide-react";
import CorrectiveMaintenanceForm from "../components/WorkRequest/CorrectiveMaintenanceForm";
import ReactiveMaintenanceForm from "../components/WorkRequest/ReactiveMaintenanceForm";
import PreventiveMaintenanceForm from "../components/WorkRequest/PreventiveMaintenanceForm";
import WorkRequestTable from "../components/WorkRequest/WorkRequestTable";

const WorkRequestManagement = () => {
  const location = useLocation();
  const [activeView, setActiveView] = useState(location.state?.type || "main");
  const [initialData, setInitialData] = useState(location.state || {});

  useEffect(() => {
    setInitialData(location.state || {});
    setActiveView(location.state?.type || "main");
  }, [location.state]);

  const workRequestTypes = [
    {
      id: "cm",
      title: "Corrective Maintenance Work Request",
      description: "Create work requests for corrective maintenance tasks",
      icon: Wrench,
      gradient: "from-red-500 to-red-600",
      bgGradient: "from-red-50 to-red-100",
      component: CorrectiveMaintenanceForm,
    },
    {
      id: "rm",
      title: "Reactive Maintenance Work Request",
      description: "Create work requests for reactive maintenance tasks",
      icon: Settings,
      gradient: "from-orange-500 to-orange-600",
      bgGradient: "from-orange-50 to-orange-100",
      component: ReactiveMaintenanceForm,
    },
    {
      id: "pm",
      title: "Preventive Plan Maintenance Work Request",
      description:
        "Create preventive maintenance schedules for multiple assets",
      icon: FileText,
      gradient: "from-green-500 to-green-600",
      bgGradient: "from-green-50 to-green-100",
      component: PreventiveMaintenanceForm,
    },
  ];

  const renderActiveComponent = () => {
    if (activeView === "main") {
      return (
        <div className="space-y-8">
          {/* Header */}
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-3">
              Work Request Management
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Create and manage work requests for maintenance operations
            </p>
          </div>
          {/* Work Request Type Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {workRequestTypes.map((type) => {
              const IconComponent = type.icon;
              return (
                <button
                  key={type.id}
                  onClick={() => setActiveView(type.id)}
                  className="group block bg-white rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 text-left"
                >
                  <div
                    className={`bg-gradient-to-br ${type.bgGradient} p-6 rounded-t-xl`}
                  >
                    <div
                      className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${type.gradient} shadow-md mb-4`}
                    >
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-gray-700 transition-colors">
                      {type.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed group-hover:text-gray-500 transition-colors">
                      {type.description}
                    </p>
                  </div>
                  <div className="p-6 bg-white rounded-b-xl">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-gray-900 group-hover:text-gray-700 transition-colors">
                        Create Request
                      </span>
                      <Plus className="w-5 h-5 text-gray-400 group-hover:text-gray-600 group-hover:translate-x-1 transition-all duration-300" />
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
          {/* View Work Requests Button */}
          <div className="text-center">
            <button
              onClick={() => setActiveView("table")}
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              <Eye className="w-6 h-6 mr-3" />
              View Work Requests
            </button>
          </div>
        </div>
      );
    }
    if (activeView === "table") {
      return <WorkRequestTable onBack={() => setActiveView("main")} />;
    }
    const selectedType = workRequestTypes.find(
      (type) => type.id === activeView
    );
    if (selectedType) {
      const ComponentToRender = selectedType.component;
      let props = { onBack: () => setActiveView("main") };
      if (activeView === "cm" || activeView === "rm") {
        props.initialAssetId = initialData.assetId;
        props.initialContractId = initialData.contractId;
      } else if (activeView === "pm") {
        props.initialAssetIds = initialData.selectedAssets;
        props.initialContractId = initialData.contractId;
      }
      return <ComponentToRender {...props} />;
    }
    return null;
  };

  return (
    <div
      className={
        activeView === "table"
          ? "min-h-screen"
          : "min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8"
      }
    >
      <div
        className={
          activeView === "table"
            ? "w-full h-full"
            : "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        }
      >
        {["cm", "rm", "pm"].includes(activeView) && (
          <div className="mb-6">
            <button
              onClick={() => setActiveView("main")}
              className="inline-flex items-center px-4 py-2 bg-white rounded-lg shadow-md hover:shadow-lg transition-all border border-gray-200"
            >
              <ArrowLeft className="w-5 h-5 mr-2 text-gray-600" />
              <span className="text-gray-700 font-medium">
                Back to Work Requests
              </span>
            </button>
          </div>
        )}
        <div
          className={
            activeView === "table" ? "" : "bg-white rounded-xl shadow-lg p-8"
          }
        >
          {renderActiveComponent()}
        </div>
      </div>
    </div>
  );
};

export default WorkRequestManagement;
