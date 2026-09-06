import { Component, Input, Output,EventEmitter, signal } from '@angular/core';

@Component({
  selector: 'app-ditaial-investgation',
  imports: [],
  templateUrl: './ditaial-investgation.html',
  styleUrl: './ditaial-investgation.css',
})
export class DitaialInvestgation 
{
  @Input({ required: true }) InvestgationID!: string;
  @Input({ required: true }) showPhotoState!: boolean;
  @Output() closed = new EventEmitter<void>(); 
   
  public isVisible = signal<boolean>(true);
   
  close(): void
  {
    //console.log("signal<boolean>(this.showPhotoState)" + signal<boolean>(this.showPhotoState));
    this.isVisible.set(false);

    //this.closed.emit(); // يبلّغ الأب إنه اتقفل، عشان يشيل الكومبوننت من الـ DOM لو حابب
  }
}
