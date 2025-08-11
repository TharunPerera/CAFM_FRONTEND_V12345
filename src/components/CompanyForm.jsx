import { useState, useEffect, useMemo } from "react";
import { InformationCircleIcon } from "@heroicons/react/24/outline";

const CompanyForm = ({ onSubmit, initialData = {}, isEdit = false }) => {
  const [formData, setFormData] = useState({
    companyName: initialData.companyName || "",
    contactEmail: initialData.contactEmail || "",
    contactPhone: initialData.contactPhone || "",
    address: initialData.address || "",
  });
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState(null);

  // Memoize initialData to ensure stable reference
  const memoizedInitialData = useMemo(
    () => ({
      companyName: initialData.companyName || "",
      contactEmail: initialData.contactEmail || "",
      contactPhone: initialData.contactPhone || "",
      address: initialData.address || "",
    }),
    [
      initialData.companyName,
      initialData.contactEmail,
      initialData.contactPhone,
      initialData.address,
    ]
  );

  useEffect(() => {
    // Only update formData if initialData has changed
    setFormData((prev) => {
      if (
        prev.companyName !== memoizedInitialData.companyName ||
        prev.contactEmail !== memoizedInitialData.contactEmail ||
        prev.contactPhone !== memoizedInitialData.contactPhone ||
        prev.address !== memoizedInitialData.address
      ) {
        return memoizedInitialData;
      }
      return prev;
    });
  }, [memoizedInitialData]);

  const validateField = (name, value) => {
    const errors = {};
    if (name === "companyName" && !value)
      errors.companyName = "Company name is required.";
    if (name === "contactEmail" && !value)
      errors.contactEmail = "Email is required.";
    if (
      name === "contactEmail" &&
      value &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
    )
      errors.contactEmail = "Invalid email format.";
    if (name === "contactPhone" && value && !/^\+?\d{10,15}$/.test(value))
      errors.contactPhone = "Invalid phone number (10-15 digits).";
    return errors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors((prev) => ({ ...prev, ...validateField(name, value) }));
    setApiError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError(null);
    const fieldErrors = {
      ...validateField("companyName", formData.companyName),
      ...validateField("contactEmail", formData.contactEmail),
      ...(formData.contactPhone
        ? validateField("contactPhone", formData.contactPhone)
        : {}),
    };
    if (Object.keys(fieldErrors).length) {
      setErrors(fieldErrors);
      return;
    }
    try {
      await onSubmit(formData);
      if (!isEdit) {
        setFormData({
          companyName: "",
          contactEmail: "",
          contactPhone: "",
          address: "",
        });
      }
      setErrors({});
    } catch (error) {
      setApiError(
        error.response?.data?.message ||
          "Failed to save company. Please try again."
      );
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-8 bg-white rounded-2xl shadow-xl">
      <h3 className="text-2xl font-semibold text-gray-900 mb-6">
        {isEdit ? "Update Company" : "Create Company"}
      </h3>
      {apiError && (
        <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-lg text-sm flex items-center">
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          {apiError}
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
            Company Name
            <InformationCircleIcon
              className="ml-2 h-4 w-4 text-gray-400 cursor-help"
              title="Enter the official name of the company"
            />
          </label>
          <input
            type="text"
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
            className={`w-full p-3 border ${
              errors.companyName ? "border-red-500" : "border-gray-200"
            } rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200`}
            required
          />
          {errors.companyName && (
            <p className="text-red-500 text-xs mt-1">{errors.companyName}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
            Contact Email
            <InformationCircleIcon
              className="ml-2 h-4 w-4 text-gray-400 cursor-help"
              title="Provide a valid contact email for the company"
            />
          </label>
          <input
            type="email"
            name="contactEmail"
            value={formData.contactEmail}
            onChange={handleChange}
            className={`w-full p-3 border ${
              errors.contactEmail ? "border-red-500" : "border-gray-200"
            } rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200`}
            required
          />
          {errors.contactEmail && (
            <p className="text-red-500 text-xs mt-1">{errors.contactEmail}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
            Contact Phone
            <InformationCircleIcon
              className="ml-2 h-4 w-4 text-gray-400 cursor-help"
              title="Optional: Enter a contact phone number (10-15 digits)"
            />
          </label>
          <input
            type="tel"
            name="contactPhone"
            value={formData.contactPhone}
            onChange={handleChange}
            className={`w-full p-3 border ${
              errors.contactPhone ? "border-red-500" : "border-gray-200"
            } rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200`}
          />
          {errors.contactPhone && (
            <p className="text-red-500 text-xs mt-1">{errors.contactPhone}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
            Address
            <InformationCircleIcon
              className="ml-2 h-4 w-4 text-gray-400 cursor-help"
              title="Optional: Provide the company's physical address"
            />
          </label>
          <textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="w-full p-3 border border-gray-200 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200"
            rows="4"
          ></textarea>
        </div>
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white p-3 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
        >
          {isEdit ? "Update Company" : "Create Company"}
        </button>
      </form>
    </div>
  );
};

export default CompanyForm;
