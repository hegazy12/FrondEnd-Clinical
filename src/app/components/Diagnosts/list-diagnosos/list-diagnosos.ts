import { Component , Input , signal } from '@angular/core';
import { Callapi } from '../../../services/callapi/callapi';
import { VerfivationToken } from '../../../services/verfivationToken/verfivation-token';
import { Router } from '@angular/router';
import { CreateDiagnosisResponse, DiagnosDTO2 , GetDiagnosisListResponse } from '../../../interfaces/diagnos-dto';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-diagnosos',
  imports: [],
  templateUrl: './list-diagnosos.html',
  styleUrl: './list-diagnosos.css',
})

export class ListDiagnosos {

    @Input({ required: true }) AppointmentID!: string;
    @Input({ required: true }) isInHistoryMood!: boolean;
    public diagnosesnse = signal<GetDiagnosisListResponse | null>(null);
    public DiagnosDTO2 = signal<DiagnosDTO2[]>([]);
    
    constructor(private Callapi : Callapi ,
                private Verfication : VerfivationToken ,
                private router : Router)
                { }
    
    ngOnInit(): void 
    {
      if(this.Verfication.islogin() == false){
          this.router.navigate(['/login']);
        }
      else
        {  
          if(this.AppointmentID != ""){
            this.GetDiagnososlist(this.AppointmentID);
          }
          console.log("this.AppointmentID = "+this.AppointmentID);
        }
    }
    
    public GetDiagnososlist(AppointmentID : string )
    {
      let Sup = this.Callapi.GetDiagnosByAppointmentId(AppointmentID).subscribe({
      next: (P : GetDiagnosisListResponse) =>
        { 
          this.diagnosesnse.set(P);
          this.DiagnosDTO2.set(P.data);
          console.log("GetDiagnososlist = "+JSON.stringify(P.data));
          Sup.unsubscribe();
        },
      error: (err) => 
      {
        Sup.unsubscribe();
      }
      });
      return true;
    }

    public DeleteDiagnos(DiagnosId : string)
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
            let Sup = this.Callapi.DeleteDiagnos(DiagnosId).subscribe({
            next: (P : CreateDiagnosisResponse) =>
              { 
                if(P.success == true)
                {
                  Swal.fire({  
                      title: "Deleted!",
                      text: "Your file has been deleted.",
                      icon: "success"
                   });
                   
                  Sup.unsubscribe();
                }
                else
                {
                  Sup.unsubscribe();
                }
                  this.GetDiagnososlist(this.AppointmentID);
              },
            error: (err) => 
            {
                this.GetDiagnososlist(this.AppointmentID);
              Sup.unsubscribe();
            }
            });
        });
    }
}
