import { Component , signal , ViewChild} from '@angular/core';
import { SwalAlert } from '../../../services/swalAlert/swal-alert';
import { Callapi } from '../../../services/callapi/callapi';
import { VerfivationToken } from '../../../services/verfivationToken/verfivation-token';
import { Router , ActivatedRoute } from '@angular/router';
import { AppointmentDTO1, AppointmentsResponse } from '../../../interfaces/appointment-dto-0';

@Component({
  selector: 'app-patient-story',
  imports: [],
  templateUrl: './patient-story.html',
  styleUrl: './patient-story.css',
})
export class PatientStory
{
    public AppointmentsResponse = signal<AppointmentsResponse>;
    public Appointments=signal<AppointmentDTO1[]>([]);
    public DoctorId: string ="";  

    constructor(private Callapi : Callapi ,
                private Verfication :VerfivationToken ,
                private router: Router,
                private route: ActivatedRoute,
                private swal: SwalAlert)
                {
                  //this.appointmentId = this.route.snapshot.paramMap.get('id') || '';
                }
    public GetAppointment(id : string) : boolean
    {
      console.log("history of  = "+id);
       let Sup = this.Callapi.GetPatientAppoinmentStory(id).subscribe({
          next: (P :AppointmentsResponse ) =>
            {
                this.Appointments.set(P.data);
                console.log(P);
                //console.log("P.data.patientDTO_1.firstName " + JSON.stringify(P.data.patientDTO_1.firstName));
                //this.PatientId = P.data.patientDTO_1.id;
                
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
