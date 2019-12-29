import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';

import { UsersData } from './user-data';

@Injectable()
export class UserInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const users = UsersData;

    return of(null).pipe(mergeMap(() => {
      // login user
      if (request.url.endsWith('/auth') && request.method === 'POST') {

        const data = request.body;
        const newUser = users.find(
          (user) =>
            user.cpf === data.cpf && user.password === data.password
        );

        if (!newUser) {
          console.log(newUser);
          return throwError({ error: { message: 'Not found' } });
        }

        return of(new HttpResponse({ status: 200, body: newUser }));
      }


      return next.handle(request);

    }))
      .pipe(materialize())
      .pipe(delay(1000))
      .pipe(dematerialize());
  }
}
