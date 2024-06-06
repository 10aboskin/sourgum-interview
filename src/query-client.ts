import { QueryClient, QueryClientConfig } from "@tanstack/react-query";

export const queryClientConfig: QueryClientConfig = {
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
};

export default new QueryClient(queryClientConfig);
