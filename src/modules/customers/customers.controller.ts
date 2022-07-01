import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Delete,
  Put,
} from '@nestjs/common';
import { Customer } from 'src/modules/customers/dto/customer.dto';
import { CustomersService } from './customers.service';

@Controller('customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @Get()
  allCustomers(): Promise<Customer[]> {
    return this.customersService.allCustomers();
  }

  @Get(':id')
  oneCustomer(@Param('id') id: string): Promise<Customer | string> {
    return this.customersService.oneCustomer(id);
  }
  @Post()
  addCustomer(@Body() customer: Customer): Promise<Customer | string> {
    return this.customersService.addCustomer(customer);
  }

  @Delete(':id')
  deleteOne(@Param('id') id: string): Promise<string> {
    return this.customersService.deleteCustomer(id);
  }

  @Put(':id')
  updateOne(
    @Param('id') id: string,
    @Body() customer: Customer,
  ): Promise<string> {
    return this.customersService.updateOne(id, customer);
  }
}
