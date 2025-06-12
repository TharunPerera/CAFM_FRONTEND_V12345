// import { useState, useEffect } from "react";
// import { InformationCircleIcon } from "@heroicons/react/24/outline";
// import { serviceManagementService } from "../../services/serviceManagementService";

// const ServiceScopeForm = ({ onSubmit, initialData = {}, isEdit = false }) => {
//   const [formData, setFormData] = useState({
//     scopeName: initialData.scopeName || "",
//     description: initialData.description || "",
//     subServiceId: initialData.subServiceId?.toString() || "",
//   });
//   const [subServices, setSubServices] = useState([]);
//   const [errors, setErrors] = useState({});
//   const [apiError, setApiError] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchSubServices = async () => {
//       try {
//         setLoading(true);
//         const res = await serviceManagementService.getSubServices();
//         setSubServices(res.data || []);
//       } catch (err) {
//         if (err.response?.status === 403) {
//           setApiError(
//             "You do not have permission to view sub-services. Please contact an administrator."
//           );
//         } else {
//           setApiError("Failed to load sub-services. Please try again.");
//         }
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchSubServices();
//   }, []);

//   const validateField = (name, value) => {
//     const errors = {};
//     if (name === "scopeName" && !value)
//       errors.scopeName = "Scope name is required.";
//     if (name === "subServiceId" && !value)
//       errors.subServiceId = "Sub-service is required.";
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
//     const fieldErrors = {
//       ...validateField("scopeName", formData.scopeName),
//       ...validateField("subServiceId", formData.subServiceId),
//     };
//     if (Object.keys(fieldErrors).length) {
//       setErrors(fieldErrors);
//       return;
//     }
//     try {
//       const payload = {
//         ...formData,
//         subServiceId: parseInt(formData.subServiceId, 10),
//       };
//       await onSubmit(payload);
//       if (!isEdit) {
//         setFormData({ scopeName: "", description: "", subServiceId: "" });
//       }
//       setErrors({});
//     } catch (error) {
//       setApiError(
//         error.response?.data?.message ||
//           "Failed to save service scope. Please try again."
//       );
//     }
//   };

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-64">
//         <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-indigo-600"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-2xl mx-auto p-8 bg-white rounded-2xl shadow-xl">
//       <h3 className="text-2xl font-semibold text-gray-900 mb-6">
//         {isEdit ? "Update Service Scope" : "Create Service Scope"}
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
//             Sub-Service
//             <InformationCircleIcon
//               className="ml-2 h-4 w-4 text-gray-400 cursor-help"
//               title="Select the parent sub-service"
//             />
//           </label>
//           <select
//             name="subServiceId"
//             value={formData.subServiceId}
//             onChange={handleChange}
//             className={`w-full p-3 border ${
//               errors.subServiceId ? "border-red-500" : "border-gray-200"
//             } rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors appearance-none cursor-pointer disabled:bg-gray-100 disabled:cursor-not-allowed`}
//             required
//           >
//             <option value="">Select Sub-Service</option>
//             {subServices.map((subService) => (
//               <option
//                 key={subService.subServiceId}
//                 value={subService.subServiceId.toString()}
//               >
//                 {subService.subServiceName}
//               </option>
//             ))}
//           </select>
//           {errors.subServiceId && (
//             <p className="text-red-600 text-sm mt-1">{errors.subServiceId}</p>
//           )}
//         </div>
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
//             Scope Name
//             <InformationCircleIcon
//               className="ml-2 h-4 w-4 text-gray-400 cursor-help"
//               title="Enter the name of the service scope"
//             />
//           </label>
//           <input
//             type="text"
//             name="scopeName"
//             value={formData.scopeName}
//             onChange={handleChange}
//             className={`w-full p-3 border ${
//               errors.scopeName ? "border-red-500" : "border-gray-200"
//             } rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors`}
//             required
//           />
//           {errors.scopeName && (
//             <p className="text-red-600 text-sm mt-1">{errors.scopeName}</p>
//           )}
//         </div>
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
//             Description
//             <InformationCircleIcon
//               className="ml-2 h-4 w-4 text-gray-400 cursor-help"
//               title="Optional: Provide a description of the service scope"
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
//           {isEdit ? "Update Service Scope" : "Create Service Scope"}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default ServiceScopeForm;

//11111111111
// import { useState, useEffect, useContext } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import Select from "react-select";
// import { InformationCircleIcon } from "@heroicons/react/24/outline";
// import { ServiceContext } from "../../context/ServiceContext";
// import { serviceManagementService } from "../../services/serviceManagementService";

// const ServiceScopeForm = ({ isEdit = false }) => {
//   const { subServices, addServiceScope, updateServiceScope } =
//     useContext(ServiceContext);
//   const { scopeId } = useParams();
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     name: "",
//     description: "",
//     subServiceId: "",
//   });
//   const [errors, setErrors] = useState({});
//   const [apiError, setApiError] = useState(null);
//   const [loading, setLoading] = useState(isEdit);

