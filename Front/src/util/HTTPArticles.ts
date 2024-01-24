import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient();
interface FetchEventsOptions {
  signal: AbortSignal;
  searchTerm?: string;
  max?: number;
}

export async function requestArticles({ signal }: FetchEventsOptions) {
  const url = "/api/boards";

  return signal;
}
