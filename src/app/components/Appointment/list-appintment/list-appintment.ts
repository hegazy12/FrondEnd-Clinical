import {Component ,Input,signal} from '@angular/core';
import {Callapi} from '../../../services/callapi/callapi';
import {VerfivationToken} from '../../../services/verfivationToken/verfivation-token';
import {Router,ActivatedRoute} from '@angular/router';
import { AppointmentDTO1, AppointmentsResponse } from '../../../interfaces/appointment-dto-0';
import Swal from 'sweetalert2';

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
                private Verfication : VerfivationToken ,
                private router      : Router,
                private route       : ActivatedRoute)
                { 
                
                }

  ngOnInit():void
  {
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

    public DeleteAppoinment(Id : string)
    {
      Swal.fire({
       title: "Are you sure?",
        text: "You won't be able to delete this!",
        icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!"
        }).then((result) => 
          {     
            let Sup = this.Callapi.DeleteAppointmentById(Id).subscribe({
            next: (P : AppointmentResponse) =>
              { 
                if(P.success == true)
                {
                  Swal.fire({   
                    title: "Deleted!",
                    text: "Your file has been deleted.",
                    icon: "success"
                   });
                }
                this.GetPatientAppoinment(this.PatientId);
                Sup.unsubscribe();
              },
            error: (err) => 
            {
              this.GetPatientAppoinment(this.PatientId);
              Sup.unsubscribe();
            }
            });
        });
    }
}
