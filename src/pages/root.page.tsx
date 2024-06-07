import { useMemo, useState } from "react";

import AssetDetails from "../features/assets/asset-details.component";
import ExchangeRateList from "../features/exchange-rates/exchange-rate-list.component";
import { useExchangeRates } from "../features/exchange-rates/exchange-rates.queries";
import { useParams } from "react-router-dom";
import useTextFilter from "../lib/use-text-filter.hook";

const Root = () => {
  const { assetId } = useParams();

  const [baseAsset, setBaseAsset] = useState("USD");

  const { data } = useExchangeRates(baseAsset);

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
    [baseAsset, rates]
  );

  const rateOptions = useMemo(
    () =>
      sortedRates.map(({ asset_id_quote }) => (
        <option key={asset_id_quote}>{asset_id_quote}</option>
      )),
    [sortedRates]
  );

  const [filterValue, setFilterValue] = useState("");

  const filteredRates = useTextFilter({
    list: rates,
    keys: ["asset_id_quote"],
    filterValue: filterValue,
  });

  return (
    <>
      <div style={{ display: "flex" }}>
        <div>
          <label htmlFor="base-asset-select">Base Asset</label>
          <select
            name="base-asset-select"
            aria-label="base-asset-select"
            value={baseAsset}
            onChange={(e) => setBaseAsset(e.target.value)}
          >
            <option>{baseAsset}</option>
            {rateOptions}
          </select>
          <label htmlFor="search-input">Search</label>
          <input
            type="text"
            name="search-input"
            aria-label="search-input"
            value={filterValue}
            onChange={(e) => setFilterValue(e.target.value)}
            list="exampleList"
          />
          <datalist id="exampleList">{rateOptions}</datalist>
          <ExchangeRateList rates={filteredRates} />
        </div>
        {assetId && <AssetDetails assetId={assetId} />}
      </div>
    </>
  );
};

export default Root;
