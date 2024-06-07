import { RouterProvider, createMemoryRouter } from "react-router-dom";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { cleanup, render } from "@testing-library/react";

import QueryClientWrapper from "../../tests/query-client-wrapper";
import Root from "./root.page";
import asset1 from "../../tests/asset1.json";
import { assetsPath } from "../features/assets/assets.api";
import exchangeRatesBtc from "../../tests/exchange-rates-btc.json";
import { exchangeRatesPath } from "../features/exchange-rates/exchange-rates.api";
import exchangeRatesUsd from "../../tests/exchange-rates-usd.json";
import nock from "nock";
import nockClient from "../nock-client";
import { routes } from "../router";
import userEvent from "@testing-library/user-event";

const router = createMemoryRouter(routes, {
  initialEntries: ["/"],
});

describe("Root Page", () => {
  beforeEach(() => {
    vi.spyOn(Element.prototype, "getBoundingClientRect").mockImplementation(
      () => ({
        width: 120,
        height: 120,
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        x: 0,
        y: 0,
        toJSON: () => {},
      })
    );
  });

  afterEach(() => {
    vi.restoreAllMocks();
    nock.cleanAll();
    cleanup();
  });

  it("fetches and displays asset exchange rates with USD", async () => {
    nockClient
      .options(`${exchangeRatesPath}/USD`)
      .reply(200)
      .get(`${exchangeRatesPath}/USD`)
      .reply(200, exchangeRatesUsd);

    const { findAllByRole } = render(<Root />, {
      wrapper: () => (
        <QueryClientWrapper>
          <RouterProvider router={router} />
        </QueryClientWrapper>
      ),
    });

    const listItems = await findAllByRole("link");
    // expect to only see visible virtual rows
    expect(listItems.length).toEqual(2);

    const listItemNames = listItems.map((item) => item.firstChild?.textContent);
    expect(listItemNames).toEqual(["00", "1000SATS"]);

    const listItemPrices = listItems.map((item) =>
      item.lastChild?.textContent ? +item.lastChild.textContent : item.lastChild
    );
    expect(listItemPrices).toEqual([13.31439053707501, 3072.441676916485]);
  });

  it("filters the list based on the search input", async () => {
    const user = userEvent.setup();

    nockClient
      .options(`${exchangeRatesPath}/USD`)
      .reply(200)
      .get(`${exchangeRatesPath}/USD`)
      .reply(200, exchangeRatesUsd);

    const { findAllByRole, findByRole } = render(<Root />, {
      wrapper: () => (
        <QueryClientWrapper>
          <RouterProvider router={router} />
        </QueryClientWrapper>
      ),
    });

    const searchInput = await findByRole("combobox", { name: "search-input" });

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

    // expect to see only visible virtualized rows
    testListItems({
      names: ["00", "1000SATS"],
      rates: [13.31439053707501, 3072.441676916485],
    });

    // change search value
    await user.click(searchInput);
    await user.keyboard("1EARTH");

    // expect to see matching list values
    testListItems({
      names: ["00"],
      rates: [13.31439053707501],
    });

    // change search
    await user.clear(searchInput);
    await user.keyboard("1");
    // expect to see correct filtered values
    testListItems({
      names: ["00", "1000SATS"],
      rates: [13.31439053707501, 3072.441676916485],
    });

    //  clear search value
    await user.clear(searchInput);
    // expect to see only visible virtualized rows
    testListItems({
      names: ["00", "1000SATS"],
      rates: [13.31439053707501, 3072.441676916485],
    });
  });

  it("displays asset details when a list item is clicked", async () => {
    const user = userEvent.setup();
    const { findAllByRole, findByRole, queryByRole } = render(<Root />, {
      wrapper: () => (
        <QueryClientWrapper>
          <RouterProvider router={router} />
        </QueryClientWrapper>
      ),
    });

    nockClient
      .options(`${exchangeRatesPath}/USD`)
      .reply(200)
      .get(`${exchangeRatesPath}/USD`)
      .reply(200, exchangeRatesUsd)
      .options(`${assetsPath}/00`)
      .reply(200)
      .get(`${assetsPath}/00`)
      .reply(200, asset1);

    // expect details to be hidden by default
    expect(queryByRole("presentation")).toBeNull();
    // click first list item
    const [firstLink] = await findAllByRole("link");
    await user.click(firstLink);

    // expect asset details to be visible
    const pre = await findByRole("presentation");
    expect(pre.textContent).toContain("BTC");
  });

  it("updates base exchange asset to compare rates", async () => {
    const user = userEvent.setup();
    const { findAllByRole, findByRole } = render(<Root />, {
      wrapper: () => (
        <QueryClientWrapper>
          <RouterProvider router={router} />
        </QueryClientWrapper>
      ),
    });

    nockClient
      .options(`${exchangeRatesPath}/USD`)
      .reply(200)
      .get(`${exchangeRatesPath}/USD`)
      .reply(200, exchangeRatesUsd)
      .options(`${exchangeRatesPath}/1INCH`)
      .reply(200)
      .get(`${exchangeRatesPath}/1INCH`)
      .reply(200, exchangeRatesBtc);

    let listItems = await findAllByRole("link");
    const listItemPrices = listItems.map((item) =>
      item.lastChild?.textContent ? +item.lastChild.textContent : item.lastChild
    );

    const select = await findByRole("combobox", {
      name: "base-asset-select",
    });
    // expect default select value to be 'USD'
    const usdOption = (await findByRole("option", {
      name: "USD",
    })) as HTMLOptionElement;

    expect(usdOption.selected).toBe(true);
    // select a different asset
    await user.selectOptions(select, ["1INCH"]);
    // expect updated values
    listItems = await findAllByRole("link");
    const newPrices = listItems.map((item) =>
      item.lastChild?.textContent ? +item.lastChild.textContent : item.lastChild
    );

    expect(newPrices).not.toEqual(listItemPrices);
  });
});
