//update on 2025/07/05
// // src/App.jsx
// import { Routes, Route } from "react-router-dom";
// import { AuthProvider } from "./context/AuthContext";
// import { ServiceProvider } from "./context/ServiceContext";
// import { PropertyFlowProvider } from "./context/PropertyFlowContext";
// import Layout from "./components/Layout"; // Import Layout
// import Dashboard from "./pages/Dashboard";
// import UserManagement from "./pages/UserManagement";
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
// import PropertyFlowManagement from "./pages/PropertyFlowManagement";
// import AssetManagement from "./pages/AssetManagement";
// import AssetList from "./pages/AssetList";
// import AssetForm from "./components/AssetForm";
// import AssetDetail from "./pages/AssetDetail";
// // src/App.jsx
// import ErrorBoundary from "./components/ErrorBoundary.jsx"; // Add .jsx extension
// function App() {
//   return (
//     <AuthProvider>
//       <ServiceProvider>
//         <PropertyFlowProvider>
//           <ErrorBoundary>
//             <Routes>
//               <Route path="/login" element={<Login />} />
//               <Route
//                 path="/*"
//                 element={
//                   <ProtectedRoute>
//                     <Layout>
//                       <Routes>
//                         <Route path="/dashboard" element={<Dashboard />} />
//                         <Route
//                           path="/user-management"
//                           element={<UserManagement />}
//                         />
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
//                           path="/contracts/update/:contractId"
//                           element={<UpdateContract />}
//                         />
//                         <Route
//                           path="/services"
//                           element={<ServiceManagement />}
//                         />
//                         <Route
//                           path="/services/create"
//                           element={<ServiceForm />}
//                         />
//                         <Route
//                           path="/services/edit/:serviceId"
//                           element={<ServiceForm isEdit />}
//                         />
//                         <Route
//                           path="/services/bulk-create"
//                           element={<BulkServiceForm />}
//                         />
//                         <Route
//                           path="/services/bulk-update"
//                           element={<BulkUpdateServiceForm />}
//                         />
//                         <Route
//                           path="/services/sub-services/create"
//                           element={<SubServiceForm />}
//                         />
//                         <Route
//                           path="/services/sub-services/edit/:subServiceId"
//                           element={<SubServiceForm isEdit />}
//                         />
//                         <Route
//                           path="/services/sub-services/bulk-create"
//                           element={<BulkSubServiceForm />}
//                         />
//                         <Route
//                           path="/services/sub-services/bulk-update"
//                           element={<BulkUpdateSubServiceForm />}
//                         />
//                         <Route
//                           path="/services/service-scopes/create"
//                           element={<ServiceScopeForm />}
//                         />
//                         <Route
//                           path="/services/service-scopes/edit/:scopeId"
//                           element={<ServiceScopeForm isEdit />}
//                         />
//                         <Route
//                           path="/services/service-scopes/bulk-create"
//                           element={<BulkServiceScopeForm />}
//                         />
//                         <Route
//                           path="/services/service-scopes/bulk-update"
//                           element={<BulkUpdateServiceScopeForm />}
//                         />
//                         <Route
//                           path="/property-flow"
//                           element={<PropertyFlowManagement />}
//                         />
//                         <Route path="/assets" element={<AssetManagement />} />
//                         <Route path="/assets/list" element={<AssetList />} />
//                         <Route path="/assets/create" element={<AssetForm />} />
//                         <Route
//                           path="/assets/edit/:assetId"
//                           element={<AssetForm isEdit />}
//                         />
//                         <Route
//                           path="/assets/detail/:assetId"
//                           element={<AssetDetail />}
//                         />
//                         <Route
//                           jpeg
//                           path="/sla"
//                           element={
//                             <div className="p-6 bg-white rounded-xl shadow-lg">
//                               SLA Page (To be implemented)
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
//                     </Layout>
//                   </ProtectedRoute>
//                 }
//               />
//             </Routes>
//           </ErrorBoundary>
//         </PropertyFlowProvider>
//       </ServiceProvider>
//     </AuthProvider>
//   );
// }

