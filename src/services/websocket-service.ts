import { Injectable } from '@angular/core';
import { webSocket } from 'rxjs/webSocket';
import { Observable, of, Subject } from 'rxjs';
import { MessageModel } from '../models/message-model';

@Injectable({
  providedIn: 'root',
})
export class WebsocketService {
  webSocketSubject = new Subject<any>();

  constructor() {}

  connectSocket(webSocketUrl: string): Observable<any> {
    console.log(webSocketUrl);
    try {
      this.webSocketSubject = webSocket(webSocketUrl);
    } catch {
      return of(false);
    }
    return of(true);
  }

  sendMessage(body: MessageModel) {
    console.log(body);
    this.webSocketSubject.next(JSON.stringify(body));
  }

  receiveMessages(): Observable<any> {
    return this.webSocketSubject;
  }

  disconnectSocket() {
    this.webSocketSubject.complete();
  }
}
