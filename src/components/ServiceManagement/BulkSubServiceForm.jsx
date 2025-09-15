import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import { ServiceContext } from "../../context/ServiceContext";
import { serviceManagementService } from "../../services/serviceManagementService";

const BulkSubServiceForm = () => {
  const { services, addSubService } = useContext(ServiceContext);
  const navigate = useNavigate();
  const [subServices, setSubServices] = useState([
    { subServiceName: "", description: "", serviceId: "" },
  ]);
  const [errors, setErrors] = useState([{}]);
  const [apiError, setApiError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const serviceOptions = services.map((s) => ({
    value: s.serviceId.toString(),
    label: s.serviceName,
  }));

  const handleAddRow = () => {
    setSubServices([
      ...subServices,
      { subServiceName: "", description: "", serviceId: "" },
    ]);
    setErrors([...errors, {}]);
  };

  const handleChange = (index, name, value) => {
    const newSubServices = [...subServices];
    newSubServices[index][name] = value;
    setSubServices(newSubServices);
    const newErrors = [...errors];
    newErrors[index] = {
      ...newErrors[index],
      [name]: value
        ? ""
        : `${
            name === "subServiceName" ? "Sub-service name" : "Service"
          } is required.`,
    };
    setErrors(newErrors);
    setApiError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError(null);
    const newErrors = subServices.map((ss) => ({
      subServiceName: ss.subServiceName ? "" : "Sub-service name is required.",
      serviceId: ss.serviceId ? "" : "Service is required.",
    }));
    setErrors(newErrors);
    if (newErrors.some((e) => e.subServiceName || e.serviceId)) {
      return;
    }
    try {
      const response = await serviceManagementService.createSubServicesBulk(
        subServices.map((ss) => ({
          subServiceName: ss.subServiceName,
          description: ss.description,
          serviceId: parseInt(ss.serviceId, 10),
        }))
      );
      response.data.forEach((ss) => addSubService(ss));
      setSuccessMessage("Sub-services created successfully!");
      setSubServices([{ subServiceName: "", description: "", serviceId: "" }]);
      setErrors([{}]);
      setTimeout(() => {
        setSuccessMessage(null);
        navigate("/services");
      }, 3000);
    } catch (error) {
      setApiError(
        error.response?.data?.message || "Failed to create sub-services."
      );
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white rounded-xl shadow-xl">
      <h3 className="text-2xl font-semibold text-gray-900 mb-6">
        Bulk Create Sub-Services
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
        {subServices.map((subService, index) => (
          <div key={index} className="flex space-x-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                Sub-Service Name
                <InformationCircleIcon
                  className="ml-2 h-4 w-4 text-gray-400 cursor-help"
                  title="Enter the sub-service name"
                />
              </label>
              <input
                type="text"
                value={subService.subServiceName}
                onChange={(e) =>
                  handleChange(index, "subServiceName", e.target.value)
                }
                className={`w-full p-3 border ${
                  errors[index]?.subServiceName
                    ? "border-red-500"
                    : "border-gray-200"
                } rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors`}
              />
              {errors[index]?.subServiceName && (
                <p className="text-red-600 text-sm mt-1">
                  {errors[index].subServiceName}
                </p>
              )}
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                Service
                <InformationCircleIcon
                  className="ml-2 h-4 w-4 text-gray-400 cursor-help"
                  title="Select the parent service"
                />
              </label>
              <Select
                value={
                  serviceOptions.find(
                    (option) => option.value === subService.serviceId
                  ) || null
                }
                onChange={(selected) =>
                  handleChange(
                    index,
                    "serviceId",
                    selected ? selected.value : ""
                  )
                }
                options={serviceOptions}
                placeholder="Select Service"
                isClearable
                isSearchable
              />
              {errors[index]?.serviceId && (
                <p className="text-red-600 text-sm mt-1">
                  {errors[index].serviceId}
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
                value={subService.description}
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
            Add Another Sub-Service
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            Create Sub-Services
          </button>
        </div>
      </form>
    </div>
  );
};

export default BulkSubServiceForm;
