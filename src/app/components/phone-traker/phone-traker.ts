import { Component, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChatService } from '../../services/ChatService/chat-service';
import { MassageDto } from '../../interfaces/massage-dto';
import { Camera } from '../camera/camera';
import {Callapi} from '../../services/callapi/callapi';
import { FullByIdResponse, saveMedicalExaminationDTO2 } from '../../interfaces/medical-examinations-dto';
@Component({
  selector: 'app-phone-traker',
  imports: [Camera],
  templateUrl: './phone-traker.html',
  styleUrl: './phone-traker.css',
})
export class PhoneTraker {

  public createBy = signal<string>('');
  public messagess = signal<MassageDto | null>(null);
  public takeMood = signal<boolean>(false);
  public pendingExaminationId = signal<string | null |undefined >('');   // ← جديد
  public FullByIdResponse = signal<FullByIdResponse |null > (null);
  public saveMedicalExaminationDTO2 = signal<saveMedicalExaminationDTO2 |undefined >(undefined);
  
  public openCameMood = signal<boolean>(false);

  constructor(
    private chatService: ChatService,
    private route: ActivatedRoute,
    private Callapi : Callapi
  ) {
    this.createBy.set(this.route.snapshot.paramMap.get('id') ?? '');
  }

  ngOnInit(): void {
    
    this.chatService.connect(this.createBy())
    this.chatService.messageReceived$.subscribe(msg => {
      
      if (!msg) return; 

      const newMsg: MassageDto = {
        from: msg.from,
        message: msg.message?.message
      };

      this.messagess.set(newMsg);
      this.pendingExaminationId.set(newMsg.message);
      this.takeMood.set(false);
      this.openCameMood.set(true);
      this.GetExaminationByIdFull(String(newMsg.message));
      console.log(this.FullByIdResponse());
      console.log(this.saveMedicalExaminationDTO2());
      
    });
  }

  ngOnDestroy(): void {
    this.chatService.disconnect();
  }

  public  GetExaminationByIdFull(ExaminationId : string ) : boolean
  {
    let Sup =  this.Callapi.GetExaminationByIdFull(ExaminationId).subscribe({
    next: (P : FullByIdResponse) =>
      {
          this.FullByIdResponse.set(P);
          this.saveMedicalExaminationDTO2.set(P.data);
      },
    error: (err) => 
    {
    }
    });
    return true;
  }
  public openCamira(){
    if(this.takeMood())
    {
     this.takeMood.set(false);
    }
    else
    {
        this.takeMood.set(true);
    }
  }
}