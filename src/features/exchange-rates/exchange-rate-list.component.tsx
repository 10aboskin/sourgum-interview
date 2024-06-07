import { Link } from "react-router-dom";
import { UsdExchangeRatesResponse } from "./exchange-rates.types";
import { useRef } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";

interface Props {
  rates: UsdExchangeRatesResponse["rates"];
}

export const ExchangeRateList = ({ rates }: Props) => {
  const parentRef = useRef<HTMLDivElement>(null);
  const virtualizer = useVirtualizer({
    count: rates.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 45,
  });

  const items = virtualizer.getVirtualItems();

  return (
    <div
      ref={parentRef}
      className="List"
      style={{
        height: 400,
        width: 400,
        overflowY: "auto",
        contain: "strict",
      }}
    >
      <div
        style={{
          height: virtualizer.getTotalSize(),
          width: "100%",
          position: "relative",
        }}
      >
        <ul
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            transform: `translateY(${items[0]?.start ?? 0}px)`,
          }}
        >
          {items.map(({ key, index }) => {
            const { asset_id_quote, rate } = rates[index];
            return (
              <li
                key={key}
                data-index={index}
                ref={virtualizer.measureElement}
                className={index % 2 ? "ListItemOdd" : "ListItemEven"}
              >
                <div style={{ padding: "10px 0" }}>
                  <Link to={`/${asset_id_quote}`}>
                    <div id="asset-id">{asset_id_quote}</div>
                    <div id="asset-rate">{rate}</div>
                  </Link>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default ExchangeRateList;
