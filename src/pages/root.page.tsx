import { useMemo, useState } from "react";

import AssetDetails from "../features/assets/asset-details.component";
import ExchangeRateList from "../features/exchange-rates/exchange-rate-list.component";
import Spinner from "../features/ui/spinner.component";
import { useExchangeRates } from "../features/exchange-rates/exchange-rates.queries";
import { useParams } from "react-router-dom";
import useTextFilter from "../lib/use-text-filter.hook";

const Root = () => {
  const { assetId } = useParams();

  const [baseAsset, setBaseAsset] = useState("USD");

  const { data, isPending } = useExchangeRates(baseAsset);

  const rates = useMemo(() => data?.rates ?? [], [data?.rates]);

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

  const [filterValue, setFilterValue] = useState("");

  const filteredRates = useTextFilter({
    list: rates,
    keys: ["asset_id_quote"],
    filterValue: filterValue,
  });

  return (
    <>
      <div className="flex gap-4 px-4">
        <div className="w-1/3">
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
          {!isPending && data ? (
            <ExchangeRateList rates={filteredRates} baseAsset={baseAsset} />
          ) : (
            <Spinner />
          )}
        </div>
        <div className="w-2/3 py-16">
          {assetId && <AssetDetails assetId={assetId} />}
        </div>
      </div>
    </>
  );
};

export default Root;
