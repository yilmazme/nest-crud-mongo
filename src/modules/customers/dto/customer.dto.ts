export class Customer {
  name: string;
  email: string;
  password: string;
  token: string;
  age: number;
  cart: [{ id: string; amount: number }];
  orders: [{ id: string; amount: number }];
  photoFile: string;
}
