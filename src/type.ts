import {MenuProps} from "antd";

export interface UserDetails {
  $id: string;
  dob: any;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  address: string;
  sex: boolean;
  status: number;
  avatarUrl: any;
  isConfirmEmail: boolean;
  isActive: boolean;
  createAt: string;
  updateAt: any;
  refreshToken: string;
  dateExpireRefreshToken: string;
  dentist: any;
  clinicDentals: any;
  appointments: any;
  appointmentNotifications: any;
  id: string;
  userName: string;
  normalizedUserName: string;
  email: string;
  normalizedEmail: string;
  emailConfirmed: boolean;
  passwordHash: string;
  securityStamp: string;
  concurrencyStamp: string;
  phoneNumberConfirmed: boolean;
  twoFactorEnabled: boolean;
  lockoutEnd: any;
  lockoutEnabled: boolean;
  accessFailedCount: number;
}

export interface AuthStateLocation {
  type: "success" | "info" | "error" | "warning";
  message: string;
  description: string;
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
    clinicDentalId: number;
    clinicDental: ClinicDetail;
    appointments: Appointment[];
}

export interface ClinicDetail {
    id: string;
    name: string;
    address: string;
    openTime: Date;
    closeTime: Date;
    slotDuration: number;
    maxPatientsPerSlot: number;
    maxTreatmentPerSlot: number;
    status: number;
    createAt: Date;
    updateAt: Date;
    onwerId: string;
    user: ApplicationUser;
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
    date: Date;
    type: number;
    periodicInterval: number;
    status: number;
    createAt: Date;
    updateAt: Date;
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
    dentist: Dentist,
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
  isAdmin: string;
  dob: string;
  phoneNumber: string;
  address: string;
  sex: boolean;
  status: number;
}