//   const subServiceOptions = subServices.map((subService) => ({
//     value: subService.subServiceId.toString(),
//     label: subService.subServiceName,
//   }));

//   useEffect(() => {
//     if (isEdit && scopeId) {
//       const fetchServiceScope = async () => {
//         try {
//           const response = await serviceManagementService.getServiceScopes();
//           const scope = response.data.find(
//             (sc) => sc.scopeId === parseInt(scopeId, 10)
//           );
//           if (scope) {
//             setFormData({
//               name: scope.name,
//               description: scope.description || "",
//               subServiceId: scope.subServiceId?.toString() || "",
//             });
//           } else {
//             setApiError("Service scope not found.");
//           }
//         } catch (err) {
//           setApiError("Failed to load service scope.");
//         } finally {
//           setLoading(false);
//         }
//       };
//       fetchServiceScope();
//     }
//   }, [isEdit, scopeId]);

//   const validateField = (name, value) => {
//     const errors = {};
//     if (name === "name" && !value) errors.name = "Scope name is required.";
//     if (name === "subServiceId" && !value)
//       errors.subServiceId = "Sub-service is required.";
//     return errors;
//   };

//   const handleChange = (name, value) => {
//     setFormData({ ...formData, [name]: value });
//     setErrors((prev) => ({ ...prev, ...validateField(name, value) }));
//     setApiError(null);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setApiError(null);
//     const fieldErrors = {
//       ...validateField("name", formData.name),
//       ...validateField("subServiceId", formData.subServiceId),
//     };
//     if (Object.keys(fieldErrors).length) {
//       setErrors(fieldErrors);
//       return;
//     }
//     try {
//       const payload = {
//         ...formData,
//         subServiceId: parseInt(formData.subServiceId, 10),
//       };
//       if (isEdit) {
//         const response = await serviceManagementService.updateServiceScope(
//           scopeId,
//           payload
//         );
//         updateServiceScope(response.data);
//       } else {
//         const response = await serviceManagementService.createServiceScope(
//           payload
//         );
//         addServiceScope(response.data);
//       }
//       navigate("/services");
//     } catch (error) {
//       setApiError(
//         error.response?.data?.message ||
//           `Failed to ${isEdit ? "update" : "create"} service scope.`
//       );
//     }
//   };

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-64">
//         <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-indigo-600"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-2xl mx-auto p-8 bg-white rounded-xl shadow-lg">
//       <h3 className="text-2xl font-semibold text-gray-900 mb-6">
//         {isEdit ? "Update Service Scope" : "Create Service Scope"}
//       </h3>
//       {apiError && (
//         <div className="mb-6 p-4 bg-red-100 text-red-700 rounded-lg text-sm flex items-center">
//           <svg
//             className="w-5 h-5 mr-2"
//             fill="none"
//             stroke="currentColor"
//             viewBox="0 0 24 24"
//           >
//             <path
//               stroke-linecap="round"
//               stroke-linejoin="round"
//               stroke-width="2"
//               d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
//             />
//           </svg>
//           {apiError}
//         </div>
//       )}
//       <form onSubmit={handleSubmit} className="space-y-6">
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
//             Sub-Service
//             <InformationCircleIcon
//               className="ml-2 h-4 w-4 text-gray-400 cursor-help"
//               title="Select the parent sub-service"
//             />
//           </label>
//           <Select
//             name="subServiceId"
//             value={
//               subServiceOptions.find(
//                 (option) => option.value === formData.subServiceId
//               ) || null
//             }
//             onChange={(selected) =>
//               handleChange("subServiceId", selected ? selected.value : "")
//             }
//             options={subServiceOptions}
//             className="basic-single"
//             classNamePrefix="select"
//             placeholder="Select Sub-Service"
//             isClearable
//             isSearchable
//           />
//           {errors.subServiceId && (
//             <p className="text-red-600 text-sm mt-1">{errors.subServiceId}</p>
//           )}
//         </div>
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
//             Scope Name
//             <InformationCircleIcon
//               className="ml-2 h-4 w-4 text-gray-400 cursor-help"
//               title="Enter the name of the service scope"
//             />
//           </label>
//           <input
//             type="text"
//             name="name"
//             value={formData.name}
//             onChange={(e) => handleChange("name", e.target.value)}
//             className={`w-full p-3 border ${
//               errors.name ? "border-red-500" : "border-gray-200"
//             } rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-600 transition-colors`}
//             required
//           />
//           {errors.name && (
//             <p className="text-red-600 text-sm mt-1">{errors.name}</p>
//           )}
//         </div>
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
//             Description
//             <InformationCircleIcon
//               className="ml-2 h-4 w-4 text-gray-400 cursor-help"
//               title="Optional: Provide a description"
//             />
//           </label>
//           <textarea
//             name="description"
//             value={formData.description}
//             onChange={(e) => handleChange("description", e.target.value)}
//             className="w-full p-3 border border-gray-200 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-600 transition-colors"
//             rows="4"
//           />
//         </div>
//         <button
//           type="submit"
//           className="w-full bg-indigo-600 text-white p-3 rounded-lg hover:bg-indigo-700 transition-colors"
//         >
//           {isEdit ? "Update Service Scope" : "Create Service Scope"}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default ServiceScopeForm;

