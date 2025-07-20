// "use client";

// import { Link } from "react-router-dom";
// import { useContext } from "react";
// import { AuthContext } from "../context/AuthContext";

// const Sidebar = () => {
//   const { logout } = useContext(AuthContext);

//   return (
//     <div className="fixed w-64 bg-gray-800 text-white h-screen p-6 shadow-lg">
//       <h2 className="text-xl font-bold text-white mb-8">CAFM System</h2>
//       <nav className="flex-1">
//         <ul className="space-y-2">
//           <li>
//             <Link
//               to="/dashboard"
//               className="block p-3 rounded-lg text-gray-200 hover:bg-gray-700 hover:text-white transition-colors"
//             >
//               Dashboard
//             </Link>
//           </li>
//           <li>
//             <Link
//               to="/companies"
//               className="block p-3 rounded-lg text-gray-200 hover:bg-gray-700 hover:text-white transition-colors"
//             >
//               Companies
//             </Link>
//           </li>
//           <li>
//             <Link
//               to="/contracts"
//               className="block p-3 rounded-lg text-gray-200 hover:bg-gray-700 hover:text-white transition-colors"
//             >
//               Contracts
//             </Link>
//           </li>
//           <li>
//             <Link
//               to="/services"
//               className="block p-3 rounded-lg text-gray-200 hover:bg-gray-700 hover:text-white transition-colors"
//             >
//               Services
//             </Link>
//           </li>
//           <li>
//             <Link
//               to="/property-flow"
//               className="block p-3 rounded-lg text-gray-200 hover:bg-gray-700 hover:text-white transition-colors"
//             >
//               Property Flow
//             </Link>
//           </li>
//           <li>
//             <Link
//               to="/sla"
//               className="block p-3 rounded-lg text-gray-200 hover:bg-gray-700 hover:text-white transition-colors text-sm"
//             >
//               SLA
//             </Link>
//           </li>
//           <li>
//             <Link
//               to="/assets"
//               className="block p-3 rounded-lg text-gray-200 hover:bg-gray-700 hover:text-white transition-colors"
//             >
//               Assets
//             </Link>
//           </li>
//           <li>
//             <Link
//               to="/workrequests"
//               className="block p-3 rounded-lg text-gray-200 hover:bg-gray-700 hover:text-white transition-colors"
//             >
//               Work Requests
//             </Link>
//           </li>
//         </ul>
//       </nav>
//       <button
//         type="button"
//         onClick={logout}
//         className="block p-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors w-full mt-4"
//       >
//         Logout
//       </button>
//     </div>
//   );
// };

// export default Sidebar;

// "use client";

// import { Link } from "react-router-dom";
// import { useContext } from "react";
// import { AuthContext } from "../context/AuthContext";

// const Sidebar = () => {
//   const { logout } = useContext(AuthContext);

//   return (
//     <div className="fixed w-64 bg-gray-800 text-white h-screen p-6 shadow-lg">
//       <h2 className="text-xl font-bold text-white mb-8">CAFM System</h2>
//       <nav className="flex-1">
//         <ul className="space-y-2">
//           <li>
//             <Link
//               to="/dashboard"
//               className="block p-3 rounded-lg text-gray-200 hover:bg-gray-700 hover:text-white transition-colors"
//             >
//               Dashboard
//             </Link>
//           </li>
//           <li>
//             <Link
//               to="/user-management"
//               className="block p-3 rounded-lg text-gray-200 hover:bg-gray-700 hover:text-white transition-colors"
//             >
//               User Management
//             </Link>
//           </li>
//           <li>
//             <Link
//               to="/companies"
//               className="block p-3 rounded-lg text-gray-200 hover:bg-gray-700 hover:text-white transition-colors"
//             >
//               Companies
//             </Link>
//           </li>
//           <li>
//             <Link
//               to="/contracts"
//               className="block p-3 rounded-lg text-gray-200 hover:bg-gray-700 hover:text-white transition-colors"
//             >
//               Contracts
//             </Link>
//           </li>
//           <li>
//             <Link
//               to="/services"
//               className="block p-3 rounded-lg text-gray-200 hover:bg-gray-700 hover:text-white transition-colors"
//             >
//               Services
//             </Link>
//           </li>
//           <li>
//             <Link
//               to="/property-flow"
//               className="block p-3 rounded-lg text-gray-200 hover:bg-gray-700 hover:text-white transition-colors"
//             >
//               Property Flow
//             </Link>
//           </li>
//           <li>
//             <Link
//               to="/sla"
//               className="block p-3 rounded-lg text-gray-200 hover:bg-gray-700 hover:text-white transition-colors text-sm"
//             >
//               SLA
//             </Link>
//           </li>
//           <li>
//             <Link
//               to="/assets"
//               className="block p-3 rounded-lg text-gray-200 hover:bg-gray-700 hover:text-white transition-colors"
//             >
//               Assets
//             </Link>
//           </li>
//           <li>
//             <Link
//               to="/workrequests"
//               className="block p-3 rounded-lg text-gray-200 hover:bg-gray-700 hover:text-white transition-colors"
//             >
//               Work Requests
//             </Link>
//           </li>
//         </ul>
//       </nav>
//       <button
//         type="button"
//         onClick={logout}
//         className="block p-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors w-full mt-4"
//       >
//         Logout
//       </button>
//     </div>
//   );
// };

// export default Sidebar;

// // src/components/Sidebar.jsx
// import { useState, useContext } from "react";
// import { Link } from "react-router-dom";
// import { AuthContext } from "../context/AuthContext";
// import { Menu, X } from "lucide-react";

