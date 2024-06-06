import { useUsdExchangeRates } from "./exchange-rates.queries";

export const ExchangeRateList = () => {
  const { data } = useUsdExchangeRates();

  return (
    <ul>
      {(data?.rates ?? []).map(({ asset_id_quote, rate }) => {
        return (
          <li key={asset_id_quote}>
            <div id="asset-id">{asset_id_quote}</div>
            <div id="asset-rate">{rate}</div>
          </li>
        );
      })}
    </ul>
  );
};

export default ExchangeRateList;
