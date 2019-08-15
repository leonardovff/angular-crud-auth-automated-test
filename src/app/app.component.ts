import { Component } from '@angular/core';
import { VehicleService } from './services/vehicle/vehicle.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(
    // To load the vehicle in application start
    private vehicle: VehicleService
  ){
  }
  title = 'rhi-app';
}
