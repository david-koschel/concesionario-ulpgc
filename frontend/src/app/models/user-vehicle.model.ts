export interface UserVehicle {
  id: number;
  brand: string;
  model: string;
  totalPrice: number;
  image: string;
  colorName: string;
  color: string;
  engineName: string;
  rimName: string;
  extras: string[];
  paymentStatus: PaymentStatus;
}

export type PaymentStatus = "IN_PROCESS" | "BOUGHT" | "CANCELED";
