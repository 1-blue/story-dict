"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { handleError } from "#fe/libs/handleError";
import { handleSuccess } from "#fe/libs/handleSuccess";

// `getQueryClient()`를 사용하면 `Error: Not implemented`가 발생함
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
    mutations: {
      onSettled(data, error) {
        if (error) {
          handleError({ error });
        } else {
          handleSuccess({ data });
        }
      },
    },
  },
});

const TanstackQueryProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools position="right" />
    </QueryClientProvider>
  );
};

export default TanstackQueryProvider;
