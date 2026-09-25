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
  // 0 = both, 1 = male, 2 = female
  public gendar = signal<number>(0);




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


  public onSubmit(quationBody: string, description: string, minValue: string, maxValue: string, minageValue: string, maxageValue: string, requer: boolean): void {
    // input.value is always a string; the API expects numbers (empty -> 0)
    const minage = Number(minageValue) || 0;
    const maxage = Number(maxageValue) || 0;

    if (quationBody.trim() == '') {
      this.swal.showWoringSave("Please enter the question body");
      return;
    }
    if (this.dataType() == '') {
      this.swal.showWoringSave("Please select data type");
      return;
    }
    if (minage < 0 || maxage < 0 || (maxage > 0 && minage > maxage)) {
      this.swal.showWoringSave("Min age must be less than or equal to max age");
      return;
    }

    let questionDto: MainQuestionDTO =
    {
      questionBody: quationBody,
      description: description,
      dataTypeName: this.dataType(),
      maxValue: maxValue,
      minValue: minValue,
      requeried: false,
      listValues: this.list(),
      maxage: maxage,
      minage: minage,
      gendar: this.gendar(),
      requer: requer
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
