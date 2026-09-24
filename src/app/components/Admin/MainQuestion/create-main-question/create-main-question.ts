import { Component, signal, viewChild } from '@angular/core';
import { MainQuestionDTO } from '../../../../interfaces/main-question-dto';
import { VerfivationToken } from '../../../../services/verfivationToken/verfivation-token';
import { SwalAlert } from '../../../../services/swalAlert/swal-alert';
import { Callapi } from '../../../../services/callapi/callapi';
import { FormsModule } from '@angular/forms';
import { ListMainQuestion } from '../list-main-question/list-main-question';

@Component({
  selector: 'app-create-main-question',
  imports: [FormsModule, ListMainQuestion],
  templateUrl: './create-main-question.html',
  styleUrl: './create-main-question.css',
})
export class CreateMainQuestion {


  private listMainQuestion = viewChild(ListMainQuestion);

  public QuationBody: string = '';
  public dataType = signal<string>('');
  public Question = signal<MainQuestionDTO | undefined>(undefined);
  public list = signal<string[]>([]);
  public Itemlist = signal<string>('');
  public MaxNumber = signal<number>(0);
  public MinNumber = signal<number>(0);
  public description = signal<string>('');




  constructor(private Callapi: Callapi,
    private Verfication: VerfivationToken,
    private swal: SwalAlert) {

  }

  onSpecialtyChange(event: Event) {
    const element = event.target as HTMLSelectElement;
    console.log(element.name);
    if (element.name == "QuationDataType") {
      this.dataType.set(element.value);
    }
  }

  ngOnInit(): void {
    if (this.Verfication.islogin() == false) {

    }
    else {
    }
  }


  public onSubmit(quationBody: string, description: string, minValue: string, maxValue: string): void {
    let questionDto: MainQuestionDTO =
    {
      questionBody: quationBody,
      description: description,
      dataTypeName: this.dataType(),
      maxValue: maxValue,
      minValue: minValue,
      requeried: false,
      listValues: this.list(),
      maxage: 1,
      minage: 1,
      gendar: 1,
      requer: true
    };

    this.Create(questionDto);

  }

  public Create(DTO: MainQuestionDTO) {
    let sub = this.Callapi.AddMainQuestion(DTO).subscribe({
      next: (res) => {
        sub.unsubscribe();
        this.swal.showSuccess();
        this.listMainQuestion()?.getdata();
      },
      error: (err) => {
        this.swal.showWoringSave(err.error.message)
        sub.unsubscribe();
      }
    });
  }


  public addItemInlist(ItemInlist: string) {
    this.list.update(msgs => [...msgs, ItemInlist]);
    this.Itemlist.set('');
  }
}
