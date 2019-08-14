import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientFormComponent } from './client-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { ClientService } from 'src/app/modules/shared/services/client/client.service';
import { ActivatedRoute } from '@angular/router';
import { format } from 'util';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';

describe('ClientFormComponent', () => {
  let component: ClientFormComponent;
  let fixture: ComponentFixture<ClientFormComponent>;
  let spyClientServiceCreate;
  let spyClientServiceUpdate;
  let mockActivatedRoute;
  let spyClientServiceGet;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientFormComponent ],
      imports: [
        ReactiveFormsModule,
        HttpClientModule,
        RouterTestingModule.withRoutes([{
          path: '',
          component: ClientFormComponent
        },
        {
          path: './../',
          component: ClientFormComponent
        }])
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientFormComponent);
    component = fixture.componentInstance;
    const mockClientService = fixture.debugElement.injector.get(ClientService);
    spyClientServiceUpdate = spyOn(mockClientService, 'update');
    spyClientServiceCreate = spyOn(mockClientService, 'create');
    spyClientServiceGet = spyOn(mockClientService, 'getById');
    mockActivatedRoute = fixture.debugElement.injector.get(ActivatedRoute);
  });
  it('should create one client', () => {
    let arrage = {
      input: {
        params: {},
        message: "Salvo com sucesso",
        returnRequestCreate: {"message": "Success"},
        client: {
          name: "Guilherme Silveira",
          cpf: "747.576.028-63",
          phone: "(85) 99643-7412",
          birth_date: "1961-04-23",
          address: "Rua Machado de Assis",
          // vehicle_brand: 59,
          // vehicle_model: 2365
        }
      },
      expect: {
        client: {
          name: "Guilherme Silveira",
          cpf: "747.576.028-63",
          phone: "(85) 99643-7412",
          birth_date: "1961-04-23",
          address: "Rua Machado de Assis",
          // vehicle_brand: {
          //   id: 59,
          //   description: "VW - VolksWagen"
          // },
          // vehicle_model: {
          //   description: "Caravelle 2.4 Diesel",
          //   id: 2365
          // }
        }
      }
    }
    spyClientServiceCreate.and.returnValue(of(arrage.input.returnRequestCreate).toPromise());
    mockActivatedRoute.snapshot.params = arrage.input.params;
    fixture.detectChanges();

    expect(component.form.valid).toBeFalsy("form validation");

    Object.keys(arrage.input.client).forEach(input => {
      const formControl = component.form.get(input);
      const el = fixture.debugElement.query(By.css('#'+input)).nativeElement;

      expect(formControl.valid).toBeFalsy(`input ${input} validation`);

      el.value = arrage.input.client[input];
      el.dispatchEvent(new Event('input'));
      fixture.detectChanges();
      expect(formControl.valid).toBeTruthy(`input ${input} validation`);
    });

    expect(component.form.valid).toBeTruthy("form validation");
    fixture.debugElement.query(By.css('button')).nativeElement.click();
    expect(spyClientServiceCreate).toHaveBeenCalledWith(arrage.expect.client);
  });

  it('should edit one client change Amarok vehicle to Carrera 4 GTS', (done: DoneFn) => {
    let arrage = {
      input: {
        params: {id: 1},
        returnUpdateRequest: {"message": "Success"},
        client: {
          name: "Guilherme Silveira",
          cpf: "747.576.028-63",
          phone: "(85) 99643-7412",
          birth_date: "1961-04-23",
          address: "Rua Machado de Assis",
          // vehicle_brand: {
          //   id: 59,
          //   description: "VW - VolksWagen"
          // },
          // vehicle_model: {
          //   description: "Caravelle 2.4 Diesel",
          //   id: 2365
          // }
        }
      },
      expect: {
        message: "Salvo com sucesso",
        id: 1,
        client: {
          name: "Guilherme Silveira",
          cpf: "747.576.028-63",
          phone: "(85) 99643-7412",
          birth_date: "1961-04-23",
          address: "Rua Machado de Assis",
          // vehicle_brand: {
          //   id: 59,
          //   description: "VW - VolksWagen"
          // },
          // vehicle_model: {
          //   description: "Caravelle 2.4 Diesel",
          //   id: 2365
          // }
        }
      }
    }
    spyClientServiceUpdate.and.returnValue(of(arrage.input.returnUpdateRequest).toPromise());
    spyClientServiceGet.and.returnValue(of(arrage.input.client).toPromise())
    mockActivatedRoute.snapshot.params = arrage.input.params;
    fixture.detectChanges();

    expect(spyClientServiceGet).toHaveBeenCalledWith(arrage.input.params.id);
    spyClientServiceGet.calls.mostRecent().returnValue.then(()=>{
      fixture.detectChanges();
      expect(component.form.valid).toBeTruthy("form validation");
      fixture.debugElement.query(By.css('button')).nativeElement.click();
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        expect(spyClientServiceUpdate).toHaveBeenCalledWith(arrage.expect.id, arrage.expect.client);
        done();
      });
    });
  });
  it('should not create one client with wrong data', () => {
    let arrage = {
      input: {
        params: {},
        client: {
          name: "Guilherme Silveira",
          cpf: "",
          phone: "(85) 93-7412",
          birth_date: "1961-04-23",
          address: "Rua Machado de Assis",
          // vehicle_brand: 59,
          // vehicle_model: 2365
        }
      }
    }
    spyClientServiceCreate.and.returnValue(of({}).toPromise());
    mockActivatedRoute.snapshot.params = arrage.input.params;
    fixture.detectChanges();

    expect(component.form.valid).toBeFalsy("form validation");

    Object.keys(arrage.input.client).forEach(input => {
      const formControl = component.form.get(input);
      const el = fixture.debugElement.query(By.css('#'+input)).nativeElement;
      el.value = arrage.input.client[input];
      el.dispatchEvent(new Event('input'));
    });
    fixture.detectChanges();

    expect(component.form.valid).toBeFalsy("form validation");

    fixture.debugElement.query(By.css('button')).nativeElement.click();
    expect(spyClientServiceCreate).not.toHaveBeenCalled();
  });

});
