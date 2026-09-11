import { Component, ElementRef, Input, signal, ViewChild } from '@angular/core';
import { SaveAnswerQuestion } from '../save-answer-question/save-answer-question';
import { Callapi } from '../../../../../services/callapi/callapi';
import { VerfivationToken } from '../../../../../services/verfivationToken/verfivation-token';
import { QuestionDTO1, QuestionListResponse } from '../../../../../interfaces/question-dto';

@Component({
  selector: 'app-list-answer-question',
  imports: [SaveAnswerQuestion],
  templateUrl: './list-answer-question.html',
  styleUrl: './list-answer-question.css',
})
export class ListAnswerQuestion 
{
      @Input({ required: true }) SheetID!: string;
      
      constructor(private callapi : Callapi,private Vervication:VerfivationToken){}
      
      public data = signal<QuestionDTO1[]>([])
      
      

      ngOnInit():void 
      {
        if(this.Vervication.islogin() == false)
        {    
        }
        else
        {
          this.GitQuestionsBySheetId(this.SheetID);
        }
      }  

      public GitQuestionsBySheetId(SheetId : string) : boolean {
  
        if(SheetId != '') 
        {
          let Sup = this.callapi.GitQuestionsBySheetId(SheetId).subscribe({
          next: (P : QuestionListResponse) =>
            {
              this.data.set(P.data);
              Sup.unsubscribe();
               
            },
          error: (err) => 
          {
            Sup.unsubscribe();
          }
          });
        }

        return true;
    }


    @ViewChild('questionContainer') questionContainer!: ElementRef<HTMLDivElement>;

    getQuestionValue(Question: QuestionDTO1): string  
    {
        const container = this.questionContainer?.nativeElement;
        if (!container) 
          return '';
       
        const type : string = Question.dataTypeName;
        if (type === 'Boolean')
          {
              const checked = container.querySelector<HTMLInputElement>('input[name="'+Question.id+'"]:checked');
              return checked ? checked.value : '';
          }
          else if(type === 'Dropdown')
          {
              const field = container.querySelector<HTMLInputElement | HTMLSelectElement>('[name="'+Question.id+'"]');
              console.log(field);
              return field ? field.value : '';
          }
          else 
          {
              const field = container.querySelector<HTMLInputElement>('input[name="'+Question.id+'"]');
              return field ? field.value : '';
          }
    }

    public SendAnswers()
    {
       this.data().forEach(M => {
           let x = this.getQuestionValue(M);
           console.log(x);
       })
      
    }

    
}
