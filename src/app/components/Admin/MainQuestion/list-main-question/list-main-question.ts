import { Component, signal } from '@angular/core';
import { Callapi } from '../../../../services/callapi/callapi';
import { VerfivationToken } from '../../../../services/verfivationToken/verfivation-token';
import { SwalAlert } from '../../../../services/swalAlert/swal-alert';
import { ListMainQuestionResponse, MainQuestionDTO1 } from '../../../../interfaces/main-question-dto';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-main-question',
  imports: [],
  templateUrl: './list-main-question.html',
  styleUrl: './list-main-question.css',
})
export class ListMainQuestion {

  constructor(private callapi: Callapi,
    private Verfication: VerfivationToken,
    private swal: SwalAlert) {
  }

  public data = signal<MainQuestionDTO1[]>([]);

  ngOnInit(): void {
    if (this.Verfication.islogin() == false) {

    }
    else {
      this.getdata();
    }
  }

  getdata() {
    let sub = this.callapi.GetAllMainQuestion().subscribe({
      next: (P: ListMainQuestionResponse) => {
        this.data.set(P.data);
        sub.unsubscribe();
      },
      error: (err) => {
        sub.unsubscribe();
      }
    })
  }

  public deleteMainQuestion(id: string) {
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
        let sub = this.callapi.DeleteMainQuestion(id).subscribe({
          next: (P: any) => {
            if (P.success == true) {
              Swal.fire({
                title: "Deleted!",
                text: "The question has been deleted.",
                icon: "success"
              });
            }
            this.getdata();
            sub.unsubscribe();
          },
          error: (err) => {
            this.swal.showWoringSave(err.error.message)
            this.getdata();
            sub.unsubscribe();
          }
        });
      }
      else if (result.dismiss === Swal.DismissReason.cancel)
        Swal.fire({
          title: "Cancelled",
          text: "The question is safe :)",
          icon: "error"
        });
    });
  }

}
