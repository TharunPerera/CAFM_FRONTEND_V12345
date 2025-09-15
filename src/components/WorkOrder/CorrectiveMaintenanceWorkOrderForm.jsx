// "use client"

// import { useState, useEffect } from "react"
// import { Save, Wrench } from "lucide-react"
// import { workOrderService } from "../../services/WorkOrderService"
// import { workRequestService } from "../../services/WorkRequestService"
// import { technicianService } from "../../services/TechnicianService"
// import { checklistService } from "../../services/checklistService"
// import { toast } from "react-toastify"

// const CorrectiveMaintenanceWorkOrderForm = ({ onBack }) => {
//   const [formData, setFormData] = useState({
//     workRequestId: "",
//     technicianId: "",
//     checklistId: "",
//     workOrderType: "CM",
//   })
//   const [loading, setLoading] = useState(false)
//   const [workRequests, setWorkRequests] = useState([])
//   const [technicians, setTechnicians] = useState([])
//   const [checklists, setChecklists] = useState([])
//   const [loadingData, setLoadingData] = useState({
//     workRequests: false,
//     technicians: false,
//     checklists: false,
//   })

//   useEffect(() => {
//     loadInitialData()
//   }, [])

//   const loadInitialData = async () => {
//     await Promise.all([loadWorkRequests(), loadTechnicians(), loadChecklists()])
//   }

//   const loadWorkRequests = async () => {
//     setLoadingData((prev) => ({ ...prev, workRequests: true }))
//     try {
//       const response = await workRequestService.getAllWorkRequests()
//       // Filter for approved CM work requests
//       const cmWorkRequests = (response.data || []).filter(
//         (wr) => wr.workRequestType === "CM" && wr.status === "APPROVED",
//       )
//       setWorkRequests(cmWorkRequests)
//     } catch (error) {
//       console.error("Error loading work requests:", error)
//       toast.error("Failed to load work requests")
//     } finally {
//       setLoadingData((prev) => ({ ...prev, workRequests: false }))
//     }
//   }

//   const loadTechnicians = async () => {
//     setLoadingData((prev) => ({ ...prev, technicians: true }))
//     try {
//       const response = await technicianService.getAllTechnicians(0, 100, "AVAILABLE")
//       setTechnicians(response.data?.content || [])
//     } catch (error) {
//       console.error("Error loading technicians:", error)
//       toast.error("Failed to load technicians")
//     } finally {
//       setLoadingData((prev) => ({ ...prev, technicians: false }))
//     }
//   }

//   const loadChecklists = async () => {
//     setLoadingData((prev) => ({ ...prev, checklists: true }))
//     try {
//       const response = await checklistService.getAllChecklists()
//       setChecklists(response.data || [])
//     } catch (error) {
//       console.error("Error loading checklists:", error)
//       toast.error("Failed to load checklists")
//     } finally {
//       setLoadingData((prev) => ({ ...prev, checklists: false }))
//     }
//   }

//   const handleInputChange = (e) => {
//     const { name, value } = e.target
//     setFormData((prev) => ({ ...prev, [name]: value }))
//   }

//   const handleSubmit = async (e) => {
//     e.preventDefault()

//     if (!formData.workRequestId || !formData.technicianId || !formData.checklistId) {
//       toast.error("Please fill in all required fields")
//       return
//     }

//     setLoading(true)
//     try {
//       await workOrderService.createWorkOrder(formData)
//       toast.success("CM Work Order created successfully")

//       // Reset form
//       setFormData({
//         workRequestId: "",
//         technicianId: "",
//         checklistId: "",
//         workOrderType: "CM",
//       })

//       // Go back to main view
//       onBack()
//     } catch (error) {
//       console.error("Error creating work order:", error)
//       toast.error(error.response?.data?.message || "Failed to create work order")
//     } finally {
//       setLoading(false)
//     }
//   }

//   return (
//     <div className="max-w-2xl mx-auto">
//       <div className="text-center mb-8">
//         <div className="inline-flex p-3 rounded-xl bg-gradient-to-r from-red-500 to-red-600 shadow-md mb-4">
//           <Wrench className="w-8 h-8 text-white" />
//         </div>
//         <h2 className="text-2xl font-bold text-gray-900 mb-2">Create CM Work Order</h2>
//         <p className="text-gray-600">Create a work order for approved corrective maintenance work requests</p>
//       </div>

