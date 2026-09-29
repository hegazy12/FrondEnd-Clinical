import { Component, Input, output, signal } from '@angular/core';
import { Callapi } from '../../../services/callapi/callapi';
import { VerfivationToken } from '../../../services/verfivationToken/verfivation-token';
import { SwalAlert } from '../../../services/swalAlert/swal-alert';
import { ListSaveMainQuestionResponse, SaveMainQuestionDTO2 } from '../../../interfaces/save-main-question-dto';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-list-save-main-question',
  imports: [],
  templateUrl: './list-save-main-question.html',
  styleUrl: './list-save-main-question.css',
})

export class ListSaveMainQuestion {

  @Input({ required: true }) PatientId!: string;
  @Input({ required: true }) isInHistoryMood: boolean = false;

  // tells the parent a saved answer was deleted, so it can reload the unanswered questions
  deleted = output<void>();

  public data = signal<SaveMainQuestionDTO2[]>([]);

  constructor(
    private callapi: Callapi,
    private Vervication: VerfivationToken,
    private swal: SwalAlert) {

  }

  ngOnInit(): void {
    if (this.Vervication.islogin() == false) { }
    else {
      if (this.PatientId != '') {
        this.GetSaveMainQuestions(this.PatientId);
      }
    }
  }

  public GetSaveMainQuestions(PatientId: string) {
    let Sup = this.callapi.ListSaveMainQuestion(PatientId).subscribe({
      next: (P: ListSaveMainQuestionResponse) => {
        this.data.set(P.data);
        Sup.unsubscribe();
      },
      error: (err) => {
        Sup.unsubscribe();
      }
    });
  }

  public DeleteSaveMainQuestion(Id: string) {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        let Sup = this.callapi.DeleteSaveMainQuestion(Id).subscribe({
          next: (P: any) => {
            if (P.success == true) {
              Swal.fire({
                title: "Deleted!",
                text: "The answer has been deleted.",
                icon: "success"
              });
              this.deleted.emit();
            }
            this.GetSaveMainQuestions(this.PatientId);
            Sup.unsubscribe();
          },
          error: (err) => {
            this.swal.showWoringSave(err.error?.message);
            this.GetSaveMainQuestions(this.PatientId);
            Sup.unsubscribe();
          }
        });
      }
      else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire({
          title: "Cancelled",
          text: "The answer is safe :)",
          icon: "error"
        });
      }
    });
  }
}
