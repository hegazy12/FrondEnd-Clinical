import { Component,signal,ViewChild } from '@angular/core';
import { VerfivationToken } from '../../../services/verfivationToken/verfivation-token';
import { Router,ActivatedRoute } from '@angular/router';
import { Callapi } from '../../../services/callapi/callapi';
import { Navbar } from '../../navbar/navbar';
import { AppointmentAllinfo , AppointmentDTO2, makeCompleteResponse} from '../../../interfaces/appointment-dto-0';
import { MakePrescription } from '../../Prescription/make-prescription/make-prescription';
import { DatePipe } from '@angular/common';
import { CreatInvestgation } from '../../investgation/creat-investgation/creat-investgation';
import { CreatVital } from '../../vital/creat-vital/creat-vital';
import { PatientStory } from '../../History/patient-story/patient-story';
@Component({
  selector: 'app-patientappointment',
  imports:  [Navbar,MakePrescription,DatePipe,CreatInvestgation,CreatVital,PatientStory],
  templateUrl: './patientappointment.html',
  styleUrl: './patientappointment.css',
})

export class Patientappointment {
  @ViewChild(PatientStory) PatientStoryRef!: PatientStory;

  public appointmentId: string = "";
  public view = signal<number>(1);
  public PatientId: string ="";
  
  public makeCompleteResponse = signal<makeCompleteResponse| null>(null);
  
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
       }, 2000);
    }else if(viewName == "addnextvisit"){
        this.view.set(6);
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
  
  public callMakeItComplete(){
    this.makeItComplete(this.appointmentId);
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

}
