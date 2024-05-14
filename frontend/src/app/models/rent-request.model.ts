import {RentVehicle} from "./rent-vehicle";

export interface RentRequest {
  id?: number;
  rentVehicle: RentVehicle;
  startDate: Date;
  endDate: Date;
  bought?: boolean;
}
