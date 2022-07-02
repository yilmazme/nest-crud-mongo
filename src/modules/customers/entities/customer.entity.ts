export class Customer {
  name: string;
  email: string;
  password: string;
  token: string;
  age: number;
  orders: CartItem[];
  photoFile: string;
}

class CartItem {
  id: string;
  amount: number;
}