// export default App;

//update on 2025/07/09

// import { Routes, Route } from "react-router-dom";
// import { AuthProvider } from "./context/AuthContext";
// import { ServiceProvider } from "./context/ServiceContext";
// import { PropertyFlowProvider } from "./context/PropertyFlowContext";
// import Layout from "./components/Layout";
// import Dashboard from "./pages/Dashboard";
// import UserManagement from "./pages/UserManagement";
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
// import PropertyFlowManagement from "./pages/PropertyFlowManagement";
// import AssetManagement from "./pages/AssetManagement";
// import AssetList from "./pages/AssetList";
// import AssetForm from "./components/AssetForm";
// import AssetDetail from "./pages/AssetDetail";
// import Profile from "./pages/Profile"; // Import the Profile page
// import ErrorBoundary from "./components/ErrorBoundary.jsx";

// function App() {
//   return (
//     <AuthProvider>
//       <ServiceProvider>
//         <PropertyFlowProvider>
//           <ErrorBoundary>
//             <Routes>
//               <Route path="/login" element={<Login />} />
//               <Route
//                 path="/*"
//                 element={
//                   <ProtectedRoute>
//                     <Layout>
//                       <Routes>
//                         <Route path="/dashboard" element={<Dashboard />} />
//                         <Route
//                           path="/user-management"
//                           element={<UserManagement />}
//                         />
//                         <Route path="/profile" element={<Profile />} />
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
//                           path="/contracts/update/:contractId"
//                           element={<UpdateContract />}
//                         />
//                         <Route
//                           path="/services"
//                           element={<ServiceManagement />}
//                         />
//                         <Route
//                           path="/services/create"
//                           element={<ServiceForm />}
//                         />
//                         <Route
//                           path="/services/edit/:serviceId"
//                           element={<ServiceForm isEdit />}
//                         />
//                         <Route
//                           path="/services/bulk-create"
//                           element={<BulkServiceForm />}
//                         />
//                         <Route
//                           path="/services/bulk-update"
//                           element={<BulkUpdateServiceForm />}
//                         />
//                         <Route
//                           path="/services/sub-services/create"
//                           element={<SubServiceForm />}
//                         />
//                         <Route
//                           path="/services/sub-services/edit/:subServiceId"
//                           element={<SubServiceForm isEdit />}
//                         />
//                         <Route
//                           path="/services/sub-services/bulk-create"
//                           element={<BulkSubServiceForm />}
//                         />
//                         <Route
//                           path="/services/sub-services/bulk-update"
//                           element={<BulkUpdateSubServiceForm />}
//                         />
//                         <Route
//                           path="/services/service-scopes/create"
//                           element={<ServiceScopeForm />}
//                         />
//                         <Route
//                           path="/services/service-scopes/edit/:scopeId"
//                           element={<ServiceScopeForm isEdit />}
//                         />
//                         <Route
//                           path="/services/service-scopes/bulk-create"
//                           element={<BulkServiceScopeForm />}
//                         />
//                         <Route
//                           path="/services/service-scopes/bulk-update"
//                           element={<BulkUpdateServiceScopeForm />}
//                         />
//                         <Route
//                           path="/property-flow"
//                           element={<PropertyFlowManagement />}
//                         />
//                         <Route path="/assets" element={<AssetManagement />} />
//                         <Route path="/assets/list" element={<AssetList />} />
//                         <Route path="/assets/create" element={<AssetForm />} />
//                         <Route
//                           path="/assets/edit/:assetId"
//                           element={<AssetForm isEdit />}
//                         />
//                         <Route
//                           path="/assets/detail/:assetId"
//                           element={<AssetDetail />}
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
//                           path="/workrequests"
//                           element={
//                             <div className="p-6 bg-white rounded-xl shadow-lg">
//                               Work Requests Page (To be implemented)
//                             </div>
//                           }
//                         />
//                         <Route path="/" element={<Dashboard />} />
//                       </Routes>
//                     </Layout>
//                   </ProtectedRoute>
//                 }
//               />
//             </Routes>
//           </ErrorBoundary>
//         </PropertyFlowProvider>
//       </ServiceProvider>
//     </AuthProvider>
//   );
// }

