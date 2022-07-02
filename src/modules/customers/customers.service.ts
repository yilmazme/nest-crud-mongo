import { Injectable } from '@nestjs/common';
import { CustomerCreateDto } from 'src/modules/customers/dto/create-customer.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Customer } from './entities/customer.entity';
import { CustomerUpdateDto } from './dto/update-customer.dto';

@Injectable()
export class CustomersService {
  constructor(
    @InjectModel('Customer') private readonly customerModel: Model<Customer>,
  ) {}

  async allCustomers(): Promise<Customer[]> {
    return await this.customerModel.find();
  }

  async oneCustomer(id: string): Promise<Customer | string> {
    try {
      return await this.customerModel.findOne({ _id: id });
    } catch (error) {
      return `no customer with id: ${id}`;
    }
  }

  async addCustomer(customer: CustomerCreateDto): Promise<Customer | string> {
    const sameCustomer = await this.customerModel
      .findOne({ email: customer.email })
      .exec();
    if (sameCustomer) {
      return `customer alreeady exist`;
    }
    try {
      const newCustomer = new this.customerModel(customer);
      await newCustomer.save();
      console.log(newCustomer);
      return customer;
    } catch (error) {
      console.log(error.message);
    }
  }

  async deleteCustomer(id: string): Promise<string> {
    try {
      await this.customerModel.findOneAndDelete({ _id: id });
      return `customer with id: ${id} deleted`;
    } catch (error) {
      return `no customer with id: ${id}`;
    }
  }

  async updateOne(id: string, customer: CustomerUpdateDto): Promise<Customer> {
    await this.customerModel.findOneAndUpdate({ _id: id }, customer, {
      new: true,
    });
    return customer;
  }
}
