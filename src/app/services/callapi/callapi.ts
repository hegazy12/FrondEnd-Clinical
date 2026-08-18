import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap, catchError, throwError, Observable } from 'rxjs';
import { VerfivationToken } from '../verfivationToken/verfivation-token';
import { PatientCreate } from '../../interfaces/patient-create'; 
import { createDoctors } from '../../interfaces/CreateDoctor';
import { DTODrug } from '../../interfaces/dtodrug';
import { PatientsResponse,PatientResponse } from '../../interfaces/patient-response';
import { DoctorsResponse } from '../../interfaces/doctor-dto';
import { AppointmentAllinfo, AppointmentDTO0, AppointmentResponse, AppointmentsResponse } from '../../interfaces/appointment-dto-0';
import { Prescriptiondto,PrescriptionResponse } from '../../interfaces/prescription';
import {MedicalExaminationsResponse ,saveMedicalExaminationDTO,saveExaminationListResponse} from '../../interfaces/medical-examinations-dto'
import { VitalSignDto1, VitalSignDtoResponse } from '../../interfaces/vital-dto';
@Injectable({
  providedIn: 'root',
})
export class Callapi 
{
  //private url: string = "http://194.146.24.155/clinical/api/";
  //private url: string = "https://localhost:7262/"
  //private url: string = "https://barge-manhole-crib.ngrok-free.dev/api/"
  //private url: string = "http://192.168.0.148:5000/"
   private url = "http://localhost:5244/"

  
  constructor(private Http:HttpClient , private token :VerfivationToken)
  {
  }
  

  public createPatient(patientData: PatientCreate):Observable<any>
  {
     const headers = new HttpHeaders({'Authorization': `Bearer ${this.token.getToken()}`,
     'ngrok-skip-browser-warning': 'true'});
    
     return this.Http.post<any>(this.url + "Patient/Create",patientData,{ headers }).pipe(
      tap(response => {
      }),
     
      catchError(error => {
        return throwError(() => error);
      })
    );
  }

