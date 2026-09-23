import { Component, Input, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Callapi } from '../../../services/callapi/callapi';
import { VerfivationToken } from '../../../services/verfivationToken/verfivation-token';
import { SwalAlert } from '../../../services/swalAlert/swal-alert';
import { CheifComplaneDTO1 } from '../../../interfaces/cheif-complane-dto';
@Component({
  selector: 'app-list-chif-compline',
  imports: [],
  templateUrl: './list-chif-compline.html',
  styleUrl: './list-chif-compline.css',
})
export class ListChifCompline {
  appointmentId: string = "";
  @Input({ required: true }) AppointmentID!: string;
  @Input({ required: true }) isInHistoryMood!: boolean;

  public listCheifComplanes = signal<CheifComplaneDTO1[] | undefined>(undefined);

  constructor(private Callapi: Callapi,
    private Verfication: VerfivationToken,
    private router: Router,
    private route: ActivatedRoute,
    private swal: SwalAlert) {

  }

  ngOnInit(): void {
    this.GetChifComplineList(this.AppointmentID);
  }


  GetChifComplineList(appointmentId: string) {
    let sub = this.Callapi.GetAllGetbyAppointment(appointmentId).subscribe({
      next: (res): void => {
        this.listCheifComplanes.set(res.data);

        sub.unsubscribe();
      },
      error: (err) => {
        sub.unsubscribe();
      }
    });
  }


  DeleteChifComplane(id: string) {
    let sub = this.Callapi.DeleteCheifComplane(id).subscribe({
      next: (res): void => {
        this.swal.showSuccess();
        this.listCheifComplanes.set(res.data);
        this.GetChifComplineList(this.AppointmentID);
        sub.unsubscribe();
      },
      error: (err) => {
        this.GetChifComplineList(this.AppointmentID);
        this.swal.showWoringSave(err.error.message)
        sub.unsubscribe();
      }
    });
  }


}
