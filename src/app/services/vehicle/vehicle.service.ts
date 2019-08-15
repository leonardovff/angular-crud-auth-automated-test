import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { VehicleModelInterface } from 'src/app/interfaces/vehicle-model.interface';
import { VehicleBrandInterface } from 'src/app/interfaces/vehicle-brand.interface';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { retry, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {
  private endpoint: string = environment.vehicle_api + "carros/marcas";
  public isLoading: BehaviorSubject<boolean> = new BehaviorSubject(false);
  public brands: BehaviorSubject<Array<VehicleBrandInterface>> = new BehaviorSubject(null);
  constructor(private http: HttpClient) {
    this.loadBrandsAndModels().then();
  }
  async loadBrandsAndModels(){
    this.isLoading.next(true);
    let brands = await this.loadBrands;
    let arr = [];
    brands.forEach(brand => {
      arr.push(this.loadModels(brand.id));
    });
    Promise.all(arr).then(res => {
      res.forEach(brand => {
        let ref = brands.find(row => row.id === brand.id);
        ref.id = brand.id;
        ref.models = brand.models;
      })
      this.brands.next(brands);
      this.isLoading.next(false);
    })
  }
  loadBrands: Promise<any> = new Promise((res) => {
    this.http.get(this.endpoint)
      .pipe(
        retry(3),
        map(brands => brands['map'](brand => ({
          id: brand.codigo,
          description: brand.nome
        })))
      )
      .subscribe(data => {
        res(data);
      });
  });

  loadModels(brand_id: number) {
    return this.http.get(`${this.endpoint}/${brand_id}/modelos`)
      .pipe(
        retry(3),
        map(models => {
          let brand = {
            id: brand_id,
            models: models['modelos']
              .map(model => ({
                id: model.codigo,
                description: model.nome
              }))
          }
          return brand;
        })
      ).toPromise();
  };

}
