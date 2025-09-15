// import api from "./api";

// export const permissionService = {
//   getAllPermissions: () => api.get("/permissions"),
//   createPermission: (permissionData) =>
//     api.post("/permissions", permissionData),
//   updatePermission: (id, permissionData) =>
//     api.put(`/permissions/${id}`, permissionData),
//   deletePermission: (id) => api.delete(`/permissions/${id}`),

//   // User Permission Management
//   assignPermissionToUser: (userId, permissionId, roleId, userType) =>
//     api.post("/user-permissions/assign", {
//       userId,
//       permissionId,
//       roleId,
//       userType,
//     }),
//   removePermissionFromUser: (userId, permissionId, userType) =>
//     api.delete(
//       `/user-permissions/remove/${userId}/${permissionId}/${userType}`
//     ),
// };

import api from "./api";

export const permissionService = {
  // Permission Management
  getAllPermissions: () => api.get("/permissions"),
  createPermission: (permissionData) =>
    api.post("/permissions", permissionData),
  updatePermission: (id, permissionData) =>
    api.put(`/permissions/${id}`, permissionData),
  deletePermission: (id) => api.delete(`/permissions/${id}`),

  // User Permission Management
  getAssignedPermissions: (userId, userType) =>
    api.get(`/permissions/assigned/${userId}/${userType}`),
  getUnassignedPermissions: (userId, userType) =>
    api.get(`/permissions/unassigned/${userId}/${userType}`),

  assignPermissionToUser: (assignData) =>
    api.post("/permissions/assign", assignData),
  removePermissionFromUser: (unassignData) =>
    api.delete("/permissions/unassign", { data: unassignData }),
};
