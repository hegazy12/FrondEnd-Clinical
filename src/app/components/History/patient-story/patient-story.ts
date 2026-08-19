import { Component , Input, signal , ViewChild} from '@angular/core';
import { SwalAlert } from '../../../services/swalAlert/swal-alert';
import { Callapi } from '../../../services/callapi/callapi';
import { VerfivationToken } from '../../../services/verfivationToken/verfivation-token';
import { Router , ActivatedRoute } from '@angular/router';
import { AppointmentDTO1, AppointmentsResponse } from '../../../interfaces/appointment-dto-0';
import { AppointmentStory } from '../appointment-story/appointment-story';

@Component({
  selector: 'app-patient-story',
  imports: [AppointmentStory],
  templateUrl: './patient-story.html',
  styleUrl: './patient-story.css',
})
export class PatientStory
{
    public AppointmentsResponse = signal<AppointmentsResponse>;
    public Appointments=signal<AppointmentDTO1[]>([]);
    public DoctorId: string ="";  
    public AppointmentStoryId = signal<string>("");
    @Input({ required: true }) PatientID!: string;
    @ViewChild(AppointmentStory) AppointmentStoryRef!: AppointmentStory;

    constructor(private Callapi : Callapi ,
                private Verfication :VerfivationToken ,
                private router: Router,
                private route: ActivatedRoute,
                private swal: SwalAlert)
                { 
                  //this.GetAppointment()
                }

                
    ngOnInit():void{
              if(this.Verfication.islogin() == false){
                  this.router.navigate(['/login']);
                }
              else
                { 
                  this.GetAppointment(this.PatientID);
                  console.log("this.AppointmentID = "+this.PatientID);
                
                }
              }
    

    public changeAppointmentStoryId(Id : string)
    {
      this.AppointmentStoryId.set(Id);
      this.AppointmentStoryRef.GetAppoinmentStory(Id);
      console.log(this.AppointmentStoryId());
    }

    public GetAppointment(id : string) : boolean
    {
      console.log("history of  = "+id);
       let Sup = this.Callapi.GetPatientAppoinmentStory(id).subscribe({
          next: (P :AppointmentsResponse ) =>
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
