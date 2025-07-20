"use client";

import { useState, useEffect } from "react";
import {
  Search,
  RefreshCw,
  Package,
  Calendar,
  User,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { approvalService } from "../../services/ApprovalService";
import { toast } from "react-toastify";

const SparePartsApproval = ({ onBack }) => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [reviewingId, setReviewingId] = useState(null);
  const [reviewModal, setReviewModal] = useState({
    show: false,
    request: null,
    status: "",
    comment: "",
  });

  useEffect(() => {
    loadSparePartsRequests();
  }, []);

  const loadSparePartsRequests = async () => {
    setLoading(true);
    try {
      const response = await approvalService.getAllSparePartsRequests();
      setRequests(response.data || []);
    } catch (error) {
      console.error("Error loading spare parts requests:", error);
      toast.error("Failed to load spare parts requests");
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      await loadSparePartsRequests();
      toast.success("Spare parts requests refreshed successfully");
    } finally {
      setTimeout(() => setIsRefreshing(false), 500);
    }
  };

  const openReviewModal = (request, status) => {
    setReviewModal({
      show: true,
      request,
      status,
      comment: "",
    });
  };

  const closeReviewModal = () => {
    setReviewModal({ show: false, request: null, status: "", comment: "" });
  };

  const handleReview = async () => {
    if (!reviewModal.comment.trim()) {
      toast.error("Please provide a review comment");
      return;
    }

    setReviewingId(reviewModal.request.requestId);
    try {
      await approvalService.reviewSparePartsRequest(
        reviewModal.request.requestId,
        reviewModal.status,
        reviewModal.comment
      );
      toast.success(
        `Spare parts request ${reviewModal.status.toLowerCase()} successfully`
      );
      await loadSparePartsRequests();
      closeReviewModal();
    } catch (error) {
      console.error("Error reviewing spare parts request:", error);
      toast.error(error.response?.data?.message || "Failed to review request");
    } finally {
      setReviewingId(null);
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

  // Filter requests based on search term
  const filteredRequests = requests.filter(
    (request) =>
      request.requestId.toString().includes(searchTerm) ||
      request.workOrderId.toString().includes(searchTerm) ||
      request.inventoryItemName
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      request.requestedByUsername
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex p-3 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 shadow-md mb-4">
          <Package className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Spare Parts Request Approval
        </h2>
        <p className="text-gray-600">
          Review and approve spare parts requests from technicians
        </p>
      </div>

      {/* Search and Actions */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search by request ID, work order ID, item name, or technician..."
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
                  Request ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Work Order ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Item Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Quantity
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Requested By
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Requested At
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {loading ? (
                <tr>
                  <td colSpan="8" className="px-6 py-12 text-center">
                    <div className="flex justify-center items-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                      <span className="ml-3 text-lg font-medium text-gray-700">
                        Loading requests...
                      </span>
                    </div>
                  </td>
                </tr>
              ) : filteredRequests.length === 0 ? (
                <tr>
                  <td colSpan="8" className="px-6 py-12 text-center">
                    <div className="text-gray-500">
                      <Package className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                      <p className="text-lg font-medium">
                        No spare parts requests found
                      </p>
                      <p className="text-sm">
                        {searchTerm
                          ? "Try adjusting your search criteria"
                          : "No requests have been submitted yet"}
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredRequests.map((request, index) => (
                  <tr
                    key={request.requestId}
                    className={`hover:bg-gray-50 ${
                      index % 2 === 0 ? "bg-white" : "bg-gray-50"
                    }`}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        #{request.requestId}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        #{request.workOrderId}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {request.inventoryItemName}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {request.requestedQuantity}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <User className="w-4 h-4 mr-2 text-gray-400" />
                        <div className="text-sm text-gray-900">
                          {request.requestedByUsername}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(request.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 flex items-center">
                        <Calendar className="w-4 h-4 mr-1 text-gray-400" />
                        {request.requestedAt
                          ? new Date(request.requestedAt).toLocaleDateString()
                          : "-"}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {request.status === "PENDING" ? (
                        <div className="flex space-x-2">
                          <button
                            onClick={() => openReviewModal(request, "APPROVED")}
                            disabled={reviewingId === request.requestId}
                            className="p-2 text-green-600 hover:text-green-900 hover:bg-green-100 rounded-lg transition-all disabled:opacity-50"
                            title="Approve"
                          >
                            <CheckCircle className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => openReviewModal(request, "REJECTED")}
                            disabled={reviewingId === request.requestId}
                            className="p-2 text-red-600 hover:text-red-900 hover:bg-red-100 rounded-lg transition-all disabled:opacity-50"
                            title="Reject"
                          >
                            <XCircle className="w-5 h-5" />
                          </button>
                        </div>
                      ) : (
                        <span className="text-sm text-gray-500">
                          {request.status === "APPROVED"
                            ? "Approved"
                            : "Rejected"}
                        </span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        {!loading && filteredRequests.length > 0 && (
          <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
            <div className="text-sm text-gray-700">
              Showing{" "}
              <span className="font-medium">{filteredRequests.length}</span> of{" "}
              <span className="font-medium">{requests.length}</span> requests
            </div>
          </div>
        )}
      </div>

      {/* Review Modal */}
      {reviewModal.show && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              {reviewModal.status === "APPROVED" ? "Approve" : "Reject"} Request
            </h3>
            <p className="text-gray-600 mb-4">
              Are you sure you want to {reviewModal.status.toLowerCase()} this
              spare parts request?
            </p>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Review Comment *
              </label>
              <textarea
                value={reviewModal.comment}
                onChange={(e) =>
                  setReviewModal((prev) => ({
                    ...prev,
                    comment: e.target.value,
                  }))
                }
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your review comment..."
              />
            </div>
            <div className="flex gap-3">
              <button
                onClick={closeReviewModal}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleReview}
                disabled={reviewingId === reviewModal.request?.requestId}
                className={`flex-1 px-4 py-2 text-white rounded-lg transition-colors ${
                  reviewModal.status === "APPROVED"
                    ? "bg-green-600 hover:bg-green-700"
                    : "bg-red-600 hover:bg-red-700"
                } disabled:opacity-50`}
              >
                {reviewingId === reviewModal.request?.requestId ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white inline-block mr-2"></div>
                    Processing...
                  </>
                ) : (
                  `${reviewModal.status === "APPROVED" ? "Approve" : "Reject"}`
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SparePartsApproval;
