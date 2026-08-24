import { Component, OnInit, OnDestroy, signal } from '@angular/core';
import { ChatService } from '../../services/ChatService/chat-service';
import { VerfivationToken } from '../../services/verfivationToken/verfivation-token';
import { MassageDto, } from '../../interfaces/massage-dto';
@Component({
  selector: 'app-chattext',
  imports: [],
  templateUrl: './chattext.html',
  styleUrl: './chattext.css',
})
export class Chattext {
  
  public messagess = signal<MassageDto[]>([]);
  private Dto = signal<MassageDto|undefined>(undefined);

  constructor(private chatService: ChatService,private Vervication:VerfivationToken) {}

  ngOnInit(): void 
  { this.chatService.disconnect()
    this.chatService.connect(this.Vervication.GetLoginID()); 
    this.chatService.messageReceived$.subscribe(msg => {
      console.log(msg?.from + " " + msg?.message.message + " " + msg?.message.time);
      const newMsg: MassageDto = {
        from: msg?.from,
        message: msg?.message?.message
      };
      if (msg) this.messagess.update(msgs => [...msgs, newMsg]);
    });
  }

  send(message: string): void 
  {
    this.chatService.sendToUser(this.Vervication.GetLoginID(), message);
  }

  ngOnDestroy(): void {
    this.chatService.disconnect();
  }

}
