import { create } from "zustand";
import { persist } from "zustand/middleware";

const authStore = create(
  persist(
    (set) => ({
      user: null,
      token: null,

      // Setter simple pour TanStack Query
      setAuth: (user, token) => {
        set({ user, token });
      },

      // Logout simple
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