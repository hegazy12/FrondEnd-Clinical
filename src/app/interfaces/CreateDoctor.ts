// Body of POST Doctor/CreateDoctor (DoctorDTO_0 on the server). The doctor's name
// and email come from the linked user account, so they are not sent.
export interface createDoctors {
    userId: string;
    specialization: string;
    clinicName: string;
    clinicAddress: string;
    clinicPhoneNumber: string;
    clinicEmail: string;
}
