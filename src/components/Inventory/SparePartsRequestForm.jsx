"use client";

import { useState } from "react";
import { Save, X, Package } from "lucide-react";
import { sparePartsService } from "../../services/sparePartsService";
import { toast } from "react-toastify";

const SparePartsRequestForm = ({ onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    workOrderId: "",
    inventoryItemId: "",
    requestedQuantity: 1,
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.workOrderId ||
      !formData.inventoryItemId ||
      !formData.requestedQuantity
    ) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (formData.requestedQuantity <= 0) {
      toast.error("Requested quantity must be greater than 0");
      return;
    }

    setLoading(true);
    try {
      const requestData = {
        workOrderId: Number.parseInt(formData.workOrderId),
        inventoryItemId: Number.parseInt(formData.inventoryItemId),
        requestedQuantity: Number.parseInt(formData.requestedQuantity),
      };

      await sparePartsService.createSparePartsRequest(requestData);
      toast.success("Spare parts request created successfully");
      onSuccess();
    } catch (error) {
      console.error("Error creating spare parts request:", error);
      toast.error(
        error.response?.data?.message || "Failed to create spare parts request"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Package className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">
                Request Spare Parts
              </h2>
              <p className="text-sm text-gray-600">
                Create a new spare parts request
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            disabled={loading}
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Work Order ID */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Work Order ID <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              name="workOrderId"
              value={formData.workOrderId}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter Work Order ID"
              required
            />
          </div>

          {/* Inventory Item ID */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Inventory Item ID <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              name="inventoryItemId"
              value={formData.inventoryItemId}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter Inventory Item ID"
              required
            />
          </div>

          {/* Requested Quantity */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Requested Quantity <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              name="requestedQuantity"
              value={formData.requestedQuantity}
              onChange={handleInputChange}
              min="1"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter quantity needed"
              required
            />
          </div>

          {/* Form Actions */}
          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors shadow-lg hover:shadow-xl"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Creating Request...
                </>
              ) : (
                <>
                  <Save className="w-5 h-5 mr-2" />
                  Create Request
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SparePartsRequestForm;
