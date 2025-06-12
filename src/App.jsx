// import { Routes, Route } from "react-router-dom";
// import { AuthProvider } from "./context/AuthContext";
// import Sidebar from "./components/Sidebar";
// import Dashboard from "./pages/Dashboard";
// import CompanyManagement from "./pages/CompanyManagement";
// import ContractManagement from "./pages/ContractManagement";
// import Login from "./pages/Login";
// import ProtectedRoute from "./components/ProtectedRoute";

// function App() {
//   return (
//     <AuthProvider>
//       <div className="flex min-h-screen bg-gray-100">
//         <Routes>
//           <Route path="/login" element={<Login />} />
//           <Route
//             path="/*"
//             element={
//               <ProtectedRoute>
//                 <div className="flex flex-1">
//                   <Sidebar />
//                   <main className="flex-1 ml-64 p-6 overflow-auto">
//                     <div className="max-w-7xl mx-auto">
//                       <Routes>
//                         <Route path="/dashboard" element={<Dashboard />} />
//                         <Route
//                           path="/companies"
//                           element={<CompanyManagement />}
//                         />
//                         <Route
//                           path="/contracts"
//                           element={<ContractManagement />}
//                         />
//                         <Route
//                           path="/sla"
//                           element={
//                             <div className="p-6 bg-white rounded-xl shadow-lg">
//                               SLA Page (To be implemented)
//                             </div>
//                           }
//                         />
//                         <Route
//                           path="/assets"
//                           element={
//                             <div className="p-6 bg-white rounded-xl shadow-lg">
//                               Assets Page (To be implemented)
//                             </div>
//                           }
//                         />
//                         <Route
//                           path="/workrequests"
//                           element={
//                             <div className="p-6 bg-white rounded-xl shadow-lg">
//                               Work Requests Page (To be implemented)
//                             </div>
//                           }
//                         />
//                         <Route path="/" element={<Dashboard />} />
//                       </Routes>
//                     </div>
//                   </main>
//                 </div>
//               </ProtectedRoute>
//             }
//           />
//         </Routes>
//       </div>
//     </AuthProvider>
//   );
// }

// export default App;

// import { Routes, Route } from "react-router-dom";
// import { AuthProvider } from "./context/AuthContext";
// import Sidebar from "./components/Sidebar";
// import Dashboard from "./pages/Dashboard";
// import CompanyManagement from "./pages/CompanyManagement";
// import ContractManagement from "./pages/ContractManagement";
// import ContractList from "./pages/ContractList";
// import ContractDetail from "./pages/ContractDetail";
// import Login from "./pages/Login";
// import ProtectedRoute from "./components/ProtectedRoute";

// function App() {
//   return (
//     <AuthProvider>
//       <div className="flex min-h-screen bg-gray-100">
//         <Routes>
//           <Route path="/login" element={<Login />} />
//           <Route
//             path="/*"
//             element={
//               <ProtectedRoute>
//                 <div className="flex flex-1">
//                   <Sidebar />
//                   <main className="flex-1 ml-64 p-6 overflow-auto">
//                     <div className="max-w-7xl mx-auto">
//                       <Routes>
//                         <Route path="/dashboard" element={<Dashboard />} />
//                         <Route
//                           path="/companies"
//                           element={<CompanyManagement />}
//                         />
//                         <Route
//                           path="/contracts"
//                           element={<ContractManagement />}
//                         />
//                         <Route
//                           path="/contracts/list"
//                           element={<ContractList />}
//                         />
//                         <Route
//                           path="/contracts/:contractId"
//                           element={<ContractDetail />}
//                         />
//                         <Route
//                           path="/sla"
//                           element={
//                             <div className="p-6 bg-white rounded-xl shadow-lg">
//                               SLA Page (To be implemented)
//                             </div>
//                           }
//                         />
//                         <Route
//                           path="/assets"
//                           element={
//                             <div className="p-6 bg-white rounded-xl shadow-lg">
//                               Assets Page (To be implemented)
//                             </div>
//                           }
//                         />
//                         <Route
//                           path="/workrequests"
//                           element={
//                             <div className="p-6 bg-white rounded-xl shadow-lg">
//                               Work Requests Page (To be implemented)
//                             </div>
//                           }
//                         />
//                         <Route path="/" element={<Dashboard />} />
//                       </Routes>
//                     </div>
//                   </main>
//                 </div>
//               </ProtectedRoute>
//             }
//           />
//         </Routes>
//       </div>
//     </AuthProvider>
//   );
// }

// export default App;

// import { Routes, Route } from "react-router-dom";
// import { AuthProvider } from "./context/AuthContext";
// import Sidebar from "./components/Sidebar";
// import Dashboard from "./pages/Dashboard";
// import CompanyManagement from "./pages/CompanyManagement";
// import CompanyList from "./pages/CompanyList";
// import CompanyUpdate from "./pages/CompanyUpdate";
// import ContractManagement from "./pages/ContractManagement";
// import ContractList from "./pages/ContractList";
// import ContractDetail from "./pages/ContractDetail";
// import Login from "./pages/Login";
// import ProtectedRoute from "./components/ProtectedRoute";

