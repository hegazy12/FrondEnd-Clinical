import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap, catchError, throwError, Observable } from 'rxjs';
import { VerfivationToken } from '../verfivationToken/verfivation-token';
import { PatientCreate } from '../../interfaces/patient-create'; 
import { createDoctors } from '../../interfaces/CreateDoctor';
import { DTODrug } from '../../interfaces/dtodrug';
import { PatientsResponse,PatientResponse } from '../../interfaces/patient-response';
import { DoctorsResponse, SpecializationResponse } from '../../interfaces/doctor-dto';
import { AppointmentAllinfo, AppointmentDTO0, AppointmentResponse, AppointmentsResponse, AppointmentsStoryResponse, makeCompleteResponse } from '../../interfaces/appointment-dto-0';
import { createPrescriptionResponse, Prescriptiondto,PrescriptionResponse } from '../../interfaces/prescription';
import { MedicalExaminationsResponse ,saveMedicalExaminationDTO,saveExaminationListResponse, FullByIdResponse, ExaminationPhotoResponse} from '../../interfaces/medical-examinations-dto'
import { ListsaveVitalSignResponse, saveVitalSignDto,  saveVitalSignResponse, VitalSignDtoResponse } from '../../interfaces/vital-dto';
import { LinkService} from '../linkService/link-service'
import { CreateDiagnosDTO, CreateDiagnosisResponse, GetDiagnosisListResponse, GetDiagnosisMasterResponse } from '../../interfaces/diagnos-dto';
import { GeneralResponse } from '../../interfaces/general-response';
import { UploadPhotoRequest } from '../../interfaces/upload-photo-request';
import { ListSheetResponse, SheetDto, SheetDto1, SheetsInAppointmentSavedResponse } from '../../interfaces/sheet-dto';
import { GetsaveQuestionInSheetResponse, QuestionDTO, QuestionListResponse, SaveAnswersListResponse, saveQuestionDTO, SaveQuestionResponse} from '../../interfaces/question-dto';
import { RegisterResponse, UserDto } from '../../interfaces/user-dto';
@Injectable({
  providedIn: 'root',
})
export class Callapi 
{
  //private url: string = "http://194.146.24.155/clinical/api/";
  //private url: string = "https://localhost:7262/"
  // private url: string = "https://barge-manhole-crib.ngrok-free.dev/api/"
  //private url: string = "http://192.168.0.148:5000/"
  private url = "";

  
  constructor(private Http:HttpClient , private token :VerfivationToken,private LinkService : LinkService)
  {
    this.url = LinkService.gitLinK();
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

  public createAppointment(Create: AppointmentDTO0):Observable<AppointmentResponse>
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

  public CreatPrescription(Prescriptiondto : Prescriptiondto):Observable<createPrescriptionResponse>
  {
    const headers = new HttpHeaders({'Authorization': `Bearer ${this.token.getToken()}`,'ngrok-skip-browser-warning': 'true'});
    return this.Http.post<createPrescriptionResponse>(this.url + `Prescription/Create`,Prescriptiondto, { headers }).pipe(
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

  public GetPatientAppoinmentStory(PatientId:string):Observable<AppointmentsResponse>
  {
    const headers = new HttpHeaders({'Authorization': `Bearer ${this.token.getToken()}`,'ngrok-skip-browser-warning': 'true'});
    return this.Http.get<AppointmentsResponse>(this.url + `Appointment/GetAllIsCompleted/${PatientId}`, { headers }).pipe(
      tap(response => {}),
      catchError(error => {return throwError(() => error);
      })
    );
  }

  public makeItComplete(AppointmentId:string):Observable<makeCompleteResponse> {
    const headers = new HttpHeaders({'Authorization': `Bearer ${this.token.getToken()}`,'ngrok-skip-browser-warning': 'true'});
    
    return this.Http.get<makeCompleteResponse>(this.url + `Appointment/makeItComplete/${AppointmentId}`, { headers }).pipe(
      tap(response => {}),
      catchError(error => {return throwError(() => error);
      })
    );
  }
 
  public GetAppoinmentStory(AppointmentId:string):Observable<AppointmentsStoryResponse> {
      const headers = new HttpHeaders({'Authorization': `Bearer ${this.token.getToken()}`,'ngrok-skip-browser-warning': 'true'});
      return this.Http.get<AppointmentsStoryResponse>(this.url + `Appointment/GetHistoryAppointment/${AppointmentId}`, { headers }).pipe(
        tap(response => {}),
        catchError(error => {return throwError(() => error);
      })
    );
  }

  public CreateMasterDiagnos(Create: CreateDiagnosDTO) : Observable<CreateDiagnosisResponse>
  {
    const headers = new HttpHeaders({'Authorization': `Bearer ${this.token.getToken()}`,'ngrok-skip-browser-warning': 'true'});
    return this.Http.post<CreateDiagnosisResponse>(this.url + "Diagnos/AddDiagnos",Create,{ headers }).pipe(
      tap(response => {}),
      catchError(error => {
        return throwError(() => error);
      })
    );
  }

  public GetDiagnosByAppointmentId(AppointmentId:string):Observable<GetDiagnosisListResponse>
  {
    const headers = new HttpHeaders({'Authorization': `Bearer ${this.token.getToken()}`,'ngrok-skip-browser-warning': 'true'});
    return this.Http.get<GetDiagnosisListResponse>(this.url + `Diagnos/GetDiagnosByAppoitmentID/${AppointmentId}`, { headers }).pipe(
      tap(response => {}),
      catchError(error => {return throwError(() => error);
      })
    );
  }

  public SearchDiagnos(SearchTerm:string):Observable<GetDiagnosisMasterResponse>
  {
    const headers = new HttpHeaders({'Authorization': `Bearer ${this.token.getToken()}`,'ngrok-skip-browser-warning': 'true'});
    return this.Http.get<GetDiagnosisMasterResponse>(this.url + `Diagnos/GetDiagnos?SearchTerm=${SearchTerm}`, { headers }).pipe(
      tap(response => {}),
      catchError(error => {return throwError(() => error);
      })
    );
  }
  
  public DeleteDiagnos(DiagnosId:string):Observable<CreateDiagnosisResponse>
  {
    const headers = new HttpHeaders({'Authorization': `Bearer ${this.token.getToken()}`,'ngrok-skip-browser-warning': 'true'});
    return this.Http.delete<CreateDiagnosisResponse>(this.url + `Diagnos/Delete/${DiagnosId}`, { headers }).pipe(
      tap(response => {}),
      catchError(error => {return throwError(() => error);
      })
    );
  }
  
  public DeleteAppointmentById(Id:string):Observable<AppointmentResponse>
  {
    const headers = new HttpHeaders({'Authorization': `Bearer ${this.token.getToken()}`,'ngrok-skip-browser-warning': 'true'});
    
     return this.Http.delete<AppointmentResponse>(this.url + `Appointment/DeleteAppointment/${Id}`,{ headers }).pipe(
      tap(response => {}),
      catchError(error => {
        return throwError(() => error);
      })
    );
  }

  public DeletePrescription(Id:string):Observable<createPrescriptionResponse>
  {
    const headers = new HttpHeaders({'Authorization': `Bearer ${this.token.getToken()}`,'ngrok-skip-browser-warning': 'true'});
    return this.Http.delete<createPrescriptionResponse>(this.url + `Prescription/Delete/${Id}`, { headers }).pipe(
      tap(response => { }),
      catchError(error => {return throwError(() => error);
      })
    );
  }
  
  public DeleteExamination(Id:string):Observable<any>
   {
     const headers = new HttpHeaders({'Authorization': `Bearer ${this.token.getToken()}`,'ngrok-skip-browser-warning': 'true'});  
        return this.Http.delete<any>(this.url + `medicalExamination/DeleteMedicalExamination/${Id}`,{ headers }).pipe(
          tap(response => {}),
          catchError(error => {
            return throwError(() => error);
      })
    );
  }

  uploadPhotoExamination(examinationId: string, UploadPhotoRequest: UploadPhotoRequest): Observable<GeneralResponse<string>>
  {

      const headers = new HttpHeaders({'Authorization': `Bearer ${this.token.getToken()}`,'ngrok-skip-browser-warning': 'true'});  
      return this.Http.post<GeneralResponse<string>>(this.url + `medicalExamination/UploadPhoto/${examinationId}`,UploadPhotoRequest ,{headers } ).
        pipe(
          tap(response => {}),
          catchError(error => {
          return throwError(() => error);
      })
    );
  }

  public GetExaminationByIdFull(examinationId: string) : Observable<FullByIdResponse>
  {

    const headers = new HttpHeaders({'Authorization': `Bearer ${this.token.getToken()}`,'ngrok-skip-browser-warning': 'true'});
    
    return this.Http.get<FullByIdResponse>(this.url + `medicalExamination/GetByIdFull/${examinationId}`, { headers }).pipe(
      tap(response => { }) ,
      catchError(error => {
        return throwError(() => error);
      })
    );
  }

  public GetExaminationPhotoById(examinationId: string): Observable<ExaminationPhotoResponse>
  {    
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${this.token.getToken()}`,'ngrok-skip-browser-warning': 'true'});
    return this.Http.get<ExaminationPhotoResponse>(this.url + `medicalExamination/GetExaminationsByIdPhotos/${examinationId}`, { headers }).pipe(
      tap(response => {}),
      catchError(error => {return throwError(() => error);
      })
    );
  }

  public saveVitalSign (save: saveVitalSignDto) : Observable<saveVitalSignResponse>
  {
    const headers = new HttpHeaders({'Authorization': `Bearer ${this.token.getToken()}`,'ngrok-skip-browser-warning': 'true'});
    return this.Http.post<saveVitalSignResponse>(this.url + "VitalSign/save",save,{ headers }).pipe(
      tap(response => {}),
      catchError(error => {
        return throwError(() => error);
      })
    );
  }
  
  public GetsaveVitalSighAppoinmenById(AppointmentId:string) : Observable<ListsaveVitalSignResponse>
  {
      const headers = new HttpHeaders({'Authorization': `Bearer ${this.token.getToken()}`,'ngrok-skip-browser-warning': 'true'});
      return this.Http.get<ListsaveVitalSignResponse>(this.url + `VitalSign/GetByAppointmentId/${AppointmentId}`, { headers }).pipe(
        tap(response => {}),
        catchError(error => {return throwError(() => error);
      })
    );
  }

  public DeleteVitalSigh(Id:string):Observable<any>
   {
     const headers = new HttpHeaders({'Authorization': `Bearer ${this.token.getToken()}`,'ngrok-skip-browser-warning': 'true'});  
        return this.Http.delete<any>(this.url + `VitalSign/Delete/${Id}`,{ headers }).pipe(
          tap(response => {}),
          catchError(error =>
          {
            return throwError(() => error);
          })
    );
  }

  public DeleteSheet(Id:string):Observable<any>
   {
     const headers = new HttpHeaders({'Authorization': `Bearer ${this.token.getToken()}`,'ngrok-skip-browser-warning': 'true'});  
        return this.Http.delete<any>(this.url + `Sheet/Delete/${Id}`,{ headers }).pipe(
          tap(response => {}),
          catchError(error =>
          {
            return throwError(() => error);
          })
    );
  }
  
  public DeleteQuestion(Id:string):Observable<any>
   {
     const headers = new HttpHeaders({'Authorization': `Bearer ${this.token.getToken()}`,'ngrok-skip-browser-warning': 'true'});  
        return this.Http.delete<any>(this.url + `Question/Delete/${Id}`,{ headers }).pipe(
          tap(response => {}),
          catchError(error =>
          {
            return throwError(() => error);
          })
    );
  }

   public DeleteSaveQuestion(Id:string):Observable<any>
   {
     const headers = new HttpHeaders({'Authorization': `Bearer ${this.token.getToken()}`,'ngrok-skip-browser-warning': 'true'});  
        return this.Http.delete<any>(this.url + `saveQuestion/Delete/${Id}`,{ headers }).pipe(
          tap(response => {}),
          catchError(error =>
          {
            return throwError(() => error);
          })
    );
  }

  public CreatSheet(Sheet : SheetDto):Observable<SheetDto1>
  {
    const headers = new HttpHeaders({'Authorization': `Bearer ${this.token.getToken()}`,'ngrok-skip-browser-warning': 'true'});
    return this.Http.post<SheetDto1>(this.url + `Sheet/save`,Sheet, { headers }).pipe(
      tap(response => { }),
      catchError(error => {return throwError(() => error);
      })
    );
  }

  public SheetList():Observable<ListSheetResponse>
   {
    const headers = new HttpHeaders({'Authorization': `Bearer ${this.token.getToken()}`,'ngrok-skip-browser-warning': 'true'});
    
    return this.Http.get<ListSheetResponse>(this.url + `Sheet/GetAll`, { headers }).pipe(
      tap(response => { }),
      catchError(error => {return throwError(() => error);
      })
    );
  }

  public AddQuestion(Question : QuestionDTO):Observable<SaveQuestionResponse>
  {
    const headers = new HttpHeaders({'Authorization': `Bearer ${this.token.getToken()}`,'ngrok-skip-browser-warning': 'true'});
    return this.Http.post<SaveQuestionResponse>(this.url + `Question/save`,Question, { headers }).pipe(
      tap(response => { }),
      catchError(error => {return throwError(() => error);
      })
    );
  }

  public GitQuestionsBySheetId(Id:string):Observable<QuestionListResponse>
  {
   const headers = new HttpHeaders({ 'Authorization': `Bearer ${this.token.getToken()}`,'ngrok-skip-browser-warning': 'true'});
    return this.Http.get<QuestionListResponse>(this.url + `Question/getbysheetid/${Id}`, { headers }).pipe(
      tap(response => {}),
      catchError(error => {return throwError(() => error);
      })
    );
  }

  public GitQuestionsBySheetId1(Id:string,appointmentId:string):Observable<QuestionListResponse>
  {
   const headers = new HttpHeaders({ 'Authorization': `Bearer ${this.token.getToken()}`,'ngrok-skip-browser-warning': 'true'});
    return this.Http.get<QuestionListResponse>(this.url + `Question/getbysheetid/${Id}/${appointmentId}`, { headers }).pipe(
      tap(response => {}),
      catchError(error => {return throwError(() => error);
      })
    );
  }

  public GetsaveQuestionInSheet(Id:string,appointmentId:string):Observable<GetsaveQuestionInSheetResponse>
  {
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${this.token.getToken()}`,'ngrok-skip-browser-warning': 'true'});
    return this.Http.get<GetsaveQuestionInSheetResponse>(this.url + `saveQuestion/getbysheetid/${Id}/${appointmentId}`, { headers }).pipe(
      tap(response => {}),
      catchError(error => {return throwError(() => error);
      })
    );

  }

  public GitQuestionsByDepndOnQuestionID(Id:string):Observable<QuestionListResponse>
  {
   const headers = new HttpHeaders({ 'Authorization': `Bearer ${this.token.getToken()}`,'ngrok-skip-browser-warning': 'true'});
    return this.Http.get<QuestionListResponse>(this.url + `Question/GetbyDepndOnQuestionID/${Id}`, { headers }).pipe(
      tap(response => {}),
      catchError(error => {return throwError(() => error);
      })
    );
  }

  public CreateUser(User :UserDto):Observable<RegisterResponse>
  {
    const headers = new HttpHeaders({'Authorization': `Bearer ${this.token.getToken()}`,'ngrok-skip-browser-warning': 'true'});
    return this.Http.post<RegisterResponse>(this.url + "Account/Register",User,{ headers }).pipe(
      tap(response => {}),
      catchError(error => {
        return throwError(() => error);
      })
    );
  }

  public SaveAnswersList( AnswersList :saveQuestionDTO[]) :Observable<SaveAnswersListResponse>
  {
    const headers = new HttpHeaders({'Authorization': `Bearer ${this.token.getToken()}`,'ngrok-skip-browser-warning': 'true'});
    return this.Http.post<SaveAnswersListResponse>(this.url + "saveQuestion/AddList",AnswersList,{ headers }).pipe(
      tap(response => {}),
      catchError(error => {
        return throwError(() => error);
      })
    );
  }

  public GetSheetsInAppointmentSaved(id:string):Observable<SheetsInAppointmentSavedResponse>
  {
     const headers = new HttpHeaders({'Authorization': `Bearer ${this.token.getToken()}`,'ngrok-skip-browser-warning': 'true'});
     return this.Http.get<SheetsInAppointmentSavedResponse>(this.url + `saveQuestion/GetSheetsInAppointmentSaved/${id}`,{ headers }).pipe(
      tap(response => {}),
      catchError(error => {
        return throwError(() => error);
      })
    );
  }

  public GetSpecializations():Observable<SpecializationResponse>
  {
      const headers = new HttpHeaders({'Authorization': `Bearer ${this.token.getToken()}`,'ngrok-skip-browser-warning': 'true'});
     return this.Http.get<SpecializationResponse>(this.url + `Doctor/GetAllSpecialization`,{ headers }).pipe(
      tap(response => {}),
      catchError(error => {
        return throwError(() => error);
      })
    );

  }
 
}
