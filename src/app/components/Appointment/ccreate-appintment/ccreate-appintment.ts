import { Component ,signal} from '@angular/core';
import { Callapi} from '../../../services/callapi/callapi';
import {VerfivationToken} from '../../../services/verfivationToken/verfivation-token';
import {Router,ActivatedRoute} from '@angular/router';
import { FormsModule } from '@angular/forms';
import {SwalAlert} from '../../../services/swalAlert/swal-alert';
import { DoctorsResponse,DoctorDto1 } from '../../../interfaces/doctor-dto';
import { AppointmentDTO0 } from '../../../interfaces/appointment-dto-0';

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
    public Docrors = signal<DoctorDto1[]>([]);
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
          next: (D : DoctorsResponse) =>
            { 
                this.Docrors.set(D.data);
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
        console.log(element.name);
      }

      public onSubmit() : void
      {
        let Appointment :AppointmentDTO0 = {  appointmentDate    : this.dateTimeAppointment, 
                                              deposit           : this.deposit,
                                              doctorId          : this.doctorId(),
                                              patientId         : this.patientId,
                                              notes              : this.note,
                                              status            : "Pending" };

        let sub =  this.Callapi.createِِِAppointment(Appointment).subscribe({
        next: (res) => {
           sub.unsubscribe(); 
           this.swal.showSuccess();},
           error: (err) => { 
            sub.unsubscribe(); 
            this.isLoading = false; } 
         });
      }


}
