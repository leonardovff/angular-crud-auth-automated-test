import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientListComponent } from './client-list.component';
import { ListItemComponent } from 'src/app/modules/shared/components/list/list-item/list-item.component';
import { ListComponent } from 'src/app/modules/shared/components/list/list.component';

describe('ClientListComponent', () => {
  let component: ClientListComponent;
  let fixture: ComponentFixture<ClientListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientListComponent, ListComponent, ListItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should a list of clients', () => {
    const arrage = {
      input: [{
        id: 1,
        name: "Leonardo Victor Fernandes Ferreira"
      },
      {
        id: 2,
        name: "Maria de Fátima"
      },
      {
        id: 3,
        name: "João da Silva"
      }]
    }
  });
});
