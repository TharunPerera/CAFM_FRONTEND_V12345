"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { inventoryService } from "../../services/inventoryService";

const InventoryForm = ({ item, categories, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    itemCode: "",
    itemName: "",
    description: "",
    category: "",
    quantityAvailable: 0,
    unit: "",
    location: "",
    reorderLevel: 0,
    status: "ACTIVE",
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const units = [
    "PCS",
    "KG",
    "LITER",
    "METER",
    "BOX",
    "PACK",
    "ROLL",
    "SET",
    "PAIR",
    "OTHER",
  ];

  const statuses = [
    { value: "ACTIVE", label: "Active" },
    { value: "INACTIVE", label: "Inactive" },
    { value: "OUT_OF_STOCK", label: "Out of Stock" },
  ];

  useEffect(() => {
    if (item) {
      setFormData({
        itemCode: item.itemCode || "",
        itemName: item.itemName || "",
        description: item.description || "",
        category: item.category || "",
        quantityAvailable: item.quantityAvailable || 0,
        unit: item.unit || "",
        location: item.location || "",
        reorderLevel: item.reorderLevel || 0,
        status: item.status || "ACTIVE",
      });
    }
  }, [item]);

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "number" ? Number.parseInt(value) || 0 : value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.itemCode.trim()) newErrors.itemCode = "Item code is required";
    if (!formData.itemName.trim()) newErrors.itemName = "Item name is required";
    if (!formData.category) newErrors.category = "Category is required";
    if (!formData.unit) newErrors.unit = "Unit is required";
    if (!formData.location.trim()) newErrors.location = "Location is required";
    if (formData.quantityAvailable < 0)
      newErrors.quantityAvailable = "Quantity cannot be negative";
    if (formData.reorderLevel < 0)
      newErrors.reorderLevel = "Reorder level cannot be negative";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      if (item) {
        await inventoryService.updateInventoryItem(
          item.inventoryItemId,
          formData
        );
      } else {
        await inventoryService.createInventoryItem(formData);
      }

      onSuccess();
    } catch (error) {
      console.error("Error saving inventory item:", error);
      if (error.response?.data?.message?.includes("Item code already exists")) {
        setErrors({ itemCode: "Item code already exists" });
      } else {
        setErrors({
          submit: "Failed to save inventory item. Please try again.",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">
            {item ? "Edit Inventory Item" : "Add Inventory Item"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {errors.submit && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
              {errors.submit}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Item Code */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Item Code *
              </label>
              <input
                type="text"
                name="itemCode"
                value={formData.itemCode}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.itemCode ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Enter item code"
              />
              {errors.itemCode && (
                <p className="text-red-500 text-sm mt-1">{errors.itemCode}</p>
              )}
            </div>

            {/* Item Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Item Name *
              </label>
              <input
                type="text"
                name="itemName"
                value={formData.itemName}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.itemName ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Enter item name"
              />
              {errors.itemName && (
                <p className="text-red-500 text-sm mt-1">{errors.itemName}</p>
              )}
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={3}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter item description"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category *
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.category ? "border-red-500" : "border-gray-300"
                }`}
              >
                <option value="">Select category</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              {errors.category && (
                <p className="text-red-500 text-sm mt-1">{errors.category}</p>
              )}
            </div>

            {/* Unit */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Unit *
              </label>
              <select
                name="unit"
                value={formData.unit}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.unit ? "border-red-500" : "border-gray-300"
                }`}
              >
                <option value="">Select unit</option>
                {units.map((unit) => (
                  <option key={unit} value={unit}>
                    {unit}
                  </option>
                ))}
              </select>
              {errors.unit && (
                <p className="text-red-500 text-sm mt-1">{errors.unit}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Quantity Available */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Quantity Available *
              </label>
              <input
                type="number"
                name="quantityAvailable"
                value={formData.quantityAvailable}
                onChange={handleInputChange}
                min="0"
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.quantityAvailable
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
              />
              {errors.quantityAvailable && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.quantityAvailable}
                </p>
              )}
            </div>

            {/* Reorder Level */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Reorder Level *
              </label>
              <input
                type="number"
                name="reorderLevel"
                value={formData.reorderLevel}
                onChange={handleInputChange}
                min="0"
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.reorderLevel ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.reorderLevel && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.reorderLevel}
                </p>
              )}
            </div>

            {/* Status */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status *
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {statuses.map((status) => (
                  <option key={status.value} value={status.value}>
                    {status.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Location *
            </label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.location ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter storage location"
            />
            {errors.location && (
              <p className="text-red-500 text-sm mt-1">{errors.location}</p>
            )}
          </div>

          {/* Submit Button */}
          <div className="flex justify-end gap-4 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? "Saving..." : item ? "Update Item" : "Add Item"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InventoryForm;
