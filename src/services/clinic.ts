import axios from "axios";
import { ClinicDetail } from "../type";

export const getClinicListApi = async () => {
  const response = await axios.get("/clinic");
  return response.data as ClinicDetail[];
};

export const getClinicByIdApi = async (id: string) => {
  const response = await axios.get(`/clinic/${id}`);
  return response.data as ClinicDetail;
};

export const createNewClinicApi = async (data: ClinicDetail) => {
  const response = await axios.post("/clinic", data);
  return response.data;
};
