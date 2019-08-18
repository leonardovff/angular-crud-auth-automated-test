import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShowMessageService {
  public message: Subject<String> = new Subject();
  show(message: string, time: number = 2000) {
    console.log("entrou2");
    this.message.next(message);

    setTimeout(() => {
      this.message.next(null)
    }, time)
  }
  constructor() {
    console.log("entrou3");
  }
}
