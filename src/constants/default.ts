import { NewAppointment } from "../services/api/appointment";
import { NewDentistDetail } from "../services/api/dentistApi";
import { SignUpForm } from "../type";

export const AUTH_DETAILS = "authDetails";
export const defaultSignUpForm: SignUpForm = {
  email: "",
  firstName: "",
  lastName: "",
  password: "",
  userName: "",
  isAdmin: false,
  dob: "",
  phoneNumber: "",
  address: "",
  sex: true,
  status: 1,
};

export const defaultNewDentist: NewDentistDetail = {
  email: "",
  firstName: "",
  lastName: "",
  password: "",
  userName: "",
  isDentist: true,
  dob: "",
  phoneNumber: "",
  sex: true,
  status: 1,
  description: "",
  yearOfExperience: 0,
  licenseNumber: "",
  clinicDentalId: "",
};

export const defaultNewClinic = {
  id: "",
  name: "",
  address: "",
  openCloseTime: ["", ""],
  slotDuration: 15,
  maxPatientsPerSlot: 1,
  maxTreatmentPerSlot: 1,
  status: 0,
  createAt: new Date(),
  updateAt: new Date(),
  onwerId: "",
  appointments: [],
  dentists: [],
};

export const defaultNewAppointment: NewAppointment = {
  clinicId: "",
  customerId: "",
  dentistId: "",
  startAt: "",
  endAt: "",
  type: "THAM KHAM",
  note: "",
  periodicInterval: 0,
  status: 0,
};

export const ROLE_KEY =
  "http://schemas.microsoft.com/ws/2008/06/identity/claims/role";

export type ROLE = "Guest" | "Customer" | "Administrator" | "Dentist";

export const defaultSteps = [
  {
    title: "Hình thức đặt lịch",
  },
  {
    title: "Điền thông tin",
  },
  {
    title: "Thành công",
  },
];

export const newAppointmentByDentist = [
  {
    title: "Hình thức đặt lịch",
  },
  {
    title: "Chọn nha sĩ",
  },
  {
    title: "Chọn thời gian hẹn",
  },
  {
    title: "Thành công",
  },
];
export const newAppointmentBySpecDay = [
  {
    title: "Hình thức đặt lịch",
  },
  {
    title: "Chọn thời gian hẹn",
  },
  {
    title: "Chọn nha sĩ",
  },
  {
    title: "Thành công",
  },
];
