export interface Patient {
  fristName: string; 
  lastName: string;
  phone: string;
}

export interface AppointmentDoctor {
  patient: Patient;
  patientId: string;
  id: string;
  appoinmentDate: string; 
  deposit: number;
  note: string;
}