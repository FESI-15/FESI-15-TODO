"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { getQueryClient } from "@/utils/getQueryClient";

interface QueryProvidersProps {
  children: React.ReactNode;
}

export function QueryProviders({ children }: QueryProvidersProps) {
  const queryClient = getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
