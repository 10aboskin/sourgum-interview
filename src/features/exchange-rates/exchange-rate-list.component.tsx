import { Link } from "react-router-dom";
import { UsdExchangeRatesResponse } from "./exchange-rates.types";

interface Props {
  rates: UsdExchangeRatesResponse["rates"];
}

export const ExchangeRateList = ({ rates }: Props) => {
  return (
    <ul>
      {rates.map(({ asset_id_quote, rate }) => {
        return (
          <li key={asset_id_quote}>
            <Link to={`/${asset_id_quote}`}>
              <div id="asset-id">{asset_id_quote}</div>
              <div id="asset-rate">{rate}</div>
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default ExchangeRateList;