// const Sidebar = () => {
//   const { logout } = useContext(AuthContext);
//   const [isOpen, setIsOpen] = useState(false);

//   const toggleSidebar = () => setIsOpen(!isOpen);

//   return (
//     <>
//       <button
//         className="md:hidden fixed top-4 left-4 z-50 p-2 bg-gray-800 text-white rounded-lg"
//         onClick={toggleSidebar}
//       >
//         {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
//       </button>
//       <div
//         className={`fixed top-0 left-0 h-screen bg-gray-800 text-white p-6 shadow-lg transition-transform duration-300 ${
//           isOpen ? "translate-x-0" : "-translate-x-full"
//         } md:translate-x-0 md:w-64 w-3/4 z-40`}
//       >
//         <h2 className="text-xl font-bold text-white mb-8">CAFM System</h2>
//         <nav className="flex-1">
//           <ul className="space-y-2">
//             <li>
//               <Link
//                 to="/dashboard"
//                 className="block p-3 rounded-lg text-gray-200 hover:bg-gray-700 hover:text-white transition-colors"
//                 onClick={() => setIsOpen(false)}
//               >
//                 Dashboard
//               </Link>
//             </li>
//             <li>
//               <Link
//                 to="/user-management"
//                 className="block p-3 rounded-lg text-gray-200 hover:bg-gray-700 hover:text-white transition-colors"
//                 onClick={() => setIsOpen(false)}
//               >
//                 User Management
//               </Link>
//             </li>
//             <li>
//               <Link
//                 to="/companies"
//                 className="block p-3 rounded-lg text-gray-200 hover:bg-gray-700 hover:text-white transition-colors"
//                 onClick={() => setIsOpen(false)}
//               >
//                 Companies
//               </Link>
//             </li>
//             <li>
//               <Link
//                 to="/contracts"
//                 className="block p-3 rounded-lg text-gray-200 hover:bg-gray-700 hover:text-white transition-colors"
//                 onClick={() => setIsOpen(false)}
//               >
//                 Contracts
//               </Link>
//             </li>
//             <li>
//               <Link
//                 to="/services"
//                 className="block p-3 rounded-lg text-gray-200 hover:bg-gray-700 hover:text-white transition-colors"
//                 onClick={() => setIsOpen(false)}
//               >
//                 Services
//               </Link>
//             </li>
//             <li>
//               <Link
//                 to="/property-flow"
//                 className="block p-3 rounded-lg text-gray-200 hover:bg-gray-700 hover:text-white transition-colors"
//                 onClick={() => setIsOpen(false)}
//               >
//                 Property Flow
//               </Link>
//             </li>
//             <li>
//               <Link
//                 to="/sla"
//                 className="block p-3 rounded-lg text-gray-200 hover:bg-gray-700 hover:text-white transition-colors text-sm"
//                 onClick={() => setIsOpen(false)}
//               >
//                 SLA
//               </Link>
//             </li>
//             <li>
//               <Link
//                 to="/assets"
//                 className="block p-3 rounded-lg text-gray-200 hover:bg-gray-700 hover:text-white transition-colors"
//                 onClick={() => setIsOpen(false)}
//               >
//                 Assets
//               </Link>
//             </li>
//             <li>
//               <Link
//                 to="/workrequests"
//                 className="block p-3 rounded-lg text-gray-200 hover:bg-gray-700 hover:text-white transition-colors"
//                 onClick={() => setIsOpen(false)}
//               >
//                 Work Requests
//               </Link>
//             </li>
//           </ul>
//         </nav>
//         <button
//           type="button"
//           onClick={() => {
//             logout();
//             setIsOpen(false);
//           }}
//           className="block p-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors w-full mt-4"
//         >
//           Logout
//         </button>
//       </div>
//       {isOpen && (
//         <div
//           className="fixed inset-0 bg-black bg-opacity-50 md:hidden z-30"
//           onClick={toggleSidebar}
//         ></div>
//       )}
//     </>
//   );
// };

// export default Sidebar;

//update on now 2025/07
// "use client";

// import { useState, useContext } from "react";
// import { Link, useLocation } from "react-router-dom";
// import { AuthContext } from "../context/AuthContext";
// import {
//   Menu,
//   X,
//   LayoutDashboard,
//   Users,
//   Building2,
//   FileText,
//   Wrench,
//   MapPin,
//   Shield,
//   Package,
//   ClipboardList,
//   LogOut,
// } from "lucide-react";

// const Sidebar = () => {
//   const { logout } = useContext(AuthContext);
//   const [isOpen, setIsOpen] = useState(false);
//   const location = useLocation();

//   const toggleSidebar = () => setIsOpen(!isOpen);

//   const menuItems = [
//     { path: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
//     { path: "/user-management", icon: Users, label: "User Management" },
//     { path: "/companies", icon: Building2, label: "Companies" },
//     { path: "/contracts", icon: FileText, label: "Contracts" },
//     { path: "/services", icon: Wrench, label: "Services" },
//     { path: "/property-flow", icon: MapPin, label: "Property Flow" },
//     { path: "/sla", icon: Shield, label: "SLA" },
//     { path: "/assets", icon: Package, label: "Assets" },
//     { path: "/workrequests", icon: ClipboardList, label: "Work Requests" },
//   ];

//   const isActivePath = (path) => {
//     return (
//       location.pathname === path || location.pathname.startsWith(path + "/")
//     );
//   };

