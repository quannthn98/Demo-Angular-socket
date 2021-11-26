import {Injectable} from '@angular/core';
import {Notify} from '../interface/notify';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';

@Injectable({
  providedIn: 'root'
})
export class NotifyService {
  notifies: Notify[] = [];
  stompClient: any;

  constructor() {
  }

  connect() {
    const ws = new SockJS('http://localhost:8080/ws');
    this.stompClient = Stomp.over(ws);
    this.stompClient.connect({}, frame => {
      this.stompClient.subscribe('/topic/notify', data => {
        this.notifies.push(JSON.parse(data.body));
        console.log(this.notifies);
      });
    });
  }

  disconnect() {
    if (this.stompClient != null) {
      this.stompClient.disconnect();
    }
  }

  sendNotify(notify: Notify) {
    this.stompClient.send('/app/notify', {}, JSON.stringify(notify));
  }
}
