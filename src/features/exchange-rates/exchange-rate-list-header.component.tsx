import { Dispatch, SetStateAction, useMemo } from "react";

import { ExchangeRates } from "./exchange-rates.types";

interface Props {
  rates: ExchangeRates["rates"];
  baseAsset: string;
  setBaseAsset: Dispatch<SetStateAction<string>>;
  filterValue: string;
  setFilterValue: Dispatch<SetStateAction<string>>;
}

export const ExchangeRateListHeader = ({
  rates,
  baseAsset,
  setBaseAsset,
  filterValue,
  setFilterValue,
}: Props) => {
  const sortedRates = useMemo(
    () =>
      rates
        .filter((rate) => rate.asset_id_quote !== baseAsset)
        .sort((a, b) => {
          if (a.asset_id_quote < b.asset_id_quote) return -1;
          if (a.asset_id_quote > b.asset_id_quote) return 1;
          return 0;
        }),
    [baseAsset, rates],
  );

  const rateOptions = useMemo(
    () =>
      sortedRates.map(({ asset_id_quote }) => (
        <option key={asset_id_quote}>{asset_id_quote}</option>
      )),
    [sortedRates],
  );

  return (
    <div className="flex h-16 items-center gap-2">
      <div className="flex items-center gap-2">
        <label htmlFor="base-asset-select">Base Asset</label>
        <select
          name="base-asset-select"
          className="block rounded border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
          aria-label="base-asset-select"
          value={baseAsset}
          onChange={(e) => setBaseAsset(e.target.value)}
        >
          <option>{baseAsset}</option>
          {rateOptions}
        </select>
      </div>
      <div className="flex items-center gap-2">
        <label htmlFor="search-input">Search</label>
        <input
          type="text"
          className="block rounded border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
          name="search-input"
          aria-label="search-input"
          value={filterValue}
          onChange={(e) => setFilterValue(e.target.value)}
          list="exampleList"
        />
        <datalist id="exampleList">{rateOptions}</datalist>
      </div>
    </div>
  );
};

export default ExchangeRateListHeader;
