"use client";
import { useState, useEffect } from "react";
import { Save, Shield, Search, ChevronDown, ChevronUp } from "lucide-react";
import { workRequestService } from "../../services/WorkRequestService";
import { assetService } from "../../services/assetService";
import { contractService } from "../../services/contractService";
import { checklistService } from "../../services/checklistService";
import { toast } from "react-toastify";

const PreventiveMaintenanceForm = ({
  onBack,
  initialAssetIds = [],
  initialContractId,
}) => {
  const [formData, setFormData] = useState({
    assetSchedules: [],
    frequency: "DAYS_30",
    contractId: initialContractId || "",
    reasonComment: "",
    startDate: "",
    endDate: "",
    name: "",
  });
  const [loading, setLoading] = useState(false);
  const [contracts, setContracts] = useState([]);
  const [selectedAssets, setSelectedAssets] = useState([]);
  const [loadingAssets, setLoadingAssets] = useState(false);
  const [serviceScopes, setServiceScopes] = useState({});
  const [checklists, setChecklists] = useState({});
  const [loadingServiceScopes, setLoadingServiceScopes] = useState({});
  const [loadingChecklists, setLoadingChecklists] = useState({});
  const [expandedAssets, setExpandedAssets] = useState({});
  const [assetSearch, setAssetSearch] = useState("");

  const frequencyOptions = [
    { value: "DAYS_1", label: "Every 1 Day" },
    { value: "DAYS_30", label: "Every 30 Days" },
    { value: "DAYS_60", label: "Every 60 Days" },
    { value: "DAYS_90", label: "Every 90 Days" },
    { value: "DAYS_120", label: "Every 120 Days" },
    { value: "DAYS_180", label: "Every 180 Days" },
  ];

  useEffect(() => {
    loadContracts();
  }, []);

  useEffect(() => {
    if (initialAssetIds.length > 0 && formData.contractId) {
      loadSelectedAssets();
    }
  }, [initialAssetIds, formData.contractId]);

  const loadContracts = async () => {
    try {
      const response = await contractService.getAllContracts();
      setContracts(response.data || []);
    } catch (error) {
      console.error("Error loading contracts:", error);
      toast.error("Failed to load contracts");
    }
  };

  const loadSelectedAssets = async () => {
    setLoadingAssets(true);
    try {
      const responses = await Promise.all(
        initialAssetIds.map((id) => assetService.getAssetById(id))
      );
      const assets = responses.map((res) => res.data);
      setSelectedAssets(assets);
      setFormData((prev) => ({
        ...prev,
        assetSchedules: initialAssetIds.map((assetId) => ({
          assetId,
          serviceScopeId: "",
          checklistId: "",
        })),
      }));
      initialAssetIds.forEach(loadServiceScopes);
    } catch (error) {
      console.error("Error loading selected assets:", error);
      toast.error("Failed to load selected assets");
    } finally {
      setLoadingAssets(false);
    }
  };

  const loadServiceScopes = async (assetId) => {
    setLoadingServiceScopes((prev) => ({ ...prev, [assetId]: true }));
    try {
      const response = await assetService.getAssetById(assetId);
      const asset = response.data;
      const allServiceScopes = [];
      if (asset.subServices && asset.subServices.length > 0) {
        asset.subServices.forEach((subService) => {
          if (subService.serviceScopeIds && subService.serviceScopeNames) {
            subService.serviceScopeIds.forEach((scopeId, index) => {
              allServiceScopes.push({
                scopeId: scopeId,
                scopeName: subService.serviceScopeNames[index],
                subServiceName: subService.subServiceName,
              });
            });
          }
        });
      }
      setServiceScopes((prev) => ({ ...prev, [assetId]: allServiceScopes }));
    } catch (error) {
      console.error(
        `Error loading service scopes for asset ${assetId}:`,
        error
      );
      toast.error(`Failed to load service scopes for asset ${assetId}`);
    } finally {
      setLoadingServiceScopes((prev) => ({ ...prev, [assetId]: false }));
    }
  };

  const loadChecklists = async (assetId, serviceScopeId) => {
    setLoadingChecklists((prev) => ({ ...prev, [assetId]: true }));
    try {
      const response = await checklistService.getChecklistsByServiceScope(
        serviceScopeId
      );
      setChecklists((prev) => ({ ...prev, [assetId]: response.data || [] }));
    } catch (error) {
      console.error(
        `Error loading checklists for service scope ${serviceScopeId}:`,
        error
      );
      toast.error(`Failed to load checklists for asset ${assetId}`);
    } finally {
      setLoadingChecklists((prev) => ({ ...prev, [assetId]: false }));
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleServiceScopeChange = (assetId, serviceScopeId) => {
    setFormData((prev) => ({
      ...prev,
      assetSchedules: prev.assetSchedules.map((as) =>
        as.assetId === assetId ? { ...as, serviceScopeId, checklistId: "" } : as
      ),
    }));
    if (serviceScopeId) {
      loadChecklists(assetId, serviceScopeId);
    } else {
      setChecklists((prev) => ({ ...prev, [assetId]: [] }));
    }
  };

  const handleChecklistChange = (assetId, checklistId) => {
    setFormData((prev) => ({
      ...prev,
      assetSchedules: prev.assetSchedules.map((as) =>
        as.assetId === assetId ? { ...as, checklistId } : as
      ),
    }));
  };

  const handleBulkServiceScopeChange = (serviceScopeId) => {
    setFormData((prev) => ({
      ...prev,
      assetSchedules: prev.assetSchedules.map((as) => ({
        ...as,
        serviceScopeId,
        checklistId: "",
      })),
    }));
    selectedAssets.forEach((asset) => {
      if (serviceScopeId) {
        loadChecklists(asset.assetId, serviceScopeId);
      } else {
        setChecklists((prev) => ({ ...prev, [asset.assetId]: [] }));
      }
    });
  };

  const handleBulkChecklistChange = (checklistId) => {
    setFormData((prev) => ({
      ...prev,
      assetSchedules: prev.assetSchedules.map((as) => ({
        ...as,
        checklistId,
      })),
    }));
  };

  const toggleAssetExpansion = (assetId) => {
    setExpandedAssets((prev) => ({
      ...prev,
      [assetId]: !prev[assetId],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name) {
      toast.error("Please enter a schedule name");
      return;
    }
    if (!formData.contractId) {
      toast.error("Please select a contract");
      return;
    }
    if (formData.assetSchedules.length === 0) {
      toast.error("Please select at least one asset");
      return;
    }
    if (!formData.startDate || !formData.endDate) {
      toast.error("Please select start and end dates");
      return;
    }
    if (new Date(formData.startDate) >= new Date(formData.endDate)) {
      toast.error("End date must be after start date");
      return;
    }
    for (const assetSchedule of formData.assetSchedules) {
      if (!assetSchedule.serviceScopeId) {
        toast.error(
          `Please select a service scope for asset ID ${assetSchedule.assetId}`
        );
        return;
      }
      if (!assetSchedule.checklistId) {
        toast.error(
          `Please select a checklist for asset ID ${assetSchedule.assetId}`
        );
        return;
      }
    }
    setLoading(true);
    try {
      await workRequestService.createPmSchedule(formData);
      toast.success("Preventive maintenance schedule created successfully");
      setFormData({
        assetSchedules: [],
        frequency: "DAYS_30",
        contractId: "",
        reasonComment: "",
        startDate: "",
        endDate: "",
        name: "",
      });
      setServiceScopes({});
      setChecklists({});
      setSelectedAssets([]);
      onBack();
    } catch (error) {
      console.error("Error creating PM schedule:", error);
      toast.error(
        error.response?.data?.message || "Failed to create PM schedule"
      );
    } finally {
      setLoading(false);
    }
  };

  const filteredAssets = selectedAssets.filter(
    (asset) =>
      asset.assetTag.toLowerCase().includes(assetSearch.toLowerCase()) ||
      asset.assetName.toLowerCase().includes(assetSearch.toLowerCase())
  );

  return (
    <div className="max-w-4xl mx-auto py-8">
      <div className="text-center mb-8">
        <div className="inline-flex p-3 rounded-xl bg-gradient-to-r from-green-500 to-green-600 shadow-md mb-4">
          <Shield className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Preventive Maintenance Work Request
        </h2>
        <p className="text-gray-600">
          Create a preventive maintenance schedule for multiple assets
        </p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Schedule Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Schedule Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              placeholder="Enter schedule name"
              required
            />
          </div>
          {/* Contract Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Contract <span className="text-red-500">*</span>
            </label>
            <select
              name="contractId"
              value={formData.contractId}
              onChange={handleInputChange}
              disabled={!!initialContractId}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 disabled:bg-gray-100"
              required
            >
              <option value="">Select Contract</option>
              {contracts.map((contract) => (
                <option key={contract.contractId} value={contract.contractId}>
                  {contract.contractName}
                </option>
              ))}
            </select>
          </div>
          {/* Frequency */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Frequency <span className="text-red-500">*</span>
            </label>
            <select
              name="frequency"
              value={formData.frequency}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              required
            >
              {frequencyOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          {/* Start Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Start Date <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              required
            />
          </div>
          {/* End Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              End Date <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              name="endDate"
              value={formData.endDate}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              required
            />
          </div>
        </div>
        {/* Reason Comment */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Reason/Comment
          </label>
          <textarea
            name="reasonComment"
            value={formData.reasonComment}
            onChange={handleInputChange}
            rows={3}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
            placeholder="Describe the preventive maintenance plan..."
          />
        </div>
        {/* Selected Assets List */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Selected Assets <span className="text-red-500">*</span>
            </label>
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search assets..."
                  value={assetSearch}
                  onChange={(e) => setAssetSearch(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                />
              </div>
            </div>
          </div>
          <div className="sticky top-0 bg-white z-10 border-b border-gray-300 py-2 mb-2">
            <div className="flex gap-4">
              <select
                onChange={(e) => handleBulkServiceScopeChange(e.target.value)}
                className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              >
                <option value="">Apply Service Scope to All</option>
                {Object.values(serviceScopes)
                  .flat()
                  .filter(
                    (scope, index, self) =>
                      self.findIndex((s) => s.scopeId === scope.scopeId) ===
                      index
                  )
                  .map((scope) => (
                    <option key={scope.scopeId} value={scope.scopeId}>
                      {scope.scopeName} ({scope.subServiceName})
                    </option>
                  ))}
              </select>
              <select
                onChange={(e) => handleBulkChecklistChange(e.target.value)}
                className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              >
                <option value="">Apply Checklist to All</option>
                {Object.values(checklists)
                  .flat()
                  .filter(
                    (checklist, index, self) =>
                      self.findIndex(
                        (c) => c.checklistId === checklist.checklistId
                      ) === index
                  )
                  .map((checklist) => (
                    <option
                      key={checklist.checklistId}
                      value={checklist.checklistId}
                    >
                      {checklist.name}
                    </option>
                  ))}
              </select>
            </div>
          </div>
          {loadingAssets ? (
            <div className="space-y-2">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="p-3 border border-gray-200 rounded-lg animate-pulse"
                >
                  <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-3/4 mb-4"></div>
                  <div className="flex gap-4">
                    <div className="h-8 bg-gray-200 rounded w-1/2"></div>
                    <div className="h-8 bg-gray-200 rounded w-1/2"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : filteredAssets.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              {assetSearch
                ? "No assets match your search"
                : "No assets selected"}
            </div>
          ) : (
            <div className="border border-gray-300 rounded-lg max-h-96 overflow-y-auto">
              {filteredAssets.map((asset) => {
                const assetSchedule =
                  formData.assetSchedules.find(
                    (as) => as.assetId === asset.assetId
                  ) || {};
                const isExpanded = expandedAssets[asset.assetId];
                return (
                  <div
                    key={asset.assetId}
                    className="p-3 border-b border-gray-100 last:border-b-0 hover:bg-gray-50 transition-colors"
                  >
                    <div
                      className="flex justify-between items-center cursor-pointer"
                      onClick={() => toggleAssetExpansion(asset.assetId)}
                    >
                      <div>
                        <div className="font-medium text-gray-900">
                          {asset.assetTag} - {asset.assetName}
                        </div>
                        <div className="text-sm text-gray-500">
                          {asset.categoryName} | {asset.buildingName},{" "}
                          {asset.floorName}, {asset.roomName}
                        </div>
                      </div>
                      {isExpanded ? (
                        <ChevronUp className="w-5 h-5 text-gray-500" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-gray-500" />
                      )}
                    </div>
                    {isExpanded && (
                      <div className="mt-3 flex gap-4">
                        <div className="flex-1">
                          <label className="block text-xs font-medium text-gray-700 mb-1">
                            Service Scope{" "}
                            <span className="text-red-500">*</span>
                          </label>
                          {loadingServiceScopes[asset.assetId] ? (
                            <div className="h-8 bg-gray-200 rounded animate-pulse"></div>
                          ) : (serviceScopes[asset.assetId] || []).length ===
                            0 ? (
                            <div className="text-xs text-gray-600">
                              No service scopes available
                            </div>
                          ) : (
                            <select
                              value={assetSchedule.serviceScopeId || ""}
                              onChange={(e) =>
                                handleServiceScopeChange(
                                  asset.assetId,
                                  e.target.value
                                )
                              }
                              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                            >
                              <option value="">Select Service Scope</option>
                              {(serviceScopes[asset.assetId] || []).map(
                                (scope) => (
                                  <option
                                    key={scope.scopeId}
                                    value={scope.scopeId}
                                  >
                                    {scope.scopeName} ({scope.subServiceName})
                                  </option>
                                )
                              )}
                            </select>
                          )}
                        </div>
                        <div className="flex-1">
                          <label className="block text-xs font-medium text-gray-700 mb-1">
                            Checklist <span className="text-red-500">*</span>
                          </label>
                          {loadingChecklists[asset.assetId] ? (
                            <div className="h-8 bg-gray-200 rounded animate-pulse"></div>
                          ) : (
                            <select
                              value={assetSchedule.checklistId || ""}
                              onChange={(e) =>
                                handleChecklistChange(
                                  asset.assetId,
                                  e.target.value
                                )
                              }
                              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                              disabled={!assetSchedule.serviceScopeId}
                            >
                              <option value="">Select Checklist</option>
                              {(checklists[asset.assetId] || []).map(
                                (checklist) => (
                                  <option
                                    key={checklist.checklistId}
                                    value={checklist.checklistId}
                                  >
                                    {checklist.name}
                                  </option>
                                )
                              )}
                            </select>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
          {formData.assetSchedules.length > 0 && (
            <p className="text-sm text-green-600 mt-2">
              {formData.assetSchedules.length} asset(s) selected
            </p>
          )}
        </div>
        {/* Submit Button */}
        <div className="flex gap-4 pt-6">
          <button
            type="button"
            onClick={onBack}
            className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="flex-1 inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg hover:from-green-700 hover:to-green-800 disabled:opacity-50 transition-all shadow-lg hover:shadow-xl"
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Creating...
              </>
            ) : (
              <>
                <Save className="w-5 h-5 mr-2" />
                Create PM Schedule
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PreventiveMaintenanceForm;
