import { useMemo, useState } from "react";

import Fuse from "fuse.js";
import { useUsdExchangeRates } from "./exchange-rates.queries";

export const ExchangeRateList = () => {
  const { data } = useUsdExchangeRates();

  const rates = useMemo(() => data?.rates ?? [], [data?.rates]);

  const [searchValue, setSearchValue] = useState("");

  const fuse = useMemo(
    () =>
      new Fuse(rates, {
        keys: ["asset_id_quote"],
      }),
    [rates]
  );

  const filteredRates = useMemo(
    () =>
      searchValue ? fuse.search(searchValue).map(({ item }) => item) : rates,
    [fuse, rates, searchValue]
  );

  return (
    <>
      <label htmlFor="search-input">Search</label>
      <input
        type="text"
        name="search-input"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />
      <ul>
        {filteredRates.map(({ asset_id_quote, rate }) => {
          return (
            <li key={asset_id_quote}>
              <div id="asset-id">{asset_id_quote}</div>
              <div id="asset-rate">{rate}</div>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default ExchangeRateList;
