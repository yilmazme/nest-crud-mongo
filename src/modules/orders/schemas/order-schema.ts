/* eslint-disable prettier/prettier */
import * as mongoose from 'mongoose';
import { Customer } from 'src/modules/customers/dto/customer.dto';

export const OrderSchema = new mongoose.Schema({
  name: String,
  quantity: Number,
  orderDate: Date,
  ovner: Customer,
});