// function App() {
//   return (
//     <AuthProvider>
//       <div className="flex min-h-screen bg-gray-100">
//         <Routes>
//           <Route path="/login" element={<Login />} />
//           <Route
//             path="/*"
//             element={
//               <ProtectedRoute>
//                 <div className="flex flex-1">
//                   <Sidebar />
//                   <main className="flex-1 ml-64 p-6 overflow-auto">
//                     <div className="max-w-7xl mx-auto">
//                       <Routes>
//                         <Route path="/dashboard" element={<Dashboard />} />
//                         <Route
//                           path="/companies"
//                           element={<CompanyManagement />}
//                         />
//                         <Route
//                           path="/companies/list"
//                           element={<CompanyList />}
//                         />
//                         <Route
//                           path="/companies/:companyId"
//                           element={<CompanyUpdate />}
//                         />
//                         <Route
//                           path="/contracts"
//                           element={<ContractManagement />}
//                         />
//                         <Route
//                           path="/contracts/list"
//                           element={<ContractList />}
//                         />
//                         <Route
//                           path="/contracts/:contractId"
//                           element={<ContractDetail />}
//                         />
//                         <Route
//                           path="/sla"
//                           element={
//                             <div className="p-6 bg-white rounded-xl shadow-lg">
//                               SLA Page (To be implemented)
//                             </div>
//                           }
//                         />
//                         <Route
//                           path="/assets"
//                           element={
//                             <div className="p-6 bg-white rounded-xl shadow-lg">
//                               Assets Page (To be implemented)
//                             </div>
//                           }
//                         />
//                         <Route
//                           path="/workrequests"
//                           element={
//                             <div className="p-6 bg-white rounded-xl shadow-lg">
//                               Work Requests Page (To be implemented)
//                             </div>
//                           }
//                         />
//                         <Route path="/" element={<Dashboard />} />
//                       </Routes>
//                     </div>
//                   </main>
//                 </div>
//               </ProtectedRoute>
//             }
//           />
//         </Routes>
//       </div>
//     </AuthProvider>
//   );
// }

// export default App;

// //11111
// import { Routes, Route } from "react-router-dom";
// import { AuthProvider } from "./context/AuthContext";
// import { ServiceProvider } from "./context/ServiceContext";
// import Sidebar from "./components/Sidebar";
// import Dashboard from "./pages/Dashboard";
// import CompanyManagement from "./pages/CompanyManagement";
// import CompanyList from "./pages/CompanyList";
// import CompanyUpdate from "./pages/CompanyUpdate";
// import ContractManagement from "./pages/ContractManagement";
// import ContractList from "./pages/ContractList";
// import ContractDetail from "./pages/ContractDetail";
// import ServiceManagement from "./pages/ServiceManagement";
// import ServiceForm from "./components/ServiceManagement/ServiceForm";
// import SubServiceForm from "./components/ServiceManagement/SubServiceForm";
// import ServiceScopeForm from "./components/ServiceManagement/ServiceScopeForm";
// import BulkServiceForm from "./components/ServiceManagement/BulkServiceForm";
// import BulkUpdateServiceForm from "./components/ServiceManagement/BulkUpdateServiceForm";
// import Login from "./pages/Login";
// import ProtectedRoute from "./components/ProtectedRoute";

// function App() {
//   return (
//     <AuthProvider>
//       <ServiceProvider>
//         <div className="flex min-h-screen bg-gray-100">
//           <Routes>
//             <Route path="/login" element={<Login />} />
//             <Route
//               path="/*"
//               element={
//                 <ProtectedRoute>
//                   <div className="flex flex-1">
//                     <Sidebar />
//                     <main className="flex-1 ml-64 p-6 overflow-auto">
//                       <div className="max-w-7xl mx-auto">
//                         <Routes>
//                           <Route path="/dashboard" element={<Dashboard />} />
//                           <Route
//                             path="/companies"
//                             element={<CompanyManagement />}
//                           />
//                           <Route
//                             path="/companies/list"
//                             element={<CompanyList />}
//                           />
//                           <Route
//                             path="/companies/:companyId"
//                             element={<CompanyUpdate />}
//                           />
//                           <Route
//                             path="/contracts"
//                             element={<ContractManagement />}
//                           />
//                           <Route
//                             path="/contracts/list"
//                             element={<ContractList />}
//                           />
//                           <Route
//                             path="/contracts/:contractId"
//                             element={<ContractDetail />}
//                           />
//                           <Route
//                             path="/services"
//                             element={<ServiceManagement />}
//                           />
//                           <Route
//                             path="/services/create"
//                             element={<ServiceForm />}
//                           />
//                           <Route
//                             path="/services/edit/:serviceId"
//                             element={<ServiceForm isEdit />}
//                           />
//                           <Route
//                             path="/services/bulk-create"
//                             element={<BulkServiceForm />}
//                           />
//                           <Route
//                             path="/services/bulk-update"
//                             element={<BulkUpdateServiceForm />}
//                           />
//                           <Route
//                             path="/services/sub-services/create"
//                             element={<SubServiceForm />}
//                           />
//                           <Route
//                             path="/services/sub-services/edit/:subServiceId"
//                             element={<SubServiceForm isEdit />}
//                           />
//                           <Route
//                             path="/services/service-scopes/create"
//                             element={<ServiceScopeForm />}
//                           />
//                           <Route
//                             path="/services/service-scopes/edit/:scopeId"
//                             element={<ServiceScopeForm isEdit />}
//                           />
//                           <Route
//                             path="/sla"
//                             element={
//                               <div className="p-6 bg-white rounded-xl shadow-lg">
//                                 SLA Page (To be implemented)
//                               </div>
//                             }
//                           />
//                           <Route
//                             path="/assets"
//                             element={
//                               <div className="p-6 bg-white rounded-xl shadow-lg">
//                                 Assets Page (To be implemented)
//                               </div>
//                             }
//                           />
//                           <Route
//                             path="/workrequests"
//                             element={
//                               <div className="p-6 bg-white rounded-xl shadow-lg">
//                                 Work Requests Page (To be implemented)
//                               </div>
//                             }
//                           />
//                           <Route path="/" element={<Dashboard />} />
//                         </Routes>
//                       </div>
//                     </main>
//                   </div>
//                 </ProtectedRoute>
//               }
//             />
//           </Routes>
//         </div>
//       </ServiceProvider>
//     </AuthProvider>
//   );
// }

// export default App;

// //44444444

