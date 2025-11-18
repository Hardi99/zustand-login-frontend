import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes - données considérées fraîches
      gcTime: 1000 * 60 * 10, // 10 minutes - cache garbage collection (anciennement cacheTime)
      retry: 1, // Retry 1 fois en cas d'erreur
      refetchOnWindowFocus: false, // Ne pas refetch au focus de la fenêtre
    },
    mutations: {
      retry: 0, // Pas de retry pour les mutations
    },
  },
});
