import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingComponent } from './loading.component';
import { ClientService } from 'src/app/services/client/client.service';
import { By } from '@angular/platform-browser';
import { LoadersCssModule } from 'angular2-loaders-css';
import { VehicleService } from 'src/app/services/vehicle/vehicle.service';

class ClientServiceMock {
  isLoading: boolean = false;
}
class VehicleServiceMock {
  isLoading: boolean = false;
}
describe('LoadingComponent', () => {
  let component: LoadingComponent;
  let fixture: ComponentFixture<LoadingComponent>;
  let clientService: ClientService;
  let vehicleService: VehicleService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ LoadersCssModule ],
      declarations: [ LoadingComponent ],
      providers: [
        {
          provide: ClientService,
          useClass: ClientServiceMock
        },
        {
          provide: VehicleService,
          useClass: VehicleServiceMock
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadingComponent);
    clientService = fixture.debugElement.injector.get(ClientService);
    vehicleService = fixture.debugElement.injector.get(VehicleService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should show loading and remove - clientService', async() => {
    //TODO: REMOVE - ALTO ACOPLAMENTO - PASS TO SERVICE
    clientService.isLoading = true;
    fixture.detectChanges();
    const el = fixture.debugElement.query(By.css('loaders-css')).componentInstance;
    expect(el).toBeTruthy();
    await new Promise(res => setTimeout(() => {
      clientService.isLoading = false;
      res()
    }, 2000));
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('loaders-css'))).toBe(null)
  });

  it('should show loading and remove - vehicleService', async() => {
    //TODO: REMOVE - ALTO ACOPLAMENTO - PASS TO SERVICE
    vehicleService.isLoadingVehicleData = true;
    fixture.detectChanges();
    const el = fixture.debugElement.query(By.css('loaders-css')).componentInstance;
    expect(el).toBeTruthy();
    await new Promise(res => setTimeout(() => {
      vehicleService.isLoadingVehicleData = false;
      res()
    }, 2000));
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('loaders-css'))).toBe(null)
  });
});
