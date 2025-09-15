// // "use client";

// // import { useState } from "react";
// // import { ArrowLeft, CheckCircle, Package, FileText } from "lucide-react";
// // import SparePartsApproval from "../components/Approval/SparePartsApproval";
// // import WorkRequestApproval from "../components/Approval/WorkRequestApproval";

// // const ApprovalManagement = () => {
// //   const [activeView, setActiveView] = useState("main");

// //   const approvalTypes = [
// //     {
// //       id: "spare-parts",
// //       title: "Spare Parts Request Approval",
// //       description: "Review and approve spare parts requests from technicians",
// //       icon: Package,
// //       gradient: "from-blue-500 to-blue-600",
// //       bgGradient: "from-blue-50 to-blue-100",
// //       component: SparePartsApproval,
// //     },
// //     {
// //       id: "work-requests",
// //       title: "Work Request Approval",
// //       description: "Review and approve work requests for maintenance tasks",
// //       icon: FileText,
// //       gradient: "from-green-500 to-green-600",
// //       bgGradient: "from-green-50 to-green-100",
// //       component: WorkRequestApproval,
// //     },
// //   ];

// //   const renderActiveComponent = () => {
// //     if (activeView === "main") {
// //       return (
// //         <div className="space-y-8">
// //           {/* Header */}
// //           <div className="text-center">
// //             <h1 className="text-3xl font-bold text-gray-900 mb-3">
// //               Approval Management
// //             </h1>
// //             <p className="text-lg text-gray-600 max-w-2xl mx-auto">
// //               Review and approve requests from technicians and supervisors
// //             </p>
// //           </div>

// //           {/* Approval Type Cards */}
// //           <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
// //             {approvalTypes.map((type) => {
// //               const IconComponent = type.icon;
// //               return (
// //                 <button
// //                   key={type.id}
// //                   onClick={() => setActiveView(type.id)}
// //                   className="group block bg-white rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 text-left"
// //                 >
// //                   <div
// //                     className={`bg-gradient-to-br ${type.bgGradient} p-8 rounded-t-xl`}
// //                   >
// //                     <div
// //                       className={`inline-flex p-4 rounded-xl bg-gradient-to-r ${type.gradient} shadow-md mb-6`}
// //                     >
// //                       <IconComponent className="w-8 h-8 text-white" />
// //                     </div>
// //                     <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-gray-700 transition-colors">
// //                       {type.title}
// //                     </h3>
// //                     <p className="text-gray-600 leading-relaxed group-hover:text-gray-500 transition-colors">
// //                       {type.description}
// //                     </p>
// //                   </div>
// //                   <div className="p-6 bg-white rounded-b-xl">
// //                     <div className="flex items-center justify-between">
// //                       <span className="font-semibold text-gray-900 group-hover:text-gray-700 transition-colors">
// //                         Review Requests
// //                       </span>
// //                       <CheckCircle className="w-5 h-5 text-gray-400 group-hover:text-gray-600 group-hover:translate-x-1 transition-all duration-300" />
// //                     </div>
// //                   </div>
// //                 </button>
// //               );
// //             })}
// //           </div>
// //         </div>
// //       );
// //     }

// //     const selectedType = approvalTypes.find((type) => type.id === activeView);
// //     if (selectedType) {
// //       const ComponentToRender = selectedType.component;
// //       return <ComponentToRender onBack={() => setActiveView("main")} />;
// //     }

// //     return null;
// //   };

// //   return (
// //     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
// //       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
// //         {/* Back Button (only show when not on main view) */}
// //         {activeView !== "main" && (
// //           <div className="mb-6">
// //             <button
// //               onClick={() => setActiveView("main")}
// //               className="inline-flex items-center px-4 py-2 bg-white rounded-lg shadow-md hover:shadow-lg transition-all border border-gray-200"
// //             >
// //               <ArrowLeft className="w-5 h-5 mr-2 text-gray-600" />
// //               <span className="text-gray-700 font-medium">
// //                 Back to Approvals
// //               </span>
// //             </button>
// //           </div>
// //         )}

// //         {/* Main Content */}
// //         <div className="bg-white rounded-xl shadow-lg p-8">
// //           {renderActiveComponent()}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default ApprovalManagement;

// "use client";

// import { useState } from "react";
// import { CheckCircle, Package, FileText } from "lucide-react";
// import SparePartsApproval from "../components/Approval/SparePartsApproval";
// import WorkRequestApproval from "../components/Approval/WorkRequestApproval";

// const ApprovalManagement = () => {
//   const [activeView, setActiveView] = useState("main");

//   const approvalTypes = [
//     {
//       id: "spare-parts",
//       title: "Spare Parts Request Approval",
//       description: "Review and approve spare parts requests from technicians",
//       icon: Package,
//       gradient: "from-blue-500 to-blue-600",
//       bgGradient: "from-blue-50 to-blue-100",
//       component: SparePartsApproval,
//     },
//     {
//       id: "work-requests",
//       title: "Work Request Approval",
//       description: "Review and approve work requests for maintenance tasks",
//       icon: FileText,
//       gradient: "from-green-500 to-green-600",
//       bgGradient: "from-green-50 to-green-100",
//       component: WorkRequestApproval,
//     },
//   ];

