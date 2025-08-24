"use client";
import { useState, useEffect } from "react";
import { Edit, Trash2, Search, Plus, Tag } from "lucide-react";
import { assetCategoryService } from "../services/assetCategoryService";
import { toast } from "react-toastify";

const AssetCategoryTable = ({ onEdit, onAdd }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCategories, setFilteredCategories] = useState([]);

  useEffect(() => {
    loadCategories();
  }, []);

  useEffect(() => {
    if (searchTerm.trim()) {
      const filtered = categories.filter(
        (category) =>
          category.categoryName
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          (category.description &&
            category.description
              .toLowerCase()
              .includes(searchTerm.toLowerCase()))
      );
      setFilteredCategories(filtered);
    } else {
      setFilteredCategories(categories);
    }
  }, [searchTerm, categories]);

  const loadCategories = async () => {
    setLoading(true);
    try {
      const response = await assetCategoryService.getAllCategories();
      setCategories(response.data || []);
    } catch (error) {
      console.error("Error loading categories:", error);
      toast.error("Failed to load asset categories");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id, categoryName) => {
    if (
      window.confirm(
        `Are you sure you want to delete the category "${categoryName}"?`
      )
    ) {
      try {
        await assetCategoryService.deleteCategory(id);
        toast.success("Asset category deleted successfully");
        loadCategories();
      } catch (error) {
        console.error("Error deleting category:", error);
        toast.error("Failed to delete asset category");
      }
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
      <div className="p-6 border-b border-gray-200">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg mr-3">
              <Tag className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">
                Asset Categories
              </h2>
              <p className="text-gray-600">Manage asset category types</p>
            </div>
          </div>
          <button
            onClick={onAdd}
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Category
          </button>
        </div>

        <div className="mt-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search categories..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            />
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                Category Name
              </th>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                Description
              </th>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {loading ? (
              <tr>
                <td colSpan="3" className="px-6 py-12 text-center">
                  <div className="flex justify-center items-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                    <span className="ml-3 text-lg font-medium text-gray-700">
                      Loading categories...
                    </span>
                  </div>
                </td>
              </tr>
            ) : filteredCategories.length === 0 ? (
              <tr>
                <td colSpan="3" className="px-6 py-12 text-center">
                  <div className="text-gray-500">
                    <Tag className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                    <p className="text-lg font-medium">No categories found</p>
                    <p className="text-sm">
                      {searchTerm
                        ? "Try adjusting your search criteria"
                        : "Click 'Add Category' to create your first category"}
                    </p>
                  </div>
                </td>
              </tr>
            ) : (
              filteredCategories.map((category, index) => (
                <tr
                  key={category.categoryId}
                  className={`hover:bg-blue-50 transition-colors ${
                    index % 2 === 0 ? "bg-white" : "bg-gray-50"
                  }`}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <Tag className="w-4 h-4 mr-2 text-blue-600" />
                      <div className="text-sm font-medium text-gray-900">
                        {category.categoryName}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-600 max-w-xs truncate">
                      {category.description || "-"}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => onEdit(category)}
                        className="p-2 text-green-600 hover:text-green-900 hover:bg-green-100 rounded-lg transition-all"
                        title="Edit Category"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() =>
                          handleDelete(
                            category.categoryId,
                            category.categoryName
                          )
                        }
                        className="p-2 text-red-600 hover:text-red-900 hover:bg-red-100 rounded-lg transition-all"
                        title="Delete Category"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AssetCategoryTable;