// import { Routes, Route } from "react-router-dom";
// import { AuthProvider } from "./context/AuthContext";
// import { ServiceProvider } from "./context/ServiceContext";
// import Sidebar from "./components/Sidebar";
// import Dashboard from "./pages/Dashboard";
// import CompanyManagement from "./pages/CompanyManagement";
// import CompanyList from "./pages/CompanyList";
// import CompanyUpdate from "./pages/CompanyUpdate";
// import ContractManagement from "./pages/ContractManagement";
// import ContractList from "./pages/ContractList";
// import ContractDetail from "./pages/ContractDetail";
// import ServiceManagement from "./pages/ServiceManagement";
// import ServiceForm from "./components/ServiceManagement/ServiceForm";
// import SubServiceForm from "./components/ServiceManagement/SubServiceForm";
// import ServiceScopeForm from "./components/ServiceManagement/ServiceScopeForm";
// import BulkServiceForm from "./components/ServiceManagement/BulkServiceForm";
// import BulkSubServiceForm from "./components/ServiceManagement/BulkSubServiceForm";
// import BulkServiceScopeForm from "./components/ServiceManagement/BulkServiceScopeForm";
// import BulkUpdateServiceForm from "./components/ServiceManagement/BulkUpdateServiceForm";
// import BulkUpdateSubServiceForm from "./components/ServiceManagement/BulkUpdateSubServiceForm";
// import BulkUpdateServiceScopeForm from "./components/ServiceManagement/BulkUpdateServiceScopeForm";
// import Login from "./pages/Login";
// import ProtectedRoute from "./components/ProtectedRoute";

// function App() {
//   return (
//     <AuthProvider>
//       <ServiceProvider>
//         <div className="flex min-h-screen bg-gray-100">
//           <Routes>
//             <Route path="/login" element={<Login />} />
//             <Route
//               path="/*"
//               element={
//                 <ProtectedRoute>
//                   <div className="flex flex-1">
//                     <Sidebar />
//                     <main className="flex-1 ml-64 p-6 overflow-auto">
//                       <div className="max-w-7xl mx-auto">
//                         <Routes>
//                           <Route path="/dashboard" element={<Dashboard />} />
//                           <Route
//                             path="/companies"
//                             element={<CompanyManagement />}
//                           />
//                           <Route
//                             path="/companies/list"
//                             element={<CompanyList />}
//                           />
//                           <Route
//                             path="/companies/:companyId"
//                             element={<CompanyUpdate />}
//                           />
//                           <Route
//                             path="/contracts"
//                             element={<ContractManagement />}
//                           />
//                           <Route
//                             path="/contracts/list"
//                             element={<ContractList />}
//                           />
//                           <Route
//                             path="/contracts/:contractId"
//                             element={<ContractDetail />}
//                           />
//                           <Route
//                             path="/services"
//                             element={<ServiceManagement />}
//                           />
//                           <Route
//                             path="/services/create"
//                             element={<ServiceForm />}
//                           />
//                           <Route
//                             path="/services/edit/:serviceId"
//                             element={<ServiceForm isEdit />}
//                           />
//                           <Route
//                             path="/services/bulk-create"
//                             element={<BulkServiceForm />}
//                           />
//                           <Route
//                             path="/services/bulk-update"
//                             element={<BulkUpdateServiceForm />}
//                           />
//                           <Route
//                             path="/services/sub-services/create"
//                             element={<SubServiceForm />}
//                           />
//                           <Route
//                             path="/services/sub-services/edit/:subServiceId"
//                             element={<SubServiceForm isEdit />}
//                           />
//                           <Route
//                             path="/services/sub-services/bulk-create"
//                             element={<BulkSubServiceForm />}
//                           />
//                           <Route
//                             path="/services/sub-services/bulk-update"
//                             element={<BulkUpdateSubServiceForm />}
//                           />
//                           <Route
//                             path="/services/service-scopes/create"
//                             element={<ServiceScopeForm />}
//                           />
//                           <Route
//                             path="/services/service-scopes/edit/:scopeId"
//                             element={<ServiceScopeForm isEdit />}
//                           />
//                           <Route
//                             path="/services/service-scopes/bulk-create"
//                             element={<BulkServiceScopeForm />}
//                           />
//                           <Route
//                             path="/services/service-scopes/bulk-update"
//                             element={<BulkUpdateServiceScopeForm />}
//                           />
//                           <Route
//                             path="/sla"
//                             element={
//                               <div className="p-6 bg-white rounded-xl shadow-lg">
//                                 SLA Page (To be implemented)
//                               </div>
//                             }
//                           />
//                           <Route
//                             path="/assets"
//                             element={
//                               <div className="p-6 bg-white rounded-xl shadow-lg">
//                                 Assets Page (To be implemented)
//                               </div>
//                             }
//                           />
//                           <Route
//                             path="/workrequests"
//                             element={
//                               <div className="p-6 bg-white rounded-xl shadow-lg">
//                                 Work Requests Page (To be implemented)
//                               </div>
//                             }
//                           />
//                           <Route path="/" element={<Dashboard />} />
//                         </Routes>
//                       </div>
//                     </main>
//                   </div>
//                 </ProtectedRoute>
//               }
//             />
//           </Routes>
//         </div>
//       </ServiceProvider>
//     </AuthProvider>
//   );
// }

// export default App;
//222222222222222
// import { Routes, Route } from "react-router-dom";
// import { AuthProvider } from "./context/AuthContext";
// import { ServiceProvider } from "./context/ServiceContext";
// import Sidebar from "./components/Sidebar";
// import Dashboard from "./pages/Dashboard";
// import CompanyManagement from "./pages/CompanyManagement";
// import CompanyList from "./pages/CompanyList";
// import CompanyUpdate from "./pages/CompanyUpdate";
// import ContractManagement from "./pages/ContractManagement";
// import ContractList from "./pages/ContractList";
// import ContractDetail from "./pages/ContractDetail";
// import UpdateContract from "./pages/UpdateContract";
// import ServiceManagement from "./pages/ServiceManagement";
// import ServiceForm from "./components/ServiceManagement/ServiceForm";
// import SubServiceForm from "./components/ServiceManagement/SubServiceForm";
// import ServiceScopeForm from "./components/ServiceManagement/ServiceScopeForm";
// import BulkServiceForm from "./components/ServiceManagement/BulkServiceForm";
// import BulkSubServiceForm from "./components/ServiceManagement/BulkSubServiceForm";
// import BulkServiceScopeForm from "./components/ServiceManagement/BulkServiceScopeForm";
// import BulkUpdateServiceForm from "./components/ServiceManagement/BulkUpdateServiceForm";
// import BulkUpdateSubServiceForm from "./components/ServiceManagement/BulkUpdateSubServiceForm";
// import BulkUpdateServiceScopeForm from "./components/ServiceManagement/BulkUpdateServiceScopeForm";
// import Login from "./pages/Login";
// import ProtectedRoute from "./components/ProtectedRoute";

