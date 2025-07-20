// import api from "./api";

// export const assetService = {
//   getAllAssets: (pageable) => api.get("/assets", { params: pageable }),
//   getAssetById: (id) => api.get(`/assets/${id}`),
//   getAssetsByContract: (contractId) =>
//     api.get(`/assets/contract/${contractId}`),
//   createAsset: (assetData) => {
//     const formData = new FormData();

//     // Convert asset data to form data
//     formData.append("assetName", assetData.assetName);
//     formData.append("serialNumber", assetData.serialNumber || "");
//     formData.append("brandName", assetData.brandName || "");
//     formData.append("modelNumber", assetData.modelNumber || "");
//     formData.append("assetStatus", assetData.assetStatus);
//     formData.append("companyId", assetData.companyId);
//     formData.append("contractId", assetData.contractId);
//     formData.append("zoneId", assetData.zoneId);
//     formData.append("subZoneId", assetData.subZoneId);
//     formData.append("buildingId", assetData.buildingId);
//     formData.append("villaApartmentId", assetData.villaApartmentId);
//     formData.append("floorId", assetData.floorId);
//     formData.append("roomId", assetData.roomId);
//     formData.append("serviceId", assetData.serviceId);
//     formData.append("subServiceId", assetData.subServiceId);
//     formData.append("serviceScopeId", assetData.serviceScopeId);
//     formData.append("internalUserId", assetData.internalUserId);

//     if (assetData.purchaseDate) {
//       formData.append("purchaseDate", assetData.purchaseDate);
//     }

//     if (assetData.installationDate) {
//       formData.append("installationDate", assetData.installationDate);
//     }

//     if (assetData.warrantyPeriodDays) {
//       formData.append("warrantyPeriodDays", assetData.warrantyPeriodDays);
//     }

//     if (assetData.ownerType) {
//       formData.append("ownerType", assetData.ownerType);
//     }

//     if (assetData.lastAuditDate) {
//       formData.append("lastAuditDate", assetData.lastAuditDate);
//     }

//     if (assetData.expectedUsefulLifeDays) {
//       formData.append(
//         "expectedUsefulLifeDays",
//         assetData.expectedUsefulLifeDays
//       );
//     }

//     // Add images if available
//     if (assetData.images && assetData.images.length > 0) {
//       for (let i = 0; i < assetData.images.length; i++) {
//         formData.append("images", assetData.images[i]);
//       }
//     }

//     return api.post("/assets", formData, {
//       headers: {
//         "Content-Type": "multipart/form-data",
//       },
//     });
//   },
//   updateAsset: (id, assetData) => {
//     const formData = new FormData();

//     // Convert asset data to form data
//     formData.append("assetName", assetData.assetName);
//     formData.append("serialNumber", assetData.serialNumber || "");
//     formData.append("brandName", assetData.brandName || "");
//     formData.append("modelNumber", assetData.modelNumber || "");
//     formData.append("assetStatus", assetData.assetStatus);
//     formData.append("companyId", assetData.companyId);
//     formData.append("contractId", assetData.contractId);
//     formData.append("zoneId", assetData.zoneId);
//     formData.append("subZoneId", assetData.subZoneId);
//     formData.append("buildingId", assetData.buildingId);
//     formData.append("villaApartmentId", assetData.villaApartmentId);
//     formData.append("floorId", assetData.floorId);
//     formData.append("roomId", assetData.roomId);
//     formData.append("serviceId", assetData.serviceId);
//     formData.append("subServiceId", assetData.subServiceId);
//     formData.append("serviceScopeId", assetData.serviceScopeId);
//     formData.append("internalUserId", assetData.internalUserId);

//     if (assetData.purchaseDate) {
//       formData.append("purchaseDate", assetData.purchaseDate);
//     }

//     if (assetData.installationDate) {
//       formData.append("installationDate", assetData.installationDate);
//     }

//     if (assetData.warrantyPeriodDays) {
//       formData.append("warrantyPeriodDays", assetData.warrantyPeriodDays);
//     }

//     if (assetData.ownerType) {
//       formData.append("ownerType", assetData.ownerType);
//     }

//     if (assetData.lastAuditDate) {
//       formData.append("lastAuditDate", assetData.lastAuditDate);
//     }

//     if (assetData.expectedUsefulLifeDays) {
//       formData.append(
//         "expectedUsefulLifeDays",
//         assetData.expectedUsefulLifeDays
//       );
//     }

//     // Add images if available
//     if (assetData.images && assetData.images.length > 0) {
//       for (let i = 0; i < assetData.images.length; i++) {
//         formData.append("images", assetData.images[i]);
//       }
//     }

//     return api.put(`/assets/${id}`, formData, {
//       headers: {
//         "Content-Type": "multipart/form-data",
//       },
//     });
//   },
//   deleteAsset: (id) => api.delete(`/assets/${id}`),
// };

//////22222222223333333333

// import api from "./api";

// export const assetService = {
//   getAllAssets: (pageable) => api.get("/assets", { params: pageable }),
//   getAssetById: (id) => api.get(`/assets/${id}`),
//   getAssetsByContract: (contractId) =>
//     api.get(`/assets/contract/${contractId}`),
//   createAsset: (assetData) => {
//     const formData = new FormData();

