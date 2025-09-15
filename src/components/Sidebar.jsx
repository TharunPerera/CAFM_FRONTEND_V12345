"use client";

import { useState, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { createPortal } from "react-dom";
import { AuthContext } from "../context/AuthContext";
import { useSidebar } from "../context/SidebarContext";
import {
  Menu,
  X,
  LayoutDashboard,
  Users,
  Building2,
  FileText,
  MapPin,
  Package,
  LogOut,
  User,
  Warehouse,
  CheckSquare,
  BarChart2,
  ClipboardList,
  CheckCircle,
  Clock,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Wrench,
  Key,
} from "lucide-react";

const Sidebar = () => {
  const { user, logout } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const [tooltip, setTooltip] = useState({
    visible: false,
    label: "",
    top: 0,
    left: 0,
  });
  const location = useLocation();
  const { isCollapsed, setIsCollapsed } = useSidebar();

  const toggleSidebar = () => setIsOpen(!isOpen);
  const toggleCollapse = () => setIsCollapsed(!isCollapsed);

  const menuItems = [
    {
      path: "/dashboard",
      icon: LayoutDashboard,
      label: "Dashboard",
      permission: null,
    },
    {
      path: "/user-management",
      icon: Users,
      label: "User Management",
      permission: "view_user",
    },
    { path: "/profile", icon: User, label: "Profile", permission: null },
    {
      path: "/companies",
      icon: Building2,
      label: "Companies",
      permission: "view_company",
    },
    {
      path: "/contracts",
      icon: FileText,
      label: "Contracts",
      permission: "view_contract",
    },
    {
      path: "/property-flow",
      icon: MapPin,
      label: "Property Flow",
      permission: "view_property_flow",
    },
    {
      path: "/assets",
      icon: Package,
      label: "Assets",
      permission: "view_asset",
    },
    {
      path: "/work-requests",
      icon: ClipboardList,
      label: "Work Requests",
      permission: "view_work_request",
    },
    {
      path: "/services",
      icon: Wrench,
      label: "Services",
      permission: "create_service",
    },
    {
      path: "/work-orders",
      icon: FileText,
      label: "Work Orders",
      permission: "view_work_order",
    },
    {
      path: "/approvals",
      icon: CheckCircle,
      label: "Approvals",
      permission: "review_work_request",
    },
    {
      path: "/technician-availability",
      icon: Clock,
      label: "Technician Availability",
      permission: "view_technician_availability",
    },
    {
      path: "/calendar-management",
      icon: Calendar,
      label: "PM Schedule Calendar",
      permission: "create_pm_schedule",
    },
    {
      path: "/checklists",
      icon: CheckSquare,
      label: "Checklists",
      permission: "view_checklist",
    },
    {
      path: "/inventory",
      icon: Warehouse,
      label: "Inventory",
      permission: "view_inventory",
    },
    { path: "/kpi", icon: BarChart2, label: "KPI", permission: "view_kpi" },
    {
      path: "/permissionManagement",
      icon: Key,
      label: "Permission Management",
      permission: "view_permission",
    },
  ].filter(
    (item) => !item.permission || user?.permissions.includes(item.permission)
  );

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
                      isCollapsed ? "justify-center" : "justify-start"
                    } px-3 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? "bg-blue-600 text-white shadow-lg"
                        : "text-gray-300 hover:bg-gray-700 hover:text-white"
                    }`}
                    onClick={() => setIsOpen(false)}
                    onMouseEnter={(e) => {
                      if (isCollapsed) {
                        const rect = e.currentTarget.getBoundingClientRect();
                        setTooltip({
                          visible: true,
                          label: item.label,
                          top: rect.top + rect.height / 2,
                          left: rect.right + 8,
                        });
                      }
                    }}
                    onMouseLeave={() =>
                      setTooltip({ ...tooltip, visible: false })
                    }
                  >
                    <IconComponent className="w-5 h-5 flex-shrink-0" />
                    {!isCollapsed && <span className="ml-3">{item.label}</span>}
                  </Link>
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
                isCollapsed ? "justify-center" : "justify-start"
              } w-full px-3 py-3 text-sm font-medium bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all duration-200`}
            >
              <LogOut className="w-5 h-5 flex-shrink-0" />
              {!isCollapsed && <span className="ml-3">Logout</span>}
            </button>
          </div>
        </div>
      </div>

      {/* Tooltip rendered via Portal */}
      {tooltip.visible &&
        createPortal(
          <div
            className="px-3 py-2 bg-gray-900/95 text-white text-sm rounded-xl shadow-xl transition-all duration-200 z-50 pointer-events-none"
            style={{
              position: "fixed",
              top: tooltip.top,
              left: tooltip.left,
              transform: "translateY(-50%)",
              whiteSpace: "nowrap",
            }}
          >
            {tooltip.label}
            <div className="absolute top-1/2 left-0 transform -translate-y-1/2 -translate-x-2 w-3 h-3 bg-gray-900 rotate-45"></div>
          </div>,
          document.body
        )}

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
