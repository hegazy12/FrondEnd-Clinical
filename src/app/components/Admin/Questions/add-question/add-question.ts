import { Component, signal, ViewChild } from '@angular/core';
import { ListQuestion } from '../list-question/list-question';
import { Callapi } from '../../../../services/callapi/callapi';
import { VerfivationToken } from '../../../../services/verfivationToken/verfivation-token';
import { SwalAlert } from '../../../../services/swalAlert/swal-alert';
import { QuestionDTO } from '../../../../interfaces/question-dto';
import { ListSheetResponse, SheetDto1 } from '../../../../interfaces/sheet-dto';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-add-question',
  imports: [ListQuestion,FormsModule],
  templateUrl: './add-question.html',
  styleUrl: './add-question.css',
})
export class AddQuestion 
{
      @ViewChild(ListQuestion) ListQuestionRef!: ListQuestion;
      
      public SheetNane   = signal<string>('');
      public SheetItems  = signal<SheetDto1[]>([]); 
      public QuationBody : string='' ;
      public dataType    = signal<string>('');
      public sheetId     = signal<string>('');
      public Question    = signal<QuestionDTO |undefined>(undefined);
      public list        = signal<string[]>([]);
      public Itemlist    = signal<string>('');
      public MaxNumber   = signal<number>(0);
      public MinNumber   = signal<number>(0);
      public description = signal<string>('');

    

      constructor(private Callapi : Callapi,
                  private Verfication :VerfivationToken,
                  private swal: SwalAlert)
                  {
                    
                  }
                  
      onSpecialtyChange(event: Event) {
       const element = event.target as HTMLSelectElement;
       console.log(element.name);
       if(element.name == "QuationDataType") 
        {
           this.dataType.set(element.value);  
        }
        else if(element.name == "sheetName")
        {
            this.sheetId.set(element.value);
            this.ListQuestionRef.GitQuestionsBySheetId(element.value);
        }
      }

      ngOnInit():void
      {
        if(this.Verfication.islogin() == false)
        {
          
        }
        else
        {  
          this.SheetList();
        }
      }


      public onSubmit(quationBody: string, description: string, minValue: string, maxValue: string): void 
      {
          if (this.sheetId() != '') {
                if (this.dataType() == "Dropdown") {
                    if (this.list().length < 2) {
                      this.swal.showWoringSave("please Enter More than 2 item in list");
                return;
                  }
                } else if (this.dataType() == "Numeric") {
                    if (Number(minValue) > Number(maxValue)) {
                    this.swal.showWoringSave("Min number bigger than Max number");
                return;
                }
            }

            let questionDto: QuestionDTO =
              {
                  sheetId: this.sheetId(),
                  questionBody: this.QuationBody,
                  description: description,
                  dataTypeName: this.dataType(),
                  maxValue: maxValue,
                  minValue: minValue,
                  requeried: false,
                  listValues: this.list(),
                  questionDependId: '03a8b4b5-5dd3-4467-9e61-1a6b89400ea4',
                };
          
            this.Create(questionDto);
           
          }
          else 
          {
            this.swal.showWoringSave("Please Select Sheet");
            return;
          }
        }
      
        public Create(DTO :QuestionDTO) 
        {
        let sub =this.Callapi.AddQuestion(DTO).subscribe({
              next:(res)=>{
                  sub.unsubscribe();
                  this.swal.showSuccess();
                   this.ListQuestionRef.GitQuestionsBySheetId(this.sheetId());
              },
              error :(err)=>{
                  this.swal.showWoringSave(err.error.message)
                  sub.unsubscribe();
              }
          });
        }

      public SheetList() : boolean 
      {            
        let Sup = this.Callapi.SheetList().subscribe({
          next: (P : ListSheetResponse) =>
                {
                  
                  this.SheetItems.set(P.data);
                  
                  Sup.unsubscribe();
                  
                  this.ListQuestionRef.GitQuestionsBySheetId(this.sheetId());

                },
          error: (err) => 
              {
                Sup.unsubscribe();
              }
              });
        return true;
      }
      
      public addItemInlist(ItemInlist:string)
      {
        this.list.update(msgs => [...msgs, ItemInlist]);
        this.Itemlist.set('');
      }
}