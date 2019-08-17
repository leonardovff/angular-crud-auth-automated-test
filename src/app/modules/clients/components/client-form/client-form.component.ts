import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CpfValidator } from 'src/app/validators/cpf.validator';
import { ClientService } from 'src/app/services/client/client.service';
import { ActivatedRoute, Router } from '@angular/router';
import { VehicleService } from 'src/app/services/vehicle/vehicle.service';
import { VehicleBrandInterface } from 'src/app/interfaces/vehicle-brand.interface';
import { VehicleModelInterface } from 'src/app/interfaces/vehicle-model.interface';
import { ValidatePhone } from 'src/app/validators/phone.validator';

@Component({
  selector: 'app-client-form',
  templateUrl: './client-form.component.html',
  styleUrls: ['./client-form.component.scss']
})
export class ClientFormComponent implements OnInit {
  public brands: Array<VehicleBrandInterface>;
  public models: Array<VehicleModelInterface>;
  public form: FormGroup;
  private id: number;
  constructor(
    protected clientService: ClientService,
    private vehicleService: VehicleService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.form = new FormGroup({
      name: new FormControl(null, [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(100)
      ]),
      cpf: new FormControl(null, [
        CpfValidator.valid,
        Validators.required
      ]),
      phone: new FormControl(null, [
        Validators.required,
        ValidatePhone.valid
      ]),
      birth_date: new FormControl(null, [
        Validators.required
      ]),
      address: new FormControl(null, [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(100)
      ]),
      vehicle_brand: new FormControl(null, [
        Validators.required
      ]),
      vehicle_model: new FormControl(null, [
        Validators.required,
      ])
    });
  }
  ngOnInit() {
    let brandsListener = null;
    this.form.get("vehicle_brand").valueChanges.subscribe(value => {
      if(!value) {
        return null;
      };
      if(this.models){
        this.form.get('vehicle_model').patchValue(null)
      }
      this.models = null;

      this.vehicleService.loadAndGetModels(value)
        .then(models => {
          this.models = models;
        }).catch(() => {
          alert("Falha ao carregar os modelos");
        });
    });
    this.vehicleService.brands.subscribe((brands) => {
      this.brands = brands;
    })
    this.id = this.activatedRoute.snapshot.params.id;
    if(this.id){
      this.clientService.getById(this.id)
        .then(data => {
          data.vehicle_brand = data.vehicle_brand.id;
          data.vehicle_model = data.vehicle_model.id;
          this.form.patchValue(data);
        });
    }
  }

  save() {

    let value = {...this.form.value};
    value.vehicle_brand = this.brands.find(brand => brand.id == value.vehicle_brand);
    value.vehicle_model = this.models.find(brand => brand.id == value.vehicle_model);

    if(this.id){
      return this.clientService.update(this.id, value)
        .then(()=>{
        alert("Foi");
        this.router.navigateByUrl('./../');
      });
    }

    this.clientService.create(value)
      .then(()=>{
        alert("Foi");
        this.router.navigateByUrl('./../');
      });
  }

}
