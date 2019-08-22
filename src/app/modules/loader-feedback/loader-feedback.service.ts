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
    const index = this.list.indexOf(param);
    if(index == -1){
      return false;
    }
    this.list.splice(index, 1);
    if(this.list.length == 0){
      this.isLoading.next(false);
    }
    return true;
  }
}
