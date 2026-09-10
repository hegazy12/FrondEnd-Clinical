import { Component, Input, signal  } from '@angular/core';
import { Callapi } from '../../../services/callapi/callapi';
import { VerfivationToken } from '../../../services/verfivationToken/verfivation-token';
import {  Router } from '@angular/router';
import { ListsaveVitalSignResponse, saveVitalSignDto2 } from '../../../interfaces/vital-dto';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-list-vital',
  imports: [],
  templateUrl: './list-vital.html',
  styleUrl: './list-vital.css',
})
export class ListVital 
{
    @Input({ required: true })  AppointmentID!: string;
    @Input({ required: true }) isInHistoryMood!:   boolean;
    public Response = signal<ListsaveVitalSignResponse | null>(null);
    public data = signal<saveVitalSignDto2[]>([]);
   //public isInHistoryMood = signal<boolean>(false)
    
    constructor(private Callapi : Callapi ,
                private Verfication : VerfivationToken)
                {

                }
      
                
    ngOnInit():void
    {
      if(this.Verfication.islogin() == false)
        {
        // this.router.navigate(['/Login']);
        }
      else
        {   
          if(this.AppointmentID != '')
          {
            this.GetsaveVitalSighAppoinmenById(this.AppointmentID);
          }
        }
    }

        
    public GetsaveVitalSighAppoinmenById(AppointmentID : string ) : boolean
    {
      let Sup = this.Callapi.GetsaveVitalSighAppoinmenById(AppointmentID).subscribe({
      next: (P : ListsaveVitalSignResponse) =>
        {
          this.Response.set(P);
          this.data.set(P.data);
          console.log(this.data());
        },
      error: (err) => 
      {
          Sup.unsubscribe();
      }
      });
      return true;
    }
    



    public DeleteInvestgation(Id : string)
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
            let Sup = this.Callapi.DeleteVitalSigh(Id).subscribe({
            next: (P : any) =>
              { 
                if(P.success == true)
                {
                  Swal.fire({   
                    title: "Deleted!",
                    text: "Your file has been deleted.",
                    icon: "success"
                    }); 
                }
                this.GetsaveVitalSighAppoinmenById(this.AppointmentID);
                Sup.unsubscribe();
              },
            error: (err) => 
            {
                this.GetsaveVitalSighAppoinmenById(this.AppointmentID);
                Sup.unsubscribe();
            }
            });
        });
      }
}
