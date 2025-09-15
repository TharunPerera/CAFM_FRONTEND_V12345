"use client";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Plus, FileText, ArrowRight, Tag, Eye } from "lucide-react";
import AssetCategoryForm from "../components/AssetCategoryForm";
import AssetCategoryTable from "../components/AssetCategoryTable";

const AssetManagement = () => {
  const [showCategoryForm, setShowCategoryForm] = useState(false);
  const [showCategoryTable, setShowCategoryTable] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);

  const quickActions = [
    {
      title: "Create New Asset",
      description: "Add new assets to your inventory",
      icon: Plus,
      link: "/assets/create",
      gradient: "from-blue-500 to-blue-600",
      bgGradient: "from-blue-50 to-blue-100",
    },
    {
      title: "View All Assets",
      description: "Browse and manage existing assets",
      icon: FileText,
      link: "/assets/list",
      gradient: "from-green-500 to-green-600",
      bgGradient: "from-green-50 to-green-100",
    },
    {
      title: "Create Asset Category",
      description: "Add new asset categories for classification",
      icon: Tag,
      action: () => {
        setEditingCategory(null);
        setShowCategoryForm(true);
        setShowCategoryTable(false);
      },
      gradient: "from-purple-500 to-purple-600",
      bgGradient: "from-purple-50 to-purple-100",
    },
    {
      title: "View Asset Categories",
      description: "Manage and organize asset categories",
      icon: Eye,
      action: () => {
        setShowCategoryTable(true);
        setShowCategoryForm(false);
      },
      gradient: "from-orange-500 to-orange-600",
      bgGradient: "from-orange-50 to-orange-100",
    },
  ];

  const handleCategoryEdit = (category) => {
    setEditingCategory(category);
    setShowCategoryForm(true);
    setShowCategoryTable(false);
  };

  const handleCategoryAdd = () => {
    setEditingCategory(null);
    setShowCategoryForm(true);
    setShowCategoryTable(false);
  };

  const handleCategorySave = () => {
    setShowCategoryForm(false);
    setShowCategoryTable(true);
    setEditingCategory(null);
  };

  const handleCategoryCancel = () => {
    setShowCategoryForm(false);
    setEditingCategory(null);
  };

  const handleBackToMain = () => {
    setShowCategoryForm(false);
    setShowCategoryTable(false);
    setEditingCategory(null);
  };

  if (showCategoryForm) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-6">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <button
              onClick={handleBackToMain}
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              ← Back to Asset Management
            </button>
          </div>
          <AssetCategoryForm
            isEdit={!!editingCategory}
            categoryId={editingCategory?.categoryId}
            onSave={handleCategorySave}
            onCancel={handleCategoryCancel}
          />
        </div>
      </div>
    );
  }

  if (showCategoryTable) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-6">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <button
              onClick={handleBackToMain}
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              ← Back to Asset Management
            </button>
          </div>
          <AssetCategoryTable
            onEdit={handleCategoryEdit}
            onAdd={handleCategoryAdd}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-6">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-3">
            Asset Management
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Comprehensive asset tracking and management system
          </p>
        </div>

        {/* Quick Actions Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {quickActions.map((action, index) => {
            const IconComponent = action.icon;
            const isLink = !!action.link;
            const Component = isLink ? Link : "button";
            const props = isLink
              ? { to: action.link }
              : { onClick: action.action };

            return (
              <Component
                key={index}
                {...props}
                className="group block bg-white rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <div
                  className={`bg-gradient-to-br ${action.bgGradient} p-6 rounded-t-xl`}
                >
                  <div
                    className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${action.gradient} shadow-md mb-4`}
                  >
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-gray-700 transition-colors">
                    {action.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed group-hover:text-gray-500 transition-colors">
                    {action.description}
                  </p>
                </div>
                <div className="p-6 bg-white rounded-b-xl">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-gray-900 group-hover:text-gray-700 transition-colors">
                      Get Started
                    </span>
                    <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-gray-600 group-hover:translate-x-1 transition-all duration-300" />
                  </div>
                </div>
              </Component>
            );
          })}
        </div>

        {/* Simple Feature Highlight */}
        <div className="mt-12 text-center">
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <h2 className="text-xl font-bold text-gray-900 mb-3">
              Efficient Asset Management
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Streamline your asset tracking process with our comprehensive CAFM
              system.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssetManagement;
