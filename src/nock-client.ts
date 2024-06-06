import { baseURL } from "./axios-client";
import nock from "nock";

const nockClient = nock(baseURL).defaultReplyHeaders({
  "Access-Control-Allow-Headers": ["X-CoinAPI-Key"],
  "access-control-allow-origin": "*",
  "access-control-allow-credentials": "true",
});

export default nockClient;
