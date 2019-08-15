import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientListComponent } from './client-list.component';
import { ListItemComponent } from 'src/app/modules/shared/components/list/list-item/list-item.component';
import { ListComponent } from 'src/app/modules/shared/components/list/list.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { ClientService } from 'src/app/services/client/client.service';
import { of } from 'rxjs';
import { ClientsData } from '../../../shared/interceptors/client-data'
import { By } from '@angular/platform-browser';

describe('ClientListComponent', () => {
  let component: ClientListComponent;
  let fixture: ComponentFixture<ClientListComponent>;
  let mockClientService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientListComponent, ListComponent, ListItemComponent ],
      imports: [RouterTestingModule, HttpClientModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientListComponent);
    component = fixture.componentInstance;
    mockClientService = fixture.debugElement.injector.get(ClientService);
  });

  it('should show a list of clients', (done: DoneFn) => {
    const arrage = {
      input: ClientsData,
      expect: {
        clients: ClientsData.map(client => {
          client = {...client};
          client['name'] = client['name'] + " >"
          return client;
        })
      }
    }
    let spy = spyOn(mockClientService, 'loadClients')
      .and
      .returnValue(
        of(arrage.input).toPromise()
      );

    fixture.detectChanges();

    expect(spy).toHaveBeenCalled();
    spy.calls.mostRecent().returnValue.then(()=>{
      fixture.detectChanges();
      arrage.expect.clients.forEach(client => {
        const el = fixture.debugElement
          .query(By.css(`a[href="/${client.id}"]`));
        expect(el).toBeTruthy();
        expect(el.nativeElement.text.trim()).toEqual(client.name);
      })
      done();
    })
  });
});
