import {Component, OnInit} from '@angular/core';
import {SocketService} from '../../service/socket.service';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  message: string;
  messages: string[] = [];
  stompClient: any;
  name: string;
  notify: string;
  members = 0;

  constructor(private socketService: SocketService) {
  }

  connect() {
    this.members++;
    const ws = new SockJS('http://localhost:8080/ws');
    this.stompClient = Stomp.over(ws);
    this.stompClient.connect({}, frame => {
      this.stompClient.subscribe('/topic/chat', data => {
        console.log(data);
        this.messages.push(data.body);
      });
    });
  }

  disconnect() {
    if (this.stompClient != null) {
      this.stompClient.disconnect();
    }
  }

  ngOnInit() {
    this.connect();
  }

  sendMessage() {
    if (this.name === undefined || this.name == null) {
      alert('please join chat room before send message');
    } else {
      this.stompClient.send('/app/chat', {}, `${this.name}: ${this.message}`);
    }
  }

  join() {
    this.notify = `${this.name} has joined the chat room`;
    this.stompClient.send('/app/chat', {}, this.notify);
  }

}
