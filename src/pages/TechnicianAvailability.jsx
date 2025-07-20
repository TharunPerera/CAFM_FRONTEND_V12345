"use client";

import { useState, useEffect } from "react";
import { Save, Calendar, Clock, User, RefreshCw } from "lucide-react";
import { technicianAvailabilityService } from "../services/technicianAvailabilityService";
import { userService } from "../services/userService";
import { toast } from "react-toastify";

const TechnicianAvailability = () => {
  const [formData, setFormData] = useState({
    technicianId: "",
    date: "",
    startTime: "",
    endTime: "",
    status: "AVAILABLE",
    workOrderId: null,
  });
  const [loading, setLoading] = useState(false);
  const [technicians, setTechnicians] = useState([]);
  const [loadingTechnicians, setLoadingTechnicians] = useState(true);
  const [availabilityHistory, setAvailabilityHistory] = useState([]);
  const [loadingHistory, setLoadingHistory] = useState(false);

  const statusOptions = [
    { value: "AVAILABLE", label: "Available", color: "text-green-600" },
    { value: "BUSY", label: "Busy", color: "text-red-600" },
  ];

  useEffect(() => {
    loadTechnicians();
    // Set default date to today
    setFormData((prev) => ({
      ...prev,
      date: new Date().toISOString().split("T")[0],
    }));
  }, []);

  useEffect(() => {
    if (formData.technicianId && formData.date) {
      loadAvailabilityHistory();
    }
  }, [formData.technicianId, formData.date]);

  const loadTechnicians = async () => {
    setLoadingTechnicians(true);
    try {
      // Assuming you have a service to get technicians
      // You might need to create this endpoint or use existing user service
      const response = await userService.getAllUsers(); // Adjust this based on your API
      const technicianUsers = response.data.filter(
        (user) => user.role === "Technician"
      ); // Adjust based on your data structure
      setTechnicians(technicianUsers || []);
    } catch (error) {
      console.error("Error loading technicians:", error);
      toast.error("Failed to load technicians");
    } finally {
      setLoadingTechnicians(false);
    }
  };

  const loadAvailabilityHistory = async () => {
    if (!formData.technicianId || !formData.date) return;

    setLoadingHistory(true);
    try {
      const response =
        await technicianAvailabilityService.getAvailabilityByTechnician(
          formData.technicianId,
          formData.date
        );
      setAvailabilityHistory(response.data || []);
    } catch (error) {
      console.error("Error loading availability history:", error);
      setAvailabilityHistory([]);
    } finally {
      setLoadingHistory(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.technicianId ||
      !formData.date ||
      !formData.startTime ||
      !formData.endTime
    ) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (formData.startTime >= formData.endTime) {
      toast.error("End time must be after start time");
      return;
    }

    setLoading(true);
    try {
      const submitData = {
        ...formData,
        workOrderId: formData.workOrderId || null,
      };

      await technicianAvailabilityService.markAvailability(submitData);
      toast.success("Availability marked successfully");

      // Reset form
      setFormData({
        technicianId: "",
        date: new Date().toISOString().split("T")[0],
        startTime: "",
        endTime: "",
        status: "AVAILABLE",
        workOrderId: null,
      });

      // Reload history if same technician and date
      if (formData.technicianId && formData.date) {
        await loadAvailabilityHistory();
      }
    } catch (error) {
      console.error("Error marking availability:", error);
      toast.error(
        error.response?.data?.message || "Failed to mark availability"
      );
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      AVAILABLE: {
        bg: "bg-green-100",
        text: "text-green-800",
        label: "Available",
      },
      BUSY: { bg: "bg-red-100", text: "text-red-800", label: "Busy" },
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="text-center">
            <div className="inline-flex p-3 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 shadow-md mb-4">
              <Calendar className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Technician Availability
            </h1>
            <p className="text-gray-600">
              Mark your availability for work assignments
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Availability Form */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
              <Clock className="w-6 h-6 mr-2 text-blue-600" />
              Mark Availability
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Technician Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Technician <span className="text-red-500">*</span>
                </label>
                <select
                  name="technicianId"
                  value={formData.technicianId}
                  onChange={handleInputChange}
                  disabled={loadingTechnicians}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
                  required
                >
                  <option value="">
                    {loadingTechnicians
                      ? "Loading technicians..."
                      : "Select Technician"}
                  </option>
                  {technicians.map((technician) => (
                    <option
                      key={technician.internalUserId}
                      value={technician.internalUserId}
                    >
                      {technician.username} - {technician.firstName}{" "}
                      {technician.lastName}
                    </option>
                  ))}
                </select>
              </div>

              {/* Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                {/* Start Time */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Start Time <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="time"
                    name="startTime"
                    value={formData.startTime}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>

                {/* End Time */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    End Time <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="time"
                    name="endTime"
                    value={formData.endTime}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
              </div>

              {/* Status */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Status <span className="text-red-500">*</span>
                </label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  {statusOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Work Order ID (Optional) */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Work Order ID (Optional)
                </label>
                <input
                  type="number"
                  name="workOrderId"
                  value={formData.workOrderId || ""}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter work order ID if applicable"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 disabled:opacity-50 transition-all shadow-lg hover:shadow-xl"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Marking Availability...
                  </>
                ) : (
                  <>
                    <Save className="w-5 h-5 mr-2" />
                    Mark Availability
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Availability History */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900 flex items-center">
                <User className="w-6 h-6 mr-2 text-blue-600" />
                Availability History
              </h2>
              <button
                onClick={loadAvailabilityHistory}
                disabled={
                  loadingHistory || !formData.technicianId || !formData.date
                }
                className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50"
                title="Refresh History"
              >
                <RefreshCw
                  className={`w-5 h-5 text-gray-600 ${
                    loadingHistory ? "animate-spin" : ""
                  }`}
                />
              </button>
            </div>

            {!formData.technicianId || !formData.date ? (
              <div className="text-center py-8 text-gray-500">
                <Calendar className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                <p>Select a technician and date to view availability history</p>
              </div>
            ) : loadingHistory ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                <p className="text-gray-600 mt-2">
                  Loading availability history...
                </p>
              </div>
            ) : availabilityHistory.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <Clock className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                <p>No availability records found for selected date</p>
              </div>
            ) : (
              <div className="space-y-4">
                {availabilityHistory.map((record, index) => (
                  <div
                    key={index}
                    className="border border-gray-200 rounded-lg p-4"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-2 text-gray-400" />
                        <span className="font-medium text-gray-900">
                          {record.startTime} - {record.endTime}
                        </span>
                      </div>
                      {getStatusBadge(record.status)}
                    </div>
                    {record.workOrderId && (
                      <div className="text-sm text-gray-600">
                        Work Order: #{record.workOrderId}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TechnicianAvailability;
