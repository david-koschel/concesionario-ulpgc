export interface User {
  id?: number;
  name: string;
  address: string;
  email: string;
  username: string;
  password: string;
  role: Role;
}

export type Role = "ADMIN" | "CUSTOMER"
