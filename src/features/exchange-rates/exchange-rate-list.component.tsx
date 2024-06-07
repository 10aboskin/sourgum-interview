import { ExchangeRates } from "./exchange-rates.types";
import { Link } from "react-router-dom";
import { useRef } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";

interface Props {
  rates: ExchangeRates["rates"];
  baseAsset: string;
}

export const ExchangeRateList = ({ rates, baseAsset }: Props) => {
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
      className="h-[calc(100vh-4rem)] overflow-y-auto contain-strict"
    >
      <div
        className="relative w-full"
        style={{
          height: virtualizer.getTotalSize(),
        }}
      >
        <ul
          className="absolute left-0 top-0 flex w-full flex-col gap-2"
          style={{
            transform: `translateY(${items[0]?.start ?? 0}px)`,
          }}
        >
          {items.map(({ key, index }) => {
            const { asset_id_quote, rate } = rates[index];
            return (
              <li
                ref={virtualizer.measureElement}
                key={key}
                data-index={index}
                className="rounded border border-slate-500 px-8 py-4"
              >
                <Link to={`/${asset_id_quote}`} className="flex">
                  <div className="w-1/3 text-xl font-bold">
                    {asset_id_quote}
                  </div>
                  <div className="w-2/3">
                    <span className="text-lg text-slate-500">~</span>{" "}
                    {rate.toPrecision(5)} {baseAsset}
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default ExchangeRateList;
