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

export const defaultNewDentist = {
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
  description: "",
  yearOfExperience: "",
  licenseNumber: "",
  clinicDentalId: "",
};

export const ROLE_KEY =
  "http://schemas.microsoft.com/ws/2008/06/identity/claims/role";

export type ROLE = "GUEST" | "CUSTOMER" | "ADMINISTRATOR";
