import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { PhoneMaskDirective } from './phone-mask.directive';

@Component({
  template: `<input type="text" phoneMask>`
})
class TestPhoneMaskDirectiveComponent {
}

describe('PhoneMaskDirective', () => {
  let component: TestPhoneMaskDirectiveComponent;
  let fixture: ComponentFixture<TestPhoneMaskDirectiveComponent>;
  let inputEl: DebugElement;
  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      declarations: [PhoneMaskDirective, TestPhoneMaskDirectiveComponent]
    }).createComponent(TestPhoneMaskDirectiveComponent);
    component = fixture.componentInstance;
    inputEl = fixture.debugElement.query(By.css('input'));
  });
  it('should apply mask for number with 8 digits', () => {
    const arr = {
      input: "8299205555",
      expect: "(82) 9920-5555",
    }
    let input = inputEl.nativeElement;
    input.value = arr.input;
    input.dispatchEvent(new Event('input'));
    expect(input.value).toBe(arr.expect);
  });

  it('should not apply mask for not valid number', () => {
    const arr = {
      input: "ss-$sdf",
      expect: "",
    }
    let input = inputEl.nativeElement;
    input.value = arr.input;
    input.dispatchEvent(new Event('input'));
    inputEl.triggerEventHandler('input', null);
    expect(input.value).toBe(arr.expect);
  });

  it('should apply mask for number with 9 digits', () => {
    const arr = {
      input: "82999205555",
      expect: "(82) 99920-5555",
    }
    let input = inputEl.nativeElement;
    input.value = arr.input;
    input.dispatchEvent(new Event('input'));
    inputEl.triggerEventHandler('input', null);
    expect(input.value).toBe(arr.expect);
  });

  it('should return correct formated phone string', () => {
    const arr = [{
      input: "82999",
      expect: "(82) 999",
    },
    {
      input: "8299999",
      expect: "(82) 9999-9",
    },
    {
      input: "82999999999",
      expect: "(82) 99999-9999",
    }];
    let phoneMask = new PhoneMaskDirective(fixture);
    arr.forEach(arrage => {
      expect(phoneMask.createMask(arrage.input)).toBe(arrage.expect);
    })
  });
});
