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

class mockVehicleService {
  public brands: BehaviorSubject<Array<VehicleBrandInterface>> = new BehaviorSubject(null);
  constructor(){
    setTimeout(() => {
      this.brands.next(VehicleBrands.map(vehicle => ({
        description: vehicle.description,
        id: vehicle.id
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
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ClientFormComponent,
        CpfMaskDirective,
        PhoneMaskDirective,
        BirthDateMaskDirective
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

    const fillAndValidField = async (inputId, callback) => {
      const formControl = component.form.get(inputId);
      const el = fixture.debugElement.query(By.css('#'+inputId)).nativeElement;
      expect(formControl.valid).toBeFalsy(`input ${inputId} validation`);
      await callback(el);
      fixture.detectChanges();
      expect(formControl.valid).toBeTruthy(`input ${inputId} validation`);
    }
    for (const input in arrage.input.client) {
      const value = arrage.input.client[input];
      await fillAndValidField(input, async el => {
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
});
