import { Component,signal } from '@angular/core';
import { VerfivationToken } from '../../../services/verfivationToken/verfivation-token';
import { Router,ActivatedRoute } from '@angular/router';
import { Callapi } from '../../../services/callapi/callapi';
import { Navbar } from '../../navbar/navbar';
import {AppointmentAllinfo, AppointmentDTO2} from '../../../interfaces/appointment-dto-0';
import { MakePrescription } from '../../Prescription/make-prescription/make-prescription';

@Component({
  selector: 'app-patientappointment',
  imports:  [Navbar,MakePrescription],
  templateUrl: './patientappointment.html',
  styleUrl: './patientappointment.css',
})

export class Patientappointment {
  
  appointmentId: string = "";
  
  constructor(private callapi : Callapi,
              private router:Router,
              private Vervication:VerfivationToken,
              private route: ActivatedRoute)
              { 
                    this.appointmentId = this.route.snapshot.paramMap.get('id') || '';
                    console.log("Patientappointment id " + this.appointmentId);
              }
  
  ngOnInit():void {
  if(this.Vervication.islogin() == false)
    {
        console.log("ManePage is " + this.Vervication.islogin());
        this.router.navigate(['/Login']);
    }
    else
    {
        console.log("ManePage is " + this.Vervication.islogin());
        this.GetAppointment(this.appointmentId);
        console.log("Patientappointment id " + this.appointmentId);
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
              console.log("Patientappointment data " + JSON.stringify(P.data));
              Sup.unsubscribe();
          },
        error: (err) => 
        {
              Sup.unsubscribe();
        }
        });
              return true;
        }
}





