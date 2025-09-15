"use client";

import { useState, useEffect } from "react";
import {
  BarChart2,
  CheckCircle,
  XCircle,
  Filter,
  RefreshCw,
  Settings,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { kpiService } from "../services/kpiService";
import { toast } from "react-toastify";

const KpiManagement = () => {
  const [kpiRecords, setKpiRecords] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [totalElements, setTotalElements] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [showColumnChooser, setShowColumnChooser] = useState(false);

  const [filters, setFilters] = useState({
    startDate: "",
    endDate: "",
    kpiRecordId: "",
    workOrderId: "",
    overallKpiMet: "",
  });
  const [activeFilters, setActiveFilters] = useState({});

  const [visibleColumns, setVisibleColumns] = useState({
    kpiRecordId: true,
    workOrderId: true,
    createdTime: true,
    startTime: true,
    holdTime: true,
    resumeTime: true,
    finishTime: true,
    responseTimeMinutes: true,
    resolutionTimeMinutes: true,
    actualResponseTimeMinutes: true,
    actualResolutionTimeMinutes: true,
    totalHoldTimeMinutes: true,
    responseTimeNote: true,
    resolutionTimeNote: true,
    holdNote: true,
    responseTimeMet: true,
    resolutionTimeMet: true,
    overallKpiMet: true,
  });

  const columnDefinitions = [
    { key: "kpiRecordId", label: "KPI Record ID", required: true },
    { key: "workOrderId", label: "Work Order ID", required: true },
    { key: "createdTime", label: "Created Time", required: false },
    { key: "startTime", label: "Start Time", required: false },
    { key: "holdTime", label: "Hold Time", required: false },
    { key: "resumeTime", label: "Resume Time", required: false },
    { key: "finishTime", label: "Finish Time", required: false },
    {
      key: "responseTimeMinutes",
      label: "Response Time (Minutes)",
      required: false,
    },
    {
      key: "resolutionTimeMinutes",
      label: "Resolution Time (Minutes)",
      required: false,
    },
    {
      key: "actualResponseTimeMinutes",
      label: "Actual Response Time (Minutes)",
      required: false,
    },
    {
      key: "actualResolutionTimeMinutes",
      label: "Actual Resolution Time (Minutes)",
      required: false,
    },
    {
      key: "totalHoldTimeMinutes",
      label: "Total Hold Time (Minutes)",
      required: false,
    },
    { key: "responseTimeNote", label: "Response Time Note", required: false },
    {
      key: "resolutionTimeNote",
      label: "Resolution Time Note",
      required: false,
    },
    { key: "holdNote", label: "Hold Note", required: false },
    { key: "responseTimeMet", label: "Response Time Met", required: false },
    { key: "resolutionTimeMet", label: "Resolution Time Met", required: false },
    { key: "overallKpiMet", label: "Overall KPI Met", required: false },
  ];

  useEffect(() => {
    loadKpiRecords();
  }, [currentPage, pageSize, activeFilters]);

  const loadKpiRecords = async () => {
    setLoading(true);
    try {
      const response = await kpiService.getFilteredKpiRecords(
        currentPage,
        pageSize,
        activeFilters
      );
      setKpiRecords(response.data.content || []);
      setTotalElements(response.data.totalElements || 0);
      setTotalPages(response.data.totalPages || 0);

      if (response.data.content?.length === 0 && currentPage === 0) {
        toast.info("No KPI records found");
      }
    } catch (error) {
      console.error("Error loading KPI records:", error);
      toast.error(
        error.response?.data?.message || "Failed to load KPI records"
      );
      setKpiRecords([]);
      setTotalElements(0);
      setTotalPages(0);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (key, value) => {
    // Ensure numeric inputs for kpiRecordId and workOrderId
    if (key === "kpiRecordId" || key === "workOrderId") {
      const numericValue = value.replace(/\D/g, ""); // Remove non-digits
      setFilters((prev) => ({ ...prev, [key]: numericValue }));
    } else {
      setFilters((prev) => ({ ...prev, [key]: value }));
    }
  };

  const applyFilters = () => {
    // Validate dates
    if (
      filters.startDate &&
      filters.endDate &&
      new Date(filters.startDate) > new Date(filters.endDate)
    ) {
      toast.error("Start date cannot be after end date");
      return;
    }

    // Create clean filters, ensuring numeric IDs and boolean overallKpiMet
    const cleanFilters = Object.entries(filters).reduce((acc, [key, value]) => {
      if (value && value.toString().trim() !== "") {
        if (key === "kpiRecordId" || key === "workOrderId") {
          const numericValue = parseInt(value, 10);
          if (!isNaN(numericValue)) {
            acc[key] = numericValue;
          }
        } else if (key === "overallKpiMet" && value !== "") {
          acc[key] = value === "true";
        } else {
          acc[key] = value;
        }
      }
      return acc;
    }, {});
    setActiveFilters(cleanFilters);
    setCurrentPage(0);
    setShowFilters(false);
  };

  const clearFilters = () => {
    setFilters({
      startDate: "",
      endDate: "",
      kpiRecordId: "",
      workOrderId: "",
      overallKpiMet: "",
    });
    setActiveFilters({});
    setCurrentPage(0);
    setShowFilters(false);
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      await loadKpiRecords();
      toast.success("KPI records refreshed successfully");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to refresh KPI records"
      );
    } finally {
      setTimeout(() => setIsRefreshing(false), 500);
    }
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handlePageSizeChange = (newSize) => {
    setPageSize(newSize);
    setCurrentPage(0);
  };

  const toggleColumnVisibility = (columnKey) => {
    if (columnDefinitions.find((col) => col.key === columnKey)?.required)
      return;
    setVisibleColumns((prev) => ({
      ...prev,
      [columnKey]: !prev[columnKey],
    }));
  };

  // Format date and time
  const formatDateTime = (dateTime) => {
    if (!dateTime) return "-";
    return new Date(dateTime).toLocaleString();
  };

  // Format minutes with 2 decimal places
  const formatMinutes = (minutes) => {
    if (minutes === null || minutes === undefined) return "-";
    return Number(minutes).toFixed(2);
  };

  // Get status badge
  const getStatusBadge = (met) => {
    if (met === null || met === undefined) return "-";
    return met ? (
      <span className="inline-flex items-center px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
        <CheckCircle className="w-3 h-3 mr-1" />
        Yes
      </span>
    ) : (
      <span className="inline-flex items-center px-2 py-1 text-xs font-medium bg-red-100 text-red-800 rounded-full">
        <XCircle className="w-3 h-3 mr-1" />
        No
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-[1600px] mx-auto p-6">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 mb-6">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-slate-800 rounded-lg shadow-sm">
              <BarChart2 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-900 mb-1">
                KPI Management
              </h1>
              <p className="text-slate-600 text-sm">
                Monitor Key Performance Indicators for all work orders
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4 mb-6">
          <div className="flex flex-col gap-4">
            {/* Top Row - Controls */}
            <div className="flex gap-2">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`px-4 py-2.5 text-sm font-medium border rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 transition-colors ${
                  Object.keys(activeFilters).length > 0
                    ? "bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100"
                    : "text-slate-700 bg-white border-slate-300 hover:bg-slate-50"
                }`}
              >
                <Filter className="w-4 h-4 mr-2 inline" />
                Filters{" "}
                {Object.keys(activeFilters).length > 0 &&
                  `(${Object.keys(activeFilters).length})`}
              </button>
              <button
                onClick={() => setShowColumnChooser(!showColumnChooser)}
                className="px-4 py-2.5 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 transition-colors"
              >
                <Settings className="w-4 h-4 mr-2 inline" />
                Columns
              </button>
              <button
                onClick={handleRefresh}
                disabled={isRefreshing}
                className="px-4 py-2.5 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 disabled:opacity-50 transition-colors"
              >
                <RefreshCw
                  className={`w-4 h-4 ${isRefreshing ? "animate-spin" : ""}`}
                />
              </button>
            </div>

            {/* Filter Panel */}
            {showFilters && (
              <div className="border-t border-slate-200 pt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Start Date
                    </label>
                    <input
                      type="date"
                      value={filters.startDate}
                      onChange={(e) =>
                        handleFilterChange("startDate", e.target.value)
                      }
                      className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-slate-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      End Date
                    </label>
                    <input
                      type="date"
                      value={filters.endDate}
                      onChange={(e) =>
                        handleFilterChange("endDate", e.target.value)
                      }
                      className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-slate-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      KPI Record ID
                    </label>
                    <input
                      type="text"
                      value={filters.kpiRecordId}
                      onChange={(e) =>
                        handleFilterChange("kpiRecordId", e.target.value)
                      }
                      placeholder="Enter KPI Record ID (e.g., 10)"
                      className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-slate-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Work Order ID
                    </label>
                    <input
                      type="text"
                      value={filters.workOrderId}
                      onChange={(e) =>
                        handleFilterChange("workOrderId", e.target.value)
                      }
                      placeholder="Enter Work Order ID (e.g., 63)"
                      className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-slate-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Overall KPI Met
                    </label>
                    <select
                      value={filters.overallKpiMet}
                      onChange={(e) =>
                        handleFilterChange("overallKpiMet", e.target.value)
                      }
                      className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-slate-500"
                    >
                      <option value="">All</option>
                      <option value="true">Met</option>
                      <option value="false">Not Met</option>
                    </select>
                  </div>
                </div>
                <div className="flex gap-3 mt-4">
                  <button
                    onClick={applyFilters}
                    className="px-4 py-2 text-sm font-medium text-white bg-slate-800 border border-transparent rounded-lg hover:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 transition-colors"
                  >
                    Apply Filters
                  </button>
                  <button
                    onClick={clearFilters}
                    className="px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 transition-colors"
                  >
                    Clear All
                  </button>
                </div>
              </div>
            )}

            {/* Column Chooser */}
            {showColumnChooser && (
              <div className="border-t border-slate-200 pt-4">
                <h3 className="text-sm font-medium text-slate-700 mb-3">
                  Choose Columns to Display
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                  {columnDefinitions.map((column) => (
                    <label
                      key={column.key}
                      className="flex items-center space-x-2"
                    >
                      <input
                        type="checkbox"
                        checked={visibleColumns[column.key]}
                        onChange={() => toggleColumnVisibility(column.key)}
                        disabled={column.required}
                        className="rounded border-slate-300 text-slate-600 focus:ring-slate-500 disabled:opacity-50"
                      />
                      <span
                        className={`text-sm ${
                          column.required ? "text-slate-500" : "text-slate-700"
                        }`}
                      >
                        {column.label}
                        {column.required && (
                          <span className="text-xs ml-1">(Required)</span>
                        )}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200">
              <thead className="bg-slate-50">
                <tr>
                  {visibleColumns.kpiRecordId && (
                    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                      KPI Record ID
                    </th>
                  )}
                  {visibleColumns.workOrderId && (
                    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                      Work Order ID
                    </th>
                  )}
                  {visibleColumns.createdTime && (
                    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                      Created Time
                    </th>
                  )}
                  {visibleColumns.startTime && (
                    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                      Start Time
                    </th>
                  )}
                  {visibleColumns.holdTime && (
                    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                      Hold Time
                    </th>
                  )}
                  {visibleColumns.resumeTime && (
                    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                      Resume Time
                    </th>
                  )}
                  {visibleColumns.finishTime && (
                    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                      Finish Time
                    </th>
                  )}
                  {visibleColumns.responseTimeMinutes && (
                    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                      Response Time (Minutes)
                    </th>
                  )}
                  {visibleColumns.resolutionTimeMinutes && (
                    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                      Resolution Time (Minutes)
                    </th>
                  )}
                  {visibleColumns.actualResponseTimeMinutes && (
                    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                      Actual Response Time (Minutes)
                    </th>
                  )}
                  {visibleColumns.actualResolutionTimeMinutes && (
                    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                      Actual Resolution Time (Minutes)
                    </th>
                  )}
                  {visibleColumns.totalHoldTimeMinutes && (
                    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                      Total Hold Time (Minutes)
                    </th>
                  )}
                  {visibleColumns.responseTimeNote && (
                    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                      Response Time Note
                    </th>
                  )}
                  {visibleColumns.resolutionTimeNote && (
                    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                      Resolution Time Note
                    </th>
                  )}
                  {visibleColumns.holdNote && (
                    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                      Hold Note
                    </th>
                  )}
                  {visibleColumns.responseTimeMet && (
                    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                      Response Time Met
                    </th>
                  )}
                  {visibleColumns.resolutionTimeMet && (
                    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                      Resolution Time Met
                    </th>
                  )}
                  {visibleColumns.overallKpiMet && (
                    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                      Overall KPI Met
                    </th>
                  )}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-100">
                {loading ? (
                  <tr>
                    <td
                      colSpan={
                        Object.values(visibleColumns).filter(Boolean).length
                      }
                      className="px-4 py-12 text-center"
                    >
                      <div className="flex justify-center items-center">
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-slate-600"></div>
                        <span className="ml-3 text-sm font-medium text-slate-600">
                          Loading KPI records...
                        </span>
                      </div>
                    </td>
                  </tr>
                ) : kpiRecords.length === 0 ? (
                  <tr>
                    <td
                      colSpan={
                        Object.values(visibleColumns).filter(Boolean).length
                      }
                      className="px-4 py-12 text-center"
                    >
                      <div className="text-slate-500">
                        <BarChart2 className="w-8 h-8 mx-auto mb-3 text-slate-300" />
                        <p className="text-sm font-medium">
                          No KPI Records Found
                        </p>
                        <p className="text-xs text-slate-400 mt-1">
                          {Object.keys(activeFilters).length > 0
                            ? "Try adjusting your filters"
                            : "No KPI records have been created yet"}
                        </p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  kpiRecords.map((record) => (
                    <tr
                      key={record.kpiRecordId}
                      className="hover:bg-slate-50 transition-colors"
                    >
                      {visibleColumns.kpiRecordId && (
                        <td className="px-4 py-4 whitespace-nowrap text-sm font-semibold text-slate-900">
                          KPI-{record.kpiRecordId}
                        </td>
                      )}
                      {visibleColumns.workOrderId && (
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-slate-900">
                          WO-{record.workOrderId}
                        </td>
                      )}
                      {visibleColumns.createdTime && (
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-slate-900">
                          {formatDateTime(record.createdTime)}
                        </td>
                      )}
                      {visibleColumns.startTime && (
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-slate-900">
                          {formatDateTime(record.startTime)}
                        </td>
                      )}
                      {visibleColumns.holdTime && (
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-slate-900">
                          {formatDateTime(record.holdTime)}
                        </td>
                      )}
                      {visibleColumns.resumeTime && (
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-slate-900">
                          {formatDateTime(record.resumeTime)}
                        </td>
                      )}
                      {visibleColumns.finishTime && (
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-slate-900">
                          {formatDateTime(record.finishTime)}
                        </td>
                      )}
                      {visibleColumns.responseTimeMinutes && (
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-slate-900">
                          {formatMinutes(record.responseTimeMinutes)}
                        </td>
                      )}
                      {visibleColumns.resolutionTimeMinutes && (
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-slate-900">
                          {formatMinutes(record.resolutionTimeMinutes)}
                        </td>
                      )}
                      {visibleColumns.actualResponseTimeMinutes && (
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-slate-900">
                          {formatMinutes(record.actualResponseTimeMinutes)}
                        </td>
                      )}
                      {visibleColumns.actualResolutionTimeMinutes && (
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-slate-900">
                          {formatMinutes(record.actualResolutionTimeMinutes)}
                        </td>
                      )}
                      {visibleColumns.totalHoldTimeMinutes && (
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-slate-900">
                          {formatMinutes(record.totalHoldTimeMinutes)}
                        </td>
                      )}
                      {visibleColumns.responseTimeNote && (
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-slate-900 max-w-xs truncate">
                          {record.responseTimeNote || "-"}
                        </td>
                      )}
                      {visibleColumns.resolutionTimeNote && (
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-slate-900 max-w-xs truncate">
                          {record.resolutionTimeNote || "-"}
                        </td>
                      )}
                      {visibleColumns.holdNote && (
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-slate-900 max-w-xs truncate">
                          {record.holdNote || "-"}
                        </td>
                      )}
                      {visibleColumns.responseTimeMet && (
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-slate-900">
                          {getStatusBadge(record.responseTimeMet)}
                        </td>
                      )}
                      {visibleColumns.resolutionTimeMet && (
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-slate-900">
                          {getStatusBadge(record.resolutionTimeMet)}
                        </td>
                      )}
                      {visibleColumns.overallKpiMet && (
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-slate-900">
                          {getStatusBadge(record.overallKpiMet)}
                        </td>
                      )}
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {!loading && (
            <div className="bg-slate-50 px-4 py-3 border-t border-slate-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="text-xs text-slate-600">
                    Showing{" "}
                    <span className="font-medium">
                      {currentPage * pageSize + 1}
                    </span>{" "}
                    to{" "}
                    <span className="font-medium">
                      {Math.min((currentPage + 1) * pageSize, totalElements)}
                    </span>{" "}
                    of <span className="font-medium">{totalElements}</span> KPI
                    records
                  </div>
                  <div className="flex items-center gap-2">
                    <label className="text-xs text-slate-600">Show:</label>
                    <select
                      value={pageSize}
                      onChange={(e) =>
                        handlePageSizeChange(Number(e.target.value))
                      }
                      className="text-xs border border-slate-300 rounded px-2 py-1 focus:ring-2 focus:ring-slate-500 focus:border-slate-500"
                    >
                      <option value={5}>5</option>
                      <option value={10}>10</option>
                      <option value={25}>25</option>
                      <option value={50}>50</option>
                      <option value={100}>100</option>
                    </select>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 0}
                    className="inline-flex items-center px-2 py-1 text-xs font-medium text-slate-700 bg-white border border-slate-300 rounded hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <ChevronLeft className="w-3 h-3" />
                    Previous
                  </button>
                  <div className="flex items-center gap-1">
                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                      let pageNum;
                      if (totalPages <= 5) {
                        pageNum = i;
                      } else if (currentPage < 3) {
                        pageNum = i;
                      } else if (currentPage > totalPages - 4) {
                        pageNum = totalPages - 5 + i;
                      } else {
                        pageNum = currentPage - 2 + i;
                      }
                      return (
                        <button
                          key={pageNum}
                          onClick={() => handlePageChange(pageNum)}
                          className={`px-2 py-1 text-xs font-medium rounded transition-colors ${
                            currentPage === pageNum
                              ? "bg-slate-800 text-white"
                              : "text-slate-700 bg-white border border-slate-300 hover:bg-slate-50"
                          }`}
                        >
                          {pageNum + 1}
                        </button>
                      );
                    })}
                  </div>
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage >= totalPages - 1}
                    className="inline-flex items-center px-2 py-1 text-xs font-medium text-slate-700 bg-white border border-slate-300 rounded hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Next
                    <ChevronRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default KpiManagement;
