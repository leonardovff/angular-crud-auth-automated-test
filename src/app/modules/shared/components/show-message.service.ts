import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShowMessageService {
  public message: Subject<String> = new Subject();
  constructor() {
  }
  show(message: string, time: number = 2000) {
    this.message.next(message);

    setTimeout(() => {
      this.message.next(null)
    }, time)
  }
}
