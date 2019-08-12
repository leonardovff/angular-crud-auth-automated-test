import { TestBed } from '@angular/core/testing';

import { ClientService } from './client.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ClientInterceptor } from '../../interceptors/client.interceptor';
import { ClientsData } from './../../interceptors/client-data';

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

  it('should return a list of clients', (done: DoneFn) => {
    const arrage = {
      expect: {
        size: 20,
        loadFlagInStart: true,
        loadFlagInEnd: false,
        clients: [ // similar of data mock got by random order
          ClientsData[2],
          ClientsData[4],
          ClientsData[16]
        ]
      }
    }
    const service: ClientService = TestBed.get(ClientService);
    service.loadClients().then(data => {
      expect(data.length).toBe(arrage.expect.size);

      // check if the return is the same of the mock
      arrage.expect.clients.forEach(client => {
        let filtered = data.filter(row => row.id == client.id);
        expect(filtered.length).toBe(1);
        expect(JSON.stringify(filtered[0])).toBe(JSON.stringify(client));
      });

      // verify isLoading flag
      expect(service.isLoading).toBe(arrage.expect.loadFlagInEnd);
      done();
    });
    // verify isLoading flag
    expect(service.isLoading).toBe(arrage.expect.loadFlagInStart);
  });
  it('should save return a client by id', (done: DoneFn) => {
    const arrage = {
      input: 2,
      expect:  {
        loadFlagInStart: true,
        loadFlagInEnd: false,
        student: {
          "id": 2,
          "name": "Christian Mcguire",
          "cpf": "975.073.450-50",
          "phone": "(82) 98858-4743 ",
          "birth_date": "2000-1-24",
          "address": "Veronica Place, 663",
          "vehicle_brand": {
            "id": 59,
            "description": "VW - VolksWagen"
          },
          "vehicle_model": {
            "description": "Corrado 2.0 Turbo",
            "id": 2366
          }
        }
      }
    }
    const service: ClientService = TestBed.get(ClientService);
    service
      .getById(arrage.input)
      .then((data) => {
        expect(JSON.stringify(data)).toBe(JSON.stringify(arrage.expect.student));
        // verify isLoading flag
        expect(service.isLoading).toBe(arrage.expect.loadFlagInEnd);
        done();
      });
      // verify isLoading flag
      expect(service.isLoading).toBe(arrage.expect.loadFlagInStart);

  });
});
