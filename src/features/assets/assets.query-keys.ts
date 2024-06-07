const assetsQueryKeys = {
  all: () => [{ scope: "assets" }] as const,
  list: () => [{ ...assetsQueryKeys.all()[0], entity: "list" }] as const,
  detail: (assetId: string) =>
    [{ ...assetsQueryKeys.all()[0], entity: "detail", assetId }] as const,
};

export type AssetsQueryKeys = typeof assetsQueryKeys;

export default assetsQueryKeys;
