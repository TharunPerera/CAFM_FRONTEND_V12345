// "use client";
// import { useState, useEffect } from "react";
// import { X, Calendar, User, FileText } from "lucide-react";
// import { checklistService } from "../../services/checklistService";

// const ChecklistViewModal = ({ checklistId, onClose }) => {
//   const [checklist, setChecklist] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     if (checklistId) {
//       fetchChecklistDetails();
//     }
//   }, [checklistId]);

//   const fetchChecklistDetails = async () => {
//     try {
//       setLoading(true);
//       const response = await checklistService.getChecklistById(checklistId);
//       setChecklist(response.data);
//     } catch (error) {
//       console.error("Error fetching checklist details:", error);
//       setError("Failed to load checklist details");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const parseContent = (content) => {
//     try {
//       return typeof content === "string" ? JSON.parse(content) : content || [];
//     } catch {
//       return [];
//     }
//   };

//   if (loading) {
//     return (
//       <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//         <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl p-8">
//           <div className="flex justify-center items-center h-32">
//             <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//         <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl p-8">
//           <div className="text-center">
//             <p className="text-red-600 mb-4">{error}</p>
//             <button
//               onClick={onClose}
//               className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
//             >
//               Close
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   const tasks = parseContent(checklist?.content);

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//       <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
//         <div className="flex justify-between items-center p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
//           <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
//             <FileText className="w-6 h-6 text-blue-600" />
//             Checklist Details
//           </h2>
//           <button
//             onClick={onClose}
//             className="text-gray-400 hover:text-gray-600 transition-colors p-2 hover:bg-gray-100 rounded-full"
//           >
//             <X className="w-6 h-6" />
//           </button>
//         </div>

//         <div className="p-6 space-y-6">
//           {/* Basic Information */}
//           <div className="bg-gray-50 rounded-lg p-6">
//             <h3 className="text-lg font-semibold text-gray-900 mb-4">
//               Basic Information
//             </h3>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-600 mb-1">
//                   Name
//                 </label>
//                 <p className="text-gray-900 font-medium">{checklist?.name}</p>
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-600 mb-1">
//                   Service Scope
//                 </label>
//                 <p className="text-gray-900 font-medium">
//                   {checklist?.serviceScopeName}
//                 </p>
//               </div>
//             </div>
//           </div>

//           {/* Metadata */}
//           <div className="bg-gray-50 rounded-lg p-6">
//             <h3 className="text-lg font-semibold text-gray-900 mb-4">
//               Metadata
//             </h3>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div className="flex items-center gap-2">
//                 <User className="w-4 h-4 text-gray-500" />
//                 <div>
//                   <label className="block text-sm font-medium text-gray-600">
//                     Created By
//                   </label>
//                   <p className="text-gray-900">
//                     {checklist?.createdBy || "Unknown"}
//                   </p>
//                 </div>
//               </div>
//               <div className="flex items-center gap-2">
//                 <Calendar className="w-4 h-4 text-gray-500" />
//                 <div>
//                   <label className="block text-sm font-medium text-gray-600">
//                     Created At
//                   </label>
//                   <p className="text-gray-900">
//                     {checklist?.createdAt
//                       ? new Date(checklist.createdAt).toLocaleString()
//                       : "N/A"}
//                   </p>
//                 </div>
//               </div>
//               {checklist?.updatedBy && (
//                 <div className="flex items-center gap-2">
//                   <User className="w-4 h-4 text-gray-500" />
//                   <div>
//                     <label className="block text-sm font-medium text-gray-600">
//                       Updated By
//                     </label>
//                     <p className="text-gray-900">{checklist.updatedBy}</p>
//                   </div>
//                 </div>
//               )}
//               {checklist?.updatedAt && (
//                 <div className="flex items-center gap-2">
//                   <Calendar className="w-4 h-4 text-gray-500" />
//                   <div>
//                     <label className="block text-sm font-medium text-gray-600">
//                       Updated At
//                     </label>
//                     <p className="text-gray-900">
//                       {new Date(checklist.updatedAt).toLocaleString()}
//                     </p>
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* Tasks */}
//           <div>
//             <h3 className="text-lg font-semibold text-gray-900 mb-4">
//               Tasks ({tasks.length})
//             </h3>
//             {tasks.length > 0 ? (
//               <div className="space-y-3">
//                 {tasks.map((task, index) => (
//                   <div
//                     key={index}
//                     className="flex items-start gap-3 p-4 bg-white border border-gray-200 rounded-lg hover:shadow-sm transition-shadow"
//                   >
//                     <div className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-medium mt-0.5">
//                       {index + 1}
//                     </div>
//                     <div className="flex-1">
//                       <p className="text-gray-900">{task.task}</p>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             ) : (
//               <div className="text-center py-8 text-gray-500 bg-gray-50 rounded-lg">
//                 No tasks found in this checklist
//               </div>
//             )}
//           </div>
//         </div>