//   return (
//     <>
//       {/* Mobile menu button */}
//       <button
//         className="md:hidden fixed top-4 left-4 z-50 p-2 bg-gray-800 text-white rounded-lg shadow-lg"
//         onClick={toggleSidebar}
//       >
//         {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
//       </button>

//       {/* Sidebar */}
//       <div
//         className={`fixed top-0 left-0 h-screen bg-gradient-to-b from-gray-800 to-gray-900 text-white shadow-2xl transition-transform duration-300 ${
//           isOpen ? "translate-x-0" : "-translate-x-full"
//         } md:translate-x-0 md:w-16 w-64 z-40`}
//       >
//         {/* Logo */}
//         <div className="p-3 border-b border-gray-700">
//           <div className="flex items-center justify-center md:justify-center">
//             <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
//               <Package className="w-5 h-5 text-white" />
//             </div>
//             <span className="ml-3 text-lg font-bold text-white md:hidden">
//               CAFM System
//             </span>
//           </div>
//         </div>

//         {/* Navigation */}
//         <nav className="flex-1 py-4">
//           <ul className="space-y-1 px-2">
//             {menuItems.map((item) => {
//               const IconComponent = item.icon;
//               const isActive = isActivePath(item.path);
//               return (
//                 <li key={item.path} className="relative group">
//                   <Link
//                     to={item.path}
//                     className={`flex items-center justify-center md:justify-center p-3 rounded-xl transition-all duration-200 ${
//                       isActive
//                         ? "bg-blue-600 text-white shadow-lg"
//                         : "text-gray-300 hover:bg-gray-700 hover:text-white"
//                     }`}
//                     onClick={() => setIsOpen(false)}
//                   >
//                     <IconComponent className="w-6 h-6" />
//                     <span className="ml-3 md:hidden">{item.label}</span>
//                   </Link>

//                   {/* Tooltip for desktop */}
//                   <div className="absolute left-full top-1/2 transform -translate-y-1/2 ml-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-50 hidden md:block">
//                     {item.label}
//                     <div className="absolute top-1/2 left-0 transform -translate-y-1/2 -translate-x-1 w-2 h-2 bg-gray-900 rotate-45"></div>
//                   </div>
//                 </li>
//               );
//             })}
//           </ul>
//         </nav>

//         {/* Logout button */}
//         <div className="p-2 border-t border-gray-700">
//           <div className="relative group">
//             <button
//               type="button"
//               onClick={() => {
//                 logout();
//                 setIsOpen(false);
//               }}
//               className="flex items-center justify-center md:justify-center w-full p-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-all duration-200"
//             >
//               <LogOut className="w-6 h-6" />
//               <span className="ml-3 md:hidden">Logout</span>
//             </button>

//             {/* Tooltip for logout */}
//             <div className="absolute left-full top-1/2 transform -translate-y-1/2 ml-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-50 hidden md:block">
//               Logout
//               <div className="absolute top-1/2 left-0 transform -translate-y-1/2 -translate-x-1 w-2 h-2 bg-gray-900 rotate-45"></div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Mobile overlay */}
//       {isOpen && (
//         <div
//           className="fixed inset-0 bg-black bg-opacity-50 md:hidden z-30"
//           onClick={toggleSidebar}
//         ></div>
//       )}
//     </>
//   );
// };

// export default Sidebar;

//update on 2025/07/09

// "use client";

// import { useState, useContext } from "react";
// import { Link, useLocation } from "react-router-dom";
// import { AuthContext } from "../context/AuthContext";
// import {
//   Menu,
//   X,
//   LayoutDashboard,
//   Users,
//   Building2,
//   FileText,
//   Wrench,
//   MapPin,
//   Shield,
//   Package,
//   ClipboardList,
//   LogOut,
//   User,
// } from "lucide-react";

// const Sidebar = () => {
//   const { logout } = useContext(AuthContext);
//   const [isOpen, setIsOpen] = useState(false);
//   const location = useLocation();

//   const toggleSidebar = () => setIsOpen(!isOpen);

//   const menuItems = [
//     { path: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
//     { path: "/user-management", icon: Users, label: "User Management" },
//     { path: "/companies", icon: Building2, label: "Companies" },
//     { path: "/contracts", icon: FileText, label: "Contracts" },
//     { path: "/services", icon: Wrench, label: "Services" },
//     { path: "/property-flow", icon: MapPin, label: "Property Flow" },
//     { path: "/sla", icon: Shield, label: "SLA" },
//     { path: "/assets", icon: Package, label: "Assets" },
//     { path: "/workrequests", icon: ClipboardList, label: "Work Requests" },
//     { path: "/profile", icon: User, label: "Profile" },
//   ];

//   const isActivePath = (path) => {
//     return (
//       location.pathname === path || location.pathname.startsWith(path + "/")
//     );
//   };

//   return (
//     <>
//       {/* Mobile menu button */}
//       <button
//         className="md:hidden fixed top-4 left-4 z-50 p-2 bg-gray-800 text-white rounded-lg shadow-lg"
//         onClick={toggleSidebar}
//       >
//         {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
//       </button>

//       {/* Sidebar */}
//       <div
//         className={`fixed top-0 left-0 h-screen bg-gradient-to-b from-gray-800 to-gray-900 text-white shadow-2xl transition-transform duration-300 ${
//           isOpen ? "translate-x-0" : "-translate-x-full"
//         } md:translate-x-0 md:w-16 w-64 z-40`}
//       >
//         {/* Logo */}
//         <div className="p-3 border-b border-gray-700">
//           <div className="flex items-center justify-center md:justify-center">
//             <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
//               <Package className="w-5 h-5 text-white" />
//             </div>
//             <span className="ml-3 text-lg font-bold text-white md:hidden">
//               CAFM System
//             </span>
//           </div>
//         </div>

