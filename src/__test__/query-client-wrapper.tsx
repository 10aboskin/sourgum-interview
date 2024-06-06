import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { PropsWithChildren } from "react";
import queryClientConfig from "../query-client";

const queryClient = new QueryClient({
  ...queryClientConfig,
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

export const QueryClientWrapper = ({ children }: PropsWithChildren) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

export default QueryClientWrapper;
