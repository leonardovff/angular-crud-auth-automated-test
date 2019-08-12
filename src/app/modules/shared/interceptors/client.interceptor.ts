import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';

import { ClientsData } from './client-data';

@Injectable()
export class ClientInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    let clients: any[] = JSON.parse(localStorage.getItem('clients')) || [];

    if (!clients.length) {
      clients = ClientsData;
      localStorage.setItem('clients', JSON.stringify(clients));
    }

    return of(null).pipe(mergeMap(() => {

      // get list of clients
      if (request.url.endsWith('/clients') && request.method === 'GET') {
        // clients.sort((a, b) => {
        //     let lca = a.name.toLowerCase(), lcb = b.name.toLowerCase();
        //     return lca > lcb ? 1 : lca < lcb ? -1 : 0;
        // });
        return of(new HttpResponse({ status: 200, body: [...clients] }));
      }

      // get client by id
      if (request.url.match(/\/clients\/\d+$/) && request.method === 'GET') {
        // find client by id in client array
        let urlParts = request.url.split('/');
        let id = parseInt(urlParts[urlParts.length - 1]);
        let matchedClients = clients.filter(client => { return client.id === id; });
        let client = matchedClients.length ? matchedClients[0] : null;

        return of(new HttpResponse({ status: 200, body: client }));
      }

      // edit client by id
      if (request.url.match(/\/clients\/\d+$/) && request.method === 'PATCH') {
        // check for fake auth token in header and return client if valid, this security is implemented server side in a real application
        // find client by id in clients array
        let urlParts = request.url.split('/');
        let id = parseInt(urlParts[urlParts.length - 1]);
        let flag = false;
        clients = clients.map(client => {
          if (client.id == id) {
            flag = true;
            return {
              id: id,
              name: request.body.name,
              email: request.body.email,
              password: request.body.password,
              phone: request.body.phone
            }
          }
          return client;
        });
        if (!flag) {
          return throwError({ error: { message: 'Not found' } });
        }
        // save new client
        localStorage.setItem('clients', JSON.stringify(clients));

        return of(new HttpResponse({ status: 200, body: { message: "Success" } }));
      }

      // register client
      if (request.url.endsWith('/clients') && request.method === 'POST') {
        // get new client object from post body

        let newClient = request.body;
        clients = clients.sort((a, b) => b.id - a.id);
        newClient.id = clients[0].id + 1;
        clients.push(newClient);
        localStorage.setItem('clients', JSON.stringify(clients));

        // respond 200 OK
        return of(new HttpResponse({ status: 200, body: { id: newClient.id } }));
      }

      // delete client
      if (request.url.match(/\/clients\/\d+$/) && request.method === 'DELETE') {
        // check for fake auth token in header and return client if valid, this security is implemented server side in a real application
        if (request.headers.get('Authorization') === 'Bearer fake_bearer_token') {
          // find client by id in clients array
          let urlParts = request.url.split('/');
          let id = parseInt(urlParts[urlParts.length - 1]);
          clients = clients.filter(u => u.id != id)
          localStorage.setItem('clients', JSON.stringify(clients));

          // respond 200 OK
          return of(new HttpResponse({ status: 200 }));
        } else {
          // return 401 not authorised if token is null or invalid
          return throwError({ error: { message: 'Unauthorised' } });
        }
      }

      // pass through any requests not handled above
      return next.handle(request);

    }))
      .pipe(materialize())
      .pipe(delay(1000))
      .pipe(dematerialize());
  }
}
