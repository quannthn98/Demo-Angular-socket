import {Component, OnInit} from '@angular/core';
import {SocketService} from '../../service/socket.service';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import {NotifyService} from '../../service/notify.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  message: string;
  messages: string[] = [];
  name: string;
  notify: string;

  constructor(private socketService: SocketService,
              private notifyService: NotifyService) {
  }

  ngOnInit() {
    this.socketService.connect();
    this.notifyService.connect();
  }

  async sendMessage() {
    if (this.name === undefined || this.name == null) {
      alert('please join chat room before send message');
    } else {
      await this.socketService.sendMessage(`${this.name}: ${this.message}`);
      await this.notifyService.sendNotify({
        message: `new Message from ${this.name}`
      });
    }
  }

  join() {
    this.notify = `${this.name} has joined the chat room`;
    this.socketService.sendMessage(this.notify);
  }

}
