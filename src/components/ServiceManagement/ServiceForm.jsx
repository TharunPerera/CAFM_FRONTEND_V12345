// import { useState } from "react";
// import { InformationCircleIcon } from "@heroicons/react/24/outline";

// const ServiceForm = ({ onSubmit, initialData = {}, isEdit = false }) => {
//   const [formData, setFormData] = useState({
//     serviceName: initialData.serviceName || "",
//     description: initialData.description || "",
//   });
//   const [errors, setErrors] = useState({});
//   const [apiError, setApiError] = useState(null);

//   const validateField = (name, value) => {
//     const errors = {};
//     if (name === "serviceName" && !value)
//       errors.serviceName = "Service name is required.";
//     return errors;
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//     setErrors((prev) => ({ ...prev, ...validateField(name, value) }));
//     setApiError(null);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setApiError(null);
//     const fieldErrors = validateField("serviceName", formData.serviceName);
//     if (Object.keys(fieldErrors).length) {
//       setErrors(fieldErrors);
//       return;
//     }
//     try {
//       await onSubmit(formData);
//       if (!isEdit) {
//         setFormData({ serviceName: "", description: "" });
//       }
//       setErrors({});
//     } catch (error) {
//       setApiError(
//         error.response?.data?.message ||
//           "Failed to save service. Please try again."
//       );
//     }
//   };

//   return (
//     <div className="max-w-2xl mx-auto p-8 bg-white rounded-2xl shadow-xl">
//       <h3 className="text-2xl font-semibold text-gray-900 mb-6">
//         {isEdit ? "Update Service" : "Create Service"}
//       </h3>
//       {apiError && (
//         <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-lg text-sm flex items-center">
//           <svg
//             className="w-5 h-5 mr-2"
//             fill="none"
//             stroke="currentColor"
//             viewBox="0 0 24 24"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth="2"
//               d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
//             />
//           </svg>
//           {apiError}
//         </div>
//       )}
//       <form onSubmit={handleSubmit} className="space-y-6">
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
//             Service Name
//             <InformationCircleIcon
//               className="ml-2 h-4 w-4 text-gray-400 cursor-help"
//               title="Enter the name of the service"
//             />
//           </label>
//           <input
//             type="text"
//             name="serviceName"
//             value={formData.serviceName}
//             onChange={handleChange}
//             className={`w-full p-3 border ${
//               errors.serviceName ? "border-red-500" : "border-gray-200"
//             } rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors`}
//             required
//           />
//           {errors.serviceName && (
//             <p className="text-red-600 text-sm mt-1">{errors.serviceName}</p>
//           )}
//         </div>
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
//             Description
//             <InformationCircleIcon
//               className="ml-2 h-4 w-4 text-gray-400 cursor-help"
//               title="Optional: Provide a description of the service"
//             />
//           </label>
//           <textarea
//             name="description"
//             value={formData.description}
//             onChange={handleChange}
//             className="w-full p-3 border border-gray-200 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
//             rows="4"
//           />
//         </div>
//         <button
//           type="submit"
//           className="w-full bg-indigo-600 text-white p-3 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
//         >
//           {isEdit ? "Update Service" : "Create Service"}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default ServiceForm;

import { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import { ServiceContext } from "../../context/ServiceContext";
import { serviceManagementService } from "../../services/serviceManagementService";

const ServiceForm = ({ isEdit = false }) => {
  const { addService, updateService } = useContext(ServiceContext);
  const { serviceId } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    serviceName: "",
    description: "",
  });
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState(null);
  const [loading, setLoading] = useState(isEdit);

  useEffect(() => {
    if (isEdit && serviceId) {
      const fetchService = async () => {
        try {
          const response = await serviceManagementService.getServices();
          const service = response.data.find(
            (s) => s.serviceId === parseInt(serviceId, 10)
          );
          if (service) {
            setFormData({
              serviceName: service.serviceName,
              description: service.description || "",
            });
          } else {
            setApiError("Service not found.");
          }
        } catch (err) {
          setApiError("Failed to load service.");
        } finally {
          setLoading(false);
        }
      };
      fetchService();
    }
  }, [isEdit, serviceId]);

  const validateField = (name, value) => {
    const errors = {};
    if (name === "serviceName" && !value)
      errors.serviceName = "Service name is required.";
    return errors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors((prev) => ({ ...prev, ...validateField(name, value) }));
    setApiError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError(null);
    const fieldErrors = validateField("serviceName", formData.serviceName);
    if (Object.keys(fieldErrors).length) {
      setErrors(fieldErrors);
      return;
    }
    try {
      if (isEdit) {
        const response = await serviceManagementService.updateService(
          serviceId,
          formData
        );
        updateService(response.data);
      } else {
        const response = await serviceManagementService.createService(formData);
        addService(response.data);
      }
      navigate("/services");
    } catch (error) {
      setApiError(
        error.response?.data?.message ||
          `Failed to ${isEdit ? "update" : "create"} service.`
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
        {isEdit ? "Update Service" : "Create Service"}
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
            Service Name
            <InformationCircleIcon
              className="ml-2 h-4 w-4 text-gray-400 cursor-help"
              title="Enter the name of the service"
            />
          </label>
          <input
            type="text"
            name="serviceName"
            value={formData.serviceName}
            onChange={handleChange}
            className={`w-full p-3 border ${
              errors.serviceName ? "border-red-500" : "border-gray-200"
            } rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors`}
            required
          />
          {errors.serviceName && (
            <p className="text-red-600 text-sm mt-1">{errors.serviceName}</p>
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
            onChange={handleChange}
            className="w-full p-3 border border-gray-200 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
            rows="4"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white p-3 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
        >
          {isEdit ? "Update Service" : "Create Service"}
        </button>
      </form>
    </div>
  );
};

export default ServiceForm;