//     // Convert asset data to form data
//     formData.append("assetName", assetData.assetName);
//     formData.append("serialNumber", assetData.serialNumber || "");
//     formData.append("brandName", assetData.brandName || "");
//     formData.append("modelNumber", assetData.modelNumber || "");
//     formData.append("assetStatus", assetData.assetStatus);
//     formData.append("companyId", assetData.companyId);
//     formData.append("contractId", assetData.contractId);
//     formData.append("zoneId", assetData.zoneId);
//     formData.append("subZoneId", assetData.subZoneId);
//     formData.append("buildingId", assetData.buildingId);
//     formData.append("villaApartmentId", assetData.villaApartmentId);
//     formData.append("floorId", assetData.floorId);
//     formData.append("roomId", assetData.roomId);
//     formData.append("serviceId", assetData.serviceId);
//     formData.append("subServiceId", assetData.subServiceId);
//     formData.append("serviceScopeId", assetData.serviceScopeId);
//     // Removed internalUserId - backend will use authenticated user's username

//     if (assetData.purchaseDate) {
//       formData.append("purchaseDate", assetData.purchaseDate);
//     }

//     if (assetData.installationDate) {
//       formData.append("installationDate", assetData.installationDate);
//     }

//     if (assetData.warrantyPeriodDays) {
//       formData.append("warrantyPeriodDays", assetData.warrantyPeriodDays);
//     }

//     if (assetData.ownerType) {
//       formData.append("ownerType", assetData.ownerType);
//     }

//     if (assetData.lastAuditDate) {
//       formData.append("lastAuditDate", assetData.lastAuditDate);
//     }

//     if (assetData.expectedUsefulLifeDays) {
//       formData.append(
//         "expectedUsefulLifeDays",
//         assetData.expectedUsefulLifeDays
//       );
//     }

//     // Add images if available
//     if (assetData.images && assetData.images.length > 0) {
//       for (let i = 0; i < assetData.images.length; i++) {
//         formData.append("images", assetData.images[i]);
//       }
//     }

//     return api.post("/assets", formData, {
//       headers: {
//         "Content-Type": "multipart/form-data",
//       },
//     });
//   },
//   updateAsset: (id, assetData) => {
//     const formData = new FormData();

//     // Convert asset data to form data
//     formData.append("assetName", assetData.assetName);
//     formData.append("serialNumber", assetData.serialNumber || "");
//     formData.append("brandName", assetData.brandName || "");
//     formData.append("modelNumber", assetData.modelNumber || "");
//     formData.append("assetStatus", assetData.assetStatus);
//     formData.append("companyId", assetData.companyId);
//     formData.append("contractId", assetData.contractId);
//     formData.append("zoneId", assetData.zoneId);
//     formData.append("subZoneId", assetData.subZoneId);
//     formData.append("buildingId", assetData.buildingId);
//     formData.append("villaApartmentId", assetData.villaApartmentId);
//     formData.append("floorId", assetData.floorId);
//     formData.append("roomId", assetData.roomId);
//     formData.append("serviceId", assetData.serviceId);
//     formData.append("subServiceId", assetData.subServiceId);
//     formData.append("serviceScopeId", assetData.serviceScopeId);
//     // Removed internalUserId - backend will use authenticated user's username

//     if (assetData.purchaseDate) {
//       formData.append("purchaseDate", assetData.purchaseDate);
//     }

//     if (assetData.installationDate) {
//       formData.append("installationDate", assetData.installationDate);
//     }

//     if (assetData.warrantyPeriodDays) {
//       formData.append("warrantyPeriodDays", assetData.warrantyPeriodDays);
//     }

//     if (assetData.ownerType) {
//       formData.append("ownerType", assetData.ownerType);
//     }

//     if (assetData.lastAuditDate) {
//       formData.append("lastAuditDate", assetData.lastAuditDate);
//     }

//     if (assetData.expectedUsefulLifeDays) {
//       formData.append(
//         "expectedUsefulLifeDays",
//         assetData.expectedUsefulLifeDays
//       );
//     }

//     // Add images if available
//     if (assetData.images && assetData.images.length > 0) {
//       for (let i = 0; i < assetData.images.length; i++) {
//         formData.append("images", assetData.images[i]);
//       }
//     }

//     return api.put(`/assets/${id}`, formData, {
//       headers: {
//         "Content-Type": "multipart/form-data",
//       },
//     });
//   },
//   deleteAsset: (id) => api.delete(`/assets/${id}`),
// };

// ///22222255
// import api from "./api";

// export const assetService = {
//   getAllAssets: (pageable) => api.get("/assets", { params: pageable }),
//   getAssetById: (id) => api.get(`/assets/${id}`),
//   getAssetsByContract: (contractId) =>
//     api.get(`/assets/contract/${contractId}`),
//   exportAssetsCSV: () => api.get("/assets/export", { responseType: "blob" }),
//   createAsset: (assetData) => {
//     const formData = new FormData();

//     // Convert asset data to form data
//     formData.append("assetName", assetData.assetName);
//     formData.append("serialNumber", assetData.serialNumber || "");
//     formData.append("brandName", assetData.brandName || "");
//     formData.append("modelNumber", assetData.modelNumber || "");
//     formData.append("assetStatus", assetData.assetStatus);
//     formData.append("companyId", assetData.companyId);
//     formData.append("contractId", assetData.contractId);
//     formData.append("zoneId", assetData.zoneId);
//     formData.append("subZoneId", assetData.subZoneId);
//     formData.append("buildingId", assetData.buildingId);
//     formData.append("villaApartmentId", assetData.villaApartmentId);
//     formData.append("floorId", assetData.floorId);
//     formData.append("roomId", assetData.roomId);
//     formData.append("serviceId", assetData.serviceId);
//     formData.append("subServiceId", assetData.subServiceId);
//     formData.append("serviceScopeId", assetData.serviceScopeId);
//     // Removed internalUserId - backend will use authenticated user's username

