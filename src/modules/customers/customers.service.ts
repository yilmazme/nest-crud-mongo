import { Injectable } from '@nestjs/common';
import { Customer } from 'src/modules/customers/dto/customer.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

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

  async addCustomer(customer: Customer): Promise<Customer | string> {
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

  async updateOne(id: string, customer: Customer): Promise<string> {
    await this.customerModel.findOneAndUpdate({ _id: id }, customer, {
      new: true,
    });
    return `customer with id: ${id} updated`;
  }
}
