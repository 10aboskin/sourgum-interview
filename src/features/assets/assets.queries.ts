import { queryOptions, useQuery } from "@tanstack/react-query";

import assetsQueryKeys from "./assets.query-keys";
import { getAllAssets } from "./assets.api";

export const getAllAssetsQueryOptions = () =>
  queryOptions({
    queryKey: assetsQueryKeys.all,
    queryFn: getAllAssets,
  });

export const useAllAssets = () => useQuery(getAllAssetsQueryOptions());
