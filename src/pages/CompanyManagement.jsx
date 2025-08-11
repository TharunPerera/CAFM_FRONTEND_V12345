// import { useState, useEffect } from "react";
// import CompanyForm from "../components/CompanyForm";
// import CompanyTable from "../components/CompanyTable";
// import { companyService } from "../services/companyService";

// const CompanyManagement = () => {
//   const [companies, setCompanies] = useState([]);

//   useEffect(() => {
//     companyService.getAllCompanies().then((res) => setCompanies(res.data));
//   }, []);

//   const handleSubmit = async (company) => {
//     try {
//       await companyService.createCompany(company);
//       const res = await companyService.getAllCompanies();
//       setCompanies(res.data);
//     } catch (error) {
//       console.error("Error creating company:", error);
//     }
//   };

//   return (
//     <div className="p-6">
//       <h2 className="text-2xl font-bold mb-4">Company Management</h2>
//       <CompanyForm onSubmit={handleSubmit} />
//       <CompanyTable companies={companies} />
//     </div>
//   );
// };

// export default CompanyManagement;

// import { useState, useEffect } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import CompanyForm from "../components/CompanyForm";
// import { companyService } from "../services/companyService";

// const CompanyManagement = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [successMessage, setSuccessMessage] = useState(
//     location.state?.success || null
//   );

//   useEffect(() => {
//     if (successMessage) {
//       const timer = setTimeout(() => setSuccessMessage(null), 3000);
//       return () => clearTimeout(timer);
//     }
//   }, [successMessage]);

//   const handleSubmit = async (company) => {
//     try {
//       await companyService.createCompany(company);
//       setSuccessMessage("Company created successfully!");
//     } catch (error) {
//       throw error; // Handled in CompanyForm
//     }
//   };

//   return (
//     <div className="p-8 max-w-7xl mx-auto">
//       <div className="flex justify-between items-center mb-8">
//         <h2 className="text-3xl font-semibold text-gray-900">
//           Company Management
//         </h2>
//         <button
//           onClick={() => navigate("/companies/list")}
//           className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
//         >
//           View Companies
//         </button>
//       </div>
//       {successMessage && (
//         <div className="mb-6 p-4 bg-green-50 text-green-700 rounded-lg text-sm flex items-center">
//           <svg
//             className="w-5 h-5 mr-2"
//             fill="none"
//             stroke="currentColor"
//             viewBox="0 0 24 24"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth="2"
//               d="M5 13l4 4L19 7"
//             />
//           </svg>
//           {successMessage}
//         </div>
//       )}
//       <CompanyForm onSubmit={handleSubmit} />
//     </div>
//   );
// };

// export default CompanyManagement;

// "use client";
// import { Link, useNavigate, useLocation } from "react-router-dom";
// import {
//   Plus,
//   Building,
//   ArrowRight,
//   ArrowLeft,
//   CheckCircle,
// } from "lucide-react";
// import { useState, useEffect } from "react";
// import CompanyForm from "../components/CompanyForm";
// import { companyService } from "../services/companyService";

// const CompanyManagement = ({ isCreate = false }) => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [successMessage, setSuccessMessage] = useState(
//     location.state?.success || null
//   );

//   useEffect(() => {
//     if (successMessage) {
//       const timer = setTimeout(() => setSuccessMessage(null), 3000);
//       return () => clearTimeout(timer);
//     }
//   }, [successMessage]);

//   const handleSubmit = async (companyData) => {
//     try {
//       await companyService.createCompany(companyData);
//       setSuccessMessage("Company created successfully!");
//       setTimeout(() => {
//         navigate("/companies/list", {
//           state: { success: "Company created successfully!" },
//         });
//       }, 2000);
//     } catch (error) {
//       throw error; // Handled in CompanyForm
//     }
//   };

