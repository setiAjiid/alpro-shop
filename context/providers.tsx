"use client"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { CartProvider } from "./CartContext";
import { ToastProvider } from "./ToastContext";
import { RouterProvider } from "./RouterContext";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      refetchOnWindowFocus: false,
    },
  },
});

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider>
        <CartProvider>
          <ToastProvider>{children}</ToastProvider>
        </CartProvider>
      </RouterProvider>
    </QueryClientProvider>
  );
}
