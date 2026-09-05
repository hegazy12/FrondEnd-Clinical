import { Component, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChatService } from '../../services/ChatService/chat-service';
import { MassageDto } from '../../interfaces/massage-dto';
import { Camera } from '../camera/camera';

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
  public pendingExaminationId = signal<string>('');   // ← جديد

  constructor(
    private chatService: ChatService,
    private route: ActivatedRoute,
  ) {
    this.createBy.set(this.route.snapshot.paramMap.get('id') ?? '');
  }

  ngOnInit(): void {
    this.chatService.connect(this.createBy());

    this.chatService.messageReceived$.subscribe(msg => {
      if (!msg) return;  // تجاهل القيمة الابتدائية

      const newMsg: MassageDto = {
        from: msg.from,
        message: msg.message?.message
      };
      this.messagess.set(newMsg);

      if (newMsg.message) {
        this.pendingExaminationId.set(newMsg.message);
        this.takeMood.set(true);
      }
    });
  }

  ngOnDestroy(): void {
    this.chatService.disconnect();
  }
}