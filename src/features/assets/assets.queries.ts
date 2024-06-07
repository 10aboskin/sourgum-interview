import { queryOptions, useQuery } from "@tanstack/react-query";

import assetsQueryKeys from "./assets.query-keys";
import { getAsset } from "./assets.api";

export const useAsset = (assetId: string) =>
  useQuery(
    queryOptions({
      queryKey: assetsQueryKeys.detail(assetId),
      queryFn: getAsset,
    }),
  );