// // export default App;

// import { Routes, Route } from "react-router-dom";
// import { AuthProvider } from "./context/AuthContext";
// import { ServiceProvider } from "./context/ServiceContext";
// import { PropertyFlowProvider } from "./context/PropertyFlowContext";
// import Layout from "./components/Layout";
// import Dashboard from "./pages/Dashboard";
// import UserManagement from "./pages/UserManagement";
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
// import PropertyFlowManagement from "./pages/PropertyFlowManagement";
// import AssetManagement from "./pages/AssetManagement";
// import AssetList from "./pages/AssetList";
// import AssetForm from "./components/AssetForm";
// import AssetDetail from "./pages/AssetDetail";
// import Profile from "./pages/Profile";
// import ChecklistManagement from "./pages/ChecklistManagement";
// import InventoryManagement from "./pages/InventoryManagement";
// import ErrorBoundary from "./components/ErrorBoundary.jsx";

// function App() {
//   return (
//     <AuthProvider>
//       <ServiceProvider>
//         <PropertyFlowProvider>
//           <ErrorBoundary>
//             <Routes>
//               <Route path="/login" element={<Login />} />
//               <Route
//                 path="/*"
//                 element={
//                   <ProtectedRoute>
//                     <Layout>
//                       <Routes>
//                         <Route path="/dashboard" element={<Dashboard />} />
//                         <Route
//                           path="/user-management"
//                           element={<UserManagement />}
//                         />
//                         <Route path="/profile" element={<Profile />} />
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
//                           path="/contracts/update/:contractId"
//                           element={<UpdateContract />}
//                         />
//                         <Route
//                           path="/services"
//                           element={<ServiceManagement />}
//                         />
//                         <Route
//                           path="/services/create"
//                           element={<ServiceForm />}
//                         />
//                         <Route
//                           path="/services/edit/:serviceId"
//                           element={<ServiceForm isEdit />}
//                         />
//                         <Route
//                           path="/services/bulk-create"
//                           element={<BulkServiceForm />}
//                         />
//                         <Route
//                           path="/services/bulk-update"
//                           element={<BulkUpdateServiceForm />}
//                         />
//                         <Route
//                           path="/services/sub-services/create"
//                           element={<SubServiceForm />}
//                         />
//                         <Route
//                           path="/services/sub-services/edit/:subServiceId"
//                           element={<SubServiceForm isEdit />}
//                         />
//                         <Route
//                           path="/services/sub-services/bulk-create"
//                           element={<BulkSubServiceForm />}
//                         />
//                         <Route
//                           path="/services/sub-services/bulk-update"
//                           element={<BulkUpdateSubServiceForm />}
//                         />
//                         <Route
//                           path="/services/service-scopes/create"
//                           element={<ServiceScopeForm />}
//                         />
//                         <Route
//                           path="/services/service-scopes/edit/:scopeId"
//                           element={<ServiceScopeForm isEdit />}
//                         />
//                         <Route
//                           path="/services/service-scopes/bulk-create"
//                           element={<BulkServiceScopeForm />}
//                         />
//                         <Route
//                           path="/services/service-scopes/bulk-update"
//                           element={<BulkUpdateServiceScopeForm />}
//                         />
//                         <Route
//                           path="/property-flow"
//                           element={<PropertyFlowManagement />}
//                         />
//                         <Route path="/assets" element={<AssetManagement />} />
//                         <Route path="/assets/list" element={<AssetList />} />
//                         <Route path="/assets/create" element={<AssetForm />} />
//                         <Route
//                           path="/assets/edit/:assetId"
//                           element={<AssetForm isEdit />}
//                         />
//                         <Route
//                           path="/assets/detail/:assetId"
//                           element={<AssetDetail />}
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
//                           path="/checklists"
//                           element={<ChecklistManagement />}
//                         />
//                         <Route
//                           path="/inventory"
//                           element={<InventoryManagement />}
//                         />
//                         <Route path="/" element={<Dashboard />} />
//                       </Routes>
//                     </Layout>
//                   </ProtectedRoute>
//                 }
//               />
//             </Routes>
//           </ErrorBoundary>
//         </PropertyFlowProvider>
//       </ServiceProvider>
//     </AuthProvider>
//   );
// }

