import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BirthDateMaskDirective } from './birth-date-mask.directive';

@Component({
  template: `<input type="text" appBirthDateMask>`
})
class TestBirthDateMaskDirectiveComponent {
}

describe('BirthDateMaskDirective', () => {
  let component: TestBirthDateMaskDirectiveComponent;
  let fixture: ComponentFixture<TestBirthDateMaskDirectiveComponent>;
  let inputEl: DebugElement;

  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      imports: [],
      declarations: [TestBirthDateMaskDirectiveComponent, BirthDateMaskDirective]
    }).createComponent(TestBirthDateMaskDirectiveComponent);
    component = fixture.componentInstance;
    inputEl = fixture.debugElement.query(By.css('input'));
  });

  it('should apply mask for date', () => {
    const arr = {
      input: '10021995',
      expect: '10/02/1995',
    };
    const input = inputEl.nativeElement;
    input.value = arr.input;
    input.dispatchEvent(new Event('input'));
    expect(input.value).toBe(arr.expect);
  });

  it('should not apply mask for not valid date', () => {
    const arr = {
      input: 'ss-$sdf',
      expect: '',
    };
    const input = inputEl.nativeElement;
    input.value = arr.input;
    input.dispatchEvent(new Event('input'));
    inputEl.triggerEventHandler('input', null);
    expect(input.value).toBe(arr.expect);
  });


  it('should not apply mask for not valid date', () => {
    const arr = {
      input: 'ss-$sdf',
      expect: '',
    };
    const input = inputEl.nativeElement;
    input.value = arr.input;
    input.dispatchEvent(new Event('input'));
    inputEl.triggerEventHandler('input', null);
    expect(input.value).toBe(arr.expect);
  });

  // it('should not apply mask for not valid day for february', () => {
  //   const arr = {
  //     input: '3102/1992',
  //     expect: '31'
  //   };
  //   const input = inputEl.nativeElement;
  //   input.value = arr.input;
  //   input.dispatchEvent(new Event('input'));
  //   inputEl.triggerEventHandler('input', null);
  //   expect(input.value).toBe(arr.expect);
  // });

  it('should return correct formated date string', () => {
    const arr = [{
      input: '9',
      expect: '09',
    },{
      input: '102',
      expect: '10/02',
    },
    {
      input: '100',
      expect: '10/0',
    },
    {
      input: '1002',
      expect: '10/02',
    },
    {
      input: '10029',
      expect: '10/02/19',
    },
    {
      input: '10021992',
      expect: '10/02/1992',
    },];
    const cpfMask = new BirthDateMaskDirective(fixture);
    arr.forEach(arrage => {
      expect(cpfMask.createMask(arrage.input)).toBe(arrage.expect);
    });
  });
});
