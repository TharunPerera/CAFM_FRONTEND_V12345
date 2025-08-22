"use client";

import { useState, useEffect } from "react";
import { X, Plus, Trash2 } from "lucide-react";
import { checklistService } from "../../services/checklistService";
import { toast } from "react-toastify";

const ChecklistForm = ({ checklist, serviceScopes, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    name: "",
    serviceScopeId: "",
    tasks: [], // Store as array of { taskId, description }
  });
  const [newTask, setNewTask] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (checklist) {
      let tasksArray = [];
      if (checklist.tasks || checklist.content) {
        try {
          const parsed =
            typeof (checklist.tasks || checklist.content) === "string"
              ? JSON.parse(checklist.tasks || checklist.content)
              : checklist.tasks || checklist.content || [];
          // Handle both string array and object array formats
          tasksArray = Array.isArray(parsed)
            ? parsed.map((item, index) => ({
                taskId: item.taskId || index + 1, // Fallback to index-based ID
                description:
                  typeof item === "string"
                    ? item
                    : item.description || item.task || "",
              }))
            : [];
        } catch (error) {
          console.error("Error parsing checklist tasks:", error);
          toast.error("Failed to load checklist tasks");
        }
      }
      setFormData({
        name: checklist.name || "",
        serviceScopeId: checklist.serviceScopeId || "",
        tasks: tasksArray,
      });
    }
  }, [checklist]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const addTask = () => {
    if (newTask.trim()) {
      setFormData((prev) => ({
        ...prev,
        tasks: [
          ...prev.tasks,
          {
            taskId: prev.tasks.length + 1, // Simple incrementing ID
            description: newTask.trim(),
          },
        ],
      }));
      setNewTask("");
      if (errors.tasks) {
        setErrors((prev) => ({ ...prev, tasks: "" }));
      }
    }
  };

  const updateTask = (index, value) => {
    setFormData((prev) => ({
      ...prev,
      tasks: prev.tasks.map((task, i) =>
        i === index ? { ...task, description: value } : task
      ),
    }));
  };

  const removeTask = (index) => {
    setFormData((prev) => ({
      ...prev,
      tasks: prev.tasks
        .filter((_, i) => i !== index)
        .map((task, i) => ({
          ...task,
          taskId: i + 1, // Reassign taskIds to maintain sequential order
        })),
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.serviceScopeId)
      newErrors.serviceScopeId = "Service scope is required";
    if (formData.tasks.length === 0)
      newErrors.tasks = "At least one task is required";
    if (formData.tasks.some((task) => !task.description.trim())) {
      newErrors.tasks = "All tasks must have content";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      const submitData = {
        name: formData.name,
        serviceScopeId: formData.serviceScopeId,
        content: JSON.stringify(formData.tasks), // Stringify tasks array to match ChecklistDTO
      };

      if (checklist) {
        await checklistService.updateChecklist(
          checklist.checklistId,
          submitData
        );
        toast.success("Checklist updated successfully");
      } else {
        await checklistService.createChecklist(submitData);
        toast.success("Checklist created successfully");
      }
      onSuccess();
    } catch (error) {
      console.error("Error saving checklist:", error);
      toast.error("Failed to save checklist. Please try again.");
      setErrors({ submit: "Failed to save checklist. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
          <h2 className="text-2xl font-bold text-gray-900">
            {checklist ? "Edit Checklist" : "Create Checklist"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors p-2 hover:bg-gray-100 rounded-full"
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

          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Checklist Name *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                errors.name ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter checklist name"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name}</p>
            )}
          </div>

          {/* Service Scope */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Service Scope *
            </label>
            <select
              name="serviceScopeId"
              value={formData.serviceScopeId}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                errors.serviceScopeId ? "border-red-500" : "border-gray-300"
              }`}
            >
              <option value="">Select a service scope</option>
              {serviceScopes.map((scope) => (
                <option
                  key={scope.serviceScopeId || scope.scopeId}
                  value={scope.serviceScopeId || scope.scopeId}
                >
                  {scope.serviceScopeName || scope.scopeName}
                </option>
              ))}
            </select>
            {errors.serviceScopeId && (
              <p className="text-red-500 text-sm mt-1">
                {errors.serviceScopeId}
              </p>
            )}
          </div>

          {/* Tasks */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Tasks *
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={newTask}
                  onChange={(e) => setNewTask(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="Enter new task"
                />
                <button
                  type="button"
                  onClick={addTask}
                  disabled={!newTask.trim()}
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Plus className="w-4 h-4" />
                  Add Task
                </button>
              </div>
            </div>
            <div className="space-y-3">
              {formData.tasks.map((task, index) => (
                <div key={task.taskId} className="flex gap-3 items-center">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-medium">
                    {task.taskId}
                  </div>
                  <input
                    type="text"
                    value={task.description}
                    onChange={(e) => updateTask(index, e.target.value)}
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder={`Task ${index + 1}`}
                  />
                  <button
                    type="button"
                    onClick={() => removeTask(index)}
                    className="text-red-600 hover:text-red-800 p-2 hover:bg-red-50 rounded-full transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>
            {errors.tasks && (
              <p className="text-red-500 text-sm mt-1">{errors.tasks}</p>
            )}
            {formData.tasks.length === 0 && (
              <div className="text-center py-8 text-gray-500 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                No tasks added yet. Enter a task and click "Add Task" to get
                started.
              </div>
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
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
            >
              {loading && (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              )}
              {loading
                ? "Saving..."
                : checklist
                ? "Update Checklist"
                : "Create Checklist"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChecklistForm;
