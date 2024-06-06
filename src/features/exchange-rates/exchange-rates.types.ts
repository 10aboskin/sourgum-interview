export interface UsdExchangeRatesResponse {
  asset_id_base: "USD";
  rates: {
    time: string;
    asset_id_quote: string;
    rate: number;
  }[];
}
