import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import { ServiceContext } from "../context/ServiceContext";
import { serviceManagementService } from "../services/serviceManagementService";

const ErrorBoundary = ({ children }) => {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const errorHandler = (error) => {
      console.error("ErrorBoundary caught:", error);
      setHasError(true);
    };
    window.addEventListener("error", errorHandler);
    return () => window.removeEventListener("error", errorHandler);
  }, []);

  if (hasError) {
    return (
      <div className="p-8 text-center">
        <h2 className="text-2xl font-semibold text-red-600">
          Something went wrong.
        </h2>
        <p className="mt-4 text-gray-600">
          Please try refreshing the page or contact support.
        </p>
      </div>
    );
  }
  return children;
};

const ServiceManagement = () => {
  const {
    services,
    fetchData,
    loading,
    error: contextError,
    deleteService,
    deleteSubService,
    deleteServiceScope,
  } = useContext(ServiceContext);
  const [subServices, setSubServices] = useState([]);
  const [serviceScopes, setServiceScopes] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]);
  const [selectedSubServices, setSelectedSubServices] = useState([]);
  const [selectedServiceScopes, setSelectedServiceScopes] = useState([]);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const navigate = useNavigate();

  const serviceOptions = services.map((s) => ({
    value: s.serviceId.toString(),
    label: s.serviceName,
  }));
  const subServiceOptions = subServices.map((ss) => ({
    value: ss.subServiceId.toString(),
    label: ss.subServiceName,
  }));
  const serviceScopeOptions = serviceScopes.map((sc) => ({
    value: sc.scopeId.toString(),
    label: sc.scopeName,
  }));

  // Fetch sub-services when services are selected
  useEffect(() => {
    const fetchSubServices = async () => {
      try {
        setError(null);
        setSubServices([]);
        setSelectedSubServices([]);
        setServiceScopes([]);
        setSelectedServiceScopes([]);
        if (selectedServices.length > 0) {
          const serviceIds = selectedServices.map((s) => parseInt(s.value, 10));
          const res = await serviceManagementService.getSubServicesByServiceIds(
            serviceIds
          );
          setSubServices(res.data || []);
        }
      } catch (err) {
        console.error("Error fetching sub-services:", err);
        setError("Failed to load sub-services.");
      }
    };
    fetchSubServices();
  }, [selectedServices]);

  // Fetch service scopes when sub-services are selected
  useEffect(() => {
    const fetchServiceScopes = async () => {
      try {
        setError(null);
        setServiceScopes([]);
        setSelectedServiceScopes([]);
        if (selectedSubServices.length > 0) {
          const subServiceIds = selectedSubServices.map((ss) =>
            parseInt(ss.value, 10)
          );
          const res =
            await serviceManagementService.getServiceScopesBySubServiceIds(
              subServiceIds
            );
          setServiceScopes(res.data || []);
        }
      } catch (err) {
        console.error("Error fetching service scopes:", err);
        setError("Failed to load service scopes.");
      }
    };
    fetchServiceScopes();
  }, [selectedSubServices]);

  const handleBulkDelete = async (type) => {
    try {
      setError(null);
      if (type === "services" && selectedServices.length) {
        const ids = selectedServices.map((s) => parseInt(s.value, 10));
        await serviceManagementService.deleteServicesBulk(ids);
        for (const id of ids) {
          await deleteService(id);
        }
        setSelectedServices([]);
      } else if (type === "subServices" && selectedSubServices.length) {
        const ids = selectedSubServices.map((ss) => parseInt(ss.value, 10));
        await serviceManagementService.deleteSubServicesBulk(ids);
        for (const id of ids) {
          await deleteSubService(id);
        }
        setSelectedSubServices([]);
      } else if (type === "serviceScopes" && selectedServiceScopes.length) {
        const ids = selectedServiceScopes.map((sc) => parseInt(sc.value, 10));
        await serviceManagementService.deleteServiceScopesBulk(ids);
        for (const id of ids) {
          await deleteServiceScope(id);
        }
        setSelectedServiceScopes([]);
      }
      setSuccessMessage(
        `${type.charAt(0).toUpperCase() + type.slice(1)} deleted successfully!`
      );
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (err) {
      console.error("Bulk delete error:", err);
      setError(
        err.response?.status === 403
          ? "You do not have permission to delete."
          : "Failed to delete items."
      );
    }
  };

  const handleUpdateNavigation = (type, selected) => {
    if (selected && selected.length === 1) {
      if (type === "services") {
        navigate(`/services/edit/${selected[0].value}`);
      } else if (type === "subServices") {
        navigate(`/services/sub-services/edit/${selected[0].value}`);
      } else if (type === "serviceScopes") {
        navigate(`/services/service-scopes/edit/${selected[0].value}`);
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-indigo-600"></div>
      </div>
    );
  }

  if (contextError) {
    return (
      <div className="p-8 text-center">
        <h2 className="text-2xl font-semibold text-red-600">
          Error Loading Data
        </h2>
        <p className="mt-4 text-gray-600">{contextError}</p>
        <button
          onClick={fetchData}
          className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <div className="p-8 max-w-4xl mx-auto bg-white rounded-xl shadow-lg">
        <h2 className="text-3xl font-semibold text-gray-900 mb-8">
          Service Management
        </h2>
        {successMessage && (
          <div className="mb-6 p-4 bg-green-100 text-green-700 rounded-lg text-sm flex items-center">
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
        {error && (
          <div className="mb-6 p-4 bg-red-100 text-red-700 rounded-lg text-sm flex items-center">
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
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            {error}
          </div>
        )}
        <div className="space-y-8">
          {/* Services Management */}
          <div className="p-6 bg-gray-50 rounded-xl">
            <h3 className="text-xl font-medium text-gray-700 mb-4">
              Manage Services
            </h3>
            <Select
              isMulti
              options={serviceOptions}
              value={selectedServices}
              onChange={setSelectedServices}
              className="mb-4"
              placeholder="Select services to update/delete"
              isSearchable
            />
            <div className="flex space-x-4">
              <button
                onClick={() =>
                  handleUpdateNavigation("services", selectedServices)
                }
                disabled={selectedServices.length !== 1}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50"
              >
                Update Selected
              </button>
              <button
                onClick={() => handleBulkDelete("services")}
                disabled={!selectedServices.length}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50"
              >
                Delete Selected
              </button>
              <button
                onClick={() => navigate("/services/create")}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                Create Service
              </button>
              <button
                onClick={() => navigate("/services/bulk-create")}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Bulk Create
              </button>
              <button
                onClick={() => navigate("/services/bulk-update")}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
              >
                Bulk Update
              </button>
            </div>
          </div>

          {/* Sub-Services Management */}
          <div className="p-6 bg-gray-50 rounded-xl">
            <h3 className="text-xl font-medium text-gray-700 mb-4">
              Manage Sub-Services
            </h3>
            <Select
              isMulti
              options={subServiceOptions}
              value={selectedSubServices}
              onChange={setSelectedSubServices}
              className="mb-4"
              placeholder={
                selectedServices.length === 0
                  ? "Select one or more services first"
                  : "Select sub-services to update/delete"
              }
              isSearchable
              isDisabled={selectedServices.length === 0}
            />
            <div className="flex space-x-4">
              <button
                onClick={() =>
                  handleUpdateNavigation("subServices", selectedSubServices)
                }
                disabled={selectedSubServices.length !== 1}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50"
              >
                Update Selected
              </button>
              <button
                onClick={() => handleBulkDelete("subServices")}
                disabled={!selectedSubServices.length}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50"
              >
                Delete Selected
              </button>
              <button
                onClick={() => navigate("/services/sub-services/create")}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                Create Sub-Service
              </button>
              <button
                onClick={() => navigate("/services/sub-services/bulk-create")}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Bulk Create
              </button>
              <button
                onClick={() => navigate("/services/sub-services/bulk-update")}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
              >
                Bulk Update
              </button>
            </div>
          </div>

          {/* Service Scopes Management */}
          <div className="p-6 bg-gray-50 rounded-xl">
            <h3 className="text-xl font-medium text-gray-700 mb-4">
              Manage Service Scopes
            </h3>
            <Select
              isMulti
              options={serviceScopeOptions}
              value={selectedServiceScopes}
              onChange={setSelectedServiceScopes}
              className="mb-4"
              placeholder={
                selectedSubServices.length === 0
                  ? "Select one or more sub-services first"
                  : "Select service scopes to update/delete"
              }
              isSearchable
              isDisabled={selectedSubServices.length === 0}
            />
            <div className="flex space-x-4">
              <button
                onClick={() =>
                  handleUpdateNavigation("serviceScopes", selectedServiceScopes)
                }
                disabled={selectedServiceScopes.length !== 1}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50"
              >
                Update Selected
              </button>
              <button
                onClick={() => handleBulkDelete("serviceScopes")}
                disabled={!selectedServiceScopes.length}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50"
              >
                Delete Selected
              </button>
              <button
                onClick={() => navigate("/services/service-scopes/create")}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                Create Service Scope
              </button>
              <button
                onClick={() => navigate("/services/service-scopes/bulk-create")}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Bulk Create
              </button>
              <button
                onClick={() => navigate("/services/service-scopes/bulk-update")}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
              >
                Bulk Update
              </button>
            </div>
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default ServiceManagement;
