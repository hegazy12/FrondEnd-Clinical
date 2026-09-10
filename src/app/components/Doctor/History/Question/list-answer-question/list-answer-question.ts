import { Component, Input } from '@angular/core';
import { SaveAnswerQuestion } from '../save-answer-question/save-answer-question';

@Component({
  selector: 'app-list-answer-question',
  imports: [SaveAnswerQuestion],
  templateUrl: './list-answer-question.html',
  styleUrl: './list-answer-question.css',
})
export class ListAnswerQuestion 
{
    @Input({ required: true }) SheetID!: string;
}
