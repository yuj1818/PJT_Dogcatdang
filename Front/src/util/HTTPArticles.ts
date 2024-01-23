import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient();

export async function requestArticles({ signal }) {
  return signal;
}
