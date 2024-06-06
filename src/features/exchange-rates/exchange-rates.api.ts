import { UsdExchangeRatesResponse } from "./exchange-rates.types";
import axiosClient from "../../axios-client";

export const exchangeRatesPath = "/exchangerate/USD";

export const getUsdExchangeRates = async () => {
  const { data } = await axiosClient.get<UsdExchangeRatesResponse>(
    exchangeRatesPath
  );

  return data;
};
