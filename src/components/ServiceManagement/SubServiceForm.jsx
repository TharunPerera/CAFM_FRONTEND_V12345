import { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Select from "react-select";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import { ServiceContext } from "../../context/ServiceContext";
import { serviceManagementService } from "../../services/serviceManagementService";

const SubServiceForm = ({ isEdit = false }) => {
  const { services, addSubService, updateSubService } =
    useContext(ServiceContext);
  const { subServiceId } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    subServiceName: "",
    description: "",
    serviceId: "",
  });
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState(null);
  const [loading, setLoading] = useState(isEdit);

  const serviceOptions = services.map((service) => ({
    value: service.serviceId.toString(),
    label: service.serviceName,
  }));

  useEffect(() => {
    if (isEdit && subServiceId) {
      const fetchSubService = async () => {
        try {
          const response = await serviceManagementService.getSubServices();
          const subService = response.data.find(
            (ss) => ss.subServiceId === parseInt(subServiceId, 10)
          );
          if (subService) {
            setFormData({
              subServiceName: subService.subServiceName,
              description: subService.description || "",
              serviceId: subService.serviceId?.toString() || "",
            });
          } else {
            setApiError("Sub-service not found.");
          }
        } catch (err) {
          setApiError("Failed to load sub-service.");
        } finally {
          setLoading(false);
        }
      };
      fetchSubService();
    }
  }, [isEdit, subServiceId]);

  const validateField = (name, value) => {
    const errors = {};
    if (name === "subServiceName" && !value)
      errors.subServiceName = "Sub-service name is required.";
    if (name === "serviceId" && !value)
      errors.serviceId = "Service is required.";
    return errors;
  };

  const handleChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
    setErrors((prev) => ({ ...prev, ...validateField(name, value) }));
    setApiError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError(null);
    const fieldErrors = {
      ...validateField("subServiceName", formData.subServiceName),
      ...validateField("serviceId", formData.serviceId),
    };
    if (Object.keys(fieldErrors).length) {
      setErrors(fieldErrors);
      return;
    }
    try {
      const payload = {
        ...formData,
        serviceId: parseInt(formData.serviceId, 10),
      };
      if (isEdit) {
        const response = await serviceManagementService.updateSubService(
          subServiceId,
          payload
        );
        updateSubService(response.data);
      } else {
        const response = await serviceManagementService.createSubService(
          payload
        );
        addSubService(response.data);
      }
      navigate("/services");
    } catch (error) {
      setApiError(
        error.response?.data?.message ||
          `Failed to ${isEdit ? "update" : "create"} sub-service.`
      );
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-8 bg-white rounded-2xl shadow-xl">
      <h3 className="text-2xl font-semibold text-gray-900 mb-6">
        {isEdit ? "Update Sub-Service" : "Create Sub-Service"}
      </h3>
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
          <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
            Service
            <InformationCircleIcon
              className="ml-2 h-4 w-4 text-gray-400 cursor-help"
              title="Select the parent service"
            />
          </label>
          <Select
            name="serviceId"
            value={
              serviceOptions.find(
                (option) => option.value === formData.serviceId
              ) || null
            }
            onChange={(selected) =>
              handleChange("serviceId", selected ? selected.value : "")
            }
            options={serviceOptions}
            className="basic-single"
            classNamePrefix="select"
            placeholder="Select Service"
            isClearable
            isSearchable
          />
          {errors.serviceId && (
            <p className="text-red-600 text-sm mt-1">{errors.serviceId}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
            Sub-Service Name
            <InformationCircleIcon
              className="ml-2 h-4 w-4 text-gray-400 cursor-help"
              title="Enter the name of the sub-service"
            />
          </label>
          <input
            type="text"
            name="subServiceName"
            value={formData.subServiceName}
            onChange={(e) => handleChange("subServiceName", e.target.value)}
            className={`w-full p-3 border ${
              errors.subServiceName ? "border-red-500" : "border-gray-200"
            } rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors`}
            required
          />
          {errors.subServiceName && (
            <p className="text-red-600 text-sm mt-1">{errors.subServiceName}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
            Description
            <InformationCircleIcon
              className="ml-2 h-4 w-4 text-gray-400 cursor-help"
              title="Optional: Provide a description"
            />
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={(e) => handleChange("description", e.target.value)}
            className="w-full p-3 border border-gray-200 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
            rows="4"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white p-3 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
        >
          {isEdit ? "Update Sub-Service" : "Create Sub-Service"}
        </button>
      </form>
    </div>
  );
};

export default SubServiceForm;
