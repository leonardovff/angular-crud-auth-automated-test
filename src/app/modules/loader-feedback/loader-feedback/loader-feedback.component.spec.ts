import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoaderFeedbackComponent } from './loader-feedback.component';

describe('LoaderFeedbackComponent', () => {
  let component: LoaderFeedbackComponent;
  let fixture: ComponentFixture<LoaderFeedbackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoaderFeedbackComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoaderFeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