//     if (assetData.purchaseDate) {
//       formData.append("purchaseDate", assetData.purchaseDate);
//     }

//     if (assetData.installationDate) {
//       formData.append("installationDate", assetData.installationDate);
//     }

//     if (assetData.warrantyPeriodDays) {
//       formData.append("warrantyPeriodDays", assetData.warrantyPeriodDays);
//     }

//     if (assetData.ownerType) {
//       formData.append("ownerType", assetData.ownerType);
//     }

//     if (assetData.lastAuditDate) {
//       formData.append("lastAuditDate", assetData.lastAuditDate);
//     }

//     if (assetData.expectedUsefulLifeDays) {
//       formData.append(
//         "expectedUsefulLifeDays",
//         assetData.expectedUsefulLifeDays
//       );
//     }

//     // Add images if available
//     if (assetData.images && assetData.images.length > 0) {
//       for (let i = 0; i < assetData.images.length; i++) {
//         formData.append("images", assetData.images[i]);
//       }
//     }

//     return api.post("/assets", formData, {
//       headers: {
//         "Content-Type": "multipart/form-data",
//       },
//     });
//   },
//   updateAsset: (id, assetData) => {
//     const formData = new FormData();

//     // Convert asset data to form data
//     formData.append("assetName", assetData.assetName);
//     formData.append("serialNumber", assetData.serialNumber || "");
//     formData.append("brandName", assetData.brandName || "");
//     formData.append("modelNumber", assetData.modelNumber || "");
//     formData.append("assetStatus", assetData.assetStatus);
//     formData.append("companyId", assetData.companyId);
//     formData.append("contractId", assetData.contractId);
//     formData.append("zoneId", assetData.zoneId);
//     formData.append("subZoneId", assetData.subZoneId);
//     formData.append("buildingId", assetData.buildingId);
//     formData.append("villaApartmentId", assetData.villaApartmentId);
//     formData.append("floorId", assetData.floorId);
//     formData.append("roomId", assetData.roomId);
//     formData.append("serviceId", assetData.serviceId);
//     formData.append("subServiceId", assetData.subServiceId);
//     formData.append("serviceScopeId", assetData.serviceScopeId);
//     // Removed internalUserId - backend will use authenticated user's username

//     if (assetData.purchaseDate) {
//       formData.append("purchaseDate", assetData.purchaseDate);
//     }

//     if (assetData.installationDate) {
//       formData.append("installationDate", assetData.installationDate);
//     }

//     if (assetData.warrantyPeriodDays) {
//       formData.append("warrantyPeriodDays", assetData.warrantyPeriodDays);
//     }

//     if (assetData.ownerType) {
//       formData.append("ownerType", assetData.ownerType);
//     }

//     if (assetData.lastAuditDate) {
//       formData.append("lastAuditDate", assetData.lastAuditDate);
//     }

//     if (assetData.expectedUsefulLifeDays) {
//       formData.append(
//         "expectedUsefulLifeDays",
//         assetData.expectedUsefulLifeDays
//       );
//     }

//     // Add existing image URLs if available
//     if (assetData.existingImageUrls && assetData.existingImageUrls.length > 0) {
//       formData.append(
//         "existingImageUrls",
//         JSON.stringify(assetData.existingImageUrls)
//       );
//     }

//     // Add new images if available
//     if (assetData.images && assetData.images.length > 0) {
//       for (let i = 0; i < assetData.images.length; i++) {
//         formData.append("images", assetData.images[i]);
//       }
//     }

//     return api.put(`/assets/${id}`, formData, {
//       headers: {
//         "Content-Type": "multipart/form-data",
//       },
//     });
//   },
//   deleteAsset: (id) => api.delete(`/assets/${id}`),
//   generateQRCode: (assetId) =>
//     api.get(`/assets/${assetId}/qrcode`, { responseType: "blob" }),
// };

///chnage now
// import api from "./api";

// export const assetService = {
//   getAllAssets: (pageable) => api.get("/assets", { params: pageable }),
//   getAssetById: (id) => api.get(`/assets/${id}`),
//   getAssetsByContract: (contractId) =>
//     api.get(`/assets/contract/${contractId}`),
//   exportAssetsCSV: () => {
//     // Get the token
//     const token = localStorage.getItem("token");

//     return api.get("/assets/export", {
//       responseType: "blob",
//       headers: {
//         Accept: "text/csv",
//         Authorization: `Bearer ${token}`,
//       },
//     });
//   },
//   createAsset: (assetData) => {
//     const formData = new FormData();

//     // Convert asset data to form data
//     formData.append("assetName", assetData.assetName);
//     formData.append("serialNumber", assetData.serialNumber || "");
//     formData.append("brandName", assetData.brandName || "");
//     formData.append("modelNumber", assetData.modelNumber || "");
//     formData.append("assetStatus", assetData.assetStatus);
//     formData.append("companyId", assetData.companyId);
//     formData.append("contractId", assetData.contractId);
//     formData.append("zoneId", assetData.zoneId);
//     formData.append("subZoneId", assetData.subZoneId);
//     formData.append("buildingId", assetData.buildingId);
//     formData.append("villaApartmentId", assetData.villaApartmentId);
//     formData.append("floorId", assetData.floorId);
//     formData.append("roomId", assetData.roomId);
//     formData.append("serviceId", assetData.serviceId);
//     formData.append("subServiceId", assetData.subServiceId);
//     formData.append("serviceScopeId", assetData.serviceScopeId);
//     // Removed internalUserId - backend will use authenticated user's username

