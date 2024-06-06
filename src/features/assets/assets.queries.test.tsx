import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { expect, test } from "vitest";

import { PropsWithChildren } from "react";
import nockClient from "../../nock-client";
import { queryClientConfig } from "../../query-client";
import { renderHook } from "@testing-library/react";
import { useAllAssets } from "./assets.queries";
import { waitFor } from "@testing-library/dom";

const queryClient = new QueryClient({
  ...queryClientConfig,
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

const wrapper = ({ children }: PropsWithChildren) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

const response = [
  {
    asset_id: "BTC",
    name: "Bitcoin",
    type_is_crypto: 1,
    data_quote_start: "2014-02-24T17:43:05.0000000Z",
    data_quote_end: "2019-11-03T17:55:07.6724523Z",
    data_orderbook_start: "2014-02-24T17:43:05.0000000Z",
    data_orderbook_end: "2019-11-03T17:55:17.8592413Z",
    data_trade_start: "2010-07-17T23:09:17.0000000Z",
    data_trade_end: "2019-11-03T17:55:11.8220000Z",
    data_symbols_count: 22711,
    volume_1hrs_usd: 102894431436.49,
    volume_1day_usd: 2086392323256.16,
    volume_1mth_usd: 57929168359984.54,
    price_usd: 9166.207274778093,
    chain_addresses: [
      {
        chain_id: "ARBITRUM",
        network_id: "MAINNET",
        address: "0x2f2a2543b76a4166549f7aab2e75bef0aefc5b0f",
      },
      {
        chain_id: "ETHEREUM",
        network_id: "MAINNET",
        address: "0x2260fac5e5542a773aa44fbcfedf7c193bc2c599",
      },
    ],
    data_start: "2010-07-17",
    data_end: "2019-11-03",
  },
  {
    asset_id: "USD",
    name: "US Dollar",
    type_is_crypto: 0,
    data_quote_start: "2014-02-24T17:43:05.0000000Z",
    data_quote_end: "2019-11-03T17:54:49.3807706Z",
    data_orderbook_start: "2014-02-24T17:43:05.0000000Z",
    data_orderbook_end: "2019-11-03T17:55:13.1863931Z",
    data_trade_start: "2010-07-17T23:09:17.0000000Z",
    data_trade_end: "2019-11-03T17:55:07.7870000Z",
    data_symbols_count: 10728,
    volume_1hrs_usd: 9466454016.52,
    volume_1day_usd: 221580758173.49,
    volume_1mth_usd: 11816685174661.7,
    price_usd: 1,
    chain_addresses: [
      {
        chain_id: "ETHEREUM",
        network_id: "MAINNET",
        address: "0xd233d1f6fd11640081abb8db125f722b5dc729dc",
      },
    ],
    data_start: "2010-07-17",
    data_end: "2019-11-03",
  },
];

test("useAllAssets", async () => {
  nockClient.get("/assets").reply(200, response);

  const { result } = renderHook(() => useAllAssets(), { wrapper });

  await waitFor(() => expect(result.current.isSuccess).toBe(true));

  expect(result.current.data).toEqual(response);
});
