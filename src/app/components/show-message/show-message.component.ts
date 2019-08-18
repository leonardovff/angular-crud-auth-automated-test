import { Component, OnInit } from '@angular/core';
import { ShowMessageService } from 'src/app/components/show-message/show-message.service';

@Component({
  selector: 'app-show-message',
  templateUrl: './show-message.component.html',
  styleUrls: ['./show-message.component.scss']
})
export class ShowMessageComponent {
  message: String = null;
  constructor(private service: ShowMessageService) {
    this.service.message.subscribe(message => {
      this.message = message;
    })
  }
}