//         {/* Navigation */}
//         <nav className="flex-1 py-4">
//           <ul className="space-y-1 px-2">
//             {menuItems.map((item) => {
//               const IconComponent = item.icon;
//               const isActive = isActivePath(item.path);
//               return (
//                 <li key={item.path} className="relative group">
//                   <Link
//                     to={item.path}
//                     className={`flex items-center justify-center md:justify-center p-3 rounded-xl transition-all duration-200 ${
//                       isActive
//                         ? "bg-blue-600 text-white shadow-lg"
//                         : "text-gray-300 hover:bg-gray-700 hover:text-white"
//                     }`}
//                     onClick={() => setIsOpen(false)}
//                   >
//                     <IconComponent className="w-6 h-6" />
//                     <span className="ml-3 md:hidden">{item.label}</span>
//                   </Link>
//                   {/* Tooltip for desktop */}
//                   <div className="absolute left-full top-1/2 transform -translate-y-1/2 ml-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-50 hidden md:block">
//                     {item.label}
//                     <div className="absolute top-1/2 left-0 transform -translate-y-1/2 -translate-x-1 w-2 h-2 bg-gray-900 rotate-45"></div>
//                   </div>
//                 </li>
//               );
//             })}
//           </ul>
//         </nav>

//         {/* Logout button */}
//         <div className="p-2 border-t border-gray-700">
//           <div className="relative group">
//             <button
//               type="button"
//               onClick={() => {
//                 logout();
//                 setIsOpen(false);
//               }}
//               className="flex items-center justify-center md:justify-center w-full p-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-all duration-200"
//             >
//               <LogOut className="w-6 h-6" />
//               <span className="ml-3 md:hidden">Logout</span>
//             </button>
//             {/* Tooltip for logout */}
//             <div className="absolute left-full top-1/2 transform -translate-y-1/2 ml-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-50 hidden md:block">
//               Logout
//               <div className="absolute top-1/2 left-0 transform -translate-y-1/2 -translate-x-1 w-2 h-2 bg-gray-900 rotate-45"></div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Mobile overlay */}
//       {isOpen && (
//         <div
//           className="fixed inset-0 bg-black bg-opacity-50 md:hidden z-30"
//           onClick={toggleSidebar}
//         ></div>
//       )}
//     </>
//   );
// };

// export default Sidebar;

// "use client";

// import { useState, useContext } from "react";
// import { Link, useLocation } from "react-router-dom";
// import { AuthContext } from "../context/AuthContext";
// import {
//   Menu,
//   X,
//   LayoutDashboard,
//   Users,
//   Building2,
//   FileText,
//   Wrench,
//   MapPin,
//   Package,
//   LogOut,
//   User,
//   Warehouse,
//   CheckSquare,
// } from "lucide-react";

// const Sidebar = () => {
//   const { logout } = useContext(AuthContext);
//   const [isOpen, setIsOpen] = useState(false);
//   const location = useLocation();

//   const toggleSidebar = () => setIsOpen(!isOpen);

//   const menuItems = [
//     { path: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
//     { path: "/user-management", icon: Users, label: "User Management" },
//     { path: "/companies", icon: Building2, label: "Companies" },
//     { path: "/contracts", icon: FileText, label: "Contracts" },
//     { path: "/services", icon: Wrench, label: "Services" },
//     { path: "/property-flow", icon: MapPin, label: "Property Flow" },
//     { path: "/assets", icon: Package, label: "Assets" },
//     { path: "/checklists", icon: CheckSquare, label: "Checklists" },
//     { path: "/inventory", icon: Warehouse, label: "Inventory" },
//     { path: "/profile", icon: User, label: "Profile" },
//   ];

//   const isActivePath = (path) => {
//     return (
//       location.pathname === path || location.pathname.startsWith(path + "/")
//     );
//   };

//   return (
//     <>
//       {/* Mobile menu button */}
//       <button
//         className="md:hidden fixed top-4 left-4 z-50 p-2 bg-gray-800 text-white rounded-lg shadow-lg"
//         onClick={toggleSidebar}
//       >
//         {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
//       </button>

//       {/* Sidebar */}
//       <div
//         className={`fixed top-0 left-0 h-screen bg-gradient-to-b from-gray-800 to-gray-900 text-white shadow-2xl transition-transform duration-300 ${
//           isOpen ? "translate-x-0" : "-translate-x-full"
//         } md:translate-x-0 md:w-16 w-64 z-40`}
//       >
//         {/* Logo */}
//         <div className="p-3 border-b border-gray-700">
//           <div className="flex items-center justify-center md:justify-center">
//             <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
//               <Package className="w-5 h-5 text-white" />
//             </div>
//             <span className="ml-3 text-lg font-bold text-white md:hidden">
//               CAFM System
//             </span>
//           </div>
//         </div>