//         <div className="flex justify-end gap-4 p-6 border-t border-gray-200 bg-gray-50">
//           <button
//             onClick={onClose}
//             className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
//           >
//             Close
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ChecklistViewModal;

// "use client";

// import { useState, useEffect } from "react";
// import { X, Calendar, User, FileText } from "lucide-react";
// import { checklistService } from "../../services/checklistService";
// import { toast } from "react-toastify";

// const ChecklistViewModal = ({ checklistId, onClose }) => {
//   const [checklist, setChecklist] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     if (checklistId) {
//       fetchChecklistDetails();
//     }
//   }, [checklistId]);

//   const fetchChecklistDetails = async () => {
//     try {
//       setLoading(true);
//       const response = await checklistService.getChecklistById(checklistId);
//       setChecklist(response.data);
//     } catch (error) {
//       console.error("Error fetching checklist details:", error);
//       setError("Failed to load checklist details");
//       toast.error("Failed to load checklist details");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const parseContent = (content) => {
//     try {
//       const tasks =
//         typeof content === "string" ? JSON.parse(content) : content || [];
//       return Array.isArray(tasks)
//         ? tasks
//             .map((item, index) => ({
//               id: index + 1,
//               text: typeof item === "string" ? item : item.task || "",
//             }))
//             .filter((task) => task.text)
//         : [];
//     } catch (error) {
//       console.error("Error parsing checklist content:", error);
//       toast.error("Invalid checklist content");
//       return [];
//     }
//   };

//   if (loading) {
//     return (
//       <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//         <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl p-8">
//           <div className="flex justify-center items-center h-32">
//             <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//         <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl p-8">
//           <div className="text-center">
//             <p className="text-red-600 mb-4">{error}</p>
//             <button
//               onClick={onClose}
//               className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
//             >
//               Close
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   const tasks = parseContent(checklist?.content);

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//       <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
//         <div className="flex justify-between items-center p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
//           <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
//             <FileText className="w-6 h-6 text-blue-600" />
//             Checklist Details
//           </h2>
//           <button
//             onClick={onClose}
//             className="text-gray-400 hover:text-gray-600 transition-colors p-2 hover:bg-gray-100 rounded-full"
//           >
//             <X className="w-6 h-6" />
//           </button>
//         </div>

//         <div className="p-6 space-y-6">
//           {/* Basic Information */}
//           <div className="bg-gray-50 rounded-lg p-6">
//             <h3 className="text-lg font-semibold text-gray-900 mb-4">
//               Basic Information
//             </h3>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-600 mb-1">
//                   Checklist ID
//                 </label>
//                 <p className="text-gray-900 font-medium">
//                   {checklist?.checklistId}
//                 </p>
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-600 mb-1">
//                   Name
//                 </label>
//                 <p className="text-gray-900 font-medium">{checklist?.name}</p>
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-600 mb-1">
//                   Service Scope
//                 </label>
//                 <p className="text-gray-900 font-medium">
//                   {checklist?.serviceScopeName || "N/A"}
//                 </p>
//               </div>
//             </div>
//           </div>

//           {/* Metadata */}
//           <div className="bg-gray-50 rounded-lg p-6">
//             <h3 className="text-lg font-semibold text-gray-900 mb-4">
//               Metadata
//             </h3>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div className="flex items-center gap-2">
//                 <User className="w-4 h-4 text-gray-500" />
//                 <div>
//                   <label className="block text-sm font-medium text-gray-600">
//                     Created By
//                   </label>
//                   <p className="text-gray-900">
//                     {checklist?.createdBy || "Unknown"}
//                   </p>
//                 </div>
//               </div>
//               <div className="flex items-center gap-2">
//                 <Calendar className="w-4 h-4 text-gray-500" />
//                 <div>
//                   <label className="block text-sm font-medium text-gray-600">
//                     Created At
//                   </label>
//                   <p className="text-gray-900">
//                     {checklist?.createdAt
//                       ? new Date(checklist.createdAt).toLocaleString()
//                       : "N/A"}
//                   </p>
//                 </div>
//               </div>
//               {checklist?.updatedBy && (
//                 <div className="flex items-center gap-2">
//                   <User className="w-4 h-4 text-gray-500" />
//                   <div>
//                     <label className="block text-sm font-medium text-gray-600">
//                       Updated By
//                     </label>
//                     <p className="text-gray-900">{checklist.updatedBy}</p>
//                   </div>
//                 </div>
//               )}
//               {checklist?.updatedAt && (
//                 <div className="flex items-center gap-2">
//                   <Calendar className="w-4 h-4 text-gray-500" />
//                   <div>
//                     <label className="block text-sm font-medium text-gray-600">
//                       Updated At
//                     </label>
//                     <p className="text-gray-900">
//                       {new Date(checklist.updatedAt).toLocaleString()}
//                     </p>
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* Tasks */}
//           <div>
//             <h3 className="text-lg font-semibold text-gray-900 mb-4">
//               Tasks ({tasks.length})
//             </h3>
//             {tasks.length > 0 ? (
//               <div className="space-y-3">
//                 {tasks.map((task) => (
//                   <div
//                     key={task.id}
//                     className="flex items-start gap-3 p-4 bg-white border border-gray-200 rounded-lg hover:shadow-sm transition-shadow"
//                   >
//                     <div className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-medium mt-0.5">
//                       {task.id}
//                     </div>
//                     <div className="flex-1">
//                       <p className="text-gray-900">
//                         {task.text || "Untitled task"}
//                       </p>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             ) : (
//               <div className="text-center py-8 text-gray-500 bg-gray-50 rounded-lg">
//                 No tasks found in this checklist
//               </div>
//             )}
//           </div>
//         </div>

