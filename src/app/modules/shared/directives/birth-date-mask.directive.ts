import { Directive, HostListener, ElementRef, OnInit } from '@angular/core';

@Directive({
  selector: '[appBirthDateMask]'
})
export class BirthDateMaskDirective implements OnInit {
  private previousValue = null;

  constructor(private el: ElementRef) {
  }

  ngOnInit() {
    setTimeout(() => this.setMask(), 0);
  }

  @HostListener('ngModelChange')
  @HostListener('input')
  setMask() {
    const mask = this.createMask(this.el.nativeElement.value);
    if (this.el.nativeElement.value !== this.previousValue) {
      this.el.nativeElement.value = mask;
      this.previousValue = mask;
      this.el.nativeElement.dispatchEvent(new Event('input'));
      setTimeout(()=> {
        this.el.nativeElement.dispatchEvent(new Event('input'));
      });
    }
  }
  private onlyDay(date: string, max = 31){
    const value = parseInt(date);
    if(value*10 > max && value <10){
      return 0 + "" + value;
    }
    if(value>max){
      return date.substr(0,1);
    }
    return date;
  }

  private onlyMonth(month: string){
    const max = 12,
    value = parseInt(month);
    if(value*10 > max && value <10){
      return 0 + "" + value;
    }
    if(value > max){
      return month.toString().substr(0,1);
    }
    return month;
  }
  private onlyYear(year: string, min: number = 1900, max:number = new Date().getFullYear()){
    const value = parseInt(year),
    valid = parseInt('1'+'0'.repeat(4 - value.toString().length));
    if((valid * value) >max){
      return 1 + "" + value;
    }
    if(value > max || (value < min && year.length == 4)){
      return year.toString().substr(0,2);
    }
    return year;
  }
  private dayAndMonth(date: string){
    const day = this.onlyDay(date.substr(0,2)),
    month = this.onlyMonth(date.substr(2,2));
    return `${day}/${month}`;
  }
  private fullDate(date: string){
    const year = this.onlyYear(date.substr(4,4));
    const day = this.onlyDay(date.substr(0,2)),
    month = this.onlyMonth(date.substr(2,2));
    return `${day}/${month}/${year}`;
  }

  createMask(date) {
    date = date.replace(/\D/g, '');
    if(!date.length) return '';
    if(date.length<=2) {
      return this.onlyDay(date)
    };
    if(date.length<=4){
      return this.dayAndMonth(date);
    }
    return this.fullDate(date);
  }
}
