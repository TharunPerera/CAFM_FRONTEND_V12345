// "use client";

// import { useState, useEffect } from "react";
// import {
//   ChevronLeft,
//   ChevronRight,
//   Clock,
//   AlertCircle,
//   CheckCircle,
//   CalendarIcon,
// } from "lucide-react";
// import { workRequestService } from "../../services/WorkRequestService";
// import { contractService } from "../../services/contractService";
// import toast from "react-hot-toast";

// const PMScheduleCalendar = () => {
//   const [currentDate, setCurrentDate] = useState(new Date());
//   const [calendarData, setCalendarData] = useState(null);
//   const [contracts, setContracts] = useState([]);
//   const [pmSchedules, setPmSchedules] = useState([]);
//   const [selectedContract, setSelectedContract] = useState("");
//   const [selectedSchedule, setSelectedSchedule] = useState("");
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     fetchContracts();
//   }, []);

//   useEffect(() => {
//     if (selectedContract) {
//       fetchPmSchedules();
//     }
//   }, [selectedContract]);

//   useEffect(() => {
//     if (selectedSchedule && selectedContract) {
//       fetchCalendarData();
//     }
//   }, [selectedSchedule, selectedContract, currentDate]);

//   const fetchContracts = async () => {
//     try {
//       const response = await contractService.getAllContracts();
//       setContracts(response.data);
//     } catch (error) {
//       toast.error("Failed to fetch contracts");
//       console.error("Error fetching contracts:", error);
//     }
//   };

//   const fetchPmSchedules = async () => {
//     try {
//       const response = await workRequestService.getPmSchedulesByContract(
//         selectedContract
//       );
//       setPmSchedules(response.data);
//     } catch (error) {
//       toast.error("Failed to fetch PM schedules");
//       console.error("Error fetching PM schedules:", error);
//     }
//   };

//   const fetchCalendarData = async () => {
//     if (!selectedSchedule || !selectedContract) return;

//     setLoading(true);
//     try {
//       const startDate = new Date(
//         currentDate.getFullYear(),
//         currentDate.getMonth(),
//         1
//       );
//       const endDate = new Date(
//         currentDate.getFullYear(),
//         currentDate.getMonth() + 1,
//         0
//       );

//       const response = await workRequestService.getPmScheduleCalendar(
//         selectedSchedule,
//         selectedContract,
//         startDate.toISOString().split("T")[0],
//         endDate.toISOString().split("T")[0]
//       );

//       setCalendarData(response.data);
//     } catch (error) {
//       toast.error("Failed to fetch calendar data");
//       console.error("Error fetching calendar data:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const getDaysInMonth = (date) => {
//     const year = date.getFullYear();
//     const month = date.getMonth();
//     const firstDay = new Date(year, month, 1);
//     const lastDay = new Date(year, month + 1, 0);
//     const daysInMonth = lastDay.getDate();
//     const startingDayOfWeek = firstDay.getDay();

//     const days = [];

//     // Add empty cells for days before the first day of the month
//     for (let i = 0; i < startingDayOfWeek; i++) {
//       days.push(null);
//     }

//     // Add days of the month
//     for (let day = 1; day <= daysInMonth; day++) {
//       days.push(new Date(year, month, day));
//     }

//     return days;
//   };

//   const getEventsForDate = (date) => {
//     if (!calendarData || !date) return [];

//     const dateString = date.toISOString().split("T")[0];
//     return calendarData.events.filter((event) => event.date === dateString);
//   };

//   const getStatusColor = (status, isPastEvent) => {
//     if (isPastEvent) {
//       switch (status) {
//         case "COMPLETED":
//           return "bg-green-100 text-green-800 border-green-200";
//         case "PENDING":
//           return "bg-yellow-100 text-yellow-800 border-yellow-200";
//         case "APPROVED":
//           return "bg-blue-100 text-blue-800 border-blue-200";
//         case "REJECTED":
//           return "bg-red-100 text-red-800 border-red-200";
//         default:
//           return "bg-gray-100 text-gray-800 border-gray-200";
//       }
//     } else {
//       return "bg-purple-100 text-purple-800 border-purple-200";
//     }
//   };

//   const navigateMonth = (direction) => {
//     const newDate = new Date(currentDate);
//     newDate.setMonth(currentDate.getMonth() + direction);
//     setCurrentDate(newDate);
//   };

