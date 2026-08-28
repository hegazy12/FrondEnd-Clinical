import { Component , Input, signal , ViewChild} from '@angular/core';
import { SwalAlert } from '../../../services/swalAlert/swal-alert';
import { Callapi } from '../../../services/callapi/callapi';
import { VerfivationToken } from '../../../services/verfivationToken/verfivation-token';
import { Router , ActivatedRoute } from '@angular/router';
import { AppointmentDTO3, AppointmentsStoryResponse } from '../../../interfaces/appointment-dto-0';
import { ListInvestgation } from '../../investgation/list-investgation/list-investgation';
import { PrescriptionList } from '../../Prescription/prescription-list/prescription-list';

@Component({
  selector: 'app-appointment-story',
  imports: [ListInvestgation,PrescriptionList],
  templateUrl: './appointment-story.html',
  styleUrl: './appointment-story.css',
})
export class AppointmentStory 
{
  public AppointmentDTO3 = signal<AppointmentDTO3 |undefined>(undefined);
  public isHistory = signal<number>(0);
  @Input({ required: true }) AppointmentID!: string;
  public appointmentid = signal<string>('');
  @ViewChild(ListInvestgation) ListInvestgationRef!: ListInvestgation;
  @ViewChild(PrescriptionList) prescriptionListRef!: PrescriptionList;

  constructor(private Callapi : Callapi ,
                private Verfication :VerfivationToken ,
                private router: Router,
                private route: ActivatedRoute,
                private swal: SwalAlert)
                {

                }

    ngOnInit():void{
        if(this.Verfication.islogin() == false){
          this.router.navigate(['/Login']);
        }
        else
        {   
          if(this.AppointmentID != ""){
              this.GetAppoinmentStory(this.AppointmentID);
          }
      }
    }

  public GetAppoinmentStory(AppointmentID : string) : boolean
          {
              let Sup = this.Callapi.GetAppoinmentStory(AppointmentID).subscribe({
              next: (P : AppointmentsStoryResponse) =>
                {
                    this.AppointmentDTO3.set(P.data);
                    this.ListInvestgationRef.GetInvestgationlist(AppointmentID,0);
                    this.prescriptionListRef.GetPrescriptionList(AppointmentID,0);
                    this.appointmentid.set(AppointmentID);
                },
              error: (err) => 
              {
                Sup.unsubscribe();
              }
              });
              return true;
        }

        public GitHistory()
        {
          if(this.isHistory() == 1){
             this.isHistory.set(0);
             this.ListInvestgationRef.GetInvestgationlist(this.appointmentid(),this.isHistory());
             this.prescriptionListRef.GetPrescriptionList(this.appointmentid(),this.isHistory());
          }else{
             this.isHistory.set(1);
             this.ListInvestgationRef.GetInvestgationlist(this.appointmentid(),this.isHistory());
             this.prescriptionListRef.GetPrescriptionList(this.appointmentid(),this.isHistory());
          }
      }
}
