import { Component, Inject, Input, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MessageModel } from '../../models/message-model';
import { WebsocketService } from '../../services/websocket-service';
import { TypeEnum } from '../../models/enums/type-enum';
import { CommonModule, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'chat-page',
  imports: [FormsModule, CommonModule],
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit{
  @Input() public userIdSelected: string = '';
  protected contentMessage: string = '';
  protected TypeEnum = TypeEnum;
  protected messagesArray: Array<{content: string, timestamp: Date, isSender: boolean}> = [];

  constructor(@Inject(PLATFORM_ID) private platformId: Object,
    private webSocketService: WebsocketService
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      var token = localStorage.getItem('bearer-token') || '';
      this.webSocketService.connect(token);
      this.messageListener();
    }
  }
  
  public sendMessage(type : TypeEnum): void {
    console.log('Enviando mensagem para :', this.userIdSelected);
    const model = new MessageModel(type, this.userIdSelected, this.contentMessage);
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

  // ngOnDestroy(): void {
  //   this.webSocketService.disconnectSocket();
  // }
}
