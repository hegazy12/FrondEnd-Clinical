export interface PatientCreate {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    dateOfBirth : Date | string;
    address : string;
    gender : string;
}


export interface Patient {
    id :string ;
    firstName: string; 
    lastName: string;
    phoneNumber: string;
}