//     if (assetData.purchaseDate) {
//       formData.append("purchaseDate", assetData.purchaseDate);
//     }

//     if (assetData.installationDate) {
//       formData.append("installationDate", assetData.installationDate);
//     }

//     if (assetData.warrantyPeriodDays) {
//       formData.append("warrantyPeriodDays", assetData.warrantyPeriodDays);
//     }

//     if (assetData.ownerType) {
//       formData.append("ownerType", assetData.ownerType);
//     }

//     if (assetData.lastAuditDate) {
//       formData.append("lastAuditDate", assetData.lastAuditDate);
//     }

//     if (assetData.expectedUsefulLifeDays) {
//       formData.append(
//         "expectedUsefulLifeDays",
//         assetData.expectedUsefulLifeDays
//       );
//     }

//     // Add images if available
//     if (assetData.images && assetData.images.length > 0) {
//       for (let i = 0; i < assetData.images.length; i++) {
//         formData.append("images", assetData.images[i]);
//       }
//     }

//     return api.post("/assets", formData, {
//       headers: {
//         "Content-Type": "multipart/form-data",
//       },
//     });
//   },
//   updateAsset: (id, assetData) => {
//     const formData = new FormData();

//     // Convert asset data to form data
//     formData.append("assetName", assetData.assetName);
//     formData.append("serialNumber", assetData.serialNumber || "");
//     formData.append("brandName", assetData.brandName || "");
//     formData.append("modelNumber", assetData.modelNumber || "");
//     formData.append("assetStatus", assetData.assetStatus);
//     formData.append("companyId", assetData.companyId);
//     formData.append("contractId", assetData.contractId);
//     formData.append("zoneId", assetData.zoneId);
//     formData.append("subZoneId", assetData.subZoneId);
//     formData.append("buildingId", assetData.buildingId);
//     formData.append("villaApartmentId", assetData.villaApartmentId);
//     formData.append("floorId", assetData.floorId);
//     formData.append("roomId", assetData.roomId);
//     formData.append("serviceId", assetData.serviceId);
//     formData.append("subServiceId", assetData.subServiceId);
//     formData.append("serviceScopeId", assetData.serviceScopeId);
//     // Removed internalUserId - backend will use authenticated user's username

//     if (assetData.purchaseDate) {
//       formData.append("purchaseDate", assetData.purchaseDate);
//     }

//     if (assetData.installationDate) {
//       formData.append("installationDate", assetData.installationDate);
//     }

//     if (assetData.warrantyPeriodDays) {
//       formData.append("warrantyPeriodDays", assetData.warrantyPeriodDays);
//     }

//     if (assetData.ownerType) {
//       formData.append("ownerType", assetData.ownerType);
//     }

//     if (assetData.lastAuditDate) {
//       formData.append("lastAuditDate", assetData.lastAuditDate);
//     }

//     if (assetData.expectedUsefulLifeDays) {
//       formData.append(
//         "expectedUsefulLifeDays",
//         assetData.expectedUsefulLifeDays
//       );
//     }

//     // Add existing image URLs if available
//     if (assetData.existingImageUrls && assetData.existingImageUrls.length > 0) {
//       formData.append(
//         "existingImageUrls",
//         JSON.stringify(assetData.existingImageUrls)
//       );
//     }

//     // Add new images if available
//     if (assetData.images && assetData.images.length > 0) {
//       for (let i = 0; i < assetData.images.length; i++) {
//         formData.append("images", assetData.images[i]);
//       }
//     }

//     return api.put(`/assets/${id}`, formData, {
//       headers: {
//         "Content-Type": "multipart/form-data",
//       },
//     });
//   },
//   deleteAsset: (id) => api.delete(`/assets/${id}`),
//   generateQRCode: (assetId) =>
//     api.get(`/assets/${assetId}/qrcode`, { responseType: "blob" }),
// };

// import api from "./api";

// export const assetService = {
//   getAllAssets: (pageable) => api.get("/assets", { params: pageable }),

//   getAssetById: (id) => api.get(`/assets/${id}`),

//   getAssetsByContract: (contractId) =>
//     api.get(`/assets/contract/${contractId}`),

//   getSubServicesByContract: (contractId) =>
//     api.get(`/assets/contract/${contractId}/subservices`),

//   getServiceScopesByContractAndSubService: (contractId, subServiceId) =>
//     api.get(`/assets/contract/${contractId}/subservice/${subServiceId}/scopes`),

//   exportAssetsCSV: (contractId) => {
//     const token = localStorage.getItem("token");
//     return api.get(`/assets/export-csv/${contractId}`, {
//       responseType: "blob",
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });
//   },

//   createAsset: (assetData) => {
//     const formData = new FormData();
//     formData.append("assetName", assetData.assetName);
//     formData.append("serialNumber", assetData.serialNumber || "");
//     formData.append("brandName", assetData.brandName || "");
//     formData.append("modelNumber", assetData.modelNumber || "");
//     formData.append("assetStatus", assetData.assetStatus);
//     formData.append("companyId", assetData.companyId);
//     formData.append("contractId", assetData.contractId);
//     formData.append("zoneId", assetData.zoneId);
//     formData.append("subZoneId", assetData.subZoneId);
//     formData.append("buildingId", assetData.buildingId);
//     formData.append("villaApartmentId", assetData.villaApartmentId);
//     formData.append("floorId", assetData.floorId);
//     formData.append("roomId", assetData.roomId);
//     formData.append("serviceId", assetData.serviceId);
//     formData.append("subServiceId", assetData.subServiceId);
//     // Append multiple serviceScopeIds as an array
//     assetData.serviceScopeIds.forEach((scopeId) => {
//       formData.append("serviceScopeIds[]", scopeId);
//     });
//     formData.append("purchaseDate", assetData.purchaseDate || "");
//     formData.append("installationDate", assetData.installationDate || "");
//     formData.append("warrantyPeriodDays", assetData.warrantyPeriodDays || "");
//     formData.append("ownerType", assetData.ownerType);
//     formData.append("lastAuditDate", assetData.lastAuditDate || "");
//     formData.append(
//       "expectedUsefulLifeDays",
//       assetData.expectedUsefulLifeDays || ""
//     );

