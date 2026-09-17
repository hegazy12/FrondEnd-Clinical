import { Component, signal } from '@angular/core';
import { Navbar } from '../../navbar/navbar';
import { CreatePatient } from '../create-patient/create-patient';
import { ListPatient } from '../list-patient/list-patient';

@Component({
  selector: 'app-all-patientview',
  imports: [Navbar, CreatePatient, ListPatient],
  templateUrl: './all-patientview.html',
  styleUrl: './all-patientview.css',
})
export class AllPatientview {

  public view = signal<number>(2);


  public viewpage(viewName: string) {

    if (viewName == "AllPatients") {
      this.view.set(1);
    }
    else if (viewName == "addPatient") {
      this.view.set(2);
    }

  }
}
