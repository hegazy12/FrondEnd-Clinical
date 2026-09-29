import { Component, Input, signal, viewChild } from '@angular/core';
import { ListSaveMainQuestion } from '../list-save-main-question/list-save-main-question';
import { MainQuestionDTO1 } from '../../../interfaces/main-question-dto';
import { Callapi } from '../../../services/callapi/callapi';
import { SwalAlert } from '../../../services/swalAlert/swal-alert';
import { SaveMainQuestionDTO } from '../../../interfaces/save-main-question-dto';

@Component({
  selector: 'app-create-save-main-question',
  imports: [ListSaveMainQuestion],
  templateUrl: './create-save-main-question.html',
  styleUrl: './create-save-main-question.css',
})
export class CreateSaveMainQuestion {

  public MainQuestions = signal<MainQuestionDTO1[]>([]);
  // answers keyed by mainQuestion id
  public Answers = signal<Record<string, string>>({});
  public Notes = signal<Record<string, string>>({});

  public SaveMainQuestions = signal<SaveMainQuestionDTO[]>([])

  public isSaving = signal<boolean>(false);

  @Input({ required: true }) PatientId!: string;

  private listSaveMainQuestion = viewChild(ListSaveMainQuestion);

  constructor(private Callapi: Callapi,
    private swal: SwalAlert) { }

  ngOnInit(): void {
    this.GetMainQuestions(this.PatientId);
  }

  public GetMainQuestions(idPatinet: string) {
    let sub = this.Callapi.GetByPatientIdMainQuestion(idPatinet).subscribe({
      next: (res) => {
        this.MainQuestions.set(res.data);
        sub.unsubscribe();
      },
      error: (err) => {
        sub.unsubscribe();
      }
    });
  }

  public setAnswer(questionId: string, value: string) {
    this.Answers.update(a => ({ ...a, [questionId]: value }));
  }

  public setNote(questionId: string, value: string) {
    this.Notes.update(n => ({ ...n, [questionId]: value }));
  }

  public isOutOfRange(question: MainQuestionDTO1): boolean {
    const value = this.Answers()[question.id];
    if (value === undefined || value === '') return false;
    const num = Number(value);
    const min = question.minValue !== '' && question.minValue != null ? Number(question.minValue) : null;
    const max = question.maxValue !== '' && question.maxValue != null ? Number(question.maxValue) : null;
    return (min !== null && num < min) || (max !== null && num > max);
  }

  public SaveAll() {

    Object.entries(this.Answers()).forEach(([key, value]) => {
      this.SaveMainQuestions.update(a => [...a, {
        patientId: this.PatientId,
        mainQuestionId: key,
        value: value,
        notes: ''
      }]);
    });

    this.isSaving.set(true);
    let sub = this.Callapi.AddListSaveMainQuestion(this.SaveMainQuestions()).subscribe({
      next: (res) => {
        this.swal.showSuccess();
        this.GetMainQuestions(this.PatientId);
        this.listSaveMainQuestion()?.GetSaveMainQuestions(this.PatientId);
        this.SaveMainQuestions.set([]);
        this.isSaving.set(false);
        sub.unsubscribe();
      },
      error: (err) => {
        this.swal.showError("Main Questions not saved");
        this.isSaving.set(false);
        sub.unsubscribe();
      }
    });

  }

}
