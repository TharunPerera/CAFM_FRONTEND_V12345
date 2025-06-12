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

import api from "./api";

export const assetService = {
  getAllAssets: (pageable) => api.get("/assets", { params: pageable }),
  getAssetById: (id) => api.get(`/assets/${id}`),
  getAssetsByContract: (contractId) =>
    api.get(`/assets/contract/${contractId}`),
  exportAssetsCSV: () => {
    // Get the token
    const token = localStorage.getItem("token");

    return api.get("/assets/export", {
      responseType: "blob",
      headers: {
        Accept: "text/csv",
        Authorization: `Bearer ${token}`,
      },
    });
  },
  createAsset: (assetData) => {
    const formData = new FormData();

    // Convert asset data to form data
    formData.append("assetName", assetData.assetName);
    formData.append("serialNumber", assetData.serialNumber || "");
    formData.append("brandName", assetData.brandName || "");
    formData.append("modelNumber", assetData.modelNumber || "");
    formData.append("assetStatus", assetData.assetStatus);
    formData.append("companyId", assetData.companyId);
    formData.append("contractId", assetData.contractId);
    formData.append("zoneId", assetData.zoneId);
    formData.append("subZoneId", assetData.subZoneId);
    formData.append("buildingId", assetData.buildingId);
    formData.append("villaApartmentId", assetData.villaApartmentId);
    formData.append("floorId", assetData.floorId);
    formData.append("roomId", assetData.roomId);
    formData.append("serviceId", assetData.serviceId);
    formData.append("subServiceId", assetData.subServiceId);
    formData.append("serviceScopeId", assetData.serviceScopeId);
    // Removed internalUserId - backend will use authenticated user's username

    if (assetData.purchaseDate) {
      formData.append("purchaseDate", assetData.purchaseDate);
    }

    if (assetData.installationDate) {
      formData.append("installationDate", assetData.installationDate);
    }

    if (assetData.warrantyPeriodDays) {
      formData.append("warrantyPeriodDays", assetData.warrantyPeriodDays);
    }

    if (assetData.ownerType) {
      formData.append("ownerType", assetData.ownerType);
    }

    if (assetData.lastAuditDate) {
      formData.append("lastAuditDate", assetData.lastAuditDate);
    }

    if (assetData.expectedUsefulLifeDays) {
      formData.append(
        "expectedUsefulLifeDays",
        assetData.expectedUsefulLifeDays
      );
    }

    // Add images if available
    if (assetData.images && assetData.images.length > 0) {
      for (let i = 0; i < assetData.images.length; i++) {
        formData.append("images", assetData.images[i]);
      }
    }

    return api.post("/assets", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
  updateAsset: (id, assetData) => {
    const formData = new FormData();

    // Convert asset data to form data
    formData.append("assetName", assetData.assetName);
    formData.append("serialNumber", assetData.serialNumber || "");
    formData.append("brandName", assetData.brandName || "");
    formData.append("modelNumber", assetData.modelNumber || "");
    formData.append("assetStatus", assetData.assetStatus);
    formData.append("companyId", assetData.companyId);
    formData.append("contractId", assetData.contractId);
    formData.append("zoneId", assetData.zoneId);
    formData.append("subZoneId", assetData.subZoneId);
    formData.append("buildingId", assetData.buildingId);
    formData.append("villaApartmentId", assetData.villaApartmentId);
    formData.append("floorId", assetData.floorId);
    formData.append("roomId", assetData.roomId);
    formData.append("serviceId", assetData.serviceId);
    formData.append("subServiceId", assetData.subServiceId);
    formData.append("serviceScopeId", assetData.serviceScopeId);
    // Removed internalUserId - backend will use authenticated user's username

    if (assetData.purchaseDate) {
      formData.append("purchaseDate", assetData.purchaseDate);
    }

    if (assetData.installationDate) {
      formData.append("installationDate", assetData.installationDate);
    }

    if (assetData.warrantyPeriodDays) {
      formData.append("warrantyPeriodDays", assetData.warrantyPeriodDays);
    }

    if (assetData.ownerType) {
      formData.append("ownerType", assetData.ownerType);
    }

    if (assetData.lastAuditDate) {
      formData.append("lastAuditDate", assetData.lastAuditDate);
    }

    if (assetData.expectedUsefulLifeDays) {
      formData.append(
        "expectedUsefulLifeDays",
        assetData.expectedUsefulLifeDays
      );
    }

    // Add existing image URLs if available
    if (assetData.existingImageUrls && assetData.existingImageUrls.length > 0) {
      formData.append(
        "existingImageUrls",
        JSON.stringify(assetData.existingImageUrls)
      );
    }

    // Add new images if available
    if (assetData.images && assetData.images.length > 0) {
      for (let i = 0; i < assetData.images.length; i++) {
        formData.append("images", assetData.images[i]);
      }
    }

    return api.put(`/assets/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
  deleteAsset: (id) => api.delete(`/assets/${id}`),
  generateQRCode: (assetId) =>
    api.get(`/assets/${assetId}/qrcode`, { responseType: "blob" }),
};