//     // Append images
//     if (assetData.images && assetData.images.length > 0) {
//       assetData.images.forEach((image, index) => {
//         formData.append("images", image);
//       });
//     }

//     formData.append("appendImages", assetData.appendImages || true);

//     return api.post("/assets", formData, {
//       headers: {
//         "Content-Type": "multipart/form-data",
//       },
//     });
//   },

//   updateAsset: (id, assetData) => {
//     const formData = new FormData();
//     formData.append("assetName", assetData.assetName);
//     formData.append("serialNumber", assetData.serialNumber || "");
//     formData.append("brandName", assetData.brandName || "");
//     formData.append("modelNumber", assetData.modelNumber || "");
//     formData.append("assetStatus", assetData.assetStatus);
//     formData.append("companyId", assetData.companyId);
//     formData.append("contractId", assetData.contractId);
//     formData.append("zoneId", assetData.zoneId);
//     formData.append("subZoneId", assetData.subZoneId);
//     formData.append("buildingId", assetData.buildingId);
//     formData.append("villaApartmentId", assetData.villaApartmentId);
//     formData.append("floorId", assetData.floorId);
//     formData.append("roomId", assetData.roomId);
//     formData.append("serviceId", assetData.serviceId);
//     formData.append("subServiceId", assetData.subServiceId);
//     // Append multiple serviceScopeIds as an array
//     assetData.serviceScopeIds.forEach((scopeId) => {
//       formData.append("serviceScopeIds[]", scopeId);
//     });
//     formData.append("purchaseDate", assetData.purchaseDate || "");
//     formData.append("installationDate", assetData.installationDate || "");
//     formData.append("warrantyPeriodDays", assetData.warrantyPeriodDays || "");
//     formData.append("ownerType", assetData.ownerType);
//     formData.append("lastAuditDate", assetData.lastAuditDate || "");
//     formData.append(
//       "expectedUsefulLifeDays",
//       assetData.expectedUsefulLifeDays || ""
//     );

//     // Append images
//     if (assetData.images && assetData.images.length > 0) {
//       assetData.images.forEach((image, index) => {
//         formData.append("images", image);
//       });
//     }

//     // Append images to remove
//     if (assetData.imagesToRemove && assetData.imagesToRemove.length > 0) {
//       assetData.imagesToRemove.forEach((imageUrl) => {
//         formData.append("imagesToRemove[]", imageUrl);
//       });
//     }

//     formData.append("appendImages", assetData.appendImages || true);

//     return api.put(`/assets/${id}`, formData, {
//       headers: {
//         "Content-Type": "multipart/form-data",
//       },
//     });
//   },

//   deleteAsset: (id) => api.delete(`/assets/${id}`),

//   getAssetAuditLogs: (id, pageable) =>
//     api.get(`/assets/${id}/audit-logs`, { params: pageable }),
// };

// import api from "./api";

// export const assetService = {
//   getAllAssets: (pageable) => api.get("/assets", { params: pageable }),

//   getAssetById: (id) => api.get(`/assets/${id}`),

//   getAssetsByContract: (contractId) =>
//     api.get(`/assets/contract/${contractId}`),

//   getSubServicesByContract: (contractId) =>
//     api.get(`/assets/contract/${contractId}/subservices`),

//   getServiceScopesByContractAndSubService: (contractId, subServiceId) =>
//     api.get(`/assets/contract/${contractId}/subservice/${subServiceId}/scopes`),

//   exportAssetsCSV: (contractId) => {
//     const token = localStorage.getItem("token");
//     return api.get(`/assets/export-csv/${contractId}`, {
//       responseType: "blob",
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });
//   },

//   generateAssetQRCode: (id) => {
//     const token = localStorage.getItem("token");
//     return api.get(`/assets/${id}/qr-code`, {
//       responseType: "blob",
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });
//   },

//   createAsset: (assetData) => {
//     const formData = new FormData();
//     formData.append("assetName", assetData.assetName);
//     formData.append("serialNumber", assetData.serialNumber || "");
//     formData.append("brandName", assetData.brandName || "");
//     formData.append("modelNumber", assetData.modelNumber || "");
//     formData.append("assetStatus", assetData.assetStatus);
//     formData.append("companyId", assetData.companyId);
//     formData.append("contractId", assetData.contractId);
//     formData.append("zoneId", assetData.zoneId);
//     formData.append("subZoneId", assetData.subZoneId);
//     formData.append("buildingId", assetData.buildingId);
//     formData.append("villaApartmentId", assetData.villaApartmentId);
//     formData.append("floorId", assetData.floorId);
//     formData.append("roomId", assetData.roomId);
//     formData.append("serviceId", assetData.serviceId);
//     formData.append("subServiceId", assetData.subServiceId);
//     assetData.serviceScopeIds.forEach((scopeId) => {
//       formData.append("serviceScopeIds[]", scopeId);
//     });
//     formData.append("purchaseDate", assetData.purchaseDate || "");
//     formData.append("installationDate", assetData.installationDate || "");
//     formData.append("warrantyPeriodDays", assetData.warrantyPeriodDays || "");
//     formData.append("ownerType", assetData.ownerType);
//     formData.append("lastAuditDate", assetData.lastAuditDate || "");
//     formData.append(
//       "expectedUsefulLifeDays",
//       assetData.expectedUsefulLifeDays || ""
//     );

