import { VehicleBrandInterface } from './vehicle-brand.interface';
import { VehicleModelInterface } from './vehicle-model.interface';

export interface ClientInterface {
  id: number;
  name: string;
  cpf: string;
  phone: string;
  birth_date: string;
  address: string;
  vehicle_brand: VehicleBrandInterface;
  vehicle_model: VehicleBrandInterface;
}
