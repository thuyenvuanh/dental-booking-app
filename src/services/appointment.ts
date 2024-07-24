import axios from "axios";
import { Appointment } from "../type";
import { NewAppointment } from "./api/appointment";

export const listAppointmentApi = async (
  userId: string
): Promise<Appointment[]> => {
  const response = await axios.get("/appointment/getByUserId", {
    params: { userId },
  });
  return response.data.$values as Appointment[];
};

export const appointmentByIdApi = async (
  appointmentId: string
): Promise<Appointment> => {
  const response = await axios.get(`/appointment/getById/${appointmentId}`);
  return response.data as Appointment;
};

export const appointmentsByUserIdApi = async (
  userId: string
): Promise<Appointment[]> => {
  const response = await axios.get("/appointment/getByUserId", {
    params: { userId },
  });
  return response.data as Appointment[];
};

export const createAppointmentApi = async (data: NewAppointment) => {
  const response = await axios.post("/appointment/create", data);
  return response.data as Appointment;
};