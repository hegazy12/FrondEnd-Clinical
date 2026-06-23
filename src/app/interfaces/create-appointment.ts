export interface CreateAppointment {
  dateAppoinment: Date | string; 
  note?: string | null;               
  doctorId: string;                  
  patientId: string;                
  deposit: number;                   
}
