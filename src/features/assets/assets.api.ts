import { Asset } from "./assets.types";
import { AssetsQueryKeys } from "./assets.query-keys";
import { TypedQueryFunctionContext } from "../../lib/type-helpers";
import axiosClient from "../../axios-client";

export const assetsPath = "/assets";

export const getAsset = async ({
  queryKey: [{ assetId }],
}: TypedQueryFunctionContext<AssetsQueryKeys, "detail">) => {
  const { data } = await axiosClient.get<[Asset]>(`${assetsPath}/${assetId}`);

  return data;
};
