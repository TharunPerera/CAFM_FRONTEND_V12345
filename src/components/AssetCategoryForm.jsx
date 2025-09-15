"use client";
import { useState, useEffect } from "react";
import { Save, X, Tag, FileText } from "lucide-react";
import { assetCategoryService } from "../services/assetCategoryService";
import { toast } from "react-toastify";

const AssetCategoryForm = ({
  isEdit = false,
  categoryId = null,
  onSave,
  onCancel,
}) => {
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [category, setCategory] = useState({
    categoryName: "",
    description: "",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isEdit && categoryId) {
      loadCategory();
    }
  }, [isEdit, categoryId]);

  const loadCategory = async () => {
    setLoading(true);
    try {
      const response = await assetCategoryService.getCategoryById(categoryId);
      setCategory(response.data);
    } catch (error) {
      console.error("Error loading category:", error);
      toast.error("Failed to load category details");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCategory((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!category.categoryName.trim()) {
      newErrors.categoryName = "Category name is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setSubmitting(true);
    try {
      if (isEdit) {
        await assetCategoryService.updateCategory(categoryId, category);
        toast.success("Asset category updated successfully");
      } else {
        await assetCategoryService.createCategory(category);
        toast.success("Asset category created successfully");
      }
      onSave();
    } catch (error) {
      console.error("Error saving category:", error);
      toast.error(
        error.response?.data?.message || "Failed to save asset category"
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="ml-3 text-lg font-medium text-gray-700">
          Loading...
        </span>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
      <div className="flex items-center mb-6">
        <div className="p-3 bg-blue-100 rounded-xl mr-4">
          <Tag className="w-6 h-6 text-blue-600" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            {isEdit ? "Edit Asset Category" : "Create Asset Category"}
          </h2>
          <p className="text-gray-600">
            {isEdit
              ? "Update asset category information"
              : "Add a new asset category"}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label
            htmlFor="categoryName"
            className="block text-sm font-semibold text-gray-700 flex items-center"
          >
            <Tag className="w-4 h-4 mr-1 text-gray-500" />
            Category Name *
          </label>
          <input
            id="categoryName"
            type="text"
            name="categoryName"
            value={category.categoryName}
            onChange={handleChange}
            className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
              errors.categoryName
                ? "border-red-500 bg-red-50"
                : "border-gray-200 hover:border-gray-300"
            }`}
            placeholder="Enter category name"
          />
          {errors.categoryName && (
            <p className="text-red-500 text-sm">{errors.categoryName}</p>
          )}
        </div>

        <div className="space-y-2">
          <label
            htmlFor="description"
            className="block text-sm font-semibold text-gray-700 flex items-center"
          >
            <FileText className="w-4 h-4 mr-1 text-gray-500" />
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={category.description}
            onChange={handleChange}
            rows={4}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 hover:border-gray-300 transition-all resize-none"
            placeholder="Enter category description (optional)"
          />
        </div>

        <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
          <button
            type="button"
            onClick={onCancel}
            className="inline-flex items-center px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 hover:border-gray-400 transition-all"
          >
            <X className="w-5 h-5 mr-2" />
            Cancel
          </button>
          <button
            type="submit"
            disabled={submitting}
            className="inline-flex items-center px-8 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:opacity-50 transition-all shadow-lg hover:shadow-xl"
          >
            {submitting ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                {isEdit ? "Updating..." : "Creating..."}
              </>
            ) : (
              <>
                <Save className="w-5 h-5 mr-2" />
                {isEdit ? "Update Category" : "Create Category"}
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AssetCategoryForm;
