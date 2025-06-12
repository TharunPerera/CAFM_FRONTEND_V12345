import api from "./api";

export const propertyFlowService = {
  // Zone operations
  createZone: (zoneData, imageFile) => {
    const formData = new FormData();
    formData.append(
      "zone",
      new Blob([JSON.stringify(zoneData)], { type: "application/json" })
    );
    formData.append("image", imageFile);
    return api.post("/property-flow/zones", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },

  updateZone: (id, zoneData, imageFile) => {
    const formData = new FormData();
    formData.append(
      "zone",
      new Blob([JSON.stringify(zoneData)], { type: "application/json" })
    );
    if (imageFile) formData.append("image", imageFile);
    return api.put(`/property-flow/zones/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },

  deleteZone: (id) => api.delete(`/property-flow/zones/${id}`),
  getAllZonesByContract: (contractId) =>
    api.get(`/property-flow/zones/contract/${contractId}`),

  // SubZone operations
  createSubZone: (subZoneData, imageFile) => {
    const formData = new FormData();
    formData.append(
      "subZone",
      new Blob([JSON.stringify(subZoneData)], { type: "application/json" })
    );
    formData.append("image", imageFile);
    return api.post("/property-flow/sub-zones", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },

  updateSubZone: (id, subZoneData, imageFile) => {
    const formData = new FormData();
    formData.append(
      "subZone",
      new Blob([JSON.stringify(subZoneData)], { type: "application/json" })
    );
    if (imageFile) formData.append("image", imageFile);
    return api.put(`/property-flow/sub-zones/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },

  deleteSubZone: (id) => api.delete(`/property-flow/sub-zones/${id}`),
  getAllSubZonesByContract: (contractId) =>
    api.get(`/property-flow/sub-zones/contract/${contractId}`),

  // Building operations
  createBuilding: (buildingData, imageFile) => {
    const formData = new FormData();
    formData.append(
      "building",
      new Blob([JSON.stringify(buildingData)], { type: "application/json" })
    );
    formData.append("image", imageFile);
    return api.post("/property-flow/buildings", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },

  updateBuilding: (id, buildingData, imageFile) => {
    const formData = new FormData();
    formData.append(
      "building",
      new Blob([JSON.stringify(buildingData)], { type: "application/json" })
    );
    if (imageFile) formData.append("image", imageFile);
    return api.put(`/property-flow/buildings/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },

  deleteBuilding: (id) => api.delete(`/property-flow/buildings/${id}`),
  getAllBuildingsByContract: (contractId) =>
    api.get(`/property-flow/buildings/contract/${contractId}`),

  // VillaApartment operations
  createVillaApartment: (villaApartmentData, imageFile) => {
    const formData = new FormData();
    formData.append(
      "villaApartment",
      new Blob([JSON.stringify(villaApartmentData)], {
        type: "application/json",
      })
    );
    formData.append("image", imageFile);
    return api.post("/property-flow/villa-apartments", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },

  updateVillaApartment: (id, villaApartmentData, imageFile) => {
    const formData = new FormData();
    formData.append(
      "villaApartment",
      new Blob([JSON.stringify(villaApartmentData)], {
        type: "application/json",
      })
    );
    if (imageFile) formData.append("image", imageFile);
    return api.put(`/property-flow/villa-apartments/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },

  deleteVillaApartment: (id) =>
    api.delete(`/property-flow/villa-apartments/${id}`),
  getAllVillaApartmentsByContract: (contractId) =>
    api.get(`/property-flow/villa-apartments/contract/${contractId}`),

  // Floor operations
  createFloor: (floorData, imageFile) => {
    const formData = new FormData();
    formData.append(
      "floor",
      new Blob([JSON.stringify(floorData)], { type: "application/json" })
    );
    formData.append("image", imageFile);
    return api.post("/property-flow/floors", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },

  updateFloor: (id, floorData, imageFile) => {
    const formData = new FormData();
    formData.append(
      "floor",
      new Blob([JSON.stringify(floorData)], { type: "application/json" })
    );
    if (imageFile) formData.append("image", imageFile);
    return api.put(`/property-flow/floors/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },

  deleteFloor: (id) => api.delete(`/property-flow/floors/${id}`),
  getAllFloorsByContract: (contractId) =>
    api.get(`/property-flow/floors/contract/${contractId}`),

  // Room operations
  createRoom: (roomData, imageFile) => {
    const formData = new FormData();
    formData.append(
      "room",
      new Blob([JSON.stringify(roomData)], { type: "application/json" })
    );
    formData.append("image", imageFile);
    return api.post("/property-flow/rooms", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },

  updateRoom: (id, roomData, imageFile) => {
    const formData = new FormData();
    formData.append(
      "room",
      new Blob([JSON.stringify(roomData)], { type: "application/json" })
    );
    if (imageFile) formData.append("image", imageFile);
    return api.put(`/property-flow/rooms/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },

  deleteRoom: (id) => api.delete(`/property-flow/rooms/${id}`),
  getAllRoomsByContract: (contractId) =>
    api.get(`/property-flow/rooms/contract/${contractId}`),
};
