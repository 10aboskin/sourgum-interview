import { ExchangeRateQueryKeys } from "./exchange-rates.query-keys";
import { TypedQueryFunctionContext } from "../../lib/type-helpers";
import { UsdExchangeRatesResponse } from "./exchange-rates.types";
import axiosClient from "../../axios-client";

export const exchangeRatesPath = "/exchangerate";

export const getExchangeRates = async ({
  queryKey: [{ baseAssetId }],
}: TypedQueryFunctionContext<ExchangeRateQueryKeys, "list">) => {
  const { data } = await axiosClient.get<UsdExchangeRatesResponse>(
    `${exchangeRatesPath}/${baseAssetId}`
  );

  return data;
};
