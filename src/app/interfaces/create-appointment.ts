export interface CreateAppointment {
  dateTimeAppoinment: Date | string; 
  note?: string | null;               
  doctorId: string;                  
  patientId: string;                
  deposit: number;                   
}