//       <form onSubmit={handleSubmit} className="space-y-6">
//         {/* Work Request Selection */}
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2">
//             Work Request <span className="text-red-500">*</span>
//           </label>
//           <select
//             name="workRequestId"
//             value={formData.workRequestId}
//             onChange={handleInputChange}
//             disabled={loadingData.workRequests}
//             className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 disabled:bg-gray-100"
//             required
//           >
//             <option value="">{loadingData.workRequests ? "Loading work requests..." : "Select Work Request"}</option>
//             {workRequests.map((wr) => (
//               <option key={wr.workRequestId} value={wr.workRequestId}>
//                 #{wr.workRequestId} - {wr.assetName} ({wr.priority})
//               </option>
//             ))}
//           </select>
//           {workRequests.length === 0 && !loadingData.workRequests && (
//             <p className="text-sm text-gray-500 mt-1">No approved CM work requests available</p>
//           )}
//         </div>

//         {/* Technician Selection */}
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2">
//             Technician <span className="text-red-500">*</span>
//           </label>
//           <select
//             name="technicianId"
//             value={formData.technicianId}
//             onChange={handleInputChange}
//             disabled={loadingData.technicians}
//             className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 disabled:bg-gray-100"
//             required
//           >
//             <option value="">{loadingData.technicians ? "Loading technicians..." : "Select Technician"}</option>
//             {technicians.map((tech) => (
//               <option key={tech.internalUserId} value={tech.internalUserId}>
//                 {tech.firstName} {tech.lastName} ({tech.username}) - {tech.assignedWorkOrderCount || 0} assigned
//               </option>
//             ))}
//           </select>
//           {technicians.length === 0 && !loadingData.technicians && (
//             <p className="text-sm text-gray-500 mt-1">No available technicians found</p>
//           )}
//         </div>

//         {/* Checklist Selection */}
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2">
//             Checklist <span className="text-red-500">*</span>
//           </label>
//           <select
//             name="checklistId"
//             value={formData.checklistId}
//             onChange={handleInputChange}
//             disabled={loadingData.checklists}
//             className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 disabled:bg-gray-100"
//             required
//           >
//             <option value="">{loadingData.checklists ? "Loading checklists..." : "Select Checklist"}</option>
//             {checklists.map((checklist) => (
//               <option key={checklist.checklistId} value={checklist.checklistId}>
//                 {checklist.checklistName}
//               </option>
//             ))}
//           </select>
//         </div>

//         {/* Submit Button */}
//         <div className="flex gap-4 pt-6">
//           <button
//             type="button"
//             onClick={onBack}
//             className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
//           >
//             Cancel
//           </button>
//           <button
//             type="submit"
//             disabled={loading}
//             className="flex-1 inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg hover:from-red-700 hover:to-red-800 disabled:opacity-50 transition-all shadow-lg hover:shadow-xl"
//           >
//             {loading ? (
//               <>
//                 <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
//                 Creating...
//               </>
//             ) : (
//               <>
//                 <Save className="w-5 h-5 mr-2" />
//                 Create CM Work Order
//               </>
//             )}
//           </button>
//         </div>
//       </form>
//     </div>
//   )
// }

// export default CorrectiveMaintenanceWorkOrderForm

// "use client";

// import { useState } from "react";
// import { Save, Wrench } from "lucide-react";
// import { workOrderService } from "../../services/WorkOrderService";
// import { toast } from "react-toastify";

// const CorrectiveMaintenanceWorkOrderForm = ({ onBack }) => {
//   const [formData, setFormData] = useState({
//     workRequestId: "",
//     technicianId: "",
//     checklistId: "",
//     workOrderType: "CM",
//   });
//   const [loading, setLoading] = useState(false);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (
//       !formData.workRequestId ||
//       !formData.technicianId ||
//       !formData.checklistId
//     ) {
//       toast.error("Please fill in all required fields");
//       return;
//     }

//     setLoading(true);
//     try {
//       await workOrderService.createWorkOrder(formData);
//       toast.success("CM Work Order created successfully");