//         {/* Navigation */}
//         <nav className="flex-1 py-4 overflow-y-auto">
//           <ul className="space-y-1 px-2">
//             {menuItems.map((item) => {
//               const IconComponent = item.icon;
//               const isActive = isActivePath(item.path);
//               return (
//                 <li key={item.path} className="relative group">
//                   <Link
//                     to={item.path}
//                     className={`flex items-center justify-center md:justify-center p-3 rounded-xl transition-all duration-200 ${
//                       isActive
//                         ? "bg-blue-600 text-white shadow-lg"
//                         : "text-gray-300 hover:bg-gray-700 hover:text-white"
//                     }`}
//                     onClick={() => setIsOpen(false)}
//                   >
//                     <IconComponent className="w-6 h-6" />
//                     <span className="ml-3 md:hidden">{item.label}</span>
//                   </Link>
//                   {/* Tooltip for desktop */}
//                   <div className="absolute left-full top-1/2 transform -translate-y-1/2 ml-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-50 hidden md:block">
//                     {item.label}
//                     <div className="absolute top-1/2 left-0 transform -translate-y-1/2 -translate-x-1 w-2 h-2 bg-gray-900 rotate-45"></div>
//                   </div>
//                 </li>
//               );
//             })}
//           </ul>
//         </nav>

//         {/* Logout button */}
//         <div className="p-2 border-t border-gray-700">
//           <div className="relative group">
//             <button
//               type="button"
//               onClick={() => {
//                 logout();
//                 setIsOpen(false);
//               }}
//               className="flex items-center justify-center md:justify-center w-full p-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-all duration-200"
//             >
//               <LogOut className="w-6 h-6" />
//               <span className="ml-3 md:hidden">Logout</span>
//             </button>
//             {/* Tooltip for logout */}
//             <div className="absolute left-full top-1/2 transform -translate-y-1/2 ml-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-50 hidden md:block">
//               Logout
//               <div className="absolute top-1/2 left-0 transform -translate-y-1/2 -translate-x-1 w-2 h-2 bg-gray-900 rotate-45"></div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Mobile overlay */}
//       {isOpen && (
//         <div
//           className="fixed inset-0 bg-black bg-opacity-50 md:hidden z-30"
//           onClick={toggleSidebar}
//         ></div>
//       )}
//     </>
//   );
// };
// export default Sidebar;

// "use client";

// import { useState, useContext } from "react";
// import { Link, useLocation } from "react-router-dom";
// import { AuthContext } from "../context/AuthContext";
// import {
//   Menu,
//   X,
//   LayoutDashboard,
//   Users,
//   Building2,
//   FileText,
//   Wrench,
//   MapPin,
//   Package,
//   LogOut,
//   User,
//   Warehouse,
//   CheckSquare,
//   BarChart2,
// } from "lucide-react";

// const Sidebar = () => {
//   const { logout } = useContext(AuthContext);
//   const [isOpen, setIsOpen] = useState(false);
//   const location = useLocation();

//   const toggleSidebar = () => setIsOpen(!isOpen);

//   const menuItems = [
//     { path: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
//     { path: "/user-management", icon: Users, label: "User Management" },
//     { path: "/companies", icon: Building2, label: "Companies" },
//     { path: "/contracts", icon: FileText, label: "Contracts" },
//     { path: "/services", icon: Wrench, label: "Services" },
//     { path: "/property-flow", icon: MapPin, label: "Property Flow" },
//     { path: "/assets", icon: Package, label: "Assets" },
//     { path: "/checklists", icon: CheckSquare, label: "Checklists" },
//     { path: "/inventory", icon: Warehouse, label: "Inventory" },
//     { path: "/kpi", icon: BarChart2, label: "KPI" },
//     { path: "/profile", icon: User, label: "Profile" },
//   ];

//   const isActivePath = (path) => {
//     return (
//       location.pathname === path || location.pathname.startsWith(path + "/")
//     );
//   };

//   return (
//     <>
//       {/* Mobile menu button */}
//       <button
//         className="md:hidden fixed top-4 left-4 z-50 p-2 bg-gray-800 text-white rounded-lg shadow-lg"
//         onClick={toggleSidebar}
//       >
//         {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
//       </button>

//       {/* Sidebar */}
//       <div
//         className={`fixed top-0 left-0 h-screen bg-gradient-to-b from-gray-800 to-gray-900 text-white shadow-2xl transition-transform duration-300 ${
//           isOpen ? "translate-x-0" : "-translate-x-full"
//         } md:translate-x-0 md:w-16 w-64 z-40`}
//       >
//         {/* Logo */}
//         <div className="p-3 border-b border-gray-700">
//           <div className="flex items-center justify-center md:justify-center">
//             <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
//               <Package className="w-5 h-5 text-white" />
//             </div>
//             <span className="ml-3 text-lg font-bold text-white md:hidden">
//               CAFM System
//             </span>
//           </div>
//         </div>

//         {/* Navigation */}
//         <nav className="flex-1 py-4 overflow-y-auto">
//           <ul className="space-y-1 px-2">
//             {menuItems.map((item) => {
//               const IconComponent = item.icon;
//               const isActive = isActivePath(item.path);
//               return (
//                 <li key={item.path} className="relative group">
//                   <Link
//                     to={item.path}
//                     className={`flex items-center justify-center md:justify-center p-3 rounded-xl transition-all duration-200 ${
//                       isActive
//                         ? "bg-blue-600 text-white shadow-lg"
//                         : "text-gray-300 hover:bg-gray-700 hover:text-white"
//                     }`}
//                     onClick={() => setIsOpen(false)}
//                   >
//                     <IconComponent className="w-6 h-6" />
//                     <span className="ml-3 md:hidden">{item.label}</span>
//                   </Link>
//                   {/* Tooltip for desktop */}
//                   <div className="absolute left-full top-1/2 transform -translate-y-1/2 ml-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-50 hidden md:block">
//                     {item.label}
//                     <div className="absolute top-1/2 left-0 transform -translate-y-1/2 -translate-x-1 w-2 h-2 bg-gray-900 rotate-45"></div>
//                   </div>
//                 </li>
//               );
//             })}
//           </ul>
//         </nav>

