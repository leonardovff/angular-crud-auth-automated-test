import { VehicleBrand } from './vehicle-brand.interface';
import { VehicleModel } from './vegicle-model.interface';

export interface ClientInterface {
  id: number;
  name: string;
  cpf: string;
  phone: string;
  birth_date: string;
  address: string;
  vehicle_brand: VehicleBrand;
  vehicle_model: VehicleModel;
}
