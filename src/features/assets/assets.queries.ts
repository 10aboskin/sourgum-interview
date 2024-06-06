import { getAllAssets, getAsset } from "./assets.api";
import { queryOptions, useQuery } from "@tanstack/react-query";

import assetsQueryKeys from "./assets.query-keys";

export const useAllAssets = () =>
  useQuery(
    queryOptions({
      queryKey: assetsQueryKeys.list(),
      queryFn: getAllAssets,
    })
  );

export const useAsset = (assetId: string) =>
  useQuery(
    queryOptions({
      queryKey: assetsQueryKeys.detail(assetId),
      queryFn: getAsset,
    })
  );
