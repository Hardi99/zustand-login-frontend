import axiosInstance from "../api/axiosInstance";

export const authService = {
  register: async (userData) => {
    const response = await axiosInstance.post("/register", userData);
    return response.data;
  },

  login: async (credentials) => {
    const response = await axiosInstance.post("/login", credentials);
    return response.data;
  },

  getProfile: async () => {
    const response = await axiosInstance.get("/profile");
    return response.data;
  },
};
