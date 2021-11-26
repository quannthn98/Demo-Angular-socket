import { Component, OnInit } from '@angular/core';
import {NotifyService} from '../../service/notify.service';

@Component({
  selector: 'app-notify',
  templateUrl: './notify.component.html',
  styleUrls: ['./notify.component.css']
})
export class NotifyComponent implements OnInit {

  constructor(private notifyService: NotifyService) { }

  ngOnInit() {
    this.notifyService.connect();
  }

}
