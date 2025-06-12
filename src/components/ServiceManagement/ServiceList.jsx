import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { serviceManagementService } from "../../services/serviceManagementService";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";

const ServiceList = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const navigate = useNavigate();

  const fetchServices = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await serviceManagementService.getServices();
      setServices(res.data || []);
    } catch (err) {
      if (err.response?.status === 403) {
        setError(
          "You do not have permission to view services. Please contact an administrator."
        );
      } else {
        setError("Failed to load services. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this service?")) {
      try {
        await serviceManagementService.deleteService(id);
        await fetchServices();
        setSuccessMessage("Service deleted successfully!");
        setTimeout(() => setSuccessMessage(null), 3000);
      } catch (err) {
        setError("Failed to delete service. Please try again.");
      }
    }
  };

  const handleDeleteSubService = async (id) => {
    if (window.confirm("Are you sure you want to delete this sub-service?")) {
      try {
        await serviceManagementService.deleteSubService(id);
        await fetchServices();
        setSuccessMessage("Sub-service deleted successfully!");
        setTimeout(() => setSuccessMessage(null), 3000);
      } catch (err) {
        setError("Failed to delete sub-service. Please try again.");
      }
    }
  };

  const handleDeleteServiceScope = async (id) => {
    if (window.confirm("Are you sure you want to delete this service scope?")) {
      try {
        await serviceManagementService.deleteServiceScope(id);
        await fetchServices();
        setSuccessMessage("Service scope deleted successfully!");
        setTimeout(() => setSuccessMessage(null), 3000);
      } catch (err) {
        setError("Failed to delete service scope. Please try again.");
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="relative">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-indigo-600"></div>
          <span className="absolute inset-0 flex items-center justify-center text-sm text-gray-600">
            Loading...
          </span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-8 bg-red-50 text-red-700 rounded-2xl max-w-3xl mx-auto my-12 shadow-md">
        <p className="text-lg font-medium">{error}</p>
        <button
          onClick={fetchServices}
          className="mt-4 inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <h2 className="text-3xl font-semibold text-gray-900 mb-8">
        Service List
      </h2>
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
      <div className="overflow-x-auto bg-white rounded-2xl shadow-xl">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="py-4 px-6 text-left text-sm font-medium text-gray-700">
                Service Name
              </th>
              <th className="py-4 px-6 text-left text-sm font-medium text-gray-700">
                Description
              </th>
              <th className="py-4 px-6 text-left text-sm font-medium text-gray-700">
                Sub-Services
              </th>
              <th className="py-4 px-6 text-left text-sm font-medium text-gray-700">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {services.map((service) => (
              <tr key={service.serviceId} className="hover:bg-gray-50">
                <td className="py-4 px-6 text-sm text-gray-600">
                  {service.serviceName}
                </td>
                <td className="py-4 px-6 text-sm text-gray-600">
                  {service.description || "N/A"}
                </td>
                <td className="py-4 px-6 text-sm text-gray-600">
                  {service.subServices?.length > 0 ? (
                    <ul className="space-y-2">
                      {service.subServices.map((subService) => (
                        <li key={subService.subServiceId} className="ml-4">
                          <div className="flex justify-between items-center">
                            <span>{subService.subServiceName}</span>
                            <div className="flex space-x-2">
                              <button
                                onClick={() =>
                                  navigate(
                                    `/services/sub-services/edit/${subService.subServiceId}`
                                  )
                                }
                                className="flex items-center px-2 py-1 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                                title="Update Sub-Service"
                              >
                                <PencilIcon className="h-4 w-4 mr-1" />
                              </button>
                              <button
                                onClick={() =>
                                  handleDeleteSubService(
                                    subService.subServiceId
                                  )
                                }
                                className="flex items-center px-2 py-1 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                                title="Delete Sub-Service"
                              >
                                <TrashIcon className="h-4 w-4 mr-1" />
                              </button>
                            </div>
                          </div>
                          {subService.serviceScopes?.length > 0 && (
                            <ul className="ml-4 mt-2 space-y-1">
                              {subService.serviceScopes.map((scope) => (
                                <li
                                  key={scope.scopeId}
                                  className="flex justify-between items-center"
                                >
                                  <span>{scope.scopeName}</span>
                                  <div className="flex space-x-2">
                                    <button
                                      onClick={() =>
                                        navigate(
                                          `/services/service-scopes/edit/${scope.scopeId}`
                                        )
                                      }
                                      className="flex items-center px-2 py-1 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                                      title="Update Service Scope"
                                    >
                                      <PencilIcon className="h-4 w-4 mr-1" />
                                    </button>
                                    <button
                                      onClick={() =>
                                        handleDeleteServiceScope(scope.scopeId)
                                      }
                                      className="flex items-center px-2 py-1 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                                      title="Delete Service Scope"
                                    >
                                      <TrashIcon className="h-4 w-4 mr-1" />
                                    </button>
                                  </div>
                                </li>
                              ))}
                            </ul>
                          )}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    "No sub-services"
                  )}
                </td>
                <td className="py-4 px-6 text-sm text-gray-600">
                  <div className="flex space-x-2">
                    <button
                      onClick={() =>
                        navigate(`/services/edit/${service.serviceId}`)
                      }
                      className="flex items-center px-3 py-1 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                      title="Update Service"
                    >
                      <PencilIcon className="h-4 w-4 mr-1" />
                      Update
                    </button>
                    <button
                      onClick={() => handleDelete(service.serviceId)}
                      className="flex items-center px-3 py-1 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                      title="Delete Service"
                    >
                      <TrashIcon className="h-4 w-4 mr-1" />
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ServiceList;