//   const monthNames = [
//     "January",
//     "February",
//     "March",
//     "April",
//     "May",
//     "June",
//     "July",
//     "August",
//     "September",
//     "October",
//     "November",
//     "December",
//   ];

//   const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

//   return (
//     <div className="p-6 bg-white rounded-lg shadow-sm">
//       <div className="mb-6">
//         <h1 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
//           <CalendarIcon className="w-6 h-6 mr-2 text-blue-600" />
//           PM Schedule Calendar
//         </h1>

//         {/* Filters */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Select Contract
//             </label>
//             <select
//               value={selectedContract}
//               onChange={(e) => setSelectedContract(e.target.value)}
//               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             >
//               <option value="">Select a contract</option>
//               {contracts.map((contract) => (
//                 <option key={contract.contractId} value={contract.contractId}>
//                   {contract.contractName}
//                 </option>
//               ))}
//             </select>
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Select PM Schedule
//             </label>
//             <select
//               value={selectedSchedule}
//               onChange={(e) => setSelectedSchedule(e.target.value)}
//               disabled={!selectedContract}
//               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
//             >
//               <option value="">Select a PM schedule</option>
//               {pmSchedules.map((schedule) => (
//                 <option key={schedule.scheduleId} value={schedule.scheduleId}>
//                   {schedule.name} ({schedule.frequency})
//                 </option>
//               ))}
//             </select>
//           </div>
//         </div>

//         {/* Calendar Header */}
//         {selectedSchedule && (
//           <div className="flex items-center justify-between mb-4">
//             <div className="flex items-center space-x-4">
//               <button
//                 onClick={() => navigateMonth(-1)}
//                 className="p-2 hover:bg-gray-100 rounded-full transition-colors"
//               >
//                 <ChevronLeft className="w-5 h-5" />
//               </button>
//               <h2 className="text-xl font-semibold">
//                 {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
//               </h2>
//               <button
//                 onClick={() => navigateMonth(1)}
//                 className="p-2 hover:bg-gray-100 rounded-full transition-colors"
//               >
//                 <ChevronRight className="w-5 h-5" />
//               </button>
//             </div>

//             {calendarData && (
//               <div className="text-sm text-gray-600">
//                 <span className="font-medium">{calendarData.scheduleName}</span>
//                 <span className="mx-2">•</span>
//                 <span>Frequency: {calendarData.frequency}</span>
//               </div>
//             )}
//           </div>
//         )}
//       </div>

//       {/* Calendar Grid */}
//       {selectedSchedule && (
//         <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
//           {loading ? (
//             <div className="flex items-center justify-center h-64">
//               <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
//             </div>
//           ) : (
//             <>
//               {/* Day Headers */}
//               <div className="grid grid-cols-7 bg-gray-50">
//                 {dayNames.map((day) => (
//                   <div
//                     key={day}
//                     className="p-3 text-center text-sm font-medium text-gray-700 border-r border-gray-200 last:border-r-0"
//                   >
//                     {day}
//                   </div>
//                 ))}
//               </div>

//               {/* Calendar Days */}
//               <div className="grid grid-cols-7">
//                 {getDaysInMonth(currentDate).map((date, index) => {
//                   const events = date ? getEventsForDate(date) : [];
//                   const isToday =
//                     date && date.toDateString() === new Date().toDateString();

//                   return (
//                     <div
//                       key={index}
//                       className={`min-h-[120px] p-2 border-r border-b border-gray-200 last:border-r-0 ${
//                         date ? "bg-white hover:bg-gray-50" : "bg-gray-50"
//                       } ${isToday ? "bg-blue-50" : ""}`}
//                     >
//                       {date && (
//                         <>
//                           <div
//                             className={`text-sm font-medium mb-2 ${
//                               isToday ? "text-blue-600" : "text-gray-900"
//                             }`}
//                           >
//                             {date.getDate()}
//                           </div>

//                           <div className="space-y-1">
//                             {events.slice(0, 3).map((event, eventIndex) => (
//                               <div
//                                 key={eventIndex}
//                                 className={`text-xs p-1 rounded border ${getStatusColor(
//                                   event.status,
//                                   event.isPastEvent
//                                 )}`}
//                                 title={`${event.assetName} - ${
//                                   event.isPastEvent ? event.status : "SCHEDULED"
//                                 }`}
//                               >
//                                 <div className="flex items-center space-x-1">
//                                   {event.isPastEvent ? (
//                                     event.status === "COMPLETED" ? (
//                                       <CheckCircle className="w-3 h-3" />
//                                     ) : (
//                                       <AlertCircle className="w-3 h-3" />
//                                     )
//                                   ) : (
//                                     <Clock className="w-3 h-3" />
//                                   )}
//                                   <span className="truncate">
//                                     {event.assetName}
//                                   </span>
//                                 </div>
//                               </div>
//                             ))}