// function App() {
//   return (
//     <AuthProvider>
//       <ServiceProvider>
//         <div className="flex min-h-screen bg-gray-100">
//           <Routes>
//             <Route path="/login" element={<Login />} />
//             <Route
//               path="/*"
//               element={
//                 <ProtectedRoute>
//                   <div className="flex flex-1">
//                     <Sidebar />
//                     <main className="flex-1 ml-64 p-6 overflow-auto">
//                       <div className="max-w-7xl mx-auto">
//                         <Routes>
//                           <Route path="/dashboard" element={<Dashboard />} />
//                           <Route
//                             path="/companies"
//                             element={<CompanyManagement />}
//                           />
//                           <Route
//                             path="/companies/list"
//                             element={<CompanyList />}
//                           />
//                           <Route
//                             path="/companies/:companyId"
//                             element={<CompanyUpdate />}
//                           />
//                           <Route
//                             path="/contracts"
//                             element={<ContractManagement />}
//                           />
//                           <Route
//                             path="/contracts/list"
//                             element={<ContractList />}
//                           />
//                           <Route
//                             path="/contracts/:contractId"
//                             element={<ContractDetail />}
//                           />
//                           <Route
//                             path="/contracts/update/:contractId"
//                             element={<UpdateContract />}
//                           />
//                           <Route
//                             path="/services"
//                             element={<ServiceManagement />}
//                           />
//                           <Route
//                             path="/services/create"
//                             element={<ServiceForm />}
//                           />
//                           <Route
//                             path="/services/edit/:serviceId"
//                             element={<ServiceForm isEdit />}
//                           />
//                           <Route
//                             path="/services/bulk-create"
//                             element={<BulkServiceForm />}
//                           />
//                           <Route
//                             path="/services/bulk-update"
//                             element={<BulkUpdateServiceForm />}
//                           />
//                           <Route
//                             path="/services/sub-services/create"
//                             element={<SubServiceForm />}
//                           />
//                           <Route
//                             path="/services/sub-services/edit/:subServiceId"
//                             element={<SubServiceForm isEdit />}
//                           />
//                           <Route
//                             path="/services/sub-services/bulk-create"
//                             element={<BulkSubServiceForm />}
//                           />
//                           <Route
//                             path="/services/sub-services/bulk-update"
//                             element={<BulkUpdateSubServiceForm />}
//                           />
//                           <Route
//                             path="/services/service-scopes/create"
//                             element={<ServiceScopeForm />}
//                           />
//                           <Route
//                             path="/services/service-scopes/edit/:scopeId"
//                             element={<ServiceScopeForm isEdit />}
//                           />
//                           <Route
//                             path="/services/service-scopes/bulk-create"
//                             element={<BulkServiceScopeForm />}
//                           />
//                           <Route
//                             path="/services/service-scopes/bulk-update"
//                             element={<BulkUpdateServiceScopeForm />}
//                           />
//                           <Route
//                             path="/sla"
//                             element={
//                               <div className="p-6 bg-white rounded-xl shadow-lg">
//                                 SLA Page (To be implemented)
//                               </div>
//                             }
//                           />
//                           <Route
//                             path="/assets"
//                             element={
//                               <div className="p-6 bg-white rounded-xl shadow-lg">
//                                 Assets Page (To be implemented)
//                               </div>
//                             }
//                           />
//                           <Route
//                             path="/workrequests"
//                             element={
//                               <div className="p-6 bg-white rounded-xl shadow-lg">
//                                 Work Requests Page (To be implemented)
//                               </div>
//                             }
//                           />
//                           <Route path="/" element={<Dashboard />} />
//                         </Routes>
//                       </div>
//                     </main>
//                   </div>
//                 </ProtectedRoute>
//               }
//             />
//           </Routes>
//         </div>
//       </ServiceProvider>
//     </AuthProvider>
//   );
// }

// export default App;
///55555555555
// import { Routes, Route } from "react-router-dom";
// import { AuthProvider } from "./context/AuthContext";
// import { ServiceProvider } from "./context/ServiceContext";
// import { PropertyFlowProvider } from "./context/PropertyFlowContext";
// import Sidebar from "./components/Sidebar";
// import Dashboard from "./pages/Dashboard";
// import CompanyManagement from "./pages/CompanyManagement";
// import CompanyList from "./pages/CompanyList";
// import CompanyUpdate from "./pages/CompanyUpdate";
// import ContractManagement from "./pages/ContractManagement";
// import ContractList from "./pages/ContractList";
// import ContractDetail from "./pages/ContractDetail";
// import UpdateContract from "./pages/UpdateContract";
// import ServiceManagement from "./pages/ServiceManagement";
// import ServiceForm from "./components/ServiceManagement/ServiceForm";
// import SubServiceForm from "./components/ServiceManagement/SubServiceForm";
// import ServiceScopeForm from "./components/ServiceManagement/ServiceScopeForm";
// import BulkServiceForm from "./components/ServiceManagement/BulkServiceForm";
// import BulkSubServiceForm from "./components/ServiceManagement/BulkSubServiceForm";
// import BulkServiceScopeForm from "./components/ServiceManagement/BulkServiceScopeForm";
// import BulkUpdateServiceForm from "./components/ServiceManagement/BulkUpdateServiceForm";
// import BulkUpdateSubServiceForm from "./components/ServiceManagement/BulkUpdateSubServiceForm";
// import BulkUpdateServiceScopeForm from "./components/ServiceManagement/BulkUpdateServiceScopeForm";
// import Login from "./pages/Login";
// import ProtectedRoute from "./components/ProtectedRoute";

