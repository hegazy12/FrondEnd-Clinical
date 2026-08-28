import { Component, inject, signal, Renderer2 } from '@angular/core';
import { SwalAlert } from '../../services/swalAlert/swal-alert';
import { Callapi } from '../../services/callapi/callapi';
import { VerfivationToken } from '../../services/verfivationToken/verfivation-token';
import { Router, ActivatedRoute } from '@angular/router';
import {ChatService} from  '../../services/ChatService/chat-service';
import {PhoneTrackerDto} from '../../interfaces/phone-tracker-dto';
import {LinkService} from '../../services/linkService/link-service';
import {MassageDto} from '../../interfaces/massage-dto';

@Component({
  selector: 'app-phone-traker',
  imports: [],
  templateUrl: './phone-traker.html',
  styleUrl: './phone-traker.css',
})
export class PhoneTraker {
 
   public frontLink = signal<string>('');
   public doctorId  = signal<string>('');
   public messagess = signal<MassageDto|null>(null);

   constructor(private callapi : Callapi,
              private router:Router,
              private Vervication:VerfivationToken,
              private LinkService : LinkService,
              private chatService:ChatService,
              private route: ActivatedRoute,)
               {
                this.doctorId.set(this.route.snapshot.paramMap.get('id') ?? '');
                this.frontLink.set(this.LinkService.gitFrontOrigin());
                
              }
   

    ngOnInit():void
    {
          this.chatService.connect(this.Vervication.GetLoginID()); 
            this.chatService.messageReceived$.subscribe(msg => {
                const newMsg: MassageDto = {
                    from: msg?.from,
                    message: msg?.message?.message
                };
                if (msg) this.messagess.set(newMsg);
              });
    }



  ngOnDestroy(): void {
    this.chatService.disconnect();
  }
}