//         <div className="flex justify-end gap-4 p-6 border-t border-gray-200 bg-gray-50">
//           <button
//             onClick={onClose}
//             className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
//           >
//             Close
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ChecklistViewModal;

"use client";

import { useState, useEffect } from "react";
import { X, Calendar, User, FileText } from "lucide-react";
import { checklistService } from "../../services/checklistService";
import { toast } from "react-toastify";

const ChecklistViewModal = ({ checklistId, onClose }) => {
  const [checklist, setChecklist] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (checklistId) {
      fetchChecklistDetails();
    }
  }, [checklistId]);

  const fetchChecklistDetails = async () => {
    try {
      setLoading(true);
      const response = await checklistService.getChecklistById(checklistId);
      setChecklist(response.data);
    } catch (error) {
      console.error("Error fetching checklist details:", error);
      setError("Failed to load checklist details");
      toast.error("Failed to load checklist details");
    } finally {
      setLoading(false);
    }
  };

  const parseContent = (content) => {
    try {
      const tasks =
        typeof content === "string" ? JSON.parse(content) : content || [];
      return Array.isArray(tasks)
        ? tasks
            .map((item, index) => ({
              id: item.taskId || index + 1, // Use taskId if available, else index-based
              text:
                typeof item === "string"
                  ? item
                  : item.description || item.task || "", // Support description or task
            }))
            .filter((task) => task.text)
        : [];
    } catch (error) {
      console.error("Error parsing checklist content:", error);
      toast.error("Invalid checklist content");
      return [];
    }
  };

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl p-8">
          <div className="flex justify-center items-center h-32">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl p-8">
          <div className="text-center">
            <p className="text-red-600 mb-4">{error}</p>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  }

  const tasks = parseContent(checklist?.content);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
          <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <FileText className="w-6 h-6 text-blue-600" />
            Checklist Details
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors p-2 hover:bg-gray-100 rounded-full"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Basic Information */}
          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Basic Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Checklist ID
                </label>
                <p className="text-gray-900 font-medium">
                  {checklist?.checklistId}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Name
                </label>
                <p className="text-gray-900 font-medium">{checklist?.name}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Service Scope
                </label>
                <p className="text-gray-900 font-medium">
                  {checklist?.serviceScopeName || "N/A"}
                </p>
              </div>
            </div>
          </div>

          {/* Metadata */}
          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Metadata
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-gray-500" />
                <div>
                  <label className="block text-sm font-medium text-gray-600">
                    Created By
                  </label>
                  <p className="text-gray-900">
                    {checklist?.createdBy || "Unknown"}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-gray-500" />
                <div>
                  <label className="block text-sm font-medium text-gray-600">
                    Created At
                  </label>
                  <p className="text-gray-900">
                    {checklist?.createdAt
                      ? new Date(checklist.createdAt).toLocaleString()
                      : "N/A"}
                  </p>
                </div>
              </div>
              {checklist?.updatedBy && (
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-gray-500" />
                  <div>
                    <label className="block text-sm font-medium text-gray-600">
                      Updated By
                    </label>
                    <p className="text-gray-900">{checklist.updatedBy}</p>
                  </div>
                </div>
              )}
              {checklist?.updatedAt && (
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-gray-500" />
                  <div>
                    <label className="block text-sm font-medium text-gray-600">
                      Updated At
                    </label>
                    <p className="text-gray-900">
                      {new Date(checklist.updatedAt).toLocaleString()}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Tasks */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Tasks ({tasks.length})
            </h3>
            {tasks.length > 0 ? (
              <div className="space-y-3">
                {tasks.map((task) => (
                  <div
                    key={task.id}
                    className="flex items-start gap-3 p-4 bg-white border border-gray-200 rounded-lg hover:shadow-sm transition-shadow"
                  >
                    <div className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-medium mt-0.5">
                      {task.id}
                    </div>
                    <div className="flex-1">
                      <p className="text-gray-900">
                        {task.text || "Untitled task"}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500 bg-gray-50 rounded-lg">
                No tasks found in this checklist
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-end gap-4 p-6 border-t border-gray-200 bg-gray-50">
          <button
            onClick={onClose}
            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChecklistViewModal;
