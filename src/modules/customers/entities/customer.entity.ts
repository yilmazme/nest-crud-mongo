export class Customer {
  name: string;
  email: string;
  password: string;
  token: string;
  age: number;
  orders?: Order[];
  photoFile: string;
}

class Order {
  id: string;
  amount: number;
}