//                             {events.length > 3 && (
//                               <div className="text-xs text-gray-500 text-center">
//                                 +{events.length - 3} more
//                               </div>
//                             )}
//                           </div>
//                         </>
//                       )}
//                     </div>
//                   );
//                 })}
//               </div>
//             </>
//           )}
//         </div>
//       )}

//       {/* Legend */}
//       {selectedSchedule && (
//         <div className="mt-6 flex flex-wrap gap-4 text-sm">
//           <div className="flex items-center space-x-2">
//             <div className="w-4 h-4 bg-purple-100 border border-purple-200 rounded"></div>
//             <span>Scheduled</span>
//           </div>
//           <div className="flex items-center space-x-2">
//             <div className="w-4 h-4 bg-green-100 border border-green-200 rounded"></div>
//             <span>Completed</span>
//           </div>
//           <div className="flex items-center space-x-2">
//             <div className="w-4 h-4 bg-yellow-100 border border-yellow-200 rounded"></div>
//             <span>Pending</span>
//           </div>
//           <div className="flex items-center space-x-2">
//             <div className="w-4 h-4 bg-blue-100 border border-blue-200 rounded"></div>
//             <span>Approved</span>
//           </div>
//           <div className="flex items-center space-x-2">
//             <div className="w-4 h-4 bg-red-100 border border-red-200 rounded"></div>
//             <span>Rejected</span>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default PMScheduleCalendar;

// "use client";

// import { useState, useEffect } from "react";
// import {
//   ChevronLeft,
//   ChevronRight,
//   Clock,
//   AlertCircle,
//   CheckCircle,
//   CalendarIcon,
// } from "lucide-react";
// import { workRequestService } from "../../services/WorkRequestService";
// import { contractService } from "../../services/contractService";
// import toast from "react-hot-toast";

// const PMScheduleCalendar = () => {
//   const [currentDate, setCurrentDate] = useState(new Date());
//   const [calendarData, setCalendarData] = useState(null);
//   const [contracts, setContracts] = useState([]);
//   const [pmSchedules, setPmSchedules] = useState([]);
//   const [selectedContract, setSelectedContract] = useState("");
//   const [selectedSchedule, setSelectedSchedule] = useState("");
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     fetchContracts();
//   }, []);

//   useEffect(() => {
//     if (selectedContract) {
//       fetchPmSchedules();
//     }
//   }, [selectedContract]);

//   useEffect(() => {
//     if (selectedSchedule && selectedContract) {
//       fetchCalendarData();
//     }
//   }, [selectedSchedule, selectedContract, currentDate]);

//   const fetchContracts = async () => {
//     try {
//       const response = await contractService.getAllContracts();
//       setContracts(response.data);
//     } catch (error) {
//       toast.error("Failed to fetch contracts");
//       console.error("Error fetching contracts:", error);
//     }
//   };

//   const fetchPmSchedules = async () => {
//     try {
//       const response = await workRequestService.getPmSchedulesByContract(
//         selectedContract
//       );
//       setPmSchedules(response.data);
//     } catch (error) {
//       toast.error("Failed to fetch PM schedules");
//       console.error("Error fetching PM schedules:", error);
//     }
//   };

//   const fetchCalendarData = async () => {
//     if (!selectedSchedule || !selectedContract) return;

//     setLoading(true);
//     try {
//       const startDate = new Date(
//         currentDate.getFullYear(),
//         currentDate.getMonth(),
//         1
//       );
//       const endDate = new Date(
//         currentDate.getFullYear(),
//         currentDate.getMonth() + 1,
//         0
//       );

//       const response = await workRequestService.getPmScheduleCalendar(
//         selectedSchedule,
//         selectedContract,
//         startDate.toISOString().split("T")[0],
//         endDate.toISOString().split("T")[0]
//       );

//       setCalendarData(response.data);
//     } catch (error) {
//       toast.error("Failed to fetch calendar data");
//       console.error("Error fetching calendar data:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const getDaysInMonth = (date) => {
//     const year = date.getFullYear();
//     const month = date.getMonth();
//     const firstDay = new Date(year, month, 1);
//     const lastDay = new Date(year, month + 1, 0);
//     const daysInMonth = lastDay.getDate();
//     const startingDayOfWeek = firstDay.getDay();

