"use client";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  Plus,
  FileText,
  ArrowRight,
  ArrowLeft,
  CheckCircle,
} from "lucide-react";
import { useState, useEffect } from "react";
import ContractForm from "../components/ContractForm";
import { contractService } from "../services/contractService";

const ContractManagement = ({ isCreate = false }) => {
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

  if (isCreate) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="bg-white rounded-2xl shadow-xl p-6 mb-8 border border-gray-100">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => navigate("/contracts")}
                  className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
                >
                  <ArrowLeft className="w-5 h-5 text-gray-600" />
                </button>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                    <FileText className="w-8 h-8 text-blue-600" />
                    Create Contract
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
  }

  const quickActions = [
    {
      title: "Create New Contract",
      description: "Add new contracts to your system",
      icon: Plus,
      link: "/contracts/create",
      gradient: "from-blue-500 to-blue-600",
      bgGradient: "from-blue-50 to-blue-100",
    },
    {
      title: "View All Contracts",
      description: "Browse and manage existing contracts",
      icon: FileText,
      link: "/contracts/list",
      gradient: "from-green-500 to-green-600",
      bgGradient: "from-green-50 to-green-100",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-6">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-3">
            Contract Management
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Comprehensive contract tracking and management system
          </p>
        </div>

        {/* Quick Actions Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {quickActions.map((action, index) => {
            const IconComponent = action.icon;
            return (
              <Link
                key={index}
                to={action.link}
                className="group block bg-white rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
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
            );
          })}
        </div>

        {/* Simple Feature Highlight */}
        <div className="mt-12 text-center">
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <h2 className="text-xl font-bold text-gray-900 mb-3">
              Efficient Contract Management
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Streamline your contract management process with our comprehensive
              CAFM system.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContractManagement;
