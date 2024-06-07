import { useMemo, useState } from "react";

import AssetDetails from "../features/assets/asset-details.component";
import ExchangeRateList from "../features/exchange-rates/exchange-rate-list.component";
import ExchangeRateListHeader from "../features/exchange-rates/exchange-rate-list-header.component";
import Spinner from "../features/ui/spinner.component";
import { useExchangeRates } from "../features/exchange-rates/exchange-rates.queries";
import { useParams } from "react-router-dom";
import useTextFilter from "../lib/use-text-filter.hook";

const Root = () => {
  const { assetId } = useParams();

  const [baseAsset, setBaseAsset] = useState("USD");

  const { data, isPending } = useExchangeRates(baseAsset);

  const rates = useMemo(() => data?.rates ?? [], [data?.rates]);

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
          <ExchangeRateListHeader
            rates={rates}
            baseAsset={baseAsset}
            setBaseAsset={setBaseAsset}
            filterValue={filterValue}
            setFilterValue={setFilterValue}
          />
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
