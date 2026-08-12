import { Component,signal } from '@angular/core';
import { VerfivationToken } from '../../../services/verfivationToken/verfivation-token';
import { Router,ActivatedRoute ,RouterLink} from '@angular/router';
import { Callapi } from '../../../services/callapi/callapi';
import { Navbar } from '../../navbar/navbar';
import { AppointmentDTO1 , AppointmentsResponse, AppointmentResponse} from '../../../interfaces/appointment-dto-0';

@Component({
  selector: 'app-mypatient',
  imports: [Navbar,RouterLink],
  templateUrl: './mypatient.html',
  styleUrl: './mypatient.css',
})
export class Mypatient {
  
  public AppointmentsResponse = signal<AppointmentsResponse>;
  public Appointments=signal<AppointmentDTO1[]>([]);
  public DoctorId: string ="";    

  constructor(private callapi : Callapi,
              private router:Router,
              private Vervication:VerfivationToken,
              private route: ActivatedRoute)
              { this.DoctorId = localStorage.getItem("id")?.replace(/"/g, '') || '';}


  ngOnInit():void {

    if(this.Vervication.islogin() == false)
    {
        console.log("ManePage is " + this.Vervication.islogin());
         this.router.navigate(['/login']);
    }
    else
    {
      console.log("ManePage is " + this.Vervication.islogin());
      this.GetDoctorAppoinment(this.DoctorId);
    }
  }
  
  public GetDoctorAppoinment(DoctorId : string) : boolean
  {
    let Sup = this.callapi.GetDoctorAppoinment(DoctorId).subscribe({
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