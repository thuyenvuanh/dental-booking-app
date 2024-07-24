export interface NewAppointment {
  clinicId: string;
  customerId: string;
  dentistId: string;
  startAt: string;
  endAt: string;
  type: "THAM KHAM";
  note: string;
  periodicInterval: number;
  status: number;
}