//     if (assetData.images && assetData.images.length > 0) {
//       assetData.images.forEach((image, index) => {
//         formData.append("images", image);
//       });
//     }

//     formData.append("appendImages", assetData.appendImages || true);

//     return api.post("/assets", formData, {
//       headers: {
//         "Content-Type": "multipart/form-data",
//       },
//     });
//   },

//   updateAsset: (id, assetData) => {
//     const formData = new FormData();
//     formData.append("assetName", assetData.assetName);
//     formData.append("serialNumber", assetData.serialNumber || "");
//     formData.append("brandName", assetData.brandName || "");
//     formData.append("modelNumber", assetData.modelNumber || "");
//     formData.append("assetStatus", assetData.assetStatus);
//     formData.append("companyId", assetData.companyId);
//     formData.append("contractId", assetData.contractId);
//     formData.append("zoneId", assetData.zoneId);
//     formData.append("subZoneId", assetData.subZoneId);
//     formData.append("buildingId", assetData.buildingId);
//     formData.append("villaApartmentId", assetData.villaApartmentId);
//     formData.append("floorId", assetData.floorId);
//     formData.append("roomId", assetData.roomId);
//     formData.append("serviceId", assetData.serviceId);
//     formData.append("subServiceId", assetData.subServiceId);
//     assetData.serviceScopeIds.forEach((scopeId) => {
//       formData.append("serviceScopeIds[]", scopeId);
//     });
//     formData.append("purchaseDate", assetData.purchaseDate || "");
//     formData.append("installationDate", assetData.installationDate || "");
//     formData.append("warrantyPeriodDays", assetData.warrantyPeriodDays || "");
//     formData.append("ownerType", assetData.ownerType);
//     formData.append("lastAuditDate", assetData.lastAuditDate || "");
//     formData.append(
//       "expectedUsefulLifeDays",
//       assetData.expectedUsefulLifeDays || ""
//     );

//     if (assetData.images && assetData.images.length > 0) {
//       assetData.images.forEach((image, index) => {
//         formData.append("images", image);
//       });
//     }

//     if (assetData.imagesToRemove && assetData.imagesToRemove.length > 0) {
//       assetData.imagesToRemove.forEach((imageUrl) => {
//         formData.append("imagesToRemove[]", imageUrl);
//       });
//     }

//     formData.append("appendImages", assetData.appendImages || true);

//     return api.put(`/assets/${id}`, formData, {
//       headers: {
//         "Content-Type": "multipart/form-data",
//       },
//     });
//   },

//   deleteAsset: (id) => api.delete(`/assets/${id}`),

//   getAssetAuditLogs: (id, pageable) =>
//     api.get(`/assets/${id}/audit-logs`, { params: pageable }),
// };

// import api from "./api";

// export const assetService = {
//   getAllAssets: (pageable) => api.get("/assets", { params: pageable }),
//   getAssetById: (id) => api.get(`/assets/${id}`),
//   getAssetsByContract: (contractId) =>
//     api.get(`/assets/contract/${contractId}`),
//   getSubServicesByContract: (contractId) =>
//     api.get(`/assets/contract/${contractId}/subservices`),
//   getServiceScopesByContractAndSubService: (contractId, subServiceId) =>
//     api.get(`/assets/contract/${contractId}/subservice/${subServiceId}/scopes`),
//   exportAssetsCSV: (contractId) => {
//     const token = localStorage.getItem("token");
//     return api.get(`/assets/export-csv/${contractId}`, {
//       responseType: "blob",
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });
//   },
//   generateAssetQRCode: (id) => {
//     const token = localStorage.getItem("token");
//     return api.get(`/assets/${id}/qr-code`, {
//       responseType: "blob",
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });
//   },
//   createAsset: (assetData) => {
//     const formData = new FormData();

//     // Basic Information
//     formData.append("assetName", assetData.assetName);
//     formData.append("serialNumber", assetData.serialNumber || "");
//     formData.append("brandName", assetData.brandName || "");
//     formData.append("modelNumber", assetData.modelNumber || "");
//     formData.append("assetStatus", assetData.assetStatus);
//     formData.append("assetCondition", assetData.assetCondition); // New field
//     formData.append("observation", assetData.observation || ""); // New field
//     formData.append("recommendation", assetData.recommendation || ""); // New field

//     // Financial Information - New fields
//     if (assetData.purchaseCost) {
//       formData.append("purchaseCost", assetData.purchaseCost);
//     }
//     if (assetData.depreciationValue) {
//       formData.append("depreciationValue", assetData.depreciationValue);
//     }
//     if (assetData.depreciationType) {
//       formData.append("depreciationType", assetData.depreciationType);
//     }
//     if (assetData.timeFrameYears) {
//       formData.append("timeFrameYears", assetData.timeFrameYears);
//     }

//     // Location and Organization
//     formData.append("companyId", assetData.companyId);
//     formData.append("contractId", assetData.contractId);
//     formData.append("zoneId", assetData.zoneId);
//     formData.append("subZoneId", assetData.subZoneId);
//     formData.append("buildingId", assetData.buildingId);
//     formData.append("villaApartmentId", assetData.villaApartmentId);
//     formData.append("floorId", assetData.floorId);
//     formData.append("roomId", assetData.roomId);