// export default App;

// import { Routes, Route } from "react-router-dom";
// import { AuthProvider } from "./context/AuthContext";
// import { ServiceProvider } from "./context/ServiceContext";
// import { PropertyFlowProvider } from "./context/PropertyFlowContext";
// import Layout from "./components/Layout";
// import Dashboard from "./pages/Dashboard";
// import UserManagement from "./pages/UserManagement";
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
// import PropertyFlowManagement from "./pages/PropertyFlowManagement";
// import AssetManagement from "./pages/AssetManagement";
// import AssetList from "./pages/AssetList";
// import AssetForm from "./components/AssetForm";
// import AssetDetail from "./pages/AssetDetail";
// import Profile from "./pages/Profile";
// import ChecklistManagement from "./pages/ChecklistManagement";
// import InventoryManagement from "./pages/InventoryManagement";
// import KpiManagement from "./pages/KpiManagement";
// import ErrorBoundary from "./components/ErrorBoundary.jsx";

// function App() {
//   return (
//     <AuthProvider>
//       <ServiceProvider>
//         <PropertyFlowProvider>
//           <ErrorBoundary>
//             <Routes>
//               <Route path="/login" element={<Login />} />
//               <Route
//                 path="/*"
//                 element={
//                   <ProtectedRoute>
//                     <Layout>
//                       <Routes>
//                         <Route path="/dashboard" element={<Dashboard />} />
//                         <Route
//                           path="/user-management"
//                           element={<UserManagement />}
//                         />
//                         <Route path="/profile" element={<Profile />} />
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
//                           path="/contracts/update/:contractId"
//                           element={<UpdateContract />}
//                         />
//                         <Route
//                           path="/services"
//                           element={<ServiceManagement />}
//                         />
//                         <Route
//                           path="/services/create"
//                           element={<ServiceForm />}
//                         />
//                         <Route
//                           path="/services/edit/:serviceId"
//                           element={<ServiceForm isEdit />}
//                         />
//                         <Route
//                           path="/services/bulk-create"
//                           element={<BulkServiceForm />}
//                         />
//                         <Route
//                           path="/services/bulk-update"
//                           element={<BulkUpdateServiceForm />}
//                         />
//                         <Route
//                           path="/services/sub-services/create"
//                           element={<SubServiceForm />}
//                         />
//                         <Route
//                           path="/services/sub-services/edit/:subServiceId"
//                           element={<SubServiceForm isEdit />}
//                         />
//                         <Route
//                           path="/services/sub-services/bulk-create"
//                           element={<BulkSubServiceForm />}
//                         />
//                         <Route
//                           path="/services/sub-services/bulk-update"
//                           element={<BulkUpdateSubServiceForm />}
//                         />
//                         <Route
//                           path="/services/service-scopes/create"
//                           element={<ServiceScopeForm />}
//                         />
//                         <Route
//                           path="/services/service-scopes/edit/:scopeId"
//                           element={<ServiceScopeForm isEdit />}
//                         />
//                         <Route
//                           path="/services/service-scopes/bulk-create"
//                           element={<BulkServiceScopeForm />}
//                         />
//                         <Route
//                           path="/services/service-scopes/bulk-update"
//                           element={<BulkUpdateServiceScopeForm />}
//                         />
//                         <Route
//                           path="/property-flow"
//                           element={<PropertyFlowManagement />}
//                         />
//                         <Route path="/assets" element={<AssetManagement />} />
//                         <Route path="/assets/list" element={<AssetList />} />
//                         <Route path="/assets/create" element={<AssetForm />} />
//                         <Route
//                           path="/assets/edit/:assetId"
//                           element={<AssetForm isEdit />}
//                         />
//                         <Route
//                           path="/assets/detail/:assetId"
//                           element={<AssetDetail />}
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
//                           path="/checklists"
//                           element={<ChecklistManagement />}
//                         />
//                         <Route
//                           path="/inventory"
//                           element={<InventoryManagement />}
//                         />
//                         <Route path="/kpi" element={<KpiManagement />} />
//                         <Route path="/" element={<Dashboard />} />
//                       </Routes>
//                     </Layout>
//                   </ProtectedRoute>
//                 }
//               />
//             </Routes>
//           </ErrorBoundary>
//         </PropertyFlowProvider>
//       </ServiceProvider>
//     </AuthProvider>
//   );
// }

