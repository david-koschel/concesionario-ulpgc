import {TestDriveCar} from "./test-drive-car.model";

export interface DriveRequest {
  name: String,
  email: String,
  testDriveCar: TestDriveCar,
  startDate: Date,
  endDate: Date,
  accepted: boolean
}