//         {/* Logout button */}
//         <div className="p-2 border-t border-gray-700">
//           <div className="relative group">
//             <button
//               type="button"
//               onClick={() => {
//                 logout();
//                 setIsOpen(false);
//               }}
//               className="flex items-center justify-center md:justify-center w-full p-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-all duration-200"
//             >
//               <LogOut className="w-6 h-6" />
//               <span className="ml-3 md:hidden">Logout</span>
//             </button>
//             {/* Tooltip for logout */}
//             <div className="absolute left-full top-1/2 transform -translate-y-1/2 ml-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-50 hidden md:block">
//               Logout
//               <div className="absolute top-1/2 left-0 transform -translate-y-1/2 -translate-x-1 w-2 h-2 bg-gray-900 rotate-45"></div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Mobile overlay */}
//       {isOpen && (
//         <div
//           className="fixed inset-0 bg-black bg-opacity-50 md:hidden z-30"
//           onClick={toggleSidebar}
//         ></div>
//       )}
//     </>
//   );
// };

// export default Sidebar;

// "use client";

// import { useState, useContext } from "react";
// import { Link, useLocation } from "react-router-dom";
// import { AuthContext } from "../context/AuthContext";
// import {
//   Menu,
//   X,
//   LayoutDashboard,
//   Users,
//   Building2,
//   FileText,
//   Wrench,
//   MapPin,
//   Package,
//   LogOut,
//   User,
//   Warehouse,
//   CheckSquare,
//   BarChart2,
//   ClipboardList,
// } from "lucide-react";

// const Sidebar = () => {
//   const { logout } = useContext(AuthContext);
//   const [isOpen, setIsOpen] = useState(false);
//   const location = useLocation();

//   const toggleSidebar = () => setIsOpen(!isOpen);

//   const menuItems = [
//     { path: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
//     { path: "/user-management", icon: Users, label: "User Management" },
//     { path: "/companies", icon: Building2, label: "Companies" },
//     { path: "/contracts", icon: FileText, label: "Contracts" },
//     { path: "/services", icon: Wrench, label: "Services" },
//     { path: "/property-flow", icon: MapPin, label: "Property Flow" },
//     { path: "/assets", icon: Package, label: "Assets" },
//     { path: "/work-requests", icon: ClipboardList, label: "Work Requests" },
//     { path: "/checklists", icon: CheckSquare, label: "Checklists" },
//     { path: "/inventory", icon: Warehouse, label: "Inventory" },
//     { path: "/kpi", icon: BarChart2, label: "KPI" },
//     { path: "/profile", icon: User, label: "Profile" },
//   ];

//   const isActivePath = (path) => {
//     return (
//       location.pathname === path || location.pathname.startsWith(path + "/")
//     );
//   };

//   return (
//     <>
//       {/* Mobile menu button */}
//       <button
//         className="md:hidden fixed top-4 left-4 z-50 p-2 bg-gray-800 text-white rounded-lg shadow-lg"
//         onClick={toggleSidebar}
//       >
//         {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
//       </button>

//       {/* Sidebar */}
//       <div
//         className={`fixed top-0 left-0 h-screen bg-gradient-to-b from-gray-800 to-gray-900 text-white shadow-2xl transition-transform duration-300 ${
//           isOpen ? "translate-x-0" : "-translate-x-full"
//         } md:translate-x-0 md:w-16 w-64 z-40`}
//       >
//         {/* Logo */}
//         <div className="p-3 border-b border-gray-700">
//           <div className="flex items-center justify-center md:justify-center">
//             <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
//               <Package className="w-5 h-5 text-white" />
//             </div>
//             <span className="ml-3 text-lg font-bold text-white md:hidden">
//               CAFM System
//             </span>
//           </div>
//         </div>

//         {/* Navigation */}
//         <nav className="flex-1 py-4 overflow-y-auto">
//           <ul className="space-y-1 px-2">
//             {menuItems.map((item) => {
//               const IconComponent = item.icon;
//               const isActive = isActivePath(item.path);
//               return (
//                 <li key={item.path} className="relative group">
//                   <Link
//                     to={item.path}
//                     className={`flex items-center justify-center md:justify-center p-3 rounded-xl transition-all duration-200 ${
//                       isActive
//                         ? "bg-blue-600 text-white shadow-lg"
//                         : "text-gray-300 hover:bg-gray-700 hover:text-white"
//                     }`}
//                     onClick={() => setIsOpen(false)}
//                   >
//                     <IconComponent className="w-6 h-6" />
//                     <span className="ml-3 md:hidden">{item.label}</span>
//                   </Link>
//                   {/* Tooltip for desktop */}
//                   <div className="absolute left-full top-1/2 transform -translate-y-1/2 ml-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-50 hidden md:block">
//                     {item.label}
//                     <div className="absolute top-1/2 left-0 transform -translate-y-1/2 -translate-x-1 w-2 h-2 bg-gray-900 rotate-45"></div>
//                   </div>
//                 </li>
//               );
//             })}
//           </ul>
//         </nav>

