import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { authService } from "../services/authService";
import useAuthStore from "../store/authStore";

/**
 * Hook pour la mutation de login
 * Bénéfices TanStack Query :
 * - États loading/error automatiques
 * - Retry automatique en cas d'erreur réseau
 * - onSuccess/onError callbacks
 */
export const useLogin = () => {
  const setAuth = useAuthStore((state) => state.setAuth);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authService.login,
    onSuccess: (data) => {
      // Mise à jour du store Zustand
      setAuth(data.user, data.session.access_token);
      // Invalide toutes les queries pour forcer un refetch
      queryClient.invalidateQueries();
    },
    onError: (error) => {
      console.error("Login error:", error);
    },
  });
};

/**
 * Hook pour la mutation de register
 */
export const useRegister = () => {
  const setAuth = useAuthStore((state) => state.setAuth);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authService.register,
    onSuccess: (data) => {
      setAuth(data.user, data.session.access_token);
      queryClient.invalidateQueries();
    },
    onError: (error) => {
      console.error("Register error:", error);
    },
  });
};

/**
 * Hook pour la mutation de logout
 */
export const useLogout = () => {
  const logout = useAuthStore((state) => state.logout);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      // Pas d'appel API pour le logout dans ce cas
      // Juste nettoyer le state local
      logout();
    },
    onSuccess: () => {
      // Vider tout le cache des queries
      queryClient.clear();
    },
  });
};

/**
 * Hook pour récupérer le profil utilisateur
 * Bénéfices TanStack Query :
 * - Cache automatique (5 minutes selon config)
 * - Refetch automatique en arrière-plan
 * - États loading/error gérés
 * - Déduplication des requêtes (si appelé plusieurs fois)
 */
export const useProfile = () => {
  const token = useAuthStore((state) => state.token);

  return useQuery({
    queryKey: ["profile"],
    queryFn: authService.getProfile,
    enabled: !!token, // Seulement si token existe
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};
