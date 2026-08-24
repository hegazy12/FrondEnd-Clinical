import { Component, inject, signal, Renderer2 } from '@angular/core';
import { SwalAlert } from '../../services/swalAlert/swal-alert';
import { Callapi } from '../../services/callapi/callapi';
import { VerfivationToken } from '../../services/verfivationToken/verfivation-token';
import { Router, ActivatedRoute } from '@angular/router';
import {ChatService} from  '../../services/ChatService/chat-service'
import {PhoneTrackerDto} from '../../interfaces/phone-tracker-dto'
@Component({
  selector: 'app-phone-traker',
  imports: [],
  templateUrl: './phone-traker.html',
  styleUrl: './phone-traker.css',
})
export class PhoneTraker {
  private callApi      = inject(Callapi);
  private verification = inject(VerfivationToken);
  private router       = inject(Router);
  private route        = inject(ActivatedRoute);
  private swal         = inject(SwalAlert);
  private renderer     = inject(Renderer2);
  private ChatService  = inject(ChatService);
  public messages = signal<PhoneTrackerDto|null>(null);
  public doctorId      = signal<string>(this.route.snapshot.paramMap.get('id') ?? '');
  
    ngOnInit():void
    {
          this.ChatService.connect(this.doctorId());
          
          this.ChatService.messageReceived$.subscribe(msg => {
              console.log(msg);
              //if (msg) this.messages.set(msg);
            }
          );
    }

  send(targetUserId: string, message: string): void 
  {
    this.ChatService.sendToUser(targetUserId, message);
  }

  ngOnDestroy(): void {
    this.ChatService.disconnect();
  }
}
