import { Component, signal } from '@angular/core';
import { Callapi } from '../../../../services/callapi/callapi';
import { VerfivationToken } from '../../../../services/verfivationToken/verfivation-token';
import { SwalAlert } from '../../../../services/swalAlert/swal-alert';
import { ExaminationFindingDTO1, ExaminationFindingListResponse } from '../../../../interfaces/examination-finding';

@Component({
  selector: 'app-list-examination-finding',
  imports: [],
  templateUrl: './list-examination-finding.html',
  styleUrl: './list-examination-finding.css',
})
export class ListExaminationFinding {


  data = signal<ExaminationFindingDTO1[]>([]);


  constructor(private callapi: Callapi,
    private Verfication: VerfivationToken,
    private swal: SwalAlert) { }


  ngOnInit(): void {
    if (this.Verfication.islogin() == false) {

    }
    else {
      this.GetAllExaminationFinding();
    }
  }

  public GetAllExaminationFinding() {
    let Sup = this.callapi.GetAllExaminationFinding().subscribe({
      next: (P: ExaminationFindingListResponse) => {
        this.data.set(P.data);
        Sup.unsubscribe();
      },
      error: (err) => {
        Sup.unsubscribe();
      }
    });
  }

  public DeleteExaminationFinding(id: string) {
    let sup = this.callapi.DeleteExaminationFinding(id).subscribe({
      next: (response) => {
        sup.unsubscribe();
        this.swal.showSuccess();
        this.GetAllExaminationFinding();
      },
      error: (error) => {
        sup.unsubscribe();
        this.swal.showWoringSave("you can't delete this item");
      }
    });
  }

}



