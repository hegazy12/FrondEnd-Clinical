import { Component , Input, signal , ViewChild} from '@angular/core';
import { SwalAlert } from '../../../services/swalAlert/swal-alert';
import { Callapi } from '../../../services/callapi/callapi';
import { VerfivationToken } from '../../../services/verfivationToken/verfivation-token';
import { Router , ActivatedRoute } from '@angular/router';
import { saveExaminationListResponse,saveMedicalExaminationDTO1  } from '../../../interfaces/medical-examinations-dto';
@Component({
  selector: 'app-list-investgation',
  imports: [],
  templateUrl: './list-investgation.html',
  styleUrl: './list-investgation.css',
})
export class ListInvestgation {
   
    public saveExaminationListResponse =signal<saveExaminationListResponse | null>(null);
    public data= signal<saveMedicalExaminationDTO1[]>([]);
   @Input({ required: true }) AppointmentID!: string;
    
    constructor(private Callapi : Callapi ,
                private Verfication :VerfivationToken ,
                private router: Router,
                private route: ActivatedRoute,
                private swal: SwalAlert)
                {
              
                }

    ngOnInit():void{
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
