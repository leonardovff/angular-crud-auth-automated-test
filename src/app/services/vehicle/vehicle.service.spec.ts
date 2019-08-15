import { TestBed, inject } from '@angular/core/testing';

import { VehicleService } from './vehicle.service';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { VehicleBrands } from './vehicle-data';
import { of } from 'rxjs';

describe('VehicleService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientModule
    ]
  }));

  it('should load the vehicle brands and its models', inject([HttpClient], async(http) => {
    const arrage = {
      input: {
        brands: VehicleBrands.map(brand => ({
          codigo: brand.id,
          nome: brand.description
        })),
        models: (brand_id: number) => {
          const brand = VehicleBrands.find(brand =>
            brand.id === brand_id
          );
          return of({modelos: brand.models.map(model => ({
            codigo: model.id,
            nome: model.description
          }))});
        }
      }
    }
    spyOn(http,'get').and.callFake((url: string)=> {
      if(url.endsWith("carros/marcas")){
        return of(arrage.input.brands);
      };
      if(url.endsWith("modelos")){
        const temp = url.split("/");
        const brand_id = parseInt(temp[temp.length-2]);
        return arrage.input.models(brand_id);
      };
    })
    const service: VehicleService = TestBed.get(VehicleService);

    expect(service.isLoading.value).toBeTruthy("is loading the vehicle data");
    await new Promise(res => {
      service.isLoading
        .asObservable()
        .subscribe(() => res())
    }).then();
    expect(service.isLoading.value).toBeFalsy("loaded the vehicle data");
    expect(service.brands.value).toEqual(VehicleBrands);
  }));
});