//     // Service Information
//     formData.append("serviceId", assetData.serviceId);
//     formData.append("subServiceId", assetData.subServiceId);
//     assetData.serviceScopeIds.forEach((scopeId) => {
//       formData.append("serviceScopeIds", scopeId); // Changed from serviceScopeIds[] to serviceScopeIds
//     });

//     // Lifecycle Information
//     formData.append("purchaseDate", assetData.purchaseDate || "");
//     formData.append("installationDate", assetData.installationDate || "");
//     formData.append("warrantyPeriodDays", assetData.warrantyPeriodDays || "");
//     formData.append("ownerType", assetData.ownerType);
//     formData.append("lastAuditDate", assetData.lastAuditDate || "");

//     // Images
//     if (assetData.images && assetData.images.length > 0) {
//       assetData.images.forEach((image) => {
//         formData.append("images", image);
//       });
//     }

//     formData.append("appendImages", assetData.appendImages || true);

//     return api.post("/assets", formData, {
//       headers: {
//         "Content-Type": "multipart/form-data",
//       },
//     });
//   },

//   updateAsset: (id, assetData) => {
//     const formData = new FormData();

//     // Basic Information
//     formData.append("assetName", assetData.assetName);
//     formData.append("serialNumber", assetData.serialNumber || "");
//     formData.append("brandName", assetData.brandName || "");
//     formData.append("modelNumber", assetData.modelNumber || "");
//     formData.append("assetStatus", assetData.assetStatus);
//     formData.append("assetCondition", assetData.assetCondition); // New field
//     formData.append("observation", assetData.observation || ""); // New field
//     formData.append("recommendation", assetData.recommendation || ""); // New field

//     // Financial Information - New fields
//     if (assetData.purchaseCost) {
//       formData.append("purchaseCost", assetData.purchaseCost);
//     }
//     if (assetData.depreciationValue) {
//       formData.append("depreciationValue", assetData.depreciationValue);
//     }
//     if (assetData.depreciationType) {
//       formData.append("depreciationType", assetData.depreciationType);
//     }
//     if (assetData.timeFrameYears) {
//       formData.append("timeFrameYears", assetData.timeFrameYears);
//     }

//     // Location and Organization
//     formData.append("companyId", assetData.companyId);
//     formData.append("contractId", assetData.contractId);
//     formData.append("zoneId", assetData.zoneId);
//     formData.append("subZoneId", assetData.subZoneId);
//     formData.append("buildingId", assetData.buildingId);
//     formData.append("villaApartmentId", assetData.villaApartmentId);
//     formData.append("floorId", assetData.floorId);
//     formData.append("roomId", assetData.roomId);

//     // Service Information
//     formData.append("serviceId", assetData.serviceId);
//     formData.append("subServiceId", assetData.subServiceId);
//     assetData.serviceScopeIds.forEach((scopeId) => {
//       formData.append("serviceScopeIds", scopeId); // Changed from serviceScopeIds[] to serviceScopeIds
//     });

//     // Lifecycle Information
//     formData.append("purchaseDate", assetData.purchaseDate || "");
//     formData.append("installationDate", assetData.installationDate || "");
//     formData.append("warrantyPeriodDays", assetData.warrantyPeriodDays || "");
//     formData.append("ownerType", assetData.ownerType);
//     formData.append("lastAuditDate", assetData.lastAuditDate || "");

//     // Images
//     if (assetData.images && assetData.images.length > 0) {
//       assetData.images.forEach((image) => {
//         formData.append("images", image);
//       });
//     }

//     // Images to remove
//     if (assetData.imagesToRemove && assetData.imagesToRemove.length > 0) {
//       assetData.imagesToRemove.forEach((imageUrl) => {
//         formData.append("imagesToRemove", imageUrl); // Changed from imagesToRemove[] to imagesToRemove
//       });
//     }

//     formData.append("appendImages", assetData.appendImages || true);

//     return api.put(`/assets/${id}`, formData, {
//       headers: {
//         "Content-Type": "multipart/form-data",
//       },
//     });
//   },

//   deleteAsset: (id) => api.delete(`/assets/${id}`),
//   getAssetAuditLogs: (id, pageable) =>
//     api.get(`/assets/${id}/audit-logs`, { params: pageable }),
// };

import api from "./api";