// // Property Flow Components
// import PropertyFlowManagement from "./pages/PropertyFlowManagement";
// import ZoneForm from "./components/PropertyFlow/ZoneForm";
// import SubZoneForm from "./components/PropertyFlow/SubZoneForm";
// import BuildingForm from "./components/PropertyFlow/BuildingForm";
// import VillaApartmentForm from "./components/PropertyFlow/VillaApartmentForm";
// import FloorForm from "./components/PropertyFlow/FloorForm";
// import RoomForm from "./components/PropertyFlow/RoomForm";
// import PropertyFlowDiagram from "./components/PropertyFlow/PropertyFlowDiagram";

// function App() {
//   return (
//     <AuthProvider>
//       <ServiceProvider>
//         <PropertyFlowProvider>
//           <div className="flex min-h-screen bg-gray-100">
//             <Routes>
//               <Route path="/login" element={<Login />} />
//               <Route
//                 path="/*"
//                 element={
//                   <ProtectedRoute>
//                     <div className="flex flex-1">
//                       <Sidebar />
//                       <main className="flex-1 ml-64 p-6 overflow-auto">
//                         <div className="max-w-7xl mx-auto">
//                           <Routes>
//                             <Route path="/dashboard" element={<Dashboard />} />
//                             <Route
//                               path="/companies"
//                               element={<CompanyManagement />}
//                             />
//                             <Route
//                               path="/companies/list"
//                               element={<CompanyList />}
//                             />
//                             <Route
//                               path="/companies/:companyId"
//                               element={<CompanyUpdate />}
//                             />
//                             <Route
//                               path="/contracts"
//                               element={<ContractManagement />}
//                             />
//                             <Route
//                               path="/contracts/list"
//                               element={<ContractList />}
//                             />
//                             <Route
//                               path="/contracts/:contractId"
//                               element={<ContractDetail />}
//                             />
//                             <Route
//                               path="/contracts/update/:contractId"
//                               element={<UpdateContract />}
//                             />
//                             <Route
//                               path="/services"
//                               element={<ServiceManagement />}
//                             />
//                             <Route
//                               path="/services/create"
//                               element={<ServiceForm />}
//                             />
//                             <Route
//                               path="/services/edit/:serviceId"
//                               element={<ServiceForm isEdit />}
//                             />
//                             <Route
//                               path="/services/bulk-create"
//                               element={<BulkServiceForm />}
//                             />
//                             <Route
//                               path="/services/bulk-update"
//                               element={<BulkUpdateServiceForm />}
//                             />
//                             <Route
//                               path="/services/sub-services/create"
//                               element={<SubServiceForm />}
//                             />
//                             <Route
//                               path="/services/sub-services/edit/:subServiceId"
//                               element={<SubServiceForm isEdit />}
//                             />
//                             <Route
//                               path="/services/sub-services/bulk-create"
//                               element={<BulkSubServiceForm />}
//                             />
//                             <Route
//                               path="/services/sub-services/bulk-update"
//                               element={<BulkUpdateSubServiceForm />}
//                             />
//                             <Route
//                               path="/services/service-scopes/create"
//                               element={<ServiceScopeForm />}
//                             />
//                             <Route
//                               path="/services/service-scopes/edit/:scopeId"
//                               element={<ServiceScopeForm isEdit />}
//                             />
//                             <Route
//                               path="/services/service-scopes/bulk-create"
//                               element={<BulkServiceScopeForm />}
//                             />
//                             <Route
//                               path="/services/service-scopes/bulk-update"
//                               element={<BulkUpdateServiceScopeForm />}
//                             />

//                             {/* Property Flow Routes */}
//                             <Route
//                               path="/property-flow"
//                               element={<PropertyFlowManagement />}
//                             />
//                             <Route
//                               path="/property-flow/zones/create"
//                               element={<ZoneForm />}
//                             />
//                             <Route
//                               path="/property-flow/zones/edit/:zoneId"
//                               element={<ZoneForm isEdit />}
//                             />
//                             <Route
//                               path="/property-flow/sub-zones/create"
//                               element={<SubZoneForm />}
//                             />
//                             <Route
//                               path="/property-flow/sub-zones/edit/:subZoneId"
//                               element={<SubZoneForm isEdit />}
//                             />
//                             <Route
//                               path="/property-flow/buildings/create"
//                               element={<BuildingForm />}
//                             />
//                             <Route
//                               path="/property-flow/buildings/edit/:buildingId"
//                               element={<BuildingForm isEdit />}
//                             />
//                             <Route
//                               path="/property-flow/villa-apartments/create"
//                               element={<VillaApartmentForm />}
//                             />
//                             <Route
//                               path="/property-flow/villa-apartments/edit/:villaApartmentId"
//                               element={<VillaApartmentForm isEdit />}
//                             />
//                             <Route
//                               path="/property-flow/floors/create"
//                               element={<FloorForm />}
//                             />
//                             <Route
//                               path="/property-flow/floors/edit/:floorId"
//                               element={<FloorForm isEdit />}
//                             />
//                             <Route
//                               path="/property-flow/rooms/create"
//                               element={<RoomForm />}
//                             />
//                             <Route
//                               path="/property-flow/rooms/edit/:roomId"
//                               element={<RoomForm isEdit />}
//                             />
//                             <Route
//                               path="/property-flow/visualization"
//                               element={<PropertyFlowDiagram />}
//                             />

//                             <Route
//                               path="/sla"
//                               element={
//                                 <div className="p-6 bg-white rounded-xl shadow-lg">
//                                   SLA Page (To be implemented)
//                                 </div>
//                               }
//                             />
//                             <Route
//                               path="/assets"
//                               element={
//                                 <div className="p-6 bg-white rounded-xl shadow-lg">
//                                   Assets Page (To be implemented)
//                                 </div>
//                               }
//                             />
//                             <Route
//                               path="/workrequests"
//                               element={
//                                 <div className="p-6 bg-white rounded-xl shadow-lg">
//                                   Work Requests Page (To be implemented)
//                                 </div>
//                               }
//                             />
//                             <Route path="/" element={<Dashboard />} />
//                           </Routes>
//                         </div>
//                       </main>
//                     </div>
//                   </ProtectedRoute>
//                 }
//               />
//             </Routes>
//           </div>
//         </PropertyFlowProvider>
//       </ServiceProvider>
//     </AuthProvider>
//   );
// }

