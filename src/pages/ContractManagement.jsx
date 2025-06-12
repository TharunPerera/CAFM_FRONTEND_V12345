// import ContractForm from "../components/ContractForm";
// import { contractService } from "../services/contractService";

// const ContractManagement = () => {
//   const handleSubmit = async (contract) => {
//     try {
//       await contractService.createContract(contract);
//       alert("Contract created successfully");
//     } catch (error) {
//       console.error("Error creating contract:", error);
//       alert("Failed to create contract. Please try again.");
//     }
//   };

//   return (
//     <div className="p-6">
//       <h2 className="text-2xl font-bold mb-4">Contract Management</h2>
//       <ContractForm onSubmit={handleSubmit} />
//     </div>
//   );
// };

// export default ContractManagement;

// import { useNavigate } from "react-router-dom";
// import ContractForm from "../components/ContractForm";
// import { contractService } from "../services/contractService";

// const ContractManagement = () => {
//   const navigate = useNavigate();

//   const handleSubmit = async (contract, contractId) => {
//     try {
//       if (contractId) {
//         await contractService.updateContract(contractId, contract);
//         alert("Contract updated successfully");
//       } else {
//         await contractService.createContract(contract);
//         alert("Contract created successfully");
//       }
//       navigate("/contracts/list");
//     } catch (error) {
//       console.error("Error processing contract:", error);
//       alert(
//         `Failed to ${
//           contractId ? "update" : "create"
//         } contract. Please try again.`
//       );
//     }
//   };

//   return (
//     <div className="p-6">
//       <div className="flex justify-between items-center mb-4">
//         <h2 className="text-2xl font-bold">Contract Management</h2>
//         <button
//           onClick={() => navigate("/contracts/list")}
//           className="flex items-center bg-purple-600 text-white p-3 rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
//         >
//           View Contracts
//         </button>
//       </div>
//       <ContractForm onSubmit={handleSubmit} />
//     </div>
//   );
// };

// export default ContractManagement;

//////////3333333333333
// import { useNavigate } from "react-router-dom";
// import ContractForm from "../components/ContractForm";
// import { contractService } from "../services/contractService";

// const ContractManagement = () => {
//   const navigate = useNavigate();

//   const handleSubmit = async (contract, contractId) => {
//     try {
//       if (contractId) {
//         await contractService.updateContract(contractId, contract);
//         alert("Contract updated successfully");
//       } else {
//         await contractService.createContract(contract);
//         alert("Contract created successfully");
//       }
//       navigate("/contracts/list");
//     } catch (error) {
//       console.error("Error processing contract:", error);
//       alert(
//         `Failed to ${
//           contractId ? "update" : "create"
//         } contract. Please try again.`
//       );
//     }
//   };

//   return (
//     <div className="p-6">
//       <div className="flex justify-between items-center mb-4">
//         <h2 className="text-2xl font-bold">Contract Management</h2>
//         <button
//           onClick={() => navigate("/contracts/list")}
//           className="flex items-center bg-purple-600 text-white p-3 rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
//         >
//           View Contracts
//         </button>
//       </div>
//       <ContractForm onSubmit={handleSubmit} />
//     </div>
//   );
// };

// export default ContractManagement;

///44444444444
// import { useState, useEffect } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import { contractService } from "../services/contractService";
// import ContractForm from "../components/ContractForm";

// const ContractManagement = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const contractId = location.state?.contractId;
//   const [contractData, setContractData] = useState(null);
//   const [loading, setLoading] = useState(!!contractId);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     if (contractId) {
//       const fetchContract = async () => {
//         try {
//           setLoading(true);
//           const contractRes = await contractService.getContractById(contractId);
//           setContractData(contractRes.data);
//         } catch (err) {
//           console.error("Error fetching contract:", err);
//           setError("Failed to load contract details.");
//         } finally {
//           setLoading(false);
//         }
//       };
//       fetchContract();
//     }
//   }, [contractId]);

//   const handleSubmit = async (contract, contractId) => {
//     try {
//       if (contractId) {
//         await contractService.updateContractDetails(contractId, {
//           contractName: contract.contractName,
//           companyId: contract.companyId,
//           projectLocation: contract.projectLocation,
//           projectType: contract.projectType,
//           startDate: contract.startDate,
//           endDate: contract.endDate,
//         });
//         await contractService.updateContractServices(
//           contractId,
//           contract.services
//         );
//         await contractService.updateEmployeeTimings(
//           contractId,
//           contract.employeeTimings
//         );
//         alert("Contract updated successfully");
//       } else {
//         await contractService.createContract(contract);
//         alert("Contract created successfully");
//       }
//       navigate("/contracts/list");
//     } catch (error) {
//       console.error("Error processing contract:", error);
//       alert(
//         `Failed to ${
//           contractId ? "update" : "create"
//         } contract. Please try again.`
//       );
//     }
//   };

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-600"></div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="text-center p-6 bg-red-100 text-red-700 rounded-lg max-w-7xl mx-auto">
//         {error}
//       </div>
//     );
//   }

//   return (
//     <div className="p-6">
//       <div className="flex justify-between items-center mb-4">
//         <h2 className="text-2xl font-bold">Contract Management</h2>
//         <button
//           onClick={() => navigate("/contracts/list")}
//           className="flex items-center bg-purple-600 text-white p-3 rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
//         >
//           View Contracts
//         </button>
//       </div>
//       <ContractForm onSubmit={handleSubmit} contractData={contractData} />
//     </div>
//   );
// };

// export default ContractManagement;
"use client";

import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ContractForm from "../components/ContractForm";
import { contractService } from "../services/contractService";

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
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-semibold text-gray-900">
          Contract Management
        </h2>
        <button
          onClick={() => navigate("/contracts/list")}
          className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
        >
          View Contracts
        </button>
      </div>
      {successMessage && (
        <div className="mb-6 p-4 bg-green-50 text-green-700 rounded-lg text-sm flex items-center">
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 13l4 4L19 7"
            />
          </svg>
          {successMessage}
        </div>
      )}
      <ContractForm onSubmit={handleSubmit} />
    </div>
  );
};

export default ContractManagement;
