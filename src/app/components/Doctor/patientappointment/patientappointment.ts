import { Component,signal,ViewChild } from '@angular/core';
import { VerfivationToken } from '../../../services/verfivationToken/verfivation-token';
import { Router,ActivatedRoute } from '@angular/router';
import { Callapi } from '../../../services/callapi/callapi';
import { Navbar } from '../../navbar/navbar';
import { AppointmentAllinfo , AppointmentDTO1, AppointmentDTO2, AppointmentsResponse, makeCompleteResponse} from '../../../interfaces/appointment-dto-0';
import { MakePrescription } from '../../Prescription/make-prescription/make-prescription';
import { DatePipe } from '@angular/common';
import { CreatInvestgation } from '../../investgation/creat-investgation/creat-investgation';
import { CreatVital } from '../../vital/creat-vital/creat-vital';
import { PatientStory } from '../../History/patient-story/patient-story';
import Swal, { SweetAlertIcon } from 'sweetalert2';
import { CCreateAppintment } from '../../Appointment/ccreate-appintment/ccreate-appintment';
@Component({
  selector: 'app-patientappointment',
  imports:  [Navbar,MakePrescription,DatePipe,CreatInvestgation,CreatVital,PatientStory,CCreateAppintment],
  templateUrl: './patientappointment.html',
  styleUrl: './patientappointment.css',
})

export class Patientappointment {
  @ViewChild(PatientStory) PatientStoryRef!: PatientStory;

  public appointmentId: string = "";
  
  public view = signal<number>(1);
  
  public PatientId: string ="";
  
  public makeCompleteResponse = signal<makeCompleteResponse| null>(null);
  
  public AppointmentsResponse = signal<AppointmentsResponse>;
  
  public Appointments=signal<AppointmentDTO1[]>([]);
  
  public x = signal<boolean>(false);

  constructor(private callapi : Callapi,
              private router:Router,
              private Vervication:VerfivationToken,
              private route: ActivatedRoute)
              { 
                  this.appointmentId = this.route.snapshot.paramMap.get('id') || '';
              }
  
  ngOnInit():void {
  if(this.Vervication.islogin() == false)
    {
        this.router.navigate(['/login']);
    }
    else
    {
        this.GetAppointment(this.appointmentId);
    }
  }
  
  public viewpage(viewName : string)
  {
    console.log(viewName);
    if(viewName == "prescription"){
      this.view.set(1);
    }else if(viewName == "investgation"){
      this.view.set(2);
    }else if(viewName == "vitalsigns"){ 
      this.view.set(3);
    }
    else if(viewName == "allergies"){ 
      this.view.set(4);
    }else if(viewName == "viewhistory"){
      this.view.set(5);
      setTimeout(() => {
        this.PatientStoryRef?.GetAppointment(this.PatientId);
       }, 20);
    }else if(viewName == "addnextvisit"){
        this.view.set(6);
    }else if(viewName == "diagnos"){
        this.view.set(7);
    }

  }

  public appointmentResponse = signal<AppointmentAllinfo | null>(null);
  public appointment = signal<AppointmentDTO2 | null>(null);

  public GetAppointment(id : string) : boolean
  {
     let Sup = this.callapi.GetAppointmentAllInfo(id).subscribe({
        next: (P :AppointmentAllinfo ) =>
          {
            this.appointment.set(P.data);
            this.PatientId = P.data.patientDTO_1.id;
            Sup.unsubscribe();
          },
        error: (err) => 
        {
          Sup.unsubscribe();
        }
        });
          return true;
  }
  
  public async callMakeItComplete()
  {

   let x = await this.GetPatientAppoinment(this.PatientId)
   
   let values: { icon: SweetAlertIcon; message: string } = {
        icon: "info",
        message: ""
      };
    
    console.log("let values: { icon: SweetAlertIcon; message: string }");
    
    console.log(x);
    
    if(this.x() == false)
    {
      values.icon = "question";
      values.message = "This Patient Dont Have Next Appointment"
    }else{
      values.icon = "info";
      values.message = "To Close This Appointmen";
    }

    Swal.fire({   
      title: "Are you sure?",
      text: values.message,
      icon: values.icon,
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes,Save"
    }).then((result) => {
      if (result.isConfirmed){
        this.makeItComplete(this.appointmentId);
        if(this.makeCompleteResponse()?.success){ 
            Swal.fire({
              title: "savaing!",
              text: "Your file has been saved.",
              icon: "success"
          });
        }else{
          Swal.fire({
              title: "savaing!",
              text: "Your file has been not saved.",
              icon: "warning"  
            });
        }
      }
    });
  }
  
  public makeItComplete(appointmentId: string): void {
    this.callapi.makeItComplete(appointmentId).subscribe({
      next: (response: makeCompleteResponse) => {
      this.makeCompleteResponse.set(response);
      },
      error: (err) => {
        console.error('Error completing appointment:', err);
      }
    });
  }
  
  public async GetPatientAppoinment(patientId : string) 
  {
    let Sup = await this.callapi.GetPatientAppoinment(patientId).subscribe({
    next: (P : AppointmentsResponse) =>
      {
          this.Appointments.set(P.data);
          console.log(P.data);
          console.log(this.Vervication.GetDoctorId());
          console.log(this.appointmentId);
          
          if(this.Appointments().find(m=> m.doctorId ==  this.Vervication.GetDoctorId() && m.id != this.appointmentId) == undefined)
          {
            console.log("this.Appointments().find(m=> m.doctorId ==  this.Vervication.GetDoctorId() && m.id != this.appointmentId) == undefined");
            Sup.unsubscribe();
            this.x.set(false);
            return false;
          }
          else
          {
            Sup.unsubscribe();
            this.x.set(true);
            return true;
        }
      },
    error: (err) => 
    {
      Sup.unsubscribe();
      this.x.set(false);
      return false;
    }
    });
    
  }
}
