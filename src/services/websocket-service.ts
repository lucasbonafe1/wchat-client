import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { MessageModel } from '../models/message-model';
import { EMPTY } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from '../enviroments/enviroment';

@Injectable({
  providedIn: 'root',
})
export class WebsocketService {
  private socket$: WebSocketSubject<any> | null = null;

  connect(token: string) {
    this.socket$ = webSocket({
      url: `${environment.wsUrl}?token=${token}`,
      deserializer: msgEvent => {// evita erro quando o servidor envia texto simples em vez de JSON
        const data = (msgEvent as MessageEvent).data;
        try {
          return JSON.parse(data);
        } catch {
          return data;
        }
      }
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
