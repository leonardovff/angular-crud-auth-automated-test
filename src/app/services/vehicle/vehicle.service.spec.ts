import { TestBed, inject } from '@angular/core/testing';

import { VehicleService } from './vehicle.service';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { VehicleBrands } from './vehicle-data';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';

describe('VehicleService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientModule
    ]
  }));

  it('should load the vehicle brands', inject([HttpClient], async(http) => {
    const arrage = {
      input: {
        brands: VehicleBrands.map(brand => ({
          codigo: brand.id,
          nome: brand.description
        }))
      },
      expect: {
        brands: VehicleBrands.map(brand => ({
          id: brand.id,
          description: brand.description
        }))
      }
    }
    spyOn(http,'get').and.callFake((url: string)=> {
      if(url.endsWith("carros/marcas")){
        return of(arrage.input.brands).pipe(delay(0));
      };
    })
    const service: VehicleService = TestBed.get(VehicleService);
    expect(service.isLoadingModelData.value).toBeTruthy("is loading the vehicle data");
    await new Promise(res => {
      setTimeout(() => res(),10)
    });
    expect(service.isLoadingModelData.value).toBeFalsy("loaded the vehicle data");
    expect(service.brands.value).toEqual(arrage.expect.brands);
  }));

  it('should load the vehicle models', inject([HttpClient], async(http) => {
    const arrage = {
      input: {
        brand_id: 1,
        models: (brand_id: number) => {
          const brand = VehicleBrands.find(brand =>
            brand.id === brand_id
          );
          return of({modelos: brand.models.map(model => ({
            codigo: model.id,
            nome: model.description
          }))});
        }
      },
      expect: {
        models: VehicleBrands.find(brand =>
            brand.id === 1
        ).models
      }
    }
    spyOn(http,'get').and.callFake((url: string)=> {
      if(url.endsWith("carros/marcas")){
        return of([]);
      };
      if(url.endsWith("modelos")){
        const temp = url.split("/");
        const brand_id = parseInt(temp[temp.length-2]);
        return arrage.input.models(brand_id);
      };
    });
    const service: VehicleService = TestBed.get(VehicleService);
    const promise = service.loadAndGetModels(arrage.input.brand_id);
    expect(promise instanceof Promise).toBe(true);
    const models = await promise;
    expect(models).toEqual(arrage.expect.models);
  }));
});
