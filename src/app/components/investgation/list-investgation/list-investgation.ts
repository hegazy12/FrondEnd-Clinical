import { Component , Input, signal} from '@angular/core';
import { Callapi } from '../../../services/callapi/callapi';
import { VerfivationToken } from '../../../services/verfivationToken/verfivation-token';
import { Router  } from '@angular/router';
import { saveExaminationListResponse , saveMedicalExaminationDTO1  } from '../../../interfaces/medical-examinations-dto';
import Swal from 'sweetalert2';
import { ChatService } from '../../../services/ChatService/chat-service';
import { MassageDto } from '../../../interfaces/massage-dto';

@Component({
  selector: 'app-list-investgation',
  imports: [],
  templateUrl: './list-investgation.html',
  styleUrl: './list-investgation.css',
})
export class ListInvestgation {
   
    public saveExaminationListResponse =signal<saveExaminationListResponse | null>(null);
    public data= signal<saveMedicalExaminationDTO1[]>([]);
    last = signal<number>(0);
    @Input({ required: true }) AppointmentID!: string;
    @Input({ required: true }) isInHistoryMood!: boolean;

    constructor(private Callapi : Callapi ,
                private Verfication :VerfivationToken ,
                private router: Router,
                private chatService: ChatService){}

    ngOnInit():void
    {
      if(this.Verfication.islogin() == false){
          this.router.navigate(['/login']);
        }
      else
        {  
          if(this.AppointmentID != ""){
            this.GetInvestgationlist(this.AppointmentID,0);
          }
          console.log("this.AppointmentID = "+this.AppointmentID);
        }
    }
    
    public GetInvestgationlist(patientId : string, last:number) : boolean {
            let Sup = this.Callapi.ExaminationList(patientId).subscribe({
            next: (P : saveExaminationListResponse) =>
              {
                this.data.set(P.data);
                console.log(P.data);
                console.log(P.data.filter(m=> m.last  === 0));
                this.last.set(last);
                this.data.set(P.data.filter(m=> m.last === last));
                Sup.unsubscribe();
              },
            error: (err) => 
            {
              Sup.unsubscribe();
            }
            });
            return true;
      }

    
    public DeleteInvestgation(Id : string)
    {
      Swal.fire({
       title: "Are you sure?",
        text: "You won't be able to delete this!",
        icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!"
        }).then((result) => 
          {     
            let Sup = this.Callapi.DeleteExamination(Id).subscribe({
            next: (P : saveExaminationListResponse) =>
              { 
                if(P.success == true)
                {
                  Swal.fire({   title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"
                   });
                 
                }
                this.GetInvestgationlist(this.AppointmentID,this.last());
                Sup.unsubscribe();
              },
            error: (err) => 
            {
                this.GetInvestgationlist(this.AppointmentID,this.last());
              Sup.unsubscribe();
            }
            });
        });
    }
    
    public async takePhoto(examinationId: string) 
    {
          //this.chatService.disconnect()
          this.chatService.connect(this.Verfication.GetLoginID()); 
          this.chatService.messageReceived$.subscribe(msg => {
            console.log(msg?.from + " " + msg?.message.message + " " + msg?.message.time);
            const newMsg: MassageDto = {
              from: msg?.from,
              message: msg?.message?.message
            };
              //if (msg) this.messagess.update(msgs => [...msgs, newMsg]);
            });
             this.chatService.sendToUser(this.Verfication.GetLoginID(), examinationId);
            // try {
            //   await this.chatService.sendMessage('takePhoto', { examinationId });
            //   console.log('Message sent to the server to take a photo.');
            // } catch (error) {
            //   console.error('Error sending message to the server:', error);
            // }
     }
}
