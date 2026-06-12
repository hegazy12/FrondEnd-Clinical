import { Component ,signal} from '@angular/core';
import { Callapi} from '../../../services/callapi/callapi';
import {VerfivationToken} from '../../../services/verfivationToken/verfivation-token';
import {Router,ActivatedRoute} from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DTODocror} from '../../../interfaces/dtodocror';
import {CreateAppointment} from '../../../interfaces/create-appointment';
import {SwalAlert} from '../../../services/swalAlert/swal-alert';

@Component({
  selector: 'app-ccreate-appintment',
  imports: [FormsModule],
  templateUrl: './ccreate-appintment.html',
  styleUrl: './ccreate-appintment.css',
})
export class CCreateAppintment
{
    public dateTimeAppointment: Date | string=""; 
    public note?: string | null="";  
    public doctorId =signal<string>('');
    public patientId: string="";                
    public deposit: number=0;  
    public Docrors = signal<DTODocror[]>([]);
    public isLoading : boolean = false;

    constructor(private Callapi : Callapi ,
                private Verfication :VerfivationToken ,
                private router: Router,
                private route: ActivatedRoute,
                private swal: SwalAlert)
                {
                 this.patientId = this.route.snapshot.paramMap.get('id') || '';
                 console.log(this.patientId);
                }

     ngOnInit():void{
          if(this.Verfication.islogin() == false)
            {
              this.router.navigate(['/Login']);
            }
            else
            {
              this.getDoctors();
            }
          }
           
          
     public getDoctors() : boolean
      {
          let Sup = this.Callapi.GetDoctors().subscribe({
          next: (D : DTODocror[]) =>
            { 
                this.Docrors.set(D);
                console.log(D);
                Sup.unsubscribe();
            },
          error: (err) => {
            Sup.unsubscribe();
            this.router.navigate(['/Login']);
          }
        });
        return true;
      }
      
      onSpecialtyChange(event: Event) {
       const element = event.target as HTMLSelectElement;
        this.doctorId.set(element.value);
      }



      public onSubmit() : void
      {
        let Appointment :CreateAppointment = {dateTimeAppoinment: this.dateTimeAppointment, 
                                              deposit           : this.deposit,
                                              doctorId          : this.doctorId(),
                                              patientId         : this.patientId,
                                              note              : this.note}
        let sub =  this.Callapi.createِِِAppointment(Appointment).subscribe({
        next: (res) => {
          console.log('Successfully created:', res); 
           sub.unsubscribe(); 
           this.swal.showSuccess();},
           error: (err) => {console.error(err); sub.unsubscribe(); this.isLoading = false; } 
         });
      }


}
