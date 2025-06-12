import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import { ServiceContext } from "../../context/ServiceContext";
import { serviceManagementService } from "../../services/serviceManagementService";

const BulkServiceForm = () => {
  const { addService } = useContext(ServiceContext);
  const navigate = useNavigate();
  const [services, setServices] = useState([
    { serviceName: "", description: "" },
  ]);
  const [errors, setErrors] = useState([{}]);
  const [apiError, setApiError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const handleAddRow = () => {
    setServices([...services, { serviceName: "", description: "" }]);
    setErrors([...errors, {}]);
  };

  const handleChange = (index, name, value) => {
    const newServices = [...services];
    newServices[index][name] = value;
    setServices(newServices);
    const newErrors = [...errors];
    newErrors[index] = {
      ...newErrors[index],
      [name]: value ? "" : `${name} is required.`,
    };
    setErrors(newErrors);
    setApiError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError(null);
    const newErrors = services.map((s) => ({
      serviceName: s.serviceName ? "" : "Service name is required.",
    }));
    setErrors(newErrors);
    if (newErrors.some((e) => e.serviceName)) {
      return;
    }
    try {
      const response = await serviceManagementService.createServicesBulk(
        services
      );
      response.data.forEach((s) => addService(s));
      setSuccessMessage("Services created successfully!");
      setServices([{ serviceName: "", description: "" }]);
      setErrors([{}]);
      setTimeout(() => {
        setSuccessMessage(null);
        navigate("/services");
      }, 3000);
    } catch (error) {
      setApiError(
        error.response?.data?.message || "Failed to create services."
      );
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white rounded-xl shadow-xl">
      <h3 className="text-2xl font-semibold text-gray-900 mb-6">
        Bulk Create Services
      </h3>
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
      {apiError && (
        <div className="mb-6 p-4 bg-red-100 text-red-700 rounded-lg text-sm flex items-center">
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeWidth="2"
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          {apiError}
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-6">
        {services.map((service, index) => (
          <div key={index} className="flex space-x-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                Service Name
                <InformationCircleIcon
                  className="ml-2 h-4 w-4 text-gray-400 cursor-help"
                  title="Enter the service name"
                />
              </label>
              <input
                type="text"
                value={service.serviceName}
                onChange={(e) =>
                  handleChange(index, "serviceName", e.target.value)
                }
                className={`w-full p-3 border ${
                  errors[index]?.serviceName
                    ? "border-red-500"
                    : "border-gray-200"
                } rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors`}
              />
              {errors[index]?.serviceName && (
                <p className="text-red-600 text-sm mt-1">
                  {errors[index].serviceName}
                </p>
              )}
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                Description
                <InformationCircleIcon
                  className="ml-2 h-4 w-4 text-gray-400 cursor-help"
                  title="Optional description"
                />
              </label>
              <input
                type="text"
                value={service.description}
                onChange={(e) =>
                  handleChange(index, "description", e.target.value)
                }
                className="w-full p-3 border rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
              />
            </div>
          </div>
        ))}
        <div className="flex space-x-4">
          <button
            type="button"
            onClick={handleAddRow}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Add Another Service
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            Create Services
          </button>
        </div>
      </form>
    </div>
  );
};

export default BulkServiceForm;
