import { describe, expect, it } from "vitest";

import ExchangeRateList from "./exchange-rate-list.component";
import QueryClientWrapper from "../../__test__/query-client-wrapper";
import exchangeRates from "../../__test__/exchange-rates.json";
import { exchangeRatesPath } from "./exchange-rates.api";
import nockClient from "../../nock-client";
import { render } from "@testing-library/react";

const assetNames = exchangeRates.rates.map((item) => item.asset_id_quote);
const assetRates = exchangeRates.rates.map((item) => item.rate);

describe("ExchangeRateList", () => {
  it("fetches and displays asset exchange rates with USD", async () => {
    nockClient
      .options(exchangeRatesPath)
      .reply(200)
      .get(exchangeRatesPath)
      .reply(200, exchangeRates);

    const { findAllByRole } = render(<ExchangeRateList />, {
      wrapper: QueryClientWrapper,
    });

    const listItems = await findAllByRole("listitem");

    expect(listItems.length).toEqual(exchangeRates.rates.length);

    const listItemNames = listItems.map((item) => item.firstChild?.textContent);
    expect(listItemNames).toEqual(assetNames);

    const listItemPrices = listItems.map((item) =>
      item.lastChild?.textContent ? +item.lastChild.textContent : item.lastChild
    );
    expect(listItemPrices).toEqual(assetRates);
  });
});
