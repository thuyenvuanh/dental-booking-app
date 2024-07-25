import { MenuProps } from "antd";
import { ROLE } from "./constants/default";

export interface UserDetails {
  $id: string;
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  userName: string;
  rolesName: RolesName;
  dentist?: Dentist;
  dob: any;
  phoneNumber: string;
  sex: boolean;
  status: number;
}
export interface RolesName {
  $id: string;
  $values: ROLE[];
}

export interface LocationData {
  type?: "success" | "info" | "error" | "warning";
  message?: string;
  description?: string;
  data?: object;
}

export type MenuItem = Required<MenuProps>["items"][number];

export interface LevelKeysProps {
  key?: string;
  children?: LevelKeysProps[];
}

export interface AuthToken {
  token: string;
  refreshToken: string;
}
export type AppointmentOptionsType = "byDentist" | "bySpecificDate" | "";

export interface HookProps {
  children: React.ReactNode;
}

export interface AuthDetails {
  userDetails?: UserDetails;
}

export interface Dentist {
  id: string;
  description: string;
  licenseNumber: string;
  yearOfExperience: number;
  status: number;
  createAt: Date;
  updateAt: Date;
  clinicDentalId: string;
  clinicDental: ClinicDetail;
  appointments: Appointment[] | DNAppointment;
}

export interface DNAppointment {
  $id: string;
  $values: Appointment[];
}

export interface ClinicDetail {
  id: string;
  name: string;
  address: string;
  openTime: string;
  closeTime: string;
  slotDuration: number;
  maxPatientsPerSlot: number;
  maxTreatmentPerSlot: number;
  status: number;
  createAt: Date;
  updateAt: Date;
  onwerId: string;
  user?: ApplicationUser;
  appointments: Appointment[];
  dentists: Dentist[];
}

export interface AppointmentNotification {
  id: string;
  sendAt: Date;
  message: string;
  createAt: Date;
  sendToId: string;
  user: ApplicationUser;
}

export interface Appointment {
  id: string;
  clinicId: string;
  customerId: string;
  dentistId: string;
  startAt: string;
  endAt: string;
  type: string;
  periodicInterval: number;
  status: number;
  note: string;
  createAt: string;
  updateAt: string;
}

export interface ApplicationUser {
  dob: Date;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  address: string;
  sex: boolean;
  status: number;
  avatarUrl: string;
  isConfirmEmail: boolean;
  isActive: boolean;
  createAt: Date;
  updateAt: Date;
  refreshToken: string;
  dateExpireRefreshToken: Date;
  dentist: Dentist;
  clinicDentals: ClinicDetail[];
  appointments: Appointment[];
  appointmentNotifications: AppointmentNotification[];
}

export interface SignUpForm {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  userName: string;
  isAdmin: boolean;
  dob: string;
  phoneNumber: string;
  address: string;
  sex: boolean;
  status: number;
}
