import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap, catchError, throwError, Observable } from 'rxjs';
import { VerfivationToken} from '../verfivationToken/verfivation-token';
import { Patient, PatientCreate} from '../../interfaces/patient-create'; 
import { CreateAppointment} from '../../interfaces/create-appointment'; 
import { DTODocror,Appointment} from '../../interfaces/dtodocror'
import { createDoctors} from '../../interfaces/CreateDoctor'
import {DTODrug} from '../../interfaces/dtodrug'
@Injectable({
  providedIn: 'root',
})
export class Callapi 
{
  private url: string = "http://194.146.24.155/clinical/api/";
  //private url: string = "http://localhost:5076/api/"
  
  constructor(private Http:HttpClient , private token :VerfivationToken)
  {
  }
  

  public createPatient(patientData: PatientCreate):Observable<any>
  {
     const headers = new HttpHeaders({'Authorization': `Bearer ${this.token.getToken()}`});
    
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
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${this.token.getToken()}`});

    return this.Http.get<PatientCreate[]>(this.url + `Patient/GetPatiensInPage/${nuberpage}`, { headers }).pipe(
      tap(response => {}),
      catchError(error => {return throwError(() => error);
      })
    );
  }
  
  public GetPatient(id : string)
  {
    const headers = new HttpHeaders({'Authorization': `Bearer ${this.token.getToken()}`});
    
    return this.Http.get<Patient>(this.url + `Patient/GetPatien/${id}`, { headers }).pipe(
      tap(response => {}),
      catchError(error => {return throwError(() => error);
      })
    );
  }
  public createِِِAppointment(Create: CreateAppointment):Observable<any>
  {
    const headers = new HttpHeaders({'Authorization': `Bearer ${this.token.getToken()}`});
    
     return this.Http.post<any>(this.url + "Appointment/Creat",Create,{ headers }).pipe(
      tap(response => {}),
      catchError(error => {
        return throwError(() => error);
      })
    );
  }
  public createDoctor(Create: createDoctors):Observable<any>
    {
    const headers = new HttpHeaders({'Authorization': `Bearer ${this.token.getToken()}`});
    
     return this.Http.post<any>(this.url + "Doctor/CreateDoctor",Create,{ headers }).pipe(
      tap(response => {}),
      catchError(error => {
        return throwError(() => error);
      })
    );
  }
  public GetDoctors()
  {
    const headers = new HttpHeaders({'Authorization': `Bearer ${this.token.getToken()}`});
    
    return this.Http.get<DTODocror[]>(this.url + `Doctor/getDoctors`, { headers }).pipe(
      tap(response => {}),
      catchError(error => {
        return throwError(() => error);
      })
    );
  }
  
  
  public GetPatientAppoinment(PatientId:string)
  {
    const headers = new HttpHeaders({'Authorization': `Bearer ${this.token.getToken()}`});
    
    return this.Http.get<Appointment[]>(this.url + `Appointment/GetDTOAppoinments/${PatientId}`, { headers }).pipe(
      tap(response => {}),
      catchError(error => {return throwError(() => error);
      })
    );
  }

  
  public SearchDrugs(SearchTerm:string)
  {
    const headers = new HttpHeaders({'Authorization': `Bearer ${this.token.getToken()}`});
    
    return this.Http.get<DTODrug[]>(this.url + `Drug/GetDrugs/${SearchTerm}`, { headers }).pipe(
      tap(response => { }),
      catchError(error => {return throwError(() => error);
      })
    );
  }

}
