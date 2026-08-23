import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private hubConnection!: signalR.HubConnection;

  // Emits incoming messages: { from: string, message: string }
  public messageReceived$ = new BehaviorSubject<{ from: string; message: string } | null>(null);

 
  public connectionState$ = new BehaviorSubject<signalR.HubConnectionState>(
    signalR.HubConnectionState.Disconnected
  );

  private hubUrl = 'http://localhost:5244/hubs/chat';

  public connect(userId: string): void {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(`${this.hubUrl}?userId=${encodeURIComponent(userId)}`, {
        withCredentials: true // needed since CORS uses AllowCredentials()
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
    this.hubConnection.on('ReceiveMessage', (from: string, message: string) => {
      this.messageReceived$.next({ from, message });
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