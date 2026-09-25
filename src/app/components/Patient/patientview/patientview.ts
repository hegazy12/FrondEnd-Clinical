import { Component, signal } from '@angular/core';
import { Navbar } from '../../navbar/navbar';
import { Callapi } from '../../../services/callapi/callapi';
import { VerfivationToken } from '../../../services/verfivationToken/verfivation-token';
import { Router, ActivatedRoute } from '@angular/router';
import { CCreateAppintment } from '../../Appointment/ccreate-appintment/ccreate-appintment';
import { PatientResponse, PatientDTO } from '../../../interfaces/patient-response';
import { PatientStory } from '../../History/patient-story/patient-story';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-patientview',
  standalone: true,
  imports: [Navbar, CCreateAppintment, PatientStory, DatePipe],
  templateUrl: './patientview.html',
  styleUrl: './patientview.css',
})

export class Patientview {

  constructor(private Callapi: Callapi, private Verfivation: VerfivationToken, private router: Router, private route: ActivatedRoute) {
    this.patientId = this.route.snapshot.paramMap.get('id') || '';
  }

  public patientId: string = "";
  public Patient = signal<PatientDTO | null>(null);

  ngOnInit(): void {
    if (this.Verfivation.islogin() == false) {
      this.router.navigate(['/Login']);
    }
    else {
      this.getPatient(this.patientId);
    }
  }


  public getPatient(id: string): boolean {
    let Sup = this.Callapi.GetPatient(id).subscribe({
      next: (P: PatientResponse) => {
        this.Patient.set(P.data);
        Sup.unsubscribe();
      },
      error: (err) => {
        Sup.unsubscribe();
        this.router.navigate(['/Login']);
      }
    });
    return true;
  }


  public view = signal<number>(1);


  public viewpage(viewName: string) {
    console.log(viewName);
    if (viewName == "AddAppintment") {
      this.view.set(1);
    }
    else if (viewName == "viewhistory") {
      this.view.set(2);
    } else if (viewName == "MainSheet") {
      this.view.set(3);
    }
  }
}
