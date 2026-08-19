import { Component ,signal, ViewChild} from '@angular/core';
import { Callapi} from '../../../services/callapi/callapi';
import {VerfivationToken} from '../../../services/verfivationToken/verfivation-token';
import {Router,ActivatedRoute} from '@angular/router';
import { FormsModule } from '@angular/forms';
import {SwalAlert} from '../../../services/swalAlert/swal-alert';
import { DoctorsResponse,DoctorDto1 } from '../../../interfaces/doctor-dto';
import { AppointmentDTO0 } from '../../../interfaces/appointment-dto-0';
import {ListAppintment} from '../../Appointment/list-appintment/list-appintment';

@Component({
  selector: 'app-ccreate-appintment',
  imports: [FormsModule,ListAppintment],
  templateUrl: './ccreate-appintment.html',
  styleUrl: './ccreate-appintment.css',
})
export class CCreateAppintment
{
   @ViewChild(ListAppintment) ListAppintmentRef!: ListAppintment;
    // public 
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
                }

     ngOnInit():void{
          if(this.Verfication.islogin() == false)
            {
              this.router.navigate(['/login']);
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

      public onSubmit() : boolean
      {
        let Appointment :AppointmentDTO0 = {  appointmentDate   : this.dateTimeAppointment, 
                                              deposit           : this.deposit,
                                              doctorId          : this.doctorId(),
                                              patientId         : this.patientId,
                                              notes             : this.note,
                                              status            : "Pending" };
        console.log(Appointment);
        if(Appointment.appointmentDate == "") 
        {
          this.swal.showWoringSave("please inter datetime for Appointment");
          return false;
        }else if(Appointment.doctorId == "")
        {
           this.swal.showWoringSave("Please Select Doctor");
           return false
        }else{

          let sub =  this.Callapi.createِِِAppointment(Appointment).subscribe({
          next: (res) => {
            sub.unsubscribe(); 
            this.swal.showSuccess();
            return true},
            error: (err) => { 
              sub.unsubscribe(); 
              this.isLoading = false;
            return false } 
          });
        }
        this.ListAppintmentRef.GetPatientAppoinment(this.patientId);
         return true;
        }
}
