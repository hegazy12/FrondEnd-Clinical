import { Component,Input,signal } from '@angular/core';
import {Callapi} from '../../../services/callapi/callapi';
import {VerfivationToken} from '../../../services/verfivationToken/verfivation-token';
import {Router,ActivatedRoute} from '@angular/router';
import { PrescriptionResponse,Prescriptiondto2 } from '../../../interfaces/prescription';

@Component({
  selector: 'app-prescription-list',
  imports: [],
  templateUrl: './prescription-list.html',
  styleUrl: './prescription-list.css',
})

export class PrescriptionList {

  appointmentId : string;
   @Input({ required: true }) AppointmentID!: string;
  public data = signal<Prescriptiondto2[]>([]);

  constructor(private Callapi : Callapi ,private Verfication :VerfivationToken ,private router : Router,private route: ActivatedRoute){ 
      this.appointmentId = this.route.snapshot.paramMap.get('id') || '';}

      
    ngOnInit():void{
    if(this.Verfication.islogin() == false){
        this.router.navigate(['/login']);
      }
    else
      {   
         if(this.AppointmentID != ""){
        this.GetPrescriptionList(this.AppointmentID);
      }
      }
    }
      
    public GetPrescriptionList(patientId : string) : boolean{
          let Sup = this.Callapi.PrescriptionList(patientId).subscribe({
          next: (P : PrescriptionResponse) =>
            {
              this.data.set(P.data);
            },
          error: (err) => 
          {
            Sup.unsubscribe();
          }
          });
          return true;
    }
    
}