//     const days = [];

//     // Add empty cells for days before the first day of the month
//     for (let i = 0; i < startingDayOfWeek; i++) {
//       days.push(null);
//     }

//     // Add days of the month
//     for (let day = 1; day <= daysInMonth; day++) {
//       days.push(new Date(year, month, day));
//     }

//     return days;
//   };

//   const getEventsForDate = (date) => {
//     if (!calendarData || !date) return [];

//     const dateString = date.toISOString().split("T")[0];
//     return calendarData.events.filter((event) => event.date === dateString);
//   };

//   const getDateStatus = (date) => {
//     if (!date) return null;

//     const today = new Date();
//     today.setHours(0, 0, 0, 0);
//     const compareDate = new Date(date);
//     compareDate.setHours(0, 0, 0, 0);

//     if (compareDate.getTime() === today.getTime()) return "today";
//     if (compareDate < today) return "past";
//     return "future";
//   };

//   const getStatusColor = (status, isPastEvent, dateStatus) => {
//     if (isPastEvent || dateStatus === "past") {
//       switch (status) {
//         case "COMPLETED":
//           return "bg-green-100 text-green-700 border-green-300";
//         case "PENDING":
//           return "bg-yellow-100 text-yellow-700 border-yellow-300";
//         case "APPROVED":
//           return "bg-blue-100 text-blue-700 border-blue-300";
//         case "REJECTED":
//           return "bg-red-100 text-red-700 border-red-300";
//         default:
//           return "bg-gray-100 text-gray-600 border-gray-300";
//       }
//     } else {
//       // Future scheduled events
//       return "bg-purple-200 text-purple-800 border-purple-400 font-medium";
//     }
//   };

//   const getCellStyling = (date, dateStatus) => {
//     const baseClasses =
//       "min-h-[120px] p-2 border-r border-b border-gray-200 last:border-r-0";

//     if (!date) {
//       return `${baseClasses} bg-gray-50`;
//     }

//     switch (dateStatus) {
//       case "today":
//         return `${baseClasses} bg-blue-50 border-blue-200 shadow-inner`;
//       case "past":
//         return `${baseClasses} bg-gray-50 hover:bg-gray-100`;
//       case "future":
//         return `${baseClasses} bg-white hover:bg-gray-50`;
//       default:
//         return `${baseClasses} bg-white hover:bg-gray-50`;
//     }
//   };

//   const getDateNumberStyling = (dateStatus) => {
//     switch (dateStatus) {
//       case "today":
//         return "text-sm font-bold text-blue-700 bg-blue-200 rounded-full w-6 h-6 flex items-center justify-center";
//       case "past":
//         return "text-sm font-medium text-gray-400";
//       case "future":
//         return "text-sm font-medium text-gray-900";
//       default:
//         return "text-sm font-medium text-gray-900";
//     }
//   };

//   const navigateMonth = (direction) => {
//     const newDate = new Date(currentDate);
//     newDate.setMonth(currentDate.getMonth() + direction);
//     setCurrentDate(newDate);
//   };

//   const monthNames = [
//     "January",
//     "February",
//     "March",
//     "April",
//     "May",
//     "June",
//     "July",
//     "August",
//     "September",
//     "October",
//     "November",
//     "December",
//   ];

//   const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

//   return (
//     <div className="p-6 bg-white rounded-lg shadow-sm">
//       <div className="mb-6">
//         <h1 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
//           <CalendarIcon className="w-6 h-6 mr-2 text-blue-600" />
//           PM Schedule Calendar
//         </h1>

//         {/* Filters */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Select Contract
//             </label>
//             <select
//               value={selectedContract}
//               onChange={(e) => setSelectedContract(e.target.value)}
//               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             >
//               <option value="">Select a contract</option>
//               {contracts.map((contract) => (
//                 <option key={contract.contractId} value={contract.contractId}>
//                   {contract.contractName}
//                 </option>
//               ))}
//             </select>
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Select PM Schedule
//             </label>
//             <select
//               value={selectedSchedule}
//               onChange={(e) => setSelectedSchedule(e.target.value)}
//               disabled={!selectedContract}
//               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
//             >
//               <option value="">Select a PM schedule</option>
//               {pmSchedules.map((schedule) => (
//                 <option key={schedule.scheduleId} value={schedule.scheduleId}>
//                   {schedule.name} ({schedule.frequency})
//                 </option>
//               ))}
//             </select>
//           </div>
//         </div>

