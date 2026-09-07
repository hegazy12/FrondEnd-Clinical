import { Component, Input, Output,EventEmitter, signal } from '@angular/core';
import { Callapi } from '../../../services/callapi/callapi';
import { ExaminationPhotoDto, ExaminationPhotoResponse} from '../../../interfaces/medical-examinations-dto'

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

  public ExaminationPhotoResponse = signal<ExaminationPhotoResponse | null>(null);
  public data = signal<ExaminationPhotoDto[]>([]);
 
  constructor(private Callapi : Callapi)
  {

  }

  public isVisible = signal<boolean>(true);
  
  ngOnInit():void
  {
   this.GetExaminationPhotoById(this.InvestgationID);
  }


  close(): void
  {
    this.isVisible.set(false);  
  }

  public GetExaminationPhotoById(ExaminationtId : string) : boolean 
  {
      let Sup = this.Callapi.GetExaminationPhotoById(ExaminationtId).subscribe({
      next: (P : ExaminationPhotoResponse) =>
        {
          this.data.set(P.data);
          Sup.unsubscribe();
        },
      error: (err) => 
      {
        Sup.unsubscribe();
      }
      });
      return true;
  }

  public toImageSrc(base64: string): string {
    return `data:image/png;base64,${base64}`;
  }

}
