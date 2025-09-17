// import { Routes, Route } from "react-router-dom";
// import { Toaster } from "react-hot-toast";
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
// import ApprovalManagement from "./pages/ApprovalManagement";
// import TechnicianAvailability from "./pages/TechnicianAvailability";
// import ErrorBoundary from "./components/ErrorBoundary.jsx";
// import WorkOrderManagement from "./pages/WorkOrderManagement";
// import PermissionManagement from "./pages/PermissionManagement";
// import CalendarManagement from "./pages/CalendarManagement";
// import { SidebarProvider } from "./context/SidebarContext";

// function App() {
//   return (
//     <AuthProvider>
//       <ServiceProvider>
//         <PropertyFlowProvider>
//           <ErrorBoundary>
//             <Toaster
//               position="top-right"
//               toastOptions={{
//                 duration: 4000,
//                 style: { background: "#363636", color: "#fff" },
//                 success: {
//                   duration: 3000,
//                   style: { background: "#10B981" },
//                 },
//                 error: {
//                   duration: 5000,
//                   style: { background: "#EF4444" },
//                 },
//               }}
//             />
//             <Routes>
//               <Route path="/login" element={<Login />} />
//               <Route
//                 path="/unauthorized"
//                 element={
//                   <div className="p-6 bg-red-100 text-red-700 rounded-xl max-w-4xl mx-auto">
//                     <h2 className="text-xl font-bold">Access Denied</h2>
//                     <p>You do not have permission to access this page.</p>
//                   </div>
//                 }
//               />
//               <Route
//                 path="/*"
//                 element={
//                   <ProtectedRoute>
//                     <SidebarProvider>
//                       <Layout>
//                         <Routes>
//                           <Route path="/dashboard" element={<Dashboard />} />
//                           <Route
//                             path="/user-management"
//                             element={
//                               <ProtectedRoute requiredPermission="view_user">
//                                 <UserManagement />
//                               </ProtectedRoute>
//                             }
//                           />
//                           <Route path="/profile" element={<Profile />} />
//                           <Route
//                             path="/companies"
//                             element={
//                               <ProtectedRoute requiredPermission="view_company">
//                                 <CompanyManagement />
//                               </ProtectedRoute>
//                             }
//                           />
//                           <Route
//                             path="/companies/create"
//                             element={
//                               <ProtectedRoute requiredPermission="create_company">
//                                 <CompanyManagement isCreate />
//                               </ProtectedRoute>
//                             }
//                           />
//                           <Route
//                             path="/companies/list"
//                             element={
//                               <ProtectedRoute requiredPermission="view_company">
//                                 <CompanyList />
//                               </ProtectedRoute>
//                             }
//                           />
//                           <Route
//                             path="/companies/:companyId"
//                             element={
//                               <ProtectedRoute requiredPermission="update_company">
//                                 <CompanyUpdate />
//                               </ProtectedRoute>
//                             }
//                           />
//                           <Route
//                             path="/contracts"
//                             element={
//                               <ProtectedRoute requiredPermission="view_contract">
//                                 <ContractManagement />
//                               </ProtectedRoute>
//                             }
//                           />
//                           <Route
//                             path="/contracts/list"
//                             element={
//                               <ProtectedRoute requiredPermission="view_contract">
//                                 <ContractList />
//                               </ProtectedRoute>
//                             }
//                           />
//                           <Route
//                             path="/contracts/create"
//                             element={
//                               <ProtectedRoute requiredPermission="create_contract">
//                                 <ContractManagement isCreate />
//                               </ProtectedRoute>
//                             }
//                           />
//                           <Route
//                             path="/contracts/:contractId"
//                             element={
//                               <ProtectedRoute requiredPermission="view_contract">
//                                 <ContractDetail />
//                               </ProtectedRoute>
//                             }
//                           />
//                           <Route
//                             path="/contracts/update/:contractId"
//                             element={
//                               <ProtectedRoute requiredPermission="update_contract">
//                                 <UpdateContract />
//                               </ProtectedRoute>
//                             }
//                           />
//                           <Route
//                             path="/services"
//                             element={
//                               <ProtectedRoute requiredPermission="view_service">
//                                 <ServiceManagement />
//                               </ProtectedRoute>
//                             }
//                           />
//                           <Route
//                             path="/services/create"
//                             element={
//                               <ProtectedRoute requiredPermission="create_service">
//                                 <ServiceForm />
//                               </ProtectedRoute>
//                             }
//                           />
//                           <Route
//                             path="/services/edit/:serviceId"
//                             element={
//                               <ProtectedRoute requiredPermission="update_service">
//                                 <ServiceForm isEdit />
//                               </ProtectedRoute>
//                             }
//                           />
//                           <Route
//                             path="/services/bulk-create"
//                             element={
//                               <ProtectedRoute requiredPermission="create_service">
//                                 <BulkServiceForm />
//                               </ProtectedRoute>
//                             }
//                           />
//                           <Route
//                             path="/services/bulk-update"
//                             element={
//                               <ProtectedRoute requiredPermission="update_service">
//                                 <BulkUpdateServiceForm />
//                               </ProtectedRoute>
//                             }
//                           />
//                           <Route
//                             path="/services/sub-services/create"
//                             element={
//                               <ProtectedRoute requiredPermission="create_sub_service">
//                                 <SubServiceForm />
//                               </ProtectedRoute>
//                             }
//                           />
//                           <Route
//                             path="/services/sub-services/edit/:subServiceId"
//                             element={
//                               <ProtectedRoute requiredPermission="update_sub_service">
//                                 <SubServiceForm isEdit />
//                               </ProtectedRoute>
//                             }
//                           />
//                           <Route
//                             path="/services/sub-services/bulk-create"
//                             element={
//                               <ProtectedRoute requiredPermission="create_sub_service">
//                                 <BulkSubServiceForm />
//                               </ProtectedRoute>
//                             }
//                           />
//                           <Route
//                             path="/services/sub-services/bulk-update"
//                             element={
//                               <ProtectedRoute requiredPermission="update_sub_service">
//                                 <BulkUpdateSubServiceForm />
//                               </ProtectedRoute>
//                             }
//                           />
//                           <Route
//                             path="/services/service-scopes/create"
//                             element={
//                               <ProtectedRoute requiredPermission="create_service_scope">
//                                 <ServiceScopeForm />
//                               </ProtectedRoute>
//                             }
//                           />
//                           <Route
//                             path="/services/service-scopes/edit/:scopeId"
//                             element={
//                               <ProtectedRoute requiredPermission="update_service_scope">
//                                 <ServiceScopeForm isEdit />
//                               </ProtectedRoute>
//                             }
//                           />
//                           <Route
//                             path="/services/service-scopes/bulk-create"
//                             element={
//                               <ProtectedRoute requiredPermission="create_service_scope">
//                                 <BulkServiceScopeForm />
//                               </ProtectedRoute>
//                             }
//                           />
//                           <Route
//                             path="/services/service-scopes/bulk-update"
//                             element={
//                               <ProtectedRoute requiredPermission="update_service_scope">
//                                 <BulkUpdateServiceScopeForm />
//                               </ProtectedRoute>
//                             }
//                           />
//                           <Route
//                             path="/property-flow"
//                             element={
//                               <ProtectedRoute requiredPermission="view_property_flow">
//                                 <PropertyFlowManagement />
//                               </ProtectedRoute>
//                             }
//                           />
//                           <Route
//                             path="/assets"
//                             element={
//                               <ProtectedRoute requiredPermission="view_asset">
//                                 <AssetManagement />
//                               </ProtectedRoute>
//                             }
//                           />
//                           <Route
//                             path="/assets/list"
//                             element={
//                               <ProtectedRoute requiredPermission="view_asset">
//                                 <AssetList />
//                               </ProtectedRoute>
//                             }
//                           />
//                           <Route
//                             path="/assets/create"
//                             element={
//                               <ProtectedRoute requiredPermission="create_asset">
//                                 <AssetForm />
//                               </ProtectedRoute>
//                             }
//                           />
//                           <Route
//                             path="/assets/edit/:assetId"
//                             element={
//                               <ProtectedRoute requiredPermission="update_asset">
//                                 <AssetForm isEdit />
//                               </ProtectedRoute>
//                             }
//                           />
//                           <Route
//                             path="/assets/detail/:assetId"
//                             element={
//                               <ProtectedRoute requiredPermission="view_asset">
//                                 <AssetDetail />
//                               </ProtectedRoute>
//                             }
//                           />
//                           <Route
//                             path="/work-requests"
//                             element={
//                               <ProtectedRoute requiredPermission="view_work_request">
//                                 <WorkRequestManagement />
//                               </ProtectedRoute>
//                             }
//                           />
//                           <Route
//                             path="/work-orders"
//                             element={
//                               <ProtectedRoute requiredPermission="view_work_order">
//                                 <WorkOrderManagement />
//                               </ProtectedRoute>
//                             }
//                           />
//                           <Route
//                             path="/approvals"
//                             element={
//                               <ProtectedRoute requiredPermission="review_work_request">
//                                 <ApprovalManagement />
//                               </ProtectedRoute>
//                             }
//                           />
//                           <Route
//                             path="/technician-availability"
//                             element={
//                               <ProtectedRoute requiredPermission="view_technician_availability">
//                                 <TechnicianAvailability />
//                               </ProtectedRoute>
//                             }
//                           />
//                           {/* Added calendar management route */}
//                           <Route
//                             path="/calendar-management"
//                             element={
//                               <ProtectedRoute requiredPermission="create_pm_schedule">
//                                 <CalendarManagement />
//                               </ProtectedRoute>
//                             }
//                           />
//                           <Route
//                             path="/checklists"
//                             element={
//                               <ProtectedRoute requiredPermission="view_checklist">
//                                 <ChecklistManagement />
//                               </ProtectedRoute>
//                             }
//                           />
//                           <Route
//                             path="/inventory"
//                             element={
//                               <ProtectedRoute requiredPermission="view_inventory">
//                                 <InventoryManagement />
//                               </ProtectedRoute>
//                             }
//                           />
//                           <Route
//                             path="/kpi"
//                             element={
//                               <ProtectedRoute requiredPermission="view_kpi">
//                                 <KpiManagement />
//                               </ProtectedRoute>
//                             }
//                           />
//                           <Route
//                             path="/permissionManagement"
//                             element={
//                               <ProtectedRoute requiredPermission="view_permission">
//                                 <PermissionManagement />
//                               </ProtectedRoute>
//                             }
//                           />
//                           <Route path="/" element={<Dashboard />} />
//                         </Routes>
//                       </Layout>
//                     </SidebarProvider>
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

