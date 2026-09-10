import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-save-answer-question',
  imports: [],
  templateUrl: './save-answer-question.html',
  styleUrl: './save-answer-question.css',
})
export class SaveAnswerQuestion 
{
  @Input({ required: true }) SheetID!: string;
  
}
