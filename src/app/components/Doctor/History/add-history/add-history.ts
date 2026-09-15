import { Component, Input, signal, ViewChild } from '@angular/core';
import { ListSheetResponse, SheetDto1 } from '../../../../interfaces/sheet-dto';
import { Callapi } from '../../../../services/callapi/callapi';
import { VerfivationToken } from '../../../../services/verfivationToken/verfivation-token';
import { ListAnswerQuestion } from '../Question/list-answer-question/list-answer-question';

@Component({
  selector: 'app-add-history',
  imports: [ListAnswerQuestion],
  templateUrl: './add-history.html',
  styleUrl: './add-history.css',
})
export class AddHistory
{
  @Input({ required: true }) AppointmentID!: string;

  public Sheetdata =signal<SheetDto1[]>([]); 
  public SheetDto1 = signal<SheetDto1 | undefined>(undefined);
  public SelectedSheetID = signal<string>('');
  @ViewChild(ListAnswerQuestion) ListAnswerQuestionRef!: ListAnswerQuestion;

  constructor(private callapi : Callapi,private Vervication:VerfivationToken){}
           
  ngOnInit():void 
  {
    if(this.Vervication.islogin() == false)
    { 
        
    }
    else
    {
      this.SheetList();
    }
  }   

  public SheetList() : boolean 
  {            
    let Sup = this.callapi.SheetList().subscribe({
      next: (P : ListSheetResponse) =>
            {
              this.Sheetdata.set(P.data);
              Sup.unsubscribe();
            },
      error: (err) => 
          {
            Sup.unsubscribe();
          }
          });
    return true;
  }

  onSpecialtyChange(event: Event)
  {
    const element = event.target as HTMLSelectElement;
    let x =this.Sheetdata().find(m=> m.id == element.value);
    this.SheetDto1.set(x);
    this.SelectedSheetID.set(element.value);
    this.ListAnswerQuestionRef.GitQuestionsBySheetId1(element.value,this.AppointmentID);
  }

}
