import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MessageModel } from '../../models/message-model';
import { WebsocketService } from '../../services/websocket-service';
import { TypeEnum } from '../../models/enums/type-enum';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'chat-page',
  imports: [FormsModule, CommonModule],
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, OnDestroy{
  protected contentMessage: string = '';
  protected TypeEnum = TypeEnum;
  protected messagesArray: Array<{content: string, timestamp: Date, isSender: boolean}> = [];

  constructor(
    private webSocketService: WebsocketService
  ) {}

  ngOnInit(): void {
    this.messageListener();
  }
  
  public sendMessage(type : TypeEnum): void {
    const model = new MessageModel(type, this.contentMessage);
    this.webSocketService.sendMessage(model);

    this.messagesArray.push({content: this.contentMessage, timestamp: new Date(), isSender: true});
    this.contentMessage = '';
  }
  
  messageListener() {
    this.webSocketService
      .receiveMessages().subscribe({
        next: (msg) => {
          this.messagesArray.push({content: msg, timestamp: new Date(), isSender: false});
        },
        error: (err) => console.error('Erro na conexão:', err)
      });
  }

  ngOnDestroy(): void {
    this.webSocketService.disconnectSocket();
  }
}