//   if (isCreate) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           {/* Header */}
//           <div className="bg-white rounded-2xl shadow-xl p-6 mb-8 border border-gray-100">
//             <div className="flex justify-between items-center">
//               <div className="flex items-center space-x-4">
//                 <button
//                   onClick={() => navigate("/companies")}
//                   className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
//                 >
//                   <ArrowLeft className="w-5 h-5 text-gray-600" />
//                 </button>
//                 <div>
//                   <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
//                     <Building className="w-8 h-8 text-blue-600" />
//                     Create Company
//                   </h1>
//                   <p className="text-gray-600 mt-1">
//                     Add a new company to the system
//                   </p>
//                 </div>
//               </div>
//               <div className="flex gap-3">
//                 <button
//                   onClick={() => navigate("/companies/list")}
//                   className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-gray-600 to-gray-700 text-white rounded-xl hover:from-gray-700 hover:to-gray-800 transition-all shadow-lg hover:shadow-xl"
//                 >
//                   <Building className="w-5 h-5 mr-2" />
//                   View All Companies
//                 </button>
//               </div>
//             </div>
//           </div>

//           {/* Success Message */}
//           {successMessage && (
//             <div className="bg-green-50 border-l-4 border-green-400 p-6 mb-8 rounded-r-xl shadow-lg">
//               <div className="flex items-center">
//                 <div className="flex-shrink-0">
//                   <CheckCircle className="w-5 h-5 text-green-400" />
//                 </div>
//                 <div className="ml-3">
//                   <p className="text-green-700 font-medium">{successMessage}</p>
//                 </div>
//               </div>
//             </div>
//           )}

//           <CompanyForm onSubmit={handleSubmit} />
//         </div>
//       </div>
//     );
//   }

//   const quickActions = [
//     {
//       title: "Create New Company",
//       description: "Add new companies to your system",
//       icon: Plus,
//       link: "/companies/create",
//       gradient: "from-blue-500 to-blue-600",
//       bgGradient: "from-blue-50 to-blue-100",
//     },
//     {
//       title: "View All Companies",
//       description: "Browse and manage existing companies",
//       icon: Building,
//       link: "/companies/list",
//       gradient: "from-green-500 to-green-600",
//       bgGradient: "from-green-50 to-green-100",
//     },
//   ];

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-6">
//       <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
//         {/* Header */}
//         <div className="text-center mb-8">
//           <h1 className="text-3xl font-bold text-gray-900 mb-3">
//             Company Management
//           </h1>
//           <p className="text-lg text-gray-600 max-w-2xl mx-auto">
//             Comprehensive company tracking and management system
//           </p>
//         </div>

//         {/* Quick Actions Cards */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
//           {quickActions.map((action, index) => {
//             const IconComponent = action.icon;
//             return (
//               <Link
//                 key={index}
//                 to={action.link}
//                 className="group block bg-white rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
//               >
//                 <div
//                   className={`bg-gradient-to-br ${action.bgGradient} p-6 rounded-t-xl`}
//                 >
//                   <div
//                     className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${action.gradient} shadow-md mb-4`}
//                   >
//                     <IconComponent className="w-6 h-6 text-white" />
//                   </div>
//                   <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-gray-700 transition-colors">
//                     {action.title}
//                   </h3>
//                   <p className="text-gray-600 leading-relaxed group-hover:text-gray-500 transition-colors">
//                     {action.description}
//                   </p>
//                 </div>
//                 <div className="p-6 bg-white rounded-b-xl">
//                   <div className="flex items-center justify-between">
//                     <span className="font-semibold text-gray-900 group-hover:text-gray-700 transition-colors">
//                       Get Started
//                     </span>
//                     <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-gray-600 group-hover:translate-x-1 transition-all duration-300" />
//                   </div>
//                 </div>
//               </Link>
//             );
//           })}
//         </div>

//         {/* Simple Feature Highlight */}
//         <div className="mt-12 text-center">
//           <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
//             <h2 className="text-xl font-bold text-gray-900 mb-3">
//               Efficient Company Management
//             </h2>
//             <p className="text-gray-600 max-w-2xl mx-auto">
//               Streamline your company management process with our comprehensive
//               CAFM system.
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CompanyManagement;

