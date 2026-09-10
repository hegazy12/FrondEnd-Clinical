import { Component, Input, signal } from '@angular/core';
import { VerfivationToken } from '../../../../services/verfivationToken/verfivation-token';
import { Callapi } from '../../../../services/callapi/callapi';
import { QuestionDTO1, QuestionListResponse, SaveQuestionResponse } from '../../../../interfaces/question-dto';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-list-question',
  imports: [],
  templateUrl: './list-question.html',
  styleUrl: './list-question.css',
})
export class ListQuestion 
{ 
  public SheetID: string = ''; 
  public data  =signal<QuestionDTO1[]>([]);

  constructor(private Callapi : Callapi,
              private Verfication :VerfivationToken)
              {

              }
  
      ngOnInit():void
      {
        if(this.Verfication.islogin() == false)
        {
          
        }
        else
        {  
          // if(this.SheetID != '') 
          //   {
          //     this.GitQuestionsBySheetId(this.SheetID);
          //   }
        }
      }

      public GitQuestionsBySheetId(SheetId : string) : boolean 
      {

        if(SheetId != '') 
        {
          let Sup = this.Callapi.GitQuestionsBySheetId(SheetId).subscribe({
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
      this.SheetID = SheetId;
      return true;
    }

    

    public DeleteQuestion(Id : string)
    {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to delete this!",
        icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!"
        }).then((result) => 
          {     
            let Sup = this.Callapi.DeleteQuestion(Id).subscribe({
            next: (P : SaveQuestionResponse) =>
              { 
                if(P.success == true)
                {
                  Swal.fire({   
                    title: "Deleted!",
                    text: "Your Question has been deleted.",
                    icon: "success"
                    }); 
                }
                this.GitQuestionsBySheetId(this.SheetID);
                Sup.unsubscribe();
              },
            error: (err) => 
            {
                this.GitQuestionsBySheetId(this.SheetID);
                Sup.unsubscribe();
            }
            });
        });
      }
}
