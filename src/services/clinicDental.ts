import axios from "axios";
import { ClinicDetail } from "../type";

export const listClinicDentalApi = async (): Promise<ClinicDetail[]> => {
  const response = await axios.get("/ClinicDentals");
  return response.data;
};
