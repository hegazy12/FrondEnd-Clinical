import {Component ,signal} from '@angular/core';
import {Callapi} from '../../../services/callapi/callapi';
import {VerfivationToken} from '../../../services/verfivationToken/verfivation-token';
import {Router,ActivatedRoute} from '@angular/router';
import {Appointment} from '../../../interfaces/dtodocror'

@Component({
  selector: 'app-list-appintment',
  imports: [],
  templateUrl: './list-appintment.html',
  styleUrl: './list-appintment.css',
})
export class ListAppintment {
  
  public Appointments = signal<Appointment[]>([]);
  public patientId: string ="";    

  constructor(  private Callapi     : Callapi ,
                private Verfication :VerfivationToken ,
                private router      : Router,
                private route: ActivatedRoute)
                { 
                  this.patientId = this.route.snapshot.paramMap.get('id') || '';
                }

     
  ngOnInit():void{
      if(this.Verfication.islogin() == false)
            {
              this.router.navigate(['/Login']);
            }
            else
            {
             this.GetPatientAppoinment(this.patientId);  
            }
      }
 


  public GetPatientAppoinment(patientId : string) : boolean
      {
             let Sup = this.Callapi.GetPatientAppoinment(patientId).subscribe({
              next: (P : Appointment[]) =>
                {
                    this.Appointments.set(P);
                    console.log(P); 
                    Sup.unsubscribe();
                },
              error: (err) => 
              {
                console.error(err); 
                Sup.unsubscribe();
                this.router.navigate(['/Login']);
              }
            });
          return true;
      }

}
