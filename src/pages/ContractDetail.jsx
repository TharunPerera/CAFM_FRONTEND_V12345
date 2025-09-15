"use client";

import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { contractService } from "../services/contractService";
import {
  ArrowLeftIcon,
  InformationCircleIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  BuildingOfficeIcon,
  CogIcon,
  ClockIcon,
  ChartBarIcon,
} from "@heroicons/react/24/outline";

const ContractDetail = () => {
  const { contractId } = useParams();
  const navigate = useNavigate();
  const [contract, setContract] = useState(null);
  const [slaTypes, setSlaTypes] = useState([]);
  const [priorityLevels, setPriorityLevels] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("details");
  const [expandedScopes, setExpandedScopes] = useState({});

  useEffect(() => {
    const fetchContract = async () => {
      try {
        setLoading(true);
        setError(null);

        const [contractRes, slaTypesRes] = await Promise.all([
          contractService.getContractById(contractId),
          contractService.getSlaTypes(),
        ]);

        const contractData = contractRes.data;
        const slaTypesData = Array.isArray(slaTypesRes.data)
          ? slaTypesRes.data
          : [];

        const priorityLevelsMap = {};
        await Promise.all(
          slaTypesData.map(async (slaType) => {
            try {
              const prioritiesRes = await contractService.getPriorityLevels(
                slaType.slaTypeId.toString()
              );
              priorityLevelsMap[slaType.slaTypeId] = Array.isArray(
                prioritiesRes.data
              )
                ? prioritiesRes.data
                : [];
            } catch (err) {
              priorityLevelsMap[slaType.slaTypeId] = [];
            }
          })
        );

        const enhancedContract = {
          ...contractData,
          slaRules: (contractData.slaRules || []).map((rule) => ({
            ...rule,
            slaTypeName:
              slaTypesData.find((sla) => sla.slaTypeId === rule.slaTypeId)
                ?.slaTypeName || "N/A",
            priorityName:
              priorityLevelsMap[rule.slaTypeId]?.find(
                (p) => p.priorityId === rule.priorityId
              )?.priorityName || "N/A",
          })),
        };

        setContract(enhancedContract);
        setSlaTypes(slaTypesData);
        setPriorityLevels(priorityLevelsMap);
      } catch (err) {
        console.error("Error fetching contract:", err);
        setError("Failed to load contract details. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchContract();
  }, [contractId]);

  // Toggle scope expansion
  const toggleScope = (scopeId) => {
    setExpandedScopes((prev) => ({
      ...prev,
      [scopeId]: !prev[scopeId],
    }));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-sm w-full text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto mb-4"></div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Loading Contract Details
          </h3>
          <p className="text-gray-600">Please wait...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <InformationCircleIcon className="w-8 h-8 text-red-600" />
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">
            Oops! Something went wrong
          </h3>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors font-medium"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!contract) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <InformationCircleIcon className="w-8 h-8 text-yellow-600" />
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">
            Contract Not Found
          </h3>
          <p className="text-gray-600 mb-6">
            The requested contract could not be found.
          </p>
          <button
            onClick={() => navigate("/contracts/list")}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Back to Contracts
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-8 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate("/contracts/list")}
                className="flex items-center bg-gradient-to-r from-gray-600 to-gray-700 text-white px-4 py-2 rounded-xl hover:from-gray-700 hover:to-gray-800 transition-all shadow-lg hover:shadow-xl"
                title="Return to contract list"
              >
                <ArrowLeftIcon className="h-5 w-5 mr-2" />
                Back to Contracts
              </button>
              <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                {contract.contractName}
              </h2>
            </div>
            <div className="flex items-center gap-2">
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                {contract.services?.length || 0} Services
              </span>
              <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-medium">
                {contract.slaRules?.length || 0} SLA Rules
              </span>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-2xl shadow-xl mb-8 overflow-hidden">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-8">
              {[
                {
                  id: "details",
                  label: "Details",
                  icon: BuildingOfficeIcon,
                  color: "blue",
                },
                {
                  id: "services",
                  label: "Services",
                  icon: CogIcon,
                  color: "green",
                },
                {
                  id: "timings",
                  label: "Timings",
                  icon: ClockIcon,
                  color: "purple",
                },
                {
                  id: "sla",
                  label: "SLA Rules",
                  icon: ChartBarIcon,
                  color: "orange",
                },
              ].map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    className={`py-4 px-2 border-b-2 font-medium text-sm transition-all duration-200 flex items-center ${
                      activeTab === tab.id
                        ? `border-${tab.color}-500 text-${tab.color}-600 bg-${tab.color}-50`
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                    }`}
                    onClick={() => setActiveTab(tab.id)}
                  >
                    <Icon className="w-5 h-5 mr-2" />
                    {tab.label}
                    {tab.id === "sla" && contract.slaRules?.length > 0 && (
                      <span className="ml-2 bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded-full font-semibold">
                        {contract.slaRules.length}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === "details" && (
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100">
                <h3 className="text-xl font-semibold text-blue-800 mb-4 flex items-center">
                  <BuildingOfficeIcon className="w-6 h-6 mr-3 text-blue-600" />
                  Contract Details
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { label: "Contract ID", value: contract.contractId },
                    {
                      label: "Company",
                      value: contract.companyName || "Unknown Company",
                    },
                    {
                      label: "Project Location",
                      value: contract.projectLocation || "N/A",
                    },
                    { label: "Project Type", value: contract.projectType },
                    {
                      label: "Start Date",
                      value: contract.startDate
                        ? new Date(contract.startDate).toLocaleDateString()
                        : "N/A",
                    },
                    {
                      label: "End Date",
                      value: contract.endDate
                        ? new Date(contract.endDate).toLocaleDateString()
                        : "N/A",
                    },
                    { label: "Status", value: contract.status || "N/A" },
                    {
                      label: "Created At",
                      value: contract.createdAt
                        ? new Date(contract.createdAt).toLocaleString()
                        : "N/A",
                    },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
                    >
                      <label className="block text-sm font-semibold text-gray-700">
                        {item.label}
                      </label>
                      <p className="mt-1 text-gray-800">{item.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "services" && (
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border border-green-100">
                <h3 className="text-xl font-semibold text-green-800 mb-4 flex items-center">
                  <CogIcon className="w-6 h-6 mr-3 text-green-600" />
                  Services ({contract.services?.length || 0})
                </h3>
                {contract.services && contract.services.length > 0 ? (
                  <div className="grid gap-4">
                    {contract.services.map((service, serviceIndex) => (
                      <div
                        key={
                          service.contractServiceId ||
                          `service-${service.serviceId}-${serviceIndex}`
                        }
                        className="bg-white rounded-lg shadow-md border border-gray-200 p-4 hover:shadow-lg transition-shadow"
                      >
                        <div className="flex items-center justify-between">
                          <h4 className="text-md font-semibold text-green-800 flex items-center">
                            <span className="bg-green-200 p-2 rounded-lg mr-2">
                              🔧
                            </span>
                            {service.serviceName || "N/A"}
                          </h4>
                          <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                            {service.subServices?.length || 0} Sub-Services
                          </span>
                        </div>
                        {service.subServices?.length > 0 && (
                          <div className="mt-3 space-y-3">
                            {service.subServices.map(
                              (subService, subServiceIndex) => (
                                <div
                                  key={
                                    subService.contractSubServiceId ||
                                    `subService-${subService.subServiceId}-${subServiceIndex}`
                                  }
                                  className="bg-gray-50 p-3 rounded-lg border border-gray-200"
                                >
                                  <div className="flex items-center justify-between">
                                    <p className="text-sm text-gray-700">
                                      <span className="bg-gray-200 p-1 rounded mr-2">
                                        🔹
                                      </span>
                                      {subService.subServiceName || "N/A"}
                                    </p>
                                    <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">
                                      {subService.serviceScopes?.length || 0}{" "}
                                      Scopes
                                    </span>
                                  </div>
                                  {subService.serviceScopes?.length > 0 && (
                                    <div className="mt-2 space-y-2">
                                      {subService.serviceScopes.map(
                                        (scope, scopeIndex) => (
                                          <div
                                            key={
                                              scope.contractScopeId ||
                                              `scope-${scopeIndex}`
                                            }
                                            className="bg-blue-50 p-2 rounded-md border border-blue-200 text-sm text-blue-800"
                                          >
                                            <span className="bg-blue-200 p-1 rounded mr-2">
                                              🎯
                                            </span>
                                            {scope.scopeName || "N/A"}
                                          </div>
                                        )
                                      )}
                                    </div>
                                  )}
                                </div>
                              )
                            )}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <div className="bg-gray-100 rounded-lg p-6 max-w-md mx-auto">
                      <InformationCircleIcon className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-gray-600">No services defined.</p>
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === "timings" && (
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-100">
                <h3 className="text-xl font-semibold text-purple-800 mb-4 flex items-center">
                  <ClockIcon className="w-6 h-6 mr-3 text-purple-600" />
                  Employee Timings ({contract.employeeTimings?.length || 0})
                </h3>
                {contract.employeeTimings &&
                contract.employeeTimings.length > 0 ? (
                  <div className="grid gap-4">
                    {contract.employeeTimings.map((timing, index) => (
                      <div
                        key={index}
                        className="bg-white p-4 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow grid grid-cols-1 sm:grid-cols-3 gap-4"
                      >
                        <div className="flex items-center">
                          <div className="bg-purple-100 p-2 rounded-lg mr-3">
                            <span className="text-purple-600 font-semibold">
                              {timing.dayOfWeek.charAt(0)}
                            </span>
                          </div>
                          <div>
                            <p className="font-semibold text-gray-800">
                              {timing.dayOfWeek}
                            </p>
                            <p className="text-xs text-gray-500">
                              {timing.dutyStartTime === "00:00:00" &&
                              timing.dutyEndTime === "00:00:00"
                                ? "Day Off"
                                : "Working Day"}
                            </p>
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-gray-700">
                            Start Time
                          </label>
                          <p className="bg-gray-50 p-2 rounded-md text-gray-800">
                            {timing.dutyStartTime}
                          </p>
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-gray-700">
                            End Time
                          </label>
                          <p className="bg-gray-50 p-2 rounded-md text-gray-800">
                            {timing.dutyEndTime}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <div className="bg-gray-100 rounded-lg p-6 max-w-md mx-auto">
                      <InformationCircleIcon className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-gray-600">No timings defined.</p>
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === "sla" && (
              <div className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-xl p-6 border border-orange-100">
                <h3 className="text-xl font-semibold text-orange-800 mb-4 flex items-center">
                  <ChartBarIcon className="w-6 h-6 mr-3 text-orange-600" />
                  SLA Rules ({contract.slaRules?.length || 0})
                </h3>
                {contract.slaRules && contract.slaRules.length > 0 ? (
                  <div className="space-y-4">
                    {contract.services.flatMap((service, serviceIndex) =>
                      service.subServices.flatMap(
                        (subService, subServiceIndex) =>
                          subService.serviceScopes.map((scope, scopeIndex) => {
                            const scopeRules = contract.slaRules.filter(
                              (rule) =>
                                rule.scopeId?.toString() ===
                                scope.contractScopeId?.toString()
                            );

                            if (!scopeRules.length) return null;

                            // Sort rules by RM → CM → PM
                            const sortedRules = [...scopeRules].sort((a, b) => {
                              if (a.slaTypeId === 3 && b.slaTypeId !== 3)
                                return -1;
                              if (a.slaTypeId !== 3 && b.slaTypeId === 3)
                                return 1;
                              if (a.slaTypeId === 1 && b.slaTypeId === 2)
                                return -1;
                              if (a.slaTypeId === 2 && b.slaTypeId === 1)
                                return 1;
                              return 0;
                            });

                            return (
                              <div
                                key={`${serviceIndex}-${subServiceIndex}-${scopeIndex}`}
                                className="bg-white rounded-lg shadow-md border border-gray-200"
                              >
                                <button
                                  onClick={() =>
                                    toggleScope(scope.contractScopeId)
                                  }
                                  className="w-full bg-gradient-to-r from-indigo-100 to-purple-100 p-4 flex justify-between items-center hover:from-indigo-200 hover:to-purple-200 transition-all"
                                >
                                  <div className="flex items-center">
                                    <span className="bg-indigo-200 p-2 rounded-lg mr-2 text-indigo-800">
                                      🎯
                                    </span>
                                    <div className="text-left">
                                      <h5 className="text-md font-semibold text-indigo-800">
                                        {scope.scopeName || "Unnamed Scope"}
                                      </h5>
                                      <p className="text-xs text-indigo-600">
                                        {service.serviceName || "Unknown"} →{" "}
                                        {subService.subServiceName || "Unknown"}
                                      </p>
                                    </div>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <span className="bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded-full">
                                      {scopeRules.length} Rules
                                    </span>
                                    {expandedScopes[scope.contractScopeId] ? (
                                      <ChevronUpIcon className="h-5 w-5 text-indigo-600" />
                                    ) : (
                                      <ChevronDownIcon className="h-5 w-5 text-indigo-600" />
                                    )}
                                  </div>
                                </button>
                                {expandedScopes[scope.contractScopeId] && (
                                  <div className="p-4 space-y-3">
                                    {sortedRules.map((rule, ruleIndex) => {
                                      // Determine colors based on SLA type
                                      let typeBgColor = "bg-blue-100";
                                      let typeTextColor = "text-blue-800";
                                      let priorityBgColor = "bg-purple-100";
                                      let priorityTextColor = "text-purple-800";
                                      let cardBorderColor = "border-blue-400";
                                      let cardBgColor =
                                        "from-gray-50 to-blue-50";

                                      if (rule.slaTypeId === 3) {
                                        // RM
                                        typeBgColor = "bg-red-100";
                                        typeTextColor = "text-red-800";
                                        priorityBgColor = "bg-orange-100";
                                        priorityTextColor = "text-orange-800";
                                        cardBorderColor = "border-red-400";
                                        cardBgColor = "from-gray-50 to-red-50";
                                      } else if (rule.slaTypeId === 2) {
                                        // PM
                                        typeBgColor = "bg-green-100";
                                        typeTextColor = "text-green-800";
                                        priorityBgColor = "bg-teal-100";
                                        priorityTextColor = "text-teal-800";
                                        cardBorderColor = "border-green-400";
                                        cardBgColor =
                                          "from-gray-50 to-green-50";
                                      }

                                      return (
                                        <div
                                          key={
                                            rule.ruleId ||
                                            `slaRule-${ruleIndex}`
                                          }
                                          className={`bg-gradient-to-r ${cardBgColor} p-4 rounded-md border-l-4 ${cardBorderColor} shadow-sm hover:shadow-md transition-shadow`}
                                        >
                                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm">
                                            <div>
                                              <label className="block text-xs font-semibold text-gray-700">
                                                SLA Type
                                              </label>
                                              <span
                                                className={`${typeBgColor} ${typeTextColor} px-2 py-1 rounded-full text-xs font-medium`}
                                              >
                                                {rule.slaTypeName}
                                              </span>
                                            </div>
                                            <div>
                                              <label className="block text-xs font-semibold text-gray-700">
                                                Priority
                                              </label>
                                              <span
                                                className={`${priorityBgColor} ${priorityTextColor} px-2 py-1 rounded-full text-xs font-medium`}
                                              >
                                                {rule.priorityName}
                                              </span>
                                            </div>
                                            <div>
                                              <label className="block text-xs font-semibold text-gray-700">
                                                Response
                                              </label>
                                              <span className="bg-gray-50 px-2 py-1 rounded-md text-gray-800 text-xs">
                                                {rule.responseTimeHours ||
                                                  "N/A"}{" "}
                                                hrs
                                              </span>
                                            </div>
                                            <div>
                                              <label className="block text-xs font-semibold text-gray-700">
                                                Resolution
                                              </label>
                                              <span className="bg-gray-50 px-2 py-1 rounded-md text-gray-800 text-xs">
                                                {rule.resolutionTimeHours ||
                                                  "N/A"}{" "}
                                                hrs
                                              </span>
                                            </div>
                                          </div>
                                        </div>
                                      );
                                    })}
                                  </div>
                                )}
                              </div>
                            );
                          })
                      )
                    )}
                    {contract.slaRules.some((rule) => !rule.scopeId) && (
                      <div className="bg-white rounded-lg shadow-md border border-red-200 p-4">
                        <div className="flex items-center mb-3">
                          <InformationCircleIcon className="h-5 w-5 text-red-600 mr-2" />
                          <h5 className="text-md font-semibold text-red-800">
                            Unassociated SLA Rules
                          </h5>
                        </div>
                        <div className="space-y-3">
                          {contract.slaRules
                            .filter((rule) => !rule.scopeId)
                            .map((rule, ruleIndex) => {
                              let typeBgColor = "bg-blue-100";
                              let typeTextColor = "text-blue-800";
                              let priorityBgColor = "bg-purple-100";
                              let priorityTextColor = "text-purple-800";
                              let cardBorderColor = "border-blue-400";
                              let cardBgColor = "from-gray-50 to-blue-50";

                              if (rule.slaTypeId === 3) {
                                typeBgColor = "bg-red-100";
                                typeTextColor = "text-red-800";
                                priorityBgColor = "bg-orange-100";
                                priorityTextColor = "text-orange-800";
                                cardBorderColor = "border-red-400";
                                cardBgColor = "from-gray-50 to-red-50";
                              } else if (rule.slaTypeId === 2) {
                                typeBgColor = "bg-green-100";
                                typeTextColor = "text-green-800";
                                priorityBgColor = "bg-teal-100";
                                priorityTextColor = "text-teal-800";
                                cardBorderColor = "border-green-400";
                                cardBgColor = "from-gray-50 to-green-50";
                              }

                              return (
                                <div
                                  key={
                                    rule.ruleId ||
                                    `unassociated-slaRule-${ruleIndex}`
                                  }
                                  className={`bg-gradient-to-r ${cardBgColor} p-4 rounded-md border-l-4 ${cardBorderColor} shadow-sm hover:shadow-md transition-shadow`}
                                >
                                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm">
                                    <div>
                                      <label className="block text-xs font-semibold text-gray-700">
                                        SLA Type
                                      </label>
                                      <span
                                        className={`${typeBgColor} ${typeTextColor} px-2 py-1 rounded-full text-xs font-medium`}
                                      >
                                        {rule.slaTypeName}
                                      </span>
                                    </div>
                                    <div>
                                      <label className="block text-xs font-semibold text-gray-700">
                                        Priority
                                      </label>
                                      <span
                                        className={`${priorityBgColor} ${priorityTextColor} px-2 py-1 rounded-full text-xs font-medium`}
                                      >
                                        {rule.priorityName}
                                      </span>
                                    </div>
                                    <div>
                                      <label className="block text-xs font-semibold text-gray-700">
                                        Response
                                      </label>
                                      <span className="bg-gray-50 px-2 py-1 rounded-md text-gray-800 text-xs">
                                        {rule.responseTimeHours || "N/A"} hrs
                                      </span>
                                    </div>
                                    <div>
                                      <label className="block text-xs font-semibold text-gray-700">
                                        Resolution
                                      </label>
                                      <span className="bg-gray-50 px-2 py-1 rounded-md text-gray-800 text-xs">
                                        {rule.resolutionTimeHours || "N/A"} hrs
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              );
                            })}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <div className="bg-gray-100 rounded-lg p-6 max-w-md mx-auto">
                      <InformationCircleIcon className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-gray-600">No SLA rules defined.</p>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContractDetail;
