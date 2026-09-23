
import { ListChifCompline } from '../list-chif-compline/list-chif-compline';
import { Component, Input, signal, ViewChild } from '@angular/core';
import { SwalAlert } from '../../../services/swalAlert/swal-alert';
import { Callapi } from '../../../services/callapi/callapi';
import { VerfivationToken } from '../../../services/verfivationToken/verfivation-token';
import { Router, ActivatedRoute } from '@angular/router';
import { CheifComplaneDTO } from '../../../interfaces/cheif-complane-dto';
@Component({
  selector: 'app-create-chif-compline',
  imports: [ListChifCompline],
  templateUrl: './create-chif-compline.html',
  styleUrl: './create-chif-compline.css',
})
export class CreateChifCompline {
  @Input({ required: true }) AppointmentID!: string;
  @ViewChild(ListChifCompline) ListChifComplineRef!: ListChifCompline;

  constructor(private Callapi: Callapi,
    private Verfication: VerfivationToken,
    private router: Router,
    private route: ActivatedRoute,
    private swal: SwalAlert) {

  }

  public send(ChifCompline: string) {
    const CheifComplaneDTO: CheifComplaneDTO =
    {
      text: ChifCompline,
      appointmentId: this.AppointmentID
    }

    let sub = this.Callapi.CreateCheifComplane(CheifComplaneDTO).subscribe({
      next: (res) => {
        sub.unsubscribe();
        this.swal.showSuccess();
        this.ListChifComplineRef.GetChifComplineList(this.AppointmentID);
      },
      error: (err) => {
        this.swal.showWoringSave(err.error.message)
        sub.unsubscribe();
      }
    });
  }
}
