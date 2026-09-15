import { Component, ElementRef, Input, signal, ViewChild } from '@angular/core';
import { SaveAnswerQuestion } from '../save-answer-question/save-answer-question';
import { Callapi } from '../../../../../services/callapi/callapi';
import { VerfivationToken } from '../../../../../services/verfivationToken/verfivation-token';
import { QuestionDTO1, QuestionListResponse, SaveAnswersListResponse, saveQuestionDTO } from '../../../../../interfaces/question-dto';
import { SwalAlert } from '../../../../../services/swalAlert/swal-alert';

@Component({
  selector: 'app-list-answer-question',
  imports: [SaveAnswerQuestion],
  templateUrl: './list-answer-question.html',
  styleUrl: './list-answer-question.css',
})
export class ListAnswerQuestion 
{
      @Input({ required: true }) SheetID!: string;
      @Input({ required: true }) AppointmentID!: string;
      
      
      
      @ViewChild(SaveAnswerQuestion) SaveAnswerQuestionRef!: SaveAnswerQuestion;

      constructor(private callapi : Callapi,private Vervication:VerfivationToken,private swal: SwalAlert)
      {

      }
      
      public data = signal<QuestionDTO1[]>([])
      
       onMessageReceived()
       {
        this.GitQuestionsBySheetId1(this.SheetID,this.AppointmentID);
       }

      ngOnInit():void 
      {
        if(this.Vervication.islogin() == false)
        {    
        }
        else
        {
          this.GitQuestionsBySheetId1(this.SheetID,this.AppointmentID);
        }
      }  

      public GitQuestionsBySheetId1(SheetId : string ,appointmentId : string) : boolean {
  
        if(SheetId != '') 
        {
          let Sup = this.callapi.GitQuestionsBySheetId1(SheetId,appointmentId).subscribe({
          next: (P : QuestionListResponse) =>
            {
              this.data.set(P.data);
              Sup.unsubscribe();
              this.SaveAnswerQuestionRef.GetsaveQuestionInSheet(SheetId,appointmentId);
               
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
      const saveQuestionDTOs: saveQuestionDTO[] = [];
      let flagsend = true;
      this.data().forEach(M => {
        const answerValue = this.getQuestionValue(M);
        if(answerValue !="")
         {
          if( M.dataTypeName == "Numeric")
          {
                if(Number(answerValue) <= Number(M.minValue))
                {
                  flagsend =false;
                  this.swal.showWoringSave("You Are Inter "+ M.questionBody+" Less Than minValue");
                 
                  return ;
                }else if(Number(answerValue) >= Number(M.maxValue))
                {flagsend =false;
                    this.swal.showWoringSave("You Are Inter  "+ M.questionBody+" More Than MaxValue");
                  
                    return ;
                }
          }
          else if ( M.dataTypeName == "Dropdown" ){}
          else if( M.dataTypeName == "Boolean" ){}
          else if( M.dataTypeName == "Text" ){}

          saveQuestionDTOs.push({
            appointmentId : this.AppointmentID,
            notes : '',
            questionId : M.id,
            sheetId : this.SheetID,
            value : answerValue
          });
        }

      });

     if(saveQuestionDTOs.length == 0)
     {
        this.swal.showWoringSave("Please Full Inputs Fialds");
     }
     else
     {
     setTimeout(() => {
      if(flagsend){
      let Sup = this.callapi.SaveAnswersList(saveQuestionDTOs).subscribe({
        next: (P : SaveAnswersListResponse) =>
          {
           console.log(P.data);
           this.swal.showSuccess();
           this.GitQuestionsBySheetId1(this.SheetID,this.AppointmentID);
          },
        error: (err) => 
        {
          Sup.unsubscribe();
        }
        });
    }},2000);
    }
   }

}
