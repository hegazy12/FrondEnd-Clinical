import { Component , Input, signal} from '@angular/core';
import { Callapi } from '../../../services/callapi/callapi';
import { VerfivationToken } from '../../../services/verfivationToken/verfivation-token';
import { Router  } from '@angular/router';
import { saveExaminationListResponse , saveMedicalExaminationDTO1  } from '../../../interfaces/medical-examinations-dto';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-investgation',
  imports: [],
  templateUrl: './list-investgation.html',
  styleUrl: './list-investgation.css',
})
export class ListInvestgation {
   
    public saveExaminationListResponse =signal<saveExaminationListResponse | null>(null);
    public data= signal<saveMedicalExaminationDTO1[]>([]);
    last = signal<number>(0);
    @Input({ required: true }) AppointmentID!: string;
    
    constructor(private Callapi : Callapi ,
                private Verfication :VerfivationToken ,
                private router: Router){}

    ngOnInit():void
    {
      if(this.Verfication.islogin() == false){
          this.router.navigate(['/login']);
        }
      else
        {  
          if(this.AppointmentID != ""){
            this.GetInvestgationlist(this.AppointmentID,0);
          }
          console.log("this.AppointmentID = "+this.AppointmentID);
        }
    }
    
    public GetInvestgationlist(patientId : string, last:number) : boolean {
            let Sup = this.Callapi.ExaminationList(patientId).subscribe({
            next: (P : saveExaminationListResponse) =>
              {
                this.data.set(P.data);
                console.log(P.data);
                console.log(P.data.filter(m=> m.last  === 0));
                this.last.set(last);
                this.data.set(P.data.filter(m=> m.last === last));
                Sup.unsubscribe();
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
            let Sup = this.Callapi.DeleteExamination(Id).subscribe({
            next: (P : saveExaminationListResponse) =>
              { 
                if(P.success == true)
                {
                  Swal.fire({   title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"
                   });
                 
                }
                this.GetInvestgationlist(this.AppointmentID,this.last());
                Sup.unsubscribe();
              },
            error: (err) => 
            {
                this.GetInvestgationlist(this.AppointmentID,this.last());
              Sup.unsubscribe();
            }
            });
        });
    }

}
