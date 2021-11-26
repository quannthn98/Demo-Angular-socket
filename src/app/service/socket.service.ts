import {Injectable} from '@angular/core';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import {stringify} from '@angular/compiler/src/util';
import {NotifyService} from './notify.service';

const API_URL = `http://localhost:8080`;

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  stompClient: any;
  messages: string[] = [];


  constructor(private notifyService: NotifyService) {
  }

  connect() {
    const ws = new SockJS(`${API_URL}/ws`);
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

  async sendMessage(message) {
    this.stompClient.send('/app/chat', {}, message);
  }
}