//       // Reset form
//       setFormData({
//         workRequestId: "",
//         technicianId: "",
//         checklistId: "",
//         workOrderType: "CM",
//       });

//       // Go back to main view
//       onBack();
//     } catch (error) {
//       console.error("Error creating work order:", error);
//       toast.error(
//         error.response?.data?.message || "Failed to create work order"
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-2xl mx-auto">
//       <div className="text-center mb-8">
//         <div className="inline-flex p-3 rounded-xl bg-gradient-to-r from-red-500 to-red-600 shadow-md mb-4">
//           <Wrench className="w-8 h-8 text-white" />
//         </div>
//         <h2 className="text-2xl font-bold text-gray-900 mb-2">
//           Create CM Work Order
//         </h2>
//         <p className="text-gray-600">
//           Create a work order for corrective maintenance
//         </p>
//       </div>

//       <form onSubmit={handleSubmit} className="space-y-6">
//         {/* Work Request ID */}
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2">
//             Work Request ID <span className="text-red-500">*</span>
//           </label>
//           <input
//             type="number"
//             name="workRequestId"
//             value={formData.workRequestId}
//             onChange={handleInputChange}
//             className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
//             placeholder="Enter Work Request ID"
//             required
//           />
//         </div>

//         {/* Technician ID */}
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2">
//             Technician ID <span className="text-red-500">*</span>
//           </label>
//           <input
//             type="number"
//             name="technicianId"
//             value={formData.technicianId}
//             onChange={handleInputChange}
//             className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
//             placeholder="Enter Technician ID"
//             required
//           />
//         </div>

//         {/* Checklist ID */}
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2">
//             Checklist ID <span className="text-red-500">*</span>
//           </label>
//           <input
//             type="number"
//             name="checklistId"
//             value={formData.checklistId}
//             onChange={handleInputChange}
//             className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
//             placeholder="Enter Checklist ID"
//             required
//           />
//         </div>

//         {/* Work Order Type (Read-only) */}
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2">
//             Work Order Type
//           </label>
//           <input
//             type="text"
//             value="CM - Corrective Maintenance"
//             className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100 text-gray-600"
//             readOnly
//           />
//         </div>

//         {/* Submit Button */}
//         <div className="flex gap-4 pt-6">
//           <button
//             type="button"
//             onClick={onBack}
//             className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
//           >
//             Cancel
//           </button>
//           <button
//             type="submit"
//             disabled={loading}
//             className="flex-1 inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg hover:from-red-700 hover:to-red-800 disabled:opacity-50 transition-all shadow-lg hover:shadow-xl"
//           >
//             {loading ? (
//               <>
//                 <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
//                 Creating...
//               </>
//             ) : (
//               <>
//                 <Save className="w-5 h-5 mr-2" />
//                 Create CM Work Order
//               </>
//             )}
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default CorrectiveMaintenanceWorkOrderForm;

// "use client";

// import { useState, useEffect } from "react";
// import { Save, Wrench } from "lucide-react";
// import { workOrderService } from "../../services/WorkOrderService";
// import { toast } from "react-toastify";

