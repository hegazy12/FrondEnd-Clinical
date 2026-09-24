import { Component, signal } from '@angular/core';
import { Navbar } from '../../navbar/navbar';
import { AddSheet } from '../sheet/add-sheet/add-sheet';
import { AddQuestion } from '../Questions/add-question/add-question';
import { CreateExaminationFinding } from '../ExaminationFinding/create-examination-finding/create-examination-finding';
import { CreateMainQuestion } from '../MainQuestion/create-main-question/create-main-question';

@Component({
  selector: 'app-admin-view',
  imports: [Navbar, AddSheet, AddQuestion, CreateExaminationFinding, CreateMainQuestion],
  templateUrl: './admin-view.html',
  styleUrl: './admin-view.css',
})
export class AdminView {

  public view = signal<number>(1);


  public viewpage(viewName: string) {

    if (viewName == "addSheet") {
      this.view.set(1);
    }
    else if (viewName == "addQuestion") {
      this.view.set(2);
    }
    else if (viewName == "addExaminationFinding") {
      this.view.set(3);
    }
    else if (viewName == "addMainQuestion") {
      this.view.set(4);
    }
  }

}
