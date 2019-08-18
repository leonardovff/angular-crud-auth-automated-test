import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowMessageComponent } from './show-message.component';
import { ShowMessageService } from 'src/app/components/show-message/show-message.service';
import { By } from '@angular/platform-browser';

describe('ShowMessageComponent', () => {
  let component: ShowMessageComponent;
  let fixture: ComponentFixture<ShowMessageComponent>;
  let service: ShowMessageService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowMessageComponent ],
      providers: [
        ShowMessageService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowMessageComponent);
    component = fixture.componentInstance;
    service = fixture.debugElement.injector.get(ShowMessageService);
    fixture.detectChanges();
  });

  it('should show the message and remove after the time', async () => {
    const arrage = {
      msg: 'Erro no envio dos dados',
      time: 500
    };
    service.show(arrage.msg, arrage.time);
    fixture.detectChanges();
    const el = fixture.debugElement.query(By.css('p')).nativeElement;
    expect(el.innerText).toEqual(arrage.msg);
    await new Promise(res => setTimeout(() => res(), 600));
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('p'))).toBe(null)
  });
});