// const CorrectiveMaintenanceWorkOrderForm = ({
//   onBack,
//   initialWorkRequestId,
// }) => {
//   const [formData, setFormData] = useState({
//     workRequestId: initialWorkRequestId || "",
//     technicianId: "",
//     checklistId: "",
//     workOrderType: "CM",
//   });
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     if (initialWorkRequestId) {
//       setFormData((prev) => ({ ...prev, workRequestId: initialWorkRequestId }));
//     }
//   }, [initialWorkRequestId]);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (
//       !formData.workRequestId ||
//       !formData.technicianId ||
//       !formData.checklistId
//     ) {
//       toast.error("Please fill in all required fields");
//       return;
//     }
//     setLoading(true);
//     try {
//       await workOrderService.createWorkOrder(formData);
//       toast.success("CM Work Order created successfully");
//       setFormData({
//         workRequestId: initialWorkRequestId || "",
//         technicianId: "",
//         checklistId: "",
//         workOrderType: "CM",
//       });
//       onBack();
//     } catch (error) {
//       console.error("Error creating work order:", error);
//       toast.error(
//         error.response?.data?.message || "Failed to create work order"
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-2xl mx-auto">
//       <div className="text-center mb-8">
//         <div className="inline-flex p-3 rounded-xl bg-gradient-to-r from-red-500 to-red-600 shadow-md mb-4">
//           <Wrench className="w-8 h-8 text-white" />
//         </div>
//         <h2 className="text-2xl font-bold text-gray-900 mb-2">
//           Create CM Work Order
//         </h2>
//         <p className="text-gray-600">
//           Create a work order for corrective maintenance
//         </p>
//       </div>
//       <form onSubmit={handleSubmit} className="space-y-6">
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2">
//             Work Request ID <span className="text-red-500">*</span>
//           </label>
//           <input
//             type="number"
//             name="workRequestId"
//             value={formData.workRequestId}
//             onChange={handleInputChange}
//             className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
//             placeholder="Enter Work Request ID"
//             required
//             disabled={!!initialWorkRequestId}
//           />
//         </div>
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2">
//             Technician ID <span className="text-red-500">*</span>
//           </label>
//           <input
//             type="number"
//             name="technicianId"
//             value={formData.technicianId}
//             onChange={handleInputChange}
//             className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
//             placeholder="Enter Technician ID"
//             required
//           />
//         </div>
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2">
//             Checklist ID <span className="text-red-500">*</span>
//           </label>
//           <input
//             type="number"
//             name="checklistId"
//             value={formData.checklistId}
//             onChange={handleInputChange}
//             className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
//             placeholder="Enter Checklist ID"
//             required
//           />
//         </div>
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2">
//             Work Order Type
//           </label>
//           <input
//             type="text"
//             value="CM - Corrective Maintenance"
//             className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100 text-gray-600"
//             readOnly
//           />
//         </div>
//         <div className="flex gap-4 pt-6">
//           <button
//             type="button"
//             onClick={onBack}
//             className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
//           >
//             Cancel
//           </button>
//           <button
//             type="submit"
//             disabled={loading}
//             className="flex-1 inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg hover:from-red-700 hover:to-red-800 disabled:opacity-50 transition-all shadow-lg hover:shadow-xl"
//           >
//             {loading ? (
//               <>
//                 <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
//                 Creating...
//               </>
//             ) : (
//               <>
//                 <Save className="w-5 h-5 mr-2" />
//                 Create CM Work Order
//               </>
//             )}
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default CorrectiveMaintenanceWorkOrderForm;

"use client";

import { useState, useEffect } from "react";
import { Save, Wrench } from "lucide-react";
import { workOrderService } from "../../services/WorkOrderService";
import { checklistService } from "../../services/checklistService";
import { technicianService } from "../../services/TechnicianService";
import { toast } from "react-toastify";
import { useDebounce } from "../../hooks/useDebounce";

const CorrectiveMaintenanceWorkOrderForm = ({
  onBack,
  initialWorkRequestId,
}) => {
  const [formData, setFormData] = useState({
    workRequestId: initialWorkRequestId || "",
    technicianId: "",
    checklistId: "",
    workOrderType: "CM",
  });
  const [loading, setLoading] = useState(false);

  // Checklist search states
  const [checklistSearch, setChecklistSearch] = useState("");
  const [checklistOptions, setChecklistOptions] = useState([]);
  const debouncedChecklistSearch = useDebounce(checklistSearch, 300);

  // Technician search states (based on skill and availability)
  const [skillSearch, setSkillSearch] = useState("");
  const [technicianOptions, setTechnicianOptions] = useState([]);
  const debouncedSkillSearch = useDebounce(skillSearch, 300);

  useEffect(() => {
    if (initialWorkRequestId) {
      setFormData((prev) => ({ ...prev, workRequestId: initialWorkRequestId }));
    }
  }, [initialWorkRequestId]);

  // Fetch checklists by name
  useEffect(() => {
    if (debouncedChecklistSearch.trim()) {
      checklistService
        .searchChecklistsByName(debouncedChecklistSearch.trim(), 0, 20)
        .then((response) => {
          setChecklistOptions(response.data.content || []);
        })
        .catch((error) => {
          console.error("Error fetching checklists:", error);
          toast.error("Failed to search checklists");
        });
    } else {
      setChecklistOptions([]);
    }
  }, [debouncedChecklistSearch]);

  // Fetch available technicians by skill
  useEffect(() => {
    if (debouncedSkillSearch.trim()) {
      technicianService
        .getTechniciansBySingleSkill(
          { skill: debouncedSkillSearch.trim() },
          0,
          20
        )
        .then((response) => {
          const availableTechs = (response.data.content || []).filter(
            (tech) => tech.availabilityStatus === "AVAILABLE"
          );
          setTechnicianOptions(availableTechs);
        })
        .catch((error) => {
          console.error("Error fetching technicians:", error);
          toast.error("Failed to search technicians");
        });
    } else {
      setTechnicianOptions([]);
    }
  }, [debouncedSkillSearch]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleChecklistSelect = (checklist) => {
    setFormData((prev) => ({ ...prev, checklistId: checklist.checklistId }));
    setChecklistSearch(checklist.name);
    setChecklistOptions([]);
  };

  const handleTechnicianSelect = (technician) => {
    setFormData((prev) => ({ ...prev, technicianId: technician.userId }));
    setSkillSearch(
      technician.username || `${technician.firstName} ${technician.lastName}`
    );
    setTechnicianOptions([]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !formData.workRequestId ||
      !formData.technicianId ||
      !formData.checklistId
    ) {
      toast.error("Please fill in all required fields");
      return;
    }
    setLoading(true);
    try {
      await workOrderService.createWorkOrder(formData);
      toast.success("CM Work Order created successfully");
      setFormData({
        workRequestId: initialWorkRequestId || "",
        technicianId: "",
        checklistId: "",
        workOrderType: "CM",
      });
      setChecklistSearch("");
      setSkillSearch("");
      onBack();
    } catch (error) {
      console.error("Error creating work order:", error);
      toast.error(
        error.response?.data?.message || "Failed to create work order"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <div className="inline-flex p-3 rounded-xl bg-gradient-to-r from-red-500 to-red-600 shadow-md mb-4">
          <Wrench className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Create CM Work Order
        </h2>
        <p className="text-gray-600">
          Create a work order for corrective maintenance
        </p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Work Request ID <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            name="workRequestId"
            value={formData.workRequestId}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
            placeholder="Enter Work Request ID"
            required
            disabled={!!initialWorkRequestId}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Search Technician by Skill and Availability{" "}
            <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={skillSearch}
            onChange={(e) => setSkillSearch(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
            placeholder="Search by skill (e.g., HVAC)"
            required
          />
          {technicianOptions.length > 0 && (
            <ul className="mt-2 border border-gray-300 rounded-lg bg-white max-h-40 overflow-y-auto">
              {technicianOptions.map((tech) => (
                <li
                  key={tech.technicianId}
                  onClick={() => handleTechnicianSelect(tech)}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                >
                  {tech.username} ({tech.firstName} {tech.lastName}) - Available
                </li>
              ))}
            </ul>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Search Checklist by Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={checklistSearch}
            onChange={(e) => setChecklistSearch(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
            placeholder="Search checklist by name"
            required
          />
          {checklistOptions.length > 0 && (
            <ul className="mt-2 border border-gray-300 rounded-lg bg-white max-h-40 overflow-y-auto">
              {checklistOptions.map((cl) => (
                <li
                  key={cl.checklistId}
                  onClick={() => handleChecklistSelect(cl)}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                >
                  {cl.name} (Scope: {cl.serviceScopeName || "N/A"})
                </li>
              ))}
            </ul>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Work Order Type
          </label>
          <input
            type="text"
            value="CM - Corrective Maintenance"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100 text-gray-600"
            readOnly
          />
        </div>
        <div className="flex gap-4 pt-6">
          <button
            type="button"
            onClick={onBack}
            className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="flex-1 inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg hover:from-red-700 hover:to-red-800 disabled:opacity-50 transition-all shadow-lg hover:shadow-xl"
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Creating...
              </>
            ) : (
              <>
                <Save className="w-5 h-5 mr-2" />
                Create CM Work Order
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CorrectiveMaintenanceWorkOrderForm;
