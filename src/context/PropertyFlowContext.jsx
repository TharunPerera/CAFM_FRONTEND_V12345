"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { propertyFlowService } from "../services/propertyFlowService";

const PropertyFlowContext = createContext();

export const usePropertyFlow = () => {
  const context = useContext(PropertyFlowContext);
  if (!context) {
    throw new Error(
      "usePropertyFlow must be used within a PropertyFlowProvider"
    );
  }
  return context;
};

export const PropertyFlowProvider = ({ children }) => {
  const [selectedContract, setSelectedContract] = useState(null);
  const [zones, setZones] = useState([]);
  const [subZones, setSubZones] = useState([]);
  const [buildings, setBuildings] = useState([]);
  const [villaApartments, setVillaApartments] = useState([]);
  const [floors, setFloors] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadPropertyData = async (contractId) => {
    if (!contractId) return;

    setLoading(true);
    try {
      const [
        zonesRes,
        subZonesRes,
        buildingsRes,
        villaApartmentsRes,
        floorsRes,
        roomsRes,
      ] = await Promise.all([
        propertyFlowService.getAllZonesByContract(contractId),
        propertyFlowService.getAllSubZonesByContract(contractId),
        propertyFlowService.getAllBuildingsByContract(contractId),
        propertyFlowService.getAllVillaApartmentsByContract(contractId),
        propertyFlowService.getAllFloorsByContract(contractId),
        propertyFlowService.getAllRoomsByContract(contractId),
      ]);

      setZones(zonesRes.data);
      setSubZones(subZonesRes.data);
      setBuildings(buildingsRes.data);
      setVillaApartments(villaApartmentsRes.data);
      setFloors(floorsRes.data);
      setRooms(roomsRes.data);
    } catch (error) {
      console.error("Error loading property data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectedContract) {
      loadPropertyData(selectedContract);
    }
  }, [selectedContract]);

  const refreshData = () => {
    if (selectedContract) {
      loadPropertyData(selectedContract);
    }
  };

  const value = {
    selectedContract,
    setSelectedContract,
    zones,
    subZones,
    buildings,
    villaApartments,
    floors,
    rooms,
    loading,
    refreshData,
    setZones,
    setSubZones,
    setBuildings,
    setVillaApartments,
    setFloors,
    setRooms,
  };

  return (
    <PropertyFlowContext.Provider value={value}>
      {children}
    </PropertyFlowContext.Provider>
  );
};
