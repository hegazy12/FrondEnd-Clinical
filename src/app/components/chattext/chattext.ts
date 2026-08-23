import { Component, OnInit, OnDestroy } from '@angular/core';
import { ChatService } from '../../services/ChatService/chat-service';

@Component({
  selector: 'app-chattext',
  imports: [],
  templateUrl: './chattext.html',
  styleUrl: './chattext.css',
})
export class Chattext {
  
 public messages: { from: string; message: string }[] = [];

  constructor(private chatService: ChatService) {}

  ngOnInit(): void 
  {
    this.chatService.connect('f2751e5e-dc63-49e0-9655-65bdbe5d751b'); 
    this.chatService.messageReceived$.subscribe(msg => {
      console.log(msg);
      if (msg) this.messages.push(msg);
    });
  }

  send(targetUserId: string, message: string): void 
  {
    this.chatService.sendToUser(targetUserId, message);
  }

  ngOnDestroy(): void {
    this.chatService.disconnect();
  }

}
