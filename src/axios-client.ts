import axios from "axios";

export const baseURL = "https://rest.coinapi.io/v1";

const axiosClient = axios.create({
  baseURL,
  headers: {
    "X-CoinAPI-Key": import.meta.env.VITE_API_KEY,
  },
});

export default axiosClient;
