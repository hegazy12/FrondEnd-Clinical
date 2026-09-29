import { Component, signal } from '@angular/core';
import { VerfivationToken } from '../../../services/verfivationToken/verfivation-token';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { Callapi } from '../../../services/callapi/callapi';
import { Navbar } from '../../navbar/navbar';
import { AppointmentDTO1, AppointmentsResponse } from '../../../interfaces/appointment-dto-0';
import { SwalAlert } from '../../../services/swalAlert/swal-alert';

@Component({
  selector: 'app-mypatient',
  imports: [Navbar, RouterLink],
  templateUrl: './mypatient.html',
  styleUrl: './mypatient.css',
})
export class Mypatient {

  public AppointmentsResponse = signal<AppointmentsResponse>;
  public Appointments = signal<AppointmentDTO1[]>([]);
  public AppointmentsInDay = signal<AppointmentDTO1[]>([]);
  public DoctorId: string = "";

  constructor(
    private callapi: Callapi,
    private router: Router,
    private Vervication: VerfivationToken,
    private swal: SwalAlert) {
  }

  public Day = signal<number>(0);
  public CurrentDay = signal<string>("Today");
  ngOnInit(): void {
    if (this.Vervication.islogin() == false) {
      this.router.navigate(['/login']);
    }
    else {
      this.DoctorId = localStorage.getItem("id")?.replace(/"/g, '') || '';
      this.GetDoctorAppoinment(this.DoctorId);
    }
  }

  public GetDoctorAppoinment(DoctorId: string): boolean {
    let Sup = this.callapi.GetDoctorAppoinment(DoctorId).subscribe({
      next: (P: AppointmentsResponse) => {
        this.Appointments.set(P.data);

        this.AppointmentsInDay.set(this.Appointments().filter(x => x.appointmentDate == new Date().toISOString().split('T')[0]));
        Sup.unsubscribe();
      },
      error: (err) => {
        Sup.unsubscribe();
      }
    });
    return true;
  }

  public incrementDay() {

    if (this.Day() == 7) {
      this.swal.showWoringSave("It is not possible to move beyond one week.")
    }
    else {
      this.Day.set(this.Day() + 1);
      const d = new Date();
      d.setDate(d.getDate() + this.Day());
      const date = d.toLocaleDateString('en-CA');
      this.CurrentDay.set(date);
      this.AppointmentsInDay.set(this.Appointments().filter(x => x.appointmentDate == date));
      console.log(date);
      console.log(this.AppointmentsInDay());
    }
  }

  public decrementDay() {

    if (this.Day() == -7) {
      this.swal.showWoringSave("It is not possible to move beyond one week.")
    }
    else {
      this.Day.set(this.Day() - 1);
      const d = new Date();
      d.setDate(d.getDate() + this.Day());
      const date = d.toLocaleDateString('en-CA');
      this.CurrentDay.set(date);
      this.AppointmentsInDay.set(this.Appointments().filter(x => x.appointmentDate == date));
      console.log(this.AppointmentsInDay());
      console.log(date);
    }
  }
}