//         {/* Calendar Header */}
//         {selectedSchedule && (
//           <div className="flex items-center justify-between mb-4">
//             <div className="flex items-center space-x-4">
//               <button
//                 onClick={() => navigateMonth(-1)}
//                 className="p-2 hover:bg-gray-100 rounded-full transition-colors"
//               >
//                 <ChevronLeft className="w-5 h-5" />
//               </button>
//               <h2 className="text-xl font-semibold">
//                 {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
//               </h2>
//               <button
//                 onClick={() => navigateMonth(1)}
//                 className="p-2 hover:bg-gray-100 rounded-full transition-colors"
//               >
//                 <ChevronRight className="w-5 h-5" />
//               </button>
//             </div>

//             {calendarData && (
//               <div className="text-sm text-gray-600">
//                 <span className="font-medium">{calendarData.scheduleName}</span>
//                 <span className="mx-2">•</span>
//                 <span>Frequency: {calendarData.frequency}</span>
//               </div>
//             )}
//           </div>
//         )}
//       </div>

//       {/* Calendar Grid */}
//       {selectedSchedule && (
//         <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
//           {loading ? (
//             <div className="flex items-center justify-center h-64">
//               <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
//             </div>
//           ) : (
//             <>
//               {/* Day Headers */}
//               <div className="grid grid-cols-7 bg-gray-50">
//                 {dayNames.map((day) => (
//                   <div
//                     key={day}
//                     className="p-3 text-center text-sm font-medium text-gray-700 border-r border-gray-200 last:border-r-0"
//                   >
//                     {day}
//                   </div>
//                 ))}
//               </div>

//               {/* Calendar Days */}
//               <div className="grid grid-cols-7">
//                 {getDaysInMonth(currentDate).map((date, index) => {
//                   const events = date ? getEventsForDate(date) : [];
//                   const dateStatus = getDateStatus(date);

//                   return (
//                     <div
//                       key={index}
//                       className={getCellStyling(date, dateStatus)}
//                     >
//                       {date && (
//                         <>
//                           <div className="mb-2 flex justify-start">
//                             <div className={getDateNumberStyling(dateStatus)}>
//                               {date.getDate()}
//                             </div>
//                           </div>

//                           <div className="space-y-1">
//                             {events.slice(0, 3).map((event, eventIndex) => (
//                               <div
//                                 key={eventIndex}
//                                 className={`text-xs p-1 rounded border ${getStatusColor(
//                                   event.status,
//                                   event.isPastEvent,
//                                   dateStatus
//                                 )}`}
//                                 title={`${event.assetName} - ${
//                                   event.isPastEvent ? event.status : "SCHEDULED"
//                                 } ${
//                                   dateStatus === "past"
//                                     ? "(Past)"
//                                     : dateStatus === "today"
//                                     ? "(Today)"
//                                     : "(Future)"
//                                 }`}
//                               >
//                                 <div className="flex items-center space-x-1">
//                                   {event.isPastEvent ||
//                                   dateStatus === "past" ? (
//                                     event.status === "COMPLETED" ? (
//                                       <CheckCircle className="w-3 h-3" />
//                                     ) : (
//                                       <AlertCircle className="w-3 h-3" />
//                                     )
//                                   ) : (
//                                     <Clock
//                                       className={`w-3 h-3 ${
//                                         dateStatus === "today"
//                                           ? "text-blue-600"
//                                           : ""
//                                       }`}
//                                     />
//                                   )}
//                                   <span className="truncate">
//                                     {event.assetName}
//                                   </span>
//                                 </div>
//                               </div>
//                             ))}

//                             {events.length > 3 && (
//                               <div
//                                 className={`text-xs text-center ${
//                                   dateStatus === "past"
//                                     ? "text-gray-400"
//                                     : "text-gray-500"
//                                 }`}
//                               >
//                                 +{events.length - 3} more
//                               </div>
//                             )}
//                           </div>
//                         </>
//                       )}
//                     </div>
//                   );
//                 })}
//               </div>
//             </>
//           )}
//         </div>
//       )}

