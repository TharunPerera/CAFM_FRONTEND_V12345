"use client";

import { useState } from "react";
import { ArrowLeft, Wrench, Settings, Shield, Eye, Plus } from "lucide-react";
import CorrectiveMaintenanceWorkOrderForm from "../components/WorkOrder/CorrectiveMaintenanceWorkOrderForm";
import ReactiveMaintenanceWorkOrderForm from "../components/WorkOrder/ReactiveMaintenanceWorkOrderForm";
import PreventiveMaintenanceWorkOrderForm from "../components/WorkOrder/PreventiveMaintenanceWorkOrderForm";
import WorkOrderTable from "../components/WorkOrder/WorkOrderTable";

const WorkOrderManagement = () => {
  const [activeView, setActiveView] = useState("main");

  const workOrderTypes = [
    {
      id: "cm",
      title: "Create CM Work Order",
      description:
        "Create work orders for corrective maintenance work requests",
      icon: Wrench,
      gradient: "from-red-500 to-red-600",
      bgGradient: "from-red-50 to-red-100",
      component: CorrectiveMaintenanceWorkOrderForm,
    },
    {
      id: "rm",
      title: "Create RM Work Order",
      description: "Create work orders for reactive maintenance work requests",
      icon: Settings,
      gradient: "from-orange-500 to-orange-600",
      bgGradient: "from-orange-50 to-orange-100",
      component: ReactiveMaintenanceWorkOrderForm,
    },
    {
      id: "pm",
      title: "Create PM Work Order",
      description:
        "Create work orders for preventive maintenance work requests",
      icon: Shield,
      gradient: "from-green-500 to-green-600",
      bgGradient: "from-green-50 to-green-100",
      component: PreventiveMaintenanceWorkOrderForm,
    },
  ];

  const renderActiveComponent = () => {
    if (activeView === "main") {
      return (
        <div className="space-y-8">
          {/* Header */}
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-3">
              Work Order Management
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Create and manage work orders for approved work requests
            </p>
          </div>

          {/* Work Order Type Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {workOrderTypes.map((type) => {
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
                        Create Work Order
                      </span>
                      <Plus className="w-5 h-5 text-gray-400 group-hover:text-gray-600 group-hover:translate-x-1 transition-all duration-300" />
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* View Work Orders Button */}
          <div className="text-center">
            <button
              onClick={() => setActiveView("table")}
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              <Eye className="w-6 h-6 mr-3" />
              View Created Work Orders
            </button>
          </div>
        </div>
      );
    }

    if (activeView === "table") {
      return <WorkOrderTable onBack={() => setActiveView("main")} />;
    }

    const selectedType = workOrderTypes.find((type) => type.id === activeView);
    if (selectedType) {
      const ComponentToRender = selectedType.component;
      return <ComponentToRender onBack={() => setActiveView("main")} />;
    }

    return null;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button (only show when not on main view) */}
        {activeView !== "main" && (
          <div className="mb-6">
            <button
              onClick={() => setActiveView("main")}
              className="inline-flex items-center px-4 py-2 bg-white rounded-lg shadow-md hover:shadow-lg transition-all border border-gray-200"
            >
              <ArrowLeft className="w-5 h-5 mr-2 text-gray-600" />
              <span className="text-gray-700 font-medium">
                Back to Work Orders
              </span>
            </button>
          </div>
        )}

        {/* Main Content */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          {renderActiveComponent()}
        </div>
      </div>
    </div>
  );
};

export default WorkOrderManagement;
