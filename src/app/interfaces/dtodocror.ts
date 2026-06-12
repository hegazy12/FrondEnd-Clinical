export interface DTODocror {
  id: string;
  firstName: string;   
  lastName: string;
  specialization: string;
}

export interface Appointment {
  id: string;
  appoinmentDate: string; 
  doctor: DTODocror;
  deposit: number;
  note: string;
}