// export default App;

////////22222222333333333
// import { Routes, Route } from "react-router-dom";
// import { AuthProvider } from "./context/AuthContext";
// import { ServiceProvider } from "./context/ServiceContext";
// import { PropertyFlowProvider } from "./context/PropertyFlowContext";
// import Sidebar from "./components/Sidebar";
// import Dashboard from "./pages/Dashboard";
// import CompanyManagement from "./pages/CompanyManagement";
// import CompanyList from "./pages/CompanyList";
// import CompanyUpdate from "./pages/CompanyUpdate";
// import ContractManagement from "./pages/ContractManagement";
// import ContractList from "./pages/ContractList";
// import ContractDetail from "./pages/ContractDetail";
// import UpdateContract from "./pages/UpdateContract";
// import ServiceManagement from "./pages/ServiceManagement";
// import ServiceForm from "./components/ServiceManagement/ServiceForm";
// import SubServiceForm from "./components/ServiceManagement/SubServiceForm";
// import ServiceScopeForm from "./components/ServiceManagement/ServiceScopeForm";
// import BulkServiceForm from "./components/ServiceManagement/BulkServiceForm";
// import BulkSubServiceForm from "./components/ServiceManagement/BulkSubServiceForm";
// import BulkServiceScopeForm from "./components/ServiceManagement/BulkServiceScopeForm";
// import BulkUpdateServiceForm from "./components/ServiceManagement/BulkUpdateServiceForm";
// import BulkUpdateSubServiceForm from "./components/ServiceManagement/BulkUpdateSubServiceForm";
// import BulkUpdateServiceScopeForm from "./components/ServiceManagement/BulkUpdateServiceScopeForm";
// import Login from "./pages/Login";
// import ProtectedRoute from "./components/ProtectedRoute";

// // Single Property Flow Page
// import PropertyFlowManagement from "./pages/PropertyFlowManagement";

// function App() {
//   return (
//     <AuthProvider>
//       <ServiceProvider>
//         <PropertyFlowProvider>
//           <div className="flex min-h-screen bg-gray-100">
//             <Routes>
//               <Route path="/login" element={<Login />} />
//               <Route
//                 path="/*"
//                 element={
//                   <ProtectedRoute>
//                     <div className="flex flex-1">
//                       <Sidebar />
//                       <main className="flex-1 ml-64 p-6 overflow-auto">
//                         <div className="max-w-7xl mx-auto">
//                           <Routes>
//                             <Route path="/dashboard" element={<Dashboard />} />
//                             <Route
//                               path="/companies"
//                               element={<CompanyManagement />}
//                             />
//                             <Route
//                               path="/companies/list"
//                               element={<CompanyList />}
//                             />
//                             <Route
//                               path="/companies/:companyId"
//                               element={<CompanyUpdate />}
//                             />
//                             <Route
//                               path="/contracts"
//                               element={<ContractManagement />}
//                             />
//                             <Route
//                               path="/contracts/list"
//                               element={<ContractList />}
//                             />
//                             <Route
//                               path="/contracts/:contractId"
//                               element={<ContractDetail />}
//                             />
//                             <Route
//                               path="/contracts/update/:contractId"
//                               element={<UpdateContract />}
//                             />
//                             <Route
//                               path="/services"
//                               element={<ServiceManagement />}
//                             />
//                             <Route
//                               path="/services/create"
//                               element={<ServiceForm />}
//                             />
//                             <Route
//                               path="/services/edit/:serviceId"
//                               element={<ServiceForm isEdit />}
//                             />
//                             <Route
//                               path="/services/bulk-create"
//                               element={<BulkServiceForm />}
//                             />
//                             <Route
//                               path="/services/bulk-update"
//                               element={<BulkUpdateServiceForm />}
//                             />
//                             <Route
//                               path="/services/sub-services/create"
//                               element={<SubServiceForm />}
//                             />
//                             <Route
//                               path="/services/sub-services/edit/:subServiceId"
//                               element={<SubServiceForm isEdit />}
//                             />
//                             <Route
//                               path="/services/sub-services/bulk-create"
//                               element={<BulkSubServiceForm />}
//                             />
//                             <Route
//                               path="/services/sub-services/bulk-update"
//                               element={<BulkUpdateSubServiceForm />}
//                             />
//                             <Route
//                               path="/services/service-scopes/create"
//                               element={<ServiceScopeForm />}
//                             />
//                             <Route
//                               path="/services/service-scopes/edit/:scopeId"
//                               element={<ServiceScopeForm isEdit />}
//                             />
//                             <Route
//                               path="/services/service-scopes/bulk-create"
//                               element={<BulkServiceScopeForm />}
//                             />
//                             <Route
//                               path="/services/service-scopes/bulk-update"
//                               element={<BulkUpdateServiceScopeForm />}
//                             />

//                             {/* Single Property Flow Route */}
//                             <Route
//                               path="/property-flow"
//                               element={<PropertyFlowManagement />}
//                             />

//                             <Route
//                               path="/sla"
//                               element={
//                                 <div className="p-6 bg-white rounded-xl shadow-lg">
//                                   SLA Page (To be implemented)
//                                 </div>
//                               }
//                             />
//                             <Route
//                               path="/assets"
//                               element={
//                                 <div className="p-6 bg-white rounded-xl shadow-lg">
//                                   Assets Page (To be implemented)
//                                 </div>
//                               }
//                             />
//                             <Route
//                               path="/workrequests"
//                               element={
//                                 <div className="p-6 bg-white rounded-xl shadow-lg">
//                                   Work Requests Page (To be implemented)
//                                 </div>
//                               }
//                             />
//                             <Route path="/" element={<Dashboard />} />
//                           </Routes>
//                         </div>
//                       </main>
//                     </div>
//                   </ProtectedRoute>
//                 }
//               />
//             </Routes>
//           </div>
//         </PropertyFlowProvider>
//       </ServiceProvider>
//     </AuthProvider>
//   );
// }

