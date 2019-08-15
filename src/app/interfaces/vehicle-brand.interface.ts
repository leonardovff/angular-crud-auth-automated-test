import { VehicleModelInterface } from './vehicle-model.interface';

export interface VehicleBrandInterface {
  id: number,
  description: string
  models?: Array<VehicleModelInterface>
}
