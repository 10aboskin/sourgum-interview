import { ExchangeRateQueryKeys } from "./exchange-rates.query-keys";
import { ExchangeRates } from "./exchange-rates.types";
import { TypedQueryFunctionContext } from "../../lib/type-helpers";
import axiosClient from "../../axios-client";

export const exchangeRatesPath = "/exchangerate";

export const getExchangeRates = async ({
  queryKey: [{ baseAssetId }],
}: TypedQueryFunctionContext<ExchangeRateQueryKeys, "list">) => {
  const { data } = await axiosClient.get<ExchangeRates>(
    `${exchangeRatesPath}/${baseAssetId}`,
  );

  return data;
};
