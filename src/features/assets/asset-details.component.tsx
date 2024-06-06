import { useAsset } from "./assets.queries";

interface Props {
  assetId: string;
}

export const AssetDetails = ({ assetId }: Props) => {
  const { data } = useAsset(assetId);

  return <pre role="presentation">{JSON.stringify(data, null, 2)}</pre>;
};

export default AssetDetails;
