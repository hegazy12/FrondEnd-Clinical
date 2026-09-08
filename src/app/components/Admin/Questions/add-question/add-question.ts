import { Component, ViewChild } from '@angular/core';
import { ListQuestion } from '../list-question/list-question';
import { Callapi } from '../../../../services/callapi/callapi';
import { VerfivationToken } from '../../../../services/verfivationToken/verfivation-token';
import { SwalAlert } from '../../../../services/swalAlert/swal-alert';

@Component({
  selector: 'app-add-question',
  imports: [ListQuestion],
  templateUrl: './add-question.html',
  styleUrl: './add-question.css',
})
export class AddQuestion 
{
      @ViewChild(ListQuestion) ListQuestionRef!: ListQuestion;

      constructor(private Callapi : Callapi,
                  private Verfication :VerfivationToken,
                  private swal: SwalAlert)
                  {}
                  
}
