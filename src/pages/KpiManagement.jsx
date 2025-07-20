"use client";

import { useState } from "react";
import {
  Search,
  BarChart2,
  Clock,
  CheckCircle,
  XCircle,
  Filter,
  RefreshCw,
  FileText,
  TrendingUp,
  AlertCircle,
} from "lucide-react";
import { kpiService } from "../services/kpiService";
import { toast } from "react-toastify";
import Pagination from "../components/common/Pagination";

const KpiManagement = () => {
  const [kpiRecords, setKpiRecords] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchWorkOrderId, setSearchWorkOrderId] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [filteredRecords, setFilteredRecords] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [stats, setStats] = useState({
    totalRecords: 0,
    responseTimeMet: 0,
    resolutionTimeMet: 0,
    avgResponseTime: 0,
    avgResolutionTime: 0,
  });

  // Load KPI records for a specific work order
  const loadKpiRecords = async (workOrderId) => {
    if (!workOrderId.trim()) {
      toast.error("Please enter a work order ID");
      return;
    }

    setLoading(true);
    try {
      const response = await kpiService.getKpiRecordsByWorkOrder(workOrderId);
      const records = response.data || [];
      setKpiRecords(records);
      setFilteredRecords(records);
      calculateStats(records);
      setCurrentPage(1);

      if (records.length === 0) {
        toast.info(`No KPI records found for Work Order ID: ${workOrderId}`);
      } else {
        toast.success(
          `Found ${records.length} KPI record(s) for Work Order ID: ${workOrderId}`
        );
      }
    } catch (error) {
      console.error("Error loading KPI records:", error);
      if (error.response?.status === 404) {
        toast.error("Work order not found or no KPI records available");
      } else {
        toast.error("Failed to load KPI records");
      }
      setKpiRecords([]);
      setFilteredRecords([]);
      setStats({
        totalRecords: 0,
        responseTimeMet: 0,
        resolutionTimeMet: 0,
        avgResponseTime: 0,
        avgResolutionTime: 0,
      });
    } finally {
      setLoading(false);
    }
  };

  // Calculate statistics
  const calculateStats = (records) => {
    if (records.length === 0) {
      setStats({
        totalRecords: 0,
        responseTimeMet: 0,
        resolutionTimeMet: 0,
        avgResponseTime: 0,
        avgResolutionTime: 0,
      });
      return;
    }

    const responseTimeMet = records.filter(
      (record) => record.responseTimeMet
    ).length;
    const resolutionTimeMet = records.filter(
      (record) => record.resolutionTimeMet
    ).length;

    const totalActualResponseTime = records.reduce(
      (sum, record) => sum + (record.actualResponseTimeHours || 0),
      0
    );
    const totalActualResolutionTime = records.reduce(
      (sum, record) => sum + (record.actualResolutionTimeHours || 0),
      0
    );

    setStats({
      totalRecords: records.length,
      responseTimeMet: Math.round((responseTimeMet / records.length) * 100),
      resolutionTimeMet: Math.round((resolutionTimeMet / records.length) * 100),
      avgResponseTime: Number(
        (totalActualResponseTime / records.length).toFixed(2)
      ),
      avgResolutionTime: Number(
        (totalActualResolutionTime / records.length).toFixed(2)
      ),
    });
  };

  // Handle search within loaded records
  const handleSearch = (term) => {
    setSearchTerm(term);
    if (!term.trim()) {
      setFilteredRecords(kpiRecords);
    } else {
      const filtered = kpiRecords.filter(
        (record) =>
          record.workOrderId
            .toString()
            .toLowerCase()
            .includes(term.toLowerCase()) ||
          record.kpiRecordId
            .toString()
            .toLowerCase()
            .includes(term.toLowerCase())
      );
      setFilteredRecords(filtered);
    }
    setCurrentPage(1);
  };

  // Format date and time
  const formatDateTime = (dateTime) => {
    if (!dateTime) return "-";
    return new Date(dateTime).toLocaleString();
  };

  // Format hours with 2 decimal places
  const formatHours = (hours) => {
    if (hours === null || hours === undefined) return "-";
    return Number(hours).toFixed(2);
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

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredRecords.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredRecords.length / itemsPerPage);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-blue-100 rounded-xl">
                <BarChart2 className="w-8 h-8 text-blue-600" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  KPI Management
                </h1>
                <p className="text-gray-600 mt-1">
                  Monitor Key Performance Indicators for work orders
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filter Section */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Work Order ID
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={searchWorkOrderId}
                  onChange={(e) => setSearchWorkOrderId(e.target.value)}
                  placeholder="Enter Work Order ID to fetch KPI records"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      loadKpiRecords(searchWorkOrderId);
                    }
                  }}
                />
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              </div>
            </div>
            <div className="flex items-end">
              <button
                onClick={() => loadKpiRecords(searchWorkOrderId)}
                disabled={loading}
                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors shadow-lg hover:shadow-xl"
              >
                {loading ? (
                  <>
                    <RefreshCw className="w-5 h-5 mr-2 animate-spin" />
                    Loading...
                  </>
                ) : (
                  <>
                    <Search className="w-5 h-5 mr-2" />
                    Fetch KPI Records
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Search within results */}
          {kpiRecords.length > 0 && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Search within results
              </label>
              <div className="relative max-w-md">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => handleSearch(e.target.value)}
                  placeholder="Search by Work Order ID or KPI Record ID"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              </div>
            </div>
          )}
        </div>

        {/* Statistics Cards */}
        {kpiRecords.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <FileText className="w-6 h-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">
                    Total Records
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {stats.totalRecords}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center">
                <div className="p-2 bg-green-100 rounded-lg">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">
                    Response Time Met
                  </p>
                  <p className="text-2xl font-bold text-green-600">
                    {stats.responseTimeMet}%
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <TrendingUp className="w-6 h-6 text-purple-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">
                    Resolution Time Met
                  </p>
                  <p className="text-2xl font-bold text-purple-600">
                    {stats.resolutionTimeMet}%
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <Clock className="w-6 h-6 text-orange-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">
                    Avg Response Time
                  </p>
                  <p className="text-2xl font-bold text-orange-600">
                    {stats.avgResponseTime}h
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center">
                <div className="p-2 bg-red-100 rounded-lg">
                  <AlertCircle className="w-6 h-6 text-red-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">
                    Avg Resolution Time
                  </p>
                  <p className="text-2xl font-bold text-red-600">
                    {stats.avgResolutionTime}h
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* KPI Records Table */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">KPI Records</h2>
            {filteredRecords.length > 0 && (
              <p className="text-sm text-gray-600">
                Showing {indexOfFirstItem + 1} to{" "}
                {Math.min(indexOfLastItem, filteredRecords.length)} of{" "}
                {filteredRecords.length} records
              </p>
            )}
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              <span className="ml-4 text-lg font-medium text-gray-700">
                Loading KPI records...
              </span>
            </div>
          ) : filteredRecords.length === 0 ? (
            <div className="text-center py-12">
              <BarChart2 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-xl text-gray-600 mb-2">No KPI Records Found</p>
              <p className="text-gray-500">
                {kpiRecords.length === 0
                  ? "Enter a Work Order ID above to fetch KPI records"
                  : "No records match your search criteria"}
              </p>
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        KPI Record ID
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Work Order ID
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Start Time
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Hold Time
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Resume Time
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Finish Time
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Response Time (Hours)
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Resolution Time (Hours)
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actual Response Time (Hours)
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actual Resolution Time (Hours)
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Response Time Met
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Resolution Time Met
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {currentItems.map((record) => (
                      <tr key={record.kpiRecordId} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {record.kpiRecordId}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {record.workOrderId}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {formatDateTime(record.startTime)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {formatDateTime(record.holdTime)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {formatDateTime(record.resumeTime)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {formatDateTime(record.finishTime)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {formatHours(record.responseTimeHours)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {formatHours(record.resolutionTimeHours)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {formatHours(record.actualResponseTimeHours)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {formatHours(record.actualResolutionTimeHours)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {getStatusBadge(record.responseTimeMet)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {getStatusBadge(record.resolutionTimeMet)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="mt-6">
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                  />
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default KpiManagement;
