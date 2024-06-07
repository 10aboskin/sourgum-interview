const exchangeRateQueryKeys = {
  all: () => [{ scope: "exchangeRates" }] as const,
  list: (baseAssetId: string) =>
    [
      { ...exchangeRateQueryKeys.all()[0], entity: "list", baseAssetId },
    ] as const,
};

export type ExchangeRateQueryKeys = typeof exchangeRateQueryKeys;

export default exchangeRateQueryKeys;
