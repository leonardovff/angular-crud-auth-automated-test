import { async, ComponentFixture, TestBed, tick } from '@angular/core/testing';

import { AuthLoginComponent } from './auth-login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { By } from '@angular/platform-browser';
import { AuthService } from 'src/app/services/auth/auth.service';
import { of, Observable, throwError } from 'rxjs';
import { SharedModule } from 'src/app/modules/shared/shared.module';


describe('AuthLoginComponent', () => {
  let component: AuthLoginComponent;
  let fixture: ComponentFixture<AuthLoginComponent>;
  let authSpy: any;
  let authService: AuthService;
  let messageSpy: any;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AuthLoginComponent,
      ],
      imports: [
        ReactiveFormsModule,
        HttpClientModule,
        SharedModule,
      ],
      providers: [AuthService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthLoginComponent);
    component = fixture.componentInstance;
    authService = fixture.debugElement.injector.get(AuthService);
    authSpy = spyOn(authService, 'authenticate').and.callFake(
      data => {
        if (data.cpf === '975.073.450-50' && data.password === '1234566') {
          return of({ msgsucesso: 'msgsucesso aqui' }).toPromise();
        }
        return throwError({ message: 'The user credentials were incorrect' }).toPromise();
      });
    messageSpy = spyOn(component.message, 'show').and.callThrough();

    fixture.detectChanges();

  });
  // isolated
  it('should call message error function',
    async (done) => {
    // Arrange
    const arrange = {
      cpf: '975.073.450-50',
      password: '123456'
    };

    // Act
    component.form.setValue({
      cpf: arrange.cpf,
      password: arrange.password
    });

    await component.save();
    await fixture.detectChanges();

    // Assert
    expect(messageSpy).toHaveBeenCalled();

    done();
  });


  // Shallow
  it('should authenticate with valid login', async (done) => {
    // Arrange
    const arrange = {
      cpf: '975.073.450-50',
      password: '1234566'
    };

    const cpf = fixture.debugElement
      .query(By.css('#cpf'))
      .nativeElement;
    const password = fixture.debugElement
      .query(By.css('#password'))
      .nativeElement;

    cpf.value = arrange.cpf;
    password.value = arrange.password;

    // Act
    await cpf.dispatchEvent(new Event('input'));
    await password.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    fixture.debugElement.query(By.css('.btn')).nativeElement.click();
    fixture.detectChanges();

    // Assert
    expect(authSpy).toHaveBeenCalledWith(arrange);
    done();
  });

});
