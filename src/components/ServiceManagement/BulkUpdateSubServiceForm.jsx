import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import { ServiceContext } from "../../context/ServiceContext";
import { serviceManagementService } from "../../services/serviceManagementService";

const BulkUpdateSubServiceForm = () => {
  const { services, subServices, updateSubService } =
    useContext(ServiceContext);
  const navigate = useNavigate();
  const [selectedSubServices, setSelectedSubServices] = useState([]);
  const [formData, setFormData] = useState([]);
  const [errors, setErrors] = useState([]);
  const [apiError, setApiError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const serviceOptions = services.map((s) => ({
    value: s.serviceId.toString(),
    label: s.serviceName,
  }));

  const subServiceOptions = subServices.map((ss) => ({
    value: ss.subServiceId.toString(),
    label: ss.subServiceName,
  }));

  const handleSelectChange = (selected) => {
    setSelectedSubServices(selected || []);
    setFormData(
      selected
        ? selected.map((ss) => {
            const subService = subServices.find(
              (s) => s.subServiceId.toString() === ss.value
            );
            return {
              subServiceId: ss.value,
              subServiceName: subService?.subServiceName || "",
              description: subService?.description || "",
              serviceId: subService?.serviceId?.toString() || "",
            };
          })
        : []
    );
    setErrors(selected ? selected.map(() => ({})) : []);
  };

  const handleChange = (index, name, value) => {
    const newFormData = [...formData];
    newFormData[index][name] = value;
    setFormData(newFormData);
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
    const newErrors = formData.map((ss) => ({
      subServiceName: ss.subServiceName ? "" : "Sub-service name is required.",
      serviceId: ss.serviceId ? "" : "Service is required.",
    }));
    setErrors(newErrors);
    if (newErrors.some((e) => e.subServiceName || e.serviceId)) {
      return;
    }
    try {
      for (const data of formData) {
        const response = await serviceManagementService.updateSubService(
          data.subServiceId,
          {
            subServiceName: data.subServiceName,
            description: data.description,
            serviceId: parseInt(data.serviceId, 10),
          }
        );
        updateSubService(response.data);
      }
      setSuccessMessage("Sub-services updated successfully!");
      setTimeout(() => {
        setSuccessMessage(null);
        navigate("/services");
      }, 3000);
    } catch (error) {
      setApiError(
        error.response?.data?.message || "Failed to update sub-services."
      );
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white rounded-xl shadow-lg">
      <h3 className="text-2xl font-semibold text-gray-900 mb-6">
        Bulk Update Sub-Services
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
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 8v4m0 4h.01M21 12 a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          {apiError}
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Sub-Services
          </label>
          <Select
            isMulti
            options={subServiceOptions}
            value={selectedSubServices}
            onChange={handleSelectChange}
            className="mb-4"
            placeholder="Select sub-services to update"
            isSearchable
          />
        </div>
        {formData.map((data, index) => (
          <div key={data.subServiceId} className="flex space-x-4">
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
                value={data.subServiceName}
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
                    (option) => option.value === data.serviceId
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
                value={data.description}
                onChange={(e) =>
                  handleChange(index, "description", e.target.value)
                }
                className="w-full p-3 border rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
              />
            </div>
          </div>
        ))}
        <button
          type="submit"
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          disabled={!formData.length}
        >
          Update Sub-Services
        </button>
      </form>
    </div>
  );
};

export default BulkUpdateSubServiceForm;
