import { async, ComponentFixture, TestBed, tick } from '@angular/core/testing';

import { AuthLoginComponent } from './auth-login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { ClientService } from 'src/app/services/client/client.service';
import { ActivatedRoute } from '@angular/router';
import { By } from '@angular/platform-browser';
import { CpfMaskDirective } from 'src/app/modules/shared/directives/cpf-mask.directive';


describe('AuthLoginComponent', () => {
  let component: AuthLoginComponent;
  let fixture: ComponentFixture<AuthLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AuthLoginComponent,
        CpfMaskDirective,
      ],
      imports: [
        ReactiveFormsModule,
        HttpClientModule,
      ],
      providers: []
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthLoginComponent);
    component = fixture.componentInstance;
  });

  it('should ', async () => {

  });

});