//         {/* Logout button */}
//         <div className="p-2 border-t border-gray-700">
//           <div className="relative group">
//             <button
//               type="button"
//               onClick={() => {
//                 logout();
//                 setIsOpen(false);
//               }}
//               className="flex items-center justify-center md:justify-center w-full p-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-all duration-200"
//             >
//               <LogOut className="w-6 h-6" />
//               <span className="ml-3 md:hidden">Logout</span>
//             </button>
//             {/*
//               <span className="ml-3 md:hidden">Logout</span>
//             </button>
//             {/* Tooltip for logout */}
//             <div className="absolute left-full top-1/2 transform -translate-y-1/2 ml-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-50 hidden md:block">
//               Logout
//               <div className="absolute top-1/2 left-0 transform -translate-y-1/2 -translate-x-1 w-2 h-2 bg-gray-900 rotate-45"></div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Mobile overlay */}
//       {isOpen && (
//         <div
//           className="fixed inset-0 bg-black bg-opacity-50 md:hidden z-30"
//           onClick={toggleSidebar}
//         ></div>
//       )}
//     </>
//   );
// };

// export default Sidebar;

// "use client";

// import { useState, useContext } from "react";
// import { Link, useLocation } from "react-router-dom";
// import { AuthContext } from "../context/AuthContext";
// import {
//   Menu,
//   X,
//   LayoutDashboard,
//   Users,
//   Building2,
//   FileText,
//   Wrench,
//   MapPin,
//   Package,
//   LogOut,
//   User,
//   Warehouse,
//   CheckSquare,
//   BarChart2,
//   ClipboardList,
//   CheckCircle,
//   Calendar,
// } from "lucide-react";

// const Sidebar = () => {
//   const { logout } = useContext(AuthContext);
//   const [isOpen, setIsOpen] = useState(false);
//   const location = useLocation();

//   const toggleSidebar = () => setIsOpen(!isOpen);

//   const menuItems = [
//     { path: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
//     { path: "/user-management", icon: Users, label: "User Management" },
//     { path: "/companies", icon: Building2, label: "Companies" },
//     { path: "/contracts", icon: FileText, label: "Contracts" },
//     { path: "/services", icon: Wrench, label: "Services" },
//     { path: "/property-flow", icon: MapPin, label: "Property Flow" },
//     { path: "/assets", icon: Package, label: "Assets" },
//     { path: "/work-requests", icon: ClipboardList, label: "Work Requests" },
//     { path: "/approvals", icon: CheckCircle, label: "Approvals" },
//     {
//       path: "/technician-availability",
//       icon: Calendar,
//       label: "Technician Availability",
//     },
//     { path: "/checklists", icon: CheckSquare, label: "Checklists" },
//     { path: "/inventory", icon: Warehouse, label: "Inventory" },
//     { path: "/kpi", icon: BarChart2, label: "KPI" },
//     { path: "/profile", icon: User, label: "Profile" },
//   ];

//   const isActivePath = (path) =>
//     location.pathname === path || location.pathname.startsWith(path + "/");

//   return (
//     <>
//       {/* Mobile toggle button */}
//       <button
//         className="md:hidden fixed top-4 right-4 z-50 p-2 bg-gray-800 text-white rounded-lg shadow-lg"
//         onClick={toggleSidebar}
//       >
//         {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
//       </button>

//       {/* Sidebar (LEFT SIDE now) */}
//       <div
//         className={`fixed top-0 left-0 h-screen bg-gradient-to-b from-gray-800 to-gray-900 text-white shadow-2xl transition-transform duration-300 overflow-hidden ${
//           isOpen ? "translate-x-0" : "-translate-x-full"
//         }  md:translate-x-0 md:w-20 w-64 z-40 flex flex-col`}
//       >
//         {/* Navigation */}
//         <nav className="flex-1 py-4 overflow-y-auto custom-scrollbar px-2">
//           <ul className="space-y-1">
//             {menuItems.map((item) => {
//               const IconComponent = item.icon;
//               const isActive = isActivePath(item.path);
//               return (
//                 <li key={item.path} className="relative group">
//                   <Link
//                     to={item.path}
//                     className={`flex items-center justify-center md:justify-center p-3 rounded-xl transition-all duration-200 ${
//                       isActive
//                         ? "bg-blue-600 text-white shadow-lg"
//                         : "text-gray-300 hover:bg-gray-700 hover:text-white"
//                     }`}
//                     onClick={() => setIsOpen(false)}
//                   >
//                     <IconComponent className="w-6 h-6 md:w-7 md:h-7" />
//                     <span className="ml-3 md:hidden">{item.label}</span>
//                   </Link>
//                   {/* Tooltip */}
//                   <div className="absolute right-full top-1/2 transform -translate-y-1/2 mr-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-50 hidden md:block">
//                     {item.label}
//                     <div className="absolute top-1/2 right-0 transform -translate-y-1/2 translate-x-1 w-2 h-2 bg-gray-900 rotate-45"></div>
//                   </div>
//                 </li>
//               );
//             })}
//           </ul>
//         </nav>

//         {/* Logout Button */}
//         <div className="p-2 border-t border-gray-700 flex-shrink-0">
//           <div className="relative group">
//             <button
//               type="button"
//               onClick={() => {
//                 logout();
//                 setIsOpen(false);
//               }}
//               className="flex items-center justify-center md:justify-center w-full p-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-all duration-200"
//             >
//               <LogOut className="w-6 h-6 md:w-7 md:h-7" />
//               <span className="ml-3 md:hidden">Logout</span>
//             </button>
//             <div className="absolute right-full top-1/2 transform -translate-y-1/2 mr-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-50 hidden md:block">
//               Logout
//               <div className="absolute top-1/2 right-0 transform -translate-y-1/2 translate-x-1 w-2 h-2 bg-gray-900 rotate-45"></div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Overlay for mobile */}
//       {isOpen && (
//         <div
//           className="fixed inset-0 bg-black bg-opacity-50 md:hidden z-30"
//           onClick={toggleSidebar}
//         ></div>
//       )}
//     </>
//   );
// };

