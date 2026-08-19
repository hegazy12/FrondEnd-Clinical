import {Component ,Input,signal} from '@angular/core';
import {Callapi} from '../../../services/callapi/callapi';
import {VerfivationToken} from '../../../services/verfivationToken/verfivation-token';
import {Router,ActivatedRoute} from '@angular/router';
import { AppointmentDTO1, AppointmentsResponse } from '../../../interfaces/appointment-dto-0';

@Component({
  selector: 'app-list-appintment',
  imports: [],
  templateUrl: './list-appintment.html',
  styleUrl: './list-appintment.css',
})
export class ListAppintment {
  
  public AppointmentsResponse = signal<AppointmentsResponse>;
  public Appointments=signal<AppointmentDTO1[]>([]);
 

  @Input({ required: true }) PatientId!: string;
  
  constructor(  private Callapi     : Callapi ,
                private Verfication :VerfivationToken ,
                private router      : Router,
                private route: ActivatedRoute)
                { 
                
                }

     
  ngOnInit():void{
      if(this.Verfication.islogin() == false)
            {
              this.router.navigate(['/Login']);
            }
            else
            {
             this.GetPatientAppoinment(this.PatientId);  
            }
      }

  public GetPatientAppoinment(patientId : string) : boolean
      {
          let Sup = this.Callapi.GetPatientAppoinment(patientId).subscribe({
          next: (P : AppointmentsResponse) =>
            {
                this.Appointments.set(P.data);
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