//   const renderActiveComponent = () => {
//     if (activeView === "main") {
//       return (
//         <div className="space-y-8">
//           {/* Header */}
//           <div className="text-center">
//             <h1 className="text-3xl font-bold text-gray-900 mb-3">
//               Approval Management
//             </h1>
//             <p className="text-lg text-gray-600 max-w-2xl mx-auto">
//               Review and approve requests from technicians and supervisors
//             </p>
//           </div>

//           {/* Approval Type Cards */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
//             {approvalTypes.map((type) => {
//               const IconComponent = type.icon;
//               return (
//                 <button
//                   key={type.id}
//                   onClick={() => setActiveView(type.id)}
//                   className="group block bg-white rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 text-left"
//                 >
//                   <div
//                     className={`bg-gradient-to-br ${type.bgGradient} p-8 rounded-t-xl`}
//                   >
//                     <div
//                       className={`inline-flex p-4 rounded-xl bg-gradient-to-r ${type.gradient} shadow-md mb-6`}
//                     >
//                       <IconComponent className="w-8 h-8 text-white" />
//                     </div>
//                     <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-gray-700 transition-colors">
//                       {type.title}
//                     </h3>
//                     <p className="text-gray-600 leading-relaxed group-hover:text-gray-500 transition-colors">
//                       {type.description}
//                     </p>
//                   </div>
//                   <div className="p-6 bg-white rounded-b-xl">
//                     <div className="flex items-center justify-between">
//                       <span className="font-semibold text-gray-900 group-hover:text-gray-700 transition-colors">
//                         Review Requests
//                       </span>
//                       <CheckCircle className="w-5 h-5 text-gray-400 group-hover:text-gray-600 group-hover:translate-x-1 transition-all duration-300" />
//                     </div>
//                   </div>
//                 </button>
//               );
//             })}
//           </div>
//         </div>
//       );
//     }

//     const selectedType = approvalTypes.find((type) => type.id === activeView);
//     if (selectedType) {
//       const ComponentToRender = selectedType.component;
//       return <ComponentToRender onBack={() => setActiveView("main")} />;
//     }

//     return null;
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         {/* Main Content */}
//         <div className="bg-white rounded-xl shadow-lg p-8">
//           {renderActiveComponent()}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ApprovalManagement;

"use client";

import { useState } from "react";
import { CheckCircle, Package, FileText } from "lucide-react";
import SparePartsApproval from "../components/Approval/SparePartsApproval";
import WorkRequestApproval from "../components/Approval/WorkRequestApproval";

const ApprovalManagement = () => {
  const [activeView, setActiveView] = useState("main");

  const approvalTypes = [
    {
      id: "spare-parts",
      title: "Spare Parts Request Approval",
      description: "Review and approve spare parts requests from technicians",
      icon: Package,
      gradient: "from-blue-500 to-blue-600",
      bgGradient: "from-blue-50 to-blue-100",
      component: SparePartsApproval,
    },
    {
      id: "work-requests",
      title: "Work Request Approval",
      description: "Review and approve work requests for maintenance tasks",
      icon: FileText,
      gradient: "from-green-500 to-green-600",
      bgGradient: "from-green-50 to-green-100",
      component: WorkRequestApproval,
    },
  ];

  const renderActiveComponent = () => {
    if (activeView === "main") {
      return (
        <div className="max-w-[1600px] mx-auto p-6">
          <div className="space-y-8">
            {/* Header */}
            <div className="text-center">
              <h1 className="text-3xl font-bold text-slate-900 mb-3">
                Approval Management
              </h1>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                Review and approve requests from technicians and supervisors
              </p>
            </div>

            {/* Approval Type Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {approvalTypes.map((type) => {
                const IconComponent = type.icon;
                return (
                  <button
                    key={type.id}
                    onClick={() => setActiveView(type.id)}
                    className="group block bg-white rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 text-left"
                  >
                    <div
                      className={`bg-gradient-to-br ${type.bgGradient} p-8 rounded-t-xl`}
                    >
                      <div
                        className={`inline-flex p-4 rounded-xl bg-gradient-to-r ${type.gradient} shadow-md mb-6`}
                      >
                        <IconComponent className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-slate-700 transition-colors">
                        {type.title}
                      </h3>
                      <p className="text-slate-600 leading-relaxed group-hover:text-slate-500 transition-colors">
                        {type.description}
                      </p>
                    </div>
                    <div className="p-6 bg-white rounded-b-xl">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-slate-900 group-hover:text-slate-700 transition-colors">
                          Review Requests
                        </span>
                        <CheckCircle className="w-5 h-5 text-slate-400 group-hover:text-slate-600 group-hover:translate-x-1 transition-all duration-300" />
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      );
    }

    const selectedType = approvalTypes.find((type) => type.id === activeView);
    if (selectedType) {
      const ComponentToRender = selectedType.component;
      return <ComponentToRender onBack={() => setActiveView("main")} />;
    }

    return null;
  };

  return <div className="min-h-screen">{renderActiveComponent()}</div>;
};

export default ApprovalManagement;
