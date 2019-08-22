import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderFeedbackService {
  private list: Array<string> = [];
  public isLoading: BehaviorSubject<boolean> = new BehaviorSubject(false)
  constructor() { }
  addLoad(param:string){
    this.list.push(param);
    if(!this.isLoading.value){
      this.isLoading.next(true);
    }
  }
  removeLoad(param: string){
    this.list.
    this.isLoading.next(false);
  }
}
