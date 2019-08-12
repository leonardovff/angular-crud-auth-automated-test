import { TestBed } from '@angular/core/testing';

import { ClientService } from './client.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ClientInterceptor } from '../../interceptors/client.interceptor';

describe('ClientService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientModule
    ],
    providers: [
      {
        provide: HTTP_INTERCEPTORS,
        useClass: ClientInterceptor,
        multi: true
      }
    ]
  }));

  it('should return a list of users', (done: DoneFn) => {
    const arrage = {
      expect: {
        size: 60,
        loadFlagInStart: true,
        loadFlagInEnd: true,
        clients: [
          {
            "id": 0,
            "name": "Thiago Saldanha",
            "phone": "(11) 98252-5227"
          },
          {
            "id": 16,
            "name": "Ursula Acosta",
            "phone": "(847) 600-3952"
          },
        ]
      }
    }
    const service: ClientService = TestBed.get(ClientService);
    service.loadClients().then(data => {
      expect(data.length).toBe(arrage.expect.size);
      arrage.expect.clients.forEach(client => {
        console.log(data, client);
        let filted = data.filter(row => row.id == client.id);
        expect(filted.size).toBe(1);
        expect(JSON.stringify(filted[0])).toBe(JSON.stringify(client));
      });
      expect(service.isLoading).toBe(arrage.expect.loadFlagInEnd);
      done();
    });
    expect(service.isLoading).toBe(arrage.expect.loadFlagInStart);
  });
});
