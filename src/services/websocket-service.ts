import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { MessageModel } from '../models/message-model';
import { isPlatformBrowser } from '@angular/common';
import { EMPTY } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WebsocketService {
  private socket$: WebSocketSubject<any> | null = null;

  connect(userId: string) {
    this.socket$ = webSocket({
      url: `ws://localhost:8080/chat?userId=${userId}`
    });
  }

  sendMessage(body: MessageModel) {
    this.socket$?.next(body);
  }

  receiveMessages() {
    return this.socket$?.asObservable() || EMPTY;
  }

  disconnectSocket() {
    this.socket$?.complete();
  }
}