"use client";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useContext } from "react";
import {
  Plus,
  Building,
  ArrowRight,
  ArrowLeft,
  CheckCircle,
} from "lucide-react";
import { useState, useEffect } from "react";
import CompanyForm from "../components/CompanyForm";
import { companyService } from "../services/companyService";
import { AuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";

const CompanyManagement = ({ isCreate = false }) => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [successMessage, setSuccessMessage] = useState(
    location.state?.success || null
  );

  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => setSuccessMessage(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  const handleSubmit = async (companyData) => {
    if (!user?.permissions?.includes("create_company")) {
      toast.error("You don't have permission to create companies");
      return;
    }
    try {
      await companyService.createCompany(companyData);
      setSuccessMessage("Company created successfully!");
      setTimeout(() => {
        navigate("/companies/list", {
          state: { success: "Company created successfully!" },
        });
      }, 2000);
    } catch (error) {
      throw error; // Handled in CompanyForm
    }
  };

  if (isCreate) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="bg-white rounded-2xl shadow-xl p-6 mb-8 border border-gray-100">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => navigate("/companies")}
                  className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
                >
                  <ArrowLeft className="w-5 h-5 text-gray-600" />
                </button>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                    <Building className="w-8 h-8 text-blue-600" />
                    Create Company
                  </h1>
                  <p className="text-gray-600 mt-1">
                    Add a new company to the system
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="relative group">
                  <button
                    onClick={() => navigate("/companies/list")}
                    className={`inline-flex items-center px-6 py-3 rounded-xl shadow-lg transition-all transform hover:scale-105 ${
                      user?.permissions?.includes("view_company")
                        ? "bg-gradient-to-r from-gray-600 to-gray-700 text-white hover:from-gray-700 hover:to-gray-800"
                        : "bg-gray-300 text-gray-500 cursor-not-allowed"
                    }`}
                    disabled={!user?.permissions?.includes("view_company")}
                  >
                    <Building className="w-5 h-5 mr-2" />
                    View All Companies
                  </button>
                  {!user?.permissions?.includes("view_company") && (
                    <div className="absolute top-full mt-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-50">
                      You don't have permission to view companies
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Success Message */}
          {successMessage && (
            <div className="bg-green-50 border-l-4 border-green-400 p-6 mb-8 rounded-r-xl shadow-lg">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                </div>
                <div className="ml-3">
                  <p className="text-green-700 font-medium">{successMessage}</p>
                </div>
              </div>
            </div>
          )}

          <CompanyForm onSubmit={handleSubmit} />
        </div>
      </div>
    );
  }

  const quickActions = [
    {
      title: "Create New Company",
      description: "Add new companies to your system",
      icon: Plus,
      link: "/companies/create",
      gradient: "from-blue-500 to-blue-600",
      bgGradient: "from-blue-50 to-blue-100",
      permission: "create_company",
    },
    {
      title: "View All Companies",
      description: "Browse and manage existing companies",
      icon: Building,
      link: "/companies/list",
      gradient: "from-green-500 to-green-600",
      bgGradient: "from-green-50 to-green-100",
      permission: "view_company",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-6">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-3">
            Company Management
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Comprehensive company tracking and management system
          </p>
        </div>

        {/* Quick Actions Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {quickActions.map((action, index) => {
            const IconComponent = action.icon;
            return (
              <div
                key={index}
                className={`group block bg-white rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 ${
                  action.permission &&
                  !user?.permissions?.includes(action.permission)
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }`}
              >
                <Link
                  to={action.link}
                  onClick={(e) => {
                    if (
                      action.permission &&
                      !user?.permissions?.includes(action.permission)
                    ) {
                      e.preventDefault();
                      toast.error(
                        `You don't have permission to ${action.title.toLowerCase()}`
                      );
                    }
                  }}
                >
                  <div
                    className={`bg-gradient-to-br ${action.bgGradient} p-6 rounded-t-xl`}
                  >
                    <div
                      className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${action.gradient} shadow-md mb-4`}
                    >
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-gray-700 transition-colors">
                      {action.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed group-hover:text-gray-500 transition-colors">
                      {action.description}
                    </p>
                  </div>
                  <div className="p-6 bg-white rounded-b-xl">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-gray-900 group-hover:text-gray-700 transition-colors">
                        Get Started
                      </span>
                      <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-gray-600 group-hover:translate-x-1 transition-all duration-300" />
                    </div>
                  </div>
                </Link>
                {action.permission &&
                  !user?.permissions?.includes(action.permission) && (
                    <div className="absolute top-2 right-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-50">
                      You don't have permission to {action.title.toLowerCase()}
                    </div>
                  )}
              </div>
            );
          })}
        </div>

        {/* Simple Feature Highlight */}
        <div className="mt-12 text-center">
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <h2 className="text-xl font-bold text-gray-900 mb-3">
              Efficient Company Management
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Streamline your company management process with our comprehensive
              CAFM system.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyManagement;
