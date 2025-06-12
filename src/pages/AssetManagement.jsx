import { Link } from "react-router-dom";
import { Plus, FileText } from "lucide-react";

const AssetManagement = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Asset Management</h1>
          <p className="text-gray-600">Manage your assets and equipment</p>
        </div>
        <div className="flex gap-3">
          <Link
            to="/assets/create"
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-5 h-5 mr-2" />
            Add New Asset
          </Link>
          <Link
            to="/assets/list"
            className="inline-flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
          >
            <FileText className="w-5 h-5 mr-2" />
            View All Assets
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-center w-12 h-12 bg-blue-100 text-blue-600 rounded-lg mb-4">
            <Plus className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-semibold mb-2">Create Asset</h3>
          <p className="text-gray-600 mb-4">
            Add new assets to your inventory with detailed information
          </p>
          <Link
            to="/assets/create"
            className="text-blue-600 font-medium hover:underline"
          >
            Create Asset →
          </Link>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-center w-12 h-12 bg-green-100 text-green-600 rounded-lg mb-4">
            <FileText className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-semibold mb-2">View Assets</h3>
          <p className="text-gray-600 mb-4">
            Browse and manage your existing assets
          </p>
          <Link
            to="/assets/list"
            className="text-green-600 font-medium hover:underline"
          >
            View Assets →
          </Link>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-center w-12 h-12 bg-purple-100 text-purple-600 rounded-lg mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-semibold mb-2">Asset Reports</h3>
          <p className="text-gray-600 mb-4">
            Generate reports and analytics for your assets
          </p>
          <span className="text-gray-400 font-medium">Coming Soon</span>
        </div>
      </div>
    </div>
  );
};

export default AssetManagement;
