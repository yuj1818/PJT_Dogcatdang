type ShouldRetryFunction = (failureCount: number, error: Error) => boolean;

export const retryFn: ShouldRetryFunction = (failureCount, error) => {
  return failureCount < 3 && (error.response?.status || 0) >= 500;
};
