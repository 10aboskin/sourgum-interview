import { afterEach, describe, expect, it } from "vitest";
import { cleanup, render } from "@testing-library/react";

import ExchangeRateList from "./exchange-rate-list.component";
import QueryClientWrapper from "../../__test__/query-client-wrapper";
import exchangeRates from "../../__test__/exchange-rates.json";
import { exchangeRatesPath } from "./exchange-rates.api";
import nockClient from "../../nock-client";
import userEvent from "@testing-library/user-event";

const assetNames = exchangeRates.rates.map((item) => item.asset_id_quote);
const assetRates = exchangeRates.rates.map((item) => item.rate);

const setup = async () => {
  nockClient
    .options(exchangeRatesPath)
    .reply(200)
    .get(exchangeRatesPath)
    .reply(200, exchangeRates);

  const utils = render(<ExchangeRateList />, {
    wrapper: QueryClientWrapper,
  });

  return utils;
};

describe("ExchangeRateList", () => {
  afterEach(() => {
    cleanup();
  });

  it("fetches and displays asset exchange rates with USD", async () => {
    const { findAllByRole } = await setup();

    const listItems = await findAllByRole("listitem");

    expect(listItems.length).toEqual(exchangeRates.rates.length);

    const listItemNames = listItems.map((item) => item.firstChild?.textContent);
    expect(listItemNames).toEqual(assetNames);

    const listItemPrices = listItems.map((item) =>
      item.lastChild?.textContent ? +item.lastChild.textContent : item.lastChild
    );
    expect(listItemPrices).toEqual(assetRates);
  });

  it("filters the list based on the search input", async () => {
    const user = userEvent.setup();

    const { findAllByRole, findByRole } = await setup();

    const searchInput = await findByRole("textbox");

    const testListItems = async ({
      names,
      rates,
    }: {
      names: string[];
      rates: number[];
    }) => {
      const listItems = await findAllByRole("listitem");
      const listItemNames = listItems.map(
        (item) => item.firstChild?.textContent
      );
      expect(listItemNames).toEqual(names);

      const listItemPrices = listItems.map((item) =>
        item.lastChild?.textContent
          ? +item.lastChild.textContent
          : item.lastChild
      );
      expect(listItemPrices).toEqual(rates);
    };

    // expect to see all items
    testListItems({ names: assetNames, rates: assetRates });
    // expect(listItems.length).toEqual(exchangeRates.rates.length);

    // change search value
    await user.click(searchInput);
    await user.keyboard("00");
    // expect to see correct filtered values

    testListItems({
      names: ["00", "1000SATS"],
      rates: [13.31439053707501, 3072.441676916485],
    });

    // change search
    await user.clear(searchInput);
    await user.keyboard("1");
    // expect to see correct filtered values
    testListItems({
      names: ["1000SATS", "1EARTH", "1INCH"],
      rates: [3072.441676916485, 1756.188120859164, 2.078612758834678],
    });

    //  clear search value
    await user.clear(searchInput);
    // expect to see all items
    testListItems({ names: assetNames, rates: assetRates });
  });
});
