// import { useState, useEffect } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { serviceManagementService } from "../services/serviceManagementService";
// import ServiceForm from "../components/ServiceManagement/ServiceForm";
// import SubServiceForm from "../components/ServiceManagement/SubServiceForm";
// import ServiceScopeForm from "../components/ServiceManagement/ServiceScopeForm";

// const ServiceManagement = () => {
//   const navigate = useNavigate();
//   const { serviceId, subServiceId, scopeId } = useParams();
//   const [successMessage, setSuccessMessage] = useState(null);
//   const [initialServiceData, setInitialServiceData] = useState({});
//   const [initialSubServiceData, setInitialSubServiceData] = useState({});
//   const [initialScopeData, setInitialScopeData] = useState({});
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     if (serviceId) {
//       const fetchService = async () => {
//         try {
//           setLoading(true);
//           const res = await serviceManagementService.getServices();
//           const service = res.data.find(
//             (s) => s.serviceId.toString() === serviceId
//           );
//           if (service) setInitialServiceData(service);
//         } catch (err) {
//           setSuccessMessage(null);
//         } finally {
//           setLoading(false);
//         }
//       };
//       fetchService();
//     }
//     if (subServiceId) {
//       const fetchSubService = async () => {
//         try {
//           setLoading(true);
//           const res = await serviceManagementService.getSubServices();
//           const subService = res.data.find(
//             (s) => s.subServiceId.toString() === subServiceId
//           );
//           if (subService) setInitialSubServiceData(subService);
//         } catch (err) {
//           setSuccessMessage(null);
//         } finally {
//           setLoading(false);
//         }
//       };
//       fetchSubService();
//     }
//     if (scopeId) {
//       const fetchScope = async () => {
//         try {
//           setLoading(true);
//           const res = await serviceManagementService.getSubServices();
//           const scope = res.data
//             .flatMap((s) => s.serviceScopes || [])
//             .find((s) => s.scopeId.toString() === scopeId);
//           if (scope) setInitialScopeData(scope);
//         } catch (err) {
//           setSuccessMessage(null);
//         } finally {
//           setLoading(false);
//         }
//       };
//       fetchScope();
//     }
//   }, [serviceId, subServiceId, scopeId]);

//   useEffect(() => {
//     if (successMessage) {
//       const timer = setTimeout(() => setSuccessMessage(null), 3000);
//       return () => clearTimeout(timer);
//     }
//   }, [successMessage]);

//   const handleServiceSubmit = async (service) => {
//     try {
//       if (serviceId) {
//         await serviceManagementService.updateService(serviceId, service);
//         setSuccessMessage("Service updated successfully!");
//       } else {
//         await serviceManagementService.createService(service);
//         setSuccessMessage("Service created successfully!");
//       }
//       navigate("/services");
//     } catch (error) {
//       throw error;
//     }
//   };

//   const handleSubServiceSubmit = async (subService) => {
//     try {
//       if (subServiceId) {
//         await serviceManagementService.updateSubService(
//           subServiceId,
//           subService
//         );
//         setSuccessMessage("Sub-service updated successfully!");
//       } else {
//         await serviceManagementService.createSubService(subService);
//         setSuccessMessage("Sub-service created successfully!");
//       }
//       navigate("/services");
//     } catch (error) {
//       throw error;
//     }
//   };

//   const handleServiceScopeSubmit = async (serviceScope) => {
//     try {
//       if (scopeId) {
//         await serviceManagementService.updateServiceScope(
//           scopeId,
//           serviceScope
//         );
//         setSuccessMessage("Service scope updated successfully!");
//       } else {
//         await serviceManagementService.createServiceScope(serviceScope);
//         setSuccessMessage("Service scope created successfully!");
//       }
//       navigate("/services");
//     } catch (error) {
//       throw error;
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
//     <div className="p-8 max-w-7xl mx-auto">
//       <div className="flex justify-between items-center mb-8">
//         <h2 className="text-3xl font-semibold text-gray-900">
//           Service Management
//         </h2>
//         <button
//           onClick={() => navigate("/services/list")}
//           className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
//         >
//           View Services
//         </button>
//       </div>
//       {successMessage && (
//         <div className="mb-6 p-4 bg-green-50 text-green-700 rounded-lg text-sm flex items-center">
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
//               d="M5 13l4 4L19 7"
//             />
//           </svg>
//           {successMessage}
//         </div>
//       )}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         <div>
//           <h3 className="text-xl font-semibold text-gray-800 mb-4">
//             {serviceId ? "Update Service" : "Create Service"}
//           </h3>
//           <ServiceForm
//             onSubmit={handleServiceSubmit}
//             initialData={initialServiceData}
//             isEdit={!!serviceId}
//           />
//         </div>
//         <div>
//           <h3 className="text-xl font-semibold text-gray-800 mb-4">
//             {subServiceId ? "Update Sub-Service" : "Create Sub-Service"}
//           </h3>
//           <SubServiceForm
//             onSubmit={handleSubServiceSubmit}
//             initialData={initialSubServiceData}
//             isEdit={!!subServiceId}
//           />
//         </div>
//         <div>
//           <h3 className="text-xl font-semibold text-gray-800 mb-4">
//             {scopeId ? "Update Service Scope" : "Create Service Scope"}
//           </h3>
//           <ServiceScopeForm
//             onSubmit={handleServiceScopeSubmit}
//             initialData={initialScopeData}
//             isEdit={!!scopeId}
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ServiceManagement;

//1111111

// import { useState, useContext, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import Select from "react-select";
// import { ServiceContext } from "../context/ServiceContext";
// import { serviceManagementService } from "../services/serviceManagementService";

// const ErrorBoundary = ({ children }) => {
//   const [hasError, setHasError] = useState(false);

//   useEffect(() => {
//     const errorHandler = (error) => {
//       console.error("ErrorBoundary caught:", error);
//       setHasError(true);
//     };
//     window.addEventListener("error", errorHandler);
//     return () => window.removeEventListener("error", errorHandler);
//   }, []);

//   if (hasError) {
//     return (
//       <div className="p-8 text-center">
//         <h2 className="text-2xl font-semibold text-red-600">
//           Something went wrong.
//         </h2>
//         <p className="mt-4 text-gray-600">
//           Please try refreshing the page or contact support.
//         </p>
//       </div>
//     );
//   }
//   return children;
// };

// const ServiceManagement = () => {
//   const {
//     services,
//     subServices,
//     serviceScopes,
//     deleteService,
//     deleteSubService,
//     deleteServiceScope,
//     fetchData,
//     loading,
//     error: contextError,
//   } = useContext(ServiceContext);
//   const [selectedServices, setSelectedServices] = useState([]);
//   const [selectedSubServices, setSelectedSubServices] = useState([]);
//   const [selectedServiceScopes, setSelectedServiceScopes] = useState([]);
//   const [error, setError] = useState(null);
//   const [successMessage, setSuccessMessage] = useState(null);
//   const navigate = useNavigate();

//   const serviceOptions = services.map((s) => ({
//     value: s.serviceId.toString(),
//     label: s.serviceName,
//   }));
//   const subServiceOptions = subServices.map((ss) => ({
//     value: ss.subServiceId.toString(),
//     label: ss.subServiceName,
//   }));
//   const serviceScopeOptions = serviceScopes.map((sc) => ({
//     value: sc.scopeId.toString(),
//     label: sc.scopeName,
//   }));

//   const handleBulkDelete = async (type) => {
//     try {
//       setError(null);
//       if (type === "services" && selectedServices.length) {
//         const ids = selectedServices.map((s) => parseInt(s.value, 10));
//         await serviceManagementService.deleteServicesBulk(ids);
//         ids.forEach((id) => deleteService(id));
//         setSelectedServices([]);
//       } else if (type === "subServices" && selectedSubServices.length) {
//         const ids = selectedSubServices.map((ss) => parseInt(ss.value, 10));
//         await serviceManagementService.deleteSubServicesBulk(ids);
//         ids.forEach((id) => deleteSubService(id));
//         setSelectedSubServices([]);
//       } else if (type === "serviceScopes" && selectedServiceScopes.length) {
//         const ids = selectedServiceScopes.map((sc) => parseInt(sc.value, 10));
//         await serviceManagementService.deleteServiceScopesBulk(ids);
//         ids.forEach((id) => deleteServiceScope(id));
//         setSelectedServiceScopes([]);
//       }
//       setSuccessMessage(
//         `${type.charAt(0).toUpperCase() + type.slice(1)} deleted successfully!`
//       );
//       setTimeout(() => setSuccessMessage(null), 3000);
//     } catch (err) {
//       setError(
//         err.response?.status === 403
//           ? "You do not have permission to delete."
//           : "Failed to delete items."
//       );
//     }
//   };

//   const handleUpdateNavigation = (type, selected) => {
//     if (selected && selected.length === 1) {
//       if (type === "services") {
//         navigate(`/services/edit/${selected[0].value}`);
//       } else if (type === "subServices") {
//         navigate(`/services/sub-services/edit/${selected[0].value}`);
//       } else if (type === "serviceScopes") {
//         navigate(`/services/service-scopes/edit/${selected[0].value}`);
//       }
//     }
//   };

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-64">
//         <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-indigo-600"></div>
//       </div>
//     );
//   }

//   if (contextError) {
//     return (
//       <div className="p-8 text-center">
//         <h2 className="text-2xl font-semibold text-red-600">
//           Error Loading Data
//         </h2>
//         <p className="mt-4 text-gray-600">{contextError}</p>
//         <button
//           onClick={fetchData}
//           className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
//         >
//           Retry
//         </button>
//       </div>
//     );
//   }

//   return (
//     <ErrorBoundary>
//       <div className="p-8 max-w-4xl mx-auto bg-white rounded-xl shadow-lg">
//         <h2 className="text-3xl font-semibold text-gray-900 mb-8">
//           Service Management
//         </h2>
//         {successMessage && (
//           <div className="mb-6 p-4 bg-green-100 text-green-700 rounded-lg text-sm flex items-center">
//             <svg
//               className="w-5 h-5 mr-2"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth="2"
//                 d="M5 13l4 4L19 7"
//               />
//             </svg>
//             {successMessage}
//           </div>
//         )}
//         {error && (
//           <div className="mb-6 p-4 bg-red-100 text-red-700 rounded-lg text-sm flex items-center">
//             <svg
//               className="w-5 h-5 mr-2"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth="2"
//                 d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
//               />
//             </svg>
//             {error}
//           </div>
//         )}
//         <div className="space-y-8">
//           {/* Services Management */}
//           <div className="p-6 bg-gray-50 rounded-xl">
//             <h3 className="text-xl font-medium text-gray-700 mb-4">
//               Manage Services
//             </h3>
//             <Select
//               isMulti
//               options={serviceOptions}
//               value={selectedServices}
//               onChange={setSelectedServices}
//               className="mb-4"
//               placeholder="Select services to update/delete"
//               isSearchable
//             />
//             <div className="flex space-x-4">
//               <button
//                 onClick={() =>
//                   handleUpdateNavigation("services", selectedServices)
//                 }
//                 disabled={selectedServices.length !== 1}
//                 className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50"
//               >
//                 Update Selected
//               </button>
//               <button
//                 onClick={() => handleBulkDelete("services")}
//                 disabled={!selectedServices.length}
//                 className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50"
//               >
//                 Delete Selected
//               </button>
//               <button
//                 onClick={() => navigate("/services/create")}
//                 className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
//               >
//                 Create Service
//               </button>
//               <button
//                 onClick={() => navigate("/services/bulk-create")}
//                 className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
//               >
//                 Bulk Create
//               </button>
//               <button
//                 onClick={() => navigate("/services/bulk-update")}
//                 className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
//               >
//                 Bulk Update
//               </button>
//             </div>
//           </div>

//           {/* Sub-Services Management */}
//           <div className="p-6 bg-gray-50 rounded-xl">
//             <h3 className="text-xl font-medium text-gray-700 mb-4">
//               Manage Sub-Services
//             </h3>
//             <Select
//               isMulti
//               options={subServiceOptions}
//               value={selectedSubServices}
//               onChange={setSelectedSubServices}
//               className="mb-4"
//               placeholder="Select sub-services to update/delete"
//               isSearchable
//             />
//             <div className="flex space-x-4">
//               <button
//                 onClick={() =>
//                   handleUpdateNavigation("subServices", selectedSubServices)
//                 }
//                 disabled={selectedSubServices.length !== 1}
//                 className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50"
//               >
//                 Update Selected
//               </button>
//               <button
//                 onClick={() => handleBulkDelete("subServices")}
//                 disabled={!selectedSubServices.length}
//                 className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50"
//               >
//                 Delete Selected
//               </button>
//               <button
//                 onClick={() => navigate("/services/sub-services/create")}
//                 className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
//               >
//                 Create Sub-Service
//               </button>
//             </div>
//           </div>

//           {/* Service Scopes Management */}
//           <div className="p-6 bg-gray-50 rounded-xl">
//             <h3 className="text-xl font-medium text-gray-700 mb-4">
//               Manage Service Scopes
//             </h3>
//             <Select
//               isMulti
//               options={serviceScopeOptions}
//               value={selectedServiceScopes}
//               onChange={setSelectedServiceScopes}
//               className="mb-4"
//               placeholder="Select service scopes to update/delete"
//               isSearchable
//             />
//             <div className="flex space-x-4">
//               <button
//                 onClick={() =>
//                   handleUpdateNavigation("serviceScopes", selectedServiceScopes)
//                 }
//                 disabled={selectedServiceScopes.length !== 1}
//                 className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50"
//               >
//                 Update Selected
//               </button>
//               <button
//                 onClick={() => handleBulkDelete("serviceScopes")}
//                 disabled={!selectedServiceScopes.length}
//                 className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50"
//               >
//                 Delete Selected
//               </button>
//               <button
//                 onClick={() => navigate("/services/service-scopes/create")}
//                 className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
//               >
//                 Create Service Scope
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </ErrorBoundary>
//   );
// };

// export default ServiceManagement;

// src/pages/ServiceManagement.js
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
    subServices,
    serviceScopes,
    deleteService,
    deleteSubService,
    deleteServiceScope,
    fetchData,
    loading,
    error: contextError,
  } = useContext(ServiceContext);
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

  const handleBulkDelete = async (type) => {
    try {
      setError(null);
      if (type === "services" && selectedServices.length) {
        const ids = selectedServices.map((s) => parseInt(s.value, 10));
        await serviceManagementService.deleteServicesBulk(ids);
        for (const id of ids) {
          await deleteService(id); // Calls fetchData internally
        }
        setSelectedServices([]);
      } else if (type === "subServices" && selectedSubServices.length) {
        const ids = selectedSubServices.map((ss) => parseInt(ss.value, 10));
        await serviceManagementService.deleteSubServicesBulk(ids);
        for (const id of ids) {
          await deleteSubService(id); // Calls fetchData internally
        }
        setSelectedSubServices([]);
      } else if (type === "serviceScopes" && selectedServiceScopes.length) {
        const ids = selectedServiceScopes.map((sc) => parseInt(sc.value, 10));
        await serviceManagementService.deleteServiceScopesBulk(ids);
        for (const id of ids) {
          await deleteServiceScope(id); // Calls fetchData internally
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
              placeholder="Select sub-services to update/delete"
              isSearchable
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
              placeholder="Select service scopes to update/delete"
              isSearchable
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
