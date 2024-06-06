import { expect, test } from "vitest";

import App from "./App";
import { render } from "@testing-library/react";

test("loads and displays greeting", async () => {
  const { getByText } = render(<App />);

  expect(getByText("Vite + React"));
});
