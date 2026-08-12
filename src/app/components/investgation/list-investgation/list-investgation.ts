import { Component , signal , ViewChild} from '@angular/core';
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
    appointmentId:string="";
    public saveExaminationListResponse =signal<saveExaminationListResponse | null>(null);
    public data= signal<saveMedicalExaminationDTO1[]>([]);

    constructor(private Callapi : Callapi ,
                private Verfication :VerfivationToken ,
                private router: Router,
                private route: ActivatedRoute,
                private swal: SwalAlert)
                {
                  this.appointmentId = this.route.snapshot.paramMap.get('id') || '';
                }

    ngOnInit():void{
              if(this.Verfication.islogin() == false){
                  this.router.navigate(['/login']);
                }
              else
                { 
                  this.GetInvestgationlist(this.appointmentId);
                }
              }
    
    public GetInvestgationlist(patientId : string) : boolean {
            let Sup = this.Callapi.ExaminationList(patientId).subscribe({
            next: (P : saveExaminationListResponse) =>
              {
                this.data.set(P.data);
                console.log(P.data);
              },
            error: (err) => 
            {
              Sup.unsubscribe();
            }
            });
            return true;
      }
}
