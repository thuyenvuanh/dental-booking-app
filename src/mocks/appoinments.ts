import {default as appointments} from './appointment.json';
import {Appointment} from "../type.ts";

export const mockAppointments: Appointment[] = appointments as unknown as Appointment[];

// export const mockAppointments = () => {
//     console.log(appointments);
// }