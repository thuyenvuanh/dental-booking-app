import axios from "axios";
import { ClinicDetail } from "../type";

export const getClinicListApi = async () => {
  const response = await axios.get("/ClinicDentals");
  return response.data as ClinicDetail[];
};

export const createNewClinicApi = async (data: ClinicDetail) => {
  const response = await axios.post("/ClinicDentals", data);
  return response.data as ClinicDetail[];
};
