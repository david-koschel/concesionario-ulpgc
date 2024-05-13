import {Pipe, PipeTransform} from '@angular/core';
import {PaymentStatus} from "../../models/user-vehicle.model";

@Pipe({
  name: 'vehiclePaymentStatus',
  standalone: true
})
export class VehiclePaymentStatusPipe implements PipeTransform {

  transform(value: PaymentStatus): unknown {
    switch (value) {
      case "BOUGHT":
        return 'Comprado';
      case "IN_PROCESS":
        return 'Compra en Proceso';
      case "CANCELED":
        return 'Compra Cancelada';
    }
  }
}
