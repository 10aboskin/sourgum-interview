import { queryOptions, useQuery } from "@tanstack/react-query";

import exchangeRateQueryKeys from "../exchange-rates/exchange-rates.query-keys";
import { getExchangeRates } from "./exchange-rates.api";

export const useExchangeRates = (baseAssetId: string) =>
  useQuery(
    queryOptions({
      queryKey: exchangeRateQueryKeys.list(baseAssetId),
      queryFn: getExchangeRates,
    })
  );
