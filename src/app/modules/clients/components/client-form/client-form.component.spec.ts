import { async, ComponentFixture, TestBed, tick } from '@angular/core/testing';

import { ClientFormComponent } from './client-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { ClientService } from 'src/app/services/client/client.service';
import { ActivatedRoute } from '@angular/router';
import { format } from 'util';
import { By } from '@angular/platform-browser';
import { of, BehaviorSubject } from 'rxjs';
import { delay } from 'rxjs/operators';
import { VehicleService } from 'src/app/services/vehicle/vehicle.service';
import { VehicleBrandInterface } from 'src/app/interfaces/vehicle-brand.interface';
import { VehicleBrands } from 'src/app/services/vehicle/vehicle-data';
import { VehicleModelInterface } from 'src/app/interfaces/vehicle-model.interface';
import { CpfMaskDirective } from 'src/app/modules/shared/directives/cpf-mask.directive';
import { PhoneMaskDirective } from 'src/app/modules/shared/directives/phone-mask.directive';
import { BirthDateMaskDirective } from 'src/app/modules/shared/directives/birth-date-mask.directive';
import { InputErrorComponent } from 'src/app/modules/shared/components/input-error/input-error.component';

class mockVehicleService {
  public brands: BehaviorSubject<Array<VehicleBrandInterface>> = new BehaviorSubject(null);
  constructor(){
    setTimeout(() => {
      this.brands.next(VehicleBrands.map(vehicle => ({
        id: vehicle.id,
        description: vehicle.description,
      })));
    }, 100);
  }
  loadAndGetModels (brand_id: number): Promise<Array<VehicleModelInterface>> {
    return of(VehicleBrands.find(brand => brand.id == brand_id).models)
    .pipe(delay(100))
    .toPromise();
  }
}
describe('ClientFormComponent', () => {
  let component: ClientFormComponent;
  let fixture: ComponentFixture<ClientFormComponent>;
  let spyClientServiceCreate;
  let spyClientServiceUpdate;
  let spyClientServiceGet;
  let mockActivatedRoute;

  const fillAndValidField = async (inputId, callback) => {
    const formControl = component.form.get(inputId);
    const el = fixture.debugElement.query(By.css('#'+inputId)).nativeElement;
    await callback(el, formControl);
    fixture.detectChanges();
    expect(formControl.valid).toBeTruthy(`input ${inputId} validation`);
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ClientFormComponent,
        CpfMaskDirective,
        PhoneMaskDirective,
        BirthDateMaskDirective,,
        InputErrorComponent
      ],
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
      ],
      providers: [
        {
          provide: VehicleService,
          useClass: mockVehicleService
        }
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
  it('should create one client', async () => {
    let arrage = {
      input: {
        params: {},
        message: "Salvo com sucesso",
        returnRequestCreate: {"message": "Success"},
        client: {
          name: "Guilherme Silveira",
          cpf: "74757602863",
          phone: "85996437412",
          birth_date: "23041961",
          address: "Rua Machado de Assis",
          vehicle_brand: 3,
          vehicle_model: 12,
        }
      },
      expect: {
        client: {
          name: "Guilherme Silveira",
          cpf: "747.576.028-63",
          phone: "(85) 99643-7412",
          birth_date: "23/04/1961",
          address: "Rua Machado de Assis",
          vehicle_brand: {
            id: 3,
            description: "Alfa Romeo"
          },
          vehicle_model: {description: "156 2.5 V6 24V 190cv 4p Aut.", id: 12},
        }
      }
    }
    spyClientServiceCreate.and.returnValue(of(arrage.input.returnRequestCreate).toPromise());
    mockActivatedRoute.snapshot.params = arrage.input.params;
    fixture.detectChanges();
    expect(component.form.valid).toBeFalsy("form validation");

    for (const input in arrage.input.client) {
      const value = arrage.input.client[input];
      await fillAndValidField(input, async (el, control) => {
        expect(control.valid).toBeFalsy(`input ${input} validation`);
        if(input == 'vehicle_brand' || input == 'vehicle_model'){
          await new Promise(res => setTimeout(() => (res()),200));
          fixture.detectChanges();
          el.value = value;
          return el.dispatchEvent(new Event('change'));
        }
        el.value = value;
        el.dispatchEvent(new Event('input'));
      });
    }
    expect(component.form.valid).toBeTruthy("form validation");
    fixture.debugElement.query(By.css('button')).nativeElement.click();
    expect(spyClientServiceCreate).toHaveBeenCalledWith(arrage.expect.client);
  });
  it('should edit one client', async () => {
    let arrage = {
      input: {
        params: {id: 1},
        id: 1,
        message: "Salvo com sucesso",
        returnUpdateRequest: {"message": "Success"},
        change: {
          name: "Michael Ratliff2",
          vehicle_brand: 4,
          vehicle_model: 21
        },
        clientRequest: {
          name: "Michael Ratliff",
          cpf: "198.317.840-30",
          phone: "(83) 99893-4192 ",
          birth_date: "11/06/1972",
          address: "Herkimer Court, 492",
          vehicle_brand: {
            id: 2,
            description: "Agrale",
          },
          vehicle_model: {
            id: 4567,
            description: "MARRU\u00c1 AM 200 2.8  CD TDI Diesel",
          },
        },
      },
      expect: {
        id: 1,
        message: "Salvo com sucesso",
        client: {
          name: "Michael Ratliff2",
          cpf: "198.317.840-30",
          phone: "(83) 99893-4192",
          birth_date: "11/06/1972",
          address: "Herkimer Court, 492",
          vehicle_brand: {
            id: 4,
            description: "AM Gen",
          },
          vehicle_model: {
            id: 21,
            description: "Hummer Hard-Top 6.5 4x4 Diesel TB",
          },
        }
      }
    }
    spyClientServiceUpdate.and.returnValue(of(arrage.input.returnUpdateRequest).toPromise());
    spyClientServiceGet.and.returnValue(of(arrage.input.clientRequest).toPromise())
    mockActivatedRoute.snapshot.params = arrage.input.params;
    fixture.detectChanges();

    expect(component.form.valid).toBeFalsy("form validation");

    expect(spyClientServiceGet).toHaveBeenCalledWith(arrage.input.params.id);
    await spyClientServiceGet.calls.mostRecent().returnValue;
    //Update fields after get response
    fixture.detectChanges();

    for (const input in arrage.input.change) {
      const value = arrage.input.change[input];
      await fillAndValidField(input, async (el, control) => {
        if(input == "vehicle_model"){
          expect(control.valid).toBeFalsy(`input ${input} validation after changed the vehicle brand`);
        } else {
          expect(control.valid).toBeTruthy(`input ${input} validation`);
        }
        if(input == 'vehicle_brand' || input == 'vehicle_model'){
          await new Promise(res => setTimeout(() => (res()),200));
          fixture.detectChanges();
          el.value = value;
          return el.dispatchEvent(new Event('change'));
        }
        el.value = value;
        el.dispatchEvent(new Event('input'));
      });
    }
    expect(component.form.valid).toBeTruthy("form validation");
    fixture.debugElement.query(By.css('button')).nativeElement.click();
    fixture.detectChanges();
    expect(spyClientServiceUpdate).toHaveBeenCalledWith(arrage.expect.id, arrage.expect.client);
  });
  it('should not create one client with wrong data', async () => {
    let arrage = {
      input: {
        params: {},
        message: "Salvo com sucesso",
        returnRequestCreate: {"message": "Error"},
        client: {
          name: "Guilherme Silveira",
          cpf: "74757602863",
          phone: "8593-7412",
          birth_date: "23041961",
          address: "Rua Machado de Assis",
          vehicle_brand: 2,
          vehicle_model: 4564,
        }
      }
    }
    spyClientServiceCreate.and.returnValue(of(arrage.input.returnRequestCreate).toPromise());
    mockActivatedRoute.snapshot.params = arrage.input.params;
    fixture.detectChanges();
    expect(component.form.valid).toBeFalsy("form validation");

    for (const input in arrage.input.client) {
      const value = arrage.input.client[input];
      const control = component.form.get(input);
      const el = fixture.debugElement.query(By.css('#'+input)).nativeElement;
      if(input == 'vehicle_brand' || input == 'vehicle_model'){
        await new Promise(res => setTimeout(() => (res()),200));
        fixture.detectChanges();
        el.value = value;
        el.dispatchEvent(new Event('change'));
        continue;
      }
      el.value = value;
      el.dispatchEvent(new Event('input'));
      fixture.detectChanges();
    }
    expect(component.form.valid).toBeFalsy("form validation");
    fixture.debugElement.query(By.css('button')).nativeElement.click();
    expect(spyClientServiceCreate).not.toHaveBeenCalled()
  });
});