// export default App;

///233333333333333333333

// import { Routes, Route } from "react-router-dom";
// import { AuthProvider } from "./context/AuthContext";
// import { ServiceProvider } from "./context/ServiceContext";
// import { PropertyFlowProvider } from "./context/PropertyFlowContext";
// import Sidebar from "./components/Sidebar";
// import Dashboard from "./pages/Dashboard";
// import CompanyManagement from "./pages/CompanyManagement";
// import CompanyList from "./pages/CompanyList";
// import CompanyUpdate from "./pages/CompanyUpdate";
// import ContractManagement from "./pages/ContractManagement";
// import ContractList from "./pages/ContractList";
// import ContractDetail from "./pages/ContractDetail";
// import UpdateContract from "./pages/UpdateContract";
// import ServiceManagement from "./pages/ServiceManagement";
// import ServiceForm from "./components/ServiceManagement/ServiceForm";
// import SubServiceForm from "./components/ServiceManagement/SubServiceForm";
// import ServiceScopeForm from "./components/ServiceManagement/ServiceScopeForm";
// import BulkServiceForm from "./components/ServiceManagement/BulkServiceForm";
// import BulkSubServiceForm from "./components/ServiceManagement/BulkSubServiceForm";
// import BulkServiceScopeForm from "./components/ServiceManagement/BulkServiceScopeForm";
// import BulkUpdateServiceForm from "./components/ServiceManagement/BulkUpdateServiceForm";
// import BulkUpdateSubServiceForm from "./components/ServiceManagement/BulkUpdateSubServiceForm";
// import BulkUpdateServiceScopeForm from "./components/ServiceManagement/BulkUpdateServiceScopeForm";
// import Login from "./pages/Login";
// import ProtectedRoute from "./components/ProtectedRoute";
// // Single Property Flow Page
// import PropertyFlowManagement from "./pages/PropertyFlowManagement";
// // Asset Management Pages
// import AssetManagement from "./pages/AssetManagement";
// import AssetList from "./pages/AssetList";
// import AssetForm from "./components/AssetForm";

// function App() {
//   return (
//     <AuthProvider>
//       <ServiceProvider>
//         <PropertyFlowProvider>
//           <div className="flex min-h-screen bg-gray-100">
//             <Routes>
//               <Route path="/login" element={<Login />} />
//               <Route
//                 path="/*"
//                 element={
//                   <ProtectedRoute>
//                     <div className="flex flex-1">
//                       <Sidebar />
//                       <main className="flex-1 ml-64 p-6 overflow-auto">
//                         <div className="max-w-7xl mx-auto">
//                           <Routes>
//                             <Route path="/dashboard" element={<Dashboard />} />
//                             <Route
//                               path="/companies"
//                               element={<CompanyManagement />}
//                             />
//                             <Route
//                               path="/companies/list"
//                               element={<CompanyList />}
//                             />
//                             <Route
//                               path="/companies/:companyId"
//                               element={<CompanyUpdate />}
//                             />
//                             <Route
//                               path="/contracts"
//                               element={<ContractManagement />}
//                             />
//                             <Route
//                               path="/contracts/list"
//                               element={<ContractList />}
//                             />
//                             <Route
//                               path="/contracts/:contractId"
//                               element={<ContractDetail />}
//                             />
//                             <Route
//                               path="/contracts/update/:contractId"
//                               element={<UpdateContract />}
//                             />
//                             <Route
//                               path="/services"
//                               element={<ServiceManagement />}
//                             />
//                             <Route
//                               path="/services/create"
//                               element={<ServiceForm />}
//                             />
//                             <Route
//                               path="/services/edit/:serviceId"
//                               element={<ServiceForm isEdit />}
//                             />
//                             <Route
//                               path="/services/bulk-create"
//                               element={<BulkServiceForm />}
//                             />
//                             <Route
//                               path="/services/bulk-update"
//                               element={<BulkUpdateServiceForm />}
//                             />
//                             <Route
//                               path="/services/sub-services/create"
//                               element={<SubServiceForm />}
//                             />
//                             <Route
//                               path="/services/sub-services/edit/:subServiceId"
//                               element={<SubServiceForm isEdit />}
//                             />
//                             <Route
//                               path="/services/sub-services/bulk-create"
//                               element={<BulkSubServiceForm />}
//                             />
//                             <Route
//                               path="/services/sub-services/bulk-update"
//                               element={<BulkUpdateSubServiceForm />}
//                             />
//                             <Route
//                               path="/services/service-scopes/create"
//                               element={<ServiceScopeForm />}
//                             />
//                             <Route
//                               path="/services/service-scopes/edit/:scopeId"
//                               element={<ServiceScopeForm isEdit />}
//                             />
//                             <Route
//                               path="/services/service-scopes/bulk-create"
//                               element={<BulkServiceScopeForm />}
//                             />
//                             <Route
//                               path="/services/service-scopes/bulk-update"
//                               element={<BulkUpdateServiceScopeForm />}
//                             />
//                             {/* Single Property Flow Route */}
//                             <Route
//                               path="/property-flow"
//                               element={<PropertyFlowManagement />}
//                             />
//                             {/* Asset Management Routes */}
//                             <Route
//                               path="/assets"
//                               element={<AssetManagement />}
//                             />
//                             <Route
//                               path="/assets/list"
//                               element={<AssetList />}
//                             />
//                             <Route
//                               path="/assets/create"
//                               element={<AssetForm />}
//                             />
//                             <Route
//                               path="/assets/edit/:assetId"
//                               element={<AssetForm isEdit />}
//                             />
//                             <Route
//                               path="/sla"
//                               element={
//                                 <div className="p-6 bg-white rounded-xl shadow-lg">
//                                   SLA Page (To be implemented)
//                                 </div>
//                               }
//                             />
//                             <Route
//                               path="/workrequests"
//                               element={
//                                 <div className="p-6 bg-white rounded-xl shadow-lg">
//                                   Work Requests Page (To be implemented)
//                                 </div>
//                               }
//                             />
//                             <Route path="/" element={<Dashboard />} />
//                           </Routes>
//                         </div>
//                       </main>
//                     </div>
//                   </ProtectedRoute>
//                 }
//               />
//             </Routes>
//           </div>
//         </PropertyFlowProvider>
//       </ServiceProvider>
//     </AuthProvider>
//   );
// }

