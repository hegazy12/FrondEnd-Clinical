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
        this.GetPrescriptionList(this.AppointmentID,0);
      }
      }
    }
      
    public GetPrescriptionList(patientId : string , last:number) : boolean{
          let Sup = this.Callapi.PrescriptionList(patientId).subscribe({
          next: (P : PrescriptionResponse) =>
            {
              console.log(P.data);
              console.log(P.data.filter(m=> m.last  === 0));
              this.data.set(P.data.filter(m=> m.last === last));
            },
          error: (err) => 
          {
            Sup.unsubscribe();
          }
          });
          return true;
    }
    
}
