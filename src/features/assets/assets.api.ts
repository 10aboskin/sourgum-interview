import { Asset } from "./assets.types";
import axiosClient from "../../axios-client";

export const assetsPath = "/assets";

export const getAllAssets = async () => {
  const { data } = await axiosClient.get<Asset[]>(assetsPath);

  return data;
};