// src/components/ServiceManagement/ServiceScopeForm.jsx
import { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Select from "react-select";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import { ServiceContext } from "../../context/ServiceContext";
import { serviceManagementService } from "../../services/serviceManagementService";

const ServiceScopeForm = ({ isEdit = false }) => {
  const { subServices, addServiceScope, updateServiceScope } =
    useContext(ServiceContext);
  const { scopeId } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    scopeName: "", // Changed from 'name' to 'scopeName' to match backend DTO
    description: "",
    subServiceId: "",
  });
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState(null);
  const [loading, setLoading] = useState(isEdit);

  const subServiceOptions = subServices.map((subService) => ({
    value: subService.subServiceId.toString(),
    label: subService.subServiceName,
  }));

  useEffect(() => {
    if (isEdit && scopeId) {
      const fetchServiceScope = async () => {
        try {
          const response = await serviceManagementService.getServiceScopes();
          const scope = response.data.find(
            (sc) => sc.scopeId === parseInt(scopeId, 10)
          );
          if (scope) {
            setFormData({
              scopeName: scope.scopeName, // Changed to scopeName
              description: scope.description || "",
              subServiceId: scope.subServiceId?.toString() || "",
            });
          } else {
            setApiError("Service scope not found.");
          }
        } catch (err) {
          setApiError("Failed to load service scope.");
        } finally {
          setLoading(false);
        }
      };
      fetchServiceScope();
    }
  }, [isEdit, scopeId]);

  const validateField = (name, value) => {
    const errors = {};
    if (name === "scopeName" && !value)
      errors.scopeName = "Scope name is required.";
    if (name === "subServiceId" && !value)
      errors.subServiceId = "Sub-service is required.";
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
      ...validateField("scopeName", formData.scopeName),
      ...validateField("subServiceId", formData.subServiceId),
    };
    if (Object.keys(fieldErrors).length) {
      setErrors(fieldErrors);
      return;
    }
    try {
      const payload = {
        scopeName: formData.scopeName, // Changed to scopeName
        description: formData.description,
        subServiceId: parseInt(formData.subServiceId, 10),
      };
      if (isEdit) {
        const response = await serviceManagementService.updateServiceScope(
          scopeId,
          payload
        );
        updateServiceScope(response.data);
      } else {
        const response = await serviceManagementService.createServiceScope(
          payload
        );
        addServiceScope(response.data);
      }
      navigate("/services");
    } catch (error) {
      console.error("API Error:", error.response); // Log the full error
      if (error.response?.status === 403) {
        setApiError(
          "You do not have permission to create a service scope. Please contact an administrator."
        );
      } else {
        setApiError(
          error.response?.data?.message ||
            `Failed to ${isEdit ? "update" : "create"} service scope.`
        );
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

  return (
    <div className="max-w-2xl mx-auto p-8 bg-white rounded-xl shadow-lg">
      <h3 className="text-2xl font-semibold text-gray-900 mb-6">
        {isEdit ? "Update Service Scope" : "Create Service Scope"}
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
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          {apiError}
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
            Sub-Service
            <InformationCircleIcon
              className="ml-2 h-4 w-4 text-gray-400 cursor-help"
              title="Select the parent sub-service"
            />
          </label>
          <Select
            name="subServiceId"
            value={
              subServiceOptions.find(
                (option) => option.value === formData.subServiceId
              ) || null
            }
            onChange={(selected) =>
              handleChange("subServiceId", selected ? selected.value : "")
            }
            options={subServiceOptions}
            className="basic-single"
            classNamePrefix="select"
            placeholder="Select Sub-Service"
            isClearable
            isSearchable
          />
          {errors.subServiceId && (
            <p className="text-red-600 text-sm mt-1">{errors.subServiceId}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
            Scope Name
            <InformationCircleIcon
              className="ml-2 h-4 w-4 text-gray-400 cursor-help"
              title="Enter the name of the service scope"
            />
          </label>
          <input
            type="text"
            name="scopeName"
            value={formData.scopeName}
            onChange={(e) => handleChange("scopeName", e.target.value)}
            className={`w-full p-3 border ${
              errors.scopeName ? "border-red-500" : "border-gray-200"
            } rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-600 transition-colors`}
            required
          />
          {errors.scopeName && (
            <p className="text-red-600 text-sm mt-1">{errors.scopeName}</p>
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
            className="w-full p-3 border border-gray-200 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-600 transition-colors"
            rows="4"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white p-3 rounded-lg hover:bg-indigo-700 transition-colors"
        >
          {isEdit ? "Update Service Scope" : "Create Service Scope"}
        </button>
      </form>
    </div>
  );
};

export default ServiceScopeForm;
