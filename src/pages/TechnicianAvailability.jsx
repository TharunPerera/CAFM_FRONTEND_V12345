"use client";
import { useState, useEffect } from "react";
import {
  Search,
  RefreshCw,
  User,
  Filter,
  Users,
  Clock,
  ChevronLeft,
  ChevronRight,
  MessageSquare,
  Eye,
  Wrench,
} from "lucide-react";
import { technicianService } from "../services/TechnicianService";
import { toast } from "react-toastify";

const TechnicianAvailability = () => {
  const [technicians, setTechnicians] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [skillFilter, setSkillFilter] = useState("");
  const [sortBy, setSortBy] = useState("all");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [showAvailabilityModal, setShowAvailabilityModal] = useState(false);
  const [showSkillsModal, setShowSkillsModal] = useState(false);
  const [showViewSkillsModal, setShowViewSkillsModal] = useState(false);
  const [selectedTechnician, setSelectedTechnician] = useState(null);
  const [availabilityStatus, setAvailabilityStatus] = useState("");
  const [notAvailableReason, setNotAvailableReason] = useState("");
  const [updatingAvailability, setUpdatingAvailability] = useState(false);
  const [showReasonPopup, setShowReasonPopup] = useState(false);
  const [selectedReason, setSelectedReason] = useState("");
  const [technicianSkills, setTechnicianSkills] = useState([]);
  const [newSkill, setNewSkill] = useState("");
  const [skillsToRemove, setSkillsToRemove] = useState([]);
  const [updatingSkills, setUpdatingSkills] = useState(false);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);

  const statusOptions = [
    { value: "", label: "All Status" },
    { value: "AVAILABLE", label: "Available", color: "text-green-600" },
    { value: "NOT_AVAILABLE", label: "Not Available", color: "text-red-600" },
    { value: "BUSY", label: "Busy", color: "text-yellow-600" },
  ];

  const sortOptions = [
    { value: "all", label: "All Technicians" },
    { value: "least-assigned", label: "Least Assigned First" },
  ];

  const truncateReason = (reason, maxLength = 30) => {
    if (!reason) return "-";
    if (reason.length <= maxLength) return reason;
    return reason.substring(0, maxLength) + "...";
  };

  useEffect(() => {
    loadTechnicians();
  }, [currentPage, statusFilter, skillFilter, sortBy]);

  const loadTechnicians = async () => {
    setLoading(true);
    try {
      let response;
      if (sortBy === "least-assigned") {
        response = await technicianService.getTechniciansByLeastAssigned();
        const data = response.data || [];
        setTechnicians(data);
        setTotalElements(data.length);
        setTotalPages(Math.ceil(data.length / pageSize));
      } else if (skillFilter) {
        response = await technicianService.getTechniciansBySingleSkill(
          { skill: skillFilter.trim() },
          currentPage,
          pageSize
        );
        const pageData = response.data;
        setTechnicians(pageData.content || []);
        setTotalElements(pageData.totalElements || 0);
        setTotalPages(pageData.totalPages || 0);
      } else {
        response = await technicianService.getAllTechnicians(
          currentPage,
          pageSize,
          statusFilter || null
        );
        const pageData = response.data;
        setTechnicians(pageData.content || []);
        setTotalElements(pageData.totalElements || 0);
        setTotalPages(pageData.totalPages || 0);
      }
    } catch (error) {
      console.error("Error loading technicians:", error);
      toast.error("Failed to load technicians");
      setTechnicians([]);
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      await loadTechnicians();
      toast.success("Technicians list refreshed successfully");
    } finally {
      setTimeout(() => setIsRefreshing(false), 500);
    }
  };

  const handleOpenAvailabilityModal = (technician) => {
    setSelectedTechnician(technician);
    setAvailabilityStatus(technician.availabilityStatus || "AVAILABLE");
    setNotAvailableReason(technician.notAvailableReason || "");
    setShowAvailabilityModal(true);
  };

  const handleOpenSkillsModal = async (technician) => {
    setSelectedTechnician(technician);
    try {
      const response = await technicianService.getTechnicianSkills(
        technician.technicianId
      );
      setTechnicianSkills(response.data || []);
      setShowSkillsModal(true);
    } catch (error) {
      console.error("Error loading technician skills:", error);
      toast.error("Failed to load technician skills");
    }
  };

  const handleViewSkills = async (technician) => {
    setSelectedTechnician(technician);
    try {
      const response = await technicianService.getTechnicianSkills(
        technician.technicianId
      );
      setTechnicianSkills(response.data || []);
      setShowViewSkillsModal(true);
    } catch (error) {
      console.error("Error loading technician skills:", error);
      toast.error("Failed to load technician skills");
    }
  };

  const handleAvailabilityUpdate = async () => {
    if (!availabilityStatus) {
      toast.error("Please select an availability status");
      return;
    }
    if (availabilityStatus === "NOT_AVAILABLE" && !notAvailableReason.trim()) {
      toast.error(
        "Please provide a reason for setting technician as not available"
      );
      return;
    }
    setUpdatingAvailability(true);
    try {
      await technicianService.updateAvailability(
        selectedTechnician.technicianId,
        {
          availabilityStatus,
          notAvailableReason:
            availabilityStatus === "NOT_AVAILABLE" ? notAvailableReason : null,
        }
      );
      toast.success("Technician availability updated successfully");
      setShowAvailabilityModal(false);
      setSelectedTechnician(null);
      setAvailabilityStatus("");
      setNotAvailableReason("");
      await loadTechnicians();
    } catch (error) {
      console.error("Error updating technician availability:", error);
      toast.error(
        error.response?.data?.message ||
          "Failed to update technician availability"
      );
    } finally {
      setUpdatingAvailability(false);
    }
  };

  const handleSkillsUpdate = async () => {
    if (!newSkill && skillsToRemove.length === 0) {
      toast.error("Please add a skill or select skills to remove");
      return;
    }
    setUpdatingSkills(true);
    try {
      const skillData = {
        technicianId: selectedTechnician.technicianId,
        skillsToAdd: newSkill ? [newSkill] : [],
        skillsToRemove,
      };
      await technicianService.updateSkills(
        selectedTechnician.technicianId,
        skillData
      );
      toast.success("Technician skills updated successfully");
      setShowSkillsModal(false);
      setSelectedTechnician(null);
      setNewSkill("");
      setSkillsToRemove([]);
      setTechnicianSkills([]);
      await loadTechnicians();
    } catch (error) {
      console.error("Error updating technician skills:", error);
      toast.error(
        error.response?.data?.message || "Failed to update technician skills"
      );
    } finally {
      setUpdatingSkills(false);
    }
  };

  const handleOpenReasonPopup = (reason) => {
    setSelectedReason(reason);
    setShowReasonPopup(true);
  };

  const handleCloseReasonPopup = () => {
    setShowReasonPopup(false);
    setSelectedReason("");
  };

  const toggleSkillToRemove = (skill) => {
    setSkillsToRemove((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]
    );
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      AVAILABLE: {
        bg: "bg-green-100",
        text: "text-green-800",
        label: "Available",
      },
      NOT_AVAILABLE: {
        bg: "bg-red-100",
        text: "text-red-800",
        label: "Not Available",
      },
      BUSY: { bg: "bg-yellow-100", text: "text-yellow-800", label: "Busy" },
    };
    const config = statusConfig[status] || {
      bg: "bg-gray-100",
      text: "text-gray-800",
      label: status || "Unknown",
    };
    return (
      <span
        className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${config.bg} ${config.text}`}
      >
        {config.label}
      </span>
    );
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 0 && newPage < totalPages) {
      setCurrentPage(newPage);
    }
  };

  const handleFilterChange = (filterType, value) => {
    if (filterType === "status") {
      setStatusFilter(value);
    } else if (filterType === "sort") {
      setSortBy(value);
    } else if (filterType === "skill") {
      setSkillFilter(value);
    }
    setCurrentPage(0);
  };

  const filteredTechnicians = technicians.filter((technician) => {
    if (!searchTerm) return true;
    const searchLower = searchTerm.toLowerCase();
    return (
      technician.username?.toLowerCase().includes(searchLower) ||
      technician.firstName?.toLowerCase().includes(searchLower) ||
      technician.lastName?.toLowerCase().includes(searchLower)
    );
  });

  const paginatedTechnicians =
    sortBy === "least-assigned"
      ? filteredTechnicians.slice(
          currentPage * pageSize,
          (currentPage + 1) * pageSize
        )
      : filteredTechnicians;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="text-center">
            <div className="inline-flex p-3 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 shadow-md mb-4">
              <Users className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Technician Availability Management
            </h1>
            <p className="text-gray-600">
              Manage technician availability status, skills, and assignments
            </p>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search technicians..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <select
                value={statusFilter}
                onChange={(e) => handleFilterChange("status", e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none"
              >
                {statusOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="relative">
              <Wrench className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by skill (e.g., HVAC)..."
                value={skillFilter}
                onChange={(e) => handleFilterChange("skill", e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="relative">
              <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <select
                value={sortBy}
                onChange={(e) => handleFilterChange("sort", e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none"
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            <button
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center justify-center"
            >
              <RefreshCw
                className={`w-5 h-5 mr-2 ${isRefreshing ? "animate-spin" : ""}`}
              />
              Refresh
            </button>
          </div>
        </div>

        {/* Technicians Table */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900">
                Technicians List
              </h2>
              <div className="text-sm text-gray-600">
                Showing {paginatedTechnicians.length} of {totalElements}{" "}
                technicians
              </div>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    User ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Username
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Full Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Not Available Reason
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Assigned Work Orders
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {loading ? (
                  <tr>
                    <td colSpan="7" className="px-6 py-12 text-center">
                      <div className="flex justify-center items-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                        <span className="ml-3 text-lg font-medium text-gray-700">
                          Loading technicians...
                        </span>
                      </div>
                    </td>
                  </tr>
                ) : paginatedTechnicians.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="px-6 py-12 text-center">
                      <div className="text-gray-500">
                        <User className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                        <p className="text-lg font-medium">
                          No technicians found
                        </p>
                        <p className="text-sm">
                          {searchTerm || statusFilter || skillFilter
                            ? "Try adjusting your search criteria"
                            : "No technicians available"}
                        </p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  paginatedTechnicians.map((technician, index) => (
                    <tr
                      key={technician.technicianId}
                      className={`hover:bg-gray-50 ${
                        index % 2 === 0 ? "bg-white" : "bg-gray-50"
                      }`}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {technician.userId}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {technician.username}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                              <User className="h-6 w-6 text-blue-600" />
                            </div>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {technician.firstName} {technician.lastName}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {getStatusBadge(
                          technician.availabilityStatus || "AVAILABLE"
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-2">
                          <div className="text-sm text-gray-900 max-w-xs truncate">
                            {truncateReason(technician.notAvailableReason)}
                          </div>
                          {technician.notAvailableReason &&
                            technician.availabilityStatus === "NOT_AVAILABLE" &&
                            technician.notAvailableReason.length > 30 && (
                              <button
                                onClick={() =>
                                  handleOpenReasonPopup(
                                    technician.notAvailableReason
                                  )
                                }
                                className="text-blue-600 hover:text-blue-800"
                                title="View Full Reason"
                              >
                                <Eye className="w-5 h-5" />
                              </button>
                            )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {technician.assignedWorkOrderCount || 0}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex space-x-2">
                          <button
                            onClick={() =>
                              handleOpenAvailabilityModal(technician)
                            }
                            className="px-3 py-1 text-sm text-blue-600 hover:text-blue-900 hover:bg-blue-100 rounded-lg transition-all flex items-center"
                            title="Update Availability"
                          >
                            <MessageSquare className="w-5 h-5 mr-2" />
                            Update Availability
                          </button>
                          <button
                            onClick={() => handleOpenSkillsModal(technician)}
                            className="px-3 py-1 text-sm text-green-600 hover:text-green-900 hover:bg-green-100 rounded-lg transition-all flex items-center"
                            title="Manage Skills"
                          >
                            <Wrench className="w-5 h-5 mr-2" />
                            Manage Skills
                          </button>
                          <button
                            onClick={() => handleViewSkills(technician)}
                            className="px-3 py-1 text-sm text-purple-600 hover:text-purple-900 hover:bg-purple-100 rounded-lg transition-all flex items-center"
                            title="View Skills"
                          >
                            <Eye className="w-5 h-5 mr-2" />
                            View Skills
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          <div className="bg-gray-50 px-6 py-4 flex items-center justify-between border-t border-gray-200">
            <div className="text-sm text-gray-700">
              Showing{" "}
              <span className="font-medium">{paginatedTechnicians.length}</span>{" "}
              of{" "}
              <span className="font-medium">{filteredTechnicians.length}</span>{" "}
              technicians
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 0}
                className="p-2 border-2 border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 transition-all"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <span className="px-4 py-2 text-sm font-medium">
                Page {currentPage + 1} of {Math.max(1, totalPages)}
              </span>
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage >= totalPages - 1}
                className="p-2 border-2 border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 transition-all"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Technician Availability Modal */}
        {showAvailabilityModal && selectedTechnician && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-2xl shadow-2xl max-w-md w-full mx-4">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-gray-900">
                  Update Technician Availability
                </h3>
                <button
                  onClick={() => {
                    setShowAvailabilityModal(false);
                    setSelectedTechnician(null);
                    setAvailabilityStatus("");
                    setNotAvailableReason("");
                  }}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                >
                  ×
                </button>
              </div>
              <div className="mb-4">
                <p className="text-sm text-gray-600">
                  <strong>Technician ID:</strong>{" "}
                  {selectedTechnician.technicianId}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Name:</strong> {selectedTechnician.firstName}{" "}
                  {selectedTechnician.lastName}
                </p>
              </div>
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Availability Status <span className="text-red-500">*</span>
                </label>
                <select
                  value={availabilityStatus}
                  onChange={(e) => setAvailabilityStatus(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select Status</option>
                  <option value="AVAILABLE">Available</option>
                  <option value="NOT_AVAILABLE">Not Available</option>
                </select>
              </div>
              {availabilityStatus === "NOT_AVAILABLE" && (
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Reason for Not Available{" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    value={notAvailableReason}
                    onChange={(e) => setNotAvailableReason(e.target.value)}
                    placeholder="Please provide a reason why the technician is not available..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-blue-500 resize-none"
                    rows={4}
                  />
                </div>
              )}
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setShowAvailabilityModal(false);
                    setSelectedTechnician(null);
                    setAvailabilityStatus("");
                    setNotAvailableReason("");
                  }}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAvailabilityUpdate}
                  disabled={updatingAvailability || !availabilityStatus}
                  className="flex-1 inline-flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
                >
                  {updatingAvailability ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Updating...
                    </>
                  ) : (
                    <>
                      <MessageSquare className="w-4 h-4 mr-2" />
                      Update Availability
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Technician Skills Management Modal */}
        {showSkillsModal && selectedTechnician && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-2xl shadow-2xl max-w-md w-full mx-4">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-gray-900">
                  Manage Technician Skills
                </h3>
                <button
                  onClick={() => {
                    setShowSkillsModal(false);
                    setSelectedTechnician(null);
                    setTechnicianSkills([]);
                    setNewSkill("");
                    setSkillsToRemove([]);
                  }}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                >
                  ×
                </button>
              </div>
              <div className="mb-4">
                <p className="text-sm text-gray-600">
                  <strong>Technician ID:</strong>{" "}
                  {selectedTechnician.technicianId}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Name:</strong> {selectedTechnician.firstName}{" "}
                  {selectedTechnician.lastName}
                </p>
              </div>
              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-700 mb-2">
                  Current Skills
                </h4>
                {technicianSkills.length === 0 ? (
                  <p className="text-sm text-gray-500">No skills assigned</p>
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {technicianSkills.map((skill) => (
                      <div
                        key={skill}
                        className={`px-3 py-1 text-sm rounded-full flex items-center ${
                          skillsToRemove.includes(skill)
                            ? "bg-red-100 text-red-800"
                            : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        {skill}
                        <button
                          onClick={() => toggleSkillToRemove(skill)}
                          className="ml-2 text-xs"
                          title={
                            skillsToRemove.includes(skill)
                              ? "Undo Remove"
                              : "Remove Skill"
                          }
                        >
                          {skillsToRemove.includes(skill) ? "↺" : "×"}
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Add New Skill
                </label>
                <input
                  type="text"
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  placeholder="Enter new skill..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setShowSkillsModal(false);
                    setSelectedTechnician(null);
                    setTechnicianSkills([]);
                    setNewSkill("");
                    setSkillsToRemove([]);
                  }}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSkillsUpdate}
                  disabled={
                    updatingSkills || (!newSkill && skillsToRemove.length === 0)
                  }
                  className="flex-1 inline-flex items-center justify-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 transition-colors"
                >
                  {updatingSkills ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Updating...
                    </>
                  ) : (
                    <>
                      <Wrench className="w-4 h-4 mr-2" />
                      Update Skills
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* View Skills Modal */}
        {showViewSkillsModal && selectedTechnician && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-2xl shadow-2xl max-w-md w-full mx-4">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-gray-900">
                  Technician Skills
                </h3>
                <button
                  onClick={() => {
                    setShowViewSkillsModal(false);
                    setSelectedTechnician(null);
                    setTechnicianSkills([]);
                  }}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                >
                  ×
                </button>
              </div>
              <div className="mb-4">
                <p className="text-sm text-gray-600">
                  <strong>Technician ID:</strong>{" "}
                  {selectedTechnician.technicianId}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Name:</strong> {selectedTechnician.firstName}{" "}
                  {selectedTechnician.lastName}
                </p>
              </div>
              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-700 mb-2">
                  Skills
                </h4>
                {technicianSkills.length === 0 ? (
                  <p className="text-sm text-gray-500">No skills assigned</p>
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {technicianSkills.map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1 text-sm rounded-full bg-blue-100 text-blue-800"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              <div className="flex justify-end">
                <button
                  onClick={() => {
                    setShowViewSkillsModal(false);
                    setSelectedTechnician(null);
                    setTechnicianSkills([]);
                  }}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Reason Popup Modal */}
        {showReasonPopup && (
          <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
            <div className="bg-white p-4 rounded-lg shadow-lg max-w-sm w-full mx-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Not Available Reason
                </h3>
                <button
                  onClick={handleCloseReasonPopup}
                  className="text-gray-500 hover:text-gray-700 text-xl"
                >
                  ×
                </button>
              </div>
              <p className="text-sm text-gray-700 whitespace-pre-wrap">
                {selectedReason}
              </p>
              <div className="mt-4">
                <button
                  onClick={handleCloseReasonPopup}
                  className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TechnicianAvailability;
