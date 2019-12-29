import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { UserInterceptor } from 'src/app/modules/shared/interceptors/user.interceptor';

describe('AuthService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientModule
    ],
    providers: [
      {
        provide: HTTP_INTERCEPTORS,
        useClass: UserInterceptor,
        multi: true
      }
    ]
  }));

  it('should return an user', async (done: DoneFn) => {
    // Arrange
    const arrange = {
      input: {
        cpf: '975.073.450-50',
        password: '1234566'
      },
      expect: {
        id: 2,
        name: 'Christian Mcguire',
        cpf: '975.073.450-50',
        email: 'chris@chris.com',
        password: '1234566'
      },
    };

    const service: AuthService = TestBed.get(AuthService);

    // Act
    await service.authenticate(arrange.input).then((user) => {
      // Assert
      expect(user).toEqual(arrange.expect);
    });
    done();
  });

});