// export default App;

import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { ServiceProvider } from "./context/ServiceContext";
import { PropertyFlowProvider } from "./context/PropertyFlowContext";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import CompanyManagement from "./pages/CompanyManagement";
import CompanyList from "./pages/CompanyList";
import CompanyUpdate from "./pages/CompanyUpdate";
import ContractManagement from "./pages/ContractManagement";
import ContractList from "./pages/ContractList";
import ContractDetail from "./pages/ContractDetail";
import UpdateContract from "./pages/UpdateContract";
import ServiceManagement from "./pages/ServiceManagement";
import ServiceForm from "./components/ServiceManagement/ServiceForm";
import SubServiceForm from "./components/ServiceManagement/SubServiceForm";
import ServiceScopeForm from "./components/ServiceManagement/ServiceScopeForm";
import BulkServiceForm from "./components/ServiceManagement/BulkServiceForm";
import BulkSubServiceForm from "./components/ServiceManagement/BulkSubServiceForm";
import BulkServiceScopeForm from "./components/ServiceManagement/BulkServiceScopeForm";
import BulkUpdateServiceForm from "./components/ServiceManagement/BulkUpdateServiceForm";
import BulkUpdateSubServiceForm from "./components/ServiceManagement/BulkUpdateSubServiceForm";
import BulkUpdateServiceScopeForm from "./components/ServiceManagement/BulkUpdateServiceScopeForm";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
// Single Property Flow Page
import PropertyFlowManagement from "./pages/PropertyFlowManagement";
// Asset Management Pages
import AssetManagement from "./pages/AssetManagement";
import AssetList from "./pages/AssetList";
import AssetForm from "./components/AssetForm";
import AssetDetail from "./pages/AssetDetail";

function App() {
  return (
    <AuthProvider>
      <ServiceProvider>
        <PropertyFlowProvider>
          <div className="flex min-h-screen bg-gray-100">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route
                path="/*"
                element={
                  <ProtectedRoute>
                    <div className="flex flex-1">
                      <Sidebar />
                      <main className="flex-1 ml-64 p-6 overflow-auto">
                        <div className="max-w-7xl mx-auto">
                          <Routes>
                            <Route path="/dashboard" element={<Dashboard />} />
                            <Route
                              path="/companies"
                              element={<CompanyManagement />}
                            />
                            <Route
                              path="/companies/list"
                              element={<CompanyList />}
                            />
                            <Route
                              path="/companies/:companyId"
                              element={<CompanyUpdate />}
                            />
                            <Route
                              path="/contracts"
                              element={<ContractManagement />}
                            />
                            <Route
                              path="/contracts/list"
                              element={<ContractList />}
                            />
                            <Route
                              path="/contracts/:contractId"
                              element={<ContractDetail />}
                            />
                            <Route
                              path="/contracts/update/:contractId"
                              element={<UpdateContract />}
                            />
                            <Route
                              path="/services"
                              element={<ServiceManagement />}
                            />
                            <Route
                              path="/services/create"
                              element={<ServiceForm />}
                            />
                            <Route
                              path="/services/edit/:serviceId"
                              element={<ServiceForm isEdit />}
                            />
                            <Route
                              path="/services/bulk-create"
                              element={<BulkServiceForm />}
                            />
                            <Route
                              path="/services/bulk-update"
                              element={<BulkUpdateServiceForm />}
                            />
                            <Route
                              path="/services/sub-services/create"
                              element={<SubServiceForm />}
                            />
                            <Route
                              path="/services/sub-services/edit/:subServiceId"
                              element={<SubServiceForm isEdit />}
                            />
                            <Route
                              path="/services/sub-services/bulk-create"
                              element={<BulkSubServiceForm />}
                            />
                            <Route
                              path="/services/sub-services/bulk-update"
                              element={<BulkUpdateSubServiceForm />}
                            />
                            <Route
                              path="/services/service-scopes/create"
                              element={<ServiceScopeForm />}
                            />
                            <Route
                              path="/services/service-scopes/edit/:scopeId"
                              element={<ServiceScopeForm isEdit />}
                            />
                            <Route
                              path="/services/service-scopes/bulk-create"
                              element={<BulkServiceScopeForm />}
                            />
                            <Route
                              path="/services/service-scopes/bulk-update"
                              element={<BulkUpdateServiceScopeForm />}
                            />
                            {/* Single Property Flow Route */}
                            <Route
                              path="/property-flow"
                              element={<PropertyFlowManagement />}
                            />
                            {/* Asset Management Routes */}
                            <Route
                              path="/assets"
                              element={<AssetManagement />}
                            />
                            <Route
                              path="/assets/list"
                              element={<AssetList />}
                            />
                            <Route
                              path="/assets/create"
                              element={<AssetForm />}
                            />
                            <Route
                              path="/assets/edit/:assetId"
                              element={<AssetForm isEdit />}
                            />
                            <Route
                              path="/assets/detail/:assetId"
                              element={<AssetDetail />}
                            />
                            <Route
                              path="/sla"
                              element={
                                <div className="p-6 bg-white rounded-xl shadow-lg">
                                  SLA Page (To be implemented)
                                </div>
                              }
                            />
                            <Route
                              path="/workrequests"
                              element={
                                <div className="p-6 bg-white rounded-xl shadow-lg">
                                  Work Requests Page (To be implemented)
                                </div>
                              }
                            />
                            <Route path="/" element={<Dashboard />} />
                          </Routes>
                        </div>
                      </main>
                    </div>
                  </ProtectedRoute>
                }
              />
            </Routes>
          </div>
        </PropertyFlowProvider>
      </ServiceProvider>
    </AuthProvider>
  );
}

export default App;
