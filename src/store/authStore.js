import { create } from "zustand";
import { persist } from "zustand/middleware";
import { authService } from "../services/authService";

const authStore = create(
    persist((set) => ({
        user: null,
        token: null,

        register: async (userData) => {
            const data = await authService.register(userData);
            set({ user: data.user, token: data.session.access_token });
            return data;
        },

        login: async (credentials) => {
            const data = await authService.login(credentials);
            set({ user: data.user, token: data.session.access_token });
            return data;
        },

        logout: () => {
            set({ user: null, token: null });
        },
    }),
    {
        name: "auth-storage",
    }
  )
);

export default authStore;