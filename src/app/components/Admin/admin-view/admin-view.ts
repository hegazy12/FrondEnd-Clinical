import { Component, signal } from '@angular/core';
import { Navbar } from '../../navbar/navbar';
import { AddSheet } from '../sheet/add-sheet/add-sheet';
import { AddQuestion } from '../Questions/add-question/add-question';

@Component({
  selector: 'app-admin-view',
  imports: [Navbar,AddSheet,AddQuestion],
  templateUrl: './admin-view.html',
  styleUrl: './admin-view.css',
})
export class AdminView
{

   public view = signal<number>(1);
  
  
  public viewpage(viewName : string)
  {
   
    if(viewName == "addSheet")
    {
      this.view.set(1);
    }
    else if(viewName == "addQuestion")
    {
      this.view.set(2);
    }

  }

}
