import axios from "axios";

export const baseURL = "https://rest.coinapi.io/v1";

export default axios.create({
  baseURL,
  headers: {
    "X-CoinAPI-Key": import.meta.env.VITE_API_KEY,
  },
});