// export default App;

// import { Routes, Route } from "react-router-dom";
// import { AuthProvider } from "./context/AuthContext";
// import { ServiceProvider } from "./context/ServiceContext";
// import { PropertyFlowProvider } from "./context/PropertyFlowContext";
// import Layout from "./components/Layout";
// import Dashboard from "./pages/Dashboard";
// import UserManagement from "./pages/UserManagement";
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
// import PropertyFlowManagement from "./pages/PropertyFlowManagement";
// import AssetManagement from "./pages/AssetManagement";
// import AssetList from "./pages/AssetList";
// import AssetForm from "./components/AssetForm";
// import AssetDetail from "./pages/AssetDetail";
// import Profile from "./pages/Profile";
// import ChecklistManagement from "./pages/ChecklistManagement";
// import InventoryManagement from "./pages/InventoryManagement";
// import KpiManagement from "./pages/KpiManagement";
// import WorkRequestManagement from "./pages/WorkRequestManagement";
// import ErrorBoundary from "./components/ErrorBoundary.jsx";

// function App() {
//   return (
//     <AuthProvider>
//       <ServiceProvider>
//         <PropertyFlowProvider>
//           <ErrorBoundary>
//             <Routes>
//               <Route path="/login" element={<Login />} />
//               <Route
//                 path="/*"
//                 element={
//                   <ProtectedRoute>
//                     <Layout>
//                       <Routes>
//                         <Route path="/dashboard" element={<Dashboard />} />
//                         <Route
//                           path="/user-management"
//                           element={<UserManagement />}
//                         />
//                         <Route path="/profile" element={<Profile />} />
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
//                           path="/contracts/update/:contractId"
//                           element={<UpdateContract />}
//                         />
//                         <Route
//                           path="/services"
//                           element={<ServiceManagement />}
//                         />
//                         <Route
//                           path="/services/create"
//                           element={<ServiceForm />}
//                         />
//                         <Route
//                           path="/services/edit/:serviceId"
//                           element={<ServiceForm isEdit />}
//                         />
//                         <Route
//                           path="/services/bulk-create"
//                           element={<BulkServiceForm />}
//                         />
//                         <Route
//                           path="/services/bulk-update"
//                           element={<BulkUpdateServiceForm />}
//                         />
//                         <Route
//                           path="/services/sub-services/create"
//                           element={<SubServiceForm />}
//                         />
//                         <Route
//                           path="/services/sub-services/edit/:subServiceId"
//                           element={<SubServiceForm isEdit />}
//                         />
//                         <Route
//                           path="/services/sub-services/bulk-create"
//                           element={<BulkSubServiceForm />}
//                         />
//                         <Route
//                           path="/services/sub-services/bulk-update"
//                           element={<BulkUpdateSubServiceForm />}
//                         />
//                         <Route
//                           path="/services/service-scopes/create"
//                           element={<ServiceScopeForm />}
//                         />
//                         <Route
//                           path="/services/service-scopes/edit/:scopeId"
//                           element={<ServiceScopeForm isEdit />}
//                         />
//                         <Route
//                           path="/services/service-scopes/bulk-create"
//                           element={<BulkServiceScopeForm />}
//                         />
//                         <Route
//                           path="/services/service-scopes/bulk-update"
//                           element={<BulkUpdateServiceScopeForm />}
//                         />
//                         <Route
//                           path="/property-flow"
//                           element={<PropertyFlowManagement />}
//                         />
//                         <Route path="/assets" element={<AssetManagement />} />
//                         <Route path="/assets/list" element={<AssetList />} />
//                         <Route path="/assets/create" element={<AssetForm />} />
//                         <Route
//                           path="/assets/edit/:assetId"
//                           element={<AssetForm isEdit />}
//                         />
//                         <Route
//                           path="/assets/detail/:assetId"
//                           element={<AssetDetail />}
//                         />
//                         <Route
//                           path="/work-requests"
//                           element={<WorkRequestManagement />}
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
//                           path="/checklists"
//                           element={<ChecklistManagement />}
//                         />
//                         <Route
//                           path="/inventory"
//                           element={<InventoryManagement />}
//                         />
//                         <Route path="/kpi" element={<KpiManagement />} />
//                         <Route path="/" element={<Dashboard />} />
//                       </Routes>
//                     </Layout>
//                   </ProtectedRoute>
//                 }
//               />
//             </Routes>
//           </ErrorBoundary>
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
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import UserManagement from "./pages/UserManagement";
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
import PropertyFlowManagement from "./pages/PropertyFlowManagement";
import AssetManagement from "./pages/AssetManagement";
import AssetList from "./pages/AssetList";
import AssetForm from "./components/AssetForm";
import AssetDetail from "./pages/AssetDetail";
import Profile from "./pages/Profile";
import ChecklistManagement from "./pages/ChecklistManagement";
import InventoryManagement from "./pages/InventoryManagement";
import KpiManagement from "./pages/KpiManagement";
import WorkRequestManagement from "./pages/WorkRequestManagement";
import ApprovalManagement from "./pages/ApprovalManagement";
import TechnicianAvailability from "./pages/TechnicianAvailability";
import ErrorBoundary from "./components/ErrorBoundary.jsx";

