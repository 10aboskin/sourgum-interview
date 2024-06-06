import { queryOptions, useQuery } from "@tanstack/react-query";

import exchangeRateQueryKeys from "../exchange-rates/exchange-rates.query-keys";
import { getUsdExchangeRates } from "./exchange-rates.api";

export const getUsdExchangeRatesQueryOptions = () =>
  queryOptions({
    queryKey: exchangeRateQueryKeys.all,
    queryFn: getUsdExchangeRates,
  });

export const useUsdExchangeRates = () =>
  useQuery(getUsdExchangeRatesQueryOptions());
