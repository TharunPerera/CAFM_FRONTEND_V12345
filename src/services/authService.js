import api from "./api";

export const authService = {
  login: (username, password) =>
    api.post("/auth/login", { username, password }),
};
