import { Component,Input,signal } from '@angular/core';
import {Callapi} from '../../../services/callapi/callapi';
import {VerfivationToken} from '../../../services/verfivationToken/verfivation-token';
import {Router,ActivatedRoute} from '@angular/router';
import { PrescriptionResponse,Prescriptiondto2 } from '../../../interfaces/prescription';
import Swal from 'sweetalert2';
import { createPrescriptionResponse } from '../../../interfaces/prescription';

@Component({
  selector: 'app-prescription-list',
  imports: [],
  templateUrl: './prescription-list.html',
  styleUrl: './prescription-list.css',
})

export class PrescriptionList {
  

  appointmentId : string;
  
  last = signal<number>(0);

  @Input({ required: true }) AppointmentID!: string;
  
  @Input({ required: true }) isInHistoryMood!: boolean;

  public data = signal<Prescriptiondto2[]>([]);

  constructor(private Callapi : Callapi ,private Verfication :VerfivationToken ,private router : Router,private route: ActivatedRoute)
  { 
      this.appointmentId = this.route.snapshot.paramMap.get('id') || '';
  }

      
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
      
    public GetPrescriptionList(AppointmentID : string , last:number) : boolean{
      let Sup = this.Callapi.PrescriptionList(AppointmentID).subscribe({
      next: (P : PrescriptionResponse) =>
        {
          console.log(P.data);
          this.last.set(last);
          this.data.set(P.data.filter(m=> m.last === last));
        },
      error: (err) => 
      {
        Sup.unsubscribe();
      }
      });
      return true;
    }


    public DeletePrescription(Id : string)
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
            let Sup = this.Callapi.DeletePrescription(Id).subscribe({
            next: (P : createPrescriptionResponse) =>
              { 
                if(P.success == true)
                {
                  Swal.fire({   title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"
                   });
                  Sup.unsubscribe();
                }
                else
                {
                  Sup.unsubscribe();
                }
                  this.GetPrescriptionList(this.AppointmentID,this.last());
              },
            error: (err) => 
            {
                this.GetPrescriptionList(this.AppointmentID,this.last());
              Sup.unsubscribe();
            }
            });
        });
    }
    
}
