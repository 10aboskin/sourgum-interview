import axiosInstance from "../../axios-client";

export const getAllAssets = async () => {
  const { data } = await axiosInstance.get("/assets");

  return data;
};
