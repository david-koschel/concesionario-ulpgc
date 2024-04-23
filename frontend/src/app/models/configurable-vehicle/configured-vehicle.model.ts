import {ConfigurableVehicle} from "./configurable-vehicle.model";
import {ConfigurableVehicleColor} from "./configurable-vehicle-color.model";
import {ConfigurableVehicleEngine} from "./configurable-vehicle-engine.model";
import {ConfigurableVehicleRim} from "./configurable-vehicle-rim.model";
import {ConfigurableVehicleExtra} from "./configurable-vehicle-extra.model";

export interface UserConfiguration {
  id?: number;
  selectedVehicle: ConfigurableVehicle;
  selectedColor: ConfigurableVehicleColor;
  selectedEngine: ConfigurableVehicleEngine;
  selectedRim: ConfigurableVehicleRim;
  selectedExtras: ConfigurableVehicleExtra[];
}
