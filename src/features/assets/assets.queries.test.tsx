import { expect, test } from "vitest";

import QueryClientWrapper from "../../../tests/query-client-wrapper";
import assets from "../../../tests/assets.json";
import { assetsPath } from "./assets.api";
import nockClient from "../../nock-client";
import { renderHook } from "@testing-library/react";
import { useAllAssets } from "./assets.queries";
import { waitFor } from "@testing-library/dom";

test("useAllAssets", async () => {
  nockClient.options(assetsPath).reply(200).get(assetsPath).reply(200, assets);

  const { result } = renderHook(() => useAllAssets(), {
    wrapper: QueryClientWrapper,
  });

  await waitFor(() => expect(result.current.isSuccess).toBe(true));

  expect(result.current.data).toEqual(assets);
});