import { useEffect } from "react"; // 👈 add this import
import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
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
import WorkOrderManagement from "./pages/WorkOrderManagement";
import PermissionManagement from "./pages/PermissionManagement";
import CalendarManagement from "./pages/CalendarManagement";
import { SidebarProvider } from "./context/SidebarContext";

function App() {
  useEffect(() => {
    console.log("API URL:", import.meta.env.VITE_API_URL);
  }, []);
  return (
    <AuthProvider>
      <ServiceProvider>
        <PropertyFlowProvider>
          <ErrorBoundary>
            <Toaster
              position="top-right"
              toastOptions={{
                duration: 4000,
                style: { background: "#363636", color: "#fff" },
                success: {
                  duration: 3000,
                  style: { background: "#10B981" },
                },
                error: {
                  duration: 5000,
                  style: { background: "#EF4444" },
                },
              }}
            />
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route
                path="/unauthorized"
                element={
                  <div className="p-6 bg-red-100 text-red-700 rounded-xl max-w-4xl mx-auto">
                    <h2 className="text-xl font-bold">Access Denied</h2>
                    <p>You do not have permission to access this page.</p>
                  </div>
                }
              />
              <Route
                path="/*"
                element={
                  <ProtectedRoute>
                    <SidebarProvider>
                      <Layout>
                        <Routes>
                          <Route path="/dashboard" element={<Dashboard />} />
                          <Route
                            path="/user-management"
                            element={
                              <ProtectedRoute requiredPermission="view_user">
                                <UserManagement />
                              </ProtectedRoute>
                            }
                          />
                          <Route path="/profile" element={<Profile />} />
                          <Route
                            path="/companies"
                            element={
                              <ProtectedRoute requiredPermission="view_company">
                                <CompanyManagement />
                              </ProtectedRoute>
                            }
                          />
                          <Route
                            path="/companies/create"
                            element={
                              <ProtectedRoute requiredPermission="create_company">
                                <CompanyManagement isCreate />
                              </ProtectedRoute>
                            }
                          />
                          <Route
                            path="/companies/list"
                            element={
                              <ProtectedRoute requiredPermission="view_company">
                                <CompanyList />
                              </ProtectedRoute>
                            }
                          />
                          <Route
                            path="/companies/:companyId"
                            element={
                              <ProtectedRoute requiredPermission="update_company">
                                <CompanyUpdate />
                              </ProtectedRoute>
                            }
                          />
                          <Route
                            path="/contracts"
                            element={
                              <ProtectedRoute requiredPermission="view_contract">
                                <ContractManagement />
                              </ProtectedRoute>
                            }
                          />
                          <Route
                            path="/contracts/list"
                            element={
                              <ProtectedRoute requiredPermission="view_contract">
                                <ContractList />
                              </ProtectedRoute>
                            }
                          />
                          <Route
                            path="/contracts/create"
                            element={
                              <ProtectedRoute requiredPermission="create_contract">
                                <ContractManagement isCreate />
                              </ProtectedRoute>
                            }
                          />
                          <Route
                            path="/contracts/:contractId"
                            element={
                              <ProtectedRoute requiredPermission="view_contract">
                                <ContractDetail />
                              </ProtectedRoute>
                            }
                          />
                          <Route
                            path="/contracts/update/:contractId"
                            element={
                              <ProtectedRoute requiredPermission="update_contract">
                                <UpdateContract />
                              </ProtectedRoute>
                            }
                          />
                          <Route
                            path="/services"
                            element={
                              <ProtectedRoute requiredPermission="view_service">
                                <ServiceManagement />
                              </ProtectedRoute>
                            }
                          />
                          <Route
                            path="/services/create"
                            element={
                              <ProtectedRoute requiredPermission="create_service">
                                <ServiceForm />
                              </ProtectedRoute>
                            }
                          />
                          <Route
                            path="/services/edit/:serviceId"
                            element={
                              <ProtectedRoute requiredPermission="update_service">
                                <ServiceForm isEdit />
                              </ProtectedRoute>
                            }
                          />
                          <Route
                            path="/services/bulk-create"
                            element={
                              <ProtectedRoute requiredPermission="create_service">
                                <BulkServiceForm />
                              </ProtectedRoute>
                            }
                          />
                          <Route
                            path="/services/bulk-update"
                            element={
                              <ProtectedRoute requiredPermission="update_service">
                                <BulkUpdateServiceForm />
                              </ProtectedRoute>
                            }
                          />
                          <Route
                            path="/services/sub-services/create"
                            element={
                              <ProtectedRoute requiredPermission="create_sub_service">
                                <SubServiceForm />
                              </ProtectedRoute>
                            }
                          />
                          <Route
                            path="/services/sub-services/edit/:subServiceId"
                            element={
                              <ProtectedRoute requiredPermission="update_sub_service">
                                <SubServiceForm isEdit />
                              </ProtectedRoute>
                            }
                          />
                          <Route
                            path="/services/sub-services/bulk-create"
                            element={
                              <ProtectedRoute requiredPermission="create_sub_service">
                                <BulkSubServiceForm />
                              </ProtectedRoute>
                            }
                          />
                          <Route
                            path="/services/sub-services/bulk-update"
                            element={
                              <ProtectedRoute requiredPermission="update_sub_service">
                                <BulkUpdateSubServiceForm />
                              </ProtectedRoute>
                            }
                          />
                          <Route
                            path="/services/service-scopes/create"
                            element={
                              <ProtectedRoute requiredPermission="create_service_scope">
                                <ServiceScopeForm />
                              </ProtectedRoute>
                            }
                          />
                          <Route
                            path="/services/service-scopes/edit/:scopeId"
                            element={
                              <ProtectedRoute requiredPermission="update_service_scope">
                                <ServiceScopeForm isEdit />
                              </ProtectedRoute>
                            }
                          />
                          <Route
                            path="/services/service-scopes/bulk-create"
                            element={
                              <ProtectedRoute requiredPermission="create_service_scope">
                                <BulkServiceScopeForm />
                              </ProtectedRoute>
                            }
                          />
                          <Route
                            path="/services/service-scopes/bulk-update"
                            element={
                              <ProtectedRoute requiredPermission="update_service_scope">
                                <BulkUpdateServiceScopeForm />
                              </ProtectedRoute>
                            }
                          />
                          <Route
                            path="/property-flow"
                            element={
                              <ProtectedRoute requiredPermission="view_property_flow">
                                <PropertyFlowManagement />
                              </ProtectedRoute>
                            }
                          />
                          <Route
                            path="/assets"
                            element={
                              <ProtectedRoute requiredPermission="view_asset">
                                <AssetManagement />
                              </ProtectedRoute>
                            }
                          />
                          <Route
                            path="/assets/list"
                            element={
                              <ProtectedRoute requiredPermission="view_asset">
                                <AssetList />
                              </ProtectedRoute>
                            }
                          />
                          <Route
                            path="/assets/create"
                            element={
                              <ProtectedRoute requiredPermission="create_asset">
                                <AssetForm />
                              </ProtectedRoute>
                            }
                          />
                          <Route
                            path="/assets/edit/:assetId"
                            element={
                              <ProtectedRoute requiredPermission="update_asset">
                                <AssetForm isEdit />
                              </ProtectedRoute>
                            }
                          />
                          <Route
                            path="/assets/detail/:assetId"
                            element={
                              <ProtectedRoute requiredPermission="view_asset">
                                <AssetDetail />
                              </ProtectedRoute>
                            }
                          />
                          <Route
                            path="/work-requests"
                            element={
                              <ProtectedRoute requiredPermission="view_work_request">
                                <WorkRequestManagement />
                              </ProtectedRoute>
                            }
                          />
                          <Route
                            path="/work-orders"
                            element={
                              <ProtectedRoute requiredPermission="view_work_order">
                                <WorkOrderManagement />
                              </ProtectedRoute>
                            }
                          />
                          <Route
                            path="/approvals"
                            element={
                              <ProtectedRoute requiredPermission="review_work_request">
                                <ApprovalManagement />
                              </ProtectedRoute>
                            }
                          />
                          <Route
                            path="/technician-availability"
                            element={
                              <ProtectedRoute requiredPermission="view_technician_availability">
                                <TechnicianAvailability />
                              </ProtectedRoute>
                            }
                          />
                          {/* Added calendar management route */}
                          <Route
                            path="/calendar-management"
                            element={
                              <ProtectedRoute requiredPermission="create_pm_schedule">
                                <CalendarManagement />
                              </ProtectedRoute>
                            }
                          />
                          <Route
                            path="/checklists"
                            element={
                              <ProtectedRoute requiredPermission="view_checklist">
                                <ChecklistManagement />
                              </ProtectedRoute>
                            }
                          />
                          <Route
                            path="/inventory"
                            element={
                              <ProtectedRoute requiredPermission="view_inventory">
                                <InventoryManagement />
                              </ProtectedRoute>
                            }
                          />
                          <Route
                            path="/kpi"
                            element={
                              <ProtectedRoute requiredPermission="view_kpi">
                                <KpiManagement />
                              </ProtectedRoute>
                            }
                          />
                          <Route
                            path="/permissionManagement"
                            element={
                              <ProtectedRoute requiredPermission="view_permission">
                                <PermissionManagement />
                              </ProtectedRoute>
                            }
                          />
                          <Route path="/" element={<Dashboard />} />
                        </Routes>
                      </Layout>
                    </SidebarProvider>
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
