import { ApiProperty } from '@nestjs/swagger';

class CartItem {
  @ApiProperty()
  id: string;
  @ApiProperty()
  amount: number;
}
export class CustomerCreateDto {
  @ApiProperty()
  name: string;
  @ApiProperty()
  email: string;
  @ApiProperty()
  password: string;
  @ApiProperty()
  token: string;
  @ApiProperty()
  age: number;
  @ApiProperty({
    isArray: true,
    type: CartItem,
  })
  orders: CartItem[];
  @ApiProperty()
  photoFile: string;
}
