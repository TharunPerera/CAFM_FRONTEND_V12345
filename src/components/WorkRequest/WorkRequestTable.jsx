"use client";

import { useState, useEffect } from "react";
import {
  ArrowLeft,
  FileText,
  RefreshCw,
  Search,
  Calendar,
  AlertCircle,
} from "lucide-react";
import { workRequestService } from "../../services/WorkRequestService";
import { toast } from "react-toastify";

const WorkRequestTable = ({ onBack }) => {
  const [workRequests, setWorkRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    loadWorkRequests();
  }, []);

  const loadWorkRequests = async () => {
    setLoading(true);
    try {
      const response = await workRequestService.getAllWorkRequests();
      setWorkRequests(response.data || []);
    } catch (error) {
      console.error("Error loading work requests:", error);
      toast.error("Failed to load work requests");
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      await loadWorkRequests();
      toast.success("Work requests refreshed successfully");
    } finally {
      setTimeout(() => setIsRefreshing(false), 500);
    }
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      PENDING: {
        bg: "bg-yellow-100",
        text: "text-yellow-800",
        label: "Pending",
      },
      APPROVED: {
        bg: "bg-green-100",
        text: "text-green-800",
        label: "Approved",
      },
      REJECTED: { bg: "bg-red-100", text: "text-red-800", label: "Rejected" },
    };

    const config = statusConfig[status] || {
      bg: "bg-gray-100",
      text: "text-gray-800",
      label: status,
    };

    return (
      <span
        className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${config.bg} ${config.text}`}
      >
        {config.label}
      </span>
    );
  };

  const getPriorityBadge = (priority) => {
    const priorityConfig = {
      RM_P1: { bg: "bg-red-100", text: "text-red-800", label: "RM P1" },
      RM_P2: { bg: "bg-yellow-100", text: "text-yellow-800", label: "RM P2" },
      RM_P3: { bg: "bg-green-100", text: "text-green-800", label: "RM P3" },
      CM_P1: { bg: "bg-red-100", text: "text-red-800", label: "CM P1" },
      CM_P2: { bg: "bg-yellow-100", text: "text-yellow-800", label: "CM P2" },
      CM_P3: { bg: "bg-green-100", text: "text-green-800", label: "CM P3" },
      PM_P4: { bg: "bg-blue-100", text: "text-blue-800", label: "PM P4" },
    };

    const config = priorityConfig[priority] || {
      bg: "bg-gray-100",
      text: "text-gray-800",
      label: priority,
    };

    return (
      <span
        className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${config.bg} ${config.text}`}
      >
        {config.label}
      </span>
    );
  };

  // Filter work requests based on search term
  const filteredWorkRequests = workRequests.filter(
    (request) =>
      request.workRequestId.toString().includes(searchTerm) ||
      request.assetName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (request.reasonComment &&
        request.reasonComment
          .toLowerCase()
          .includes(searchTerm.toLowerCase())) ||
      request.priority.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex p-3 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 shadow-md mb-4">
          <FileText className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          All Work Requests
        </h2>
        <p className="text-gray-600">
          View and manage all work requests in the system
        </p>
      </div>

      {/* Search and Actions */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search by ID, asset name, comment, priority, or status..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <button
          onClick={handleRefresh}
          disabled={isRefreshing}
          className="px-4 py-3 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          title="Refresh"
        >
          <RefreshCw
            className={`w-5 h-5 text-gray-600 ${
              isRefreshing ? "animate-spin" : ""
            }`}
          />
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Work Request ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Asset Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Reason/Comment
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Priority
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Created At
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {loading ? (
                <tr>
                  <td colSpan="6" className="px-6 py-12 text-center">
                    <div className="flex justify-center items-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                      <span className="ml-3 text-lg font-medium text-gray-700">
                        Loading work requests...
                      </span>
                    </div>
                  </td>
                </tr>
              ) : filteredWorkRequests.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-6 py-12 text-center">
                    <div className="text-gray-500">
                      <AlertCircle className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                      <p className="text-lg font-medium">
                        No work requests found
                      </p>
                      <p className="text-sm">
                        {searchTerm
                          ? "Try adjusting your search criteria"
                          : "No work requests have been created yet"}
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredWorkRequests.map((request, index) => (
                  <tr
                    key={request.workRequestId}
                    className={`hover:bg-gray-50 ${
                      index % 2 === 0 ? "bg-white" : "bg-gray-50"
                    }`}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        #{request.workRequestId}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {request.assetName}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900 max-w-xs truncate">
                        {request.reasonComment || "-"}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getPriorityBadge(request.priority)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(request.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 flex items-center">
                        <Calendar className="w-4 h-4 mr-1 text-gray-400" />
                        {request.createdAt
                          ? new Date(request.createdAt).toLocaleDateString()
                          : "-"}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        {!loading && filteredWorkRequests.length > 0 && (
          <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
            <div className="text-sm text-gray-700">
              Showing{" "}
              <span className="font-medium">{filteredWorkRequests.length}</span>{" "}
              of <span className="font-medium">{workRequests.length}</span> work
              requests
            </div>
          </div>
        )}
      </div>

      {/* Back Button */}
      <div className="mt-8 text-center">
        <button
          onClick={onBack}
          className="inline-flex items-center px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors shadow-lg hover:shadow-xl"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Work Requests
        </button>
      </div>
    </div>
  );
};

export default WorkRequestTable;
