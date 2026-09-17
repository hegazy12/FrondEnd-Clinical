import { Component, Input, signal, ViewChild } from '@angular/core';
import { ListSaveExaminationFinding } from '../list-save-examination-finding/list-save-examination-finding';
import { Callapi } from '../../../services/callapi/callapi';
import { VerfivationToken } from '../../../services/verfivationToken/verfivation-token';
import { SwalAlert } from '../../../services/swalAlert/swal-alert';
import { SaveExaminationFindingDTO } from '../../../interfaces/save-examination-finding';
import { ExaminationFindingDTO1 } from '../../../interfaces/examination-finding';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-save-examination-finding',
  imports: [ListSaveExaminationFinding],
  templateUrl: './add-save-examination-finding.html',
  styleUrl: './add-save-examination-finding.css',
})
export class AddSaveExaminationFinding {
  @Input({ required: true }) AppointmentID!: string;
  @ViewChild(ListSaveExaminationFinding) ListSaveExaminationFindingRef!: ListSaveExaminationFinding;

  public name = signal<string>('');

  data = signal<ExaminationFindingDTO1[]>([]);
  public SelectedData = signal<ExaminationFindingDTO1 | null | undefined>(null);
  constructor(private callapi: Callapi,
    private router: Router,
    private route: ActivatedRoute,
    private Verfication: VerfivationToken,
    private swal: SwalAlert) {
  }

  ngOnInit(): void {
    if (this.Verfication.islogin() == false) {

    }
    else {
      console.log("AddSaveExaminationFinding state " + this.Verfication.islogin());
    }
  }


  public GetExaminationFindingBySearchTearm(Tearm: string): void {
    let sub = this.callapi.GetExaminationFindingBySearchTearm(Tearm).subscribe({
      next: (res) => {
        if (res.success == true) {
          sub.unsubscribe();
          this.data.set(res.data);
        }
        else {
          sub.unsubscribe();
          this.swal.showWoringSave(res.message);
        }
      },
      error: (err) => {
        this.swal.showWoringSave(err.error.message)
        sub.unsubscribe();
      }
    });
  }

  onSpecialtyChange(event: Event) {
    const element = event.target as HTMLSelectElement;
    this.SelectedData.set(this.data().find(m => m.id == element.value) || null);
    this.name.set(this.SelectedData()?.name || '');
  }

  public Create(value: string) {
    let ExaminationFindingDTO: SaveExaminationFindingDTO =
    {
      value: value,
      appointmentId: this.AppointmentID,
      examinationFindingId: this.SelectedData()?.id || '',
      notes: ''
    };

    let sub = this.callapi.AddSaveExaminationFinding(ExaminationFindingDTO).subscribe({
      next: (res) => {
        if (res.success == true) {
          sub.unsubscribe();
          this.swal.showSuccess();
          this.ListSaveExaminationFindingRef.getdata(this.AppointmentID);
        }
        else {
          sub.unsubscribe();
          this.swal.showWoringSave(res.message);
        }
      },
      error: (err) => {
        this.swal.showWoringSave(err.error.message)
        sub.unsubscribe();
      }
    });
  }

}
