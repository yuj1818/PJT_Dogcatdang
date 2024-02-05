import { QueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";

export const queryClient = new QueryClient();

type ShouldRetryFunction = (failureCount: number, error: Error) => boolean;

export const retryFn: ShouldRetryFunction = (failureCount, error) => {
  return (
    failureCount < 3 && ((error as AxiosError).response?.status || 500) >= 500
  );
};
