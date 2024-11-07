"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// `getQueryClient()`를 사용하면 `Error: Not implemented`가 발생함
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

const TanstackQueryProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default TanstackQueryProvider;
