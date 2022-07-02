import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Delete,
  Patch,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CustomersService } from './customers.service';
import { CustomerCreateDto } from './dto/create-customer.dto';
import { CustomerUpdateDto } from './dto/update-customer.dto';
import { Customer } from './entities/customer.entity';

@ApiTags('Customers')
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
  addCustomer(@Body() customer: CustomerCreateDto): Promise<Customer | string> {
    return this.customersService.addCustomer(customer);
  }

  @Delete(':id')
  deleteOne(@Param('id') id: string): Promise<string> {
    return this.customersService.deleteCustomer(id);
  }

  @Patch(':id')
  updateOne(
    @Param('id') id: string,
    @Body() customer: CustomerUpdateDto,
  ): Promise<Customer> {
    return this.customersService.updateOne(id, customer);
  }
}