// export default Sidebar;

"use client";

import { useState, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import {
  Menu,
  X,
  LayoutDashboard,
  Users,
  Building2,
  FileText,
  Wrench,
  MapPin,
  Package,
  LogOut,
  User,
  Warehouse,
  CheckSquare,
  BarChart2,
  ClipboardList,
  CheckCircle,
  Calendar,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const Sidebar = () => {
  const { logout } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();

  const toggleSidebar = () => setIsOpen(!isOpen);
  const toggleCollapse = () => setIsCollapsed(!isCollapsed);

  const menuItems = [
    { path: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
    { path: "/user-management", icon: Users, label: "User Management" },
    { path: "/companies", icon: Building2, label: "Companies" },
    { path: "/contracts", icon: FileText, label: "Contracts" },
    { path: "/services", icon: Wrench, label: "Services" },
    { path: "/property-flow", icon: MapPin, label: "Property Flow" },
    { path: "/assets", icon: Package, label: "Assets" },
    { path: "/work-requests", icon: ClipboardList, label: "Work Requests" },
    { path: "/approvals", icon: CheckCircle, label: "Approvals" },
    {
      path: "/technician-availability",
      icon: Calendar,
      label: "Technician Availability",
    },
    { path: "/checklists", icon: CheckSquare, label: "Checklists" },
    { path: "/inventory", icon: Warehouse, label: "Inventory" },
    { path: "/kpi", icon: BarChart2, label: "KPI" },
    { path: "/profile", icon: User, label: "Profile" },
  ];

  const isActivePath = (path) =>
    location.pathname === path || location.pathname.startsWith(path + "/");

  return (
    <>
      {/* Mobile toggle button */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-gray-800 text-white rounded-lg shadow-lg"
        onClick={toggleSidebar}
      >
        {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-screen bg-gradient-to-b from-gray-800 to-gray-900 text-white shadow-2xl transition-all duration-300 overflow-y-auto overflow-x-hidden ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 ${
          isCollapsed ? "md:w-20" : "md:w-64"
        } w-64 z-40 flex flex-col`}
      >
        {/* Header */}
        <div className="p-4 border-b border-gray-700 flex items-center justify-between">
          <div
            className={`flex items-center space-x-3 ${
              isCollapsed ? "md:justify-center" : ""
            }`}
          >
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
              <Menu className="w-5 h-5 text-white" />
            </div>
            {!isCollapsed && (
              <h1 className="text-xl font-semibold text-white md:block">
                CAFM
              </h1>
            )}
          </div>

          {/* Desktop collapse button */}
          <button
            onClick={toggleCollapse}
            className="hidden md:flex p-1.5 rounded-lg hover:bg-gray-700 transition-colors duration-200"
          >
            {isCollapsed ? (
              <ChevronRight className="w-5 h-5 text-gray-300" />
            ) : (
              <ChevronLeft className="w-5 h-5 text-gray-300" />
            )}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-4 overflow-y-auto px-3 custom-scrollbar">
          <ul className="space-y-1">
            {menuItems.map((item) => {
              const IconComponent = item.icon;
              const isActive = isActivePath(item.path);
              return (
                <li key={item.path} className="relative group">
                  <Link
                    to={item.path}
                    className={`flex items-center ${
                      isCollapsed
                        ? "justify-center md:justify-center"
                        : "justify-start"
                    } px-3 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? "bg-blue-600 text-white shadow-lg"
                        : "text-gray-300 hover:bg-gray-700 hover:text-white"
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    <IconComponent className="w-5 h-5 flex-shrink-0" />
                    {!isCollapsed && <span className="ml-3">{item.label}</span>}
                  </Link>

                  {/* Tooltip for collapsed state */}
                  {isCollapsed && (
                    <div className="absolute left-full top-1/2 transform -translate-y-1/2 ml-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-50 hidden md:block">
                      {item.label}
                      <div className="absolute top-1/2 left-0 transform -translate-y-1/2 -translate-x-1 w-2 h-2 bg-gray-900 rotate-45"></div>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Bottom logout section */}
        <div className="border-t border-gray-700 p-3 space-y-1">
          <div className="relative group">
            <button
              type="button"
              onClick={() => {
                logout();
                setIsOpen(false);
              }}
              className={`flex items-center ${
                isCollapsed
                  ? "justify-center md:justify-center"
                  : "justify-start"
              } w-full px-3 py-3 text-sm font-medium bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all duration-200`}
            >
              <LogOut className="w-5 h-5 flex-shrink-0" />
              {!isCollapsed && <span className="ml-3">Logout</span>}
            </button>

            {/* Tooltip for collapsed state */}
            {isCollapsed && (
              <div className="absolute left-full top-1/2 transform -translate-y-1/2 ml-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-50 hidden md:block">
                Logout
                <div className="absolute top-1/2 left-0 transform -translate-y-1/2 -translate-x-1 w-2 h-2 bg-gray-900 rotate-45"></div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 md:hidden z-30"
          onClick={toggleSidebar}
        ></div>
      )}
    </>
  );
};

export default Sidebar;
