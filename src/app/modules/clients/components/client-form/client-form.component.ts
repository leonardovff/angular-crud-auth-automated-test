import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CpfValidator } from 'src/app/validators/cpf.validator';
import { ClientService } from 'src/app/services/client/client.service';
import { ActivatedRoute, Router } from '@angular/router';
import { VehicleService } from 'src/app/services/vehicle/vehicle.service';
import { VehicleBrandInterface } from 'src/app/interfaces/vehicle-brand.interface';

@Component({
  selector: 'app-client-form',
  templateUrl: './client-form.component.html',
  styleUrls: ['./client-form.component.scss']
})
export class ClientFormComponent implements OnInit {
  public brands: Array<VehicleBrandInterface>
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
        Validators.required
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
        Validators.required,
      ]),
      // vehicle_model: new FormControl(null, [
      //   Validators.required,
      // ])
    });
  }

  ngOnInit() {
    this.vehicleService.brands.subscribe((brands) => {
      this.brands = brands;
    })
    this.id = this.activatedRoute.snapshot.params.id;
    if(this.id){
      this.clientService.getById(this.id)
        .then(data => {
          this.form.patchValue(data);
        });
    }
  }
  save() {

    if(this.id){
      return this.clientService.update(this.id, this.form.value)
        .then(()=>{
        alert("Foi");
        this.router.navigateByUrl('./../');
      });
    }

    this.clientService.create(this.form.value)
      .then(()=>{
        alert("Foi");
        this.router.navigateByUrl('./../');
      });
  }

}
