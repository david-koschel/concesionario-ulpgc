import {ConfigurableVehicleColor} from "./configurable-vehicle-color.model";
import {ConfigurableVehicleEngine} from "./configurable-vehicle-engine.model";
import {ConfigurableVehicleRim} from "./configurable-vehicle-rim.model";
import {ConfigurableVehicleExtra} from "./configurable-vehicle-extra.model";

export interface ConfigurableVehicle {
  id: number,
  brand: string,
  model: string,
  image: string,
  basePrice: number,
  description: string,
  engine: ConfigurableVehicleEngine[],
  colors: ConfigurableVehicleColor[];
  rims: ConfigurableVehicleRim[],
  extras: ConfigurableVehicleExtra[],
}