  public getpatients(nuberpage : number): Observable<any>
   {    
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${this.token.getToken()}`,'ngrok-skip-browser-warning': 'true'});

    return this.Http.get<PatientCreate[]>(this.url + `Patient/GetPatiensInPage/${nuberpage}`, { headers }).pipe(
      tap(response => {}),
      catchError(error => {return throwError(() => error);
      })
    );
  }
  
  public getPatientsNew(): Observable<PatientsResponse>
   {    
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${this.token.getToken()}`,'ngrok-skip-browser-warning': 'true'});
    return this.Http.get<PatientsResponse>(this.url + `Patient/GetPatientsNew`, { headers }).pipe(
      tap(response => {}),
      catchError(error => {return throwError(() => error);
      })
    );
  }


  public GetPatient(id : string)
  {
    const headers = new HttpHeaders({'Authorization': `Bearer ${this.token.getToken()}`,'ngrok-skip-browser-warning': 'true'});
    
    return this.Http.get<PatientResponse>(this.url + `Patient/GetPatient/${id}`, { headers }).pipe(
      tap(response => {}),
      catchError(error => {return throwError(() => error);
      })
    );
  }

  public createِِِAppointment(Create: AppointmentDTO0):Observable<AppointmentResponse>
  {
    const headers = new HttpHeaders({'Authorization': `Bearer ${this.token.getToken()}`,'ngrok-skip-browser-warning': 'true'});
    
     return this.Http.post<AppointmentResponse>(this.url + "Appointment/createAppointment",Create,{ headers }).pipe(
      tap(response => {}),
      catchError(error => {
        return throwError(() => error);
      })
    );
  }



  public createDoctor(Create: createDoctors):Observable<any>
    {
    const headers = new HttpHeaders({'Authorization': `Bearer ${this.token.getToken()}`,'ngrok-skip-browser-warning': 'true'});
    
     return this.Http.post<any>(this.url + "Doctor/CreateDoctor",Create,{ headers }).pipe(
      tap(response => {}),
      catchError(error => {
        return throwError(() => error);
      })
    );
  }
  
  public GetDoctors()
  {
    const headers = new HttpHeaders({'Authorization': `Bearer ${this.token.getToken()}`,'ngrok-skip-browser-warning': 'true'});
    
    return this.Http.get<DoctorsResponse>(this.url + `Doctor/getAllDoctors`, { headers }).pipe(
      tap(response => {}),
      catchError(error => {
        return throwError(() => error);
      })
    );
  }


  public GetPatientAppoinment(PatientId:string):Observable<AppointmentsResponse>
  {
    const headers = new HttpHeaders({'Authorization': `Bearer ${this.token.getToken()}`,'ngrok-skip-browser-warning': 'true'});
    
    return this.Http.get<AppointmentsResponse>(this.url + `Appointment/getPatientAppointments/${PatientId}`, { headers }).pipe(
      tap(response => {}),
      catchError(error => {return throwError(() => error);
      })
    );
  }


  public GetDoctorAppoinment(DoctorId:string):Observable<AppointmentsResponse>
  {
    const headers = new HttpHeaders({'Authorization': `Bearer ${this.token.getToken()}`,'ngrok-skip-browser-warning': 'true'});
    return this.Http.get<AppointmentsResponse>(this.url + `Appointment/getDoctorAppointments/${DoctorId}`, { headers }).pipe(
      tap(response => {}),
      catchError(error => {return throwError(() => error);
      })
    );
  }

  public GetAppointmentAllInfo(AppointmentId:string):Observable<AppointmentAllinfo>
  {
    const headers = new HttpHeaders({'Authorization': `Bearer ${this.token.getToken()}`,'ngrok-skip-browser-warning': 'true'});
    return this.Http.get<AppointmentAllinfo>(this.url + `Appointment/GetAllInfo/${AppointmentId}`, { headers }).pipe(
      tap(response => {}),
      catchError(error => {return throwError(() => error);
      })
    );
  }

  public SearchDrugs(SearchTerm:string)
  {
    const headers = new HttpHeaders({'Authorization': `Bearer ${this.token.getToken()}`,'ngrok-skip-browser-warning': 'true'});
    
    return this.Http.get<DTODrug[]>(this.url + `Drug/GetDrugs?SearchTerm=${SearchTerm}`, { headers }).pipe(
      tap(response => { }),
      catchError(error => {return throwError(() => error);
      })
    );
  }

  public SearchMedicalExaminations(SearchTerm:string)
  {
    
    const headers = new HttpHeaders({'Authorization': `Bearer ${this.token.getToken()}`,'ngrok-skip-browser-warning': 'true'});
    return this.Http.get<MedicalExaminationsResponse>(this.url + `medicalExamination/GetGetDrugs?SearchTerm=${SearchTerm}`, { headers }).pipe(
      tap(response => { }),
      catchError(error => {return throwError(() => error);
      })
    );
    
  }


  public GetDrugById(DrugId:string)
  {
    
  }

  public CreatPrescription(Prescriptiondto : Prescriptiondto)
  {
    const headers = new HttpHeaders({'Authorization': `Bearer ${this.token.getToken()}`,'ngrok-skip-browser-warning': 'true'});
    
    console.log(headers);
    console.log(this.token.getToken());
    
    return this.Http.post<Prescriptiondto>(this.url + `Prescription/Create`,Prescriptiondto, { headers }).pipe(
      tap(response => { }),
      catchError(error => {return throwError(() => error);
      })
    );
  
  }

  public  PrescriptionList(Id:string)
  {
    const headers = new HttpHeaders({'Authorization': `Bearer ${this.token.getToken()}`,'ngrok-skip-browser-warning': 'true'});
    
    return this.Http.get<PrescriptionResponse>(this.url + `Prescription/GetbyappotmintID/${Id}`, { headers }).pipe(
      tap(response => { }),
      catchError(error => {return throwError(() => error);
      })
    );
  }
  
  public createExamination(Create: saveMedicalExaminationDTO):Observable<any>
   {
     const headers = new HttpHeaders({'Authorization': `Bearer ${this.token.getToken()}`,'ngrok-skip-browser-warning': 'true'});  
        return this.Http.post<any>(this.url + "medicalExamination/Add",Create,{ headers }).pipe(
          tap(response => {}),
          catchError(error => {
            return throwError(() => error);
      })
    );
  }

  public ExaminationList(id: string):Observable<saveExaminationListResponse>
   {
     const headers = new HttpHeaders({'Authorization': `Bearer ${this.token.getToken()}`,'ngrok-skip-browser-warning': 'true'});
    
    return this.Http.get<saveExaminationListResponse>(this.url + `medicalExamination/GetByAppointmentId?id=${id}`, { headers }).pipe(
      tap(response => { }),
      catchError(error => {return throwError(() => error);
      })
    );
  }

  public SearchVitals(SearchTerm:string)
  {
    const headers = new HttpHeaders({'Authorization': `Bearer ${this.token.getToken()}`,'ngrok-skip-browser-warning': 'true'});
    
    return this.Http.get<VitalSignDtoResponse>(this.url + `VitalSign/searchByTearm?SearchTerm=${SearchTerm}`, { headers }).pipe(
      tap(response => { }),
      catchError(error => {return throwError(() => error);
      })
    );
  }
  
   public GetPatientAppoinmentStory(DoctorId:string):Observable<AppointmentsResponse>
  {
    const headers = new HttpHeaders({'Authorization': `Bearer ${this.token.getToken()}`,'ngrok-skip-browser-warning': 'true'});
    return this.Http.get<AppointmentsResponse>(this.url + `Appointment/GetAllIsCompleted/${DoctorId}`, { headers }).pipe(
      tap(response => {}),
      catchError(error => {return throwError(() => error);
      })
    );
  }

}