function App() {
  return (
    <AuthProvider>
      <ServiceProvider>
        <PropertyFlowProvider>
          <ErrorBoundary>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route
                path="/*"
                element={
                  <ProtectedRoute>
                    <Layout>
                      <Routes>
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route
                          path="/user-management"
                          element={<UserManagement />}
                        />
                        <Route path="/profile" element={<Profile />} />
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
                        <Route
                          path="/property-flow"
                          element={<PropertyFlowManagement />}
                        />
                        <Route path="/assets" element={<AssetManagement />} />
                        <Route path="/assets/list" element={<AssetList />} />
                        <Route path="/assets/create" element={<AssetForm />} />
                        <Route
                          path="/assets/edit/:assetId"
                          element={<AssetForm isEdit />}
                        />
                        <Route
                          path="/assets/detail/:assetId"
                          element={<AssetDetail />}
                        />
                        <Route
                          path="/work-requests"
                          element={<WorkRequestManagement />}
                        />
                        <Route
                          path="/approvals"
                          element={<ApprovalManagement />}
                        />
                        <Route
                          path="/technician-availability"
                          element={<TechnicianAvailability />}
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
                          path="/checklists"
                          element={<ChecklistManagement />}
                        />
                        <Route
                          path="/inventory"
                          element={<InventoryManagement />}
                        />
                        <Route path="/kpi" element={<KpiManagement />} />
                        <Route path="/" element={<Dashboard />} />
                      </Routes>
                    </Layout>
                  </ProtectedRoute>
                }
              />
            </Routes>
          </ErrorBoundary>
        </PropertyFlowProvider>
      </ServiceProvider>
    </AuthProvider>
  );
}

export default App;
