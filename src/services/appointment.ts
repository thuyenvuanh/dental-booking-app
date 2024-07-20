import axios from "axios";
import { Appointment } from "../type";

export const listAppointmentApi = async (
  userId: string
): Promise<Appointment[]> => {
  var response = await axios.get("/appointment/getByUserId", {
    params: { userId },
  });
  return response.data.$values as Appointment[];
};

export const appointmentById = async (
  appointmentId: string
): Promise<Appointment> => {
  var response = await axios.get(`/appointment/getById/${appointmentId}`);
  return response.data as Appointment;
};
