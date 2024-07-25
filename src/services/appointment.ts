import axios from "axios";
import { Appointment } from "../type";
import { NewAppointment } from "./api/appointment";
import { isNil } from "lodash";

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
  const response = await axios.post("/dentist/registerAppointment", data);
  return response.data as Appointment;
};

export const getAppointmentsByDate = async (params: { datetime: string }) => {
  const response = await axios.get("/admin/getAllAppointmentByDate", {
    params,
  });
  return response.data as {
    $id: string;
    $values: Appointment[];
  };
};

export const dentistAppointmentApi = async (params?: {
  dateTime?: string;
  status?: number;
  dentistId: string;
}) => {
  const response = await axios.get(
    `/appointment/getAllDentistAppointmentByDate`,
    !isNil(params) ? { params } : {}
  );
  return response.data as {
    $id: string;
    $values: Appointment[];
  };
};
