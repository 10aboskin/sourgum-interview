import { Asset } from "./assets.types";
import { QueryFunctionContext } from "@tanstack/react-query";
import assets from "../../../tests/assets.json";
import assetsQueryKeys from "./assets.query-keys";
import axiosClient from "../../axios-client";

type AssetsQueryFunctionContext<Key extends keyof typeof assetsQueryKeys> =
  QueryFunctionContext<ReturnType<(typeof assetsQueryKeys)[Key]>>;

export const assetsPath = "/assets";

export const getAllAssets = async () => {
  // const { data } = await axiosClient.get<Asset[]>(assetsPath);
  const data = assets;

  return data;
};

export const getAsset = async ({
  queryKey: [{ assetId }],
}: AssetsQueryFunctionContext<"detail">) => {
  // const { data } = await axiosClient.get<[Asset]>(`${assetsPath}/${assetId}`);
  const data = [assets[0]];

  return data;
};
