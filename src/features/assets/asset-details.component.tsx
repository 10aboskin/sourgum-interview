import { Fragment } from "react/jsx-runtime";
import Spinner from "../ui/spinner.component";
import { useAsset } from "./assets.queries";

interface Props {
  assetId: string;
}

export const AssetDetails = ({ assetId }: Props) => {
  const { data, isPending } = useAsset(assetId);

  if (isPending || !data) return <Spinner />;

  const [
    {
      asset_id,
      name,
      type_is_crypto,
      volume_1day_usd,
      volume_1hrs_usd,
      volume_1mth_usd,
      price_usd,
    },
  ] = data;

  const dataCols = [
    { label: "Asset ID", value: asset_id },
    { label: "Is Crypto", value: type_is_crypto ? "\u2713" : "\u2717" },
    { label: "Daily Volume (USD)", value: volume_1day_usd },
    { label: "Hourly Volume (USD)", value: volume_1hrs_usd },
    { label: "Monthly Volume (USD)", value: volume_1mth_usd },
    { label: "Price (USD)", value: price_usd },
  ];

  const getDisplayValue = (label: string, value: string | number) => {
    if (!value) return <span className="text-neutral-400">N/A</span>;

    if (Array.isArray(value))
      return value.map((val) => <div key={`${label}-${val}`}>{val}</div>);

    if (typeof value === "number") return value.toLocaleString();

    if (!Number.isNaN(parseFloat(value)))
      return parseFloat(value).toLocaleString();

    return value as string;
  };

  return (
    <div
      data-testid="asset-details"
      className="rounded border border-slate-500 px-8 py-4"
    >
      <div className="text-xl font-bold">{name}</div>
      <div className="grid grid-cols-[max-content_auto] items-baseline gap-x-4 gap-y-2">
        {dataCols.map(({ label, value }) => (
          <Fragment key={label}>
            <div className="justify-self-end text-slate-500">{label}</div>
            <span className="flex flex-wrap items-baseline gap-2 text-lg">
              {getDisplayValue(label, value)}
            </span>
          </Fragment>
        ))}
      </div>
    </div>
  );
};

export default AssetDetails;
