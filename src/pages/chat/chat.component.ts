import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MessageModel } from '../../models/message-model';
import { map } from 'rxjs';
import { WebsocketService } from '../../services/websocket-service';

@Component({
  selector: 'chat-page',
  imports: [FormsModule],
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, OnDestroy{
  private url = 'http://localhost:8080/ws';
  protected contentMessage: string = '';
  protected dataList: any[] = [];
  
  constructor(private webSocketService: WebsocketService) {
  }

  ngOnInit(): void {
    let webSocketConnection$ = this.webSocketService.connectSocket(this.url);
    webSocketConnection$.subscribe((status: any) =>
      status ? this.messageListener() : 'erro na conexão'
    );
  }
  
  public sendMessage(type : string): void {
    const model = new MessageModel(type, this.contentMessage);
    this.webSocketService.sendMessage(model);
  }
  
  messageListener() {
    this.webSocketService
      .receiveMessages()
      .pipe(map((message: any) => this.setData(message)))
      .subscribe();
  }

   setData(data: any) {
    if (this.dataList.length < 10) this.dataList.push(data);
    else this.webSocketService.disconnectSocket();
    console.log(this.dataList);
  }

  ngOnDestroy(): void {
    this.webSocketService.disconnectSocket();
  }
}
