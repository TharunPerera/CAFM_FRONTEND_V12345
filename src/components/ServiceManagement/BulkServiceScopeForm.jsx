import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import { ServiceContext } from "../../context/ServiceContext";
import { serviceManagementService } from "../../services/serviceManagementService";

const BulkServiceScopeForm = () => {
  const { subServices, addServiceScope } = useContext(ServiceContext);
  const navigate = useNavigate();
  const [serviceScopes, setServiceScopes] = useState([
    { scopeName: "", description: "", subServiceId: "" }, // Changed 'name' to 'scopeName'
  ]);
  const [errors, setErrors] = useState([{}]);
  const [apiError, setApiError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const subServiceOptions = subServices.map((ss) => ({
    value: ss.subServiceId.toString(),
    label: ss.subServiceName,
  }));

  const handleAddRow = () => {
    setServiceScopes([
      ...serviceScopes,
      { scopeName: "", description: "", subServiceId: "" }, // Changed 'name' to 'scopeName'
    ]);
    setErrors([...errors, {}]);
  };

  const handleChange = (index, name, value) => {
    const newServiceScopes = [...serviceScopes];
    newServiceScopes[index][name] = value;
    setServiceScopes(newServiceScopes);
    const newErrors = [...errors];
    newErrors[index] = {
      ...newErrors[index],
      [name]: value
        ? ""
        : `${name === "scopeName" ? "Scope name" : "Sub-service"} is required.`,
    };
    setErrors(newErrors);
    setApiError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError(null);
    const newErrors = serviceScopes.map((sc) => ({
      scopeName: sc.scopeName ? "" : "Scope name is required.", // Changed 'name' to 'scopeName'
      subServiceId: sc.subServiceId ? "" : "Sub-service is required.",
    }));
    setErrors(newErrors);
    if (newErrors.some((e) => e.scopeName || e.subServiceId)) {
      return;
    }
    try {
      const response = await serviceManagementService.createServiceScopesBulk(
        serviceScopes.map((sc) => ({
          scopeName: sc.scopeName, // Changed 'name' to 'scopeName'
          description: sc.description,
          subServiceId: parseInt(sc.subServiceId, 10),
        }))
      );
      response.data.forEach((sc) => addServiceScope(sc));
      setSuccessMessage("Service scopes created successfully!");
      setServiceScopes([{ scopeName: "", description: "", subServiceId: "" }]); // Changed 'name' to 'scopeName'
      setErrors([{}]);
      setTimeout(() => {
        setSuccessMessage(null);
        navigate("/services");
      }, 3000);
    } catch (error) {
      console.error("Bulk create error:", error.response); // Log full error
      if (error.response?.status === 400) {
        const validationErrors =
          error.response.data.errors || error.response.data.message;
        setApiError(
          validationErrors ||
            "Invalid data provided. Please check the form inputs."
        );
      } else if (error.response?.status === 403) {
        setApiError("You do not have permission to create service scopes.");
      } else {
        setApiError(
          error.response?.data?.message || "Failed to create service scopes."
        );
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white rounded-xl shadow-xl">
      <h3 className="text-2xl font-semibold text-gray-900 mb-6">
        Bulk Create Service Scopes
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
        {serviceScopes.map((scope, index) => (
          <div key={index} className="flex space-x-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                Scope Name
                <InformationCircleIcon
                  className="ml-2 h-4 w-4 text-gray-400 cursor-help"
                  title="Enter the scope name"
                />
              </label>
              <input
                type="text"
                value={scope.scopeName} // Changed 'name' to 'scopeName'
                onChange={(e) =>
                  handleChange(index, "scopeName", e.target.value)
                }
                className={`w-full p-3 border ${
                  errors[index]?.scopeName
                    ? "border-red-500"
                    : "border-gray-200"
                } rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors`}
              />
              {errors[index]?.scopeName && (
                <p className="text-red-600 text-sm mt-1">
                  {errors[index].scopeName}
                </p>
              )}
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                Sub-Service
                <InformationCircleIcon
                  className="ml-2 h-4 w-4 text-gray-400 cursor-help"
                  title="Select the parent sub-service"
                />
              </label>
              <Select
                value={
                  subServiceOptions.find(
                    (option) => option.value === scope.subServiceId
                  ) || null
                }
                onChange={(selected) =>
                  handleChange(
                    index,
                    "subServiceId",
                    selected ? selected.value : ""
                  )
                }
                options={subServiceOptions}
                placeholder="Select Sub-Service"
                isClearable
                isSearchable
              />
              {errors[index]?.subServiceId && (
                <p className="text-red-600 text-sm mt-1">
                  {errors[index].subServiceId}
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
                value={scope.description}
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
            Add Another Scope
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            Create Service Scopes
          </button>
        </div>
      </form>
    </div>
  );
};

export default BulkServiceScopeForm;