//       {/* Legend */}
//       {selectedSchedule && (
//         <div className="mt-6">
//           <div className="mb-4">
//             <h3 className="text-sm font-medium text-gray-700 mb-2">
//               Date Status:
//             </h3>
//             <div className="flex flex-wrap gap-4 text-sm">
//               <div className="flex items-center space-x-2">
//                 <div className="w-6 h-6 bg-blue-50 border-2 border-blue-200 rounded flex items-center justify-center">
//                   <div className="w-3 h-3 bg-blue-200 rounded-full"></div>
//                 </div>
//                 <span>Today</span>
//               </div>
//               <div className="flex items-center space-x-2">
//                 <div className="w-6 h-6 bg-gray-50 border border-gray-200 rounded"></div>
//                 <span>Past Dates</span>
//               </div>
//               <div className="flex items-center space-x-2">
//                 <div className="w-6 h-6 bg-white border border-gray-300 rounded"></div>
//                 <span>Future Dates</span>
//               </div>
//             </div>
//           </div>

//           <div>
//             <h3 className="text-sm font-medium text-gray-700 mb-2">
//               Event Status:
//             </h3>
//             <div className="flex flex-wrap gap-4 text-sm">
//               <div className="flex items-center space-x-2">
//                 <div className="w-4 h-4 bg-purple-200 border border-purple-400 rounded"></div>
//                 <span>Future Scheduled</span>
//               </div>
//               <div className="flex items-center space-x-2">
//                 <div className="w-4 h-4 bg-green-100 border border-green-300 rounded"></div>
//                 <span>Completed</span>
//               </div>
//               <div className="flex items-center space-x-2">
//                 <div className="w-4 h-4 bg-yellow-100 border border-yellow-300 rounded"></div>
//                 <span>Pending</span>
//               </div>
//               <div className="flex items-center space-x-2">
//                 <div className="w-4 h-4 bg-blue-100 border border-blue-300 rounded"></div>
//                 <span>Approved</span>
//               </div>
//               <div className="flex items-center space-x-2">
//                 <div className="w-4 h-4 bg-red-100 border border-red-300 rounded"></div>
//                 <span>Rejected</span>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default PMScheduleCalendar;

"use client";

import { useState, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Clock,
  AlertCircle,
  CheckCircle,
  CalendarIcon,
} from "lucide-react";
import { workRequestService } from "../../services/WorkRequestService";
import { contractService } from "../../services/contractService";
import toast from "react-hot-toast";

const PMScheduleCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [calendarData, setCalendarData] = useState(null);
  const [contracts, setContracts] = useState([]);
  const [pmSchedules, setPmSchedules] = useState([]);
  const [selectedContract, setSelectedContract] = useState("");
  const [selectedSchedule, setSelectedSchedule] = useState("");
  const [loading, setLoading] = useState(false);

  const normalizeDate = (date) => {
    return new Date(
      Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
    );
  };

  useEffect(() => {
    fetchContracts();
  }, []);

  useEffect(() => {
    if (selectedContract) {
      fetchPmSchedules();
    }
  }, [selectedContract]);

  useEffect(() => {
    if (selectedSchedule && selectedContract) {
      fetchCalendarData();
    }
  }, [selectedSchedule, selectedContract]);

  const fetchContracts = async () => {
    try {
      const response = await contractService.getAllContracts();
      setContracts(response.data);
    } catch (error) {
      toast.error("Failed to fetch contracts");
      console.error("Error fetching contracts:", error);
    }
  };

  const fetchPmSchedules = async () => {
    try {
      const response = await workRequestService.getPmSchedulesByContract(
        selectedContract
      );
      setPmSchedules(response.data);
    } catch (error) {
      toast.error("Failed to fetch PM schedules");
      console.error("Error fetching PM schedules:", error);
    }
  };

  const fetchCalendarData = async () => {
    if (!selectedSchedule || !selectedContract) return;

    setLoading(true);
    try {
      const response = await workRequestService.getPmScheduleCalendar(
        selectedSchedule,
        selectedContract,
        null, // Let backend determine date range
        null,
        0,
        50
      );

      if (response.data && response.data.startDate && response.data.endDate) {
        setCalendarData(response.data);
        const scheduleStartDate = normalizeDate(
          new Date(response.data.startDate)
        );
        setCurrentDate(scheduleStartDate); // Set to start date initially
      } else {
        setCalendarData(null);
        toast.error("Invalid calendar data received");
      }
    } catch (error) {
      toast.error("Failed to fetch calendar data");
      console.error("Error fetching calendar data:", error);
      setCalendarData(null);
    } finally {
      setLoading(false);
    }
  };

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);
    const days = [];
    const startingDayOfWeek = firstDayOfMonth.getDay();

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }

    // Add all days of the month
    let currentDate = new Date(firstDayOfMonth);
    while (currentDate <= lastDayOfMonth) {
      days.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }

    // Fill remaining cells to complete the last week
    const totalCells = Math.ceil((days.length + startingDayOfWeek) / 7) * 7;
    while (days.length < totalCells) {
      days.push(null);
    }

    return days;
  };

  const getEventsForDate = (date) => {
    if (
      !calendarData ||
      !calendarData.startDate ||
      !calendarData.endDate ||
      !date
    ) {
      return [];
    }

    const scheduleStartDate = normalizeDate(new Date(calendarData.startDate));
    const scheduleEndDate = normalizeDate(new Date(calendarData.endDate));
    const compareDate = normalizeDate(date);

    // Only return events if the date is within the schedule's range
    if (compareDate < scheduleStartDate || compareDate > scheduleEndDate) {
      return [];
    }

    const dateString = normalizeDate(date).toISOString().split("T")[0];
    return calendarData.events.filter((event) => {
      const eventDate = normalizeDate(new Date(event.date))
        .toISOString()
        .split("T")[0];
      return eventDate === dateString;
    });
  };

  const getDateStatus = (date) => {
    if (!date) return null;

    const today = normalizeDate(new Date());
    const compareDate = normalizeDate(date);

    if (compareDate.getTime() === today.getTime()) return "today";
    if (compareDate < today) return "past";
    return "future";
  };

  const getStatusColor = (status, isPastEvent, dateStatus) => {
    if (isPastEvent || dateStatus === "past") {
      switch (status) {
        case "COMPLETED":
          return "bg-green-100 text-green-700 border-green-300";
        case "PENDING":
          return "bg-yellow-100 text-yellow-700 border-yellow-300";
        case "APPROVED":
          return "bg-blue-100 text-blue-700 border-blue-300";
        case "REJECTED":
          return "bg-red-100 text-red-700 border-red-300";
        default:
          return "bg-gray-100 text-gray-600 border-gray-300";
      }
    } else {
      return "bg-purple-200 text-purple-800 border-purple-400 font-medium";
    }
  };

  const getCellStyling = (date, dateStatus) => {
    const baseClasses =
      "min-h-[120px] p-2 border-r border-b border-gray-200 last:border-r-0";

    if (!date) {
      return `${baseClasses} bg-gray-50`;
    }

    // Dim dates outside the schedule's range
    if (calendarData && calendarData.startDate && calendarData.endDate) {
      const scheduleStartDate = normalizeDate(new Date(calendarData.startDate));
      const scheduleEndDate = normalizeDate(new Date(calendarData.endDate));
      const compareDate = normalizeDate(date);
      if (compareDate < scheduleStartDate || compareDate > scheduleEndDate) {
        return `${baseClasses} bg-gray-50 opacity-50`;
      }
    }

    switch (dateStatus) {
      case "today":
        return `${baseClasses} bg-blue-50 border-blue-200 shadow-inner`;
      case "past":
        return `${baseClasses} bg-gray-50 hover:bg-gray-100`;
      case "future":
        return `${baseClasses} bg-white hover:bg-gray-50`;
      default:
        return `${baseClasses} bg-white hover:bg-gray-50`;
    }
  };

  const getDateNumberStyling = (dateStatus) => {
    switch (dateStatus) {
      case "today":
        return "text-sm font-bold text-blue-700 bg-blue-200 rounded-full w-6 h-6 flex items-center justify-center";
      case "past":
        return "text-sm font-medium text-gray-400";
      case "future":
        return "text-sm font-medium text-gray-900";
      default:
        return "text-sm font-medium text-gray-900";
    }
  };

  const navigateMonth = (direction) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + direction);
    setCurrentDate(newDate);
  };

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <div className="p-6 bg-white rounded-lg shadow-sm">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
          <CalendarIcon className="w-6 h-6 mr-2 text-blue-600" />
          PM Schedule Calendar
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Contract
            </label>
            <select
              value={selectedContract}
              onChange={(e) => setSelectedContract(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select a contract</option>
              {contracts.map((contract) => (
                <option key={contract.contractId} value={contract.contractId}>
                  {contract.contractName}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select PM Schedule
            </label>
            <select
              value={selectedSchedule}
              onChange={(e) => setSelectedSchedule(e.target.value)}
              disabled={!selectedContract}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
            >
              <option value="">Select a PM schedule</option>
              {pmSchedules.map((schedule) => (
                <option key={schedule.scheduleId} value={schedule.scheduleId}>
                  {schedule.name} ({schedule.frequency})
                </option>
              ))}
            </select>
          </div>
        </div>

        {selectedSchedule && (
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigateMonth(-1)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <h2 className="text-xl font-semibold">
                {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
              </h2>
              <button
                onClick={() => navigateMonth(1)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {calendarData && (
              <div className="text-sm text-gray-600">
                <span className="font-medium">{calendarData.scheduleName}</span>
                <span className="mx-2">•</span>
                <span>Frequency: {calendarData.frequency}</span>
              </div>
            )}
          </div>
        )}
      </div>

      {selectedSchedule && (
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
          {loading ? (
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
          ) : !calendarData ? (
            <div className="flex items-center justify-center h-64 text-gray-600">
              No calendar data available. Please select a valid schedule.
            </div>
          ) : (
            <>
              <div className="grid grid-cols-7 bg-gray-50">
                {dayNames.map((day) => (
                  <div
                    key={day}
                    className="p-3 text-center text-sm font-medium text-gray-700 border-r border-gray-200 last:border-r-0"
                  >
                    {day}
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-7">
                {getDaysInMonth(currentDate).map((date, index) => {
                  const events = date ? getEventsForDate(date) : [];
                  const dateStatus = getDateStatus(date);

                  return (
                    <div
                      key={index}
                      className={getCellStyling(date, dateStatus)}
                    >
                      {date && (
                        <>
                          <div className="mb-2 flex justify-start">
                            <div className={getDateNumberStyling(dateStatus)}>
                              {date.getDate()}
                            </div>
                          </div>

                          <div className="space-y-1">
                            {events.slice(0, 3).map((event, eventIndex) => (
                              <div
                                key={eventIndex}
                                className={`text-xs p-1 rounded border ${getStatusColor(
                                  event.status,
                                  event.isPastEvent,
                                  dateStatus
                                )}`}
                                title={`${event.assetName} - ${
                                  event.isPastEvent ? event.status : "SCHEDULED"
                                } ${
                                  dateStatus === "past"
                                    ? "(Past)"
                                    : dateStatus === "today"
                                    ? "(Today)"
                                    : "(Future)"
                                }`}
                              >
                                <div className="flex items-center space-x-1">
                                  {event.isPastEvent ||
                                  dateStatus === "past" ? (
                                    event.status === "COMPLETED" ? (
                                      <CheckCircle className="w-3 h-3" />
                                    ) : (
                                      <AlertCircle className="w-3 h-3" />
                                    )
                                  ) : (
                                    <Clock
                                      className={`w-3 h-3 ${
                                        dateStatus === "today"
                                          ? "text-blue-600"
                                          : ""
                                      }`}
                                    />
                                  )}
                                  <span className="truncate">
                                    {event.assetName}
                                  </span>
                                </div>
                              </div>
                            ))}

                            {events.length > 3 && (
                              <div
                                className={`text-xs text-center ${
                                  dateStatus === "past"
                                    ? "text-gray-400"
                                    : "text-gray-500"
                                }`}
                              >
                                +{events.length - 3} more
                              </div>
                            )}
                          </div>
                        </>
                      )}
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>
      )}

      {selectedSchedule && (
        <div className="mt-6">
          <div className="mb-4">
            <h3 className="text-sm font-medium text-gray-700 mb-2">
              Date Status:
            </h3>
            <div className="flex flex-wrap gap-4 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-blue-50 border-2 border-blue-200 rounded flex items-center justify-center">
                  <div className="w-3 h-3 bg-blue-200 rounded-full"></div>
                </div>
                <span>Today</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-gray-50 border border-gray-200 rounded"></div>
                <span>Past Dates</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-white border border-gray-300 rounded"></div>
                <span>Future Dates</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-gray-50 opacity-50 border border-gray-200 rounded"></div>
                <span>Outside Schedule Range</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2">
              Event Status:
            </h3>
            <div className="flex flex-wrap gap-4 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-purple-200 border border-purple-400 rounded"></div>
                <span>Future Scheduled</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-green-100 border border-green-300 rounded"></div>
                <span>Completed</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-yellow-100 border border-yellow-300 rounded"></div>
                <span>Pending</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-blue-100 border border-blue-300 rounded"></div>
                <span>Approved</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-red-100 border border-red-300 rounded"></div>
                <span>Rejected</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PMScheduleCalendar;
