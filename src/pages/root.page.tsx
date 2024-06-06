import { useMemo, useState } from "react";

import AssetDetails from "../features/assets/asset-details.component";
import ExchangeRateList from "../features/exchange-rates/exchange-rate-list.component";
import { useParams } from "react-router-dom";
import useTextFilter from "../lib/use-text-filter.hook";
import { useUsdExchangeRates } from "../features/exchange-rates/exchange-rates.queries";

const Root = () => {
  const { assetId } = useParams();
  const { data } = useUsdExchangeRates();

  const rates = useMemo(() => data?.rates ?? [], [data?.rates]);

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
          <label htmlFor="search-input">Search</label>
          <input
            type="text"
            name="search-input"
            value={filterValue}
            onChange={(e) => setFilterValue(e.target.value)}
          />
          <ExchangeRateList rates={filteredRates} />
        </div>
        {assetId && <AssetDetails assetId={assetId} />}
      </div>
    </>
  );
};

export default Root;
