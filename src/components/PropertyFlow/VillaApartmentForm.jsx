"use client";

import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Save, Upload } from "lucide-react";
import GoogleMapSelector from "../GoogleMapSelector";
import { propertyFlowService } from "../../services/propertyFlowService";
import { contractService } from "../../services/contractService";
import { usePropertyFlow } from "../../context/PropertyFlowContext";

const VillaApartmentForm = ({ isEdit = false }) => {
  const navigate = useNavigate();
  const { villaApartmentId } = useParams();
  const { refreshData } = usePropertyFlow();

  const [formData, setFormData] = useState({
    villaApartmentName: "",
    description: "",
    contractId: "",
    buildingId: "",
    latitude: null,
    longitude: null,
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [contracts, setContracts] = useState([]);
  const [availableBuildings, setAvailableBuildings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    loadContracts();
    if (isEdit && villaApartmentId) {
      loadVillaApartmentData();
    }
  }, [isEdit, villaApartmentId]);

  useEffect(() => {
    if (formData.contractId) {
      loadBuildingsForContract(formData.contractId);
    }
  }, [formData.contractId]);

  const loadContracts = async () => {
    try {
      const response = await contractService.getAllContracts();
      setContracts(response.data);
    } catch (error) {
      console.error("Error loading contracts:", error);
    }
  };

  const loadBuildingsForContract = async (contractId) => {
    try {
      const response = await propertyFlowService.getAllBuildingsByContract(
        contractId
      );
      setAvailableBuildings(response.data);
    } catch (error) {
      console.error("Error loading buildings:", error);
    }
  };

  const loadVillaApartmentData = async () => {
    setLoading(true);
    try {
      // Implementation for loading existing villa/apartment data
    } catch (error) {
      console.error("Error loading villa/apartment data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLocationSelect = (location) => {
    setFormData((prev) => ({
      ...prev,
      latitude: location.lat,
      longitude: location.lng,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.villaApartmentName ||
      !formData.contractId ||
      !formData.buildingId ||
      !imageFile ||
      !formData.latitude ||
      !formData.longitude
    ) {
      alert("Please fill in all required fields including image and location");
      return;
    }

    setSubmitting(true);
    try {
      if (isEdit) {
        await propertyFlowService.updateVillaApartment(
          villaApartmentId,
          formData,
          imageFile
        );
      } else {
        await propertyFlowService.createVillaApartment(formData, imageFile);
      }

      refreshData();
      navigate("/property-flow");
    } catch (error) {
      console.error("Error saving villa/apartment:", error);
      alert("Error saving villa/apartment. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">Loading...</div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate("/property-flow")}
          className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </button>
        <h1 className="text-2xl font-bold">
          {isEdit ? "Edit Villa/Apartment" : "Create New Villa/Apartment"}
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
              Villa/Apartment Information
            </h3>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label
                    htmlFor="contractId"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Contract *
                  </label>
                  <select
                    id="contractId"
                    name="contractId"
                    value={formData.contractId}
                    onChange={(e) => {
                      handleInputChange(e);
                      setFormData((prev) => ({ ...prev, buildingId: "" }));
                    }}
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  >
                    <option value="">Select a contract</option>
                    {contracts.map((contract) => (
                      <option
                        key={contract.contractId}
                        value={contract.contractId.toString()}
                      >
                        {contract.contractName}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="buildingId"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Building *
                  </label>
                  <select
                    id="buildingId"
                    name="buildingId"
                    value={formData.buildingId}
                    onChange={handleInputChange}
                    required
                    disabled={!formData.contractId}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm disabled:bg-gray-100"
                  >
                    <option value="">Select a building</option>
                    {availableBuildings.map((building) => (
                      <option
                        key={building.buildingId}
                        value={building.buildingId.toString()}
                      >
                        {building.buildingName}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="villaApartmentName"
                  className="block text-sm font-medium text-gray-700"
                >
                  Villa/Apartment Name *
                </label>
                <input
                  type="text"
                  id="villaApartmentName"
                  name="villaApartmentName"
                  value={formData.villaApartmentName}
                  onChange={handleInputChange}
                  placeholder="Enter villa/apartment name"
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Enter villa/apartment description"
                  rows={3}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="image"
                  className="block text-sm font-medium text-gray-700"
                >
                  Villa/Apartment Image *
                </label>
                <div className="flex items-center gap-4">
                  <input
                    type="file"
                    id="image"
                    accept="image/*"
                    onChange={handleImageChange}
                    required={!isEdit}
                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  />
                  <button
                    type="button"
                    onClick={() => document.getElementById("image").click()}
                    className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    Choose Image
                  </button>
                </div>
                {imagePreview && (
                  <div className="mt-2">
                    <img
                      src={imagePreview || "/placeholder.svg"}
                      alt="Preview"
                      className="w-32 h-32 object-cover rounded-lg border"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <GoogleMapSelector
          onLocationSelect={handleLocationSelect}
          initialLocation={
            formData.latitude && formData.longitude
              ? {
                  lat: formData.latitude,
                  lng: formData.longitude,
                }
              : null
          }
        />

        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={() => navigate("/property-flow")}
            className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={submitting}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Save className="w-4 h-4 mr-2" />
            {submitting
              ? "Saving..."
              : isEdit
              ? "Update Villa/Apartment"
              : "Create Villa/Apartment"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default VillaApartmentForm;
