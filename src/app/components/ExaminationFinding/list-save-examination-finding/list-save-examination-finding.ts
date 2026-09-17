import { Component, Input, signal } from '@angular/core';
import { Callapi } from '../../../services/callapi/callapi';
import { VerfivationToken } from '../../../services/verfivationToken/verfivation-token';
import { SwalAlert } from '../../../services/swalAlert/swal-alert';
import { ListSaveExaminationFindingResponse, SaveExaminationFindingDTO, SaveExaminationFindingDTO2 } from '../../../interfaces/save-examination-finding';

@Component({
  selector: 'app-list-save-examination-finding',
  imports: [],
  templateUrl: './list-save-examination-finding.html',
  styleUrl: './list-save-examination-finding.css',
})
export class ListSaveExaminationFinding {


  constructor(private callapi: Callapi,
    private Verfication: VerfivationToken,
    private swal: SwalAlert) {
  }

  @Input({ required: true }) AppointmentID!: string;
  @Input({ required: true }) isInHistoryMood!: boolean;
  public data = signal<SaveExaminationFindingDTO2[]>([]);

  ngOnInit(): void {
    if (this.Verfication.islogin() == false) {

    }
    else {
      if (this.AppointmentID != '') {
        this.getdata(this.AppointmentID);
      }
    }
  }

  getdata(Id: string) {
    let sub = this.callapi.GetInAppointmentSaveExaminationFinding(Id).subscribe({
      next: (P: ListSaveExaminationFindingResponse) => {
        this.data.set(P.data);
        sub.unsubscribe();
      },
      error: (err) => {
        sub.unsubscribe();
      }
    })
  }

  public deleteSaveExaminationFinding(id: string) {
    let sub = this.callapi.DeleteSaveExaminationFinding(id).subscribe({
      next: (P: any) => {
        this.swal.showSuccess();
        this.getdata(this.AppointmentID);
        sub.unsubscribe();
      },
      error: (err) => {
        this.swal.showWoringSave(err.error.message)
        sub.unsubscribe();
      }
    })
  }

}
