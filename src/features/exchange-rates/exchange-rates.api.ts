import { UsdExchangeRatesResponse } from "./exchange-rates.types";
import axiosClient from "../../axios-client";
import exchangeRates from "../../../tests/exchange-rates.json";

export const exchangeRatesPath = "/exchangerate/USD";

export const getUsdExchangeRates = async () => {
  // const { data } = await axiosClient.get<UsdExchangeRatesResponse>(
  //   exchangeRatesPath
  // );
  const data = exchangeRates;

  return data;
};
