import { Component, Input, output, signal } from '@angular/core';
import { Callapi } from '../../../../../services/callapi/callapi';
import { SwalAlert } from '../../../../../services/swalAlert/swal-alert';
import { VerfivationToken } from '../../../../../services/verfivationToken/verfivation-token';
import { GetsaveQuestionInSheetResponse, saveQuestionDTO2 } from '../../../../../interfaces/question-dto';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-save-answer-question',
  imports: [],
  templateUrl: './save-answer-question.html',
  styleUrl: './save-answer-question.css',
})
export class SaveAnswerQuestion 
{
  @Input({ required: true }) SheetID!: string;
  @Input({ required: true }) AppointmentID!: string;

  @Input({ required: true }) isInHistoryMood!: boolean;

  messageSent = output<void>();
  public data = signal<saveQuestionDTO2[]>([]);
  
  sendMessage(){
    this.messageSent.emit();
  }

  constructor(private callapi : Callapi,private Vervication:VerfivationToken,private swal: SwalAlert)
        {
  
        }

   ngOnInit():void 
      {
        if(this.Vervication.islogin() == false)
        {    
        }
        else
        {
          if(this.AppointmentID != "")
          {
              this.GetsaveQuestionInSheet(this.SheetID,this.AppointmentID);
          }
        }
      }  
  
    public GetsaveQuestionInSheet(SheetId : string ,appointmentId : string) : boolean 
    {
      if(SheetId != '') 
      {
        let Sup = this.callapi.GetsaveQuestionInSheet(SheetId,appointmentId).subscribe({
        next: (P : GetsaveQuestionInSheetResponse) =>
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


      public DeleteSaveQuestion(Id : string)
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
              let Sup = this.callapi.DeleteSaveQuestion(Id).subscribe({
              next: (P : any) =>
                { 
                  if(P.success == true)
                  {
                    Swal.fire({   
                      title: "Deleted!",
                      text: "Your Question has been deleted.",
                      icon: "success"
                     });
                     this.GetsaveQuestionInSheet(this.SheetID,this.AppointmentID);
                     this.sendMessage();
                     Sup.unsubscribe();
                  }
                  else
                  {
                    this.GetsaveQuestionInSheet(this.SheetID,this.AppointmentID);
                    Sup.unsubscribe();
                  }
                   
                },
              error: (err) => 
              {
                this.GetsaveQuestionInSheet(this.SheetID,this.AppointmentID);
                Sup.unsubscribe();
              }
              });
          });
      }
   
}