export const assetService = {
  getAllAssets: (pageable) => api.get("/assets", { params: pageable }),

  getAssetById: (id) => api.get(`/assets/${id}`),

  getAssetsByContract: (contractId) =>
    api.get(`/assets/contract/${contractId}`),

  getSubServicesByContract: (contractId) =>
    api.get(`/assets/contract/${contractId}/subservices`),

  getServiceScopesByContractAndSubService: (contractId, subServiceId) =>
    api.get(`/assets/contract/${contractId}/subservice/${subServiceId}/scopes`),

  exportAssetsCSV: (contractId) => {
    const token = localStorage.getItem("token");
    return api.get(`/assets/export-csv/${contractId}`, {
      responseType: "blob",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },

  generateAssetQRCode: (id) => {
    const token = localStorage.getItem("token");
    return api.get(`/assets/${id}/qr-code`, {
      responseType: "blob",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },

  // New PDF report data endpoint
  getAssetPdfReportData: (requestData) => {
    return api.post("/assets/pdf-report-data", requestData);
  },

  // Enhanced asset filtering by location
  getAssetsByLocation: (filters, pageable) => {
    const params = { ...pageable, ...filters };
    return api.get("/assets/filter", { params });
  },

  // Bulk asset operations
  bulkUpdateAssets: (assetIds, updateData) => {
    return api.put("/assets/bulk-update", {
      assetIds,
      updateData,
    });
  },

  bulkDeleteAssets: (assetIds) => {
    return api.delete("/assets/bulk-delete", {
      data: { assetIds },
    });
  },

  // Asset statistics
  getAssetStatistics: (contractId) => {
    return api.get(
      `/assets/statistics${contractId ? `?contractId=${contractId}` : ""}`
    );
  },

  // Asset audit logs
  getAssetAuditLogs: (id, pageable) =>
    api.get(`/assets/${id}/audit-logs`, { params: pageable }),

  createAsset: (assetData) => {
    const formData = new FormData();

    // Basic Information
    formData.append("assetName", assetData.assetName);
    formData.append("serialNumber", assetData.serialNumber || "");
    formData.append("brandName", assetData.brandName || "");
    formData.append("modelNumber", assetData.modelNumber || "");
    formData.append("assetStatus", assetData.assetStatus);
    formData.append("assetCondition", assetData.assetCondition);
    formData.append("observation", assetData.observation || "");
    formData.append("recommendation", assetData.recommendation || "");

    // Financial Information
    if (assetData.purchaseCost) {
      formData.append("purchaseCost", assetData.purchaseCost);
    }
    if (assetData.depreciationValue) {
      formData.append("depreciationValue", assetData.depreciationValue);
    }
    if (assetData.depreciationType) {
      formData.append("depreciationType", assetData.depreciationType);
    }
    if (assetData.timeFrameYears) {
      formData.append("timeFrameYears", assetData.timeFrameYears);
    }

    // Location and Organization
    formData.append("companyId", assetData.companyId);
    formData.append("contractId", assetData.contractId);
    formData.append("zoneId", assetData.zoneId);
    formData.append("subZoneId", assetData.subZoneId);
    formData.append("buildingId", assetData.buildingId);
    formData.append("villaApartmentId", assetData.villaApartmentId);
    formData.append("floorId", assetData.floorId);
    formData.append("roomId", assetData.roomId);

    // Service Information
    formData.append("serviceId", assetData.serviceId);
    formData.append("subServiceId", assetData.subServiceId);
    assetData.serviceScopeIds.forEach((scopeId) => {
      formData.append("serviceScopeIds", scopeId);
    });

    // Lifecycle Information
    formData.append("purchaseDate", assetData.purchaseDate || "");
    formData.append("installationDate", assetData.installationDate || "");
    formData.append("warrantyPeriodDays", assetData.warrantyPeriodDays || "");
    formData.append("ownerType", assetData.ownerType);
    formData.append("lastAuditDate", assetData.lastAuditDate || "");

    // Images
    if (assetData.images && assetData.images.length > 0) {
      assetData.images.forEach((image) => {
        formData.append("images", image);
      });
    }
    formData.append("appendImages", assetData.appendImages || true);

    return api.post("/assets", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },

  updateAsset: (id, assetData) => {
    const formData = new FormData();

    // Basic Information
    formData.append("assetName", assetData.assetName);
    formData.append("serialNumber", assetData.serialNumber || "");
    formData.append("brandName", assetData.brandName || "");
    formData.append("modelNumber", assetData.modelNumber || "");
    formData.append("assetStatus", assetData.assetStatus);
    formData.append("assetCondition", assetData.assetCondition);
    formData.append("observation", assetData.observation || "");
    formData.append("recommendation", assetData.recommendation || "");

    // Financial Information
    if (assetData.purchaseCost) {
      formData.append("purchaseCost", assetData.purchaseCost);
    }
    if (assetData.depreciationValue) {
      formData.append("depreciationValue", assetData.depreciationValue);
    }
    if (assetData.depreciationType) {
      formData.append("depreciationType", assetData.depreciationType);
    }
    if (assetData.timeFrameYears) {
      formData.append("timeFrameYears", assetData.timeFrameYears);
    }

    // Location and Organization
    formData.append("companyId", assetData.companyId);
    formData.append("contractId", assetData.contractId);
    formData.append("zoneId", assetData.zoneId);
    formData.append("subZoneId", assetData.subZoneId);
    formData.append("buildingId", assetData.buildingId);
    formData.append("villaApartmentId", assetData.villaApartmentId);
    formData.append("floorId", assetData.floorId);
    formData.append("roomId", assetData.roomId);

    // Service Information
    formData.append("serviceId", assetData.serviceId);
    formData.append("subServiceId", assetData.subServiceId);
    assetData.serviceScopeIds.forEach((scopeId) => {
      formData.append("serviceScopeIds", scopeId);
    });

    // Lifecycle Information
    formData.append("purchaseDate", assetData.purchaseDate || "");
    formData.append("installationDate", assetData.installationDate || "");
    formData.append("warrantyPeriodDays", assetData.warrantyPeriodDays || "");
    formData.append("ownerType", assetData.ownerType);
    formData.append("lastAuditDate", assetData.lastAuditDate || "");

    // Images
    if (assetData.images && assetData.images.length > 0) {
      assetData.images.forEach((image) => {
        formData.append("images", image);
      });
    }

    // Images to remove
    if (assetData.imagesToRemove && assetData.imagesToRemove.length > 0) {
      assetData.imagesToRemove.forEach((imageUrl) => {
        formData.append("imagesToRemove", imageUrl);
      });
    }
    formData.append("appendImages", assetData.appendImages || true);

    return api.put(`/assets/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },

  deleteAsset: (id) => api.delete(`/assets/${id}`),
};
