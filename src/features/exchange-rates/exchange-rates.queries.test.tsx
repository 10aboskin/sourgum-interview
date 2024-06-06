import { expect, test } from "vitest";

import QueryClientWrapper from "../../../tests/query-client-wrapper";
import exchangeRates from "../../../tests/exchange-rates.json";
import nockClient from "../../nock-client";
import { renderHook } from "@testing-library/react";
import { useUsdExchangeRates } from "./exchange-rates.queries";
import { waitFor } from "@testing-library/dom";

test("useUsdExchangeRates", async () => {
  nockClient
    .options("/exchangerate/USD")
    .reply(200)
    .get("/exchangerate/USD")
    .reply(200, exchangeRates);

  const { result } = renderHook(() => useUsdExchangeRates(), {
    wrapper: QueryClientWrapper,
  });

  await waitFor(() => expect(result.current.isSuccess).toBe(true));

  expect(result.current.data).toEqual(exchangeRates);
});
