import {
  MemoryRouter,
  RouterProvider,
  createMemoryRouter,
} from "react-router-dom";
import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, render, waitFor } from "@testing-library/react";

import QueryClientWrapper from "../../tests/query-client-wrapper";
import Root from "./root.page";
import exchangeRates from "../../tests/exchange-rates.json";
import { exchangeRatesPath } from "../features/exchange-rates/exchange-rates.api";
import nockClient from "../nock-client";
import { routes } from "../router";
import userEvent from "@testing-library/user-event";

const assetNames = exchangeRates.rates.map((item) => item.asset_id_quote);
const assetRates = exchangeRates.rates.map((item) => item.rate);

const router = createMemoryRouter(routes, {
  initialEntries: ["/"],
});

const setup = async () => {
  nockClient
    .options(exchangeRatesPath)
    .reply(200)
    .get(exchangeRatesPath)
    .reply(200, exchangeRates);

  const utils = render(<Root />, {
    wrapper: () => (
      <QueryClientWrapper>
        <RouterProvider router={router} />
      </QueryClientWrapper>
    ),
  });

  return utils;
};

describe("Root", () => {
  afterEach(() => {
    vi.clearAllMocks();
    cleanup();
  });

  it("fetches and displays asset exchange rates with USD", async () => {
    const { findAllByRole } = await setup();

    const listItems = await findAllByRole("link");

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
      const listItems = await findAllByRole("link");
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

  it("displays asset details when a list item is clicked", async () => {
    const user = userEvent.setup();
    const { findAllByRole, findByRole, queryByRole } = await setup();
    // expect details to be hidden by default
    expect(queryByRole("presentation")).toBeNull();
    // click first list item
    const [firstLink] = await findAllByRole("link");
    await user.click(firstLink);

    // expect asset details to be visible
    const pre = await findByRole("presentation");
    expect(pre.textContent).toContain("BTC");
  });
});
