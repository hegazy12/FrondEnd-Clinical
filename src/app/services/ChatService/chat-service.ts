import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { BehaviorSubject } from 'rxjs';
import { LinkService} from '../linkService/link-service';
import { HttpHeaders } from '@angular/common/http';
import { MassageDto,messages} from '../../interfaces/massage-dto';
@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private hubUrl = '';
  constructor(private LinkService : LinkService)
  {
   this.hubUrl = LinkService.gitLinK()+'hubs/chat'
  }  


  private hubConnection!: signalR.HubConnection;

  public messageReceived$ = new BehaviorSubject<{from :string ,message:messages} | null>(null);

 
  public connectionState$ = new BehaviorSubject<signalR.HubConnectionState>(
    signalR.HubConnectionState.Disconnected
  );



  public connect(userId: string): void {
    console.log("linK hub:"+this.hubUrl);
    
    this.hubConnection = new signalR.HubConnectionBuilder()
     .withUrl(`${this.hubUrl}?userId=${encodeURIComponent(userId)}`, {
       withCredentials: true,
        headers: {
         'ngrok-skip-browser-warning': 'true'
       }
      })
      .withAutomaticReconnect()
      .configureLogging(signalR.LogLevel.Information)
      .build();
    
      this.registerHandlers();

    this.hubConnection
      .start()
      .then(() => {
        console.log('SignalR connected');
        this.connectionState$.next(this.hubConnection.state);
      })
      .catch(err => {
        console.error('SignalR connection error:', err);
        this.connectionState$.next(this.hubConnection.state);
      });

    this.hubConnection.onreconnecting(() => this.connectionState$.next(this.hubConnection.state));
    this.hubConnection.onreconnected(() => this.connectionState$.next(this.hubConnection.state));
    this.hubConnection.onclose(() => this.connectionState$.next(this.hubConnection.state));
  }

  private registerHandlers(): void {
    this.hubConnection.on('ReceiveMessage', (from: string, message: messages) => {
      this.messageReceived$.next({ from, message:message });
    });
  }

  public sendToUser(targetUserId: string, message: string): Promise<void> {
    return this.hubConnection.invoke('SendToUser', targetUserId, message);
  }

  public sendToConnection(targetConnectionId: string, message: string): Promise<void> {
    return this.hubConnection.invoke('SendToConnection', targetConnectionId, message);
  }

  public disconnect(): void {
    if (this.hubConnection) {
      this.hubConnection.stop();
    }
  }

  public get connectionId(): string | null {
    return this.hubConnection?.connectionId ?? null;
  }
}