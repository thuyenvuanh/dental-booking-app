import axios from "axios";
import { Dentist } from "../type";

//interfaces
export interface CreateDentist {
  description: string;
  licenseNumber: string;
  yearOfExperience: number;
  clinicDentalId: string;
}

export const listDentistsApi = async (): Promise<Dentist[]> => {
  const response = await axios.get("/Dentists");
  return response.data as Dentist[];
};

export const createDentistApi = async (
  data: CreateDentist
): Promise<Dentist> => {
  const response = await axios.post("/Dentists", data);
  return response.data;
};
