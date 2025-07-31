// "use client";

// import { useState, useEffect } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import ContractForm from "../components/ContractForm";
// import { contractService } from "../services/contractService";

// const ContractManagement = () => {
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

//   const handleSubmit = async (contractData) => {
//     try {
//       await contractService.createContract(contractData);
//       setSuccessMessage("Contract created successfully!");
//       setTimeout(() => {
//         navigate("/contracts/list", {
//           state: { success: "Contract created successfully!" },
//         });
//       }, 2000);
//     } catch (error) {
//       throw error; // Handled in ContractForm
//     }
//   };

//   return (
//     <div className="p-8 max-w-7xl mx-auto">
//       <div className="flex justify-between items-center mb-8">
//         <h2 className="text-3xl font-semibold text-gray-900">
//           Contract Management
//         </h2>
//         <button
//           onClick={() => navigate("/contracts/list")}
//           className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
//         >
//           View Contracts
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
//       <ContractForm onSubmit={handleSubmit} />
//     </div>
//   );
// };

// export default ContractManagement;

"use client";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ContractForm from "../components/ContractForm";
import { contractService } from "../services/contractService";
import { ArrowLeft, FileText, CheckCircle } from "lucide-react";

const ContractManagement = () => {
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

  const handleSubmit = async (contractData) => {
    try {
      await contractService.createContract(contractData);
      setSuccessMessage("Contract created successfully!");
      setTimeout(() => {
        navigate("/contracts/list", {
          state: { success: "Contract created successfully!" },
        });
      }, 2000);
    } catch (error) {
      throw error; // Handled in ContractForm
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8 border border-gray-100">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate("/contracts/list")}
                className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </button>
              <div>
                <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                  <FileText className="w-8 h-8 text-blue-600" />
                  Contract Management
                </h1>
                <p className="text-gray-600 mt-1">
                  Create and manage service contracts
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => navigate("/contracts/list")}
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-gray-600 to-gray-700 text-white rounded-xl hover:from-gray-700 hover:to-gray-800 transition-all shadow-lg hover:shadow-xl"
              >
                <FileText className="w-5 h-5 mr-2" />
                View All Contracts
              </button>
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

        <ContractForm onSubmit={handleSubmit} />
      </div>
    </div>
  );
};

export default ContractManagement;
