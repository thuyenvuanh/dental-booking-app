import axios from "axios";
import { Dentist } from "../type";
import { NewDentistDetail } from "./api/dentistApi";

export const listDentistsApi = async (): Promise<Dentist[]> => {
  const response = await axios.get("/Dentists");
  return response.data as Dentist[];
};

export const createDentistApi = async (
  data: NewDentistDetail
): Promise<Dentist> => {
  const response = await axios.post("/Dentists", data);
  return response.data;
};
