import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order } from './entities/order.entity';
// import * as mongoose from 'mongoose';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel('Order') private readonly orderModel: Model<Order>,
  ) {}

  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    try {
      const newOrder = new this.orderModel(createOrderDto);
      await newOrder.save();
      return newOrder;
    } catch (error) {
      console.log(error);
    }
  }

  async findAll(): Promise<Order[]> {
    return this.orderModel.find();
  }

  async findOne(id: string): Promise<Order> {
    try {
      const theOrder = await this.orderModel.findById({ _id: id });
      return theOrder;
    } catch (error) {
      throw new NotFoundException();
    }
  }

  async update(id: string, updateOrderDto: UpdateOrderDto): Promise<Order> {
    // if (!mongoose.isValidObjectId(id)) throw new NotFoundException();
    try {
      await this.orderModel.findOneAndUpdate({ _id: id }, updateOrderDto, {
        new: true,
      });
      return updateOrderDto;
    } catch (error) {
      throw new NotFoundException();
    }
  }

  async remove(id: string): Promise<string> {
    // if (!mongoose.isValidObjectId(id)) throw new NotFoundException();
    try {
      await this.orderModel.findByIdAndDelete({ _id: id });
      return `This action removes a #${id} order`;
    } catch (error) {
      throw new NotFoundException();
    }
  }
}
