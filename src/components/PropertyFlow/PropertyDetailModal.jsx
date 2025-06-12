"use client";

import { useState, useEffect, useRef } from "react";
import { X, MapPin, Calendar, User, ImageIcon, Navigation } from "lucide-react";

const PropertyDetailModal = ({ property, onClose }) => {
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);

  const getPropertyTypeName = (type) => {
    switch (type) {
      case "zone":
        return "Zone";
      case "subZone":
        return "SubZone";
      case "building":
        return "Building";
      case "villaApartment":
        return "Villa/Apartment";
      case "floor":
        return "Floor";
      case "room":
        return "Room";
      default:
        return "Property";
    }
  };

  const getPropertyName = (property) => {
    switch (property.type) {
      case "zone":
        return property.zoneName;
      case "subZone":
        return property.subZoneName;
      case "building":
        return property.buildingName;
      case "villaApartment":
        return property.villaApartmentName;
      case "floor":
        return property.floorName;
      case "room":
        return property.roomName;
      default:
        return "Unknown";
    }
  };

  // Initialize map when modal opens
  useEffect(() => {
    if (property.latitude && property.longitude) {
      // Check if Google Maps is already loaded
      if (window.google && window.google.maps) {
        setIsMapLoaded(true);
      } else {
        // Wait for Google Maps to load
        const checkGoogleMaps = setInterval(() => {
          if (window.google && window.google.maps) {
            setIsMapLoaded(true);
            clearInterval(checkGoogleMaps);
          }
        }, 100);
        return () => clearInterval(checkGoogleMaps);
      }
    }
  }, [property]);

  // Create map instance
  useEffect(() => {
    if (
      isMapLoaded &&
      mapRef.current &&
      !mapInstanceRef.current &&
      property.latitude &&
      property.longitude
    ) {
      try {
        const location = { lat: property.latitude, lng: property.longitude };

        mapInstanceRef.current = new window.google.maps.Map(mapRef.current, {
          center: location,
          zoom: 15,
          mapTypeControl: true,
          streetViewControl: true,
          fullscreenControl: true,
        });

        // Add marker
        new window.google.maps.Marker({
          position: location,
          map: mapInstanceRef.current,
          title: getPropertyName(property),
        });
      } catch (error) {
        console.error("Error initializing map in modal:", error);
      }
    }
  }, [isMapLoaded, property]);

  // Cleanup map when modal closes
  useEffect(() => {
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current = null;
      }
    };
  }, []);

  const openInGoogleMaps = () => {
    if (property.latitude && property.longitude) {
      const url = `https://www.google.com/maps?q=${property.latitude},${property.longitude}`;
      window.open(url, "_blank");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              {getPropertyTypeName(property.type)} Details
            </h2>
            <p className="text-gray-600 mt-1">{getPropertyName(property)}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-6 h-6 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <User className="w-5 h-5" />
                Basic Information
              </h3>

              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Name
                  </label>
                  <p className="mt-1 text-sm text-gray-900">
                    {getPropertyName(property)}
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Type
                  </label>
                  <p className="mt-1 text-sm text-gray-900">
                    {getPropertyTypeName(property.type)}
                  </p>
                </div>

                {property.description && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Description
                    </label>
                    <p className="mt-1 text-sm text-gray-900">
                      {property.description}
                    </p>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    ID
                  </label>
                  <p className="mt-1 text-sm text-gray-900">
                    {property[`${property.type}Id`]}
                  </p>
                </div>

                {property.createdAt && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      Created Date
                    </label>
                    <p className="mt-1 text-sm text-gray-900">
                      {new Date(property.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Image */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <ImageIcon className="w-5 h-5" />
                Image
              </h3>

              {property.imageUrl ? (
                <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
                  <img
                    src={property.imageUrl || "/placeholder.svg"}
                    alt={getPropertyName(property)}
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <ImageIcon className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-500">No image available</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Location Information */}
          {property.latitude && property.longitude && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  Location
                </h3>
                <button
                  onClick={openInGoogleMaps}
                  className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <Navigation className="w-4 h-4 mr-2" />
                  Open in Google Maps
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Latitude
                  </label>
                  <p className="mt-1 text-sm text-gray-900">
                    {property.latitude.toFixed(6)}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Longitude
                  </label>
                  <p className="mt-1 text-sm text-gray-900">
                    {property.longitude.toFixed(6)}
                  </p>
                </div>
              </div>

              {/* Map */}
              <div className="h-64 bg-gray-100 rounded-lg overflow-hidden">
                {isMapLoaded ? (
                  <div ref={mapRef} className="w-full h-full" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="text-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-4"></div>
                      <p className="text-gray-500">Loading map...</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Hierarchy Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">
              Hierarchy Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {property.contractId && (
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Contract ID
                  </label>
                  <p className="mt-1 text-sm text-gray-900">
                    {property.contractId}
                  </p>
                </div>
              )}

              {property.zoneId && (
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Zone ID
                  </label>
                  <p className="mt-1 text-sm text-gray-900">
                    {property.zoneId}
                  </p>
                </div>
              )}

              {property.subZoneId && (
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    SubZone ID
                  </label>
                  <p className="mt-1 text-sm text-gray-900">
                    {property.subZoneId}
                  </p>
                </div>
              )}

              {property.buildingId && (
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Building ID
                  </label>
                  <p className="mt-1 text-sm text-gray-900">
                    {property.buildingId}
                  </p>
                </div>
              )}

              {property.villaApartmentId && (
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Villa/Apartment ID
                  </label>
                  <p className="mt-1 text-sm text-gray-900">
                    {property.villaApartmentId}
                  </p>
                </div>
              )}

              {property.floorId && (
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Floor ID
                  </label>
                  <p className="mt-1 text-sm text-gray-900">
                    {property.floorId}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 p-6 border-t border-gray-200">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetailModal;
